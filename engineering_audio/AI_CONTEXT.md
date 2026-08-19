# Developer & AI Context Guide (engineering_audio - Engineering Audio Workstation)
## Overview
This file serves as a system guide for any AI assistant or developer working inside the **engineering_audio** directory (`/engineering_audio/`). This directory houses voice-driven engineering, computer science, and systems architecture audio study suites, interactive audio players, and companion notes.

---

## 1. Directory Structure & Layout
* `index.html`: Main landing page for Engineering Audio Suites (`user@hexdef:~$ audio --engineering --list-suites`).
* `_posts/`: Input directory containing markdown source files for audio tutorial guides.
* `posts/`: Output directory containing compiled HTML post pages.
* `post_template.html`: Layout template used to wrap individual engineering audio pages.

---

## 2. Build & Compile Process
To recompile Engineering Audio entries and update `index.html`, run the targeted monorepo build script from the repository root:

```bash
python3 build_all.py engineering_audio
```
