# Developer & AI Context Guide (Cybersecurity_Certifications)
## Overview
This file serves as a system guide for any AI assistant or developer working inside the **Cybersecurity_Certifications** directory. This directory houses Tanvir Hussain's verified IT/Security professional certifications and study references (like CompTIA A+).

---

## 1. Directory Structure & Layout
*   `index.html`: Main landing page listing all completed or in-progress certifications.
*   `_posts/`: Input directory containing markdown files of certification details.
*   `posts/`: Output directory containing compiled HTML pages of certifications.
*   `post_template.html`: HTML layout template used to wrap individual certification pages.
*   `generate_index.py`: Python build script that converts markdown files in `_posts/` to HTML, and updates the list in `index.html`.

---

## 2. Front-Matter Metadata Specification
All markdown files in `_posts/` must contain Jekyll-style YAML front-matter with the following properties:

```yaml
---
title: "CompTIA A+ Core 1 (220-1101) High-Yield Study Reference"
date: "2026.07.12"
tags: ["CERT", "A+"]
summary: "High-yield reference guide and summary of core system components, ports, protocols, and hardware troubleshooting for the A+ Core 1 exam."
---
```

### Metadata Fields:
1.  **`title`:** String. The name of the certification.
2.  **`date`:** String (`YYYY.MM.DD`). Used to sort entries newest-first.
3.  **`tags`:** List of strings (e.g., `["CERT", "A+"]`).
4.  **`summary`:** String. Brief description displayed on the landing card.

---

## 3. Build & Compile Process
To recompile certifications and update the index, run:

```bash
python3 generate_index.py
```

*Note: The compiler uses placeholders `<!-- POSTS_START -->` and `<!-- POSTS_END -->` inside `index.html`. It will not overwrite your styles, header navigation, or structural divs.*
