# Developer & AI Context Guide (cybersecurity_curriculum - Cybersecurity Curriculum)
## Overview
This file serves as a system guide for any AI assistant or developer working inside the **cybersecurity_curriculum** directory. This directory houses Tanvir Hussain's 35-Chapter Master Cybersecurity Curriculum and specialized reference master indices.

---

## 1. Directory Structure & Layout
*   `index.html`: Main landing page featuring 3 structured sections:
    1. **Section 00 (`00 // Macroview of Cybersecurity`):** 7 clickable macro ecosystem team cards (Foundation, White Team, Yellow Team, Blue Team, Red Team, Purple Team, DFIR & CTI).
    2. **Section 01 (`01 // Core Curriculum (35 Chapters)`):** 1-column full-width compact list displaying the 35 core sequential chapters.
    3. **Section 02 (`02 // Specialized Master Indices`):** Compact title-only list of specialized deep dives (Social Engineering, Malware & Malcode, Cybersecurity Tools, Tools Available in Kali Linux) with rose-red hover micro-animations (`transform: translateX(4px)`, `#e11d48` border highlight).
*   `_posts/`: Source markdown directory containing the 35 chapter posts (`2026-07-19-chap-01-...md` through `2026-07-19-chap-35-...md`) and standalone master indices.
*   `posts/`: Output directory containing compiled HTML post pages.
*   `post_template.html`: HTML layout template used to wrap individual chapter and syllabus pages with CLI terminal header prompt integration (`user@hexdef:~$ study --chapter 01 --read` or `user@hexdef:~$ study --index <slug> --read`).

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
*   **`title`:** Clean chapter name without any repetitive `Chapter X:` prefix.
*   **`chapter_num`:** 2-digit string (`"01"` to `"35"`). Used by `build_all.py` to sort chapter list in ascending numerical order.
*   **`summary`:** Concise topic summary.

### Standalone Reference Master Indices (Specialized Indices):
```yaml
---
title: "Social Engineering"
date: "2026.07.24"
tags: ["STUDY", "SOCIAL ENGINEERING"]
summary: "A comprehensive master reference index covering OSINT target profiling, digital phishing variants, vishing & pretexting, physical security bypasses, MFA fatigue, AiTM proxies, psychological triggers, and FIDO2/DMARC defenses."
---
```
*   **`chapter_num`:** Omitted or set to `"99"`. Non-team specialized reference indices are automatically placed into Section `02 // Specialized Master Indices` sorted chronologically by date descending `(x['date'], x['title'])`.

---

## 3. Design & Header Standards
*   **CLI Terminal Prompt Header:** Individual post headers use CLI flag formatting inside `.terminal-prompt`:
    *   Chapters: `user@hexdef:~$ study --chapter 01 --read`
    *   Specialized Indices: `user@hexdef:~$ study --index <slug> --read`
*   **Clean Minimalist Layout:** No redundant `READ CHAPTER →` or `READ →` text labels on list items; clickability is indicated by full-row hover micro-animations.
*   **Symmetric Mobile Section Header Spacing:** Balanced padding above and below `h2` section titles (`padding-top: 0.75rem; padding-bottom: 0.75rem`) and container top padding (`padding-top: 1.5rem`) to ensure equal spacing between top header borders and bottom section divider lines.

---

## 4. Build & Compile Process
To recompile all chapters and update index lists, run the monorepo build script:

```bash
python3 build_all.py cybersecurity_curriculum
```

*Note: The compiler uses placeholders `<!-- POSTS_START -->` / `<!-- POSTS_END -->` for chapter lists and `<!-- REFERENCE_START -->` / `<!-- REFERENCE_END -->` for specialized master indices inside `index.html`.*
