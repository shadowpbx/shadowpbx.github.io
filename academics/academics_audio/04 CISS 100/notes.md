# CISS 100: Introduction to Computing — Master Study Guide

Welcome to the **CISS 100 (Introduction to Computing & Information Sciences) Master Study Guide**. This comprehensive reference covers all 16 lecture modules across hardware architecture, Linux systems administration, operating system internals, networking, relational database theory, cybersecurity, systems analysis, shell automation, and enterprise LAMP stack deployment.

---

## 🏛️ Week 01: Foundations of Computing, Architecture & Linux (LM1)

### 1.1 The Birth of Digital Computing & The Information Cycle
* **Data vs. Information vs. Knowledge**:
  * **Data**: Raw, unorganized symbols and numbers without inherent meaning (e.g., `900123456`).
  * **Information**: Processed, contextualized, structured data delivering meaning (e.g., `Student ID: H00000000, Grade: A`).
  * **Knowledge**: Synthesized information combined with experience and rules to drive action.
* **The IPOS Cycle**:
  * **Input**: Capturing raw data from peripheral sensors, keyboards, mice, network packets.
  * **Processing**: Arithmetic and logical data manipulation executed by the CPU.
  * **Output**: Presenting processed information via monitors, printers, speakers, network responses.
  * **Storage**: Non-volatile persistence of data on magnetic, solid-state, or optical media.
* **The Computing Triad**: **Hardware** (physical silicon/circuitry), **Software** (instructions/logic), and **Peopleware** (engineers, sysadmins, end users).

### 1.2 Von Neumann Architecture & Stored-Program Model
* **Core Components**:
  * **Central Processing Unit (CPU)**: Contains the Arithmetic Logic Unit (ALU), Control Unit (CU), and high-speed internal Registers.
  * **Main Memory (RAM)**: Linear addressable memory space storing both executable program instructions and operational data.
  * **Input/Output (I/O) Interfaces**: Bridges internal system buses to external peripherals.
  * **System Bus**: Control Bus, Address Bus (unidirectional CPU $\rightarrow$ RAM), and Data Bus (bidirectional).
* **The Von Neumann Bottleneck**: Throughput limitation caused by CPU processing speeds vastly outpacing memory bus bandwidth across a single shared bus, motivating multi-level cache hierarchies ($L_1, L_2, L_3$).

### 1.3 Number Systems & Low-Level Data Representation
* **Positional Number Systems**:
  * **Binary (Base 2)**: Bits `0` and `1`. $1\text{ Byte} = 8\text{ bits}$.
  * **Hexadecimal (Base 16)**: `0–9`, `A–F` ($A=10 \dots F=15$). Every hex digit maps directly to 4 binary bits (a nibble). Example: `0x7F = 0111 1111_2 = 127_{10}`.
* **Signed Integer Representation**: **Two's Complement** arithmetic. Invert all bits and add 1 ($~x + 1$) to represent negative values, enabling subtraction using existing addition circuitry.
* **Character Encodings**: **ASCII** (7-bit, 128 characters) vs **Unicode (UTF-8)** (variable-width 1–4 bytes supporting all global writing systems and emojis).

### 1.4 The Linux Philosophy & Operating System Foundations
* **The UNIX / Linux Paradigm**:
  1. *Small is beautiful*: Write modular programs that do one specific thing exceptionally well.
  2. *Everything is a file*: Disks, directories, serial ports, printers, process memory (`/proc`), and network sockets are exposed as standard file streams.
  3. *Combine programs via pipelines*: Text streams serve as universal interface protocols.
* **Kernel Space vs User Space**:
  * **Ring 0 (Supervisor Mode)**: Full unrestricted hardware access for the monolithic Linux kernel, device drivers, and memory management.
  * **Ring 3 (User Space)**: Sandboxed execution mode for user applications, shells, and daemons, requiring **System Calls** (`syscall`) to access hardware.

### 1.5 Linux Lab 1: Terminal Basics
* **Essential Commands**: `whoami` (current user), `uname -a` (kernel and architecture release), `pwd` (print working directory), `cat /etc/os-release` (OS distribution information).

