# Developer & AI Context Guide (cybersecurity_curriculum - Cybersecurity Curriculum)
## Overview
This file serves as a system guide for any AI assistant or developer working inside the **cybersecurity_curriculum** directory. This directory houses Tanvir Hussain's 35-Chapter Master Cybersecurity Curriculum and specialized reference syllabi (such as Offensive Security: The Red Team Index).

---

## 1. Directory Structure & Layout
*   `index.html`: Main landing page featuring a 3-column card grid for the 35 chapters and an enclosed box for specialized reference manuals.
*   `_posts/`: Source markdown directory containing the 35 chapter posts (`2026-07-19-chap-01-...md` through `2026-07-19-chap-35-...md`) and standalone reference indexes.
*   `posts/`: Output directory containing compiled HTML post pages.
*   `post_template.html`: HTML layout template used to wrap individual chapter and syllabus pages.

---

## 2. Front-Matter Metadata Specification
Markdown files in `_posts/` must contain Jekyll-style YAML front-matter:

### Chapter Posts (Chapters 01 - 35):
```yaml
---
layout: single
title: "Networking Fundamentals"
chapter_num: "03"
summary: "Network Topologies (Star, Mesh, Ring), The OSI Model (7-Layer Deep Dive), The TCP/IP Model (4-Layer DoD Architecture)"
---
```
*   **`title`:** String. Clean chapter name **without** any repetitive `Chapter X:` prefix (the compiler automatically renders `CHAPTER 03` in the card top badge).
*   **`chapter_num`:** 2-digit string (`"01"` to `"35"`). Used by `build_all.py` to sort cards in ascending numerical order.
*   **`summary`:** String. Concise topic preview displayed on the chapter card.

### Standalone Reference Manuals (Specialized Indexes):
```yaml
---
title: "Offensive Security: The Red Team Index"
date: "2026.07.19"
tags: ["STUDY", "RED TEAM"]
summary: "A comprehensive categorization of red team attack vectors, exploitation methods, infrastructure, evasion techniques, and operational methodologies."
---
```
*   **`chapter_num`:** Omitted or set to `"99"`. Items without numerical chapter IDs are automatically placed inside the **Specialized Indexes & Master Syllabi** container box at the bottom of `index.html`.

---

## 3. Page Layout Architecture
1. **3-Column Chapter Grid (`.curriculum-grid`):** Displays 35 chapter cards in 3 columns on desktop, 2 on tablet, 1 on mobile. Each card features a top badge (`CHAPTER 01`), clean title, topic summary preview, and a `READ CHAPTER →` action link.
2. **Specialized Indexes Container (`.specialized-box`):** An enclosed dark glass box below the grid with an accent header bar (`❖ SPECIALIZED INDEXES & MASTER SYLLABI`) hosting title-only, fully-clickable reference rows (`.specialized-entry`).

---

## 4. Build & Compile Process
To recompile all chapters, update index cards, and rebuild reference tables, run the targeted monorepo build script from the repository root:

```bash
python3 build_all.py cybersecurity_curriculum
```

*Note: The compiler uses placeholders `<!-- POSTS_START -->` / `<!-- POSTS_END -->` for chapter cards, and `<!-- REFERENCE_START -->` / `<!-- REFERENCE_END -->` for specialized index rows inside `index.html`.*
