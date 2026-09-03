# CISS 120: Computer Networking & Communications Audio Player & Companion Suite

* **Live Player Website**: [https://hvcc.hexdef.com/ciss120/](https://hvcc.hexdef.com/ciss120/)
* **Written Study Companion**: Access the `companion.html` page directly at [https://hvcc.hexdef.com/ciss120/companion.html](https://hvcc.hexdef.com/ciss120/companion.html).

A premium, mobile-responsive, dark-themed HTML5 audio player and companion study suite designed for **CISS 120 (Computer Networking & Communications / Cisco CCNA ITN)** at Hudson Valley Community College (HVCC). It features custom track looping, streamlined 5-speed control with persistent rates across tracks, 17-module chapter grouping, timeline scrubbing, and auto-resuming playback across all 126 course audio lectures.

---

## 🌟 Key Features

* 📱 **Mobile-First Responsive Design**: Glassmorphic dark-mode interface powered by system-sans typography (`Outfit`) and Material Round Icons.
* 🎛️ **Symmetrical 5-Button Circular Transport Bar**: Clean, hardware-inspired 5-circle transport bar (`[ ⏱️ Speed ]` `[ |◀ Prev ]` `[ ▶ Play ]` `[ Next ▶| ]` `[ 🔁¹ Loop ]`) maximizing vertical screen space.
* 🔁 **Precision SVG Circular Track Looping**: Repeat each lecture track multiple times (`1` → `2` → `3` → `∞` → `1`) before automatically transitioning to the next track—ideal for reinforcement learning.
* ⚡ **Streamlined 5-Speed High-Impact Control**: Instant single-tap cycling through the 5 core study speeds (`1.0x` → `1.1x` → `1.2x` → `0.8x` → `0.9x` → `1.0x`) with double-click reset shortcut. Selected speed persists seamlessly across all track changes.
* 📚 **17-Module Chapter Grouping**: Categorizes all 126 tracks across 17 official Cisco CCNA Introduction to Networks modules with collapsible headers and total playtime counters.
* 💾 **Smart Auto-Resume & Namespace Isolation**: Automatically persists your current track, loop iteration count, playback speed, and timeline position with dynamic local storage isolation for multi-tab playback.
* 🔒 **Lock Screen MediaSession Control**: Full integration with the HTML5 browser **Media Session API** to play, pause, seek, and skip tracks directly from phone lock screens or notification panels.
* 📖 **Written Study Companion**: Access full markdown study notes and definitions in a dedicated dashboard (`companion.html`) with multi-theme support (Dark Comfort, Warm Sepia, Light Paper, Auto).
* ☁️ **Cloudflare R2 Storage Integration**: Stream audio files directly from a public Cloudflare R2 bucket (`https://hvcc.hexdef.com/ciss120/`) to keep the repository lightweight.
* 🔄 **Re-usable Course Engine**: The entire suite is course-agnostic—update `about.txt` and `notes.md` to reuse the player for any other audio course.

---

## 🏗️ Project Architecture & Data Flow

```mermaid
graph TD
    A["about.txt: Metadata Config"] -->|Title & Subtitle| D["generate_playlist.py"]
    B["Audio Files / Cloudflare R2"] -->|Scan & Extract Duration| D
    D -->|Compile & Generate| E["playlist.js / playlist.json"]
    E -->|Read Track Index & Meta| F["index.html: Main Audio Player"]
    F -->|Links Settings UI to| G["companion.html: Written Companion"]
    H["notes.md: Markdown Study Guide"] -->|Load Asynchronously| G
```

### 1. Main Audio Player (`index.html`)
The core audio dashboard encapsulating the HTML5 audio engine, 17-module accordion rendering, search filter, and MediaSession lock screen integration.

### 2. Written Study Companion (`companion.html`)
The study reference dashboard utilizing `marked.js` to render `notes.md` into formatted HTML with theme switching.

### 3. Study Notes (`notes.md`)
The complete Markdown study guide covering all 17 CISS 120 (Cisco CCNA ITN) Modules:
1. **Module 01**: Networking Today (11 tracks)
2. **Module 02**: Basic Switch and End Device Configuration (10 tracks)
3. **Module 03**: Protocols and Models (9 tracks)
4. **Module 04**: Physical Layer (8 tracks)
5. **Module 05**: Number Systems (4 tracks)
6. **Module 06**: Data Link Layer (5 tracks)
7. **Module 07**: Ethernet Switching (6 tracks)
8. **Module 08**: Network Layer (7 tracks)
9. **Module 09**: Address Resolution (5 tracks)
10. **Module 10**: Basic Router Configuration (5 tracks)
11. **Module 11**: IPv4 Addressing & Subnetting (11 tracks)
12. **Module 12**: IPv6 Addressing (10 tracks)
13. **Module 13**: ICMP (4 tracks)
14. **Module 14**: Transport Layer (9 tracks)
15. **Module 15**: Application Layer (7 tracks)
16. **Module 16**: Network Security Fundamentals (6 tracks)
17. **Module 17**: Build a Small Network & Troubleshooting (9 tracks)

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
Title: CISS 120: Computer Networking & Communications
Sub Title: Hudson Valley Community College • Complete Course Audio Suite
```

### 2. Generate Playlist Catalogs
Run `generate_playlist.py` to scan your local audio files and bind them to your Cloudflare R2 base URL:

```bash
python3 generate_playlist.py -d "Audio" -b "https://hvcc.hexdef.com/ciss120/"
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
   * **Main Audio Player**: [http://localhost:8000/index.html](http://localhost:8000/index.html)
   * **Written Companion**: [http://localhost:8000/companion.html](http://localhost:8000/companion.html)