---

## ⚡ Week 02: Hardware Architecture & Silicon Engineering (LM2)

### 2.1 Inside the CPU: Fetch-Decode-Execute Cycle & Pipelines
* **Machine Instruction Cycle**:
  1. **Fetch**: Control Unit retrieves instruction from memory address pointed to by the **Program Counter (PC)** into the **Instruction Register (IR)**; PC increments.
  2. **Decode**: Instruction Decoder interprets opcode and operand addresses.
  3. **Execute**: ALU performs arithmetic or logical operation, storing output in registers or memory.
  4. **Store / Write-back**: Results written back to destination register or RAM.
* **Instruction Pipelining**: Breaking instruction execution into discrete overlapping stages (Fetch, Decode, Execute, Memory, Write-back) to achieve throughput of 1 instruction per clock cycle under ideal conditions.

### 2.2 The Memory Hierarchy
* **Latency & Speed Continuum**:
  $$\text{Registers (< 1 ns)} \rightarrow \text{L1 Cache (1–2 ns)} \rightarrow \text{L2 Cache (3–5 ns)} \rightarrow \text{L3 Cache (10–20 ns)} \rightarrow \text{DRAM (50–100 ns)} \rightarrow \text{NVMe SSD (10–50 }\mu\text{s)} \rightarrow \text{HDD (5–10 ms)}$$
* **Locality of Reference**:
  * **Temporal Locality**: Recently accessed memory locations are likely to be accessed again in the near future (e.g., loop counters).
  * **Spatial Locality**: Memory locations physically adjacent to recently accessed addresses are likely to be accessed soon (e.g., sequential array traversal).

### 2.3 Motherboards, Chipsets & System Buses
* **PCIe Architecture**: Point-to-point serial communication using dedicated differential signaling lanes ($\times 1, \times 4, \times 8, \times 16$).
* **Direct Memory Access (DMA)**: Hardware mechanism allowing high-speed I/O devices (NICs, NVMe drives) to transfer data directly to/from RAM without continuous CPU cycle intervention.

### 2.4 Linux Lab 2: Remote Access & File System Hierarchy
* **SSH Protocol**: Secure remote terminal connection (`ssh user@acadnx.hvcc.edu`).
* **Linux Filesystem Hierarchy Standard (FHS)**:
  * `/`: Root directory.
  * `/bin`, `/usr/bin`: Primary user executables.
  * `/etc`: System-wide configuration files.
  * `/home`: User home directories.
  * `/var`: Variable runtime data (logs, spools, web root `/var/www`).
  * `/proc`, `/sys`: Virtual memory filesystems exposing kernel and hardware states.

---

## 💾 Week 03: Storage Architectures & File Systems (LM3)

### 3.1 Magnetic HDDs vs NAND Flash SSDs
* **Hard Disk Drives (HDD)**: Mechanical platters, spindle motors, actuator arms, and magnetic read/write heads. Characterized by rotational latency and mechanical seek times.
* **Solid-State Drives (SSD)**: Floating-gate and Charge-Trap NAND flash memory cells (SLC, MLC, TLC, QLC). Managed by an onboard flash controller implementing wear leveling and **TRIM** garbage collection commands.

### 3.2 File Systems Deep-Dive: Inodes & Ext4
* **Inodes (Index Nodes)**: Data structures storing file metadata (file type, permissions, owner UID, group GID, file size, timestamps `atime`/`mtime`/`ctime`, direct and indirect block pointers) *excluding the filename*.
* **Hard Links vs Symbolic Links**:
  * **Hard Link (`ln source target`)**: Direct pointer to an existing inode. Sharing same inode number; deleting original file retains data until all hard link counts reach zero. Cannot span across different filesystems.
  * **Soft / Symbolic Link (`ln -s source target`)**: Special pointer file containing the textual pathname of the target. Has its own unique inode; becomes dangling if target is moved or deleted.

