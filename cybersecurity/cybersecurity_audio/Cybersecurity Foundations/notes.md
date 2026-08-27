# Cybersecurity Foundation Master Study Guide

Welcome to the **Cybersecurity Master Foundation Index**. This guide serves as the foundational bedrock for the cybersecurity curriculum, breaking down core concepts across all 12 major security domains—from CIA Triad primitives and GRC frameworks to PKI cryptography, cloud shared responsibility, STRIDE threat modeling, SOC operations, and DFIR forensics.

---

## 🛡️ 1. Core Security Principles (The Absolute Basics)

* **The CIA Triad**: The ultimate foundational triad of security:
  * **Confidentiality**: Ensuring data privacy and preventing unauthorized disclosure.
  * **Integrity**: Guaranteeing data accuracy and protecting against unauthorized modification.
  * **Availability**: Ensuring systems, services, and data are accessible when needed by authorized users.
* **The AAA Framework**: The complete entity identity lifecycle:
  * **Authentication**: Proving identity (e.g., entering a password or biometrics).
  * **Authorization**: Determining access permissions once identity is verified.
  * **Accounting (Auditing)**: Tracking and logging entity activities for auditing and accountability.
* **Non-Repudiation**: Ensuring an actor cannot deny performing an action or transaction (achieved through asymmetric digital signatures and immutable logging).
* **Defense in Depth (DiD)**: Layering multiple independent security controls (e.g., Firewall + EDR + MFA) so that if one control fails, subsequent layers prevent compromise.
* **Zero Trust Architecture (ZTA)**: *"Never Trust, Always Verify."* Assumes the internal network is untrusted and requires strict, continuous identity and context verification for every request.
* **Principle of Least Privilege (PoLP)**: Granting entities (users, processes, devices) only the bare minimum permissions necessary to perform authorized duties.
* **Separation of Duties (SoD)**: Dividing critical tasks among multiple individuals to prevent fraud, collusion, or single-point human errors.
* **Security by Design & Fail-Safe Defaults**: Integrating security into system blueprints from inception, ensuring systems fail into a secure, closed state.

---

## 📊 2. Risk, Governance, & Compliance (GRC)

* **The Risk Equation**: $\text{Risk} = \text{Threat} \times \text{Vulnerability} \times \text{Impact}$. A vulnerability without an active threat or business impact alters risk prioritization.
* **Risk Treatment Strategies**:
  1. **Mitigate**: Implement security controls (e.g., deploy firewalls or patches).
  2. **Transfer**: Shift financial liability to a third party (e.g., cyber insurance).
  3. **Avoid**: Eliminate the risky activity entirely (e.g., disable an unsafe legacy service).
  4. **Accept**: Acknowledge the residual risk within tolerance limits without taking action.
* **Compliance vs. Privacy vs. Security**:
  * **Security**: Technical and administrative protections safeguarding data assets.
  * **Privacy**: Protecting individual rights over personal data usage (GDPR, CCPA).
  * **Compliance**: Proving adherence to regulatory or industry standards to external auditors (PCI-DSS, HIPAA, SOC 2).
* **Major Security Frameworks**:
  * **NIST CSF 2.0**: Identify, Protect, Detect, Respond, Recover, Govern.
  * **ISO/IEC 27001**: International standard for Information Security Management Systems (ISMS).
  * **CIS Benchmarks**: Prescriptive technical hardening guidelines for OS and network assets.
* **Asset & Vulnerability Management**: Continuous asset discovery, vulnerability scanning (CVE/NVD), and risk prioritization via CVSS scoring.
* **Business Impact Analysis (BIA) & BCP/DR**:
  * **BIA**: Identifies critical business functions and downtime costs.
  * **RTO (Recovery Time Objective)**: Target time duration to restore business operations after disruption.
  * **RPO (Recovery Point Objective)**: Maximum acceptable age of data lost during a disruption.

---

## 🔑 3. Identity & Access Management (IAM)

* **Authentication Factors**:
  * **Something You Know**: Password, PIN.
  * **Something You Have**: Hardware token, YubiKey, TOTP authenticator app.
  * **Something You Are**: Fingerprint, retina, facial recognition biometrics.
  * **Somewhere You Are**: Geolocation, IP address restrictions.
  * **Something You Do**: Behavioral typing cadence or signature dynamics.
* **Identity Federation & Single Sign-On (SSO)**: Authenticating once to access multiple applications:
  * **SAML 2.0**: XML-based enterprise authentication protocol.
  * **OAuth 2.0**: Delegated authorization framework.
  * **OIDC (OpenID Connect)**: Identity layer built on top of OAuth 2.0.
