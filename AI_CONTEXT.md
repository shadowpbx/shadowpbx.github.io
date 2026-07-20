# Developer & AI Context Guide (Monorepo Edition)

## Overview
This file serves as a system guide for any AI assistant or developer working on the **shadowpbx.github.io** (published as **hexdef.com**) web ecosystem. It describes the directory layout, compile system, design system, and deployment architecture.

---

## 1. Directory & Monorepo Architecture
The website was converted from 11 separate repositories into a single, unified **Monorepo** structure. GitHub Pages natively serves subdirectories. All pages are mapped directly under the custom domain `https://hexdef.com/`.

### Directory Tree & Roles
```text
shadowpbx.github.io/ (Main Repository root, maps to hexdef.com/)
├── CNAME                   # Custom domain routing record (contains hexdef.com)
├── index.html              # Central portal dashboard (no H1 title, minimalist console)
├── global.css              # Unified global stylesheet (variables, layouts, TUI components)
├── build_all.py            # Master compilation script (runs index generation across all pillars)
│
├── resume/
│   └── index.html          # Detailed CV (large Tanvir Hussain /whoami branding)
│
├── cybersecurity/
│   ├── index.html          # Core cybersecurity blog logs
│   ├── _posts/             # Source markdown articles
│   └── posts/              # Compiled HTML articles
│
├── cybersecurity_certifications/
│   ├── index.html          # Professional Credentials / certifications listing
│   ├── _posts/             # Source markdown certifications
│   └── posts/              # Compiled HTML certification posts (like CompTIA A+)
│
├── cybersecurity_curriculum/
│   ├── index.html          # Cybersecurity 35-Chapter Master Curriculum & Reference Syllabi
│   ├── _posts/             # Source markdown files (35 Chapter posts + Red Team Index)
│   └── posts/              # Compiled HTML post pages
│
├── cybersecurity_coursework/
│   ├── index.html          # Cybersecurity Coursework & Lab Logs listing
│   ├── _posts/             # Source markdown coursework entries
│   └── posts/              # Compiled HTML coursework pages
│
├── cybersecurity_tools/
│   ├── index.html          # Dashboard index for tools & scripts
│   ├── cybersecurity_scripts.html
│   ├── cybersecurity_tools.html
│   ├── all_scripts.html
│   ├── all_tools.html
│   └── posts/              # Compiled HTML tool profiles
│
├── cybersecurity_tutorials/
│   ├── index.html          # Security tutorials & walkthroughs log
│   └── Cybersecurity_Concise/ # Custom audio-guided master index study player
│
├── general_articles/
│   ├── index.html          # General Articles & Technical Writeups
│   ├── _posts/             # Source markdown articles
│   └── posts/              # Compiled HTML article pages
│
├── general_tools/
│   ├── index.html          # General Tools & Software Utilities
│   ├── _posts/             # Source markdown tool profiles
│   └── posts/              # Compiled HTML tool pages
│
├── academics/
│   ├── index.html          # Coursework & CLEPs dashboard
│   ├── _posts/             # Source coursework notes (like CISS 100)
│   ├── posts/              # Compiled HTML coursework notes
│   │
│   ├── Sociology/          # CLEP Sociology audio player, companion, and readme
│   ├── Macroeconomics/     # CLEP Macroeconomics audio player, companion, and readme
│   ├── Macroeconomics_Graphs/ # React + TS + Tailwind graphing lab workspace (compiled under dist/)
│   └── American_Government/ # CLEP American Government audio player and readme
│
└── articles/
    ├── index.html          # Articles & Guides log (merged Blog + Tutorials)
    ├── _posts/             # Source blog and tutorial markdown files
    └── posts/              # Compiled HTML articles
```

---

## 2. Flat Navigation System
Navigation is flat and clean, with dropdown lists reserved for sub-categories under Cybersecurity and Systems.

### Navigation Hierarchy
*   `[ HOME ]` -> `/`
*   `[ CYBERSECURITY ]` (Dropdown):
    *   `Security Tutorials` -> `/cybersecurity_tutorials/`
    *   `Tools & Scripts` -> `/cybersecurity_tools/`
    *   `Certifications` -> `/cybersecurity_certifications/`
    *   `Cybersecurity Curriculum` -> `/cybersecurity_curriculum/` (study syllabi)
    *   `Cybersecurity Coursework` -> `/cybersecurity_coursework/` (coursework & lab logs)
*   `[ SYSTEMS ]` (Dropdown):
    *   `General Articles` -> `/general_articles/` (non-security technical articles)
    *   `Tools & Utilities` -> `/general_tools/` (non-security tools & scripts)
*   `[ COURSEWORK ]` -> `/academics/` (unified page listing CLEPs and general academic coursework logs)
*   `[ RESUME ]` -> `/resume/`
*   `[ GITHUB ]` -> `https://github.com/shadowpbx` (new tab)

---

## 3. Design Aesthetics & Styling Tokens
All layouts inherit from the central `/global.css` file:
*   **Page Background:** `#fcfcfd` (Pristine off-white)
*   **Header Gradient:** Linear top-down fade (`#ffffff` to `#f8fafc`)
*   **Card Background:** `#ffffff` (Pure white)
*   **Accent Color:** `#8e44ad` (Signature Purple)
*   **Primary Text:** `#0f172a` (Slate-900)
*   **Secondary Text:** `#2c3e50` (Slate-800 / Dark Charcoal)
*   **Terminal Prompt Green:** `#059669`
*   **Borders:** `#e2e8f0` (Slate-200)

---

## 4. Compilation Tooling & AI Execution Rules
*   **Centralized Compiler Engine:** Consolidates all static compilation logic for all monorepo directories into a single, master Python script: **`build_all.py`** in the root directory. 
*   **Targeted Build Requirement:** **NEVER build the entire website with plain `python3 build_all.py`** when making targeted edits. ALWAYS build only the specific directory where files were added or modified by passing the lowercase folder name as an argument (e.g. `python3 build_all.py cybersecurity` or `python3 build_all.py cybersecurity_curriculum`).
*   **Directory Naming Case Sensitivity:** All directory paths and CLI arguments are strictly **lowercase** on the Linux server (`cybersecurity`, `curriculum`, `academics`, etc.).
*   **Playlist & Generator Policy:** NEVER modify audio playlist files (`playlist.json`, `playlist.js`) or generator scripts (`generate_playlist.py`) unless explicitly requested by the user.
*   **Capabilities:** Compiles Markdown files (using `python-markdown` with fenced code blocks and tables extensions), injects contents into local templates, constructs index cards (supporting standard lists and curriculum featured cards), dynamically calculates script/tool count metrics for `cybersecurity_tools`, and compiles README guides in `academics`.
