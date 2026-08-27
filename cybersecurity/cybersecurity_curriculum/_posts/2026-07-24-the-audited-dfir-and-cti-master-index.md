---
title: "The Audited DFIR & CTI Master Index"
date: "2026.07.24"
tags: ["STUDY", "DFIR"]
summary: "A comprehensive master index of Digital Forensics, Incident Response, and Cyber Threat Intelligence across IR methodology, host/mobile/memory forensics, cloud analysis, malware RE, and CTI."
---

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-left: 4px solid #4338ca; padding: 1.25rem 1.5rem; border-radius: 0 8px 8px 0; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <p style="margin: 0; font-size: 1.05rem; line-height: 1.6; color: #334155; font-style: italic; font-weight: 500;">
        <strong>Purpose:</strong> A master reference index covering Digital Forensics, Incident Response (DFIR), and Cyber Threat Intelligence (CTI). Details SANS PICERL / NIST IR lifecycles, live triage, Windows/Linux/macOS/mobile host artifacts, memory acquisition, network PCAP flow analysis, cloud/container telemetry, malware reverse engineering, and CTI attribution frameworks.
    </p>
</div>

---

## 1. Incident Response (IR) Methodology & Operations
*   **IR Frameworks** — SANS PICERL (Preparation, Identification, Containment, Eradication, Recovery, Lessons Learned) and NIST SP 800-61r2.
*   **Triage & Scoping** — Rapidly identifying the "blast radius" (Patient Zero, compromised identities, and lateral movement paths) before taking action.
*   **Containment Strategies** — Logical Isolation (EDR host isolation), Identity Isolation (revoking Kerberos tickets, zeroing sessions), and Blackholing (dropping C2 IP traffic at the firewall).
*   **Eradication & Recovery** — Rebuilding from golden images, patching exploited zero-days, and safely re-introducing endpoints to the network.
*   **Out-of-Band (OOB) Communications** — Establishing off-network communication channels (e.g., Signal, separate tenants) so the threat actor cannot monitor the IR team's strategy.
*   **Ransomware Extortion Management** — Managing the business reality of Double/Triple extortion (stolen data + encrypted network + DDoS), threat actor negotiation, and utilizing OFAC-compliant breach coaches.

---

## 2. Enterprise Live Triage & Forensics at Scale
*   **Artifact Parsers (Live Response)** — Deploying tools like KAPE (Kroll Artifact Parser and Extractor) to selectively pull only critical forensic files (MFT, Registry, EVTX) in minutes rather than cloning full 1TB hard drives.
*   **Fleet Querying** — Using tools like OSquery or Velociraptor to hunt for specific YARA matches, rogue processes, or file hashes across 10,000+ endpoints simultaneously.

---

## 3. Host-Based Forensics (Dead-box & OS Analysis)
*   **Windows Execution & File Artifacts** — Prefetch, Amcache, Shimcache, SRUM, MFT (Master File Table), USN Journal, and detecting Time Stomping.
*   **Windows Persistence Artifacts** — Registry Run keys, Scheduled Tasks, WMI Event Consumers, Services, and Startup folders.
*   **Windows Event Logs (EVTX)** — Logon anomalies (ID 4624/4625), Process Creation (4688), PowerShell Script Block Logging (4104), and Object Access.
*   **Linux Forensics** — Ext4/Btrfs filesystems, `bash_history`, cron jobs, systemd journals, SSH `authorized_keys` (backdoors), and `/var/log/auth.log`.
*   **macOS Forensics** — APFS filesystems, FSEvents (file system changes), Unified Logging, Plist files, Spotlight artifacts, and quarantine databases.
*   **Firmware & UEFI Forensics** — Analyzing SPI flash dumps to detect bootkits/rootkits (like BlackLotus) that load before the OS kernel and survive complete hard drive wipes.

---

## 4. Mobile Device Forensics
*   **Extraction Types** — Logical Extraction (pulling backups/API data) vs. Physical Extraction (bit-by-bit flash memory copy via tools like Cellebrite/GrayKey).
*   **Device States** — AFU (After First Unlock - memory encryption keys are loaded) vs. BFU (Before First Unlock - device is highly restricted/encrypted).
*   **Mobile Artifacts** — Parsing SQLite databases for deleted text messages, location history (plists/CoreLocation), application sandbox analysis, and detecting Pegasus/spyware implants.

---

