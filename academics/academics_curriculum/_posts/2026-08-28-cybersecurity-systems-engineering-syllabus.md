---
title: "Cybersecurity & Systems Defense Syllabus"
date: 2026-08-28
tag: "CURRICULUM"
category: "Cybersecurity"
summary: "Complete roadmap covering networking fundamentals, cryptography, offensive exploitation, defensive operations, cloud security, and technical interviews."
---

<div style="background: linear-gradient(135deg, rgba(225, 29, 72, 0.05) 0%, rgba(37, 99, 235, 0.05) 50%, rgba(142, 68, 173, 0.05) 100%); border: 1px solid rgba(225, 29, 72, 0.2); border-left: 5px solid #e11d48; padding: 1.25rem 1.5rem; border-radius: 0 8px 8px 0; margin-bottom: 2rem; box-shadow: 0 4px 14px rgba(225, 29, 72, 0.05);">
    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-family: var(--font-mono); font-size: 0.78rem; font-weight: 700; color: #e11d48; letter-spacing: 0.06em; text-transform: uppercase;">
        <span>⚡ Roadmap Specification</span>
    </div>
    <p style="margin: 0; font-size: 1.05rem; line-height: 1.65; color: var(--text-primary); font-weight: 500;">
        A complete, chronological roadmap designed to take engineers from <strong>networking fundamentals</strong> and <strong>operating system internals</strong> to <strong>offensive exploitation</strong>, <strong>defensive engineering</strong>, <strong>cloud security</strong>, and <strong>technical interviews</strong>.
    </p>
</div>

---

## MODULE 1: IT & Systems Bedrock (The Foundation)

**Focus:** Mastering the foundational protocols, operating systems, and scripting languages that govern all modern networks and computers.

### 1.1 Core Networking Protocols
* **OSI & TCP/IP Models:** Deep dive into all 7 layers and data encapsulation.
* **TCP vs. UDP:** 3-way handshake (`SYN`, `SYN-ACK`, `ACK`), connection teardown (`FIN`/`RST`), and state transitions.
* **IP Addressing & Routing:** IPv4/IPv6 subnetting, CIDR notation, NAT/PAT, BGP, OSPF, and routing tables.
* **Domain Name System (DNS):** Recursive vs. Iterative queries, record types (`A`, `AAAA`, `MX`, `TXT`, `SRV`, `CNAME`), and DNS over HTTPS (DoH) / DNS over TLS (DoT).
* **Web Protocols:** HTTP/1.1 vs. HTTP/2 vs. HTTP/3 (QUIC), HTTP request/response headers, status codes, and methods.
* **Encryption in Transit:** TLS 1.2/1.3 handshakes, cipher suites, Server Name Indication (SNI), and Perfect Forward Secrecy (PFS).
* **Layer 2 Infrastructure:** ARP, MAC addressing, VLANs, 802.1Q tagging, and Spanning Tree Protocol (STP).
* **Secure Tunnels & Edge Routing:** IPSec (AH, ESP, IKEv2, Transport vs. Tunnel modes), Layer 4 vs. Layer 7 Load Balancers, and Reverse Proxies.

### 1.2 Linux Operating System Internals
* **Architecture:** Kernel space vs. User space separation and system calls (`syscalls`).
* **Permissions & Access:** Discretionary file permissions (`chmod`, `chown`), SUID, SGID, and Sticky Bits.
* **Process Management:** Process trees, `fork`, `exec`, IPC, signals, zombie, and orphan processes.
* **Memory & Storage:** Virtual memory, paging, swapping, and file system hierarchies (VFS, `/proc`, `/sys`, `/dev`).
* **Initialization & Containers:** Boot process (UEFI, GRUB, `initrd`, `systemd`), Linux namespaces, and Control Groups (`cgroups`).
* **Network Stack & Security:** Packet filtering (`iptables`, `nftables`, `ufw`), Pluggable Authentication Modules (`PAM`), and Bash text processing (`awk`, `sed`, `grep`, regex).

