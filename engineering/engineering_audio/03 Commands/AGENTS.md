# AGENTS.md - AI Autonomous Workflow & Configuration Guide

This document provides mandatory operational instructions for AI Assistants (e.g. Antigravity) when setting up, updating, or maintaining course audio suites and study companions in this repository.

---

## 🚨 CRITICAL RULES & ARCHITECTURAL STANDARDS

### 1. Cloudflare URL & Track Path Resolution
When a Cloudflare R2 / S3 remote audio bucket link is provided (e.g. `https://domain.com/path/`):
* **Files on Cloudflare R2 are stored at the root of the bucket path** (without an `Audio/` subfolder).
* **Mandatory Command**: ALWAYS run `generate_playlist.py` scanning the local `Audio` subfolder directly (`-d "Audio"`):
  ```bash
  python3 generate_playlist.py -d "Audio" -b "<CLOUDFLARE_URL>"
  ```
* **Why**: Running with `-d "Audio"` strips the local `./Audio/` path prefix from track filenames in `playlist.json` and `playlist.js` (`1.1 Track.mp3` instead of `Audio/1.1 Track.mp3`). This prevents **HTTP 404 Not Found** errors when streaming from Cloudflare R2.

### 2. Multi-Tab Dynamic LocalStorage Namespace Isolation
* **NEVER use static, hardcoded LocalStorage keys** (e.g. `'cybersecurity_concise_index'`).
* **Mandatory Pattern**: ALWAYS route all state persistence through `getStorageKey(keyName)` backed by `initStorageNamespace(playlistData)`.
* **Why**: Users frequently open multiple distinct course players side-by-side in concurrent browser tabs or windows on the same domain (`localhost:8000` or `hexdef.com`). Isolated namespace prefixes prevent cross-contamination, state resets, and playback collisions.

### 3. Symmetrical 5-Button Circular Transport Bar & Streamlined Speed Controls
* **Transport Layout**: Symmetrical 5-button circular row (`.controls-row`):
  `[ ⏱️ Speed ]` • `[ |◀ Prev ]` • `[ ▶ Play/Pause ]` • `[ Next ▶| ]` • `[ 🔁¹ Loop ]`
  * Flank circular buttons (`.btn-small`): `44px` diameter desktop (`38px` mobile).
  * Center hero Play button (`.btn-large`): `66px` diameter desktop (`52px` mobile).
* **Streamlined Speed Control (`#btnSpeedCycle`)**:
  * **5 High-Impact Speeds**: `1.0x` → `1.1x` → `1.2x` → `0.8x` → `0.9x` → `1.0x`.
  * **Double-Click Reset**: Instant shortcut snapping speed back to `1.0x (Normal)`.
  * **Active Glow**: Automatically glows with accent color and border when speed is modified from `1.0x`.
  * **Continuous Speed Persistence Rule**: The selected speed must NEVER reset to `1.0x` when transitioning to the next track. `loadTrack()`, `loadedmetadata`, and `play` event handlers MUST re-apply `currentPlaybackRate` and maintain `audio.defaultPlaybackRate`.
* **Precision SVG Circular Repeat Loop (`#btnLoopCycle`)**:
  * Precision vector SVG circular arrow with outer arrowhead and expanded inner cavity (radius 10) preventing any collision between the arrow and inset numbers/symbols.
  * Inset centered label cycling `1` → `2` → `3` → `∞` → `1`.
  * Active glow when repeat limit > 1 or infinite.
  * In infinite mode, top badge displays cleanly as **`Loop ∞`**.
* **Dedicated Study Companion Button**:
  * Sits neatly below the transport row as a clean, full-width `[ 📖 Study Notes ]` button (`36px` height, accent hover glow).

---

## 📋 End-to-End Course Configuration Checklist

When converting or updating a course directory, the AI agent MUST perform the following 8 steps:

