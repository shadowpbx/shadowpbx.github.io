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
├── cybersecurity_study_modules/
│   ├── index.html          # Cybersecurity Study Modules & Lab Notes listing
│   ├── _posts/             # Source markdown study module entries
│   └── posts/              # Compiled HTML study module pages
│
├── cybersecurity_tools/
│   ├── index.html          # Dashboard index for tools & scripts
│   ├── cybersecurity_scripts.html
│   ├── cybersecurity_tools.html
│   ├── all_scripts.html
│   ├── all_tools.html
│   └── posts/              # Compiled HTML tool profiles
│
├── cybersecurity_audio/
│   ├── index.html          # Audio tutorials hub & featured audio study suites dashboard
│   ├── Cybersecurity_Concise/ # Suite 01: Cybersecurity Master Index Player (397 Modules • 98h 26m)
│   ├── Cybersecurity_Badstuff/ # Suite 02: Cyber Attacks & Exploits Audio Player (71 Modules • 11h 5m)
│   ├── Comptia A+ Core 2/ # Suite 03: CompTIA A+ Core 2 Exam Study Suite (744 Modules • 82h 51m)
│   ├── Cybersecurity Foundations/ # Suite 04: Cybersecurity Foundation Study Suite (55 Modules • 6h 51m)
│   ├── 01 Kali Linux Tools/ # Suite 05: Kali Linux 229 Security Tools Master Reference (229 Modules • 27h 13m)
│   ├── 02 Social Engineering/ # Suite 06: Social Engineering: Human Hacking & Psychology (49 Modules • 6h 4m)
│   ├── 03 Hacking Human Wetware History/ # Suite 07: Hacking Human Wetware: 50 Legendary Heists & Cons (50 Modules • 7h 6m)
│   └── 04 Scammer Psychology & Sociology/ # Suite 08: Scammer Psychology & Sociology (46 Modules • 5h 32m)
│
├── engineering/
│   ├── index.html          # Engineering & Systems Architecture dashboard
│   ├── _posts/             # Source markdown engineering entries
│   └── posts/              # Compiled HTML engineering pages
│
├── engineering_articles/
│   ├── index.html          # Articles & Guides (engineering, algorithms, and technical articles)
│   ├── _posts/             # Source markdown articles (e.g. UVR5, VoxCPM2, Pi Zero 2 W)
│   ├── posts/              # Compiled HTML article pages
│   └── assets/             # Hosted audio samples and 1-click code downloads
│
├── engineering_tools/
│   ├── index.html          # Engineering Tools & Software Utilities
│   ├── _posts/             # Source markdown tool profiles
│   └── posts/              # Compiled HTML tool pages
│
└── academics/
    ├── index.html          # Coursework & CLEPs dashboard
    ├── _posts/             # Source coursework notes (like CISS 100)
    ├── posts/              # Compiled HTML coursework notes
    │
    ├── Sociology/          # CLEP Sociology audio player, companion, and readme
    ├── Macroeconomics/     # CLEP Macroeconomics audio player, companion, and readme
    ├── Macroeconomics_Graphs/ # React + TS + Tailwind graphing lab workspace (compiled under dist/)
    └── American_Government/ # CLEP American Government audio player and readme
```

---

## 2. Flat Navigation System
Navigation is flat and clean, with dropdown lists reserved for sub-categories under Cybersecurity and Engineering.

### Navigation Hierarchy
*   `[ HOME ]` -> `/`
*   `[ CYBERSECURITY ]` (Dropdown):
    *   `Audio Tutorials` -> `/cybersecurity_audio/`
    *   `Tools & Scripts` -> `/cybersecurity_tools/`
    *   `Certifications` -> `/cybersecurity_certifications/`
    *   `Cybersecurity Curriculum` -> `/cybersecurity_curriculum/` (study syllabi)
    *   `Study Modules` -> `/cybersecurity_study_modules/` (study modules & lab notes)
*   `[ ENGINEERING ]` -> `/engineering/` (Dropdown):
    *   `Computer Science` -> `/engineering_cs/` (Algorithms, Data Structures, Theory)
    *   `Articles & Guides` -> `/engineering_articles/` (Linux Kernel, Embedded Systems, Audio ML)
    *   `Tools & Utilities` -> `/engineering_tools/` (Developer Software, Utilities)
*   `[ COURSEWORK ]` -> `/academics/` (unified page listing CLEPs and general academic coursework logs)
*   `[ RESUME ]` -> `/resume/`
*   `[ GITHUB ]` -> `https://github.com/shadowpbx` (new tab)

---

### 🏛️ The [ ENGINEERING ] Dropdown Structure & Expansion Roadmap