### 1.3 Windows & Active Directory Architecture
* **System Internals:** Windows Registry structure (`HKLM`, `HKCU`, `SAM`, `SYSTEM`), Windows Services, and Access Control Lists (ACLs, ACEs, SIDs).
* **Active Directory (AD):** Domains, Trees, Forests, Global Catalogs, Domain Controllers (DC), and Trust Relationships.
* **Group Policy & Management:** Group Policy Objects (GPO), Windows Management Instrumentation (WMI), and PowerShell Remoting (WinRM).
* **Enterprise Authentication:** NTLMv2 challenge-response, Kerberos authentication lifecycle (TGT, TGS, PAC, KDC).
* **Telemetry & Logging:** Windows Security Event Logs, Sysmon configuration, and Event Tracing for Windows (ETW).
* **PowerShell Security:** Scripting automation, Execution Policies, Constrained Language Mode (CLM), and Script Block Logging.

### 1.4 Programming & Scripting for Security
* **Python for Security:** Socket programming, network scanning (`scapy`), HTTP interaction (`requests`, `beautifulsoup`), and security automation.
* **C/C++ Systems Programming:** Pointers, manual memory allocation, compilation pipelines, linkers, and calling conventions.
* **Go for Tooling:** Goroutines, channels, cross-compilation for cross-platform binary development.
* **SQL Querying:** Relational queries, schema design, subqueries, and database indexing.
* **Core Data Structures & Algorithms:** Arrays, Hash Maps, Linked Lists, Trees, Stacks, Queues, Graphs, BFS/DFS, Binary Search, and Big-O Space/Time complexity.

---

## MODULE 2: Cryptography & Identity Architecture

**Focus:** The mathematical foundation of confidentiality, integrity, non-repudiation, and modern enterprise identity access control.

### 2.1 Cryptographic Primitives
* **Symmetric Encryption:** Block ciphers (AES-128/256 with ECB, CBC, and GCM authenticated modes), Stream ciphers (ChaCha20-Poly1305).
* **Asymmetric Encryption:** RSA, Elliptic Curve Cryptography (ECC, ECDSA, Ed25519), and Diffie-Hellman Key Exchange (ECDHE).
* **Cryptographic Hashing:** SHA-256, SHA-3, legacy collision vulnerabilities (MD5, SHA-1), and Message Authentication Codes (HMAC).
* **Password Storage:** Slow hashing algorithms (Argon2id, bcrypt, PBKDF2), Cryptographic Salting, and Peppering.
* **Digital Signatures:** Signature generation, verification, and non-repudiation guarantees.

### 2.2 Public Key Infrastructure (PKI)
* **Trust Hierarchies:** Root Certificate Authorities (CA), Intermediate CAs, Certificate Signing Requests (CSR), and X.509 format.
* **Certificate Lifecycle:** Revocation mechanisms (CRLs, OCSP, OCSP Stapling) and Certificate Transparency (CT) logs.

### 2.3 Identity & Access Management (IAM)
* **Access Control Models:** Role-Based Access Control (RBAC), Attribute-Based Access Control (ABAC), Mandatory Access Control (MAC), and Discretionary Access Control (DAC).
* **Modern Identity Protocols:** OAuth 2.0 (Authorization Code Grant with PKCE, Client Credentials), SAML 2.0, and OpenID Connect (OIDC).
* **Multi-Factor Authentication (MFA):** FIDO2/WebAuthn hardware keys, Passkeys, TOTP/HOTP algorithms, and Single Sign-On (SSO) architecture.
* **Zero Trust Architecture:** Core principles of NIST SP 800-207 (*"Never trust, always verify"*, micro-segmentation, continuous authentication).

---

## MODULE 3: Offensive Security & Adversary Emulation

**Focus:** Understanding attacker methodologies, vulnerability discovery, active exploitation, and post-exploitation persistence.

### 3.1 Web Application Security (OWASP Top 10)
* **Injection Attacks:** SQL Injection (In-band, Blind, Error-based, Time-based), Command Injection, and XML External Entity (XXE).
* **Cross-Site Exploitation:** Cross-Site Scripting (Stored, Reflected, DOM XSS) and Cross-Site Request Forgery (CSRF with SameSite cookie bypasses).
* **Access Control Flaws:** Insecure Direct Object References (IDOR), Broken Object Level Authorization (BOLA), and Server-Side Request Forgery (SSRF).
* **File & API Flaws:** Path Traversal, Local/Remote File Inclusion (LFI/RFI), CORS misconfigurations, and REST/GraphQL API vulnerabilities.
* **Token Vulnerabilities:** JSON Web Token (JWT) exploitation (algorithm confusion, weak HMAC secrets, `none` algorithm).