* **IAM Lifecycle**: Formal tracking of Provisioning (onboarding), Role Modification (transfers), and Deprovisioning (offboarding).
* **Access Control Models**:
  * **DAC (Discretionary Access Control)**: Data owner decides permissions for subjects.
  * **MAC (Mandatory Access Control)**: System-enforced access based on clearance levels and security labels.
  * **RBAC (Role-Based Access Control)**: Permissions assigned based on organizational job roles.
  * **ABAC (Attribute-Based Access Control)**: Dynamic policies based on subject, resource, and environmental attributes.

---

## 🔒 4. Cryptography & Data Protection

* **Symmetric vs. Asymmetric Encryption**:
  * **Symmetric**: Single shared key for encryption and decryption (AES-256); fast, ideal for bulk data.
  * **Asymmetric**: Mathematically linked Public/Private key pairs (RSA, ECC); used for key exchange and digital signatures.
* **Hashing & Salting**:
  * **Hashing**: One-way deterministic function verifying data integrity (SHA-256).
  * **Salting**: Appending unique random bytes before hashing to prevent pre-computed Rainbow Table attacks.
* **Digital Signatures**: Encrypting a message digest with a Private Key to ensure Integrity, Authenticity, and Non-Repudiation.
* **Public Key Infrastructure (PKI)**: Trusted framework of Certificate Authorities (CAs), Registration Authorities (RAs), and X.509 digital certificates enabling TLS/HTTPS communications.
* **Diffie-Hellman & Perfect Forward Secrecy (PFS)**: Secure key exchange over untrusted channels. PFS ensures compromise of long-term server keys does not decrypt past recorded sessions.
* **The Three Data States**:
  * **Data at Rest**: Storage volumes protected via BitLocker / AES-256.
  * **Data in Transit**: Network traffic encrypted via TLS 1.3 / IPsec.
  * **Data in Use**: Active memory protected via hardware enclaves / Confidential Computing.

---

## 🌐 5. Network Security, Architecture, & Perimeter Controls

* **The OSI Model**: 7-layer communication framework:
  1. Physical (Bits/Cables)
  2. Data Link (Frames/MAC)
  3. Network (Packets/IP)
  4. Transport (Segments/TCP/UDP)
  5. Session (Sockets)
  6. Presentation (SSL/TLS Encryption/Formatting)
  7. Application (HTTP/DNS/SSH)
* **TCP/IP & Core Protocols**: IP routing, TCP reliable 3-way handshake (`SYN` -> `SYN-ACK` -> `ACK`), UDP fast datagrams, DNS, DHCP, HTTP/S, SSH, NTP.
* **Firewall Architectures**:
  * **Stateless**: Filters traffic based solely on static IP/port rules.
  * **Stateful**: Tracks active connection states in state tables.
  * **NGFW**: Next-Generation Firewall featuring Deep Packet Inspection (DPI) and layer 7 application awareness.
  * **WAF**: Web Application Firewall protecting web services against OWASP attacks.
* **Detection & Prevention (IDS/IPS)**:
  * **IDS**: Passive network monitor generating alerts.
  * **IPS**: In-line active prevention blocking malicious packets.
  * Detection modes: Signature-based vs. Anomaly/Behavioral-based.
* **Network Segmentation & DMZ**: Isolating network zones via VLANs and firewalls. Demilitarized Zones (DMZs) expose public web servers while protecting internal corporate LANs.
* **Remote Access & Wireless Security**: IPsec/SSL VPN tunnels, Bastion hosts, WPA3 Enterprise (802.1X, EAP-TLS authentication).

---

## ☁️ 6. Cloud Security & Modern Infrastructure

* **Cloud Service Models**:
  * **IaaS**: Infrastructure as a Service (Virtual Machines, Storage, Virtual Networks).
  * **PaaS**: Platform as a Service (Managed databases, runtime environments).
  * **SaaS**: Software as a Service (Fully managed web applications).
* **Cloud Shared Responsibility Model**:
  * **Cloud Provider**: Responsible for security OF the cloud (physical infrastructure, hypervisors).
  * **Cloud Customer**: Responsible for security IN the cloud (data, IAM policies, OS configurations).
* **Cloud Management Tools**:
  * **CASB**: Cloud Access Security Broker enforcing corporate security policies for cloud application usage.
  * **CSPM**: Cloud Security Posture Management scanning for misconfigurations and compliance drift.
  * **CWPP**: Cloud Workload Protection Platform securing workloads across VMs, containers, and serverless.
* **Container & Microservices Security**: Image vulnerability scanning, isolating Docker containers, enforcing Kubernetes RBAC and NetworkPolicies.

---

## 💻 7. Secure Software Development (AppSec)

* **Secure SDLC & DevSecOps**: Integrating automated security testing into CI/CD pipelines (Shifting Left):
  * **SAST**: Static Application Security Testing (source code analysis).
  * **DAST**: Dynamic Application Security Testing (black-box runtime testing).
  * **SCA**: Software Composition Analysis (auditing third-party open-source dependencies).
