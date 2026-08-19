# Developer & AI Context Guide (engineering_tools - Engineering Tools & Utilities)
## Overview
This file serves as a system guide for any AI assistant or developer working inside the **engineering_tools** directory (`/engineering_tools/`). This directory houses non-security developer tools, system utilities, and interactive web applications (e.g. USPS Yellow SDO Calendar).

---

## 1. Directory Structure & Layout
* `index.html`: Main landing page listing all engineering tools and utilities.
* `calendar.html`: Standalone interactive USPS Yellow SDO schedule calendar tool.
* `_posts/`: Input directory containing markdown source profiles for tools.
* `posts/`: Output directory containing compiled HTML tool pages.
* `post_template.html`: Layout template used to wrap individual tool pages.

---

## 2. Build & Compile Process
To recompile engineering tools entries and update `index.html`, run the targeted monorepo build script from the repository root:

```bash
python3 build_all.py engineering_tools
```
