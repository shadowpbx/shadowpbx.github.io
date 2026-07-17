---
title: "Comprehensive Cybersecurity Attack Vector Taxonomy"
date: "2026.07.17"
tags: ["STUDY", "RED TEAM"]
summary: "A 15-module training syllabus designed to take an operator progressively from passive reconnaissance up to low-level EDR bypasses and specialized AI/ICS targeting."
---



# Comprehensive Cybersecurity Attack Vector Taxonomy

## Phase 1: Operational Foundations & Entry Points (Easy)
*Focuses on non-intrusive operations, standard toolsets, human factors, and physical security. These concepts have lower entry barriers and rely heavily on pre-built tooling.*

### Module 1: Reconnaissance, OSINT, & Information Gathering
*   **Operational Focus:** Passive data collection without touching target defenses.
*   **Core Concepts:**
    *   Advanced OSINT automation (Shodan, Censys, Maltego).
    *   Parsing public credential leaks and automated metadata harvesting.
    *   Mapping corporate cloud footprints (identifying S3 buckets, Azure blobs, Entra ID tenants).
*   **Lab Scenario:** Target profiling and passive network mapping of a simulated corporation using only public datasets.

### Module 2: Physical Red Teaming & Social Engineering
*   **Operational Focus:** Bypassing physical and human boundaries using social mechanics and standard hardware.
*   **Core Concepts:**
    *   Lockpicking, shimming, lock bypassing, and under-door tool deployments.
    *   RFID/Badge Cloning (using Proxmark3 and Flipper Zero devices).
    *   Tailgating and physical site evasion.
    *   Phishing infrastructure setup, smishing (SMS), and vishing (voice).
    *   USB drop campaigns (using Rubber Ducky or O.MG cables).
*   **Lab Scenario:** Executing a multi-channel social engineering campaign to harvest credentials using an Adversary-in-the-Middle (AiTM) proxy (e.g., Evilginx).

### Module 3: Network Layer & Infrastructure Attacks
*   **Operational Focus:** Exploiting classic local network trust and misconfigured protocols using established toolsets.
*   **Core Concepts:**
    *   Spoofing & Poisoning: ARP cache poisoning, DNS spoofing, LLMNR/NBT-NS/mDNS poisoning (using Responder).
    *   Layer 2 Vulnerabilities: VLAN hopping (double tagging), MAC flooding, and DHCP starvation.
    *   On-Path / Man-in-the-Middle (MitM) attacks, SSL/TLS stripping, and session hijacking.
    *   Exploiting perimeter appliances (legacy VPNs, firewalls, and routers).
*   **Lab Scenario:** Hijacking network authentication over a local segment to capture NetNTLMv2 hashes.

---

## Phase 2: Platform & Application Exploitation (Medium)
*Requires an understanding of code logic, application flow, and system architecture. This phase focuses on standard penetration testing targets.*

### Module 4: Web Application & API Penetration Testing
*   **Operational Focus:** Exploiting standard logical and code-level flaws in web assets to gain remote execution.
*   **Core Concepts:**
    *   Advanced Injection: SQL Injection (SQLi), NoSQL Injection (NoSQLi), OS Command Injection, and LDAP Injection.
    *   Server-Side Request Forgery (SSRF) and Cross-Site Request Forgery (CSRF).
    *   XML External Entity (XXE) processing for local file disclosure and SSRF.
    *   Broken Authentication & Session Management (fixation, hijacking).
    *   Insecure Direct Object References (IDOR) / Broken Object Level Authorization (BOLA).
    *   Insecure Deserialization (Java, .NET, PHP) to achieve Remote Code Execution (RCE).
*   **Lab Scenario:** Discovering a blind SSRF on a target API and leveraging it to access internal metadata services.

### Module 5: Host-Level Auditing & Local Privilege Escalation
*   **Operational Focus:** Navigating individual operating systems and elevating privileges post-compromise.
*   **Core Concepts:**
    *   **Windows PrivEsc:** Token manipulation, abusing service permissions, token hijacking, and UAC bypasses.
    *   **Linux/macOS PrivEsc:** Abusing SUID binaries, misconfigured sudoers, and macOS Transparency, Consent, and Control (TCC) bypasses.
    *   Living off the Land (LotL): Command execution and automation utilizing native tools like PowerShell, WMI, bash, and native scripting engines.
*   **Lab Scenario:** Escalating from a low-privileged shell on a hardened Windows host by finding and exploiting misconfigured service DACLs.