### 3.3 RAID Storage Arrays
* **RAID 0 (Striping)**: Data split across $\ge 2$ disks. Maximum performance, 0% redundancy (single drive failure destroys array).
* **RAID 1 (Mirroring)**: Duplicate data across $\ge 2$ disks. 100% redundancy, 50% storage capacity.
* **RAID 5 (Distributed Parity)**: Block striping with distributed XOR parity across $\ge 3$ disks. Tolerates 1 drive failure. Capacity: $(N - 1) \times \text{Size}$.
* **RAID 10 (Striped Mirrors)**: Mirrored pairs striped together ($\ge 4$ disks). High IOPS and fault tolerance.

### 3.4 Linux Lab 3: File Management & Wildcards
* **File Operations**: `touch`, `mkdir -p`, `cp -r`, `mv`, `rm -rf`.
* **Shell Wildcards (Globbing)**: `*` (zero or more chars), `?` (exactly one char), `[abc]` (any char in set), `[!0-9]` (any non-digit).

---

## 🔌 Week 04: Input/Output Architecture & Stream Redirection (LM4)

### 4.1 I/O Interfaces, Protocols & Polling vs Interrupts
* **I/O Communication Models**:
  * **Programmed I/O (Polling)**: CPU repeatedly queries device status registers in a busy loop; wastes CPU cycles.
  * **Interrupt-Driven I/O**: Hardware device asserts an Interrupt Request (IRQ) line on the interrupt controller, prompting the CPU to save context and execute an Interrupt Service Routine (ISR).
* **High-Speed Interconnects**: USB-C / USB4 (up to 40 Gbps), Thunderbolt 4 (PCIe tunneling), Memory-Mapped I/O (MMIO).

### 4.2 UNIX Standard Streams & Pipelines
* **Standard File Descriptors**:
  * **`FD 0` (`stdin`)**: Standard Input (keyboard by default).
  * **`FD 1` (`stdout`)**: Standard Output (terminal display by default).
  * **`FD 2` (`stderr`)**: Standard Error (unbuffered error messages).
* **The Pipeline Operator (`|`)**: Connects `stdout` of the left process directly to `stdin` of the right process in kernel memory buffers without writing intermediate data to disk.

### 4.3 Linux Lab 4: Redirection Operators & Text Filtering
* **Redirection Syntax**: `>` (overwrite stdout), `>>` (append stdout), `2>` (redirect stderr), `2>&1` or `&>` (redirect stdout + stderr together), `<` (redirect stdin).
* **Text Processing Filters**: `cat`, `less`, `head -n 10`, `tail -f`, `grep -i "pattern"`, `wc -l`.

---

## 🛡️ Week 05: Operating Systems & Access Control (LM5)

### 5.1 Operating System Kernels: Monolithic vs Microkernel
* **Monolithic Kernel (Linux, Windows NT)**: Core OS subsystems (scheduler, memory management, IPC, device drivers, network stack, filesystems) all execute within Ring 0 kernel space. Delivers maximum execution speed; a driver crash can panic the entire system.
* **Microkernel (Minix, QNX, seL4)**: Strips Ring 0 down to the bare minimum (low-level IPC, basic scheduling, virtual memory). Drivers and filesystems run in Ring 3 user space as isolated daemons. High stability and fault isolation at the cost of IPC context-switching overhead.

### 5.2 Virtual Memory & Paging
* **Virtual Address Space**: Illusion provided to every process of having a private, contiguous block of physical memory.
* **Paging Mechanics**: Memory is partitioned into fixed-size **Pages** (typically 4 KB) mapped to physical **Page Frames** via per-process **Page Tables**.
* **MMU & Page Faults**: The Hardware Memory Management Unit (MMU) translates virtual addresses using Translation Lookaside Buffers (TLB). When an unmapped page is referenced, the CPU raises a **Page Fault** interrupt, loading the page from swap space into RAM.

### 5.3 Linux Lab 5: Permissions Matrix & Access Control
* **Linux Permission Triad**:
  * `r` (Read = 4), `w` (Write = 2), `x` (Execute = 1).
  * Applied across: **User (`u`)**, **Group (`g`)**, **Others (`o`)**.
