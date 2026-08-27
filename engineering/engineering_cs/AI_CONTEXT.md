# Developer & AI Context Guide (engineering_cs - Computer Science & Algorithms)
## Overview
This file serves as a system guide for any AI assistant or developer working inside the **engineering_cs** directory (`/engineering_cs/`). This directory houses foundational computer science curricula, algorithm master indices, data structure breakdowns, and computational complexity analysis.

---

## 1. Directory Structure & Layout
* `index.html`: Main landing page listing all Computer Science & Algorithm master indices (`user@hexdef:~$ cs --show-curriculum`).
* `_posts/`: Input directory containing markdown source files (e.g., `2026-08-18-master-index-of-algorithms.md`).
* `posts/`: Output directory containing compiled HTML post pages.
* `post_template.html`: Layout template used to wrap individual CS pages.

---

## 2. 🏛️ Computer Science Hub Roadmap & Architecture
The Computer Science Hub (`/engineering_cs/`) is structured according to the following foundational curriculum blueprint:

```text
user@hexdef:~$ cs --show-curriculum
Computer Science & Computational Foundations

00 // Algorithms & Complexity
├── Master Index of Algorithms
└── Data Structures Deep Dive

01 // Systems & Computer Architecture
├── CPU Execution Pipeline & Registers
└── Virtual Memory & Cache Coherence

02 // Compilers & Language Theory
├── Lexical Analysis & Abstract Syntax Trees
└── Bytecode Virtual Machines
```

---

## 3. Build & Compile Process
To recompile Computer Science entries and update `index.html`, run the targeted monorepo build script from the repository root:

```bash
python3 build_all.py engineering_cs
```
