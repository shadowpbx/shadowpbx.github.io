---
title: "The Cybersecurity Bedrock: The Master Foundation Index"
date: "2026.07.24"
tags: ["STUDY", "FOUNDATION"]
summary: "A comprehensive foundation guide detailing core security principles, GRC frameworks, IAM lifecycle, cryptography, cloud architecture, AppSec, threat modeling, and incident response."
---

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-left: 4px solid #059669; padding: 1.25rem 1.5rem; border-radius: 0 8px 8px 0; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <p style="margin: 0; font-size: 1.05rem; line-height: 1.6; color: #334155; font-style: italic; font-weight: 500;">
        <strong>Purpose:</strong> Designed as the foundational bedrock for the cybersecurity curriculum, this master index breaks down the core concepts across all 8 security domains—from CIA Triad primitives and GRC frameworks to PKI cryptography, cloud shared responsibility, STRIDE threat modeling, and DFIR forensics.
    </p>
</div>

---

## 1. Core Security Principles (The Absolute Basics)
*   **The CIA Triad** — The ultimate goals of security: ensuring **Confidentiality** (privacy), **Integrity** (accuracy/unaltered state), and **Availability** (system uptime).
*   **The AAA Framework** — The lifecycle of an entity: **Authentication** (proving who you are), **Authorization** (what you are allowed to do), and **Accounting** (tracking what you did).
*   **Non-Repudiation** — Ensuring a user cannot deny having performed an action (achieved via digital signatures and immutable logging).
*   **Defense in Depth (DiD)** — Layering multiple, independent security controls so if one fails, others stand in the way (e.g., Firewall + EDR + MFA).
*   **Zero Trust Architecture (ZTA)** — *"Never Trust, Always Verify."* Assuming the network is already hostile and requiring strict identity and context verification for every single request.
*   **Principle of Least Privilege (PoLP)** — Granting users, processes, and systems only the bare minimum access rights necessary to perform their jobs.
*   **Separation of Duties (SoD)** — Dividing critical tasks among multiple people to prevent fraud or error (e.g., the developer writing the code cannot approve its deployment).
*   **Security by Design & Fail-Safe Defaults** — Integrating security into the blueprint of a system from day one, and ensuring that if a system fails, it fails into a secure, closed state.

---

## 2. Risk, Governance, & Compliance (GRC)
*   **The Risk Equation** — **Risk = Threat × Vulnerability × Impact**. A vulnerability with no threat actor, or a threat with no business impact, alters the risk priority.
*   **Risk Treatment Strategies** — The 4 ways to handle risk: **Mitigate** (deploy a firewall), **Transfer** (buy cyber insurance), **Avoid** (shut down the vulnerable service), or **Accept** (acknowledge the risk and do nothing).
*   **Compliance vs. Privacy vs. Security** — Security is protecting the data; Privacy is respecting user rights to that data (GDPR, CCPA); Compliance is proving it to an auditor (PCI-DSS, HIPAA).
*   **Major Security Frameworks** — The overarching blueprints for organizational security (e.g., NIST Cybersecurity Framework (CSF), ISO 27001, SOC 2).
*   **Asset & Vulnerability Management** — You cannot protect what you don't know exists. The continuous lifecycle of discovering assets, scanning for flaws, and prioritizing patches.
*   **Business Continuity & Disaster Recovery (BCP/DR)** — BCP keeps the business running during a crisis; DR restores IT systems (measured by RTO - Recovery Time Objective, and RPO - Recovery Point Objective).

---

## 3. Identity & Access Management (IAM)
*   **Authentication Factors** — Something you **Know** (password), **Have** (YubiKey), **Are** (biometrics), **Where you Are** (IP/GPS), **Something you Do** (typing cadence).
*   **Identity Federation & SSO** — Allowing users to authenticate once across multiple independent systems using standards like **SAML** (enterprise), **OAuth 2.0** (delegated access), and **OIDC**.
*   **IAM Lifecycle** — The strict, tracked process of Provisioning (onboarding), Modifying (role changes), and Deprovisioning (offboarding) user access.
*   **Access Control Models** — 
    *   **DAC:** Data owner decides access (e.g., Google Docs).
    *   **MAC:** System enforces strict clearance labels (e.g., Military classification).
    *   **RBAC:** Access granted based on job role/function.
    *   **ABAC:** Access granted based on dynamic attributes (time, device health, location).

