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
