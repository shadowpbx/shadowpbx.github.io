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
├── Cybersecurity/
│   ├── index.html          # Core cybersecurity blog logs
│   ├── generate_index.py   # Python post compiler for Cybersecurity
│   ├── _posts/             # Source markdown articles
│   └── posts/              # Compiled HTML articles
│
├── Cybersecurity_Certifications/
│   ├── index.html          # Professional Credentials / certifications listing
│   ├── generate_index.py   # Python post compiler for Certification posts
│   ├── _posts/             # Source markdown certifications
│   └── posts/              # Compiled HTML certification posts (like CompTIA A+)
│
├── Cybersecurity_Study/
│   ├── index.html          # Cybersecurity Curriculum / training programs listing
│   ├── generate_index.py   # Python post compiler for Study Curriculums
│   ├── _posts/             # Source markdown syllabi (like Elite Red Team Curriculum)
│   └── posts/              # Compiled HTML syllabus posts
│
├── Cybersecurity_Tools/
│   ├── index.html          # Dashboard index for tools & scripts
│   ├── cybersecurity_scripts.html
│   ├── cybersecurity_tools.html
│   ├── all_scripts.html
│   ├── all_tools.html
│   └── generate_index.py   # Specialized python compiler (injects tools counts to dashboard cards)
│
├── Cybersecurity_Tutorials/
│   ├── index.html          # Security tutorials & walkthroughs log
│   ├── generate_index.py   # Python post compiler for Security Tutorials
│   └── Cybersecurity_Concise/ # Custom audio-guided master index study player
│
├── Academics/
│   ├── index.html          # Coursework & CLEPs dashboard
│   ├── generate_index.py   # Python post compiler for academic coursework
│   ├── compile_readmes.py  # Custom Python Markdown-to-HTML parser for README files
│   ├── _posts/             # Source coursework notes (like CISS 100)
│   ├── posts/              # Compiled HTML coursework notes
│   │
│   ├── Sociology/          # CLEP Sociology audio player, companion, and readme
│   ├── Macroeconomics/     # CLEP Macroeconomics audio player, companion, and readme
│   ├── Macroeconomics_Graphs/ # React + TS + Tailwind graphing lab workspace (compiled under dist/)
│   └── American_Government/ # CLEP American Government audio player and readme
│
└── Articles/
    ├── index.html          # Articles & Guides log (merged Blog + Tutorials)
    ├── generate_index.py   # Python post compiler for general articles and guides
    ├── _posts/             # Source blog and tutorial markdown files
    └── posts/              # Compiled HTML articles
```

---

## 2. Flat Navigation System
Navigation is flat and clean, with dropdown lists reserved only for sub-categories under Cybersecurity.

### Navigation Hierarchy
*   `[ HOME ]` -> `/`
*   `[ CYBERSECURITY ]` (Dropdown):
    *   `Security Tutorials` -> `/Cybersecurity_Tutorials/`
    *   `Tools & Scripts` -> `/Cybersecurity_Tools/`
    *   `Certifications` -> `/Cybersecurity_Certifications/`
    *   `Cybersecurity Curriculum` -> `/Cybersecurity_Study/` (study syllabi)
*   `[ COURSEWORK ]` -> `/Academics/` (unified page listing CLEPs and general academic coursework logs)
*   `[ ARTICLES ]` -> `/Articles/` (merged timeline of all tutorials and blog articles)
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
*   **Secondary Text:** `#475569` (Slate-600)
*   **Terminal Prompt Green:** `#059669`
*   **Borders:** `#e2e8f0` (Slate-200)

---

## 4. Compilation Tooling
*   **Static Post Compilers:** Run locally to parse front-matter Markdown files and convert them into HTML pages wrapped in `post_template.html`.
*   **Master Build Script:** `build_all.py` runs all subpage `generate_index.py` scripts and compiles the Academics Markdown readmes.
*   **Execution:** Run `python3 build_all.py` in the root folder before committing.
