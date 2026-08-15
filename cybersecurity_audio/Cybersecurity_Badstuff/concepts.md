# 🛡️ Cyber Attacks & Exploits: 71 Modules Reference Guide

Welcome to the **Comprehensive Cybersecurity Reference Guide** accompanying *Cyber Attacks & Exploits: 71 Deep-Dive Modules on Malware, Attack Vectors & Exploits*. This companion document breaks down all 71 lecture modules into 10 structured security domains, detailing attack mechanics, real-world vectors, and primary defensive strategies.

---

## 📐 Table of Contents
1. [Section 1: Malware & Malicious Code (Modules 1.1 - 1.9)](#section-1-malware--malicious-code)
2. [Section 2: Social Engineering & Human Attacks (Modules 2.1 - 2.12)](#section-2-social-engineering--human-attacks)
3. [Section 3: Identity, Credential & Access Exploitation (Modules 3.1 - 3.9)](#section-3-identity-credential--access-exploitation)
4. [Section 4: Network & Infrastructure Attacks (Modules 4.1 - 4.10)](#section-4-network--infrastructure-attacks)
5. [Section 5: Web Application & API Vulnerabilities (Modules 5.1 - 5.9)](#section-5-web-application--api-vulnerabilities)
6. [Section 6: Hardware, Firmware & Virtualization Exploits (Modules 6.1 - 6.5)](#section-6-hardware-firmware--virtualization-exploits)
7. [Section 7: Cryptographic & Data Security Failures (Modules 7.1 - 7.4)](#section-7-cryptographic--data-security-failures)
8. [Section 8: Operational Technology (OT) & ICS Attacks (Modules 8.1 - 8.4)](#section-8-operational-technology-ot--ics-attacks)
9. [Section 9: AI & Machine Learning Security Risks (Modules 9.1 - 9.5)](#section-9-ai--machine-learning-security-risks)
10. [Section 10: Supply Chain & Build Pipeline Attacks (Modules 10.1 - 10.4)](#section-10-supply-chain--build-pipeline-attacks)

---

## Section 1: Malware & Malicious Code

### 1.1 Viruses
* **Definition:** Self-replicating code attached to a host executable file or document. Requires human interaction (e.g., executing a file) to propagate.
* **Vector:** Email attachments, infected downloads, legacy removable media.
* **Mitigation:** Real-time endpoint detection and response (EDR), signature and heuristic AV scanning.

### 1.2 Worms
* **Definition:** Standalone malware that self-propagates across computer networks automatically by exploiting unpatched vulnerabilities without needing human intervention.
* **Vector:** Network services (SMB, RDP), RPC vulnerabilities (e.g., EternalBlue).
* **Mitigation:** Automated network vulnerability patching, micro-segmentation, firewall port restrictions.

### 1.3 Trojans
* **Definition:** Malicious software disguised as legitimate or desired software to trick users into installing it.
* **Vector:** Trojanized utility software, cracks, fake installers.
* **Mitigation:** Application whitelisting, code signing verification, user security training.

### 1.4 Remote Access Trojans (RATs)
* **Definition:** Malware granting covert administrative control over a target endpoint, enabling keylogging, webcam access, and file exfiltration over Command & Control (C2) channels.
* **Vector:** Phishing, drive-by downloads, compromised installers.
* **Mitigation:** Network egress filtering, C2 beacon detection, behavioral EDR blocking.

### 1.5 Rootkits & Bootkits
* **Definition:** Stealth malware designed to subvert the operating system (Kernel level) or bootloader (MBR/VBR level) to hide its presence and maintain persistent access.
* **Vector:** Vulnerable driver exploitation (BYOVD), compromised system installations.
* **Mitigation:** UEFI Secure Boot, Kernel DMA protection, Memory Integrity (HVCI).

### 1.6 Ransomware
* **Definition:** Malware that encrypts system files or locks operating systems, demanding cryptocurrency payment for decryption keys (often combined with double-extortion exfiltration).
* **Vector:** Phishing, compromised RDP endpoints, software vulnerabilities.
* **Mitigation:** Immutable offline backups, Zero Trust Network Access (ZTNA), ransomware behavior blocking.

### 1.7 Spyware & Keyloggers
* **Definition:** Software that secretly monitors user activity, capturing keystrokes, screenshots, and personal credentials.
* **Vector:** Bundled freeware, compromised browser extensions.
* **Mitigation:** Anti-keylogging browser isolation, least-privilege user accounts, application control.

### 1.8 Infostealers
* **Definition:** Specialized lightweight malware designed to extract stored web browser credentials, session cookies, crypto wallets, and system telemetry for sale on initial access broker markets.
* **Vector:** Malvertising, cracked software repositories.
* **Mitigation:** Passwordless/FIDO2 authentication, short-lived session tokens, endpoint monitoring.

### 1.9 Cryptojacking
* **Definition:** Unauthorized background deployment of cryptocurrency mining software utilizing host CPU/GPU resources.
* **Vector:** Compromised web scripts (Coinhive style), container image compromise.
* **Mitigation:** Resource usage throttling monitoring, WAF script blocking, container image scanning.

---

## Section 2: Social Engineering & Human Attacks

### 2.1 Bulk Phishing
* **Definition:** High-volume, untargeted spam emails designed to lure victims into revealing credentials or downloading malicious payloads.
* **Mitigation:** SPF, DKIM, DMARC enforcement, email gateway filtering.

### 2.2 Spear Phishing
* **Definition:** Tailored, highly targeted phishing campaigns directed at specific individuals or organizations using gathered OSINT.
* **Mitigation:** Advanced email threat protection, link sandboxing, security awareness training.

### 2.3 Whaling
* **Definition:** A specialized form of spear phishing directed exclusively at high-profile corporate executives (CEOs, CFOs) or board members.
* **Mitigation:** Executive email monitoring, dual-authorization financial controls.

### 2.4 Smishing
* **Definition:** Phishing conducted via SMS text messages containing malicious shortened links or urgent prompts.
* **Mitigation:** Mobile Threat Defense (MTD), SMS filtering solutions.

### 2.5 Vishing
* **Definition:** Social engineering over voice calls (VoIP/PSTN), often spoofing trusted caller IDs to extract Sensitive Personal Information (SPI).
* **Mitigation:** Callback verification protocols, caller ID authentication (STIR/SHAKEN).

### 2.6 Angler Phishing
* **Definition:** Social engineering targeting dissatisfied customers on social media by impersonating official corporate customer support accounts.
* **Mitigation:** Social media brand monitoring, verified handle enforcement.

### 2.7 Business Email Compromise (BEC)
* **Definition:** Fraud scheme where an attacker compromises or impersonates a corporate email account to trick employees into conducting fraudulent wire transfers.
* **Mitigation:** Multi-person financial approval controls, out-of-band phone confirmation.

### 2.8 Pretexting
* **Definition:** Creating an invented scenario (pretext) to manipulate a target into divulging information or granting physical/logical access.
* **Mitigation:** Strict identity validation procedures, clear authorization policies.

### 2.9 Baiting
* **Definition:** Leaving physical media (e.g., malware-loaded USB drives) in public areas hoping a curious victim will connect it to a network workstation.
* **Mitigation:** Disabling USB storage mass-storage policies via GPO/MDM, employee physical security policy.

### 2.10 Quid Pro Quo
* **Definition:** Offering a service or benefit (e.g., impersonating IT tech support fixing a computer issue) in exchange for credentials or access.
* **Mitigation:** Mandatory IT ticket system authentication, employee identity verification policies.

### 2.11 Watering Hole Attacks
* **Definition:** Compromising a legitimate third-party website frequently visited by a targeted group or industry to serve targeted zero-day exploits.
* **Mitigation:** Browser isolation, prompt patch management, web filtering.

### 2.12 Tailgating & Piggybacking
* **Definition:** Unauthorized physical entry following an authorized person into a secured facility (Tailgating = unconsented, Piggybacking = consented).
* **Mitigation:** Mantraps, turnstiles, badge access logs, physical security guards.

---

## Section 3: Identity, Credential & Access Exploitation

### 3.1 LLMNR-NBT-NS Poisoning
* **Definition:** Intercepting legacy name resolution requests on local Windows networks to spoof responses and capture NetNTLM hashes.
* **Mitigation:** Disabling LLMNR and NBT-NS via Group Policy (GPO) in Active Directory environments.

### 3.2 Kerberoasting & AS-REP Roasting
* **Definition:** Offline cracking of Active Directory service account passwords by requesting TGS tickets (Kerberoasting) or exploiting accounts without pre-authentication (AS-REP Roasting).
* **Mitigation:** Strong 25+ character service account passwords, Group Managed Service Accounts (gMSA).

### 3.3 DCSync Attacks
* **Definition:** Simulating a Domain Controller via Directory Replication Service Remote Protocol (MS-DRSR) to pull password hashes (including KRBTGT) from Active Directory.
* **Mitigation:** Restricting `Replicating Directory Changes` permissions in Active Directory, monitoring Event ID 4662.

### 3.4 Golden & Silver Ticket Attacks
* **Definition:** Forging Kerberos Ticket Granting Tickets (Golden Ticket using KRBTGT hash) or Service Tickets (Silver Ticket using service hash) for persistent domain dominance.
* **Mitigation:** Rotating the KRBTGT password twice regularly, tier 0 Active Directory isolation.

### 3.5 Pass-the-Hash (PtH) & Pass-the-Ticket (PtT)
* **Definition:** Using extracted NTLM hashes or Kerberos tickets directly for lateral movement without cracking the plaintext password.
* **Mitigation:** LSA Protection, Credential Guard, disabling NTLM, restricting local admin reuse.

### 3.6 OAuth Consent Phishing
* **Definition:** Tricking users into granting malicious third-party OAuth applications access to their cloud organization data (Microsoft 365 / Google Workspace).
* **Mitigation:** Restricting user consent for unverified apps, admin approval workflows.

### 3.7 MFA Fatigue (Push Spamming)
* **Definition:** Flooding a user with repeated Multi-Factor Authentication push notifications until they succumb to annoyance and approve access.
* **Mitigation:** Number matching MFA, FIDO2 hardware keys.

### 3.8 SIM Swapping
* **Definition:** Fraudulently transferring a victim's phone number to an attacker-controlled SIM card to intercept SMS-based 2FA codes.
* **Mitigation:** App-based TOTP or FIDO2 security keys instead of SMS 2FA, carrier PIN protection.

### 3.9 Session Hijacking & Cookie Theft
* **Definition:** Stealing valid session identifiers or session cookies to bypass authentication controls and impersonate a logged-in user.
* **Mitigation:** HttpOnly and Secure cookie flags, binding sessions to client IP/TLS fingerprints.

---

## Section 4: Network & Infrastructure Attacks

### 4.1 Man-in-the-Middle (MitM)
* **Definition:** Covertly relaying and altering communication between two parties who believe they are directly communicating with each other.
* **Mitigation:** End-to-end TLS 1.3 encryption, certificate pinning, HSTS.

### 4.2 IP Spoofing
* **Definition:** Injecting false source IP addresses into packet headers to impersonate trusted machines or blind reflection attacks.
* **Mitigation:** Ingress/egress BCP 38 filtering, anti-spoofing firewall rules.

### 4.3 MAC Spoofing
* **Definition:** Altering the Media Access Control (MAC) address of a network interface to bypass MAC-filtering access controls or masquerade as another device.
* **Mitigation:** 802.1X Network Access Control (NAC), Port Security with Sticky MAC addresses.

### 4.4 ARP Poisoning
* **Definition:** Sending forged Address Resolution Protocol messages over a local area network to link an attacker's MAC address with the IP address of a legitimate gateway.
* **Mitigation:** Dynamic ARP Inspection (DAI), static ARP tables for critical infrastructure.

### 4.5 DNS Spoofing (Cache Poisoning)
* **Definition:** Corrupting Domain Name System resolver caches to return incorrect IP addresses, redirecting users to malicious sites.
* **Mitigation:** DNSSEC implementation, randomized DNS transaction IDs and source ports.

### 4.6 BGP Route Hijacking
* **Definition:** Falsely advertising IP address prefixes in the Border Gateway Protocol to misroute internet traffic through rogue Autonomous Systems.
* **Mitigation:** Resource Public Key Infrastructure (RPKI) route origin authorization.

### 4.7 Edge Device Exploitation (VPN Gateways & Firewalls)
* **Definition:** Targeting unpatched vulnerabilities in perimeter network appliances (Pulse Secure, Fortinet, Palo Alto) for initial enterprise entry.
* **Mitigation:** Rapid patching of edge infrastructure, perimeter ZTNA deployment.

### 4.8 Volumetric Attacks (UDP/ICMP Floods, DNS Amplification)
* **Definition:** Saturating network bandwidth using massive volumes of traffic generated by botnets using reflection/amplification vectors.
* **Mitigation:** Anycast DDoS mitigation services (Cloudflare, Akamai), upstream ISP scrubbing centers.

### 4.9 Protocol Attacks (SYN Floods)
* **Definition:** Exhausting server connection state tables by sending half-open TCP SYN requests without completing the handshake.
* **Mitigation:** SYN cookies, TCP state table tuning.

### 4.10 Application Attacks (HTTP GET/POST Floods)
* **Definition:** Target application layer resources with seemingly legitimate HTTP requests designed to exhaust CPU or database query limits.
* **Mitigation:** Web Application Firewall (WAF) rate limiting, CAPTCHA challenges.

---

## Section 5: Web Application & API Vulnerabilities

### 5.1 SQL Injection (SQLi)
* **Definition:** Injecting malicious SQL statements into web input fields to manipulate database queries, bypassing authentication or dumping tables.
* **Mitigation:** Parameterized queries (prepared statements), ORM frameworks, input validation.

### 5.2 Command Injection
* **Definition:** Executing arbitrary operating system commands on the host server by abusing unsanitized system call parameters.
* **Mitigation:** Avoiding shell execution functions, strict input allowlisting.

### 5.3 XML External Entity (XXE)
* **Definition:** Exploiting weakly configured XML parsers to process external entity references, allowing local file disclosure or SSRF.
* **Mitigation:** Disabling XML DTD (Document Type Definition) parsing in application XML parsers.

### 5.4 Cross-Site Scripting (XSS)
* **Definition:** Injecting malicious client-side scripts (Reflected, Stored, or DOM-based) executed in the context of other users' web browsers.
* **Mitigation:** Content Security Policy (CSP), contextual output encoding, DOM-safe frameworks (React, Angular).

### 5.5 Cross-Site Request Forgery (CSRF)
* **Definition:** Forcing an authenticated end user to execute unwanted state-changing actions on a web application in which they are currently authenticated.
* **Mitigation:** Anti-CSRF tokens, SameSite cookie attributes (`Strict` or `Lax`).

### 5.6 Server-Side Request Forgery (SSRF)
* **Definition:** Inducing a server-side application to make HTTP requests to an arbitrary domain chosen by the attacker (often targeting cloud IMDS `169.254.169.254`).
* **Mitigation:** URL parsing allowlists, IMDSv2 enforcement, network egress restrictions on app servers.

### 5.7 Broken Object Level Authorization (BOLA)
* **Definition:** APIs revealing endpoints that handle object identifiers without validating whether the requesting user owns or has access to that object ID.
* **Mitigation:** Object-level access control checks based on user context at every controller endpoint.

### 5.8 Broken Function Level Authorization (BFLA)
* **Definition:** Failing to properly restrict administrative or sensitive API function endpoints based on user roles.
* **Mitigation:** RBAC/ABAC role enforcement middleware on all administrative endpoints.

### 5.9 Lack of Rate Limiting & Resource Exhaustion
* **Definition:** API endpoints failing to limit the number of requests, enabling brute-force attempts, data scraping, or denial-of-service.
* **Mitigation:** API Gateway rate limiting, IP-based request throttling.

---

## Section 6: Hardware, Firmware & Virtualization Exploits

### 6.1 Virtual Machine (VM) Escape
* **Definition:** Breaking out of a guest virtual machine's isolated environment to execute code on the underlying host hypervisor.
* **Mitigation:** Hypervisor patching, running minimal virtual hardware drivers.

### 6.2 Container Escape
* **Definition:** Exploiting misconfigured container runtimes or kernel vulnerabilities to escape Docker/Kubernetes container namespaces into the host node.
* **Mitigation:** Running containers as non-root users, seccomp profiles, AppArmor/SELinux isolation.

### 6.3 Hardware Side-Channel Attacks (Spectre & Meltdown)
* **Definition:** Abusing CPU speculative execution features to leak secret data across security boundaries in processor cache.
* **Mitigation:** Microcode CPU patches, OS speculative barrier updates.

### 6.4 Rowhammer (DRAM Disturbance)
* **Definition:** Repeatedly accessing specific DRAM memory rows to induce electrical interference (bit flips) in adjacent memory rows, altering data or gaining elevated access.
* **Mitigation:** Target Row Refresh (TRR), ECC memory modules.

### 6.5 UEFI/BIOS Rootkits
* **Definition:** Persistence malware installed within system SPI flash memory that survives operating system reinstalls and hard drive replacements.
* **Mitigation:** Cryptographic firmware verification (Intel Boot Guard), hardware write protection.

---

## Section 7: Cryptographic & Data Security Failures

### 7.1 Obsolete Hashes & Ciphers (MD5, SHA-1, WEP, DES)
* **Definition:** Relying on broken or weak cryptographic algorithms vulnerable to collision or brute-force attacks.
* **Mitigation:** Migrating to modern standards: SHA-256/3, AES-256-GCM, WPA3.

### 7.2 Missing or Insufficient Salting
* **Definition:** Storing password hashes without unique cryptographic salts, rendering them vulnerable to precomputed Rainbow Table attacks.
* **Mitigation:** Argon2id, bcrypt, or PBKDF2 with unique per-password salts.

### 7.3 Hardcoded Credentials & Leaked API Keys
* **Definition:** Embedding secrets, private keys, or API tokens directly into application source code or public repositories.
* **Mitigation:** Secrets management vaults (HashiCorp Vault, AWS Secrets Manager), pre-commit secret scanners.

### 7.4 Harvest Now, Decrypt Later (SNDL - Quantum Risks)
* **Definition:** Intercepting and archiving encrypted traffic today to decrypt it in the future when quantum computers can break RSA/ECC algorithms.
* **Mitigation:** Adopting Post-Quantum Cryptography (PQC) standards (ML-KEM, ML-DSA).

---

## Section 8: Operational Technology (OT) & ICS Attacks

### 8.1 Industrial Protocol Exploitation (Modbus, DNP3)
* **Definition:** Exploiting legacy unencrypted industrial control protocols lacking authentication to send malicious control commands to plant equipment.
* **Mitigation:** OT network air-gapping, industrial firewalls (DPI), secure protocol variants (Modbus TCP/Security).

### 8.2 PLC Logic Tampering
* **Definition:** Modifying the Programmable Logic Controller ladder logic binaries to cause physical machinery damage or operation disruption (e.g., Stuxnet).
* **Mitigation:** PLC firmware integrity verification, physical key-switch locks.

### 8.3 Default Administrative Credentials
* **Definition:** Leveraging factory default usernames and passwords on industrial switches, RTUs, and HMI interfaces.
* **Mitigation:** Mandatory credential change policies upon deployment, centralized TACACS+/RADIUS authentication.

### 8.4 Unsigned/Insecure Firmware Updates
* **Definition:** Flashing unverified, malicious firmware onto field devices to alter baseline operational characteristics.
* **Mitigation:** Cryptographically signed firmware images with hardware verification.

---

## Section 9: AI & Machine Learning Security Risks

### 9.1 Direct Prompt Injection (Jailbreaking)
* **Definition:** Crafting inputs to Large Language Models (LLMs) that bypass system safety guardrails and instruct the model to execute prohibited commands.
* **Mitigation:** Input sanitization layers, secondary guardrail models (Llama Guard).

### 9.2 Indirect Prompt Injection
* **Definition:** Placing hidden malicious instructions inside third-party content (web pages, PDFs) ingested by an autonomous AI agent to hijack its control flow.
* **Mitigation:** Strict separation of data and instruction contexts, human-in-the-loop validation.

### 9.3 Training Data Poisoning
* **Definition:** Contaminating dataset training pipelines with malicious or biased samples to introduce covert backdoors into ML models.
* **Mitigation:** Dataset provenance tracking, anomaly detection on training samples.

### 9.4 Evasion Attacks (Adversarial Noise)
* **Definition:** Applying imperceptible mathematical perturbations to input images or data to cause ML classification models to misclassify targets.
* **Mitigation:** Adversarial training, input transformation & smoothing.

### 9.5 Autonomous Agent Hijacking
* **Definition:** Exploiting tool-use capabilities of AI agents to trick them into executing unauthorized system operations or data exfiltration via connected APIs.
* **Mitigation:** Least privilege API keys, strict function call schemas, human confirmation for high-risk actions.

---

## Section 10: Supply Chain & Build Pipeline Attacks

### 10.1 Typosquatting
* **Definition:** Registering intentionally misspelled package names on public repositories (npm, PyPI, Crates.io) to trick developers into installing malware.
* **Mitigation:** Internal private package registries, lockfile hash enforcement.

### 10.2 Dependency Confusion
* **Definition:** Tricking package managers into pulling malicious public packages with higher version numbers instead of intended internal private packages.
* **Mitigation:** Namespace reservation, explicit repository scoping configuration.

### 10.3 CI/CD Pipeline Poisoning
* **Definition:** Injecting malicious build steps or scripts into continuous integration workflows (e.g., GitHub Actions workflows) to steal secrets or tamper with artifacts.
* **Mitigation:** Immutable pipeline definitions, pin action SHA hashes, least privilege runner tokens.

### 10.4 Build Server Compromise
* **Definition:** Gaining access to build infrastructure to tamper with final compiled software binaries before distribution (e.g., SolarWaves attack).
* **Mitigation:** Reproducible builds, SLSA (Supply-chain Levels for Software Artifacts) compliance, signed build attestations (Cosign).

---
*Designed for comprehensive reference alongside The Threat Landscape Audio Series.*