* **OWASP Top 10 Web Application Vulnerabilities**:
  1. Broken Access Control
  2. Cryptographic Failures
  3. Injection (SQLi, Command Injection, XSS)
  4. Insecure Design
  5. Security Misconfiguration
  6. Vulnerable and Outdated Components
  7. Identification and Authentication Failures
  8. Software and Data Integrity Failures
  9. Security Logging and Monitoring Failures
  10. Server-Side Request Forgery (SSRF)

---

## 🕵️ 8. Threat Modeling, Intelligence, & Attacker Methodology

* **Core Definitions**:
  * **Vulnerability**: Flaw or weakness in system design or code.
  * **Exploit**: Method or code leveraging a vulnerability to gain unauthorized access.
  * **Payload**: Malicious action executed post-exploitation (e.g., reverse shell).
* **Threat Actor Profiles**: Nation-state APTs, Financially Motivated Cybercriminals, Hacktivists, Script Kiddies, Accidental or Malicious Insiders.
* **Cyber Threat Intelligence (CTI)**: Actionable indicator collection via OSINT, commercial intelligence, and STIX/TAXII standards.
* **Attacker Frameworks**:
  * **Cyber Kill Chain**: Reconnaissance -> Weaponization -> Delivery -> Exploitation -> Installation -> Command & Control -> Actions on Objectives.
  * **MITRE ATT&CK**: Knowledge base mapping real-world adversary Tactics, Techniques, and Procedures (TTPs).
* **STRIDE Threat Modeling**:
  * **S**: Spoofing Identity
  * **T**: Tampering with Data
  * **R**: Repudiation
  * **I**: Information Disclosure
  * **D**: Denial of Service
  * **E**: Elevation of Privilege

---

## 🎯 9. Security Operations, Monitoring, & Endpoint Defense (SOC)

* **SIEM (Security Information & Event Management)**: Centralizes, aggregates, and correlates log telemetry across Windows Event Logs, Syslog, Firewalls, and EDR for real-time threat detection.
* **SOAR (Security Orchestration, Automation, & Response)**: Automated response playbooks executing security actions (e.g., auto-blocking IP addresses or revoking tokens).
* **EDR & XDR**: Endpoint Detection & Response providing continuous host behavioral analysis to detect fileless malware and living-off-the-land techniques.

---

## 🎣 10. Social Engineering & The Human Element

* **Social Engineering Attack Vectors**:
  * **Phishing**: Broad email lure harvesting credentials or installing malware.
  * **Spear Phishing / Whaling**: Highly targeted phishing against specific individuals / corporate executives.
  * **Vishing / Smishing**: Voice call phishing / SMS text message phishing.
  * **Watering Hole**: Compromising websites frequently visited by target groups.
  * **Pretexting**: Fabricating scenarios to trick victims into releasing data.
  * **Tailgating / Piggybacking**: Unauthorized physical access following authorized personnel.
* **Security Awareness Training**: Ongoing phishing simulations, security policy training, and fostering a strong security culture.

---

## 🚨 11. Incident Response, Forensics, & Business Metrics

* **NIST Incident Response Lifecycle**:
  1. **Preparation**: Developing playbooks, tools, and response teams.
  2. **Detection & Analysis**: Identifying, triaging, and confirming security incidents.
  3. **Containment, Eradication & Recovery**: Isolating systems, removing malware, and restoring operations.
  4. **Post-Incident Activity**: Conducting lessons learned meetings and updating controls.
* **Indicators of Compromise (IoCs) vs. Indicators of Attack (IoAs)**:
  * **IoCs**: Reactive forensic artifacts (file hashes, malicious IP logs).
  * **IoAs**: Proactive behavioral patterns indicating an attack in progress.
* **Digital Forensics & Order of Volatility**: Preserving evidence starting from most volatile:
  $$\text{CPU Registers/Cache} \rightarrow \text{RAM} \rightarrow \text{Network State} \rightarrow \text{Disk Storage} \rightarrow \text{Archival Media}$$
* **Chain of Custody**: Documented chronological record establishing evidence collection, handling, and custody to ensure court admissibility.
* **Operational Metrics**:
  * **MTTD**: Mean Time to Detect threats.
  * **MTTR**: Mean Time to Respond / Repair.
  * **MTBF**: Mean Time Between Failures.

---

## 🏢 12. Physical & Environmental Security

* **Physical Access Controls**: Bollards, security perimeter fencing, CCTV surveillance, access control vestibules (mantraps), smart cards, biometric scanners, security guards.
* **Environmental Controls**: HVAC systems managing temperature and humidity, clean-agent fire suppression (FM-200, Novec 1230), EMI shielding (Faraday cages).
* **Infrastructure Protection**: Kensington cable locks, lockable server racks, USB port locks, TPM (Trusted Platform Module), and Hardware Security Modules (HSMs) protecting cryptographic keys.
