---
title: "Custom NMAP Automated Port Scanner"
date: 2026-07-15
track: Tool
category: Cybersecurity
tag: NMAP
---

This custom automation tool is a wrapper around `nmap` written in Python. It automates network discovery scans, parses XML scan outputs, and formats them into clean markdown reports, notifying the security team of newly opened ports or outdated daemon banners.

## How it Works
1. Executes a fast TCP SYN scan against target ranges.
2. Runs service and OS detection on discovered open ports.
3. Automatically categorizes findings by vulnerability risk levels.

## Script Usage
```python
import subprocess
import xml.etree.ElementTree as ET

def run_nmap_scan(target):
    cmd = ["nmap", "-sS", "-sV", "-oX", "scan_output.xml", target]
    subprocess.run(cmd, check=True)
    print("Scan complete. Output saved to XML.")
```
