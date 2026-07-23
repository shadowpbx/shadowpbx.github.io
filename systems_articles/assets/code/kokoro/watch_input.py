#!/usr/bin/env python3
"""
Kokoro-82M Automated Text-to-MP3 Folder Watcher (`watch_input.py`)
====================================================================
Monitors `kokoro/input/*.txt` for new text files, automatically synthesizes high-fidelity
speech using Kokoro-82M models stored locally inside `kokoro/models/Kokoro-82M`, and exports
the output as MP3 files into `kokoro/output/`.
Moves processed files to visible folder `kokoro/input/processed/`.

Uses local module configuration from `kokoro/config.py`.
Displays continuous live 1% to 100% overall document progress alongside sub-chunk progress.
"""

import os
import sys
import re
import time
import shutil
import warnings
import subprocess
import logging
import numpy as np
from pathlib import Path
from typing import Optional, List
import typer
from rich.console import Console
from rich.panel import Panel
from rich.progress import Progress, TextColumn, BarColumn, TaskProgressColumn, TimeRemainingColumn, SpinnerColumn

# Import local module configuration
from config import convert_wav_to_mp3, DEFAULT_MP3_BITRATE, CHUNK_WORDS, SAMPLE_RATE, DEFAULT_VOICE, DEFAULT_SPEED

# Suppress harmless espeak / phonemizer UserWarnings for clean terminal UI
warnings.filterwarnings("ignore", category=UserWarning)

# Espeak-ng data path monkeypatch before importing Kokoro
import espeakng_loader
espeakng_loader.get_data_path = lambda: '/usr/share/espeak-ng-data'
import phonemizer.backend.espeak.wrapper as _ew
if not hasattr(_ew.EspeakWrapper, 'set_data_path') or callable(getattr(_ew.EspeakWrapper, 'set_data_path', None)):
    _ew.EspeakWrapper.set_data_path = classmethod(lambda cls, path: _ew.EspeakWrapper.set_library('/usr/lib/x86_64-linux-gnu/libespeak-ng.so'))

# Suppress internal tqdm output for clean Rich progress rendering
import tqdm
_orig_tqdm = tqdm.tqdm
def _silent_tqdm(*args, **kwargs):
    kwargs['disable'] = True
    return _orig_tqdm(*args, **kwargs)
tqdm.tqdm = _silent_tqdm

# Configure PyTorch CUDA memory allocation
os.environ["PYTORCH_CUDA_ALLOC_CONF"] = "expandable_segments:True"

console = Console()
app = typer.Typer(help="Kokoro-82M Automated Text-to-MP3 Folder Processor")

BASE_DIR = Path(__file__).resolve().parent
INPUT_DIR = BASE_DIR / "input"
OUTPUT_DIR = BASE_DIR / "output"
PROCESSED_DIR = INPUT_DIR / "processed"
LOCAL_MODEL_DIR = BASE_DIR / "models" / "Kokoro-82M"
PID_FILE = Path("/tmp/kokoro_watcher.pid")

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("kokoro_watch_input")


def split_text_into_chunks(text: str, target_words: int = CHUNK_WORDS) -> List[str]:
    """
    Splits text strictly at sentence boundaries (. ! ? ;).
    Accumulates complete sentences up to ~target_words (250 words max for Kokoro).
    Never cuts words in the middle (prevents 'str' + 'ong' slicing bug).
    """
    cleaned_text = re.sub(r'\s+', ' ', text).strip()
    if not cleaned_text:
        return []

    sentence_pattern = re.compile(r'[^.!?;\n]+[.!?;\n]+|\S+$')
    raw_sentences = sentence_pattern.findall(cleaned_text)

    chunks = []
    current_chunk = ""

    for sentence in raw_sentences:
        sentence = sentence.strip()
        if not sentence:
            continue

        sentence_word_count = len(sentence.split())
        current_word_count = len(current_chunk.split()) if current_chunk else 0

        if not current_chunk:
            current_chunk = sentence
        elif current_word_count + sentence_word_count <= target_words:
            current_chunk = f"{current_chunk} {sentence}"
        else:
            chunks.append(current_chunk)
            current_chunk = sentence

    if current_chunk:
        chunks.append(current_chunk)

    return chunks if chunks else [text]


