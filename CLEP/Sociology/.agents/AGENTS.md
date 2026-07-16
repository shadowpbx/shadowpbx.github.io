# CLEP Introductory Sociology Workspace Context & memory

This directory houses the study tools for the CLEP Introductory Sociology exam. Every future Antigravity agent loading this workspace should read this file to maintain architectural consistency and retain configuration states.

---

## 📂 Project Architecture

1. **CLEP Lecture Audio Player**
   * **Repository**: `https://github.com/shadowpbx/CLEP_Sociology`
   * **URL**: `https://shadowpbx.github.io/CLEP_Sociology/`
   * **Key Files**:
     * `index.html`: Main audio player dashboard (glassmorphic dark theme, sticky full-width controls).
     * `companion.html`: The written reference guide (renders `notes.md` on the fly).
     * `notes.md`: Markdown document of study notes and key perspectives.
     * `generate_playlist.py`: Python CLI tool to compile local or remote MP3 tracks into `playlist.json` / `playlist.js`.
     * `about.txt`: Metadata configuration holding the main header text.

---

## 🛠️ Critical Configurations & Bug Fixes

### 1. iOS Safari Replay Bug Fix (Double Ended Events)
* **Problem**: Synchronously calling `audio.currentTime = 0` and `.play()` inside the HTML5 `<audio>` element's `'ended'` event listener triggers a race condition in WebKit. The browser fires a duplicate `'ended'` event immediately upon restart, which skipped repeat loops and skipped tracks prematurely.
* **Fix**: Replay transitions are protected by three layers of defense:
  1. The transition is wrapped in a `setTimeout` (50ms) to let WebKit complete its state change before starting the next loop.
  2. A 1-second (1000ms) debounce guard (`lastEndedTime`) is implemented in the `ended` event listener to discard any fast-consecutive duplicate triggers.
  3. The transition timeout ID (`loopTimeoutId`) is registered and cleared during track loading (`loadTrack`) or user pauses (`pauseAudio`) to prevent race-condition playback restarts.

### 2. State Partitioning & Namespacing
* **LocalStorage Keys**: To avoid data collision on the shared domain origin (`shadowpbx.github.io`), all local storage keys in this project are prefixed with `clep_sociology_` (e.g. `clep_sociology_index`, `clep_sociology_time`).

### 3. Mobile Viewport Layout Optimizations
* **Audio Player**: Uses natural page scrolling with a sticky, full-width, solid slate player card (`#0f172a`, `z-index: 100`) at the very top of the mobile viewport (`top: 0; left: 0; right: 0`). The scrollable playlist slides cleanly behind it and becomes completely hidden.
* **Companion Page**: Powered by an interactive multi-theme switcher (Dark Comfort, Warm Sepia, Light Paper, and Auto). Styled with high-contrast system fonts, `font-weight: 500` for bold readability, and reduced card paddings (`1rem`) and body margins (`0.25rem`) on mobile to maximize horizontal width.
