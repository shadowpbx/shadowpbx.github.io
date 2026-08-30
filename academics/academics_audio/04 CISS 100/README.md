# CISS 100: Introduction to Computing Audio Player & Companion Suite

* **Live Player Website**: [https://hvcc.hexdef.com/ciss100/](https://hvcc.hexdef.com/ciss100/)
* **Written Study Companion**: Access the `companion.html` page directly at [https://hvcc.hexdef.com/ciss100/companion.html](https://hvcc.hexdef.com/ciss100/companion.html).

A premium, mobile-responsive, dark-themed HTML5 audio player and companion study suite designed for **CISS 100 (Introduction to Computing & Information Sciences)** at Hudson Valley Community College (HVCC). It features custom track looping, streamlined 5-speed control with persistent rates across tracks, weekly module chapter grouping, timeline scrubbing, and auto-resuming playback.

---

## 🌟 Key Features

* 📱 **Mobile-First Responsive Design**: Glassmorphic dark-mode interface powered by system-sans typography (`Outfit`) and Material Round Icons.
* 🎛️ **Symmetrical 5-Button Circular Transport Bar**: Clean, hardware-inspired 5-circle transport bar (`[ ⏱️ Speed ]` `[ |◀ Prev ]` `[ ▶ Play ]` `[ Next ▶| ]` `[ 🔁¹ Loop ]`) maximizing vertical screen space.
* 🔁 **Precision SVG Circular Track Looping**: Repeat each lecture track multiple times (`1` → `2` → `3` → `∞` → `1`) before automatically transitioning to the next track—ideal for reinforcement learning.
* ⚡ **Streamlined 5-Speed High-Impact Control**: Instant single-tap cycling through the 5 core study speeds (`1.0x` → `1.1x` → `1.2x` → `0.8x` → `0.9x` → `1.0x`) with double-click reset shortcut. Selected speed persists seamlessly across all track changes.
* 📚 **16-Week Module Chapter Grouping**: Automatically categorizes all 64 tracks across 16 weekly modules with collapsible headers and total playtime counters.
* 💾 **Smart Auto-Resume & Namespace Isolation**: Automatically persists your current track, loop iteration count, playback speed, and timeline position with dynamic local storage isolation for multi-tab playback.
* 🔒 **Lock Screen MediaSession Control**: Full integration with the HTML5 browser **Media Session API** to play, pause, seek, and skip tracks directly from phone lock screens or notification panels.
* 📖 **Written Study Companion**: Access full markdown study notes and definitions in a dedicated dashboard (`companion.html`) with multi-theme support (Dark Comfort, Warm Sepia, Light Paper, Auto).
* ☁️ **Cloudflare R2 Storage Integration**: Stream audio files directly from a public Cloudflare R2 bucket (`https://hvcc.hexdef.com/ciss100/`) to keep the repository lightweight.
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
The core audio dashboard encapsulating the HTML5 audio engine, weekly module accordion rendering, search filter, and MediaSession lock screen integration.

### 2. Written Study Companion (`companion.html`)
The study reference dashboard utilizing `marked.js` to render `notes.md` into formatted HTML with theme switching.

### 3. Study Notes (`notes.md`)
The complete Markdown study guide covering all 16 CISS 100 Modules:
1. **Week 01**: Foundations of Computing, Architecture & Linux (LM1)
2. **Week 02**: Hardware Architecture & Silicon Engineering (LM2)
3. **Week 03**: Storage Architectures & File Systems (LM3)
4. **Week 04**: Input/Output Architecture & Stream Redirection (LM4)
5. **Week 05**: Operating Systems & Access Control (LM5)
6. **Week 06**: Application Software & Process Management (LM6)
7. **Week 07**: Computer Networking & The OSI Model (LM7)
8. **Week 08**: The Internet Architecture & SysAdmin Variables (LM8)
9. **Week 09**: Relational Databases, SQL & Ubuntu Desktop VM (LM9)
10. **Week 10**: Cybersecurity, Cryptography & User Administration (LM10)
11. **Week 11**: Systems Analysis, SDLC & Cron Automation (LM11)
12. **Week 12**: Programming Logic, Shell Scripting & Cloud/Containers (LM12)
13. **Week 13**: Computer Ethics, Cyber Law & Emergent Tech (LM13)
14. **Week 14**: Final Project - LAMP Stack & WordPress Deployment
15. **Week 15**: Final Deliverables, Project Defense & Linux OS Final Exam
16. **Week 16**: Semester Conclusion & Degree Works Registrar Audit

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
Title: CISS 100: Introduction to Computing
Sub Title: Hudson Valley Community College • Complete Course Audio Suite
```

### 2. Generate Playlist Catalogs
Run `generate_playlist.py` to scan your local audio files and bind them to your Cloudflare R2 base URL:

```bash
python3 generate_playlist.py -d "Audio" -b "https://hvcc.hexdef.com/ciss100/"
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