* **Octal Notation**:
  * `chmod 755 file.sh` $\rightarrow$ `rwxr-xr-x` (User full, Group/Others read+execute).
  * `chmod 600 id_rsa` $\rightarrow$ `rw-------` (User read/write only, essential for SSH keys).
* **Ownership**: `chown user:group filename`. Special bits: **SUID** (run as owner), **SGID** (inherit directory group), **Sticky Bit** (only file owner can delete, used on `/tmp`).

---

## ⚙️ Week 06: Application Software & Process Management (LM6)

### 6.1 Compilers, Interpreters & Runtimes
* **Native Compiled Languages (C, C++, Rust, Go)**: Source code is translated directly into machine-specific native opcodes and linked into an ELF executable. Maximum execution efficiency.
* **Interpreted Languages (Python, Ruby, Bash)**: An interpreter reads and executes source statements line-by-line in real time.
* **Bytecode Hybrid Systems (Java, .NET)**: Source code compiles to intermediate bytecode executed by a Virtual Machine (JVM / CLR) with Just-In-Time (JIT) dynamic compilation to native machine code.

### 6.2 Software Licensing Models
* **FOSS (Free and Open Source Software)**:
  * **Permissive Licenses (MIT, BSD, Apache 2.0)**: Allows anyone to modify, redistribute, and incorporate code into closed-source commercial software.
  * **Copyleft Licenses (GNU GPLv2 / GPLv3)**: Requires all derivative works and modifications to remain open source under the same GPL terms.
* **Proprietary & SaaS**: Closed-source binaries governed by End User License Agreements (EULA) or cloud-hosted subscriptions.

### 6.3 & 6.4 Linux Process Lifecycle & Monitoring
* **Process Creation**: `fork()` (clones parent process address space) followed by `execve()` (replaces memory image with new binary).
* **Process States**: `R` (Running / Runnable), `S` (Interruptible Sleep), `D` (Uninterruptible Sleep / Disk I/O), `Z` (Zombie / Terminated child awaiting parent `wait()` collection), `T` (Stopped).
* **UNIX Signals**: `SIGTERM (15)` (graceful termination request), `SIGKILL (9)` (unconditional kernel termination, cannot be caught or ignored), `SIGHUP (1)` (reload configuration).
* **Lab Commands**: `ps aux`, `top`, `htop`, `kill -15 PID`, `kill -9 PID`, backgrounding jobs (`&`, `Ctrl+Z`, `bg`, `fg`, `jobs`).

---

## 🌐 Week 07: Computer Networking & The OSI Model (LM7)

### 7.1 The 7-Layer OSI Model vs 4-Layer TCP/IP Stack
| OSI Layer | Name | Function | TCP/IP Layer | PDU Name |
| :---: | :--- | :--- | :---: | :---: |
| **7** | Application | Network service interface (HTTP, DNS, SSH, SMTP) | Application | Data |
| **6** | Presentation | Data formatting, encryption, compression (TLS) | Application | Data |
| **5** | Session | Sockets and session management | Application | Data |
| **4** | Transport | End-to-end reliability, port multiplexing (TCP, UDP) | Transport | Segment (TCP) / Datagram (UDP) |
| **3** | Network | Logical addressing, routing across subnets (IPv4, IPv6, ICMP) | Internet | Packet |
| **2** | Data Link | Physical addressing (MAC), framing, switching (Ethernet, Wi-Fi) | Link / Network Access | Frame |
| **1** | Physical | Electrical/optical signaling, bits on wire | Link / Network Access | Bits |

### 7.2 Network Hardware & Topologies
* **Hubs vs Switches vs Routers**:
  * **Hub (Layer 1)**: Repeats incoming bits out of every port; single shared collision domain.
  * **Switch (Layer 2)**: Learns MAC addresses into a CAM table; micro-segments collision domains.
  * **Router (Layer 3)**: Routes packets between disparate IP networks using routing tables.
* **Physical Media**: Cat6 UTP copper (1 Gbps up to 100m, 10 Gbps up to 55m), Single-Mode Fiber (SMF), Multimode Fiber (MMF).