### 1. Curriculum Analysis (`*.txt`)
Inspect the raw curriculum file (e.g., `Foundation.txt`, `domains.txt`). Identify all domain headings, objective numbers, and topic definitions.
* Determine the numbering scheme:
  * **1-Level Domain Prefix**: (e.g., `1.1`, `2.4` -> 12 Domains: `1`, `2` ... `12`)
  * **2-Level Objective Prefix**: (e.g., `1.1.1`, `4.10.3` -> 31 Objectives: `1.1` ... `4.10`)
  * **Subfolder Hierarchy**: (e.g., `Chapter 1: Foundations/...`)

### 2. Generate Master Study Notes (`notes.md`)
Create or overwrite `notes.md` with a structured, comprehensive GitHub-Flavored Markdown study guide formatted with headers (`#`, `##`), bullet points, bold key terms, and domain icons.

### 3. Update Course Metadata (`about.txt`)
Set `Title:` and `Sub Title:` to match the new course branding:
```txt
Title: Course Title
Sub Title: Course Subtitle
```

### 4. Update Main Audio Player (`index.html`)
Modify `index.html` to reflect the new course branding:
* `<title>` tag and `<meta name="description">`
* `<h1 id="mainTitle">` and `<p id="mainSubtitle">`
* `domainObjectiveMap` dictionary mapping section numbers to official Domain Objective names matching the curriculum analyzed in Step 1.
* Verify `getChapterName()` uses the Universal Multi-Tier Chapter Resolver:
  1. Subfolder names (`slashIdx`)
  2. 2-level objective prefix (`1.1`, `4.10`)
  3. 1-level domain prefix (`1`, `12`)
  4. Auto-generated fallback (`Domain X.Y` or `Domain X`)
* **Accordion Sizing Rule**: ALWAYS ensure `.chapter-section.expanded .chapter-track-list` has `max-height: 50000px; overflow: visible;` so chapters with 20+ tracks are never clipped.
* **Exclusive Accordion Rule**: Opening a chapter section MUST automatically collapse other open chapters to keep long courses organized and prevent infinite scrolling.
* **Mobile Sticky Player Card Dynamic Offset Rule**: `scrollToActiveTrack()` must calculate the sticky `.player-card` height dynamically on mobile and land the active track **16px cleanly below the sticky card** after DOM reflow (`setTimeout(..., 120)`).
* **Floating Top Button Rule**: Floating `[ ▲ Top ]` button (`#btnScrollTop`) MUST be placed directly on `<body>` with `position: fixed; z-index: 9999;` so it is always visible and never trapped inside `backdrop-filter` containers.
* MediaSession lock-screen metadata (`artist` and `album`).

### 5. Update Study Companion (`companion.html`)
Modify `companion.html`:
* `<title>` tag and `<meta name="description">`
* Section heading: `<h2><span class="material-icons-round">auto_stories</span> Course Notes Reference</h2>`
* Footer text: `<p>Course Name Study Companion Suite • Built with dynamic markdown rendering</p>`

### 6. Update Project Documentation (`README.md`)
Update `README.md` with:
* Project title and live site URL (`https://hexdef.com/cybersecurity_audio/`).
* Domain list overview matching the course.
* Sanitized placeholder examples for bucket URLs (`https://your-bucket-domain.com/path/`).
* Local server development instructions (`python3 -m http.server 8000`).

### 7. Compile Playlist Catalogs (`playlist.json` & `playlist.js`)
Execute `generate_playlist.py` scanning the `Audio` directory to bind tracks to the remote base URL:
```bash
python3 generate_playlist.py -d "Audio" -b "<CLOUDFLARE_URL>"
```

### 8. Start Local Web Server
Start the local Python HTTP server to prevent browser CORS protocol blocks (`file://`):
```bash
python3 -m http.server 8000
```
Verify `http://localhost:8000/playlist.json` returns HTTP 200 and valid track data.
Verify that opening an expanded chapter with >20 tracks shows all items completely without scrolling cutoffs.
