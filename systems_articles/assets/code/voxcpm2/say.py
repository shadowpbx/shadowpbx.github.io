#!/usr/bin/env python3
"""
VoxCPM2 Voice Generator CLI Tool (`say.py`)
============================================
A command-line tool to synthesize speech using registered voice presets
(such as 'thomas') or custom reference audio files.
Displays continuous live 1% to 100% overall document progress alongside sub-chunk progress.
"""

import sys
import re
import logging
import warnings
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

console = Console()
app = typer.Typer(help="VoxCPM2 Voice Generator CLI")

# Structured Logging Setup
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("voxcpm_say")

# Dynamic Paths Setup (Portable & Privacy-Safe)
BASE_DIR = Path(__file__).resolve().parent
CLONE_DIR = BASE_DIR / "clone"
LOCAL_MODEL_DIR = BASE_DIR / "models" / "VoxCPM2"

VOICE_PRESETS = {
    "thomas": CLONE_DIR / "1_thomas_segment_125_219_(Vocals).wav",
    "default": CLONE_DIR / "1_thomas_segment_125_219_(Vocals).wav",
}


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


@app.command()
def speak(
    text: str = typer.Argument(..., help="The text to synthesize into speech."),
    voice: str = typer.Option("thomas", "--voice", "-v", help="Registered voice preset (e.g. 'thomas') or path to WAV file."),
    output: Optional[str] = typer.Option(None, "--output", "-o", help="Output file path (defaults to output/speech.wav)."),
    cfg: float = typer.Option(2.0, "--cfg", help="Classifier-free guidance scale."),
    steps: int = typer.Option(10, "--steps", help="Inference timesteps."),
):
    """
    Synthesize text into speech using a voice preset or reference file.
    """
    console.print(Panel(f"[bold cyan]VoxCPM2 Speech Generator[/bold cyan]\nTarget Text: [yellow]'{text[:100]}{'...' if len(text) > 100 else ''}'[/yellow]", title="VoxCPM2"))

    # Resolve Voice Reference File
    voice_path: Optional[Path] = None
    voice_key = voice.strip().lower()

    if voice_key in VOICE_PRESETS:
        voice_path = VOICE_PRESETS[voice_key]
        console.print(f"[bold green]✓[/bold green] Using registered voice preset: [bold gold1]{voice_key}[/bold gold1] ({voice_path.name})")
    else:
        custom_path = Path(voice)
        if custom_path.exists() and custom_path.is_file():
            voice_path = custom_path
            console.print(f"[bold green]✓[/bold green] Using custom audio reference: {voice_path.resolve()}")
        else:
            console.print(f"[bold red]Error:[/bold red] Voice preset or file '[yellow]{voice}[/yellow]' not found.")
            console.print(f"Available presets: {list(VOICE_PRESETS.keys())}")
            raise typer.Exit(code=1)

    # Resolve Output Path
    output_dir = BASE_DIR / "output"
    output_dir.mkdir(exist_ok=True)

    if output:
        out_file = Path(output)
        out_file.parent.mkdir(exist_ok=True)
    else:
        out_file = output_dir / f"speech_{voice_key}.wav"

    text_chunks = split_text_into_chunks(text, target_words=300)
    num_chunks = len(text_chunks)
    total_words = len(text.split())
    total_doc_est_frames = max(50, int(total_words * 8.35))

    try:
        import torch
        import soundfile as sf
        from voxcpm import VoxCPM
    except ImportError as e:
        console.print(f"[bold red]Error:[/bold red] Required packages not found. Ensure 'voxcpm' conda environment is active.")
        raise typer.Exit(code=1)

    device = "cuda" if torch.cuda.is_available() else "cpu"
    model_id = str(LOCAL_MODEL_DIR) if LOCAL_MODEL_DIR.exists() else "openbmb/VoxCPM2"

    console.print(f"[dim]Loading VoxCPM2 model on {device.upper()}...[/dim]")
    model = VoxCPM.from_pretrained(model_id, device=device)

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

            for audio_patch in model.generate_streaming(
                text=chunk,
                reference_wav_path=str(voice_path),
                cfg_value=cfg,
                inference_timesteps=steps,
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

    combined_audio = np.concatenate(audio_segments) if len(audio_segments) > 1 else audio_segments[0]
    sf.write(str(out_file), combined_audio, sample_rate)

    console.print(f"[bold green]✓ Audio generated successfully (100% Complete)![/bold green]")
    console.print(f"File saved to: [bold underline white]{out_file.resolve()}[/bold underline white] (Sample Rate: {sample_rate}Hz)")

if __name__ == "__main__":
    app()
