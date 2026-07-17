# Developer & AI Context Guide (Cybersecurity_Study)
## Overview
This file serves as a system guide for any AI assistant or developer working inside the **Cybersecurity_Study** repository. This repository houses Tanvir Hussain's academic coursework notes (including CLEPs, HVCC, and future UAlbany/M.S. coursework) and professional IT/Security certification study materials.

---

## 1. Directory Structure & Layout
*   `index.html`: Main landing page designed with a responsive two-column grid separating **Certifications** and **Academic Coursework**.
*   `_posts/`: Input directory containing markdown files of study guides and notes.
*   `posts/`: Output directory containing compiled HTML pages of notes.
*   `post_template.html`: HTML layout template used to wrap individual notes pages.
*   `generate_index.py`: Python build script that converts markdown files in `_posts/` to HTML, and updates the double-track columns in `index.html`.

---

## 2. Front-Matter Metadata Specification
To ensure notes are sorted into the correct index column, all markdown files in `_posts/` must contain Jekyll-style YAML front-matter with the following properties:

```yaml
---
title: "CLEP American Government: Landmark Court Cases"
date: 2026-07-12
track: Academic
tag: GOV
---
```

### Metadata Fields:
1.  **`title`:** String. The name of the study topic or domain guide.
2.  **`date`:** Date (`YYYY-MM-DD`). Used to sort entries newest-first.
3.  **`track`:** Choice of `Certification` or `Academic`.
    *   `Certification`: Places the note in the **Certifications** column (e.g. CompTIA A+, Security+ notes).
    *   `Academic`: Places the note in the **Academic Coursework** column (e.g. CLEP, college courses). Defaults to `Academic` if omitted.
4.  **`tag`:** Short badge label (e.g., `A+`, `SEC+`, `GOV`, `ENGLISH`, `ALGEBRA`). Defaults to auto-generated keywords if omitted.

---

## 3. Build & Compile Process
To recompile your study guides and update the landing page indexes, run the compiler script in the root of this folder:

```bash
python3 generate_index.py
```

*Note: The compiler uses placeholders `<!-- CERTS_START -->`/`<!-- CERTS_END -->` and `<!-- ACADEMIC_START -->`/`<!-- ACADEMIC_END -->` inside `index.html`. It will not overwrite your styles, header navigation, or structural divs.*
