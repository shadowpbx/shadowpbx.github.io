---
title: "Professional Voice Isolation & Audio Cleanup: The Ultimate UVR5 Workflow on Ubuntu"
date: "2026.07.22"
tags: ["AUDIO"]
summary: "A complete guide on installing, configuring, and GPU-accelerating Ultimate Vocal Remover 5 (UVR5) on Ubuntu for professional voice isolation and AI dataset preparation."
---

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-left: 4px solid #4338ca; padding: 1.25rem 1.5rem; border-radius: 0 8px 8px 0; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <p style="margin: 0; font-size: 1.05rem; line-height: 1.6; color: #334155; font-style: italic; font-weight: 500;">
        A complete journaling guide on installing, configuring, and GPU-accelerating <strong>Ultimate Vocal Remover 5 (UVR5)</strong> for professional noise reduction and VoxCPM2 voice cloning.
    </p>
</div>

Whether you are building a text-to-speech dataset for voice cloning, cleaning up a noisy podcast interview, or trying to salvage dialogue for a film, the biggest hurdle is getting perfectly clean, dry vocal audio. Background music, ambient street noise, room echo, and HVAC hum will absolutely ruin an AI voice model or a professional mix. 

To solve this, I rely on **Ultimate Vocal Remover 5 (UVR5)**. It’s an industry-standard deep learning application, but getting it running smoothly on Linux—and maximizing it for high-end hardware—takes a bit of tweaking. 

I’m writing this guide as a personal journal to document my exact workflow, but if you’re trying to set up UVR5 on Ubuntu for audio isolation, this should save you hours of troubleshooting.

## Audio Demonstration & Sample Comparison

Below are the actual sample audio files processed using this UVR5 pipeline:

<div style="margin: 1.5rem 0; padding: 1.25rem; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
    <p style="margin-top: 0; font-weight: 600; color: #0f172a;">1. Original Audio Segment (MP3 Sample):</p>
    <audio controls style="width: 100%; margin-bottom: 0.75rem;">
        <source src="/engineering_articles/assets/audio/thomas_segment_125_219.mp3" type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
    <a href="/engineering_articles/assets/audio/thomas_segment_125_219.mp3" download style="font-family: var(--font-mono); font-size: 0.85rem; color: #4338ca; font-weight: 700; text-decoration: none;">[ ⬇ Download Original MP3 ]</a>
</div>

<div style="margin: 1.5rem 0; padding: 1.25rem; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
    <p style="margin-top: 0; font-weight: 600; color: #0f172a;">2. Isolated & Denoised Vocal Output (32-bit Float WAV):</p>
    <audio controls style="width: 100%; margin-bottom: 0.75rem;">
        <source src="/engineering_articles/assets/audio/1_thomas_segment_125_219_(Vocals).wav" type="audio/wav">
        Your browser does not support the audio element.
    </audio>
    <a href="/engineering_articles/assets/audio/1_thomas_segment_125_219_(Vocals).wav" download style="font-family: var(--font-mono); font-size: 0.85rem; color: #4338ca; font-weight: 700; text-decoration: none;">[ ⬇ Download Isolated Vocal WAV ]</a>
</div>

---

## Beyond Voice Cloning: A Professional Powerhouse

While I primarily use UVR5 for zero-shot voice cloning datasets (like VoxCPM2), it is actually a massive cheat code for all sorts of professional audio engineering tasks:

* **Dialogue Cleanup & Film Post-Production:** If you have a video recording where the lavalier mic picked up wind, traffic, or background chatter, UVR5 can isolate the subject's voice perfectly, acting as a high-end noise reduction suite.
* **Podcast Repair:** Sometimes a guest records in an untreated room with lots of reverb, or their dog barks in the background. UVR5's VR Architecture models (like `UVR-DeEcho-Normal`) can completely strip out room echo and background interruptions.
* **Music Production & DJs:** If you need to create acapellas or instrumental stems for remixes, UVR5's Demucs and MDX-Net models separate drums, bass, vocals, and melodies with studio-grade precision.

## My Hardware Setup

UVR5 is incredibly computationally intensive. While it *can* run on a CPU, a dedicated GPU is highly recommended. My workstation is built to chew through these deep learning models in a fraction of the time:

* **OS:** Ubuntu Linux
* **RAM:** 128GB
* **GPUs:** Dual NVIDIA GeForce RTX 3060s (12GB VRAM each)

---

## 1. System Setup & Installation

First, we need to install the system-level dependencies for audio processing (FFmpeg) and the graphical interface (Tkinter). 

Open your terminal and run:

```bash
sudo apt update && sudo apt upgrade
sudo apt install -y ffmpeg python3-pip python3-tk git
```

Next, pull the official UVR5 source code from GitHub into your preferred directory:

```bash
mkdir -p ~/Application/AI/TTS/
cd ~/Application/AI/TTS/
git clone https://github.com/Anjok07/ultimatevocalremovergui.git uvr5
cd uvr5
```

---

## 2. Conda Environment & Dependency Fixes

