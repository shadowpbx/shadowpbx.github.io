---
title: "The Ultimate Guide to Local Voice Cloning with VoxCPM2"
date: "2026.07.22"
tags: ["AUDIO"]
summary: "A production-ready guide and code archive for building a fully local VoxCPM2 voice cloning ecosystem, background text-to-MP3 watcher daemon, and GPU-accelerated pipeline."
---

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-left: 4px solid #4338ca; padding: 1.25rem 1.5rem; border-radius: 0 8px 8px 0; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <p style="margin: 0; font-size: 1.05rem; line-height: 1.6; color: #334155; font-style: italic; font-weight: 500;">
        <strong>Purpose:</strong> Designed as both a personal journal and a definitive code archive, this guide details how to build a production-ready, fully local <strong>VoxCPM2</strong> ecosystem. It contains everything needed—from PyTorch environment setup to deploying a background Text-to-MP3 watcher daemon—to recreate the system entirely from scratch.
    </p>
    <p style="margin: 0.75rem 0 0 0; font-size: 0.9rem; line-height: 1.5; color: #475569;">
        💡 <em>Looking to clean & extract raw vocal samples first? Check out our companion guide: <a href="/systems_articles/posts/2026-07-22-professional-voice-isolation-uvr5-ubuntu.html" style="color: #4338ca; font-weight: 700; text-decoration: underline;">Professional Voice Isolation & Audio Cleanup: The Ultimate UVR5 Workflow on Ubuntu</a>.</em>
    </p>
</div>

---

## Table of Contents