### 7.3 Transport Layer: TCP 3-Way Handshake vs UDP
* **TCP Handshake**:
  1. Client $\rightarrow$ Server: `SYN` (Synchronize Sequence Number $X$).
  2. Server $\rightarrow$ Client: `SYN-ACK` (Acknowledge $X+1$, Synchronize Sequence Number $Y$).
  3. Client $\rightarrow$ Server: `ACK` (Acknowledge $Y+1$). Connection Established.
* **UDP**: Header size of only 8 bytes (vs TCP 20–60 bytes); zero connection setup latency.

### 7.4 Linux Lab 7: Network Diagnostics
* `ping` (ICMP Echo Request/Reply), `traceroute` / `mtr` (TTL hop expiration path tracing), `ss -tulpn` (listening TCP/UDP sockets and ports), `ip a` (network interface IP addresses).

---

## 🌍 Week 08: The Internet Architecture & SysAdmin Variables (LM8)

### 8.1 Global Internet Architecture & BGP
* **Autonomous Systems (AS)**: The global Internet is a collection of connected Autonomous Systems managed by ISPs and enterprises, exchanging routing prefixes via **Border Gateway Protocol (BGP)**.
* **DNS Resolution Chain**: Client Stub Resolver $\rightarrow$ Recursive DNS Server $\rightarrow$ Root Name Server (`.`) $\rightarrow$ Top-Level Domain (TLD) Server (`.com`) $\rightarrow$ Authoritative Name Server.

### 8.2 Web Protocols: HTTP/HTTPS & TLS Handshake
* **HTTP Verbs**: `GET` (retrieve), `POST` (submit data), `PUT` (idempotent update), `DELETE`.
* **Status Codes**: `200 OK`, `301 Moved Permanently`, `400 Bad Request`, `403 Forbidden`, `404 Not Found`, `500 Internal Server Error`, `502 Bad Gateway`.
* **TLS 1.3 Handshake**: Asymmetric key exchange (ECDHE) verifying server X.509 certificate to establish symmetric session encryption keys (AES-GCM).

### 8.3 & 8.4 Linux Environment Variables & Shell Startup
* **Environment Variables**: `export PATH=$PATH:/custom/bin`, `$HOME`, `$USER`, `$SHELL`.
* **Startup Script Execution Order**: `/etc/profile` $\rightarrow$ `~/.bash_profile` $\rightarrow$ `~/.bashrc` $\rightarrow$ `/etc/bash.bashrc`.
* **SysAdmin Utilities**: `printenv`, `alias`, `df -h` (disk space filesystem usage), `du -sh` (directory storage size), `free -m` (memory utilization), `uptime`.

---

## 🗄️ Week 09: Relational Databases, SQL & Ubuntu Desktop VM (LM9)

### 9.1 Relational Database Theory & Normalization
* **Relational Database Model (E.F. Codd)**: Data organized into two-dimensional tables (**Relations**), with rows (**Tuples**) and columns (**Attributes**).
* **Keys**: **Primary Key (PK)** (uniquely identifies a tuple; non-null), **Foreign Key (FK)** (attribute referencing the Primary Key of another relation, enforcing Referential Integrity).
* **Database Normalization**:
  * **1NF**: Eliminate duplicate columns; ensure atomic (indivisible) column values; establish a Primary Key.
  * **2NF**: Meet 1NF; remove partial functional dependencies (all non-key attributes must depend on the *entire* primary key).
  * **3NF**: Meet 2NF; remove transitive dependencies (non-key attributes must depend *only* on the primary key, nothing else).

### 9.2 ACID Properties vs NoSQL
* **ACID Transactions**:
  * **Atomicity**: All operations in a transaction succeed or all roll back ("all or nothing").
  * **Consistency**: Transactions preserve schema constraints and relational integrity.
  * **Isolation**: Concurrent transactions execute without cross-contamination (locking/MVCC).
  * **Durability**: Committed transactions persist permanently in non-volatile write-ahead logs.
* **NoSQL Databases**: Document stores (MongoDB), Key-Value caches (Redis), Column-family (Cassandra), Graph databases (Neo4j) prioritizing horizontal scaling over strict ACID compliance.