### 3.2 Network & Infrastructure Exploitation
* **Man-in-the-Middle (MitM):** ARP spoofing, DNS cache poisoning, DHCP starvation, and SSL/TLS stripping.
* **Denial of Service (DoS/DDoS):** SYN floods, UDP amplification, NTP/DNS reflection, and application-layer Slowloris attacks.
* **Wireless Attacks:** WPA2/WPA3 4-way handshake capture, Evil Twin rogue APs, and deauthentication attacks.

### 3.3 Active Directory Domain Dominance
* **Credential Access:** LLMNR/NBT-NS Poisoning (`Responder`), AS-REP Roasting, and Kerberoasting.
* **Lateral Movement:** Pass-the-Hash (PtH), Pass-the-Ticket (PtT), Overpass-the-Hash, and WinRM exploitation.
* **Domain Persistence:** Golden Tickets (krbtgt compromise), Silver Tickets, Skeleton Key, DCSync attacks, and DCShadow.
* **Graph-Based Attack Paths:** BloodHound/SharpHound mapping, unconstrained delegation, and ACL abuse.

### 3.4 Low-Level Systems & Binary Exploitation
* **Stack Exploitation:** Classic stack-based Buffer Overflows, register control (`EIP`/`RIP`), shellcode injection, and NOP sleds.
* **Advanced Memory Corruption:** Heap exploitation (Use-After-Free, Double Free), Integer Overflows/Underflows, and Format String bugs.
* **Mitigations & Bypasses:** ASLR (Address Space Layout Randomization), DEP/NX (Data Execution Prevention), Stack Canaries, and Return-Oriented Programming (ROP chains).

---

## MODULE 4: Defensive Engineering & Incident Response

**Focus:** Real-time threat detection, security telemetry analysis, digital forensics, and malware reverse engineering.

### 4.1 Security Operations & Threat Detection
* **SIEM & Log Pipelines:** Log aggregation, parsing, and correlation rule engineering (Splunk, ELK Stack, Wazuh).
* **Network Detection:** Intrusion Detection & Prevention Systems (Snort, Suricata, Zeek) and writing custom signature rules.
* **Endpoint Telemetry:** Endpoint Detection & Response (EDR), Extended Detection & Response (XDR), and behavioral evasion detection.
* **Detection Engineering:** Writing YARA rules for file identification and Sigma rules for SIEM-agnostic log detection.

### 4.2 Incident Response (NIST SP 800-61 Lifecycle)
1. **Preparation:** Playbooks, communication plans, and logging baselines.
2. **Detection & Analysis:** Alert triage, scope determination, and IOC extraction.
3. **Containment:** Network isolation, credential revocation, and process termination.
4. **Eradication:** Artifact removal, root-cause patching, and malware elimination.
5. **Recovery:** Safe restoration of production services from clean backups.
6. **Lessons Learned:** Root-cause analysis (RCA) and post-incident reporting.

### 4.3 Digital Forensics & Investigation
* **Disk Forensics:** Forensic disk imaging (`dd`, FTK Imager), file carving, and NTFS filesystem artifacts (MFT, Prefetch, Amcache, Shimcache, Shellbags, USN Journal).
* **Memory Forensics:** Volatility framework, process injection detection (process hollowing), driver analysis, and rootkit identification.
* **Network Forensics:** Deep PCAP packet inspection (Wireshark, `tcpdump`), stream reassembly, and malware payload extraction.

### 4.4 Malware Analysis & Reverse Engineering
* **Static Analysis:** PE file header analysis, string extraction, import/export table hashing (ImpHash), and Ghidra / IDA Pro disassembly.
* **Dynamic Analysis:** Automated sandboxing (Cuckoo), behavioral analysis, API hooking, and system activity monitoring (`Procmon`, `Regshot`).
* **Anti-Analysis Techniques:** Code packing, XOR/AES payload obfuscation, anti-debugging, and VM-detection evasion.

---

## MODULE 5: Cloud, Infrastructure, & DevSecOps

**Focus:** Hardening modern distributed infrastructure across public cloud environments, container orchestration, and automated CI/CD pipelines.

