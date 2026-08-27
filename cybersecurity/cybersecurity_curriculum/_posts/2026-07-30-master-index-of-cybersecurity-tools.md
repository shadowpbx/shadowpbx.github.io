---
title: "Cybersecurity Tools"
date: "2026.07.30"
tags: ["STUDY", "TOOLS"]
summary: "A comprehensive master reference index covering tools for reconnaissance, web app security, network monitoring, SecOps/SIEM, DFIR, reverse engineering, Active Directory, wireless/hardware, cloud, and adversary emulation."
---

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-left: 4px solid #e11d48; padding: 1.25rem 1.5rem; border-radius: 0 8px 8px 0; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <p style="margin: 0; font-size: 1.05rem; line-height: 1.6; color: #334155; font-style: italic; font-weight: 500;">
        <strong>Purpose:</strong> A master reference index categorizing core security tools across the industry—spanning reconnaissance, web applications, network monitoring, SecOps/SIEM, DFIR, reverse engineering, Active Directory auditing, wireless & hardware, cloud & DevOps, and adversary emulation.
    </p>
</div>

---

## 1. Reconnaissance, Scanning, & Enumeration
*Tools used to map attack surfaces, find open ports, discover subdomains, and gather intelligence.*

*   **Nmap** — The industry-standard network mapper for port scanning, service detection, and OS fingerprinting.
*   **Masscan** — An extremely fast port scanner capable of scanning the entire public internet in minutes.
*   **Amass & Sublist3r** — Subdomain enumeration tools used to map an organization's external DNS footprint.
*   **Shodan & Censys** — Search engines for internet-connected devices (cameras, industrial controllers, exposed databases).
*   **Maltego & Recon-ng** — Open-Source Intelligence (OSINT) frameworks used to map relationships between people, domains, IP addresses, and social media.

---

## 2. Web Application & API Security
*Tools used to intercept, inspect, audit, and attack web applications and APIs.*

*   **Burp Suite** — The premier web application security testing proxy. Used to intercept, modify, and replay HTTP/S traffic.
*   **OWASP ZAP (Zed Attack Proxy)** — A free, open-source alternative to Burp Suite for web vulnerability scanning and interception.
*   **ffuf & Gobuster** — High-speed web fuzzers used to brute-force hidden directories, files, and API endpoints on web servers.
*   **SQLmap** — An automated tool that detects and exploits SQL Injection vulnerabilities in web applications.
*   **Postman & Insomnia** — API development tools heavily used by security teams to test REST, GraphQL, and SOAP API security.

---

## 3. Network Analysis, Monitoring, & IDS/IPS
*Tools used to inspect network traffic, detect intrusion attempts, and enforce network security.*

*   **Wireshark** — The gold-standard graphical packet analyzer for capturing and dissecting network protocols in real-time.
*   **tshark & tcpdump** — Command-line packet capture and analysis utilities (tshark is the CLI version of Wireshark).
*   **Zeek (formerly Bro)** — A powerful network security monitoring framework that translates raw packets into structured, searchable log data.
*   **Suricata & Snort** — Open-source Intrusion Detection (IDS) and Intrusion Prevention Systems (IPS) that inspect traffic against rulesets for malicious behavior.
*   **Bettercap** — A modern framework for network reconnaissance, Man-in-the-Middle (MitM) attacks, and wireless monitoring.

---

## 4. Security Operations (SecOps), SIEM, & EDR
*Tools used by Blue Teams to collect logs, monitor endpoints, and detect security incidents across an enterprise.*

*   **Splunk & Elastic Stack (ELK)** — SIEM (Security Information and Event Management) platforms that ingest, index, and analyze massive volumes of log data for security threats.
*   **Wazuh** — An open-source enterprise Security Monitoring, Threat Detection, and EDR (Endpoint Detection and Response) platform.
*   **Sysmon (System Monitor)** — A Windows system service that logs detailed endpoint telemetry (process creation, network connections, file access) to the Event Log.
*   **Velociraptor** — An advanced digital forensics and endpoint monitoring tool that allows defenders to query thousands of endpoints simultaneously.

---

## 5. Digital Forensics & Incident Response (DFIR)
*Tools used by forensic investigators to capture, extract, and analyze evidence post-breach.*