### 9.3 & 9.4 Linux Stream Text Processing: `cut`, `awk`, `sed`
* `cut -d: -f1 /etc/passwd`: Delimited field extraction.
* `awk -F: '$3 >= 1000 {print $1, $3}' /etc/passwd`: Columnar filtering and programmatic reporting.
* `sed 's/old/new/g' file.txt`: Stream editor for find-and-replace text transformation.

### 9.5 Ubuntu VM Installation & Hash Verification
* Image verification via `sha256sum ubuntu-24.04.iso` comparing against official release hashes before hypervisor provisioning.

---

## 🔒 Week 10: Cybersecurity, Cryptography & User Administration (LM10)

### 10.1 The CIA Triad & Cyber Threat Modeling
* **The CIA Triad**:
  * **Confidentiality**: Preventing unauthorized information disclosure (encryption, ACLs, MFA).
  * **Integrity**: Protecting data from unauthorized alteration or corruption (cryptographic hashes, digital signatures).
  * **Availability**: Ensuring systems and resources remain accessible to authorized users (redundancy, DDoS mitigation, backups).
* **Defense-in-Depth**: Multi-layered security controls (Perimeter Firewall $\rightarrow$ Network Segmentation $\rightarrow$ Host EDR $\rightarrow$ Application ACLs $\rightarrow$ Database Encryption).

### 10.2 Applied Cryptography: Symmetric vs Asymmetric & Hashes
* **Symmetric Encryption**: Single shared secret key for encryption and decryption (AES-256). Fast; used for bulk data encryption at rest and in transit.
* **Asymmetric Encryption**: Mathematically linked Public/Private key pairs (RSA, ECC). Public key encrypts; Private key decrypts. Used for key exchange and digital signatures.
* **Cryptographic Hashes**: One-way deterministic functions (SHA-256) producing fixed-length digests. Must be collision-resistant and preimage-resistant.

### 10.3 & 10.4 Linux User & Group Administration
* **Security Files**:
  * `/etc/passwd`: User account information (`username:x:UID:GID:gecos:homedir:shell`).
  * `/etc/shadow`: Cryptographic password hashes (salted SHA-512) accessible only by `root` (`0640` permissions).
  * `/etc/group`: Group definitions.
* **Account Commands**: `useradd -m -s /bin/bash newuser`, `passwd newuser`, `usermod -aG sudo newuser`, `userdel -r olduser`, `visudo` (safe syntax validation for `/etc/sudoers`).

---

## 📈 Week 11: Systems Analysis, SDLC & Cron Automation (LM11)

### 11.1 Systems Development Life Cycle (SDLC)
* **SDLC Phases**:
  1. **Planning**: Project initiation, scoping, resource allocation.
  2. **Analysis**: Gathering user requirements, modeling existing systems.
  3. **Design**: Architectural blueprints, database schemas, UI wireframes.
  4. **Implementation (Coding)**: Software development, unit testing, integration.
  5. **Testing / Deployment**: Quality Assurance (QA), user acceptance testing (UAT), production rollout.
  6. **Maintenance**: Security patching, bug fixes, performance monitoring.
* **Waterfall vs Agile**:
  * **Waterfall**: Linear, sequential phases with rigid sign-offs. Predictable but inflexible.
  * **Agile / Scrum**: Iterative, incremental development cycles (Sprints) delivering working software frequently with dynamic requirement adaptation.

### 11.2 TELOS Feasibility Analysis
* **T - Technical**: Do we possess the hardware, software, and engineering expertise?
* **E - Economic**: Is the cost-benefit analysis positive (ROI, TCO)?
* **L - Legal**: Does the project comply with regulations (GDPR, HIPAA, copyright)?
* **O - Operational**: Will the organization and users adopt and utilize the solution?
* **S - Schedule**: Can the project be completed before the critical deadline?

### 11.3 & 11.4 Linux Automation with Cron
* **Crontab 5-Field Syntax**:
  ```text
  ┌───────────── Minute (0 - 59)
  │ ┌─────────── Hour (0 - 23)
  │ │ ┌───────── Day of Month (1 - 31)
  │ │ │ ┌─────── Month (1 - 12)
  │ │ │ ┌───── Day of Week (0 - 7, 0 and 7 = Sunday)
  │ │ │ │ │
  * * * * * /path/to/command
  ```
