# Developer & AI Context Guide (cybersecurity_study_modules - Cybersecurity Study Modules)
## Overview
This file serves as a system guide for any AI assistant or developer working inside the **cybersecurity_study_modules** directory. This directory houses Tanvir Hussain's practical cybersecurity study modules, learning notes, assignments, and lab logs.

---

## 1. Directory Structure & Layout
*   `index.html`: Main landing page listing all cybersecurity study modules.
*   `_posts/`: Input directory containing markdown files for study module entries.
*   `posts/`: Output directory containing compiled HTML pages.
*   `post_template.html`: HTML layout template used to wrap individual study module pages.

---

## 2. Front-Matter Metadata Specification
All markdown files in `_posts/` must contain Jekyll-style YAML front-matter:

```yaml
---
title: "Network Security Lab Analysis"
date: "2026.07.20"
tags: ["MODULES", "LAB"]
summary: "Detailed investigation and packet analysis of network security lab protocols."
---
```

---

## 3. Build & Compile Process
To recompile study module entries and update `index.html`, run the targeted monorepo build script from the repository root:

```bash
python3 build_all.py cybersecurity_study_modules
```
