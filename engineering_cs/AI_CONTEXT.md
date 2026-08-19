# Developer & AI Context Guide (engineering_cs - Computer Science & Algorithms)
## Overview
This file serves as a system guide for any AI assistant or developer working inside the **engineering_cs** directory (`/engineering_cs/`). This directory houses foundational computer science curricula, algorithm master indices, data structure breakdowns, and computational complexity analysis.

---

## 1. Directory Structure & Layout
* `index.html`: Main landing page listing all Computer Science & Algorithm master indices.
* `_posts/`: Input directory containing markdown source files (e.g., `2026-08-18-master-index-of-algorithms.md`).
* `posts/`: Output directory containing compiled HTML post pages.
* `post_template.html`: Layout template used to wrap individual CS pages.

---

## 2. Build & Compile Process
To recompile Computer Science entries and update `index.html`, run the targeted monorepo build script from the repository root:

```bash
python3 build_all.py engineering_cs
```