* **Production Cron Examples**:
  * `0 2 * * * /backup/backup.sh`: Runs nightly at 2:00 AM.
  * `*/15 * * * * /usr/bin/healthcheck.sh`: Runs every 15 minutes.
* **Crontab Commands**: `crontab -e` (edit user schedule), `crontab -l` (list scheduled jobs).

---

## 💻 Week 12: Programming Logic, Shell Scripting & Cloud/Containers (LM12)

### 12.1 Foundations of Logic & Control Structures
* **The Three Fundamental Primitives (Böhm-Jacopini Theorem)**:
  1. **Sequence**: Step-by-step sequential instruction execution.
  2. **Selection (Branching)**: Conditional execution (`if-then-else`, `case/switch`).
  3. **Iteration (Looping)**: Repetitive execution controlled by boolean conditions (`for`, `while`, `until`).

### 12.2 & 12.3 Bash Shell Scripting Mechanics
* **Script Anatomy**:
  * Shebang line: `#!/bin/bash`
  * Variables: `BACKUP_DIR="/var/backups"`, referenced via `$BACKUP_DIR`.
  * Exit Codes: Every command returns an integer ($0 = \text{success}$, $\ge 1 = \text{error}$), accessible via `$?`.
  * Conditional Tests: `if [ -f "$FILE" ]; then ... fi`, integer comparisons (`-eq`, `-ne`, `-lt`, `-gt`).
  * Positional Parameters: `$0` (script name), `$1` (first argument), `$#` (argument count), `$@` (all arguments).

### 12.4 Cloud Computing, Virtualization & Containers
* **Cloud Service Models**: **IaaS** (AWS EC2, Azure VMs), **PaaS** (Heroku, AWS Elastic Beanstalk), **SaaS** (Microsoft 365, Google Workspace).
* **Virtual Machines vs Containers**:
  * **Virtual Machine**: Full hardware virtualization via Hypervisor; includes complete guest OS kernel; heavier footprint.
  * **Container (Docker)**: OS-level virtualization sharing host Linux kernel; lightweight, instantaneous startup, isolated namespaces and cgroups.

---

## ⚖️ Week 13: Computer Ethics, Cyber Law & Emergent Tech (LM13)

### 13.1 Ethical Frameworks & Professional Conduct
* **Corporate Governance**: **Stockholder Theory** (Milton Friedman - maximize shareholder profit within legal bounds) vs **Stakeholder Theory** (R. Edward Freeman - balance interests of customers, employees, community, environment).
* **Professional Codes of Ethics**: **ACM & IEEE Code of Ethics**: Public interest first, maintain professional competence, respect privacy, avoid harm, honor intellectual property.

### 13.2 Cyber Law & Applied Ethical Hacking
* **Key Legislation**:
  * **CFAA (Computer Fraud and Abuse Act)**: Primary US federal law criminalizing unauthorized computer access and damage.
  * **ECPA (Electronic Communications Privacy Act)**: Restricts unauthorized wiretapping and interception of electronic communications.
  * **DMCA (Digital Millennium Copyright Act)**: Criminalizes circumvention of DRM copyright access controls.
* **Ethical Hacking Rules of Engagement**: Written authorization / Statement of Work (SOW), clear scope boundaries, non-destructive testing, responsible disclosure of vulnerabilities.

