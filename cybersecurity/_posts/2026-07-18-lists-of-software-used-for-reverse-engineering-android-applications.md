---
layout: single
title: "Lists of software used for reverse engineering Android applications"
tag: "Reverse Engineering"
---

Here are two comprehensive, structured lists of software used for reverse engineering Android applications (APKs), native libraries (`.so`), and device firmware. 

---

### List 1: Open-Source Software (OSS)

The open-source ecosystem is highly mature. These tools are free, public, and frequently updated by the security community.

#### A. Static Analysis & Decompilation
*   **JADX (and JADX-GUI):** The most popular tool for translating Android DEX files back into readable Java/Kotlin code. It features a robust search engine, call graph visualization, and deobfuscation helper options.
*   **Apktool:** The gold standard for disassembling APKs into Smali (Android's assembly language) and decoding Android resource files (such as layouts, strings, and the `AndroidManifest.xml`). It also allows you to rebuild the modified files back into an APK.
*   **Ghidra:** The NSA’s open-source Software Reverse Engineering (SRE) suite. It is highly capable at analyzing, disassembling, and decompiling native ARM/x86 Android libraries (`.so` files).
*   **Bytecode Viewer:** A comprehensive Java bytecode viewer and decompiler that integrates multiple decompilers (including Fernflower, CFR, and Procyon) under one interface.
*   **Androguard:** A Python-based framework used to interact with Android files. It allows developers to write custom scripts to parse resources, extract DEX bytecode, and analyze permissions.
*   **Radare2 / Cutter:** A highly powerful, command-line-driven reverse engineering framework (Radare2) and its official GUI (Cutter), excellent for low-level native code reversing.

#### B. Dynamic Analysis & Hooking
*   **Frida:** A world-class dynamic binary instrumentation toolkit. It injects a JavaScript engine into the running app's process space, allowing you to hook Java/Kotlin methods and native C functions on the fly.
*   **Objection:** A runtime mobile exploration toolkit built on top of Frida. It packages common tasks (like bypassing SSL pinning, dumping memory, and exploring the filesystem) into a user-friendly CLI.
*   **House / Medusa:** Advanced, scriptable dynamic analysis orchestration frameworks built on Frida, designed to monitor cryptography, file modifications, and network requests at runtime.
*   **FRIDA-DEXDump:** A memory scanner script that searches a running app's RAM for the characteristic DEX magic headers and dumps the raw, decrypted DEX files to your host machine.
*   **DexDumper / BlackDex:** Tools designed to dump decrypted DEX files from memory in environments where root access may not be available or when bypassing basic packers.
*   **FART / Youpk:** Specialized, open-source custom Android ROM projects that run modified Android Runtimes (ART). They hook deep OS-level class loaders to dump the code the exact millisecond a class is loaded.

#### C. Automated Vulnerability Scanning & Symbolic Execution
*   **MobSF (Mobile Security Framework):** An automated, all-in-one static and dynamic analysis tool. It automatically identifies hardcoded credentials, weak permissions, and common vulnerabilities in an uploaded APK.
*   **Quark-Engine:** An open-source Android malware analysis engine that allows threat researchers to write behavioral rules (e.g., "reads SMS and sends it to the internet") to automatically flag malicious intent.
*   **APKiD:** A tool that analyzes compiled APKs to identify the specific compilers, obfuscators, packers, and protectors used to build them.
*   **angr / Miasm / Triton:** Advanced open-source symbolic execution and binary analysis frameworks. Reverse engineers use these to write custom deobfuscators (such as removing Control Flow Flattening) by mathematically resolving executed code paths.

#### D. Network Interception
*   **mitmproxy:** A highly customizable, open-source command-line SSL/TLS interception proxy used to view, modify, replay web/API traffic from Android devices.
*   **OWASP ZAP (ZAP):** A web application security scanner and proxy that is fully open-source and frequently used to audit mobile application API endpoints.

---

### List 2: Professional / Commercial / Proprietary Software

These are paid, commercial tools used by professional security firms, enterprise red teams, and government intelligence agencies. They often offer superior technical support, enterprise collaboration features, and highly advanced deobfuscation.

#### A. Enterprise Decompilers & SRE Suites
*   **JEB Decompiler (by PNF Software):** The industry-standard commercial decompiler for Android. While JADX is excellent for clean code, JEB excels at recovering heavily obfuscated, packed, or protected DEX and Smali code. It also decompiles native ARM code and allows for interactive debugging of active processes.
*   **IDA Pro (by Hex-Rays):** The premier professional disassembler and decompiler used globally. While expensive, its native ARM decompiler is considered the benchmark for analyzing complex native `.so` files, identifying malware encryption routines, and debugging live native code.
*   **Binary Ninja (by Vector 35):** A modern, highly capable commercial alternative to IDA Pro. It uses a clean Intermediate Representation (IL) architecture, making it exceptionally good for scripting automated native code analysis and deobfuscation.

#### B. Advanced Virtualization & Emulation Platforms
*   **Corellium:** A cloud-based and on-premise hardware-level virtualization platform. It allows reverse engineers to run high-fidelity, virtualized Android devices on real ARM hardware in the cloud. It is heavily utilized by nation-state actors and advanced enterprise researchers to inspect kernel behavior, extract system memories, and debug root-level system processes.
*   **Genymotion Enterprise:** A fast, highly configurable Android virtualization tool. The enterprise edition integrates with cloud environments (AWS, GCP) and continuous integration (CI) pipelines, allowing automated dynamic security audits at scale.

#### C. Enterprise Mobile Application Security Testing (MAST)
*   **NowSecure:** A leading commercial platform that automates mobile app security testing. It runs static, dynamic, and interactive analysis against Android and iOS apps, mapping findings directly to compliance standards (like OWASP MASVS).
*   **Oversecured:** A specialized commercial static analysis (SAST) platform that focuses on identifying complex, high-severity vulnerabilities (such as Intent Redirection, path traversal, and content provider leaks) with highly accurate, low-false-positive scanning engines.
*   **App-Ray:** A commercial scanner designed to analyze APKs before they are published, scanning for data leaks, privacy violations, and malicious behaviors.

#### D. Network Interception (Enterprise)
*   **Burp Suite Professional (by PortSwigger):** The standard tool for web and API penetration testing. While a free "Community" edition exists, the paid "Professional" edition is heavily used by mobile auditors to automatically scan APIs, run custom active intrusion payloads, and map data flows.
*   **Charles Proxy:** A commercial HTTP proxy and reverse proxy monitor. It is popular among developers and testers for its clean, easy-to-use interface when inspecting encrypted HTTPS mobile traffic.

#### E. Malware Analysis Sandboxes
*   **Joe Sandbox (Ultimate/Cloud):** A paid, fully automated malware analysis sandbox. It runs uploaded Android APKs in a heavily instrumented, real-device or emulator environment to automatically generate behavioral threat reports.
*   **VirusTotal Enterprise:** Used by threat intelligence analysts to search massive databases of scanned Android malware samples, trace historical metadata, and pivot on specific binary signatures.
