# Developer & AI Context Guide (cybersecurity_audio - Audio Tutorials)
## Overview
This file serves as a system guide for any AI assistant or developer working inside the **cybersecurity_audio** directory. This directory houses Tanvir Hussain's audio tutorials, walkthroughs, and audio-guided master index study player.

---

## 1. Directory Structure & Layout
*   `index.html`: Main landing page listing all audio tutorials.
*   `_posts/`: Input directory containing markdown files for audio tutorial entries.
*   `posts/`: Output directory containing compiled HTML pages.
*   `post_template.html`: HTML layout template used to wrap individual audio tutorial pages.
*   `Cybersecurity_Concise/`: Custom audio-guided master index study player.
*   `assets/`: Hosted audio samples (`assets/audio/`) and 1-click Python script downloads (`assets/code/`).

---

## 2. Build & Compile Process
To recompile audio tutorial entries and update `index.html`, run the targeted monorepo build script from the repository root:

```bash
python3 build_all.py cybersecurity_audio
```
