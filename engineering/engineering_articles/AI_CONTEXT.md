# Developer & AI Context Guide (engineering_articles - Engineering Articles & Guides)

## Overview
This file serves as a system guide for any AI assistant or developer working inside the **engineering_articles** directory (`/engineering_articles/`). This directory houses deep technical articles, computer science writeups, embedded systems tutorials, audio ML guides, and Linux architecture tutorials.

---

## 1. Directory Structure

```text
engineering_articles/
├── index.html          # Engineering Articles & Guides landing page
├── README.md           # Engineering Articles catalog index
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
To recompile engineering articles and update `index.html`, run the targeted monorepo build script from the repository root:

```bash
python3 build_all.py engineering_articles
```
