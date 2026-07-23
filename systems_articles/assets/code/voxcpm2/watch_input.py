#!/usr/bin/env python3
"""
VoxCPM2 Automated Text-to-MP3 Folder Watcher (`watch_input.py`)
================================================================
Monitors `voxcpm2/input/*.txt` for new text files,
automatically synthesizes high-fidelity speech using Thomas's cloned voice (VoxCPM2),
and exports the result directly as an MP3 file into `voxcpm2/output/`.

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

# Suppress harmless streaming retry UserWarnings for clean terminal UI
warnings.filterwarnings("ignore", category=UserWarning, module=".*voxcpm.*")
warnings.filterwarnings("ignore", message=".*Retry on bad cases.*")

# Suppress internal tqdm output for clean Rich progress rendering
import tqdm
_orig_tqdm = tqdm.tqdm
def _silent_tqdm(*args, **kwargs):
    kwargs['disable'] = True
    return _orig_tqdm(*args, **kwargs)
tqdm.tqdm = _silent_tqdm

# Configure PyTorch CUDA memory allocation to avoid fragmentation
os.environ["PYTORCH_CUDA_ALLOC_CONF"] = "expandable_segments:True"

console = Console()
app = typer.Typer(help="VoxCPM2 Automated Text-to-MP3 Folder Processor")

# Dynamic Paths Setup (Portable & Privacy-Safe)
BASE_DIR = Path(__file__).resolve().parent
INPUT_DIR = BASE_DIR / "input"
OUTPUT_DIR = BASE_DIR / "output"
PROCESSED_DIR = INPUT_DIR / ".processed"
LOCAL_MODEL_DIR = BASE_DIR / "models" / "VoxCPM2"
DEFAULT_VOICE = BASE_DIR / "clone" / "1_thomas_segment_125_219_(Vocals).wav"
PID_FILE = Path("/tmp/voxcpm_watcher.pid")

# Configure structured logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("watch_input")


def split_text_into_chunks(text: str, target_words: int = 300) -> List[str]:
    """
    Splits text strictly at sentence boundaries (. ! ? ;).
    Accumulates complete sentences up to ~target_words (300 words).
    Never cuts words in the middle or sentences mid-phrase.
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


def convert_wav_to_mp3(wav_path: Path, mp3_path: Path) -> bool:
    """Converts a WAV audio file to 320kbps MP3 using FFmpeg."""
    cmd = [
        "ffmpeg", "-y",
        "-i", str(wav_path),
        "-codec:a", "libmp3lame",
        "-b:a", "320k",
        str(mp3_path)
    ]
    try:
        subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        return mp3_path.exists()
    except Exception as e:
        logger.error(f"FFmpeg conversion to MP3 failed for {wav_path}: {e}")
        return False


