# CISS 100: Introduction to Computing & Information Sciences — Master Study Guide

Welcome to the **CISS 100 (Introduction to Computing & Information Sciences) Master Study Companion**. This definitive reference guide synthesizes the entire 16-module academic curriculum at Hudson Valley Community College (HVCC), covering computing history, computer architecture, hardware physics, operating system kernels, UNIX systems administration, networking, database normalization, enterprise cybersecurity, systems development lifecycles, bash scripting, computing ethics, and the full LAMP/Kali web infrastructure.

---

## 🖥️ Module 01: Foundations of Computing & Linux Architecture

### 1.1–1.4 Foundational Principles & Structural Operations
* **The Principle of Abstraction**: Hiding low-level physical implementation details while exposing a clean, high-level logical interface. Software layers abstract hardware circuits into APIs and operating system calls.
* **The DIKW Hierarchy**:
  $$\text{Data (Raw facts, 0s and 1s)} \rightarrow \text{Information (Contextualized, structured)} \rightarrow \text{Knowledge (Synthesized, actionable)} \rightarrow \text{Wisdom (Evaluative, ethical application)}$$
* **Core Computing Operations Across Three Structural Levels**:
  * **Digital Logic Level**: Boolean gates (`AND`, `OR`, `NOT`, `XOR`) processing binary voltages ($0\text{V} / 5\text{V}$).
  * **System Level**: Machine cycles coordinate memory, CPU registers, and system buses.
  * **Application Level**: High-level program logic executing user-facing tasks.

### 1.5–1.9 Hardware Generations, Architectures & Network Paradigms
* **Five Hardware Generations**:
  1. *First Generation (1940s–1950s)*: Vacuum tubes; magnetic drum memory; machine language.
  2. *Second Generation (1950s–1960s)*: Discrete transistors; assembly and early high-level languages (FORTRAN, COBOL).
  3. *Third Generation (1960s–1970s)*: Integrated Circuits (ICs); keyboards and monitors; shared operating systems.
  4. *Fourth Generation (1970s–Present)*: VLSI microprocessors; personal computing; the Internet.
  5. *Fifth Generation (Current–Emerging)*: Artificial Intelligence, parallel processing, and Quantum Computing.
* **Storage vs. Memory**:
  * **Memory (RAM)**: Volatile, high-speed, byte-addressable execution space for active processes.
  * **Storage (HDD/SSD)**: Non-volatile, persistent, block-based secondary medium.
* **Internet vs. World Wide Web**: The **Internet** is the global physical infrastructure of interconnected networks; the **Web** is an application-level client-server information system operating over the Internet via HTTP/HTTPS.
* **Client-Server & ACE VDI**: End-user client devices request computing resources from centralized servers; HVCC ACE utilizes Virtual Desktop Infrastructure (VDI) running remote virtual machines.

### 1.10–1.12 Technology Acceleration & Linux Philosophy
* **Moore's Law & Digital Divide**: Exponential growth in transistor density versus disparities in technology access across socioeconomic groups.
* **Linux Operating System Philosophy**: Everything is a file; modular, small utilities doing one thing exceptionally well; text streams as the universal interface.

---

## ⚙️ Module 02: Processor Architecture & System Memory

### 2.1–2.3 CPU Micro-Architecture & The Machine Cycle
* **Core CPU Components**:
  * **Control Unit (CU)**: Directs electrical signals, orchestrates instruction flow, and coordinates system buses.
  * **Arithmetic Logic Unit (ALU)**: Performs integer arithmetic and logical comparisons.
  * **Registers**: High-speed, word-sized internal storage cells located directly inside the CPU.
    * *Program Counter (PC)*: Holds memory address of the next instruction to fetch.
    * *Instruction Register (IR)*: Stores the instruction currently being decoded.
    * *Memory Address Register (MAR)* and *Memory Data Register (MDR)*.
    * *Accumulator (ACC)*: Holds intermediate ALU operation outputs.
