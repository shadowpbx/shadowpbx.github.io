# Cybersecurity Concise Workspace Context & memory

This directory houses the study tools for the Cybersecurity Concise master study guide and audio suite. Every future Antigravity agent loading this workspace should read this file to maintain architectural consistency and retain configuration states.

---

## 📂 Project Architecture

1. **Cybersecurity Lecture Audio Player & Companion**
   * **Key Files**:
     * `index.html`: Main audio player dashboard (glassmorphic dark theme, sticky full-width controls, using namespaced local storage).
     * `companion.html`: The written study companion (renders `notes.md` dynamically on the fly).
     * `notes.md`: Markdown document of cybersecurity master notes (originally named `Cybersecurity Master Index concise.md`).
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
* **LocalStorage Keys**: To avoid data collision with other study suite directories (e.g. the Sociology app), all local storage keys in this project are prefixed with `cybersecurity_concise_` (e.g. `cybersecurity_concise_index`, `cybersecurity_concise_time`).

### 3. Mobile Viewport Layout Optimizations
* **Audio Player**: Uses natural page scrolling with a sticky, full-width, solid slate player card (`#0f172a`, `z-index: 100`) at the very top of the mobile viewport (`top: 0; left: 0; right: 0`). The scrollable playlist slides cleanly behind it and becomes completely hidden.
* **Companion Page**: Powered by an interactive multi-theme switcher (Dark Comfort, Warm Sepia, Light Paper, and Auto). Styled with high-contrast system fonts, `font-weight: 500` for bold readability, and reduced card paddings (`1rem`) and body margins (`0.25rem`) on mobile to maximize horizontal width.

### 4. Chapter Accordion & Layout Redesign (Planned)
* **Status**: Confirmed by User, awaiting R2 upload completion.
* **Requirements**:
  1. **Folder Structure**: Preserve 35 chapter subfolders rather than flattening.
  2. **Accordion Sidebar**: Group tracks by parent folder name dynamically. Display collapsible accordion headers for each chapter.
  3. **Seamless Transitions**: Play sequentially from chapter to chapter. Auto-expand the target chapter, collapse previous, and scroll active track into view on transition.
  4. **Single-Line Truncation**: Playlist items are truncated to 1 line with ellipsis (`text-overflow: ellipsis`) and browser tooltip `title` attribute for readability.
  5. **Now Playing Wrapping**: Active track title on Now Playing card wraps to 2 lines max with optimized font-size.
  6. **Recursive Scanner**: Update `generate_playlist.py` to recursively scan `.mp3` files in subdirectories using natural sorting, preserving relative paths.

