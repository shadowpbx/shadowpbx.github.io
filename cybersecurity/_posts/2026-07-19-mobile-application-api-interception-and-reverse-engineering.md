---
layout: single
title: "Mobile Application API Interception and Reverse Engineering: A Step-by-Step Case Study"
tag: "Mobile Security"
---

In modern mobile application security auditing, understanding client-server communication is critical [1]. While developers secure application traffic using encryption protocols like HTTPS, security researchers and analysts must often reverse-engineer these endpoints to verify backend validation, check for vulnerabilities, and inspect data transmission [2]. 

This article documents the practical, step-by-step methodology used to analyze a production Android application, transitioning from raw packet capture to full application-layer API decryption and static analysis.


## Phase 1: Environment Setup and the Rooting Constraint

The analysis began with a standard Android Virtual Device (AVD). However, attempting to intercept traffic on a default emulator image presents a major technical challenge:

* **The Security Barrier:** Since Android 7.0 (API 24), the operating system no longer trusts user-installed Certificate Authorities (CAs) by default for secure application connections. 
* **The Production Restriction:** Standard emulators containing the Google Play Store are production builds. For security reasons, these builds permanently disable root access (`adb root` is blocked), making it impossible to inject certificates into the trusted system directory.

To proceed, the application's split APK files were pulled from the standard emulator to the local Linux host so they could be reinstalled on a developer-friendly testing environment.

---

## Phase 2: Preparing a Writable Developer Environment

To bypass the production environment restrictions, a new emulator image was configured in Android Studio:

1. **Creating a Google APIs Image:** A new AVD was created using a **Google APIs** system image instead of a Google Play image, allowing debug capabilities.
2. **Launching with Write Permissions:** The emulator was started from the Linux terminal with a writable system partition:
   ```bash
   /home/shad/Android/Sdk/emulator/emulator -avd Your_Google_APIs_AVD -writable-system
   ```
3. **Elevating Privileges and Remounting:** To write files to the system root, Android's integrity verification (`dm-verity`) was disabled, and the partitions were remounted as read-write:
   ```bash
   adb root
   adb remount
   adb reboot
   ```
   After the reboot, running `adb root` and `adb remount` successfully unlocked the `/system/etc/security/cacerts/` directory.

---

## Phase 3: Dynamic Interception & HTTPS Decryption

With a writable, rooted emulator active, an interception tool was introduced to act as a Man-in-the-Middle (MitM) proxy [2].

1. **Automating Certificate Injection with HTTP Toolkit:** HTTP Toolkit was launched on the Linux host. Using the **"Android Device via ADB"** feature, the tool detected the root access and writable partition [1]. It automatically injected its custom decryption CA directly into the emulator’s system certificate store [1].
2. **Installing the Target App Splits:** The original split APKs of the grocery application (Chaldal) were pushed to the emulator together to prevent resource mismatches or splash-screen crashes:
   ```bash
   adb install-multiple *.apk
   ```
3. **Observing Live API Streams:** Upon launching the app, the proxy successfully decrypted the TLS connection. Real-time traffic analysis revealed:
   * **Structured JSON Endpoints:** Secure POST requests, such as `https://catalog.chaldal.com/searchPersonalized`, transmitting search queries, API keys, and device identifiers.
   * **Real-time WebSockets:** A live bidirectional WebSocket connection (`wss://groceryintegration-api.chaldal.com/api/v1/realTime`) used to sync inventory and cart updates without page refreshes.

---

## Phase 4: Raw Packet Analysis

To study the network mechanics beneath the application layer, Wireshark was deployed on the Linux host. 

1. **Resolving GUI Performance Freezes:** Initially, capturing on the host's `any` interface flooded the Wireshark GUI with background system traffic, causing the application to stop responding. This was resolved by:
   * Disabling network name resolution in Wireshark preferences.
   * Utilizing a strict **Capture Filter** rather than a Display Filter to discard noise at the kernel level:
     ```text
     net 103.185.176.0/23
     ```
2. **Infrastructure Identification:** A WHOIS lookup on the captured destination IP range (`103.185.176.0/23`) confirmed the servers belonged directly to the application's infrastructure.
3. **Analyzing the Transport Layer:** Wireshark displayed the initial unencrypted TLS Client Hello handshakes, revealing Server Name Indication (SNI) details before the subsequent transmission of encrypted Application Data packets.

---

## Phase 5: Static Analysis and Secret Extraction

In addition to dynamic traffic analysis, static analysis was performed directly on the application's binaries to inspect the code structure and extract embedded assets.

