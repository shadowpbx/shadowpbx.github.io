# HexDef — Security & Systems Portal

This repository contains the source code for the **[hexdef.com](https://hexdef.com/)** web ecosystem (hosted via GitHub Pages at `shadowpbx.github.io`). It is designed as a unified Monorepo containing a central dashboard and modular sub-portals for cybersecurity writeups, custom developer tools, academic guides, tutorials, journals, and interactive graphing labs.

---

## 🚀 Getting Started: Local Development & Server Setup

Since this is a static site powered by HTML5, Vanilla CSS, and lightweight client-side JavaScript, you do not need complex toolchains or databases to test it locally.

### 1. Serve the Website Locally (Fast & Zero Setup)
Python has a built-in web server module that allows you to preview the site instantly on your local computer.

1.  Open your terminal.
2.  Navigate to the repository root directory:
    ```bash
    cd /home/shad/Application/Github/shadowpbx.github.io
    ```
3.  Launch the local development server:
    ```bash
    python3 -m http.server 8000
    ```
4.  Open your web browser and navigate to:
    ```text
    http://localhost:8000/
    ```

*Any local edits you make to index files, CSS layouts, or compiled posts will be visible **instantly** by refreshing your browser.*

---

## 🛠️ Build & Compilation Pipeline

The website compiles Markdown articles (`.md`) into themed static HTML files (`.html`) using a centralized Python build system.

### How to Compile the Portal:
To recompile the website, run the master build script in the root directory:

```bash
# Build the entire website:
python3 build_all.py

# Build only a specific folder (targeted build):
python3 build_all.py Cybersecurity_Study
```

This command will:
1.  Scan active source directories (`Cybersecurity`, `Articles`, `Cybersecurity_Certifications`, `Cybersecurity_Study`, `Cybersecurity_Tools`, `Cybersecurity_Tutorials`).
2.  Process all front-matter Markdown files in their respective `_posts/` directories.
3.  Generate responsive, Prism-highlighted HTML pages in their respective `posts/` directories.
4.  Update index pages and dashboard card counters.
5.  Compile Academics syllabus documentation (`README.md` files) into static `readme.html` pages under `/Academics/`.

---

## 📊 Building the Economic Graph Lab (Vite + React)

The Principles of Macroeconomics study guide features an interactive economic graphing utility written in **React + TypeScript + TailwindCSS** located under `/Academics/Macroeconomics_Graphs/`.

To build or modify the Graph Lab locally:

1.  Navigate to the Graph Lab workspace:
    ```bash
    cd Academics/Macroeconomics_Graphs/
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the local development server (with hot module replacement):
    ```bash
    npm run dev
    ```
4.  Compile for production:
    ```bash
    npm run build
    ```
    *Note: The production static output is written to `/Academics/Macroeconomics_Graphs/dist/` which is tracked in Git to allow hosting on GitHub Pages.*

---

## 📦 Deployment Protocol

To deploy your local changes to the live domain `hexdef.com`:

1.  Compile all static posts and CLEP readmes:
    ```bash
    python3 build_all.py
    ```
2.  Stage your modifications and additions:
    ```bash
    git add .
    ```
3.  Commit your updates:
    ```bash
    git commit -m "Your descriptive commit message"
    ```
4.  Push to GitHub (triggers automated Pages deploy actions):
    ```bash
    git push origin main
    ```

*Your changes will be live on [hexdef.com](https://hexdef.com/) in approximately 1 to 2 minutes.*