**Active Dropdown Structure:**
```text
[ ENGINEERING ] (Dropdown Menu)
 ├── Computer Science       --> /engineering_cs/       (Algorithms, Data Structures, Theory)
 ├── Articles & Guides      --> /engineering_articles/ (Linux Kernel, Embedded Systems, Audio ML)
 └── Tools & Utilities      --> /engineering_tools/    (Developer Software, Utilities)
```
*(As Electrical Engineering, Embedded Systems, or DevSecOps are added in the future, they simply reside under this unified dropdown!)*

**Full Discipline Scope & Architecture:**
1. **Computer Science (`/engineering_cs/`):** CLI prompt `user@hexdef:~$ cs --show-curriculum` ("Computer Science & Computational Foundations"). Houses foundational curricula across:
   * `00 // Algorithms & Complexity` (*Master Index of Algorithms*, *Data Structures Deep Dive*)
   * `01 // Systems & Computer Architecture` (*CPU Execution Pipeline & Registers*, *Virtual Memory & Cache Coherence*)
   * `02 // Compilers & Language Theory` (*Lexical Analysis & ASTs*, *Bytecode Virtual Machines*)
2. **Articles & Guides (`/engineering_articles/`):** Systems architecture, low-level OS mechanics, Linux kernel modules, bootloaders/init systems, and ML audio processing engines (Kokoro, VoxCPM2).
3. **Tools & Utilities (`/engineering_tools/`):** Specialized developer software, productivity tools, and automation scripts.
4. **Electrical & Embedded Engineering (Future Submenu):** Circuit analysis, digital electronics, hardware design, microcontrollers, embedded Linux (Raspberry Pi, Buildroot), and signal processing.
5. **DevSecOps & Cloud Infrastructure (Future Submenu):** CI/CD automation pipelines, containerization (Docker/K8s), Infrastructure as Code (Terraform), and cloud security architecture.

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
*   **Footer Branding Standard:** `&copy; 2026 // TANVIR HUSSAIN // SYSTEMS & SECURITY` across all site pages.
*   **Section Headers Standard:** `<h2><span class="section-num">00 //</span> Title</h2>` featuring green prompt `>` (`color: #059669; font-family: var(--font-mono); margin-right: 10px;`), purple index number `00 //` (`color: #8e44ad`), dark slate title text, and a crisp 1px bottom border divider line (`border-bottom: 1px solid var(--border); padding-top: 0.6rem; padding-bottom: 0.6rem; margin-bottom: 1.25rem;`).
*   **CLI Terminal Prompt Header:** Individual post headers use CLI flag formatting inside `.terminal-prompt` (`user@hexdef:~$ study --chapter 01 --read` or `user@hexdef:~$ study --index <slug> --read`).
*   **Mobile Fluid Typography:** Post titles in all `post_template.html` files use fluid font scaling (`font-size: clamp(1.5rem, 5.5vw, 2.2rem) !important;` with `line-height: 1.3`) under `@media (max-width: 768px)` so long titles scale cleanly on mobile devices without overflowing.

---

## 4. Developer Profile & Background
*   **Name:** Tanvir Hussain
*   **Email:** `tanvir@hexdef.com`
*   **Domain:** `https://hexdef.com/` (GitHub Pages).
*   **Education:** 
    *   B.Sc. in Electrical & Electronic Engineering (RUET, 2007–2011, WES Evaluated Ref: 2899973).
    *   A.S. in Computer Information Systems (Cyber Defense Concentration) at Hudson Valley Community College (HVCC) (In Progress).
*   **Past Engineering Background:** Senior Software Engineer at SAMSUNG R&D Institute Bangladesh Ltd (June 2012 – Oct 2015). Worked on Android/Tizen OS frameworks, C/C++ graphics engines (Liquid Simulation, Gear VR), and Samsung IME.
*   **U.S. Patent:** U.S. Patent No. US10599306B2 (*"Electronic Device and Method for Operating Notification Bar Thereof"*).
*   **Publications:** 5 peer-reviewed papers including IEEE ICIEV 2012.

---

## 5. Compilation Tooling & AI Execution Rules
*   **Centralized Compiler Engine:** Consolidates all static compilation logic for all monorepo directories into a single, master Python script: **`build_all.py`** in the root directory. 
*   **Targeted Build Requirement:** Build specific directories or run full site compilation via `python3 build_all.py`.
*   **Directory Naming Case Sensitivity:** All directory paths and CLI arguments are strictly **lowercase** on the Linux server (`cybersecurity`, `curriculum`, `academics`, etc.).
*   **Playlist & Generator Policy:** NEVER modify audio playlist files (`playlist.json`, `playlist.js`) or generator scripts (`generate_playlist.py`) unless explicitly requested by the user.
*   **Capabilities:** Compiles Markdown files (using `python-markdown` with fenced code blocks and tables extensions), injects contents into local templates, constructs index cards (supporting standard lists and curriculum featured cards), dynamically calculates script/tool count metrics for `cybersecurity_tools`, and compiles README guides in `academics`.