To ensure UVR5’s dependencies don't break system-wide Python packages (and vice versa), I highly recommend using Conda to create an isolated environment with Python 3.10 and PyTorch CUDA 12.1.

```bash
# Create and activate conda environment
conda create -n uvr5 python=3.10 -y
conda activate uvr5

# Install PyTorch with CUDA 12.1 support
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121

# Install base requirements
pip install -r requirements.txt
```

### ⚠️ Crucial Fixes for Linux / Python 3.10

During my setup, I ran into three specific dependency challenges. Run these commands to fix them before launching:

1. **Restore `pkg_resources` for Librosa 0.9.2:**

```bash
pip install "setuptools<70.0.0"
```

2. **Fix Playsound Audio Preview Error:**

```bash
pip install playsound==1.2.2
```

3. **Bypass Dora / Scikit-Learn Deprecation Restriction:**

```bash
export SKLEARN_ALLOW_DEPRECATED_SKLEARN_PACKAGE_INSTALL=True
pip install dora-search==0.0.3
```

---

## 3. Forcing GPU Acceleration

To ensure UVR5 automatically uses the dual RTX 3060 GPUs without needing to manually toggle it in the GUI every time, you can modify the constants file.

Open `uvr5/gui_data/constants.py`, locate line 639, and update it to:

```python
'is_gpu_conversion': True
```

*Note: You can also just verify that the "GPU Conversion" checkbox is enabled on the main GUI screen when you launch the app.*

---

## 4. Launching the App & Pre-processing Audio

To make launching easy, I created a simple bash script (`launch_uvr5.sh`):

```bash
#!/usr/bin/env bash
source ~/miniconda3/bin/activate uvr5
python ~/Application/AI/TTS/uvr5/UVR.py
```

### Pre-processing with FFmpeg

Before throwing a massive audio file into UVR5, I trim the exact segment I need. For example, to isolate a specific voice segment between the 1:25 and 2:19 marks, I use FFmpeg:

```bash
# Trim the segment
ffmpeg -y -ss 00:01:25 -to 00:02:19 -i SourceAudio.mp3 -acodec copy segment_125_219.mp3

# Convert to 48kHz Mono WAV
ffmpeg -y -i segment_125_219.mp3 -ar 48000 -ac 1 segment_125_219.wav
```

---

## 5. The "Gold Standard" Settings for Vocal Cleanup

For isolating voices to build a clean TTS dataset or salvage a bad recording, **MDX-Net** is universally considered the gold standard. Because my hardware overhead provides massive memory and VRAM limits, I can safely push the most intensive parameters far beyond the standard defaults.

Here is my exact configuration in the UVR5 GUI:

* **Process Method:** `MDX-Net`
* **The Model:** `Kim Vocal 2` or `UVR-MDX-NET-Voc_FT`
    * *Kim Vocal 2* is exceptionally aggressive at recognizing human voice frequencies, leaving zero ambient noise. 
    * *Voc_FT* is a fine-tuned alternative designed to eliminate "instrumental bleed."
* **Segment Size:** `1024` (or up to `2048`)
    * *Why:* Larger segments give the AI more surrounding audio context, improving separation quality. While these numbers will instantly crash a standard computer, dual 12GB GPUs easily swallow the massive data chunks.
* **Overlap:** `0.85 to 0.90`
    * *Why:* A high overlap smooths out the seams between processed audio chunks, eliminating choppy artifacts. (Pushing it to 0.99 is possible, but inflates processing time for virtually zero audible improvement).

> 💡 **Pro-Tip:** If the output sounds clean but has a slight metallic echo left over from the original room or background music, run the isolated vocal track *back* through UVR5 using the VR Architecture model: `UVR-DeEcho-Normal`.

---

## 6. Why WAV? (Never use MP3 for Datasets or Post-Production)

Under output preferences, **always select WAV**. If you are generating an audio dataset for voice modeling, AI text-to-speech, or doing professional audio mixing, MP3 should *never* be used as an intermediate format. 

Here is why:

1. **No Lossy Compression Artifacts:** MP3 silently cuts out high/low frequencies and introduces subtle metallic artifacts. Voice-training algorithms are extremely sensitive to these distortions and will bake them into your final voice model.
2. **Exact Sample Alignment:** MP3 encoding inherently adds tiny milliseconds of silent padding at the beginning and end of files. This messes up automatic audio slicers and forced-alignment tools (like Whisper).
3. **No Phase Distortion:** MP3 compression shifts audio phase relationships. Keeping the phase intact is critical for preventing robotic-sounding artifacts when isolating stems with deep learning.

**My Export Settings:** `WAV`, `48000 Hz`, `32-bit Float`. Keep everything as WAV throughout the extraction, denoising, and slicing stages.

---

## 7. Integrating with VoxCPM2 (My Workflow Example)

Once UVR5 finishes processing, I move the resulting clean WAV file into my working directory. For my voice cloning projects, this looks like:

```bash
mv 1_segment_125_219_(Vocals).wav ~/Application/AI/TTS/voxcpm2/clone/
```

This pristine, isolated vocal file is now ready to be registered as the default voice reference preset.
