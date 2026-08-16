# Developer & AI Context Guide (cybersecurity_audio - Audio Tutorials)
## Overview
This file serves as a system guide for any AI assistant or developer working inside the **cybersecurity_audio** directory. This directory houses Tanvir Hussain's audio-guided master index study suites, audio walkthroughs, and companion notes.

---

## 1. Directory Structure & Featured Audio Suites
*   `index.html`: Main landing page featuring the **Featured Audio Study Suites** dashboard and dynamically compiled audio tutorial logs.
*   `Cybersecurity_Concise/`: Featured Suite 01 — *Cybersecurity Master Index* (35 Chapters • 397 Modules • 98h 26m total runtime). Contains `index.html` (interactive HTML5 player) and `companion.html` (written notes).
*   `Cybersecurity_Badstuff/`: Featured Suite 02 — *Cyber Attacks & Exploits* (71 Modules • 11h 5m total runtime). Covers Malware, Exploits, OT/ICS, and AI Security Risks. Contains `index.html` (interactive HTML5 player) and `companion.html` (written notes).
*   `Comptia A+ Core 2/`: Featured Suite 03 — *CompTIA A+ Core 2 (220-1202) Exam Study Suite* (744 Modules • 82h 51m total runtime). Contains `index.html` (interactive HTML5 player) and `companion.html` (written exam notes).
*   `Cybersecurity Foundations/`: Featured Suite 04 — *Cybersecurity Foundation Study Suite* (55 Modules • 6h 51m total runtime). Contains `index.html` (interactive HTML5 player) and `companion.html` (written notes).
*   `01 Kali Linux Tools/`: Featured Suite 05 — *Kali Linux 229 Security Tools Master Reference Guide* (229 Modules • 27h 13m total runtime). Contains `index.html` (interactive HTML5 player) and `companion.html` (written tool notes).
*   `02 Social Engineering/`: Featured Suite 06 — *Social Engineering: Human Hacking & Psychology* (49 Modules • 6h 4m total runtime). Contains `index.html` (interactive HTML5 player) and `companion.html` (written notes).
*   `03 Hacking Human Wetware History/`: Featured Suite 07 — *Hacking Human Wetware: 50 Legendary Heists & Cons* (50 Modules • 7h 6m total runtime). Contains `index.html` (interactive HTML5 player) and `companion.html` (written notes).
*   `_posts/`: Source markdown directory for individual audio tutorial entries.
*   `posts/`: Output directory for compiled HTML audio post pages.
*   `post_template.html`: Layout template for wrapping individual audio post entries.

---

## 2. Card Design & Button Standards
*   **Terminal Workstation Cards:** High-contrast cards featuring:
    *   **Top Status Bar:** Left suite badge (`[ SUITE 01 ]` – `[ SUITE 07 ]`) and right status pill displaying track count + total runtime (`397 MODULES • 98h 26m`, `71 MODULES • 11h 5m`, `744 MODULES • 82h 51m`, `55 MODULES • 6h 51m`, `229 MODULES • 27h 13m`, `49 MODULES • 6h 4m`, `50 MODULES • 7h 6m`).
    *   **Single Focused Action Button:**
        *   `btn-audio-primary`: Full-width `[ 🎧 LAUNCH PLAYER ]` with `white-space: nowrap`, high-contrast deep purple text (`#6b21a8`), and light purple tint background (`rgba(142, 68, 173, 0.08)`). Hover shifts to full purple (`#8e44ad`) with white text and glow shadow. Study notes are accessible directly within each player header.

---

## 3. Build & Compile Process
To recompile audio tutorial entries and update `index.html`, run the targeted monorepo build script from the repository root:

```bash
python3 build_all.py cybersecurity_audio
```