def process_txt_file(txt_file: Path, tts_model, voice_path: Path):
    """Reads a .txt file, chunk-synthesizes speech using VoxCPM2, and writes an MP3 file."""
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

    # Split text into ~300-word sentence chunks
    text_chunks = split_text_into_chunks(text_content, target_words=300)
    num_chunks = len(text_chunks)
    total_words = len(text_content.split())
    total_doc_est_frames = max(50, int(total_words * 8.35))

    console.print(Panel(f"[bold cyan]Synthesizing Document:[/bold cyan] '{txt_file.name}'\n"
                        f"[yellow]{total_words} words[/yellow] split into [green]{num_chunks} sentence chunk{'s' if num_chunks > 1 else ''}[/green] -> '{target_mp3_path.name}'", title="VoxCPM2 Synthesis"))

    import soundfile as sf
    import torch

    audio_segments = []
    sample_rate = 48000
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
        # Live Overall Document Progress (0% to 100%)
        overall_task = progress.add_task(f"[bold yellow]Overall Document Progress[/bold yellow]", total=total_doc_est_frames)

        for idx, chunk in enumerate(text_chunks, start=1):
            chunk_words = len(chunk.split())
            est_chunk_frames = max(30, int(chunk_words * 8.35))

            chunk_task = progress.add_task(f"Chunk {idx}/{num_chunks} ({chunk_words} words)", total=est_chunk_frames)
            chunk_audio_patches = []
            chunk_step = 0

            for audio_patch in tts_model.generate_streaming(
                text=chunk,
                reference_wav_path=str(voice_path),
                cfg_value=2.0,
                inference_timesteps=10,
            ):
                chunk_step += 1
                total_frames_generated += 1
                chunk_audio_patches.append(audio_patch)

                # Live sub-chunk update
                progress.update(chunk_task, completed=min(chunk_step, est_chunk_frames), description=f"Chunk {idx}/{num_chunks} (Frame {chunk_step}/{est_chunk_frames})")

                # Live continuous 1% -> 100% overall document update
                progress.update(overall_task, completed=min(total_frames_generated, total_doc_est_frames))

            if chunk_audio_patches:
                chunk_audio = np.concatenate(chunk_audio_patches)
                audio_segments.append(chunk_audio)

            progress.update(chunk_task, completed=est_chunk_frames, description=f"[green]✓ Chunk {idx}/{num_chunks} Complete ({chunk_step} frames)[/green]")

            if torch.cuda.is_available():
                torch.cuda.empty_cache()

        progress.update(overall_task, completed=total_doc_est_frames, description="[bold green]✓ Overall Document Progress Complete[/bold green]")

    # Concatenate all sentence chunk audio arrays into one continuous audio track
    combined_audio = np.concatenate(audio_segments) if len(audio_segments) > 1 else audio_segments[0]

    # Save temporary WAV
    sf.write(str(temp_wav_path), combined_audio, sample_rate)

    # Convert to MP3
    if convert_wav_to_mp3(temp_wav_path, target_mp3_path):
        console.print(f"[bold green]✓ Successfully generated MP3 (100% Complete):[/bold green] {target_mp3_path}")
        if temp_wav_path.exists():
            temp_wav_path.unlink()
        # Archive processed txt file
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
):
    """
    Scans the input directory for .txt files and converts them to MP3 using Thomas's cloned voice.
    """
    INPUT_DIR.mkdir(exist_ok=True)
    OUTPUT_DIR.mkdir(exist_ok=True)
    PROCESSED_DIR.mkdir(exist_ok=True)

    if not DEFAULT_VOICE.exists():
        console.print(f"[bold red]Error:[/bold red] Default Thomas voice file missing at: {DEFAULT_VOICE}")
        raise typer.Exit(code=1)

    console.print(Panel("[bold green]VoxCPM2 Automated Text-to-MP3 Converter[/bold green]\n"
                        f"Input Dir:  {INPUT_DIR}\n"
                        f"Output Dir: {OUTPUT_DIR}\n"
                        f"Voice:      Thomas ({DEFAULT_VOICE.name})", title="VoxCPM2 Watcher"))

    try:
        import torch
        from voxcpm import VoxCPM
    except ImportError:
        console.print("[bold red]Error:[/bold red] VoxCPM package not available in python environment.")
        raise typer.Exit(code=1)

    device = "cuda" if torch.cuda.is_available() else "cpu"
    model_id = str(LOCAL_MODEL_DIR) if LOCAL_MODEL_DIR.exists() else "openbmb/VoxCPM2"

    logger.info(f"Loading VoxCPM2 model on {device.upper()}...")
    model = VoxCPM.from_pretrained(model_id, device=device)
    logger.info("Model loaded and ready.")

    # Write PID lock
    with open(PID_FILE, "w") as f:
        f.write(str(os.getpid()))

    try:
        if watch:
            console.print("[bold green]Running in continuous WATCH mode. Press Ctrl+C to stop.[/bold green]")
            while True:
                txt_files = sorted(list(INPUT_DIR.glob("*.txt")))
                for txt_file in txt_files:
                    process_txt_file(txt_file, model, DEFAULT_VOICE)
                time.sleep(interval)
        else:
            txt_files = sorted(list(INPUT_DIR.glob("*.txt")))
            if not txt_files:
                console.print(f"[yellow]No .txt files currently found in {INPUT_DIR}[/yellow]")
                return
            for txt_file in txt_files:
                process_txt_file(txt_file, model, DEFAULT_VOICE)
    except KeyboardInterrupt:
        console.print("\n[yellow]Watcher stopped by user.[/yellow]")
    finally:
        if PID_FILE.exists():
            PID_FILE.unlink(missing_ok=True)


if __name__ == "__main__":
    app()
