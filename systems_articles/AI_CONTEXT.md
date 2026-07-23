# Developer & AI Context Guide (systems_articles - Systems Articles & Guides)

## Overview
This file serves as a system guide for any AI assistant or developer working inside the **systems_articles** directory (`/systems_articles/`). This directory houses technical articles, software architecture writeups, audio processing guides, and Linux sysadmin tutorials.

---

## 1. Directory Structure

```text
systems_articles/
├── index.html          # Systems Articles & Guides landing page
├── README.md           # Systems Articles catalog index
├── post_template.html  # Standard article layout template
├── AI_CONTEXT.md       # AI developer context file
├── _posts/             # Source Markdown files (e.g. UVR5, VoxCPM2, Pi Zero 2 W)
├── posts/              # Compiled HTML output pages
└── assets/
    ├── audio/          # Hosted audio files (MP3, WAV samples for player embedding)
    └── code/           # Standalone code downloads (e.g. voxcpm2/ run.py, watch_input.py)
```

---

## 2. Build & Compile Process
To recompile systems articles and update `index.html`, run the targeted monorepo build script from the repository root:

```bash
python3 build_all.py systems_articles
```