* **The Machine Cycle**:
  $$\text{Fetch (Instruction from RAM to IR)} \rightarrow \text{Decode (CU interprets opcode)} \rightarrow \text{Execute (ALU executes)} \rightarrow \text{Store (Write result to Register/RAM)}$$
* **Performance Parameters**: Clock Speed (GHz), Multi-Core parallelism, Hyper-Threading (hardware simultaneous multithreading sharing execution pipelines).

### 2.4–2.7 Memory Hierarchy, Bus Architectures & Instruction Sets
* **Memory Hierarchy**:
  $$\text{Registers (1 cycle)} < \text{L1 Cache (4 cycles)} < \text{L2 Cache (12 cycles)} < \text{L3 Cache (40 cycles)} < \text{RAM (100–200 cycles)}$$
* **Motherboard Components**: Chipset (Northbridge/Southbridge legacy $\rightarrow$ Modern unified SoC / Platform Controller Hub), PCIe lanes, SATA channels, System Bus (Address, Data, Control).
* **RISC vs. CISC**:
  * **CISC (Complex Instruction Set Computer)**: Variable-length instructions, complex multi-clock instructions, rich addressing modes (e.g., Intel x86).
  * **RISC (Reduced Instruction Set Computer)**: Fixed-length, single-cycle load/store architecture, optimized for pipeline efficiency (e.g., ARM, RISC-V).
* **Number Systems & Character Encodings**:
  * Binary (Base 2), Decimal (Base 10), Hexadecimal (Base 16).
  * ASCII (7-bit / 128 characters) vs. Unicode UTF-8 (variable 1–4 bytes encoding global languages).

---

## 💾 Module 03: Storage Technologies & Enterprise File Systems

### 3.1–3.3 Magnetic, Solid-State & Enterprise Storage
* **Magnetic HDD Physics**: Spinning magnetic platters, read/write heads, concentric tracks, sectors (512B / 4KB Advanced Format). Heat-Assisted Magnetic Recording (HAMR) increases areal density.
* **Solid-State Storage (SSD)**: Non-volatile NAND flash memory cells (SLC, MLC, TLC, QLC); Wear Leveling distributed block writes; TRIM command; NVMe PCIe interface eliminating legacy SATA/AHCI bottlenecks.
* **Enterprise Storage**:
  * **NAS (Network Attached Storage)**: File-level shared storage over TCP/IP (NFS, SMB).
  * **SAN (Storage Area Network)**: Block-level dedicated high-speed network (Fibre Channel, iSCSI).

### 3.4–3.6 File Systems & RAID Architectures
* **File System Architecture**:
  * **Inodes (Linux/Ext4)**: Data structures storing file metadata (permissions, ownership, timestamps, data block pointers) independent of filename.
  * **NTFS (Windows)**: Master File Table (MFT), permissions via ACLs, journaling.
* **Enterprise RAID Calculations**:
  * **RAID 0 (Striping)**: $N$ drives, capacity $N \times S$, zero fault tolerance (performance only).
  * **RAID 1 (Mirroring)**: $2$ drives, capacity $1 \times S$, $50\%$ storage efficiency, tolerates 1 drive failure.
  * **RAID 5 (Striping with Distributed Parity)**: Minimum 3 drives, capacity $(N - 1) \times S$, tolerates 1 drive failure.
  * **RAID 6 (Dual Distributed Parity)**: Minimum 4 drives, capacity $(N - 2) \times S$, tolerates 2 drive failures.
  * **RAID 10 (Striped Mirrors 1+0)**: Minimum 4 drives, capacity $(N / 2) \times S$, tolerates 1 drive failure per mirrored pair.
* **The 3-2-1 Backup Strategy**: 3 copies of data, across 2 different media types, with 1 copy stored securely off-site.

---

## 🔌 Module 04: Input/Output Systems, Display Hardware & UNIX Streams