### 5.1 Cloud Security Architecture
* **Shared Responsibility Model:** Security boundaries across IaaS, PaaS, and SaaS.
* **AWS Security:** IAM policies, roles, permission boundaries, AWS CloudTrail, VPC Flow Logs, GuardDuty, S3 bucket security, and AWS KMS.
* **Azure Security:** Microsoft Entra ID, Managed Identities, Network Security Groups (NSG), Azure Key Vault, and Defender for Cloud.
* **GCP Security:** Service Accounts, Workload Identity Federation, IAM Conditions, and VPC Service Controls.

### 5.2 Container & Kubernetes (K8s) Security
* **Docker Security:** Linux kernel capabilities (`cap-drop`), rootless container execution, `cgroups` isolation, and container image vulnerability scanning (`Trivy`).
* **Kubernetes Hardening:** K8s RBAC, Network Policies, Pod Security Standards (Privileged vs. Baseline vs. Restricted), Kubelet API security, and Secrets management.

### 5.3 Infrastructure as Code (IaC) & DevSecOps
* **Static Code & Template Scanning:** Terraform and CloudFormation security auditing (`Checkov`, `tfsec`).
* **CI/CD Pipeline Hardening:** Securing GitHub Actions / GitLab CI workflows, runner security, and preventing pipeline poison attacks.
* **Software Supply Chain Security:** Software Composition Analysis (SCA), generating Software Bills of Materials (SBOM), and signed releases.
* **Automated Security Testing:** Static Application Security Testing (SAST via `Semgrep`) vs. Dynamic Application Security Testing (DAST via `OWASP ZAP`).
* **Secrets Management:** Centralized secrets storage, dynamic rotation, and audit trails using HashiCorp Vault.

---

## MODULE 6: AI Security & Hardware Integrity

**Focus:** Securing modern Artificial Intelligence models and low-level hardware root-of-trust architectures.

### 6.1 Artificial Intelligence & LLM Security (OWASP Top 10 for LLMs)
* **Prompt Injection:** Direct prompt overrides and Indirect prompt injection via untrusted data sources.
* **Insecure Output Handling:** Preventing downstream XSS, SQLi, and RCE through unvalidated model outputs.
* **Training Data Poisoning:** Detecting and preventing malicious manipulation of training datasets and fine-tuning pipelines.
* **Model Extraction & Denial of Service:** Defending against model inversion, weight stealing, and compute-heavy resource exhaustion.
* **Securing AI Pipelines:** Sandboxing code generation tools, securing vector databases (`pgvector`, Pinecone), and encrypting embedding storage.

### 6.2 Hardware Root of Trust & Firmware Security
* **Secure Boot Lifecycle:** Hardware Root of Trust (RoT), UEFI/BIOS firmware integrity, and cryptographic code signing verification.
* **Hardware Cryptographic Processors:** Trusted Platform Module (TPM 2.0), Apple Secure Enclave, and ARM TrustZone architectures.
* **Physical & Side-Channel Attacks:** Cold boot attacks, memory dumping, timing analysis, and power analysis overview.

---

## MODULE 7: Governance, Risk, & Public Sector Compliance

**Focus:** Enterprise risk management, federal compliance frameworks, and government cybersecurity mandates.

### 7.1 Frameworks & Industry Standards
* **NIST Cybersecurity Framework (CSF 2.0):** The 6 Core Functions — *Govern, Identify, Protect, Detect, Respond, Recover*.
* **NIST SP 800-53 Rev 5:** Catalog of security and privacy controls for federal information systems.
* **NIST SP 800-37 (Risk Management Framework - RMF):** The 6 RMF Steps — *Categorize, Select, Implement, Assess, Authorize, Monitor*.
* **Threat Modeling Frameworks:** MITRE ATT&CK enterprise matrix, Cyber Kill Chain, and STRIDE threat modeling.
* **CIS Controls:** The 18 Critical Security Controls for prioritized cyber defense.

### 7.2 Federal & State Regulations
* **FISMA:** Federal Information Security Modernization Act compliance and system security plans (SSP).
* **FedRAMP:** Cloud security authorization for federal agency deployments (Low, Moderate, High impact levels).
* **FIPS 140-3:** Cryptographic module validation standards.
* **Privacy & Industry Regulations:** HIPAA (healthcare data), PCI-DSS (payment cards), and GDPR (privacy rights).
* **DoD 8140 / 8570 Manual:** Mandatory baseline certification requirements for federal cybersecurity roles.

