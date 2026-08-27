# Cybersecurity Foundation Audio Player & Companion Suite

* **Live Player Website**: [https://hexdef.com/cybersecurity_audio/](https://hexdef.com/cybersecurity_audio/)
* **Written Study Companion**: Access the `companion.html` page from the settings menu or directly at [https://hexdef.com/cybersecurity_audio/companion.html](https://hexdef.com/cybersecurity_audio/companion.html).

A premium, mobile-responsive, dark-themed HTML5 audio player and companion study suite designed for the **Cybersecurity Foundation** master curriculum. It features custom track looping, speed controls, domain objective chapter grouping, timeline scrubbing, and auto-resuming playback.

---

## 🌟 Key Features

* 📱 **Mobile-First Responsive Design**: Glassmorphic dark-mode interface powered by system-sans typography (`Outfit`) and Material Round Icons.
* 🔁 **Custom Track Looping**: Repeat each lecture track multiple times (e.g., repeat 3 times) before automatically transitioning to the next track—ideal for reinforcement learning.
* ⚡ **Playback Speed Control**: Adjust lecture playback speeds between `0.75x` and `2.0x`.
* 📚 **Domain Objective Chapter Grouping**: Automatically categorizes all 55 tracks into 12 core Cybersecurity Foundation domains with collapsible headers and total playtime counters.
* 💾 **Smart Auto-Resume**: Automatically persists your current track, loop iteration count, playback speed, timeline position, and Cloudflare R2 base URL in browser LocalStorage.
* 🔒 **Lock Screen MediaSession Control**: Full integration with the HTML5 browser **Media Session API** to play, pause, seek, and skip tracks directly from phone lock screens or notification panels.
* 📖 **Written Study Companion**: Access full markdown study notes and definitions in a dedicated dashboard (`companion.html`) with multi-theme support (Dark Comfort, Warm Sepia, Light Paper, Auto).
* ☁️ **Cloudflare R2 / S3 Storage Integration**: Stream audio files directly from a public Cloudflare R2 bucket (`https://your-bucket-domain.com/path/`) to keep the repository lightweight.
* 🔄 **Re-usable Course Engine**: The entire suite is course-agnostic—update `about.txt` and `notes.md` to reuse the player for any other audio course.

---

## 🏗️ Project Architecture & Data Flow

```mermaid
graph TD
    A[about.txt: Metadata Config] -->|Title & Subtitle| D[generate_playlist.py]
    B[Audio Files / Cloudflare R2] -->|Scan & Extract Duration| D
    D -->|Compile & Generate| E[playlist.js / playlist.json]
    E -->|Read Track Index & Meta| F[index.html: Main Audio Player]
    F -->|Links Settings UI to| G[companion.html: Written Companion]
    H[notes.md: Markdown Study Guide] -->|Load Asynchronously| G
```

### 1. Main Audio Player (`index.html`)
The core audio dashboard encapsulating the HTML5 audio engine, domain chapter accordion rendering, search filter, and MediaSession lock screen integration.

### 2. Written Study Companion (`companion.html`)
The study reference dashboard utilizing `marked.js` to render `notes.md` into formatted HTML with theme switching.

### 3. Study Notes (`notes.md`)
The complete Markdown study guide covering all 12 Cybersecurity Foundation Domains:
1. Core Security Principles (The Absolute Basics)
2. Risk, Governance, & Compliance (GRC)
3. Identity & Access Management (IAM)
4. Cryptography & Data Protection
5. Network Security, Architecture, & Perimeter Controls
6. Cloud Security & Modern Infrastructure
7. Secure Software Development (AppSec)
8. Threat Modeling, Intelligence, & Attacker Methodology
9. Security Operations, Monitoring, & Endpoint Defense (SOC)
10. Social Engineering & The Human Element
11. Incident Response, Forensics, & Business Metrics
12. Physical & Environmental Security

### 4. Playlist Compiler (`generate_playlist.py`)
A Python CLI utility that scans local folders or remote URLs, extracts track durations via `ffprobe`, parses `about.txt`, and generates `playlist.json` and `playlist.js`.

---

## 📂 File Directory

* **`index.html`**: Core audio player web app.
* **`companion.html`**: Written study companion rendering markdown notes.
* **`notes.md`**: Markdown study notes source file.
* **`about.txt`**: Course title and subtitle configuration file.
* **`generate_playlist.py`**: Python CLI playlist generator tool.
* **`playlist.json` & `playlist.js`**: Compiled playlist catalogs containing track metadata and base URLs.

---

## 🚀 Setup & Usage Guide

### 1. Configure Course Metadata (`about.txt`)
Set your course title and subtitle:
```txt
Title: Cybersecurity
Sub Title: Cybersecurity Foundation
```

### 2. Generate Playlist Catalogs
Run `generate_playlist.py` to scan your local audio files and bind them to your Cloudflare R2 base URL:

```bash
python3 generate_playlist.py -d "Audio" -b "https://your-bucket-domain.com/path/"
```

---

## 🛠 Local Development & Server Setup

Web browsers enforce CORS security restrictions that prevent fetching local `notes.md` and `playlist.json` when opening `.html` files directly via `file://`.

To run locally:
1. Start the local Python HTTP web server:
   ```bash
   python3 -m http.server 8000
   ```
2. Navigate to:
   - **Audio Player**: `http://localhost:8000/index.html`
   - **Study Companion**: `http://localhost:8000/companion.html`
