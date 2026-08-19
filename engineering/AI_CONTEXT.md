# Developer & AI Context Guide (engineering - Engineering & Systems Architecture)
## Overview
This file serves as a system guide for any AI assistant or developer working inside the **engineering** directory (`/engineering/`). This directory houses Tanvir Hussain's Engineering & Systems Architecture dashboard.

---

## 1. Directory Structure & Layout
*   `index.html`: Main landing page for Engineering & Systems Architecture.
*   `_posts/`: Input directory containing markdown files for engineering architecture posts.
*   `posts/`: Output directory containing compiled HTML pages.
*   `post_template.html`: HTML layout template used to wrap individual engineering pages.

---

## 2. 🏛️ The [ ENGINEERING ] Dropdown Structure & Expansion Roadmap

**Active Dropdown Structure:**
```text
[ ENGINEERING ] (Dropdown Menu)
 ├── Audio Tutorials        --> /engineering_audio/    (Interactive Players & Companion Notes)
 ├── Computer Science       --> /engineering_cs/       (Algorithms, Data Structures, Theory)
 ├── Articles & Guides      --> /engineering_articles/ (Linux Kernel, Embedded Systems, Audio ML)
 └── Tools & Utilities      --> /engineering_tools/    (Developer Software, Utilities)
```
*(As Electrical Engineering, Embedded Systems, or DevSecOps are added in the future, they simply reside under this unified dropdown!)*

**Full Discipline Scope & Architecture:**
1. **Computer Science (`/engineering_cs/`):** Foundational algorithms (Search/Sort, Graph/Network, Dynamic Programming, String Processing, Cryptography, AI/ML heuristics, Distributed Consensus, Quantum), data structures, and algorithmic complexity (`Master Index of Algorithms`).
2. **Audio Tutorials (`/engineering_audio/`):** Voice-driven engineering & CS study suites, interactive audio players, and companion notes.
3. **Articles & Guides (`/engineering_articles/`):** Systems architecture, low-level OS mechanics, Linux kernel modules, bootloaders/init systems, and ML audio processing engines (Kokoro, VoxCPM2).
4. **Tools & Utilities (`/engineering_tools/`):** Specialized developer software, productivity tools, and automation scripts.
5. **Electrical & Embedded Engineering (Future Submenu):** Circuit analysis, digital electronics, hardware design, microcontrollers, embedded Linux (Raspberry Pi, Buildroot), and signal processing.
6. **DevSecOps & Cloud Infrastructure (Future Submenu):** CI/CD automation pipelines, containerization (Docker/K8s), Infrastructure as Code (Terraform), and cloud security architecture.

---

## 3. Build & Compile Process
To recompile engineering posts and update `index.html`, run the targeted monorepo build script from the repository root:

```bash
python3 build_all.py engineering
```