---

## MODULE 8: The Applied Home Lab & Proof of Work

**Focus:** Three tangible engineering labs that demonstrate undeniable hands-on proficiency to hiring managers.

### 8.1 Lab 1: Enterprise Active Directory & Threat Emulation Lab
* Deploy a multi-node Active Directory domain (Domain Controller + Windows Workstations + Linux Server) on Proxmox or VirtualBox.
* Forward all Windows Event Logs and Sysmon telemetry into a centralized **Splunk** or **Wazuh SIEM**.
* Execute Red Team attacks (Kerberoasting, Pass-the-Hash) from a Kali Linux box and write custom Blue Team detection alerts.

### 8.2 Lab 2: Cloud-Native DevSecOps Pipeline
* Build a fully automated GitHub Actions CI/CD pipeline deploying a containerized microservice to AWS/GCP.
* Integrate automated security gates: `Semgrep` (SAST), `Trivy` (Container Scanning), `Checkov` (Terraform IaC), and `HashiCorp Vault` for dynamic secrets.

### 8.3 Lab 3: Digital Forensics & Incident Response Case Study
* Capture and analyze a real-world memory dump and network capture (PCAP) from an infected host.
* Extract malicious payloads using **Wireshark**, identify injected processes using **Volatility**, and write a professional incident report with IOCs and YARA rules.

---

## MODULE 9: THE CYBERSECURITY INTERVIEW PLAYBOOK

**Focus:** Technical problem-solving formulas, scenario walkthroughs, and bureaucratic hiring protocols.

### 9.1 Technical Coding & Scripting Rounds
* **Language:** Use Python for rapid scripting and algorithmic interview questions.
* **Key Focus Areas:** Log parsing, socket communication, payload decoding (Base64, Hex), string manipulation, and graph traversal.

### 9.2 Security System Design (The PEDALS Method)
* **P - Process:** Clarify business requirements, threat model, and regulatory constraints.
* **E - Estimate:** Estimate data throughput, log volume, and request rate.
* **D - Design API & Auth:** Specify authentication flows (OAuth/OIDC/mTLS) and token validation.
* **A - Architecture:** Diagram components, reverse proxies, WAFs, and network zoning.
* **L - Look at Threat Model:** Apply STRIDE to identify vulnerabilities in every component.
* **S - Scale & Monitor:** Configure SIEM logging, rate limiting, KMS key rotation, and disaster recovery.
* **Classic Blueprints:** Designing a global SSO architecture, Key Management Service (KMS), zero-trust remote access proxy, and DDoS mitigation platform.

### 9.3 Scenario-Based Walkthroughs
* **Incident Triage:** Explain step-by-step containment when a SIEM alerts for a suspected ransomware execution or domain compromise.
* **Architecture Review:** Identify security flaws in a presented infrastructure diagram (open S3 buckets, unencrypted databases, missing egress controls).
* **Compliance Mapping:** Explain how to map technical audit findings to specific NIST SP 800-53 controls.

### 9.4 Public Sector & Federal Navigation
* **Certifications:** Obtain **CompTIA Security+** (Minimum baseline for DoD 8570), followed by **CySA+**, **BICP**, or **CISSP**.
* **Federal Resume:** 3-5 pages via USAJOBS Resume Builder. Map every bullet point to required KSAs (Knowledge, Skills, and Abilities).
* **NYS ITS:** Submit applications via the NY HELPS direct-hiring portal and take Civil Service continuous recruitment exams.
* **Security Clearances:** Maintain clean finances, zero drug use, and a clean criminal background for the SF-86 (Secret/Top Secret) clearance process.

---

## THE 3 DAILY EXECUTION RULES

*(To enforce this curriculum without burning out)*

1. **Build in the Lab Daily:** Theory without hands-on packet captures, SIEM logs, and terminal commands is useless. Spend 50% of your time in your virtual lab.
2. **Analyze Real CVEs:** Read official CVE writeups and vendor post-mortems daily. Understand exactly how real vulnerabilities were discovered and patched.
3. **Practice Out-Loud Threat Modeling:** When looking at any website or cloud service, practice articulating its threat model out loud. Communication and structured reasoning are the primary signals evaluated by senior interviewers.
