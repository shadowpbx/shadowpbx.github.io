# Developer & AI Context Guide (Cybersecurity_Study - Cybersecurity Curriculum)
## Overview
This file serves as a system guide for any AI assistant or developer working inside the **Cybersecurity_Study** directory. This directory houses Tanvir Hussain's self-directed Cybersecurity Curriculums and Study Syllabi (like the Elite Red Team Curriculum).

---

## 1. Directory Structure & Layout
*   `index.html`: Main landing page listing all study curricula and training syllabi.
*   `_posts/`: Input directory containing markdown files of study syllabi.
*   `posts/`: Output directory containing compiled HTML pages of study syllabi.
*   `post_template.html`: HTML layout template used to wrap individual syllabus pages.
*   `generate_index.py`: Python build script that converts markdown files in `_posts/` to HTML, and updates the list in `index.html`.

---

## 2. Front-Matter Metadata Specification
All markdown files in `_posts/` must contain Jekyll-style YAML front-matter with the following properties:

```yaml
---
title: "Comprehensive Cybersecurity Attack Vector Taxonomy"
date: "2026.07.17"
tags: ["STUDY", "RED TEAM"]
summary: "A 15-module training syllabus designed to take an operator progressively from passive reconnaissance up to low-level EDR bypasses and specialized AI/ICS targeting."
---
```

### Metadata Fields:
1.  **`title`:** String. The name of the curriculum/syllabus.
2.  **`date`:** String (`YYYY.MM.DD`). Used to sort entries newest-first.
3.  **`tags`:** List of strings (e.g., `["STUDY", "RED TEAM"]`).
4.  **`summary`:** String. Brief description displayed on the landing card.

---

## 3. Build & Compile Process
To recompile syllabi and update the index, run the targeted monorepo build script from the root directory:

```bash
python3 build_all.py cybersecurity_study
```

*Note: The compiler uses placeholders `<!-- POSTS_START -->` and `<!-- POSTS_END -->` inside `index.html`. It will not overwrite your styles, header navigation, or structural divs.*
