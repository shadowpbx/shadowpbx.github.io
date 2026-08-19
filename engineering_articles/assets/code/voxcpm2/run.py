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