## 5. Memory Forensics (Volatile Data)
*   **Memory Acquisition** — Safely dumping RAM without crashing the system (DumpIt, WinPmem, LiME).
*   **Process Analysis** — Identifying malicious execution using Volatility/Rekall (unlinked processes, orphaned threads, anomalous Parent-Child trees).
*   **Injection Detection** — Finding EDR unhooking, Reflective DLL injections, and Process Hollowing in memory.
*   **Volatile Extraction** — Pulling plain-text passwords, decrypted ransomware keys, and active network connections directly out of RAM.

---

## 6. Network & OT/ICS Forensics
*   **Full Packet Capture (PCAP)** — Deep-dive analysis of raw network traffic (Wireshark/tcpdump) to reconstruct downloaded files or read unencrypted C2 commands.
*   **Network Flow Analysis** — Using NetFlow/sFlow to analyze metadata (who talked to whom, when, and how much data was sent) when PCAPs are too large.
*   **Protocol & Encrypted Traffic Analysis** — Analyzing DNS (for tunneling/DGAs) and using JA3/JA4 TLS Fingerprinting to uniquely identify malware clients hiding inside HTTPS traffic.
*   **OT / ICS Incident Response** — Responding to Operational Technology breaches (PLCs, SCADA). Prioritizing *physical safety and availability* over containment. Analyzing proprietary industrial protocols (Modbus, DNP3) without actively scanning or crashing fragile legacy networks.

---

## 7. Cloud & Container Forensics
*   **AWS Forensics** — Analyzing CloudTrail (API calls), VPC Flow Logs, and GuardDuty. Isolating EC2 instances and snapshotting EBS volumes.
*   **Azure / Entra ID Forensics** — Querying Unified Audit Logs, tracking Azure AD Sign-in logs (Impossible Travel), and investigating malicious OAuth app consents.
*   **GCP Forensics** — Google Cloud Audit Logs, Cloud Storage access logs, and VPC flow telemetry.
*   **Container (Docker/K8s) Forensics** — Freezing running containers, analyzing OverlayFS for attacker changes, and extracting memory from compromised pods before orchestration tools destroy them.

---

## 8. Malware Analysis & Reverse Engineering (MARE)
*   **Static Analysis** — Examining malware without running it: extracting Strings, analyzing PE headers, and calculating Entropy to detect packers.
*   **Dynamic Analysis (Sandboxing)** — Running malware in isolated environments (Cuckoo, Any.Run) and monitoring filesystem/registry changes (Procmon).
*   **De-obfuscation & Unpacking** — Stripping protective layers to reveal the true code (defeating UPX or XOR encryption).
*   **Code Reversing** — Using Disassemblers (IDA Pro, Ghidra) and Debuggers (x64dbg/GDB) to read assembly code, extract hardcoded C2s, and write custom decryptors.

---

## 9. Cyber Threat Intelligence (CTI) & Blockchain Tracing
*   **The Intelligence Lifecycle** — Direction, Collection, Processing, Analysis, Dissemination, Feedback.
*   **Analysis Frameworks** — The Diamond Model of Intrusion Analysis (Adversary, Infrastructure, Capability, Victim) and The Pyramid of Pain.
*   **Attribution & Tracking** — Profiling APTs (Nation-States) and Ransomware-as-a-Service (RaaS) affiliates based on custom tooling.
*   **Blockchain Forensics** — Tracing cryptocurrency payments (Bitcoin/Monero) across public ledgers to identify threat actor wallets, mixers (Tornado Cash), and cash-out exchanges.
*   **Indicator Management** — Writing custom YARA rules and sharing IoCs via standardized STIX/TAXII feeds.

---

## 10. Legal, eDiscovery, & Threat Hunting
*   **The Order of Volatility (RFC 3227)** — 1. Registers/Cache &rarr; 2. Routing/ARP &rarr; 3. RAM &rarr; 4. Temp File Systems &rarr; 5. Disk &rarr; 6. Remote Logging.
*   **Chain of Custody & Hashing** — The documented paper trail detailing evidence custody, combined with MD5/SHA-256 hashing to legally prove evidence was not altered.
*   **eDiscovery (EDRM Model)** — Identifying, preserving, and reviewing electronic data specifically for litigation, regulatory audits, or HR insider-threat investigations.
*   **Threat Hunting** — Hypothesis-Driven (searching based on new CTI) vs. Data-Driven (using SIEM queries/KQL to look for statistical anomalies like long-tail command execution or beaconing jitter).