### 4.1–4.4 I/O Devices, Display Hardware & Interface Buses
* **Display Technologies**: LCD (LED backlit), OLED (organic self-emissive pixels, perfect black levels), MicroLED. GPU rendering pipeline: Vertex Processing $\rightarrow$ Rasterization $\rightarrow$ Fragment Shading $\rightarrow$ Frame Buffer.
* **Interface Standards**: USB-C (universal reversible 24-pin interconnect), Thunderbolt (multiplexes PCIe and DisplayPort data over USB-C up to 40 Gbps), Direct Memory Access (DMA) transferring data between I/O and RAM without continuous CPU intervention.

### 4.5–4.7 UNIX Standard Streams & Pipeline Redirection
* **The Three Standard POSIX Streams**:
  * **`stdin` (Standard Input - File Descriptor 0)**: Default keyboard input stream.
  * **`stdout` (Standard Output - File Descriptor 1)**: Default terminal display stream.
  * **`stderr` (Standard Error - File Descriptor 2)**: Default unbuffered error reporting stream.
* **Redirection Operators**:
  * `cmd > file`: Redirects stdout, overwriting destination file.
  * `cmd >> file`: Redirects stdout, appending to file.
  * `cmd 2> file`: Redirects stderr to file.
  * `cmd > file 2>&1` or `cmd &> file`: Merges both stdout and stderr into destination.
  * `cmd1 | cmd2`: Pipe operator; connects stdout of `cmd1` directly into stdin of `cmd2`.

---

## 🐧 Module 05: Operating Systems, Kernel Architectures & Linux Permissions

### 5.1–5.5 Kernel Models, Process States & Memory Management
* **Protection Rings**: Ring 0 (Kernel Space - direct hardware execution, privileged instructions) down to Ring 3 (User Space - restricted unprivileged applications).
* **Kernel Architectures**: Monolithic (Linux - all services run in kernel space) vs. Microkernel (Mach/Minix - minimal kernel; services run in user space) vs. Hybrid (Windows NT, macOS XNU).
* **Process Lifecycle**: Created $\rightarrow$ Ready $\leftrightarrow$ Running $\rightarrow$ Waiting/Blocked $\rightarrow$ Terminated.
* **Virtual Memory Architecture**:
  * Memory Management Unit (MMU) translates virtual addresses to physical RAM addresses via Page Tables.
  * **Paging**: Virtual address space divided into fixed-size Pages ($4\text{ KB}$); physical RAM divided into Page Frames.
  * **Page Fault**: Interrupt generated when a requested virtual page is not loaded in physical RAM.
  * **Thrashing**: State where OS spends more time swapping pages between RAM and disk than executing user instructions.

### 5.6–5.8 Linux Permissions & Security Bits
* **File Permissions Bitmask (`rwx`)**:
  * Read (`r` = 4), Write (`w` = 2), Execute (`x` = 1).
  * Triad: User (Owner) | Group | Others. Example: `chmod 755 script.sh` $\rightarrow$ `rwxr-xr-x`.
* **Special Permission Bits**:
  * **SUID (Set User ID - Octal 4000)**: File executes with privileges of the file owner (e.g., `/usr/bin/passwd`).
  * **SGID (Set Group ID - Octal 2000)**: File executes with group owner rights; newly created files in directory inherit parent group.
  * **Sticky Bit (Octal 1000)**: In shared directories (e.g., `/tmp`), users can only delete or rename files they personally own.

---

## 📦 Module 06: Software Engineering, Open Source & Process Management

### 6.1–6.2 Software Engineering & Licensing Models
* **Language Translation**: Compilers (AOT - Ahead of Time native binaries), Interpreters (runtime interpretation), Just-In-Time (JIT) compilers (compiles bytecode into machine code on-the-fly, e.g., JVM, PyPy).
* **Licensing Models**:
  * **Copyleft (GPL)**: Derivative works must remain free and open source under identical licensing terms.
  * **Permissive (MIT, BSD, Apache 2.0)**: Allows reuse within proprietary commercial software with minimal attribution.
  * **Proprietary EULA**: Restricts reverse engineering, redistribution, and source code access.