1. [System & Hardware Requirements](#1-system--hardware-requirements)
2. [Conda Environment & PyTorch CUDA Setup](#2-conda-environment--pytorch-cuda-setup)
3. [Cloning VoxCPM Repository & Offline Model Weights](#3-cloning-voxcpm-repository--offline-model-weights)
4. [Voice Cloning Reference & Preset Registration (Thomas)](#4-voice-cloning-reference--preset-registration-thomas)
5. [Building the CLI Voice Generator Tool (`say.py`)](#5-building-the-cli-voice-generator-tool-saypy)
6. [Building the Automated Text-to-MP3 Watcher Daemon (`watch_input.py`)](#6-building-the-automated-text-to-mp3-watcher-daemon-watch_inputpy)
7. [Solving KV Cache Overflow (`ValueError: KV cache is full`)](#7-solving-kv-cache-overflow-valueerror-kv-cache-is-full)
8. [Live Terminal Progress Bar & Warning Filter](#8-live-terminal-progress-bar--warning-filter)
9. [One-Click Master Launchers (`run.py` & `start.py`)](#9-one-click-master-launchers-runpy--startpy)
10. [Folder Directory Standardization](#10-folder-directory-standardization)
11. [Git Version Control & Safe Checkpoint Tagging](#11-git-version-control--safe-checkpoint-tagging)
12. [Full Source Code Archive](#12-full-source-code-archive)

---

## 1. System & Hardware Requirements

* **OS**: Ubuntu Linux 22.04 / 24.04 LTS
* **RAM**: 128 GB
* **GPU**: Dual NVIDIA GeForce RTX 3060 (12 GB VRAM each, CUDA 12.1 enabled)
* **Storage Directory**: `~/Application/AI/TTS/voxcpm2`

---

## 2. Conda Environment & PyTorch CUDA Setup

### Step 2.1: Install Miniconda (if needed)

```bash
wget https://repo.anaconda.com/miniconda/Miniconda3-latest-Linux-x86_64.sh
bash Miniconda3-latest-Linux-x86_64.sh -b -p ~/miniconda3
```

### Step 2.2: Create `voxcpm` Conda Environment (Python 3.11)

```bash
~/miniconda3/bin/conda create -n voxcpm python=3.11 -y
```

### Step 2.3: Install PyTorch with CUDA 12.1 Support

```bash
~/miniconda3/envs/voxcpm/bin/pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
```

### Step 2.4: Install Required Packages

You can install dependencies directly or via a standard `requirements.txt`:

```bash
~/miniconda3/envs/voxcpm/bin/pip install soundfile rich typer modelscope transformers huggingface_hub ffmpeg-python
```

#### `requirements.txt`:

```text
# PyTorch (Note: Best installed via the PyTorch index for CUDA 12.1 support)
torch
torchvision
torchaudio

# Audio Processing
soundfile
ffmpeg-python
numpy

# CLI & Visualization Tools
rich
typer
tqdm

# Deep Learning & Model Hubs
modelscope
transformers
huggingface_hub
```

---

## 3. Cloning VoxCPM Repository & Offline Model Weights

### Step 3.1: Clone OpenBMB Repository

```bash
mkdir -p ~/Application/AI/TTS
cd ~/Application/AI/TTS
git clone https://github.com/OpenBMB/VoxCPM.git voxcpm2
cd voxcpm2
~/miniconda3/envs/voxcpm/bin/pip install -e .
```

### Step 3.2: Download Model Weights Standalone

Download the 2B parameter VoxCPM2 model weights (4.7 GB) and store them directly inside `voxcpm2/models/VoxCPM2`:

```bash
mkdir -p ~/Application/AI/TTS/voxcpm2/models
~/miniconda3/envs/voxcpm/bin/python -c "
from huggingface_hub import snapshot_download
snapshot_download(repo_id='openbmb/VoxCPM2', local_dir='models/VoxCPM2')
"
```

### Step 3.3: Clean Hugging Face Cache to Save Disk Space

Delete temporary Hugging Face cache to free up 4.7 GB while keeping local standalone model files intact:

```bash
rm -rf ~/.cache/huggingface/hub/models--openbmb--VoxCPM2
```

---

## 4. Voice Cloning Reference & Preset Registration (Thomas)

Create a `clone` directory for reference audio:

```bash
mkdir -p voxcpm2/clone
```

Place isolated vocal WAV files inside `clone/`. The registered reference voice file for Thomas is:

```text
voxcpm2/clone/1_thomas_segment_125_219_(Vocals).wav
```

*(This clean vocal track was isolated using the MDX-Net model in UVR5. For the complete step-by-step vocal extraction guide, see: [Professional Voice Isolation & Audio Cleanup: The Ultimate UVR5 Workflow on Ubuntu](/systems_articles/posts/2026-07-22-professional-voice-isolation-uvr5-ubuntu.html)).*

---

## 5. Building the CLI Voice Generator Tool (`say.py`)

Create `voxcpm2/say.py` to allow instant command-line speech generation using voice presets.

### Features:

* Accepts text input directly or as a file argument.
* Supports voice presets (`--voice thomas`).
* Displays live progress bars.
* Automatically saves generated audio to `voxcpm2/output/`.

Make it executable:

```bash
chmod +x voxcpm2/say.py
```

Usage:

```bash
~/miniconda3/envs/voxcpm/bin/python voxcpm2/say.py "Hello world" --voice thomas
```

---

## 6. Building the Automated Text-to-MP3 Watcher Daemon (`watch_input.py`)

Create `voxcpm2/input`, `voxcpm2/output`, and `voxcpm2/input/.processed`:

```bash
mkdir -p voxcpm2/input/.processed
mkdir -p voxcpm2/output
```

### Pipeline Workflow:

1. Drop any `.txt` file into `voxcpm2/input/`.
2. `watch_input.py` continuously monitors the directory.
3. Automatically synthesizes speech using Thomas's cloned voice.
4. Converts audio to 320kbps MP3 via FFmpeg in `voxcpm2/output/<filename>.mp3`.
5. Moves processed `.txt` files to `voxcpm2/input/.processed/`.

---

## 7. Solving KV Cache Overflow (`ValueError: KV cache is full`)

### Problem Identified

VoxCPM2's internal continuous diffusion auto-regressive backbone has a hard limit of `4,096` tokens in its KV cache. Passing large documents or whole books (e.g. *The Yellow Wallpaper*, 6,078 words) in one pass caused `ValueError: KV cache is full`.

### Solution: Smart Word-Based Sentence Chunking

We built `split_text_into_chunks(text, target_words=300)`:

1. **Target Chunk Size:** ~300 words per chunk (~1,500 – 1,800 characters).
2. **Strict Sentence Boundaries:** Cuts text **only at sentence endings** (`.`, `!`, `?`, `;`).
3. **No Mid-Word Cuts:** Never slices words (prevents Kokoro-style bug where `strong` is cut into `str` + `ong`).
4. **No Mid-Sentence Cuts:** Ensures complete natural phrasing.
5. **CUDA Memory Management:** Calls `torch.cuda.empty_cache()` between chunks to prevent GPU VRAM fragmentation.
6. **Seamless Audio Concatenation:** Combines audio chunks via `np.concatenate()` into one single continuous MP3 file.

---

## 8. Live Terminal Progress Bar & Warning Filter

### Improvements Added:

1. **Suppressed tqdm Output:** Patched internal `tqdm.tqdm` to eliminate noisy capacity logs (`102/4096`).
2. **Silenced Streaming Warnings:** Filtered out `UserWarning: Retry on bad cases is not supported in streaming mode`.
3. **Dual-Level Rich Progress Bar:**
    * **Overall Document Progress:** Continuously updates live from **1% $\rightarrow$ 100%** across all chunks on every GPU streaming frame step.
    * **Sub-Chunk Progress Bar:** Displays exact frame progress (`Frame 191/2400`) for the active ~300-word chunk.

---

## 9. One-Click Master Launchers (`run.py` & `start.py`)

Create `voxcpm2/run.py` and `voxcpm2/start.py` as master launcher scripts:

```bash
python3 voxcpm2/run.py
```

### What `run.py` Does:

* Verifies directory structure (`input/`, `output/`, `.processed/`).
* Checks Conda environment Python.
* Verifies GPU hardware.
* Automatically launches `watch_input.py --watch`.

---

## 10. Folder Directory Standardization

All scripts were updated to use **`voxcpm2/output/`** as the single unified output directory for all generated `.mp3` and `.wav` audio files (removing duplicate `outputs` folders).

```text
voxcpm2/
├── run.py                 # One-click master launcher
├── start.py               # Launcher alias
├── say.py                 # CLI voice generator
├── watch_input.py         # Text-to-MP3 watcher daemon
├── clone_thomas.py        # Standalone voice cloning script
├── input/                 # Drop .txt files here
│   └── .processed/        # Processed text archive
├── output/                # 320kbps MP3 output files
├── clone/                 # Reference WAV audio (Thomas)
└── models/                # Local offline weights (4.7 GB)
    └── VoxCPM2/
```

---

## 11. Git Version Control & Safe Checkpoint Tagging

### Step 11.1: `.gitignore` Configuration

Create `.gitignore` to keep repository lightweight (ignoring audio files and 4.7 GB model weights):

```gitignore
voxcpm2/models/
*.safetensors
*.pth
*.bin
*.pt
*.mp3
*.wav
voxcpm2/output/
voxcpm2/input/.processed/
```

### Step 11.2: Creating Safe Tag Checkpoint

```bash
git init
git add .
git commit -m "SAFE: Stable production-ready TTS & voice cloning pipeline"
git tag -a safe -m "Safe working checkpoint" -f
```

To revert to this safe working point anytime in the future:

```bash
git checkout safe
```

## 12. Full Source Code Archive & Direct Downloads

You can download the raw, ready-to-run Python scripts directly or expand the accordions below to inspect the source code online.

<div style="margin: 1.5rem 0 2.5rem 0; padding: 1.5rem; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
    <p style="margin-top: 0; font-weight: 700; color: #0f172a; font-family: var(--font-mono); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 0.05em;">📦 1-Click Code Downloads</p>
    <div style="display: flex; flex-wrap: wrap; gap: 1rem; margin-top: 1rem;">
        <a href="/systems_articles/assets/code/voxcpm2/run.py" download style="background: #ffffff; border: 1px solid #cbd5e1; padding: 0.6rem 1rem; border-radius: 6px; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; color: #4338ca; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">[ ⬇ Download run.py ]</a>
        <a href="/systems_articles/assets/code/voxcpm2/watch_input.py" download style="background: #ffffff; border: 1px solid #cbd5e1; padding: 0.6rem 1rem; border-radius: 6px; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; color: #4338ca; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">[ ⬇ Download watch_input.py ]</a>
        <a href="/systems_articles/assets/code/voxcpm2/say.py" download style="background: #ffffff; border: 1px solid #cbd5e1; padding: 0.6rem 1rem; border-radius: 6px; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; color: #4338ca; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">[ ⬇ Download say.py ]</a>
        <a href="/systems_articles/assets/code/voxcpm2/clone_thomas.py" download style="background: #ffffff; border: 1px solid #cbd5e1; padding: 0.6rem 1rem; border-radius: 6px; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; color: #4338ca; text-decoration: none; display: inline-flex; align-items: center; gap: 0.5rem; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">[ ⬇ Download clone_thomas.py ]</a>
    </div>
</div>

---

### Script 1: `voxcpm2/run.py` (Master Launcher)

<details>
<summary style="font-family: var(--font-mono); font-weight: 700; cursor: pointer; color: #4338ca; padding: 0.5rem 0;">▶ Click to View Source Code: voxcpm2/run.py</summary>

```python
#!/usr/bin/env python3
"""
VoxCPM2 Master Service Launcher (`voxcpm2/run.py` / `voxcpm2/start.py`)
=======================================================================
One-click python script that initializes system paths, verifies GPU acceleration,
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
CONDA_PYTHON = Path.home() / "miniconda3" / "envs" / "voxcpm" / "bin" / "python"
WATCHER_SCRIPT = ROOT_DIR / "watch_input.py"
INPUT_DIR = ROOT_DIR / "input"
OUTPUT_DIR = ROOT_DIR / "output"

def main():
    print("=" * 65)
    print("  VoxCPM2 Master Text-to-MP3 Service Launcher")
    print("=" * 65)

    # 1. Ensure Input and Output directories exist inside voxcpm2
    INPUT_DIR.mkdir(parents=True, exist_ok=True)
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    (INPUT_DIR / ".processed").mkdir(parents=True, exist_ok=True)

    print(f"[+] Input Directory  : {INPUT_DIR.resolve()}")
    print(f"[+] Output Directory : {OUTPUT_DIR.resolve()}")
    print(f"[+] Registered Voice : Thomas (1_thomas_segment_125_219_(Vocals).wav)")

    # 2. Check Conda Environment Python
    if not CONDA_PYTHON.exists():
        print(f"[!] Error: Conda environment Python not found at {CONDA_PYTHON}")
        print("    Please ensure the 'voxcpm' conda environment is installed.")
        sys.exit(1)

    print(f"[+] Python Executable: {CONDA_PYTHON}")

    # 3. Check Watcher Script
    if not WATCHER_SCRIPT.exists():
        print(f"[!] Error: Watcher script not found at {WATCHER_SCRIPT}")
        sys.exit(1)

    print(f"[+] Watcher Script   : {WATCHER_SCRIPT}")
    print("\n[➔] Starting automated Text-to-MP3 folder watcher...")
    print("    Drop any .txt file into 'voxcpm2/input/' to generate an MP3 in 'voxcpm2/output/'.")
    print("    Press Ctrl+C to stop the service.\n")

    # 4. Re-execute via Conda Python environment with --watch flag
    cmd = [str(CONDA_PYTHON), str(WATCHER_SCRIPT), "--watch"]

    try:
        subprocess.run(cmd, check=True)
    except KeyboardInterrupt:
        print("\n[✔] VoxCPM2 Service stopped by user.")
    except subprocess.CalledProcessError as e:
        print(f"\n[!] Watcher process exited with error code {e.returncode}")
        sys.exit(e.returncode)

if __name__ == "__main__":
    main()
```
</details>

---

### Script 2: `voxcpm2/watch_input.py` (Automated Text-to-MP3 Watcher Daemon)

<details>
<summary style="font-family: var(--font-mono); font-weight: 700; cursor: pointer; color: #4338ca; padding: 0.5rem 0;">▶ Click to View Source Code: voxcpm2/watch_input.py</summary>

```python
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
</details>

---

### Script 3: `voxcpm2/say.py` (CLI Voice Generator Utility)

<details>
<summary style="font-family: var(--font-mono); font-weight: 700; cursor: pointer; color: #4338ca; padding: 0.5rem 0;">▶ Click to View Source Code: voxcpm2/say.py</summary>

```python
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
```
</details>

---

### Script 4: `voxcpm2/clone_thomas.py` (Voice Cloning Script)

<details>
<summary style="font-family: var(--font-mono); font-weight: 700; cursor: pointer; color: #4338ca; padding: 0.5rem 0;">▶ Click to View Source Code: voxcpm2/clone_thomas.py</summary>

```python
#!/usr/bin/env python3
"""
VoxCPM2 Voice Cloning Script for 'Thomas'
===========================================
Clones the voice from the reference vocal track '1_thomas_segment_125_219_(Vocals).wav'
and synthesizes custom spoken text using VoxCPM2.
"""

import sys
import logging
from pathlib import Path

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[logging.StreamHandler(sys.stdout)]
)
logger = logging.getLogger("clone_thomas")

BASE_DIR = Path(__file__).resolve().parent

def main():
    try:
        import torch
        import soundfile as sf
        from voxcpm import VoxCPM
    except ImportError as e:
        logger.error("Failed to import required dependencies in voxcpm environment.")
        logger.error(f"ImportError: {e}")
        sys.exit(1)

    device = "cuda" if torch.cuda.is_available() else "cpu"
    logger.info(f"Execution Device: {device}")

    # Local model directory check
    local_model_path = BASE_DIR / "models" / "VoxCPM2"
    model_identifier = str(local_model_path) if local_model_path.exists() else "openbmb/VoxCPM2"

    logger.info(f"Loading VoxCPM2 model from: {model_identifier}")
    model = VoxCPM.from_pretrained(model_identifier, device=device)
    logger.info("VoxCPM2 model loaded successfully.")

    # Reference clone file path
    ref_audio_path = BASE_DIR / "clone" / "1_thomas_segment_125_219_(Vocals).wav"
    if not ref_audio_path.exists():
        logger.error(f"Reference audio file not found: {ref_audio_path}")
        sys.exit(1)

    logger.info(f"Using voice reference audio: {ref_audio_path.name}")

    # Output directory
    output_dir = BASE_DIR / "output"
    output_dir.mkdir(exist_ok=True)
    output_file = output_dir / "cloned_thomas_speech.wav"

    # Text to synthesize with Thomas's cloned voice
    synthesis_text = (
        "Welcome! This is Thomas's cloned voice generated using VoxCPM2. "
        "The speech synthesis is continuous, natural, and running locally with full GPU acceleration."
    )

    logger.info(f"Synthesizing text: '{synthesis_text}'")

    try:
        res = model.generate(
            text=synthesis_text,
            reference_wav_path=str(ref_audio_path),
            cfg_value=2.0,
            inference_timesteps=10,
        )
        sample_rate = 48000
        if isinstance(res, tuple):
            audio_array = res[0]
            if len(res) > 1 and isinstance(res[1], int):
                sample_rate = res[1]
        else:
            audio_array = res

        sf.write(str(output_file), audio_array, sample_rate)
        logger.info(f"Voice cloning complete! Saved cloned audio to: {output_file.resolve()} (Sample Rate: {sample_rate}Hz)")
    except Exception as e:
        logger.exception(f"Error during voice cloning generation: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
```
</details>