def process_txt_file(txt_file: Path, pipeline, voice_file: Path, speed: float = DEFAULT_SPEED):
    """Reads a .txt file, chunk-synthesizes speech using Kokoro-82M, and writes an MP3 file."""
    if not txt_file.exists() or txt_file.name.startswith("."):
        return

    logger.info(f"Processing new text file: '{txt_file.name}'")

    try:
        with open(txt_file, "r", encoding="utf-8") as f:
            text_content = f.read().strip()
    except Exception as e:
        logger.error(f"Could not read {txt_file}: {e}")
        return

    if not text_content:
        logger.warning(f"File '{txt_file.name}' is empty. Skipping.")
        shutil.move(str(txt_file), str(PROCESSED_DIR / txt_file.name))
        return

    stem_name = txt_file.stem
    temp_wav_path = OUTPUT_DIR / f"{stem_name}_temp.wav"
    target_mp3_path = OUTPUT_DIR / f"{stem_name}.mp3"

    # Split text into ~250-word sentence chunks
    text_chunks = split_text_into_chunks(text_content, target_words=CHUNK_WORDS)
    num_chunks = len(text_chunks)
    total_words = len(text_content.split())
    # Kokoro outputs 24,000Hz audio (~2.85 audio frames per word)
    total_doc_est_frames = max(50, int(total_words * 2.85))

    console.print(Panel(f"[bold cyan]Synthesizing Document (Kokoro-82M):[/bold cyan] '{txt_file.name}'\n"
                        f"[yellow]{total_words} words[/yellow] split into [green]{num_chunks} sentence chunk{'s' if num_chunks > 1 else ''}[/green] (Speed: {speed}) -> '{target_mp3_path.name}'", title="Kokoro-82M Synthesis"))

    import soundfile as sf
    import torch

    audio_segments = []
    sample_rate = SAMPLE_RATE
    total_frames_generated = 0

    with Progress(
        SpinnerColumn(spinner_name="dots"),
        TextColumn("[bold cyan]{task.description}"),
        BarColumn(bar_width=35),
        TaskProgressColumn(),
        TimeRemainingColumn(),
        console=console,
        transient=False,
    ) as progress:
        overall_task = progress.add_task(f"[bold yellow]Overall Document Progress[/bold yellow]", total=total_doc_est_frames)

        for idx, chunk in enumerate(text_chunks, start=1):
            chunk_words = len(chunk.split())
            est_chunk_frames = max(10, int(chunk_words * 2.85))

            chunk_task = progress.add_task(f"Chunk {idx}/{num_chunks} ({chunk_words} words)", total=est_chunk_frames)
            chunk_audio_segments = []
            chunk_step = 0

            # Generate speech for chunk using Kokoro pipeline with configured speed
            generator = pipeline(chunk, voice=str(voice_file), speed=speed)

            for gs, ps, audio_patch in generator:
                chunk_step += 1
                total_frames_generated += 1

                if isinstance(audio_patch, torch.Tensor):
                    audio_numpy = audio_patch.cpu().numpy()
                else:
                    audio_numpy = np.array(audio_patch, dtype=np.float32)

                chunk_audio_segments.append(audio_numpy)
                progress.update(chunk_task, completed=min(chunk_step, est_chunk_frames), description=f"Chunk {idx}/{num_chunks} (Step {chunk_step}/{est_chunk_frames})")
                progress.update(overall_task, completed=min(total_frames_generated, total_doc_est_frames))

            if chunk_audio_segments:
                chunk_audio = np.concatenate(chunk_audio_segments) if len(chunk_audio_segments) > 1 else chunk_audio_segments[0]
                audio_segments.append(chunk_audio)

            progress.update(chunk_task, completed=est_chunk_frames, description=f"[green]✓ Chunk {idx}/{num_chunks} Complete[/green]")

            if torch.cuda.is_available():
                torch.cuda.empty_cache()

        progress.update(overall_task, completed=total_doc_est_frames, description="[bold green]✓ Overall Document Progress Complete[/bold green]")

    combined_audio = np.concatenate(audio_segments) if len(audio_segments) > 1 else audio_segments[0]

    sf.write(str(temp_wav_path), combined_audio, sample_rate)

    # Convert to MP3 using local DEFAULT_MP3_BITRATE
    if convert_wav_to_mp3(temp_wav_path, target_mp3_path):
        console.print(f"[bold green]✓ Successfully generated MP3 ({DEFAULT_MP3_BITRATE}):[/bold green] {target_mp3_path}")
        if temp_wav_path.exists():
            temp_wav_path.unlink()
        archive_target = PROCESSED_DIR / txt_file.name
        if archive_target.exists():
            archive_target.unlink()
        shutil.move(str(txt_file), str(archive_target))
    else:
        logger.error(f"Failed to generate MP3 for {txt_file.name}")


