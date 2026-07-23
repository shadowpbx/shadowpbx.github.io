---
title: "Modified Kokoro-82M Engine: Zero-Word-Cut Processing, Automated Watcher & Full Source"
date: "2026.07.22"
tags: ["SYSTEMS", "AUDIO"]
summary: "A comprehensive journaling guide and code archive for building a custom-modified Kokoro-82M TTS engine with zero-word-cut sentence chunking and background watcher daemon."
---

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-left: 4px solid #4338ca; padding: 1.25rem 1.5rem; border-radius: 0 8px 8px 0; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <p style="margin: 0; font-size: 1.05rem; line-height: 1.6; color: #334155; font-style: italic; font-weight: 500;">
        <strong>Purpose:</strong> A comprehensive, self-contained journaling guide and full un-truncated source code archive to build, configure, or recreate the entire custom-modified <strong>Kokoro-82M</strong> Text-to-Speech (TTS) pipeline, CLI speech generator, and automated Text-to-MP3 folder watcher from complete scratch on any Linux system.
    </p>
</div>

---

## Table of Contents

1. [Default System Presets (`af_heart`, Speed `0.9`, Bitrate `192kbps`)](#1-default-system-presets-af_heart-speed-09-bitrate-192kbps)
2. [Understanding Kokoro's Token Limit & Word-Slicing Problem](#2-understanding-kokoros-token-limit--word-slicing-problem)
3. [System & Hardware Requirements](#3-system--hardware-requirements)
4. [Conda Environment & Dependency Installation](#4-conda-environment--dependency-installation)
5. [Downloading Model Weights Locally (`kokoro/models/Kokoro-82M`)](#5-downloading-model-weights-locally-kokoromodelskokoro-82m)
6. [Phonemizer & Espeak-NG Loader Compatibility Patch](#6-phonemizer--espeak-ng-loader-compatibility-patch)
7. [Smart 250-Word Sentence-Boundary Chunking](#7-smart-250-word-sentence-boundary-chunking)
8. [Directory Architecture & Visible Workflow (`input/processed/`)](#8-directory-architecture--visible-workflow-inputprocessed)
9. [Running the CLI Speech Tool (`say.py`)](#9-running-the-cli-speech-tool-saypy)
10. [Running the Automated Folder Watcher (`run.py` / `watch_input.py`)](#10-running-the-automated-folder-watcher-runpy--watch_inputpy)
11. [Full Source Code Archive & Direct Downloads](#11-full-source-code-archive--direct-downloads)

---

## 1. Default System Presets (`af_heart`, Speed `0.9`, Bitrate `192kbps`)

All configuration options are defined in **`kokoro/config.py`**:

* **Default Voice**: **`af_heart`** (American Female Heart - warm, natural, high quality).
* **Default Speaking Speed**: **`0.9`** (Balanced, natural pacing).
* **Default Output Format**: **192kbps MP3** (Encoded via FFmpeg `libmp3lame`).
* **Output Folder**: `kokoro/output/`
* **Processed Text Folder**: `kokoro/input/processed/` (Visible folder).

---

## 2. Understanding Kokoro's Token Limit & Word-Slicing Problem

### The Problem
Kokoro-82M uses a StyleTTS2 architecture that has a maximum context limit of **512 phoneme tokens** (~250 words max). When long text is passed into standard Kokoro wrappers without sentence boundary chunking, the internal phonemizer splits text arbitrarily at token boundaries or character offsets. This caused words to be sliced mid-string, producing broken audio artifacts like `str` ... `ong` instead of `strong`.

### The Solution
We implemented **Word-Based Sentence-Boundary Chunking**:

1. **Target Chunk Size**: 250 words per chunk max (~1,200 – 1,500 characters).
2. **Strict Sentence Boundaries**: Cuts text **only at sentence endings** (`.`, `!`, `?`, `;`).
3. **Zero Mid-Word Cuts**: Never slices words in the middle.
4. **Zero Mid-Sentence Cuts**: Preserves complete natural phrasing.
5. **Seamless Audio Concatenation**: Synthesizes chunk-by-chunk on GPU, concatenates audio arrays via NumPy at 24,000Hz, and exports 192kbps MP3 via FFmpeg.

---

## 3. System & Hardware Requirements

* **OS**: Ubuntu Linux 22.04 / 24.04 LTS (or any Linux distribution)
* **GPU**: NVIDIA GPU with CUDA support (e.g. RTX 3060, RTX 4090, T4)
* **System Package**: `espeak-ng` (`sudo apt-get install espeak-ng ffmpeg`)
* **Storage Directory**: `kokoro/`

---

## 4. Conda Environment & Dependency Installation

Execute the following commands in your shell to set up the dedicated Python environment:

```bash
# 1. Create conda environment with Python 3.10
conda create -n kokoro python=3.10 -y

# 2. Install PyTorch with CUDA 12.1 support
$HOME/miniconda3/envs/kokoro/bin/pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# 3. Install Kokoro, ONNX, and Audio processing packages
$HOME/miniconda3/envs/kokoro/bin/pip install kokoro kokoro-onnx soundfile rich typer transformers huggingface_hub scipy phonemizer espeakng-loader "misaki[en]"
```

---

## 5. Downloading Model Weights Locally (`kokoro/models/Kokoro-82M`)

All model weights and 70+ voice presets are stored directly inside `kokoro/models/Kokoro-82M` so the engine operates 100% offline without querying remote Hugging Face endpoints during runtime:

```bash
mkdir -p kokoro/models/Kokoro-82M
$HOME/miniconda3/envs/kokoro/bin/python -c "
from huggingface_hub import snapshot_download
import os
target_dir = os.path.expanduser('kokoro/models/Kokoro-82M')
snapshot_download(repo_id='hexgrad/Kokoro-82M', local_dir=target_dir)
"
```

To clean unnecessary Hugging Face cache while preserving local weights:

```bash
rm -rf ~/.cache/huggingface/hub/models--hexgrad--Kokoro-82M
```

---

## 6. Phonemizer & Espeak-NG Loader Compatibility Patch

When loading `misaki` / `phonemizer` on Linux systems, `espeakng_loader` can return an internal build path. To fix this, we apply a 2-line monkeypatch at the top of all Python scripts:

```python
import espeakng_loader
espeakng_loader.get_data_path = lambda: '/usr/share/espeak-ng-data'

import phonemizer.backend.espeak.wrapper as _ew
if not hasattr(_ew.EspeakWrapper, 'set_data_path') or callable(getattr(_ew.EspeakWrapper, 'set_data_path', None)):
    _ew.EspeakWrapper.set_data_path = classmethod(lambda cls, path: _ew.EspeakWrapper.set_library('/usr/lib/x86_64-linux-gnu/libespeak-ng.so'))
```

---

## 7. Smart 250-Word Sentence-Boundary Chunking

```python
def split_text_into_chunks(text: str, target_words: int = 250) -> List[str]:
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
```

---

## 8. Directory Architecture & Visible Workflow (`input/processed/`)

```text
kokoro/
├── config.py              # Central module settings (Voice, Speed: 0.9, Bitrate: 192k)
├── run.py                 # Master service launcher script
├── start.py               # Master launcher alias
├── say.py                 # CLI voice generator utility
├── watch_input.py         # Automated Text-to-MP3 folder watcher daemon
├── README.md              # Quick start user documentation
├── TUTORIAL.md            # Self-contained setup guide & full source code archive
├── input/                 # Drop .txt files here to auto-convert to MP3
│   └── processed/         # Visible archive folder for processed text files
├── output/                # Generated 192kbps MP3 audio files
└── models/                # 100% OFFLINE LOCAL MODEL WEIGHTS
    └── Kokoro-82M/        # Local model weights (kokoro-v1_0.pth) & 70+ voices
```

---

## 9. Running the CLI Speech Tool (`say.py`)

Synthesize any text string using default settings (`af_heart`, speed `0.9`, `192kbps MP3`):

```bash
$HOME/miniconda3/envs/kokoro/bin/python kokoro/say.py "Hello world, testing Kokoro speech generation."
```

Override options if needed:

```bash
$HOME/miniconda3/envs/kokoro/bin/python kokoro/say.py "Custom text" --voice am_adam --speed 1.0 --output custom.mp3
```

---

## 10. Running the Automated Folder Watcher (`run.py` / `watch_input.py`)

Run the master launcher:

```bash
python3 kokoro/run.py
```

> Drop any `.txt` file into `kokoro/input/`. The watcher will convert it to a 192kbps MP3 file in `kokoro/output/` and move the original text file into the visible folder `kokoro/input/processed/`.

---

## 11. Full Source Code Archive & Direct Downloads

You can download the raw, ready-to-run Python scripts directly or expand the accordions below to inspect the source code online.

<div style="margin: 1.5rem 0 2.5rem 0; padding: 1.5rem; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
    <p style="margin-top: 0; font-weight: 700; color: #0f172a; font-family: var(--font-mono); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;">📦 1-Click Code Downloads</p>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem;">
        <a href="/systems_articles/assets/code/kokoro/config.py" download style="background: #ffffff; border: 1px solid #cbd5e1; padding: 0.6rem 1rem; border-radius: 6px; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; color: #4338ca; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">[ ⬇ Download config.py ]</a>
        <a href="/systems_articles/assets/code/kokoro/run.py" download style="background: #ffffff; border: 1px solid #cbd5e1; padding: 0.6rem 1rem; border-radius: 6px; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; color: #4338ca; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">[ ⬇ Download run.py ]</a>
        <a href="/systems_articles/assets/code/kokoro/start.py" download style="background: #ffffff; border: 1px solid #cbd5e1; padding: 0.6rem 1rem; border-radius: 6px; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; color: #4338ca; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">[ ⬇ Download start.py ]</a>
        <a href="/systems_articles/assets/code/kokoro/watch_input.py" download style="background: #ffffff; border: 1px solid #cbd5e1; padding: 0.6rem 1rem; border-radius: 6px; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; color: #4338ca; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">[ ⬇ Download watch_input.py ]</a>
        <a href="/systems_articles/assets/code/kokoro/say.py" download style="background: #ffffff; border: 1px solid #cbd5e1; padding: 0.6rem 1rem; border-radius: 6px; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; color: #4338ca; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">[ ⬇ Download say.py ]</a>
    </div>
</div>

---

### File 1: `kokoro/config.py`

<details>
<summary style="font-family: var(--font-mono); font-weight: 700; cursor: pointer; color: #4338ca; padding: 0.5rem 0;">▶ Click to View Source Code: kokoro/config.py</summary>

```python
#!/usr/bin/env python3
"""
Kokoro-82M Module Configuration (`kokoro/config.py`)
=====================================================
Self-contained module configuration for Kokoro-82M.
Modify DEFAULT_MP3_BITRATE, DEFAULT_VOICE, or DEFAULT_SPEED here to change defaults for all Kokoro tools!
"""

import logging
import subprocess
from pathlib import Path

# ==============================================================================
# KOKORO-82M MODULE CONFIGURATION
# ==============================================================================
DEFAULT_MP3_BITRATE = "192k"  # Options: "128k", "192k", "256k", "320k"
DEFAULT_VOICE = "af_heart"     # Default voice preset
DEFAULT_SPEED = 0.9            # Default speaking speed (0.9 = balanced, natural pacing)
CHUNK_WORDS = 250              # Sentence chunk word limit for Kokoro
SAMPLE_RATE = 24000            # Audio sample rate
# ==============================================================================


def convert_wav_to_mp3(wav_path: Path, mp3_path: Path, bitrate: str = DEFAULT_MP3_BITRATE) -> bool:
    """Converts a WAV audio file to MP3 using FFmpeg with default bitrate."""
    cmd = [
        "ffmpeg", "-y",
        "-i", str(wav_path),
        "-codec:a", "libmp3lame",
        "-b:a", bitrate,
        str(mp3_path)
    ]
    try:
        subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, check=True)
        return mp3_path.exists()
    except Exception as e:
        logging.error(f"FFmpeg conversion to MP3 failed for {wav_path}: {e}")
        return False
```
</details>

---

### File 2: `kokoro/run.py`

<details>
<summary style="font-family: var(--font-mono); font-weight: 700; cursor: pointer; color: #4338ca; padding: 0.5rem 0;">▶ Click to View Source Code: kokoro/run.py</summary>

```python
#!/usr/bin/env python3
"""
Kokoro-82M Master Service Launcher (`kokoro/run.py` / `kokoro/start.py`)
========================================================================
One-click python script that initializes system paths, verifies Kokoro local models,
and runs the automated Text-to-MP3 watcher service (`watch_input.py --watch`).

Usage:
    python3 run.py
"""

import os
import sys
import subprocess
from pathlib import Path

# Dynamic Paths Setup (Portable & Privacy-Safe)
ROOT_DIR = Path(__file__).resolve().parent
CONDA_PYTHON = Path.home() / "miniconda3" / "envs" / "kokoro" / "bin" / "python"
WATCHER_SCRIPT = ROOT_DIR / "watch_input.py"
INPUT_DIR = ROOT_DIR / "input"
OUTPUT_DIR = ROOT_DIR / "output"
PROCESSED_DIR = INPUT_DIR / "processed"
LOCAL_MODEL_DIR = ROOT_DIR / "models" / "Kokoro-82M"

def main():
    print("=" * 65)
    print("  Kokoro-82M Master Text-to-MP3 Service Launcher")
    print("=" * 65)

    # 1. Ensure directories exist
    INPUT_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

    print(f"[+] Input Directory     : {INPUT_DIR.resolve()}")
    print(f"[+] Output Directory    : {OUTPUT_DIR.resolve()}")
    print(f"[+] Processed Directory : {PROCESSED_DIR.resolve()}")
    print(f"[+] Local Model Dir     : {LOCAL_MODEL_DIR.resolve()}")

    # 2. Check Conda Environment Python
    if not CONDA_PYTHON.exists():
        print(f"[!] Error: Conda environment Python not found at {CONDA_PYTHON}")
        print("    Please ensure the 'kokoro' conda environment is installed.")
        sys.exit(1)

    print(f"[+] Python Executable   : {CONDA_PYTHON}")

    # 3. Check Watcher Script
    if not WATCHER_SCRIPT.exists():
        print(f"[!] Error: Watcher script not found at {WATCHER_SCRIPT}")
        sys.exit(1)

    print(f"[+] Watcher Script      : {WATCHER_SCRIPT}")
    print("\n[➔] Starting automated Text-to-MP3 folder watcher (Kokoro-82M)...")
    print("    Drop any .txt file into 'kokoro/input/' to generate an MP3 in 'kokoro/output/'.")
    print("    Press Ctrl+C to stop the service.\n")

    # 4. Re-execute via Conda Python environment with --watch flag
    cmd = [str(CONDA_PYTHON), str(WATCHER_SCRIPT), "--watch"]

    try:
        subprocess.run(cmd, check=True)
    except KeyboardInterrupt:
        print("\n[✔] Kokoro-82M Service stopped by user.")
    except subprocess.CalledProcessError as e:
        print(f"\n[!] Watcher process exited with error code {e.returncode}")
        sys.exit(e.returncode)

if __name__ == "__main__":
    main()
```
</details>

---

### File 3: `kokoro/start.py`

<details>
<summary style="font-family: var(--font-mono); font-weight: 700; cursor: pointer; color: #4338ca; padding: 0.5rem 0;">▶ Click to View Source Code: kokoro/start.py</summary>

```python
#!/usr/bin/env python3
"""
Kokoro-82M Master Service Launcher Alias (`kokoro/start.py`)
"""
import run

if __name__ == "__main__":
    run.main()
```
</details>

---

### File 4: `kokoro/watch_input.py`

<details>
<summary style="font-family: var(--font-mono); font-weight: 700; cursor: pointer; color: #4338ca; padding: 0.5rem 0;">▶ Click to View Source Code: kokoro/watch_input.py</summary>

```python
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
```
</details>

---

### File 5: `kokoro/say.py`

<details>
<summary style="font-family: var(--font-mono); font-weight: 700; cursor: pointer; color: #4338ca; padding: 0.5rem 0;">▶ Click to View Source Code: kokoro/say.py</summary>

```python
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
```
</details>