### Module 6: Mobile Application Security (Android & iOS)
*   **Operational Focus:** Auditing compiled client-side applications to find API flaws and extract secrets.
*   **Core Concepts:**
    *   Decompiling and reversing Android applications (JADX, Apktool) and iOS applications (Ghidra, Hopper).
    *   Analyzing the `AndroidManifest.xml` (Android) and `Info.plist` (iOS) for misconfigured permissions.
    *   Injecting runtime hooks using Frida and Objection [1].
    *   Bypassing client-side security controls: SSL Pinning, Root/Jailbreak detection, and emulator check bypasses [1].
    *   Exploiting Inter-Process Communication (IPC) and insecure local data storage.
*   **Lab Scenario:** Decompiling an Android APK, injecting a Frida script to bypass certificate pinning, and intercepting backend API traffic [1].

---

## Phase 3: Enterprise & Architecture Scale Attacks (Medium-Hard)
*Moves beyond single endpoints to targeting complex enterprise authentication structures and modern cloud/pipeline architectures.*

### Module 7: Enterprise Active Directory & Identity Red Teaming
*   **Operational Focus:** Navigating and compromising corporate domain environments.
*   **Core Concepts:**
    *   Active Directory (AD) Core Exploitation: Kerberoasting, AS-REP roasting, Golden/Silver Tickets.
    *   Lateral Movement: Pass-the-Hash (PtH), Pass-the-Ticket (PtT), and Overpass-the-Hash.
    *   Advanced AD Trusts & Configurations: Active Directory Certificate Services (ADCS) abuse (ESC1 through ESC13), Resource-Based Constrained Delegation (RBCD), and Shadow Credentials.
    *   Group Policy Object (GPO) abuse, ACL/ACE manipulation, and domain-trust hopping.
*   **Lab Scenario:** Compiling BloodHound data to identify a path to Domain Admin via ADCS configuration abuse.

### Module 8: Cloud Platforms, Containers, & DevOps (CI/CD) Security
*   **Operational Focus:** Exploiting virtualized cloud infrastructure and modern automated build pipelines.
*   **Core Concepts:**
    *   Cloud Privilege Escalation: Exploiting overly permissive IAM roles and metadata services (IMDSv2).
    *   Container Breakouts: Escaping Docker/LXC isolation to access the host OS (via privileged containers or dirty sockets).
    *   Kubernetes (K8s) cluster compromise: Abusing API Server configurations and token exposure.
    *   CI/CD Pipeline Exploitation: Dependency Confusion / Typosquatting in public registries, compromising GitHub/GitLab runners, and stealing secrets (Vault, AWS keys).
*   **Lab Scenario:** Compromising a CI/CD runner to steal AWS IAM credentials, followed by performing an IAM privilege escalation.

---

## Phase 4: Evasion, Custom Engineering & Specialized Targets (Hard-Elite)
*The most technically demanding phase. Requires custom programming, low-level memory analysis, advanced security bypasses, and specialized target environments.*

### Module 9: Red Team Infrastructure Design & Command & Control (C2)
*   **Operational Focus:** Designing automated, resilient, and non-attributable infrastructure for stealthy persistence.
*   **Core Concepts:**
    *   Multi-tiered C2 redirection (front-line, mid-tier, and backend C2) utilizing Terraform and Ansible.
    *   Malleable C2 profile customization (HTTP/S profiles, DNS-over-HTTPS).
    *   Covert Communications: Domain Fronting, CDN routing, and abusing trusted SaaS APIs (Microsoft Graph, Slack).
    *   Smart Traffic Filtering: Setting up redirectors using Apache/Nginx rewrite rules or Keitaro to filter out sandboxes and defenders.
*   **Lab Scenario:** Deploying an automated C2 infrastructure on AWS/GCP with smart redirectors that redirect defensive security scanners to a benign dummy site.

### Module 10: Low-Level Memory Corruption & Reverse Engineering
*   **Operational Focus:** Explaining and exploiting low-level memory vulnerabilities.
*   **Core Concepts:**
    *   Analyzing stack and heap-based buffer overflows, use-after-free (UAF), and integer overflows.
    *   Bypassing operating system mitigations: ASLR, DEP/NX, and stack canaries.
    *   Analyzing binary control flows and structures in a debugger (x64dbg, GDB).
*   **Lab Scenario:** Writing a custom exploit payload to bypass ASLR and DEP on a vulnerable x64 network service.

### Module 11: Evasion Techniques & Custom Payload Development
*   **Operational Focus:** Engineering payloads specifically designed to bypass modern EDR and AV solutions.
*   **Core Concepts:**
    *   Writing custom loaders in C, C++, Rust, or Go with customized string encryption (XOR, AES) and entropy reduction.
    *   Bypassing AMSI (Antimalware Scan Interface) and ETW (Event Tracing for Windows) [2].
    *   Evading user-mode API hooking: Dynamic loading, manual syscall resolution, and Direct/Indirect System Calls (Syscalls).
    *   Process Injection: Reflective DLL Injection, Process Hollowing, and Thread Execution Hijacking.