1. **Code Decompilation (Jadx-GUI):** Jadx-GUI was used to decompile the Dalvik Executable (DEX) files back into readable Java and Kotlin code. This allowed for the inspection of the application’s core classes, including network request formatting and tracking headers.
2. **Automated Security Auditing (MobSF):** Mobile Security Framework (MobSF) was run to perform static analysis. It scanned the codebase for common security misconfigurations, insecure permissions, and hardcoded secrets.
3. **Certificate and Key Extraction:** 
   To locate cryptographic keys and certificates embedded within the assets, a specialized scanning utility was run. While several tools perform this function, typical choices in this workflow include:
   * **APKleaks:** A tool designed to scan decompiled APKs for URIs, endpoints, and hardcoded API keys.
   * **Keytool:** Used to inspect the application's signing certificates within the `META-INF` directory.
   * **MobSF's Static Analyzer:** Which automatically parses and displays certificates, hardcoded keys, and sensitive string variables found inside the unpacked archive.

---

## Phase 6: Replicating the API and Automation

Once the dynamic payloads were understood, the application's dependency on the Android UI was bypassed entirely.

1. **Replicating the Request:** Using the headers and JSON payload captured during interception, a `curl` command was executed from the Linux terminal to query the search API directly.
2. **Automating Queries:** A Python script utilizing the `requests` library was written to programmatically search the catalog and output real-time inventory and pricing data directly to the command line, completing the cycle of API reverse-engineering.

---

This thread covered a diverse set of tools, ranging from professional security proxies to command-line network utilities and Android developer tools.

The following is a comprehensive, categorized list of every tool used, discussed, or referenced in our workflow:


### 1. Network & Proxy Interception Tools (The "Middlemen")
* **HTTP Toolkit:** The automated, open-source GUI desktop tool used to automatically inject certificates and intercept the Android emulator [2].
* **mitmproxy:** The lightweight, native Linux terminal-based SSL/TLS intercepting proxy.
* **mitmweb:** The browser-based web interface companion for `mitmproxy`.
* **Burp Suite (Community Edition):** The industry-standard Java-based graphical tool for professional web and API security auditing.

### 2. Reverse Engineering & APK Patching Tools
* **apk-mitm:** The open-source CLI utility used to automatically patch the split APKs to trust user certificates [3].
* **Apktool:** The classic command-line tool used to manually decompile and rebuild APK files.
* **Jadx / Jadx-GUI:** The popular decompiler used to convert Android Dalvik bytecode back into readable Java/Kotlin source code.
* **apksigner:** The Android SDK utility used to sign rebuilt APKs so they can be installed on Android devices.
* **zip / unzip:** Standard archive utilities used to package split APK files into `.apks` bundles and extract them.

### 3. Secret Extraction & Static Analysis Tools
* **Trufflehog:** The high-entropy scanner used to search through your unpacked APK files to automatically find hardcoded API keys, private keys, and secrets [1].
* **MobSF (Mobile Security Framework):** The automated static analysis tool used to find security misconfigurations, insecure permissions, and hardcoded variables.
* **APKleaks:** A tool designed to scan decompiled APKs specifically for URIs, endpoints, and developer secrets.
* **Keytool:** A JDK utility used to inspect and manage the application's signing certificates (usually found inside the `META-INF` directory).

### 4. Packet Sniffers & Network Diagnostics
* **Wireshark:** The standard GUI-based network packet analyzer used to capture live streams.
* **tcpdump:** The lightweight command-line packet sniffer native to Linux and Android.
* **tshark:** The headless, command-line version of Wireshark used to capture packets directly inside the Linux terminal.
* **netsim:** The modern network simulator backend built into the Android SDK (triggered via the `-netsim-args` flag) used to generate packet captures.

### 5. Android SDK & Device Utilities
* **Android Studio (Virtual Device Manager):** The IDE used to create and manage the virtual devices (`Pixel_10` and `Pixel_10_APIs`).
* **emulator:** The Android SDK CLI tool used to launch specific virtual devices from your Linux terminal.
* **adb (Android Debug Bridge):** The CLI tool used to communicate with the emulator, push files, grant root privileges, and install packages [4].
* **logcat:** The built-in Android logging tool used to view real-time system errors and app crash traces.
* **pm (Package Manager):** The Android shell utility used to list installed packages on the device.
* **dumpsys:** The Android diagnostic utility used to dump system service data (used to find the app's UID).

### 6. Linux Shell & System Commands
* **openssl:** Used to calculate the cryptographic hash of the proxy's CA certificate for system injection.
* **curl / wget:** Command-line tools used to transfer data from servers (manually executing the Chaldal search API, or downloading the HTTP Toolkit package).
* **jq:** The command-line JSON processor used to format and prettify the raw API responses.
* **python3 (requests library):** The programming language and library used to write a custom, lightweight script to query Chaldal's API.
* **setcap / getcap:** Linux utilities used to grant Wireshark's network capture engine (`dumpcap`) permission to capture raw sockets without root.
* **newgrp / groups:** Shell utilities used to refresh and verify your user's group privileges.
* **ss / netstat:** Sockets statistics utilities used to inspect active connections coming from specific app UIDs.
* **nano:** The terminal-based text editor used to modify your `~/.bashrc` file.
