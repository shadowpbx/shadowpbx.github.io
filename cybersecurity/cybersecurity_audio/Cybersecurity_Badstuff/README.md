# 🛡️ Cyber Attacks & Exploits: Audio Player & Playlist Compiler

* **Live Audio Player**: https://hexdef.com/cybersecurity_audio/Cybersecurity_Badstuff/

A premium, mobile-responsive, dark-themed HTML5 audio player and study suite designed for exploring ***Cyber Attacks & Exploits: 71 Deep-Dive Modules on Malware, Attack Vectors & Exploits*** on the go. 

It supports lock-screen media controls, custom loop counts, speed adjustments, smart timeline auto-resume, and an integrated written study companion rendered dynamically from Markdown.

This repository houses the client-side player application and an automated playlist compiler designed to cleanly decouple heavy audio storage (hosted externally on Cloudflare R2 / S3) from static web hosting (GitHub Pages).

---

## 🌟 Key Features

* 📱 **Mobile-First Glassmorphic Design**: Sleek dark-mode interface styled with Outfit Typography and Material Round Icons.
* ☁️ **Cloudflare R2 / S3 Decoupling**: Keep your Git repository lightweight! Stream audio tracks directly from your public Cloudflare R2 bucket.
* 🛡️ **71 Comprehensive Modules across 10 Domains**:
  1. Malware & Malicious Code (1.1 – 1.9)
  2. Social Engineering & Human Attacks (2.1 – 2.12)
  3. Identity, Credential & Access Exploitation (3.1 – 3.9)
  4. Network & Infrastructure Attacks (4.1 – 4.10)
  5. Web Application & API Vulnerabilities (5.1 – 5.9)
  6. Hardware, Firmware & Virtualization Exploits (6.1 – 6.5)
  7. Cryptographic & Data Security Failures (7.1 – 7.4)
  8. Operational Technology (OT) & ICS Attacks (8.1 – 8.4)
  9. AI & Machine Learning Security Risks (9.1 – 9.5)
  10. Supply Chain & Build Pipeline Attacks (10.1 – 10.4)
* 🔁 **Custom Track Looping**: Set the player to repeat each lecture track multiple times (e.g., repeat 3 times) before automatically transitioning to the next track—ideal for reinforcement learning.
* ⚡ **Playback Speed Control**: Speed up or slow down lectures between `0.75x` and `2.0x` speeds.
* 💾 **Smart Auto-Resume**: Automatically persists your track index, loop iterations, playback speed, timeline position, and base URL in your browser's local storage.
* 🔒 **Lock Screen Media Controls**: Full HTML5 **Media Session API** integration so you can play, pause, seek, and skip tracks directly from lock screens and smartwatch interfaces.
* 📖 **Written Study Companion**: Open course notes and attack vectors in `companion.html` directly from player settings without interrupting audio playback.
* 🧠 **Single-Source-of-Truth Automated Build**: `generate_playlist.py` automatically compiles track durations, R2 base URLs, AND converts `concepts.md` into `concepts.js` in a single command.

---

## 📂 File Architecture

* **`index.html`**: Core client-side audio player application (HTML5, CSS3, JS).
* **`companion.html`**: Written study companion page rendering module reference guides and security concepts.
* **`Audio/`**: Local directory containing your source `.mp3` audio files.
* **`concepts.md`**: Single source of truth for the 71-module cybersecurity study guide and definitions.
* **`concepts.js`**: Auto-compiled JavaScript fallback containing the reference guide string for 0ms offline rendering.
* **`generate_playlist.py`**: CLI tool that scans your local `Audio/` directory, extracts track durations via `ffprobe`, and builds catalog files.
* **`about.txt`**: Metadata text file containing the course Title and Subtitle.
* **`playlist.json` & `playlist.js`**: Compiled catalog files containing track ordering, durations, and remote Cloudflare R2 base URL configuration.

---

## 🚀 Setup & Usage Guide

### 1. Upload Audio Files to Cloudflare R2
1. Log into Cloudflare and create an **R2 Bucket**.
2. Upload your `.mp3` files into the bucket.
3. Enable public access (e.g. `https://cybersecurity.epistemicresearch.org/badstuff/`).

### 2. Configure Course Metadata
Set your course title and subtitle in `about.txt`:
```txt
Title: The Threat Landscape
Sub Title: 71 Modules on Malware, Exploits & Cybercrime
```

### 3. Generate Catalog & Playlist Assets
Place all your `.mp3` files in the `Audio/` directory and run the generator with your Cloudflare R2 base URL:

```bash
python3 generate_playlist.py -b "https://cybersecurity.epistemicresearch.org/badstuff/"
```

The script will automatically:
1. Scan `./Audio` for all `.mp3` tracks and calculate track durations.
2. Read course title/subtitle from `about.txt`.
3. Embed your Cloudflare R2 URL and track catalog into `playlist.json` and `playlist.js`.
4. Compile `concepts.md` into `concepts.js` for instant offline rendering.

### 4. Deploy to GitHub Pages
Push the following files to your GitHub repository:
- `index.html`
- `companion.html`
- `about.txt`
- `concepts.md`
- `concepts.js`
- `playlist.js`
- `playlist.json`
- `generate_playlist.py`

Enable GitHub Pages in your repository settings. Your audio player and study suite will immediately go live!

---

## 🛠 Local & Offline Development
This project supports 100% offline learning:
* Open `index.html` or `companion.html` directly in your browser (`file:///` protocol).
* Automatic script fallbacks (`playlist.js` and `concepts.js`) allow the player and companion to work offline without needing a local web server or facing browser CORS restrictions.

---

*Designed for seamless cybersecurity study on the go.*
