---
title: "Offensive Security: The Red Team Index"
date: "2026.07.19"
tags: ["STUDY", "RED TEAM"]
summary: "A comprehensive categorization of red team attack vectors, exploitation methods, infrastructure, evasion techniques, and operational methodologies."
---

## 1. Web Application & API Security
*   **Advanced Injection** — Passing command variables to web inputs (SQLi, NoSQLi, OS Command, LDAP) to manipulate backend query outcomes.
*   **Cross-Site Scripting (XSS)** — Injecting malicious scripts (Reflected, Stored, DOM-based) to hijack client-side browser sessions.
*   **Cross-Site Request Forgery (CSRF)** — Forcing an authenticated browser to execute unauthorized, state-changing commands on a trusted app.
*   **Server-Side Request Forgery (SSRF)** — Abusing server logic to coerce the hosting application into querying internal-only network resources.
*   **Broken Authentication & Session Management** — Exploiting flaws in session handling (fixation, hijacking) to bypass login portals.
*   **IDOR / BOLA** — Bypassing authorization checks to access or modify records of other users via direct database object parameters.
*   **XML External Entity (XXE) Processing** — Submitting malicious XML inputs to read local system files or perform SSRF port scans.
*   **Insecure Deserialization** — Passing modified objects to an application's deserializer to achieve Remote Code Execution (RCE).
*   **Path / Directory Traversal** — Navigating outside the designated web-root directory to expose protected local operating system files.
*   **Mobile App Decompiling & Reversing** — Unpacking system packages (JADX, Apktool, Ghidra, Hopper) to examine proprietary logic and keys.
*   **Mobile Manifest & Configuration Analysis** — Inspecting platform-specific config files (`AndroidManifest.xml` / `Info.plist`) for leaks.
*   **Runtime Hooking (Frida & Objection)** — Overriding compiled mobile code execution in real-time to alter system variables and flow [1].
*   **Mobile Security Control Bypasses** — Bypassing standard device checks including SSL Pinning, root/jailbreak checks, and emulators [1].
*   **Mobile IPC & Local Storage Exploitation** — Extracting insecurely cached local databases or hijacking internal communication lines.

## 2. Network Layer & Infrastructure Security
*   **Spoofing & Poisoning** — Poisoning local resolving protocols (ARP, DNS, IP, LLMNR/NBT-NS/mDNS) to redirect client traffic.
*   **On-Path / Man-in-the-Middle (MitM)** — Placing intermediate interceptors in the transit line to execute SSL/TLS stripping and session hijacking.
*   **Layer 2 Vulnerabilities** — Manipulating localized network switch logic (VLAN hopping, MAC flooding, and DHCP starvation).
*   **Routing & Gateway Attacks** — Altering routing protocols (BGP hijacking, route poisoning) and compromising boundary appliances.
*   **Denial of Service (DoS / DDoS)** — Disrupting target asset availability using volumetric traffic, protocol exploits, or app-layer exhaustion.
*   **Perimeter Appliance Exploitation** — Pointing exploits at external-facing boundary appliances such as legacy VPNs, firewalls, and routers.

## 3. Host, OS, & Memory-Level Security
*   **Memory Corruption** — Exploiting low-level software vulnerabilities (stack/heap buffer overflows, use-after-free, integer overflows).
*   **OS Mitigations Bypass** — Overcoming operating system protections (ASLR, DEP/NX, stack canaries) to execute functional exploits.
*   **Debugger-Based Binary Analysis** — Examining raw instruction execution and control flow inside runtime debuggers (x64dbg, GDB).
*   **Local Privilege Escalation** — Elevating standard user access on local hosts via token manipulation, service DACL abuse, or kernel exploits.
*   **Living off the Land (LotL)** — Running system commands using built-in, trusted administrative utilities (PowerShell, WMI, bash).
*   **Fileless Malware** — Executing adversarial routines and scripts entirely in dynamic system memory to avoid writing files to disk.

## 4. Identity, Authentication, & Cryptography
*   **Credential Attacks** — Harvesting and guessing authentication portals using systematic brute force, credential stuffing, or password spraying.
*   **Active Directory Core Exploitation** — Extracting and forging authentication tickets (Kerberoasting, AS-REP roasting, Golden/Silver Tickets).
*   **Active Directory Trusts & Certificate Abuse** — Escalating privileges via ADCS templates (ESC1-13), delegation (RBCD), or Shadow Credentials.
*   **Active Directory Policy & Control Manipulation** — Tweaking GPOs, manipulating security ACLs/ACEs, and crossing forest trust limits.
*   **Lateral Movement** — Navigating between internal domain endpoints via Pass-the-Hash (PtH), Pass-the-Ticket (PtT), or Overpass-the-Hash.
*   **Cryptographic Downgrade Attacks** — Forcing transport or protocol handshakes to select legacy, cryptographically broken standards.
*   **Cryptographic Weaknesses** — Target analysis of flawed protocol logic, hash pattern collisions, or weak Pseudo-Random Number Generators.