@app.command()
def process_all(
    watch: bool = typer.Option(False, "--watch", "-w", help="Run continuously in background watcher mode."),
    interval: int = typer.Option(3, "--interval", "-i", help="Poll interval in seconds for watch mode."),
    voice: str = typer.Option(DEFAULT_VOICE, "--voice", "-v", help="Voice preset name (default: af_heart)."),
    speed: float = typer.Option(DEFAULT_SPEED, "--speed", "-s", help="Speaking speed multiplier (default: 0.9)."),
):
    """
    Scans input directory for .txt files and converts them to MP3 using Kokoro-82M (default voice: af_heart, speed: 0.9).
    """
    INPUT_DIR.mkdir(exist_ok=True)
    OUTPUT_DIR.mkdir(exist_ok=True)
    PROCESSED_DIR.mkdir(exist_ok=True)

    voice_file = LOCAL_MODEL_DIR / "voices" / f"{voice}.pt"
    if not voice_file.exists():
        console.print(f"[bold red]Error:[/bold red] Voice file '{voice}.pt' missing at: {voice_file}")
        raise typer.Exit(code=1)

    console.print(Panel("[bold green]Kokoro-82M Automated Text-to-MP3 Converter[/bold green]\n"
                        f"Input Dir:     {INPUT_DIR}\n"
                        f"Output Dir:    {OUTPUT_DIR}\n"
                        f"Processed Dir: {PROCESSED_DIR}\n"
                        f"Voice:         {voice} ({voice_file.name})\n"
                        f"Speed:         {speed}\n"
                        f"Bitrate:       {DEFAULT_MP3_BITRATE}\n"
                        f"Model Dir:     {LOCAL_MODEL_DIR}", title="Kokoro Watcher"))

    try:
        import torch
        from kokoro import KPipeline, KModel
    except ImportError:
        console.print("[bold red]Error:[/bold red] Kokoro package not found in python environment.")
        raise typer.Exit(code=1)

    device = "cuda" if torch.cuda.is_available() else "cpu"
    config_path = str(LOCAL_MODEL_DIR / "config.json")
    pth_path = str(LOCAL_MODEL_DIR / "kokoro-v1_0.pth")

    logger.info(f"Loading Kokoro-82M model on {device.upper()} from local directory...")
    kmodel = KModel(repo_id="hexgrad/Kokoro-82M", config=config_path, model=pth_path).to(device).eval()
    pipeline = KPipeline(lang_code="a", repo_id="hexgrad/Kokoro-82M", model=kmodel)
    logger.info("Kokoro-82M model loaded and ready.")

    # Write PID lock
    with open(PID_FILE, "w") as f:
        f.write(str(os.getpid()))

    try:
        if watch:
            console.print("[bold green]Running in continuous WATCH mode. Press Ctrl+C to stop.[/bold green]")
            while True:
                txt_files = sorted(list(INPUT_DIR.glob("*.txt")))
                for txt_file in txt_files:
                    process_txt_file(txt_file, pipeline, voice_file, speed=speed)
                time.sleep(interval)
        else:
            txt_files = sorted(list(INPUT_DIR.glob("*.txt")))
            if not txt_files:
                console.print(f"[yellow]No .txt files currently found in {INPUT_DIR}[/yellow]")
                return
            for txt_file in txt_files:
                process_txt_file(txt_file, pipeline, voice_file, speed=speed)
    except KeyboardInterrupt:
        console.print("\n[yellow]Watcher stopped by user.[/yellow]")
    finally:
        if PID_FILE.exists():
            PID_FILE.unlink(missing_ok=True)


if __name__ == "__main__":
    app()