### 13.3 – 13.5 Emergent Technologies
* **Artificial Intelligence & LLMs**: Machine Learning training vs Inference; Transformer attention mechanisms; Algorithmic bias and dataset provenance.
* **Quantum Computing**: Qubits in superposition and entanglement; threat to classical asymmetric cryptography (Shor's algorithm breaking RSA; Post-Quantum Cryptography migration).
* **Blockchain & Green Computing**: Decentralized immutable ledgers (PoW vs PoS); power usage effectiveness (PUE) in energy-efficient data center design.

---

## 🚀 Week 14: Final Project - LAMP Stack & WordPress Deployment

### 14.1 Enterprise Linux Server & LAMP Stack Architecture
```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 🌐 THE LAMP STACK REQUEST FLOW                                                         │
│ Client Browser ➔ Port 80/443 ➔ Apache Web Server (httpd)                              │
│                                      │                                                 │
│                                      ▼                                                 │
│                             PHP Processing Module (libapache2-mod-php)                 │
│                                      │                                                 │
│                                      ▼                                                 │
│                             MySQL Database Server (Port 3306)                          │
│                                      │                                                 │
│                                      ▼                                                 │
│                       Dynamic HTML Generated ➔ Rendered to Client Browser              │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### 14.2 MySQL Database Provisioning
* Database creation and user security grants:
  * `mysql_secure_installation`: Disables remote root login, removes test database.
  * `CREATE DATABASE ciss100_wordpress;`
  * `CREATE USER 'wp_user'@'localhost' IDENTIFIED BY 'StrongPassword123!';`
  * `GRANT ALL PRIVILEGES ON ciss100_wordpress.* TO 'wp_user'@'localhost';`
  * `FLUSH PRIVILEGES;`

### 14.3 WordPress CMS Installation & Security Hardening
* Extracted to `/var/www/html/wordpress`.
* Database binding in `wp-config.php`.
* File permissions hardening:
  * `chown -R www-data:www-data /var/www/html/wordpress`
  * `find /var/www/html/wordpress/ -type d -exec chmod 755 {} \;`
  * `find /var/www/html/wordpress/ -type f -exec chmod 644 {} \;`

### 14.4 Kali Linux Security Auditing
* Vulnerability scanning with `nmap` (port scanning), `nikto` (web server misconfigurations), and `wpscan` (WordPress plugin and theme CVE vulnerability detection).

---

## 🎓 Week 15: Final Deliverables, Project Defense & Linux OS Final Exam

### 15.1 Final Project Verification Checklist
* Verification of running Apache service (`systemctl status apache2`).
* Active MySQL tables (`SHOW TABLES;` within WordPress schema).
* Functional WordPress web dashboard rendered via local browser.
* Submission report with verified proof screenshots.

### 15.2 Final Project Ethics Defense
* Security considerations of running open-source web applications: maintaining patch management schedules, enforcing HTTPS/TLS, restricting database user privileges, backing up databases off-site.

### 15.3 Linux OS Comprehensive Command Matrix
* **Navigation**: `cd`, `pwd`, `ls -la`.
* **File Operations**: `cp -r`, `mv`, `rm -rf`, `mkdir -p`, `touch`.
* **Permissions**: `chmod [octal]`, `chown [user:group]`.
* **Pipelines & Redirection**: `|`, `>`, `>>`, `2>`, `grep`, `wc`, `cat`, `less`, `head`, `tail`.
* **Process Management**: `ps aux`, `top`, `kill -15`, `kill -9`, `bg`, `fg`, `jobs`.
* **Networking**: `ping`, `ss -tulpn`, `traceroute`, `ssh`.
* **SysAdmin & Automation**: `df -h`, `free -m`, `uptime`, `export`, `crontab -e`, bash scripting.

### 15.4 Mastering Final Exam Concepts
* Complete synthesis of Course Objectives: Silicon architecture $\rightarrow$ Linux OS $\rightarrow$ Networking protocols $\rightarrow$ Relational Databases $\rightarrow$ Cybersecurity principles $\rightarrow$ System Automation.

---

## 🎯 Week 16: Semester Conclusion & Degree Works Registrar Audit

### 16.1 Final Grade Verification & GPA Audit
* Verification of official letter grade submission on Brightspace and Banner WIReD (Target: 4.00 Grade A).

### 16.2 Degree Works Synchronization (47 / 64 Credits Complete)
* Verifying applied academic transfer credits and CISS 100 completion on Degree Works audit.
* Preparing for Spring 2027 courses (CISS 111, CISS 150, etc.) on the pathway to transfer to UAlbany CEHC Cyber Defense (B.S.).