## 5. Supply Chain, Cloud, & DevOps Security
*   **Cloud Privilege Escalation** — Exploiting overly permissive IAM policies or querying accessible virtual metadata endpoints (IMDSv2).
*   **Cloud Misconfigurations** — Discovering publicly exposed cloud infrastructure storage (S3 buckets, Azure blobs) or Entra ID tenants.
*   **Container Breakouts** — Escaping isolated container configurations (Docker, LXC) to access the underlying host OS kernel.
*   **Kubernetes Cluster Compromise** — Attacking vulnerable control planes, exposing service tokens, or exploiting misconfigured API servers.
*   **Dependency Confusion & Typosquatting** — Registering matching public packages to trick build pipelines into downloading malicious dependencies.
*   **Compromised Update Mechanisms** — Injecting malicious payloads directly into legitimate software updates distributed downstream.

## 6. Hardware & Physical Security
*   **Physical Red Teaming** — Bypassing physical lock assemblies via manual picking, shimming, bypassing, and under-door tool operations.
*   **RFID & Badge Cloning** — Reading, copy-cloning, and replaying physical building access badge signals (Proxmark3, Flipper Zero).
*   **Rogue Devices** — Deploying unauthorized hardware modules (malicious access points, hardware keyloggers) to bridge physical and digital networks.
*   **Evil Maid Attacks** — Physical tampering of unattended corporate endpoints to implant software backdoors or physical keyloggers.
*   **Side-Channel Attacks** — Recording hardware execution traits (cache timing patterns, power consumption) to extract cryptographic keys.
*   **Firmware/Microcode Exploits** — Achieving system boot-level persistence using specialized implants (UEFI/BIOS rootkits).

## 7. Human Element (Social Engineering)
*   **Phishing & Multi-Channel Engineering** — Tricking users into surrendering credentials (via Spear-phishing, Whaling, Vishing, and Smishing).
*   **Baiting Campaigns** — Leaving compromised physical delivery hardware (such as Rubber Ducky or O.MG cables) in public areas to be found.
*   **Tailgating & Piggybacking** — Following authorized staff past building entry checkpoints to bypass physical access controls.

## 8. Red Team Infrastructure, Evasion, & Methodology
*   **Advanced OSINT Automation** — Gathering raw intelligence at scale from public datasets and target search platforms (Shodan, Censys, Maltego).
*   **Credential Leak Parsing** — Analyzing and sorting publicly leaked credentials to locate target account passwords without active scanning.
*   **Red Team Infrastructure Design** — Building scalable multi-tiered delivery configurations using IaC/automation tools (Terraform, Ansible).
*   **C2 Customization & Malleable Profiles** — Customizing traffic beacons to mimic legitimate network traffic signatures (such as normal HTTP or DoH requests).
*   **Covert Communications** — Tunneling egress traffic through trusted third-party cloud services (Domain Fronting, CDNs, Slack/Graph APIs).
*   **Smart Traffic Filtering** — Utilizing smart reverse proxy rules to filter and redirect defensive incident response scanners to dummy sites.
*   **Custom Loader Development** — Compiling custom execution frameworks (C, C++, Rust, Go) utilizing string encryption to hinder detection.
*   **AMSI & ETW Bypasses** — Patching local monitoring interfaces and event tracing providers in memory to blind host defenders [2].
*   **User-Mode API Hooking Evasion** — Circumventing EDR runtime hooks inside memory by executing commands via direct or indirect syscalls.
*   **Process Injection** — Injecting malicious execution payloads into legitimate, running host system threads (Reflective DLL, Process Hollowing).
*   **OT/ICS Protocol Manipulation** — Crossing Purdue model layers and manipulating legacy operational networks (Modbus, Siemens S7, DNP3, PLCs).
*   **AI Red Teaming** — Attacking integrated machine learning models (Prompt Injection, insecure output handling, data poisoning, model weight extraction).
*   **Adversary Emulation & CTI** — Consuming Threat Intel reports to model attack campaigns using automation frameworks (Caldera, Prelude).
*   **OPSEC & Data Staging** — Securely consolidating, compressing, and encrypting corporate staging targets prior to egress.
*   **Covert Exfiltration Channels** — Smuggling target files out of networks via DNS tunnels, ICMP packets, or trusted cloud SaaS platform uploads.
*   **Report Writing & Executive Summaries** — Translating findings into risk metrics (CVSS, DREAD, FAIR) and executive risk business impact.
*   **Purple Teaming** — Conducting structured walk-throughs of attack steps alongside the blue team to cross-verify detection visibility.
*   **Detection Engineering** — Engineering custom rulesets (YARA, Snort, Sigma) to detect indicators of compromise identified during tests.
