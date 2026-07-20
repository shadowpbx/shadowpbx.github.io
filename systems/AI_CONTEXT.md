# Developer & AI Context Guide (systems - Systems Architecture & Engineering)
## Overview
This file serves as a system guide for any AI assistant or developer working inside the **systems** directory. This directory houses Tanvir Hussain's Systems Architecture and Engineering dashboard.

---

## 1. Directory Structure & Layout
*   `index.html`: Main landing page for Systems Architecture.
*   `_posts/`: Input directory containing markdown files for systems architecture posts.
*   `posts/`: Output directory containing compiled HTML pages.
*   `post_template.html`: HTML layout template used to wrap individual systems pages.

---

## 2. Build & Compile Process
To recompile systems posts and update `index.html`, run the targeted monorepo build script from the repository root:

```bash
python3 build_all.py systems
```