---

## 4. Cryptography & Data Protection
*   **Symmetric vs. Asymmetric Encryption** — Symmetric uses *one key* for both encryption/decryption (fast, bulk data). Asymmetric uses a *mathematically linked public/private key pair* (slower, used for secure key exchange).
*   **Hashing & Salting** — Hashing is a one-way function turning data into a fixed string to verify integrity. *Salting* adds random data to passwords before hashing to defeat pre-computed dictionary attacks (Rainbow Tables).
*   **Digital Signatures** — Encrypting a hash with a Private Key to prove *both* Integrity and Non-Repudiation (proving who sent it and that it wasn't altered).
*   **Public Key Infrastructure (PKI)** — The ecosystem of Certificate Authorities (CAs) and digital certificates that allows devices to trust each other (the backbone of HTTPS).
*   **The Three States of Data** — Data **At Rest** (on a drive), **In Transit** (across a network), and **In Use** (in RAM). Each requires distinct encryption/protection.

---

## 5. Architecture, Network & Cloud Fundamentals
*   **The OSI Model** — The 7-layer framework of networking (Physical, Data Link, Network, Transport, Session, Presentation, Application). Critical for understanding where attacks and defenses live.
*   **TCP/IP & Core Protocols** — Understanding how data is routed (IP), guaranteed (TCP) or sent quickly without guarantees (UDP), and mapped to essential services (DNS, HTTP/S, SSH).
*   **Network Segmentation & DMZ** — Dividing a flat network using firewalls/VLANs to contain breaches. The Demilitarized Zone (DMZ) safely hosts public-facing servers away from internal data.
*   **The Cloud Shared Responsibility Model** — The hard rule of cloud security: The Provider secures the *Cloud* (physical hardware, hypervisor), the Customer secures what is *in the Cloud* (OS, data, IAM, configurations).

---

## 6. Secure Software Development (AppSec)
*   **Secure SDLC & DevSecOps** — Integrating security testing (SAST, DAST, SCA) directly into the Software Development Life Cycle, shifting security "left" (earlier in the process) rather than testing at the end.
*   **OWASP Top 10** — The foundational awareness document representing the most critical web application security risks (e.g., Broken Access Control, Injection).

---

## 7. Threat Modeling & Attacker Methodology
*   **Vulnerability vs. Exploit vs. Payload** — A *vulnerability* is the flaw (an open window). An *exploit* is the tool used to take advantage of it (a crowbar). The *payload* is the malicious action taken afterward (stealing the TV).
*   **Threat Actor Types** — **APTs** (Nation-states), **Cybercriminals** (Financial/Ransomware), **Hacktivists** (Ideological), and **Insider Threats** (Malicious/Negligent staff).
*   **The Cyber Kill Chain / MITRE ATT&CK** — Frameworks mapping the lifecycle of a cyberattack (Recon, Weaponization, Delivery, Exploitation, C2, Actions on Objectives).
*   **Threat Modeling (STRIDE)** — A proactive framework to find design flaws: **S**poofing, **T**ampering, **R**epudiation, **I**nformation Disclosure, **D**enial of Service, **E**levation of Privilege.

---

## 8. Incident Response & Digital Forensics
*   **NIST Incident Response Lifecycle** — 1. Preparation &rarr; 2. Detection & Analysis &rarr; 3. Containment, Eradication & Recovery &rarr; 4. Post-Incident Activity.
*   **IoCs vs. IoAs** — **Indicators of Compromise** (reactive evidence like known bad IPs or file hashes) vs. **Indicators of Attack** (proactive behavioral patterns like unusual off-hours login spikes).
*   **Order of Volatility** — The forensic rule dictating data must be captured starting with the most fragile (RAM/CPU caches) down to the most permanent (Hard Drives/Backups).
*   **Chain of Custody** — The unbroken, chronological paper trail documenting the seizure, control, transfer, and analysis of digital evidence so it is admissible in court.
