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
