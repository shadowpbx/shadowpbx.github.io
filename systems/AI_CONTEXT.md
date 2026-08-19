# Developer & AI Context Guide (systems - Systems Architecture & Engineering)
## Overview
This file serves as a system guide for any AI assistant or developer working inside the **systems** (or future **engineering**) directory. This directory houses Tanvir Hussain's Systems Architecture and Engineering dashboard.

---

## 1. Directory Structure & Layout
*   `index.html`: Main landing page for Systems Architecture & Engineering.
*   `_posts/`: Input directory containing markdown files for systems architecture posts.
*   `posts/`: Output directory containing compiled HTML pages.
*   `post_template.html`: HTML layout template used to wrap individual systems pages.

---

## 2. 🏛️ The Ideal [ ENGINEERING ] Architecture & Roadmap Specification
When expanding or structuring engineering, computer science, and computing topics, the unified **`[ ENGINEERING ]`** umbrella is mapped as follows:

```text
[ ENGINEERING ] (Dropdown Menu)
 ├── DevSecOps & Cloud Infrastructure  (CI/CD, Docker, Kubernetes, Terraform, Cloud Security Architecture)
 ├── Computer Science & Algorithms      (Master Index of Algorithms, Data Structures, Computational Theory)
 ├── Electrical & Embedded Engineering  (Circuits, Raspberry Pi, Microcontrollers, Hardware, Digital Logic)
 ├── Systems & Linux Architecture       (Boot processes, Kernel tuning, Voice ML engines, OS Internals)
 └── Engineering Tools & Utilities      (SDO Calendar, Developer Scripts, Systems Utilities)
```

**Discipline Roles & Scope:**
1. **DevSecOps & Cloud Infrastructure:** Automated CI/CD pipelines, container orchestration (Docker/Kubernetes), Infrastructure as Code (Terraform), cloud security, and build infrastructure.
2. **Computer Science & Algorithms:** Core algorithms (Sorting, Graph Theory, Dynamic Programming, String Processing, Cryptography, Machine Learning heuristics, Distributed Consensus, Quantum), data structures, and computational complexity (`Master Index of Algorithms`).
3. **Electrical & Embedded Engineering:** Circuit analysis, digital electronics, hardware design, microcontrollers, embedded Linux (Raspberry Pi, Buildroot), and digital signal processing.
4. **Systems & Linux Architecture:** Low-level OS mechanics, Linux kernel modules, bootloaders/init systems, and ML audio processing engines (Kokoro, VoxCPM2).
5. **Engineering Tools & Utilities:** Specialized developer software, productivity tools, and automation scripts.

---

## 3. Build & Compile Process
To recompile systems posts and update `index.html`, run the targeted monorepo build script from the repository root:

```bash
python3 build_all.py systems
```