*   **Autopsy & Sleuth Kit** — Open-source digital forensics platforms used to inspect hard drives, recover deleted files, and build timelines.
*   **Volatility 3** — The leading memory forensics framework used to analyze volatile RAM dumps for hidden malware and injected processes.
*   **KAPE (Kroll Artifact Parser and Extractor)** — A lightweight triage tool that parses critical Windows forensic artifacts (MFT, Registry, Prefetch) in minutes.
*   **FTK Imager** — A forensic tool used to create bit-for-bit forensic images of hard drives without altering the original evidence.
*   **Plaso / log2timeline** — A tool used to extract events from various forensic artifacts and merge them into a single, chronological super-timeline.

---

## 6. Reverse Engineering & Malware Analysis
*Tools used to disassemble, debug, and deconstruct malicious software and executables.*

*   **Ghidra** — A free, open-source software reverse engineering suite developed by the NSA, featuring a powerful disassembler and decompiler.
*   **IDA Pro / Free** — The commercial industry-standard disassembler and decompiler used by malware analysts and vulnerability researchers.
*   **x64dbg & GDB** — Open-source debuggers used to step through code execution line-by-line (x64dbg for Windows, GDB for Linux).
*   **Process Hacker / System Informer & Procmon** — System monitoring tools used during dynamic malware analysis to observe process creation, registry edits, and file accesses.
*   **PEStudio** — A static analysis tool used to inspect the Portable Executable (PE) headers, imports, and libraries of suspicious Windows files.

---

## 7. Identity, Active Directory, & Password Security
*Tools used to audit authentication systems, test password strength, and map domain trust relationships.*

*   **BloodHound** — A graph-theory tool that visually maps Active Directory relationships, permissions, and complex attack paths to Tier 0 assets.
*   **Mimikatz** — A famous proof-of-concept tool used to extract plain-text passwords, hashes, and Kerberos tickets from Windows memory (LSASS).
*   **Hashcat** — The world's fastest password cracker, leveraging GPU acceleration to crack hashed passwords (MD5, NTLM, WPA2, bcrypt).
*   **John the Ripper** — A versatile CPU-based password cracker used by system administrators to audit weak passwords.
*   **Impacket** — A collection of Python classes for working with network protocols (SMB, Kerberos, MSRPC), heavily used for Active Directory security auditing.

---

## 8. Wireless, RFID, & Hardware Security
*Tools used to audit physical badges, wireless networks, and hardware interfaces.*

*   **Aircrack-ng** — A complete suite of tools to assess Wi-Fi network security, capture handshakes, and test encryption (WEP, WPA/WPA2).
*   **Kismet** — A wireless network detector, packet sniffer, and wardriving tool for Wi-Fi, Bluetooth, and Zigbee.
*   **Proxmark3** — The gold-standard hardware tool for analyzing, cloning, and emulating RFID and NFC smart cards.
*   **Flipper Zero** — A portable multi-tool for hardware auditing (Sub-GHz radio, RFID, NFC, Infrared, BadUSB).
*   **HackRF One** — A Software Defined Radio (SDR) peripheral capable of transmitting or receiving radio signals from 1 MHz to 6 GHz.

---

## 9. Cloud, Container, & DevOps Security
*Tools used to audit cloud infrastructure (AWS/Azure/GCP), Kubernetes clusters, and software pipelines.*

*   **Prowler & ScoutSuite** — Multi-cloud security assessment tools that audit AWS, Azure, and GCP environments against security best practices (CIS Benchmarks).
*   **Trivy & Grype** — Vulnerability scanners for container images, file systems, Git repositories, and Infrastructure-as-Code (IaC).
*   **Checkov & tfsec** — Static code analysis tools used to scan Terraform, CloudFormation, and Kubernetes manifests for misconfigurations before deployment.
*   **Kubescape** — An open-source Kubernetes security platform that audits clusters against NSA-CISA hardening guidance.

---

## 10. Adversary Emulation & Testing Frameworks
*Broad security platforms used to simulate attacks, manage command-and-control (C2), and validate defensive detection rules.*

*   **Metasploit Framework** — The world’s most widely used penetration testing platform, containing thousands of modules for vulnerability validation.
*   **Atomic Red Team** — A library of simple, open-source, automated tests mapped directly to the MITRE ATT&CK framework to validate Blue Team detections.
*   **Caldera** — An automated adversary emulation system built by MITRE to execute autonomous attack scenarios and test network defenses.
*   **Cobalt Strike & Sliver** — Command and Control (C2) frameworks used by professional Red Teams to manage post-exploitation implants and emulate advanced persistent threats (APTs).
