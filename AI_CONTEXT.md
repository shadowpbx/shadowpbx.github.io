# Developer & AI Context Guide
## Overview
This file serves as a system guide for any AI assistant or developer working on the **shadowpbx.github.io** web ecosystem. It describes the directory layout, the cross-repo architecture, the design system, and the generation tooling.

---

## 1. Directory & Repo Architecture
The site is modularized across several GitHub repositories. Since they are served via **GitHub Pages**, the main domain is `shadowpbx.github.io`, and project repos are served as subdirectories under the main domain (e.g. `shadowpbx.github.io/Cybersecurity_Study/`).

### Repository Tree & Roles
All repositories are checked out inside the parent directory (`/home/shad/Application/Github/`):

1.  **`shadowpbx.github.io`** (Primary Site / Resume)
    *   **Path:** `shadowpbx.github.io/index.html`
    *   **Role:** Homepage, bio, credentials, and central landing point.
2.  **`Cybersecurity`** (General Security Hub)
    *   **URL:** `https://shadowpbx.github.io/Cybersecurity/`
    *   **Role:** Core cybersecurity posts, threat model analyses, and articles.
3.  **`Cybersecurity_Study`** (Certification & Study Materials)
    *   **URL:** `https://shadowpbx.github.io/Cybersecurity_Study/`
    *   **Role:** CLEP and certification prep resources (A+, Security+, etc.).
4.  **`Cybersecurity_Tools`** (Tooling & Custom Scripts)
    *   **URL:** `https://shadowpbx.github.io/Cybersecurity_Tools/`
    *   **Role:** Repository dedicated to custom tools and scripts.
5.  **`Blog`** (General Blog)
    *   **URL:** `https://shadowpbx.github.io/Blog/`
    *   **Role:** General thought pieces, non-cybersecurity guides, and systems logs.
6.  **`Tutorials`** (General Systems & Programming Tutorials)
    *   **URL:** `https://shadowpbx.github.io/Tutorials/`
    *   **Role:** Technical guides on systems programming, hardware, bare-metal development, etc.
7.  **`Cybersecurity_Tutorials`** (Cybersecurity Writeups & Tutorials)
    *   **URL:** `https://shadowpbx.github.io/Cybersecurity_Tutorials/`
    *   **Role:** Technical cybersecurity guides, walk-throughs, and CTF/pentesting writeups.

---

## 2. Navigation System & Dropdown Hierarchy
The header is left-aligned to align perfectly with the grid containers. The navigation uses a responsive, **pure CSS dropdown (zero JS)** that transforms on mobile into an inline directory structure:

### Link Structure
*   `[ HOME ]` -> `/`
*   `[ CYBERSECURITY ]` -> `/Cybersecurity/`
    *   `Security Tutorials` -> `/Cybersecurity_Tutorials/`
    *   `Certifications & Coursework` -> `/Cybersecurity_Study/`
    *   `Tools & Scripts` -> `/Cybersecurity_Tools/`
*   `[ TUTORIALS ]` -> `/Tutorials/`
*   `[ BLOG ]` -> `/Blog/`
*   `[ GITHUB ]` -> `https://github.com/shadowpbx`

### Responsive Mobile Tree Layout
When viewport is `< 768px`, the menu automatically stacks and renders as a directory tree structure with clean elbow indicators:
```text
[ HOME ]
[ CYBERSECURITY ]
  ↳ Security Tutorials
  ↳ Certifications & Coursework
  ↳ Tools & Scripts
[ TUTORIALS ]
[ BLOG ]
[ GITHUB ]
```

---

## 3. Design Aesthetics & Styling Tokens
The site uses a **Refined Light Mode** developer aesthetic.

*   **Page Background:** `#fcfcfd` (Pristine off-white)
*   **Header Gradient:** Linear bottom fade (`#ffffff` to `#f8fafc`)
*   **Card Background:** `#ffffff` (Pure white)
*   **Accent Color:** `#8e44ad` (Signature Purple)
*   **Primary Text:** `#0f172a` (Slate-900)
*   **Secondary Text:** `#475569` (Slate-600)
*   **Accent Green:** `#059669` (Terminal prompt green)
*   **Borders:** `#e2e8f0` (Slate-200)

### Typography Rules
*   **Headings (`h1`, `h2`, `h3`, and post titles):** Use `Inter` (sans-serif) with bold weights (`600` or `700`) and a letter-spacing adjustment (`letter-spacing: -0.03em;` or `-0.02em;`) for a premium modern tech appearance.
*   **Monospace elements (prompts, dates, links, badges):** Use `JetBrains Mono` for that authentic technical CLI touch.

---

## 4. Blog & Post Generation Tooling
The sub-sites (`Blog`, `Cybersecurity`, `Tutorials`, and `Cybersecurity_Study`) utilize local Python scripts to compile markdown files:
*   **Compiler Script:** `generate_index.py` in each folder.
*   **Process:** Lists files in `_posts/`, parses Jekyll-style YAML front-matter, parses Markdown content into HTML, and injects it into `post_template.html` to generate files in `posts/`.
*   **Updating Index:** 
    *   For `Blog`, `Cybersecurity`, and `Tutorials`: The script swaps contents between `<!-- POSTS_START -->` and `<!-- POSTS_END -->`.
    *   For `Cybersecurity_Study`: The script reads the `track` front-matter (`Certification` or `Academic`) and separates compiles between `<!-- CERTS_START -->`/`<!-- CERTS_END -->` and `<!-- ACADEMIC_START -->`/`<!-- ACADEMIC_END -->` to maintain the dual-column grid index.
    *   The scripts do **not** overwrite page layouts, style rules, or navigation menus in `index.html`.
*   **Post Headers:** Headings within generated posts are formatted via `post_template.html` (using `Inter` headings for design system cohesion).
