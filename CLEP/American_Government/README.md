# CLEP Lecture Audio Player & Playlist Compiler

A premium, mobile-responsive, dark-themed HTML5 audio player designed for studying CLEP lecture courses on the go. It supports lock-screen media controls, custom loop counts, speed adjustments, and auto-resumes playback precisely where you left off. 

This repository houses the player interface and a helper playlist compiler designed to cleanly split audio storage (hosted externally on Cloudflare R2 / S3) from the player code (hosted on GitHub Pages).

---

## 🌟 Key Features

* 📱 **Mobile-First Responsive Design**: Beautiful glassmorphic dark-mode interface powered by Outfit Typography and Material Round Icons.
* ☁️ **Cloudflare R2/S3 Ready**: Keep your repository lightweight! Host audio files in a public Cloudflare R2 bucket and configure the player to stream them directly.
* 🔁 **Custom Track Looping**: Set the player to repeat each lecture track multiple times (e.g., repeat 3 times) before automatically transitioning to the next track—ideal for reinforcement learning.
* ⚡ **Playback Speed Control**: Speed up or slow down lectures between `0.75x` and `2.0x` speeds.
* 💾 **Smart Auto-Resume**: The player automatically persists your track index, loop iterations, playback speed, timeline position, and base URL in your browser's local storage. If you refresh or reopen the page, it resumes exactly where you left off.
* 🔒 **Lock Screen Control Integration**: Fully utilizes the HTML5 browser **Media Session API** so you can play, pause, seek, and skip tracks directly from your phone's lock screen or notification panel.
* 🔍 **Lecture Title Search**: Instantly filter through your lectures list using the interactive search bar.
* 📝 **Dynamic Metadata Integration**: Instantly changes the course Title and Subtitle dynamically on the page by parsing metadata.

---

## 📂 File Architecture

* **`index.html`**: The core player application. 100% self-contained client-side code (HTML, CSS, JS).
* **`generate_playlist.py`**: A python script that scans your audio files (either locally or on a remote bucket) and writes the catalog files.
* **`about.txt`**: A metadata text file containing the course Title and Subtitle. Used by the Python generator to dynamically brand the player.
* **`playlist.json` & `playlist.js`**: Automatically compiled playlist catalogs containing the track order and Cloudflare R2 base URL configuration.

---

## 🚀 Setup & Usage Guide

### 1. Upload Your Audio Files to Cloudflare R2
1. Log into your Cloudflare account and create an **R2 Bucket**.
2. Upload your `.mp3` files to the bucket.
3. Enable public access (either via a custom domain like `https://audio.example.com/` or Cloudflare's free `pub-<hash>.r2.dev` bucket URL).

### 2. Configure Course Metadata
Edit the `about.txt` file in your root folder:
```txt
Title: American Government
Sub Title: CLEP Examination Prep Audio
```

### 3. Generate the Playlists
The Python playlist compiler detects your audio files and creates catalog files for the player.

* Ensure you have `click` installed:
  ```bash
  pip install click
  ```
* Run the script and specify your custom Cloudflare R2 folder URL as the source:
  ```bash
  python3 generate_playlist.py -d "https://audio.example.com/american-government/"
  ```
The generator automatically parses your folder structure (or falls back to scanning your local MP3 filenames if remote directory listing is disabled) and writes out both `playlist.json` and `playlist.js` with your embedded R2 URL.

### 4. Deploy the Player on GitHub Pages
1. Push `index.html`, `about.txt`, `generate_playlist.py`, `playlist.js`, and `playlist.json` to your GitHub repository.
2. In your repository settings under **Pages**, enable GitHub Pages to build from your main branch.
3. Your audio player will immediately go live!

---

## 🛠 Local & Offline Development
This project is built to support offline learning:
* Open `index.html` directly in your browser (`file:///` protocol).
* Even if the browser's security sandbox blocks dynamic JSON fetching locally, the player automatically falls back to reading track mappings and R2 base URLs from the script-loaded `playlist.js`.

---

*Designed for seamless studying on the go.*