### 6.3–6.5 Linux Process Management & Signals
* **Process Tree**: `systemd` (PID 1) initializes userspace; processes spawn via `fork()` (clones parent) and `exec()` (overlays new executable image).
* **Process Anomalies**:
  * **Zombie Process**: Process that has terminated execution, but its exit status remains in the process table because parent has not yet read it via `wait()`.
  * **Orphan Process**: Process whose parent terminated before it; automatically adopted by PID 1 (`systemd`).
  * **Daemon**: Background service detached from any controlling terminal.
* **UNIX Signals**:
  * `SIGHUP` (1): Hangup; reload configuration.
  * `SIGINT` (2): Terminal interrupt (`Ctrl+C`).
  * `SIGQUIT` (3): Quit with core dump (`Ctrl+\`).
  * `SIGKILL` (9): Immediate unconditional process termination (cannot be caught or ignored).
  * `SIGTERM` (15): Graceful termination request (default for `kill`).

---

## 🌐 Module 07: Networking Fundamentals, Topologies & OSI/TCP-IP Models

### 7.1–7.5 Topologies, Hardware & Protocol Stacks
* **Topologies**: Physical Star (central switch), Extended Star, Full Mesh ($N(N-1)/2$ links), Bus, Ring.
* **Network Devices**: NIC (Layer 1/2), Switch (Layer 2 MAC forwarding), Router (Layer 3 IP packet forwarding).
* **OSI 7-Layer Model vs. TCP/IP 4-Layer Stack**:
  * 7: Application | 6: Presentation | 5: Session $\rightarrow$ **TCP/IP Application** (Data).
  * 4: Transport $\rightarrow$ **Transport** (TCP Segments / UDP Datagrams).
  * 3: Network $\rightarrow$ **Internet** (IP Packets).
  * 2: Data Link | 1: Physical $\rightarrow$ **Network Access** (Frames / Bits).

### 7.6–7.8 Addressing, Subnetting & Transport Mechanics
* **IPv4 Address Structure**: 32-bit address; Network ID + Host ID defined by subnet mask / CIDR prefix.
  * RFC 1918 Private Ranges: `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`.
* **IPv6 Architecture**: 128-bit hexadecimal addresses eliminating NAT requirements; Global Unicast (`2000::/3`), Link-Local (`fe80::/10`).
* **TCP vs. UDP**:
  * **TCP**: Connection-oriented 3-way handshake (`SYN` $\rightarrow$ `SYN-ACK` $\rightarrow$ `ACK`), sequence numbers, acknowledgments, sliding window flow control.
  * **UDP**: Connectionless, lightweight, low-overhead datagrams without retransmission (VoIP, DNS, video streaming).

---

## 🌍 Module 08: Global Internet Architecture, Web Systems & Shell Environment

### 8.1–8.5 The Global Web & Multi-Tier Architecture
* **Global Internet Routing**: ARPANET origins $\rightarrow$ Autonomous Systems (AS) managed by Tier 1 Transit ISPs, interconnected at Internet Exchange Points (IXPs) using Border Gateway Protocol (BGP).
* **Domain Name System (DNS)**: Distributed hierarchical database (Root servers `.` $\rightarrow$ TLD servers `.com` $\rightarrow$ Authoritative nameservers).
* **HTTP Protocol Evolution**:
  * HTTP/1.1: Persistent TCP connections, text-based headers.
  * HTTP/2: Binary framing, multiplexed streams over a single TCP connection, header compression (HPACK).
  * HTTP/3: Uses QUIC protocol over UDP to eliminate head-of-line blocking.
  * TLS 1.3: Ephemeral Diffie-Hellman key exchange providing Forward Secrecy.
* **3-Tier Web Architecture**: Presentation Layer (Web Server / HTML/CSS/JS) $\leftrightarrow$ Application Logic Layer (PHP/Python/Node) $\leftrightarrow$ Data Layer (RDBMS / MySQL).

### 8.6–8.9 Linux Shell Environment & Customization
* **Variables**: Local variables (`VAR=val`) vs. Exported Environment variables (`export VAR=val`).
* **Command Lookup Order**: Aliases $\rightarrow$ Shell Reserved Words $\rightarrow$ Functions $\rightarrow$ Builtins $\rightarrow$ Executables listed in `$PATH`.
* **Startup Scripts**: `.bash_profile` (login shells) vs. `.bashrc` (non-login interactive subshells).

---

## 🗄️ Module 09: Database Systems, Normalization & Text Processing

### 9.1–9.5 The Relational Model, Normalization & ACID
* **Relational Concepts (Edgar F. Codd)**:
  * Relation = Table; Tuple = Record/Row; Attribute = Field/Column.
  * Primary Key (unique identifier), Foreign Key (references PK in another relation enforcing Referential Integrity).
* **Database Normalization**:
  * **1NF (First Normal Form)**: Atomic values; no repeating groups; unique primary key.
  * **2NF (Second Normal Form)**: Must be in 1NF; eliminates partial functional dependencies (every non-key attribute fully functionally dependent on the whole candidate key).
  * **3NF (Third Normal Form)**: Must be in 2NF; eliminates transitive functional dependencies (no non-key attribute depends on another non-key attribute).
* **ACID Transaction Guarantees**:
  * **Atomicity**: All operations in transaction succeed or entire transaction is rolled back.
  * **Consistency**: Database transitions only between valid states satisfying constraints.
  * **Isolation**: Concurrent transactions execute without cross-contamination.
  * **Durability**: Committed transactions persist permanently even across power failures.

### 9.6–9.10 SQL & UNIX Stream Text Processing
* **SQL Categories**:
  * DDL (Data Definition Language): `CREATE`, `ALTER`, `DROP`, `TRUNCATE`.
  * DML (Data Manipulation Language): `SELECT`, `INSERT`, `UPDATE`, `DELETE`.
* **Stream Text Tools**:
  * `cut -d: -f1,3 /etc/passwd`: Field extraction.
  * `awk -F: '$3 >= 1000 {print $1, $3}' /etc/passwd`: Programmable pattern scanning and field processing.
  * `sed -i 's/old/new/g' file.txt`: Stream editor for non-interactive text transformations.

---

## 🔒 Module 10: Cybersecurity, Threat Modeling, Cryptography & Identity

### 10.1–10.3 The Security Triad & Attack Vectors
* **The CIA Triad**: Confidentiality (encryption, access controls), Integrity (hashing, digital signatures), Availability (redundancy, DDoS defenses).
* **Malware Taxonomy**:
  * **Virus**: Replicating code requiring human host file execution.
  * **Worm**: Self-replicating standalone malware propagating autonomously across networks.
  * **Trojan**: Malicious payload disguised as legitimate software.
  * **Ransomware**: Encrypts victim data and extorts payment for decryption keys.
  * **Rootkit**: Subverts OS kernel to conceal processes and grant stealth administrative access.
* **Social Engineering**: Phishing, Spear Phishing (targeted), Whaling (executive target), Pretexting, Baiting.

### 10.4–10.9 Cryptography & Linux User Governance
* **Symmetric vs. Asymmetric Encryption**:
  * **Symmetric (AES, ChaCha20)**: Single shared secret key for encryption and decryption; extremely fast bulk cipher.
  * **Asymmetric (RSA, ECC)**: Key pair; Public Key encrypts / verifies; Private Key decrypts / signs.
* **Cryptographic Hashes & Signatures**: SHA-256 (one-way collision-resistant digest); Digital Signatures encrypt message hash with sender's Private Key.
* **Linux Account Security**:
  * `/etc/passwd`: World-readable account registry (`username:x:UID:GID:GECOS:home:shell`).
  * `/etc/shadow`: Root-only protected file containing salted one-way password hashes (e.g., `$6$` for SHA-512).
  * `/etc/sudoers`: Fine-grained privilege escalation managed via `visudo`.

---

## 🔄 Module 11: Systems Analysis, SDLC Methodologies & Task Automation

### 11.1–11.5 Systems Development Lifecycle & Modeling
* **SDLC Five Core Phases**: Planning $\rightarrow$ Analysis $\rightarrow$ Design $\rightarrow$ Implementation $\rightarrow$ Maintenance.
* **Methodologies**:
  * **Waterfall**: Linear sequential phase completion; rigorous documentation; high resistance to change.
  * **Agile / Scrum**: Iterative sprints; minimum viable product (MVP); continuous user feedback.
* **TELOS Feasibility**: Technical, Economic (Cost-Benefit / ROI), Legal, Operational, Schedule feasibility.
* **Conversion Strategies**: Direct Cutover (instant switch; highest risk), Parallel (both systems run simultaneously; safest, costliest), Pilot (tested at single branch/site), Phased (modular gradual deployment).

### 11.6–11.9 Linux Automation with Cron
* **Crontab Five-Field Time Specification**:
  $$\begin{matrix} \text{Minute} & \text{Hour} & \text{Day of Month} & \text{Month} & \text{Day of Week} \\ (0\text{–}59) & (0\text{–}23) & (1\text{–}31) & (1\text{–}12) & (0\text{–}7,\ 0/7=\text{Sun}) \end{matrix}$$
* **Examples**:
  * `0 2 * * * /scripts/backup.sh >/dev/null 2>&1`: Daily at 2:00 AM.
  * `*/15 * * * 1-5 /scripts/monitor.sh`: Every 15 minutes, Monday through Friday.

---

## 💻 Module 12: Algorithmic Thinking, Bash Scripting & Cloud Computing

### 12.1–12.8 Algorithmic Logic & Bash Programming
* **Three Control Structures**: Sequence, Selection (`if/elif/else`), Iteration (`for/while/until`).
* **Bash Script Mechanics**:
  * Shebang: `#!/bin/bash` defines interpreter binary.
  * Exit Status: `$?` stores return code ($0 = \text{success}$, non-zero = error).
  * Positional Parameters: `$0` (script name), `$1` (first arg), `$#` (arg count), `$@` (all args).
  * Conditionals: `[ "$a" -eq "$b" ]` (integers) vs. `[ "$str1" = "$str2" ]` (strings).

### 12.9–12.10 Cloud Computing & Containerization
* **Cloud Service Models**:
  * **IaaS (Infrastructure as a Service)**: Raw compute, storage, networking (AWS EC2).
  * **PaaS (Platform as a Service)**: Managed runtime environment for code execution (Heroku, AWS Elastic Beanstalk).
  * **SaaS (Software as a Service)**: End-user applications delivered over the web (Microsoft 365, Google Workspace).
* **Virtualization vs. Containers**:
  * **Type-1 Hypervisor (Bare-metal - ESXi, KVM)**: Runs directly on hardware.
  * **Type-2 Hypervisor (Hosted - VirtualBox)**: Runs on host OS.
  * **Containers (Docker)**: Shares host Linux kernel; isolates processes via cgroups and namespaces (lightweight, megabytes vs. gigabytes).

---

## ⚖️ Module 13: Computing Ethics, Cyber Law & Emergent Technologies

### 13.1–13.7 Ethics, Cyber Legislation & Intellectual Property
* **Philosophical Ethics**:
  * **Deontology (Kant)**: Duty-based ethics; moral rules are universal imperatives regardless of outcome.
  * **Utilitarianism (Mill)**: Consequentialist ethics; maximize greatest good for the greatest number.
  * **Virtue Ethics (Aristotle)**: Character-driven moral decisions.
* **Corporate Governance**: Friedman Stockholder Theory (maximize shareholder profit within law) vs. Freeman Stakeholder Theory (serve customers, employees, suppliers, society).
* **Intellectual Property**:
  * Copyright (protects original expression of code/content).
  * Patent (protects novel functional processes/algorithms).
  * Trademark (brand identity).
  * Trade Secret (confidential business advantage, e.g., Coca-Cola formula, Google PageRank).
* **Cyber Law**: Computer Fraud and Abuse Act (CFAA), GDPR (EU data protection and right to be forgotten), CCPA (California consumer privacy).

### 13.8–13.10 Emergent Technologies
* **Artificial Intelligence**: Machine learning algorithms, algorithmic bias, black-box decision risks.
* **Quantum Computing**: Qubits utilizing Superposition and Entanglement; Shor's Algorithm threatening classical RSA/ECC; Post-Quantum Cryptography (PQC).
* **Neuromorphic Computing & Green IT**: Spiking neural network hardware; reducing datacenter carbon footprints.

---

## 🚀 Module 14: Enterprise Linux Administration, LAMP Stack & Security Auditing

### 14.1–14.4 The LAMP Stack Architecture
* **LAMP Components**: **L**inux (Base OS) + **A**pache (HTTP Web Server) + **M**ySQL/MariaDB (RDBMS) + **P**HP (Server-side dynamic preprocessor).
* **Database Provisioning**:
  ```sql
  CREATE DATABASE ciss100_db;
  CREATE USER 'ciss_user'@'localhost' IDENTIFIED BY 'StrongSecret123!';
  GRANT ALL PRIVILEGES ON ciss100_db.* TO 'ciss_user'@'localhost';
  FLUSH PRIVILEGES;
  ```
* **Web Security Hardening**: Restrict `/var/www/html` write permissions; disable directory indexing (`Options -Indexes`); enforce HTTPS virtual hosts.

### 14.5–14.6 Security Auditing & Inspection Tools
* **Nmap**: Network mapper for host discovery and port auditing (`nmap -sS -sV -T4 target_ip`).
* **Nikto**: Web server vulnerability scanner inspecting dangerous files and outdated software.
* **Wireshark**: Deep packet inspection analyzing protocol handshakes and plaintext credential leaks.

---

## 🎓 Module 15: Capstone Architecture, Linux Command Master Matrix & Final Review

### 15.1–15.4 Capstone & Linux Command Matrix
* **Comprehensive Linux Command Master Matrix**:
  * Navigation: `pwd`, `cd`, `ls -la`.
  * File Management: `cp`, `mv`, `rm -rf`, `touch`, `mkdir -p`.
  * Permissions: `chmod`, `chown`, `chgrp`, `umask`.
  * Text Streams: `cat`, `less`, `head`, `tail -f`, `grep -E`, `awk`, `sed`, `sort`, `uniq`.
  * Process Control: `ps aux`, `top`, `kill -9`, `pkill`, `jobs`, `bg`, `fg`.
  * Network Triage: `ip addr`, `ping`, `ss -tulpn`, `traceroute`, `curl -I`, `ssh`.
  * Automation: `crontab -e`, `tar -czvf`, `find / -name`.
* **Final Exam Synthesis**: Mastering architectural cross-connections across all 15 academic modules.

---

## 🌟 Module 16: Academic Synthesis, Transfer Planning & Professional Horizons

### 16.1–16.3 Academic Governance & Industry Certifications
* **HVCC Degree Works Audit**: Program completion verification, general education requirements, 4-year institutional transfer articulation agreements.
* **Industry Certification Roadmaps**:
  * CompTIA A+ (Core hardware, operating systems, help desk fundamentals).
  * CompTIA Network+ / Cisco CCNA (Enterprise routing, switching, TCP/IP architecture).
  * CompTIA Security+ / CEH (Threat intelligence, defensive controls, ethical hacking).
  * Linux Professional Institute LPIC-1 / Red Hat RHCSA (Enterprise systems administration).
  * AWS Certified Cloud Practitioner / Solutions Architect (Public cloud infrastructure).
