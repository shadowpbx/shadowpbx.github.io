#!/usr/bin/env python3
"""
Kokoro-82M Voice Generator CLI Tool (`say.py`)
==============================================
A command-line utility to synthesize speech using Kokoro-82M voice presets.
Uses local module configuration from `kokoro/config.py`.
"""

import sys
import re
import logging
import warnings
import subprocess
import numpy as np
from pathlib import Path
from typing import Optional, List
import typer
from rich.console import Console
from rich.panel import Panel
from rich.progress import Progress, TextColumn, BarColumn, TaskProgressColumn, TimeRemainingColumn, SpinnerColumn

# Import local module configuration
from config import convert_wav_to_mp3, DEFAULT_MP3_BITRATE, CHUNK_WORDS, SAMPLE_RATE, DEFAULT_VOICE, DEFAULT_SPEED

# Suppress harmless espeak UserWarnings for clean terminal UI
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

console = Console()
app = typer.Typer(help="Kokoro-82M Voice Generator CLI")

# Structured Logging Setup
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("kokoro_say")

BASE_DIR = Path(__file__).resolve().parent
LOCAL_MODEL_DIR = BASE_DIR / "models" / "Kokoro-82M"
VOICES_DIR = LOCAL_MODEL_DIR / "voices"


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


@app.command()
def speak(
    text: str = typer.Argument(..., help="The text to synthesize into speech."),
    voice: str = typer.Option(DEFAULT_VOICE, "--voice", "-v", help="Voice preset (default: 'af_heart')."),
    output: Optional[str] = typer.Option(None, "--output", "-o", help="Output file path (defaults to output/speech_<voice>.mp3)."),
    speed: float = typer.Option(DEFAULT_SPEED, "--speed", "-s", help="Speaking speed multiplier (default: 0.9)."),
):
    """
    Synthesize text into MP3 speech using a Kokoro-82M voice preset (default: af_heart, speed: 0.9).
    """
    console.print(Panel(f"[bold cyan]Kokoro-82M Speech Generator[/bold cyan]\nTarget Text: [yellow]'{text[:100]}{'...' if len(text) > 100 else ''}'[/yellow]", title="Kokoro-82M"))

    voice_file = VOICES_DIR / f"{voice}.pt"
    if not voice_file.exists():
        console.print(f"[bold red]Error:[/bold red] Voice file '{voice}.pt' not found at: {voice_file}")
        console.print(f"Available voice files: {[f.stem for f in VOICES_DIR.glob('*.pt')][:10]}...")
        raise typer.Exit(code=1)

    console.print(f"[bold green]✓[/bold green] Using voice preset: [bold gold1]{voice}[/bold gold1] (Speed: {speed})")

    output_dir = BASE_DIR / "output"
    output_dir.mkdir(exist_ok=True)

    if output:
        out_mp3_file = Path(output)
        if not out_mp3_file.suffix:
            out_mp3_file = out_mp3_file.with_suffix(".mp3")
        out_mp3_file.parent.mkdir(exist_ok=True)
    else:
        out_mp3_file = output_dir / f"speech_{voice}.mp3"

    temp_wav_file = output_dir / f"temp_{out_mp3_file.stem}.wav"

    text_chunks = split_text_into_chunks(text, target_words=CHUNK_WORDS)
    num_chunks = len(text_chunks)
    total_words = len(text.split())
    total_doc_est_frames = max(50, int(total_words * 2.85))

    try:
        import torch
        import soundfile as sf
        from kokoro import KPipeline, KModel
    except ImportError:
        console.print(f"[bold red]Error:[/bold red] Required packages not found. Ensure 'kokoro' conda environment is active.")
        raise typer.Exit(code=1)

    device = "cuda" if torch.cuda.is_available() else "cpu"
    config_path = str(LOCAL_MODEL_DIR / "config.json")
    pth_path = str(LOCAL_MODEL_DIR / "kokoro-v1_0.pth")

    console.print(f"[dim]Loading Kokoro-82M model on {device.upper()} from local directory...[/dim]")
    kmodel = KModel(repo_id="hexgrad/Kokoro-82M", config=config_path, model=pth_path).to(device).eval()
    pipeline = KPipeline(lang_code="a", repo_id="hexgrad/Kokoro-82M", model=kmodel)

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
    sf.write(str(temp_wav_file), combined_audio, sample_rate)

    if convert_wav_to_mp3(temp_wav_file, out_mp3_file):
        if temp_wav_file.exists():
            temp_wav_file.unlink()
        console.print(f"[bold green]✓ Audio generated successfully ({DEFAULT_MP3_BITRATE} MP3):[/bold green]")
        console.print(f"File saved to: [bold underline white]{out_mp3_file.resolve()}[/bold underline white]")
    else:
        logger.error(f"Failed to create MP3 file at {out_mp3_file}")

if __name__ == "__main__":
    app()