*   **Lab Scenario:** Writing a custom Go-based loader that utilizes indirect syscalls and process hollowing to execute shellcode without triggering user-mode EDR hooks.

### Module 12: Specialized Environments: OT/ICS & AI Red Teaming
*   **Operational Focus:** Targeting complex cyber-physical environments and modern integrated machine learning pipelines.
*   **Core Concepts:**
    *   **OT/ICS:** Bypassing IT-to-OT boundaries (Purdue Model), manipulating legacy industrial protocols (Modbus, Siemens S7, DNP3), and engineering workstation compromise.
    *   **AI Red Teaming:** Direct/Indirect Prompt Injection, exploiting insecure output handling, training data poisoning, and model weight extraction.
*   **Lab Scenario (Dual-Option):**
    *   *Option A:* Accessing an OT network segment and issuing safe commands to read PLC register states on a simulated industrial water pump.
    *   *Option B:* Crafting an indirect prompt injection payload hosted on a web page to force an AI-driven support agent to exfiltrate private user records.


## Phase 5: The Professional Lifecycle & Operational Conclusion (The Final 10-15%)
*Focuses on mimicking real-world threat actors, maintaining operational security throughout a campaign, and translating technical compromise into business value and defensive improvements.*

### Module 13: Threat Intelligence & Adversary Emulation
*   **Operational Focus:** Transitioning from "hacking everything" to accurately mimicking the specific capabilities and behaviors of known threat actors (APTs, Ransomware Operators).
*   **Core Concepts:**
    *   Consuming Cyber Threat Intelligence (CTI) and translating reports into actionable operations.
    *   Deep dive into the **MITRE ATT&CK** framework: Mapping campaigns to Tactics, Techniques, and Procedures (TTPs).
    *   Developing Threat Emulation Plans: Scoping an engagement to mimic a specific actor (e.g., emulating the toolsets and cadence of APT29 or FIN7).
    *   Assumed Breach vs. Full Kill-Chain simulations.
*   **Lab Scenario:** Analyze a published CTI report on a recent ransomware group, extract their specific TTPs, and build an automated emulation plan (using tools like Caldera or Prelude) to execute that exact attack path in a lab environment.

### Module 14: Operational Security (OPSEC) & Data Exfiltration
*   **Operational Focus:** Avoiding attribution, protecting red team infrastructure, and successfully extracting the "crown jewels" without triggering Data Loss Prevention (DLP) or Network Detection (NDR) systems.
*   **Core Concepts:**
    *   **OPSEC Fundamentals:** Compartmentalization of infrastructure, avoiding cross-contamination of payloads, and managing operator telemetry.
    *   **Data Staging:** Identifying critical data, compressing, archiving, and encrypting data locally before movement.
    *   **Advanced Exfiltration Channels:** Exfiltrating via DNS queries, ICMP tunnels, or blending in with trusted SaaS traffic (e.g., uploading to a compromised OneDrive, AWS S3 bucket, or GitHub repo).
    *   **Trickle Exfiltration:** Bypassing bandwidth monitoring by chunking data and sending it over an extended period.
*   **Lab Scenario:** Stage and encrypt a simulated database on a compromised host, then exfiltrate it over a custom DNS tunnel, ensuring the traffic volume stays below the alerting threshold of a simulated SIEM/NDR.

### Module 15: Reporting, Executive Debriefing, & Purple Teaming
*   **Operational Focus:** The most critical module—translating technical dominance into measurable risk reduction for the business. 
*   **Core Concepts:**
    *   **Report Writing:** Crafting an Executive Summary (business impact, bottom-line risk) versus a Technical Narrative (step-by-step reproduction, IOCs).
    *   **Risk Frameworks:** Calculating and translating risk using frameworks like CVSS, DREAD, or FAIR.
    *   **Purple Teaming:** Transitioning from an adversarial stance to a collaborative one. Sitting with the Blue Team to replay attacks step-by-step.
    *   **Detection Engineering:** Assisting defenders in writing custom YARA, Snort, or Sigma rules to detect the very attacks you just executed.
*   **Lab Scenario:** Execute a targeted attack path (e.g., Kerberoasting), then switch to a Blue Team role to review the simulated SIEM logs (Splunk/Elastic). Finally, write a custom Sigma rule to catch the attack and draft a 2-page executive summary detailing the business risk.

***
