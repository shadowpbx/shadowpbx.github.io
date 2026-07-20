# Developer & AI Context Guide (cybersecurity_coursework - Cybersecurity Coursework)
## Overview
This file serves as a system guide for any AI assistant or developer working inside the **cybersecurity_coursework** directory. This directory houses Tanvir Hussain's academic and practical cybersecurity coursework notes, assignments, and lab logs.

---

## 1. Directory Structure & Layout
*   `index.html`: Main landing page listing all cybersecurity coursework posts.
*   `_posts/`: Input directory containing markdown files for coursework entries.
*   `posts/`: Output directory containing compiled HTML pages.
*   `post_template.html`: HTML layout template used to wrap individual coursework pages.

---

## 2. Front-Matter Metadata Specification
All markdown files in `_posts/` must contain Jekyll-style YAML front-matter:

```yaml
---
title: "Network Security Lab Analysis"
date: "2026.07.20"
tags: ["COURSEWORK", "LAB"]
summary: "Detailed investigation and packet analysis of network security lab protocols."
---
```

---

## 3. Build & Compile Process
To recompile coursework entries and update `index.html`, run the targeted monorepo build script from the repository root:

```bash
python3 build_all.py cybersecurity_coursework
```
