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
├── Cybersecurity_Study/
│   ├── index.html          # Dashboard index for certifications & coursework
│   ├── certifications.html # Cisco, Google Sec, CompTIA list
│   ├── cybersecurity_coursework.html # HVCC computer science study notes
│   ├── all_coursework.html # Detailed coursework transcript index
│   └── generate_index.py   # Specialized python compiler (injects post counts to dashboard cards)
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
│   └── generate_index.py   # Python post compiler for Security Tutorials
│
├── Tutorials/
│   ├── index.html          # General technical walkthroughs (Raspberry Pi, systems)
│   └── generate_index.py   # Python post compiler for General Tutorials
│
├── Blog/
│   ├── index.html          # Systems journal / general blog logs
│   └── generate_index.py   # Python post compiler for Blog
│
└── CLEP/
    ├── index.html          # Central CLEP exam study dashboard
    ├── compile_readmes.py  # Custom Python Markdown-to-HTML parser for README files
    │
    ├── Sociology/
    │   ├── index.html      # Audio lecture player (Sociology)
    │   ├── companion.html  # Study companion notebook
    │   └── readme.html     # Compiled syllabus details (from README.md)
    │
    ├── Macroeconomics/
    │   ├── index.html      # Audio lecture player (Macroeconomics)
    │   ├── companion.html  # Study companion notebook (links to graphs app)
    │   └── readme.html     # Compiled syllabus details (from README.md)
    │
    ├── Macroeconomics_Graphs/
    │   ├── vite.config.ts  # Vite configuration (configured with relative base: './')
    │   ├── src/            # React + TypeScript + Tailwind graphing workspace source code
    │   └── dist/           # Compiled React static site bundle (tracked in git)
    │
    └── American_Government/
        ├── index.html      # Audio lecture player (American Government)
        └── readme.html     # Compiled syllabus details (from README.md)
```

---

## 2. Navigation System & Dropdowns
Navigation lists are unified across all dashboard headers. The dropdowns are built using a **pure CSS hover mechanism** with a transparent `:before` element bridge to prevent hover loss. On mobile devices, the menu toggle collapses the navigation tree.

### Navigation Hierarchy
*   `[ HOME ]` -> `/`
*   `[ CYBERSECURITY ]` -> `/Cybersecurity/`
    *   `Security Tutorials` -> `/Cybersecurity_Tutorials/`
    *   `Tools & Scripts` -> `/Cybersecurity_Tools/`
    *   `Security Credentials` -> `/Cybersecurity_Study/certifications.html`
*   `[ ACADEMICS ]` -> `/CLEP/`
    *   `CLEP Exam Registry` -> `/CLEP/`
    *   `HVCC Coursework` -> `/Cybersecurity_Study/cybersecurity_coursework.html`
    *   `All Academic Log` -> `/Cybersecurity_Study/all_coursework.html`
*   `[ TUTORIALS ]` -> `/Tutorials/`
*   `[ BLOG ]` -> `/Blog/`
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

### Spacing Rules
*   Maintain tight vertical padding and small gaps.
*   Prevent vertical layout shifts by using `scrollbar-gutter: stable;` on the HTML root.

---

## 4. Compilation Tooling
*   **Static Post Compilers:** Run locally to parse front-matter Markdown files and convert them into HTML pages wrapped in `post_template.html`.
*   **Master Build Script:** `build_all.py` runs all subpage `generate_index.py` scripts and compiles the CLEP Markdown readmes.
*   **Execution:** Run `python3 build_all.py` in the root folder before committing.
