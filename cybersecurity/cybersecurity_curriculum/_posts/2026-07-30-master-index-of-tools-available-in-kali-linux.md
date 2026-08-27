---
title: "Tools Available in Kali Linux"
date: "2026.07.30"
tags: ["STUDY", "KALI LINUX"]
summary: "A complete master reference index mapping over 600 pre-installed tools across Kali Linux's 13 official menu categories."
---

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-left: 4px solid #e11d48; padding: 1.25rem 1.5rem; border-radius: 0 8px 8px 0; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <p style="margin: 0; font-size: 1.05rem; line-height: 1.6; color: #334155; font-style: italic; font-weight: 500;">
        <strong>Purpose:</strong> A comprehensive master reference index mapping over 600 pre-installed security tools in Kali Linux—organized directly into its 13 official application categories covering reconnaissance, web analysis, database assessment, password attacks, wireless security, reverse engineering, exploitation, sniffing/spoofing, post-exploitation, digital forensics, reporting, and social engineering.
    </p>
</div>

---

## Part 1: Information Gathering & Vulnerability Analysis

### Category 01: Information Gathering (Reconnaissance & OSINT)
*Tools used to map external attack surfaces, discover hosts, perform OSINT, and enumerate protocols.*

#### A. Network & Port Scanners
*   **nmap** — The industry-standard network mapper for host discovery, port scanning, and OS detection.
*   **masscan** — Asynchronous network scanner capable of scanning the internet in minutes.
*   **hping3** — Command-line TCP/IP packet assembler/analyzer used for firewall testing and port scanning.
*   **unicornscan** — Asynchronous network stimulus engine for port gathering and OS fingerprinting.
*   **netdiscover** — Active/passive ARP reconnaissance tool for discovering live hosts on local networks.
*   **arp-scan** — Lightweight command-line tool that sends ARP packets to discover IP/MAC addresses.
*   **fping** — High-performance ping utility that sends ICMP echo requests to multiple hosts simultaneously.
*   **dmitry** — Deepmagic Information Gathering Tool (Gathers subdomains, emails, uptime, and port scans).
*   **legion** — Graphical network penetration testing framework based on Qaspire (automates Nmap scans).

#### B. DNS & Subdomain Enumeration
*   **amass** — In-depth OWASP tool for DNS mapping and sub-domain discovery using active and passive sources.
*   **dnsrecon** — Comprehensive DNS enumeration tool for checking zone transfers, reverse lookups, and wildcard records.
*   **dnsenum** — Perl script that enumerates DNS information and brute-forces subdomains.
*   **fierce** — Perl script that specifies target domain names and attempts DNS zone transfers and brute-force lookups.
*   **sublist3r** — Python tool designed to enumerate subdomains using search engines (Google, Yahoo, Bing, Baidu).
*   **knockpy** — Python tool designed to enumerate subdomains on a target domain through a wordlist.
*   **pagodo** — Passive Google dorking tool that automates scraping Google search results for vulnerable subdomains.
*   **dnstracer** — Traces a given domain name to its authoritative hostname servers.
*   **dnsdict6** — Enumerates IPv6 addresses for a given domain using dictionary lookups.

#### C. OSINT & Email / Social Media Harvesting
*   **theHarvester** — Gathers emails, names, subdomains, IPs, and URLs from public search engines and PGP key servers.
*   **recon-ng** — Full-featured Web Reconnaissance framework with a modular structure similar to Metasploit.
*   **maltego** — Interactive graphical link-analysis tool for gathering and visualizing intelligence.
*   **spiderfoot** — OSINT automation tool that queries over 100 public data sources to gather target intelligence.
*   **metagoofil** — Extracts metadata (author, creation dates, software used) from public documents (PDF, DOCX, XLSX).
*   **sherlock** — Finds social media accounts across hundreds of platforms using a single username.
*   **osrframework** — Set of Python libraries for anonymity and Open Source Intelligence gathering.

#### D. Active Directory & SMB/Protocol Enumeration
*   **enum4linux** — Tool for enumerating data from Windows and Samba hosts (users, shares, group policies).
*   **enum4linux-ng** — Modern, refactored C++ and Python replacement for enum4linux.
*   **smbmap** — SMB share enumeration tool that allows searching across entire domains for accessible drives/files.
*   **smbclient** — FTP-like client to access and query SMB/CIFS resources on Windows/Linux servers.
*   **nbtscan** — Scans IP networks for NetBIOS name information.
*   **crackmapexec / NetExec** — Swiss army knife for Active Directory protocol enumeration (SMB, LDAP, WinRM, SSH).
*   **onesixtyone** — Fast SNMP scanner designed to brute-force community strings.
*   **snmpcheck** — Open-source tool designed to enumerate SNMP devices and display system info.
*   **ldapsearch** — Command-line tool used to open a connection to an LDAP server and query directory data.

---

### Category 02: Vulnerability Analysis
*Tools used to identify unpatched software, weak configurations, and protocol security flaws.*

#### A. General & Web Vulnerability Scanners
*   **nikto** — Open-source web server scanner that tests for dangerous files, outdated software, and misconfigurations.
*   **golismero** — Open-source framework for security testing that unifies outputs from Nikto, Nmap, and OpenVAS.
*   **lynis** — Security auditing tool for Unix/Linux systems that checks system configurations and hardening levels.
*   **nmap-nse** — Built-in Nmap scripts specifically written to query and detect thousands of known CVEs.

#### B. Fuzzers & Protocol Auditors
*   **sfuzz** — Simple, black-box command-line fuzzer used to discover buffer overflows in network protocols.
*   **spike** — A fuzzer development framework designed to analyze protocols and find unknown vulnerabilities.
*   **bed** — Plain-text protocol fuzzer designed to check for buffer overflows, format string bugs, and integer overflows.
*   **afl++ (American Fuzzy Lop)** — Advanced coverage-guided binary fuzzer for finding security flaws in compiled software.

#### C. Network Infrastructure & VoIP Auditing
*   **yersinia** — Network tool designed to framework-test vulnerabilities in Layer 2 protocols (STP, CDP, DTP, DHCP, HSRP).
*   **cisco-auditing-tool (CAT)** — Specialized scanner to check Cisco routers for weak passwords and vulnerabilities.
*   **cisco-global-exploiter (CGE)** — Testing tool for assessing vulnerabilities across Cisco network hardware.
*   **cisco-torch** — Cisco router scanning tool that mass-scans for Telnet, SSH, Web, and SNMP services simultaneously.
*   **SIPvicious (svmap, svwar, svcrack)** — Suite of tools used to audit SIP/VoIP systems for open extension numbers and weak passwords.
*   **voiphopper** — Security tool that automates VLAN hopping attacks on VoIP network infrastructure.

#### D. System & Privilege Escalation Checks
*   **unix-privesc-check** — Shell script that audits local Unix-like systems for weak file permissions that allow local privilege escalation.
*   **checksec** — Shell script that checks compiled binaries for security mitigations (ASLR, NX, Stack Canaries, PIE).
*   **linux-exploit-suggester** — Tool that checks kernel versions against public exploit databases to suggest missing security patches.

---

## Part 2: Web Applications & Database Assessment

### Category 03: Web Application Analysis
*Tools used to inspect web traffic, scan CMS platforms, brute-force hidden directories, fuzz parameters, and test web logic.*

#### A. Web Proxies & Interceptors
*   **burpsuite** — The industry-standard web proxy for intercepting, modifying, and analyzing HTTP/S traffic in real time.
*   **zaproxy (OWASP ZAP)** — Free, open-source web application proxy and vulnerability scanner with an automated spider.
*   **mitmproxy** — Interactive, SSL/TLS-capable intercepting HTTP proxy for command-line users.

#### B. Content Management System (CMS) Scanners
*   **wpscan** — Black-box WordPress vulnerability scanner for enumerating plugins, themes, and weak passwords.
*   **joomscan** — Specialized vulnerability scanner designed to detect flaws and configurations in Joomla CMS installations.
*   **droopescan** — Plugin and theme scanner for Drupal, Silverstripe, and Joomla platforms.
*   **cmseek** — Automated CMS detection and exploitation framework supporting over 180 CMS platforms.

#### C. Web Directory & Parameter Brute-Forcers
*   **gobuster** — High-speed Go-based tool used to brute-force URIs (directories and files), DNS subdomains, and VHost names.
*   **ffuf (Fuzz Faster U Fool)** — Extremely fast web fuzzer written in Go for directory discovery and virtual host scanning.
*   **dirb** — Classic web content scanner that launches dictionary-based attacks against web servers.
*   **dirbuster** — Graphical multi-threaded Java application designed to brute-force directory and file names.
*   **wfuzz** — Modular web application fuzzer used to test GET/POST parameters, headers, and hidden form inputs.
*   **feroxbuster** — Fast, simple, recursive content discovery tool written in Rust.
*   **dirsearch** — Command-line tool designed to brute-force directories and files in web servers.

#### D. Web Fingerprinting & Crawlers
*   **whatweb** — Web scanner that identifies technologies, CMS platforms, embedded scripts, and server configurations.
*   **httrack** — Offline browser utility that mirrors complete websites to local storage for offline analysis.
*   **cutycapt** — Command-line utility that captures web page screenshots using WebKit.
*   **blindelephant** — Web application fingerprinter that determines software versions via static file hashes.

#### E. Specialized Web Vulnerability Tools
*   **commix** — Automated command injection testing tool designed to detect and exploit OS command injection flaws.
*   **wapiti** — Black-box web vulnerability scanner that audits web apps by injecting payloads into forms and parameters.
*   **weevely** — Stealthy PHP web shell framework that provides a terminal-like connection over HTTP.
*   **webshells** — A collection of pre-packaged webshells (PHP, ASP, ASPX, JSP) stored in `/usr/share/webshells`.

---

### Category 04: Database Assessment
*Tools dedicated to discovering database services, testing SQL injection vulnerabilities, and extracting backend data.*

#### A. SQL Injection & Exploitation Frameworks
*   **sqlmap** — The world's leading open-source automated tool for detecting and exploiting SQL injection flaws and taking over database servers.
*   **sqlninja** — SQL injection tool targeted specifically at Microsoft SQL Server backends that use web applications as entry points.
*   **bbqsql** — Python-based blind SQL injection framework designed to automate custom blind SQLi attacks.

#### B. Database Enumeration & Client Tools
*   **hexorbase** — Graphical database client designed to audit, query, and brute-force MySQL, Oracle, PostgreSQL, and SQLite servers.
*   **odat (Oracle Database Attacking Tool)** — Python script designed to test the security of Oracle Database servers and execute remote commands.
*   **oscanner** — Java-based Oracle database scanner that conducts SID brute-forcing, password testing, and enumeration.
*   **tnscmd10g** — Command-line tool used to issue commands directly to Oracle TNS Listener services.
*   **msqlpscan** — Microsoft SQL Server port scanner and password auditor.

---

## Part 3: Password Attacks & Wireless Attacks

### Category 05: Password Attacks
*Tools used for offline password hash cracking, online network brute-forcing, wordlist generation, and credential extraction.*

#### A. Offline Password Crackers & Hash Analyzers
*   **john (John the Ripper)** — Legendary multi-engine offline password cracker supporting hundreds of hash and cipher types.
*   **hashcat** — Advanced, GPU-accelerated password cracking engine capable of processing billions of hashes per second.
*   **ophcrack** — Windows password cracker based on Rainbow Tables with a graphical interface.
*   **rainbowcrack** — Implementation of Philippe Oechslin's faster time-memory trade-off technique for cracking hashes.
*   **hash-identifier** — Software used to identify the specific cryptographic algorithm used to generate a hash string.
*   **hashid** — Python tool to identify the type of hash based on length and formatting patterns.
*   **nth (Name That Hash)** — Modern hash identification tool that categorizes hash strings and outputs Hashcat/John flags.

#### B. Online Network Login Brute-Forcers
*   **hydra (THC-Hydra)** — High-speed, parallel online login brute-forcer supporting over 50 protocols (SSH, FTP, HTTP, SMB, RDP).
*   **medusa** — Speedy, parallel, modular online password brute-forcing utility.
*   **ncrack** — High-speed network authentication cracking tool built by the Nmap project.
*   **patator** — Multi-threaded, modular brute-forcing tool designed to test various protocols via a unified interface.
*   **crowbar** — Specialized brute-forcing tool targeted at SSH keys, RDP (NLA), and VNC protocols.

#### C. Wordlist Generators & Manipulators
*   **crunch** — Wordlist generator that builds custom dictionary files based on specified character sets and length patterns.
*   **cewl** — Spidering application that navigates a target website and extracts unique words to create custom wordlists.
*   **rsmangler** — Takes a wordlist and applies various permutations, alterations, and combinations to expand it.
*   **statsprocessor** — High-performance wordlist generator based on per-position character statistics.
*   **wordlists** — A Kali metapackage that provides pre-installed dictionaries (e.g., `rockyou.txt`, `SecLists`).

#### D. Local Credential & SAM Extractors
*   **chntpw** — Utility used to reset passwords or edit the SAM database on Windows installations directly from a boot disk.
*   **samdump2** — Tool used to dump Windows NTLM password hashes from the SAM registry hive.
*   **mimikatz** — Post-exploitation tool stored in Kali to extract plain-text passwords and Kerberos tickets from Windows memory.

---

### Category 06: Wireless Attacks
*Tools for auditing Wi-Fi (802.11), Bluetooth, RFID/NFC, and Software Defined Radio (SDR) security.*

#### A. Wi-Fi (802.11) Auditing Suites
*   **aircrack-ng suite** — Complete 802.11 auditing suite:
    *   *airmon-ng:* Enables monitor mode on wireless cards.
    *   *airodump-ng:* Captures raw 802.11 frames and packet handshakes.
    *   *aireplay-ng:* Generates traffic and injects frames (deauthentication attacks).
    *   *aircrack-ng:* Cracks WEP and WPA/WPA2-PSK key handshakes.
*   **wifite** — Automated Python script that cycles through wireless attacks on nearby WPA/WPS networks.
*   **airgeddon** — Multi-use bash script for auditing wireless networks (supports Rogue AP, Evil Twin, and Captive Portals).
*   **kismet** — Wireless network detector, sniffer, and intrusion detection system for 802.11, Bluetooth, and Zigbee.
*   **fern-wifi-cracker** — Graphical wireless auditing tool designed to automate WEP, WPA, and WPS attacks.
*   **cowpatty** — Implementation of an offline dictionary attack against WPA-PSK networks using precomputed PMK tables.

#### B. WPS (Wi-Fi Protected Setup) Exploitation
*   **reaver** — Brute-force attack tool designed to exploit WPS PIN flaws and recover WPA/WPA2 passphrases.
*   **pixiewps** — Tool written in C used to offline brute-force the WPS PIN of vulnerable Access Points (Pixie Dust attack).
*   **bully** — C-based implementation of the WPS PIN brute-force attack, built as an alternative to Reaver.

#### C. Bluetooth Security Tools
*   **btscanner** — Environment scanner that extracts Bluetooth device information without pairing.
*   **bluelog** — Bluetooth site-survey tool designed to log discoverable devices in the area.
*   **spooftooph** — Tool designed to spoof Bluetooth device names, classes, and MAC addresses.
*   **crackle** — Tool that decrypts BLE (Bluetooth Low Energy) encryption and captures pairing keys.
*   **ubertooth-specan** — Spectrum analyzer utilities used alongside Ubertooth One hardware.

#### D. RFID, NFC, & Software Defined Radio (SDR)
*   **proxmark3** — Client software for communicating with Proxmark3 hardware to clone, read, and emulate RFID/NFC tags.
*   **mfcuk (Mifare Classic Universal Toolkit)** — Offline key recovery tool for Mifare Classic RFID cards.
*   **mfoc (Mifare Classic Offline Cracker)** — Fast key recovery tool for Mifare Classic cards when at least one key is known.
*   **gqrx-sdr** — Open-source Software Defined Radio receiver powered by GNU Radio and Qt.
*   **hackrf** — Command-line utilities for managing HackRF One SDR hardware.
*   **kalibrate-rtl (kal)** — Calculates local GSM base station frequencies to calibrate RTL-SDR dongles.

---

## Part 4: Reverse Engineering & Exploitation Tools

### Category 07: Reverse Engineering
*Tools used to decompile, disassemble, debug, and analyze binary executables, firmware, and mobile packages.*

#### A. Disassemblers & Decompilers
*   **ghidra** — NSA-developed open-source software reverse engineering suite featuring a full-featured disassembler, decompiler, and scriptable analyzer.
*   **radare2 (r2)** — UNIX-like command-line reverse engineering framework for disassembling, patching, and analyzing binaries.
*   **iaito (formerly Cutter)** — Official GUI frontend for the radare2 reverse engineering framework.
*   **bytecode-viewer** — Java reverse engineering suite containing multiple decompilers (FernFlower, CFR, Procyon) and a bytecode editor.
*   **plasma** — Interactive disassembler for x86, x64, ARM, and MIPS binaries that generates pseudo-code.

#### B. Debuggers & Dynamic Tracers
*   **gdb (GNU Debugger)** — The standard Linux command-line debugger for x86, x64, and ARM binaries.
*   **edb-debugger** — Cross-platform 32-bit and 64-bit GUI debugger designed for Linux binaries.
*   **ollydbg** — 32-bit assembler level analyzing debugger for Windows executables (runs via Wine on Kali).
*   **strace** — System call tracer that monitors and records interactions between a binary and the Linux kernel.
*   **ltrace** — Library call tracer that tracks dynamic library calls made by a binary during execution.
*   **frida** — Dynamic code instrumentation toolkit used to hook functions, inject scripts, and inspect binary execution in real time.

#### C. Mobile App Reversing (Android & iOS)
*   **apktool** — Tool for reverse engineering 3rd-party, closed, binary Android apps (decodes resources to nearly original form and rebuilds them).
*   **dex2jar** — Translates Android `.dex` (Dalvik Executable) files into standard Java `.jar` files for analysis in JD-GUI.
*   **androguard** — Python tool to analyze, decompile, and inspect Android application packages (`.apk`).
*   **jadx** — Command-line and GUI decompiler that converts Android DEX and APK files into readable Java source code.

#### D. Binary Diffing & Analysis
*   **diaphora** — Open-source binary diffing tool used to compare two binary files to locate code changes, patches, or compiler differences.
*   **checksec** — Script used to verify security properties of compiled binaries (ASLR, NX, Stack Canaries, PIE, RELRO).

---

### Category 08: Exploitation Tools
*Frameworks, databases, and software designed to launch payloads and validate security vulnerabilities.*

#### A. Exploitation Frameworks
*   **metasploit-framework (`msfconsole`)** — The world's most popular penetration testing framework containing thousands of exploits, payloads, encoders, and post-exploitation modules.
*   **armitage** — Graphical cyber attack management tool for Metasploit that visualizes targets and automates exploitation.
*   **routersploit** — Open-source exploitation framework targeted specifically at embedded devices, home routers, and IoT hardware.

#### B. Exploitation Utilities & Databases
*   **searchsploit** — Command-line utility for searching the complete offline archive of Exploit-DB (`/usr/share/exploitdb`).
*   **shellnoob** — Shellcode writing toolkit designed to generate, disassemble, assemble, and test custom shellcode.
*   **msfvenom** — Payload generation and encoding utility (part of the Metasploit suite) used to build custom reverse shells and executables.

#### C. Browser & Client-Side Exploitation
*   **beef-xss (Browser Exploitation Framework)** — Powerful penetration testing tool focused on client-side browser hooks and executing exploits within hooked web sessions.
*   **social-engineer-toolkit (SET)** — Custom vector generator designed to automate social engineering, malicious USB/file creation, and credential harvesting.

---

## Part 5: Sniffing, Spoofing, & Post Exploitation

### Category 09: Sniffing & Spoofing
*Tools used to intercept network packets, manipulate Layer 2/3 routing, spoof host identities, and execute Man-in-the-Middle (MitM) attacks.*

#### A. Network Packet Sniffers & Analyzers
*   **wireshark** — The world's most widely used graphical packet analyzer for dissecting network protocols.
*   **tshark** — Terminal-based version of Wireshark for capturing and filtering network traffic from the command line.
*   **tcpdump** — Classic, lightweight command-line packet analyzer for capturing and analyzing IP packets.
*   **netsniff-ng** — High-performance Linux network sniffer toolkit that utilizes zero-copy packet sockets.
*   **dsniff** — Suite of tools for network auditing and password sniffing across various protocols (FTP, HTTP, IMAP, NFS).
*   **driftnet** — Graphical sniffer that monitors network traffic and extracts/displays captured JPEG and GIF images.

#### B. Man-in-the-Middle (MitM) & Spoofing Frameworks
*   **bettercap** — Modern, powerful, and modular framework for network reconnaissance, MitM, ARP/DNS spoofing, and wireless auditing.
*   **ettercap** — Comprehensive suite for Man-in-the-Middle attacks on LAN networks supporting active and passive dissection.
*   **mitmproxy** — Interactive intercepting HTTP/HTTPS proxy used to inspect and modify web traffic on the fly.
*   **responder** — LLMNR, NBT-NS, and mDNS poisoner used to capture NetNTLM hashes and relay authentication on Windows networks.
*   **dnschef** — Highly configurable DNS proxy tool designed for penetration testers to forge DNS responses.
*   **sslsplit** — Transparent SSL/TLS interception tool used to perform Man-in-the-Middle attacks against encrypted network connections.
*   **macchanger** — Utility to view, randomize, or temporarily spoof network interface MAC addresses.
*   **arpspoof** — Tool (part of the dsniff package) that sends forged ARP responses to redirect network traffic through the attacker host.

---

### Category 10: Post Exploitation
*Tools used after gaining initial access to move laterally, escalate privileges, dump credentials, and tunnel traffic.*

#### A. Active Directory & Lateral Movement
*   **impacket** — Collection of Python classes for working with network protocols, featuring tools for remote command execution and credential extraction:
    *   `psexec.py` / `wmiexec.py` / `smbexec.py` — Command execution utilities over SMB/WMI.
    *   `secretsdump.py` — Remote dumping of NTDS.dit, SAM, and LSA secrets.
    *   `atexec.py` — Command execution via Task Scheduler service.
*   **evil-winrm** — The ultimate shell client for accessing and managing Windows hosts via WinRM (Windows Remote Management).
*   **bloodhound** — Active Directory mapping tool that visualizes domain relationships, permissions, and attack paths (`bloodhound-python` ingestor included).
*   **crackmapexec / netexec** — Swiss army knife for automating Active Directory auditing, credential spraying, and remote code execution across SMB, LDAP, and WinRM.
*   **kerbrute** — Tool used to perform Kerberos pre-authentication brute-forcing and user enumeration without triggering account lockouts.

#### B. Credential Dumping & Local Password Extraction
*   **mimikatz** — Legendary post-exploitation tool built to dump plain-text passwords, NTLM hashes, and Kerberos tickets directly from Windows memory (LSASS).
*   **lazagne** — Post-exploitation script used to retrieve passwords stored locally inside browsers, email clients, databases, and Wi-Fi profiles.
*   **samdump2** — Command-line tool used to extract Windows NTLM password hashes from offline SAM registry hives.
*   **chntpw** — Utility to reset user passwords or clear local administrator flags in Windows SAM databases.

#### C. Tunneling, Pivoting, & Proxying
*   **chisel** — Fast TCP/UDP tunnel transport tool over HTTP, secured via SSH, used to pivot through firewalls.
*   **proxychains-ng** — Tool that forces any TCP connection made by a command-line program to follow a chain of proxies (SOCKS4/SOCKS5/HTTP).
*   **ligolo-ng** — Advanced, user-space tunneling tool that establishes TUN interfaces to easily pivot into internal networks.
*   **socat** — Multipurpose relay tool that establishes two bidirectional byte streams and transfers data between them.
*   **iodine** — Tunneling tool that allows routing IPv4 traffic through a DNS server (DNS tunneling for egress).
*   **ptunnel** — Utility that tunnels IP packets over ICMP echo request/reply packets (ping tunneling).

---

## Part 6: Forensics, Reporting, & Social Engineering

### Category 11: Forensics
*Tools used to capture memory, image hard drives, recover deleted files, inspect firmware, and analyze digital evidence.*

#### A. Disk Imaging & File System Forensics
*   **autopsy** — Graphical interface for The Sleuth Kit (TSK), providing a full digital forensics platform for disk analysis, file recovery, and timeline creation.
*   **sleuthkit** — Collection of command-line tools (`fls`, `mmls`, `icat`, `fsstat`) used to analyze volume and file system structures in disk images.
*   **guymager** — Fast, user-friendly graphical forensic imager for creating Bit-Stream raw (`.dd`) or Expert Witness Format (`.E01`) evidence images.
*   **dcfldd** — Enhanced version of the standard `dd` imaging command, featuring on-the-fly hashing (MD5/SHA256) and progress indicators for forensic acquisition.
*   **ewf-tools** — Suite of utilities for reading, writing, and acquiring Expert Witness Compression Format (`.E01`) forensic images.

#### B. Memory Forensics
*   **volatility3** — The leading open-source memory forensics framework for extracting processes, network sockets, DLLs, and passwords from volatile RAM dumps.
*   **winpmem** — Open-source acquisition tool used to dump volatile memory (RAM) from live Windows systems.

#### C. File Carving & Data Recovery
*   **foremost** — Console program that recovers (carves) lost files based on their headers, footers, and internal data structures.
*   **scalpel** — Fast, file-carving tool derived from Foremost, optimized for low-memory usage and multi-threading.
*   **magicrescue** — Scans block devices for file magic bytes and extracts specified file types using external helper applications.
*   **testdisk** — Powerful data recovery software designed to help recover lost partition tables and fix unbootable disks.
*   **photorec** — File data recovery software designed to recover lost images, documents, and archives from damaged storage media.

#### D. Document, Firmware, & Artifact Analysis
*   **binwalk** — Tool designed for analyzing, reverse engineering, and extracting executable code and files embedded inside firmware images.
*   **bulk_extractor** — High-speed feature extraction tool that scans drive images for structured data (emails, credit card numbers, URLs, and EXIF data) without parsing the file system.
*   **pdf-parser & pdfid** — Didier Stevens' Python utilities used to inspect, extract elements from, and analyze suspicious or malicious PDF files.
*   **exiftool** — Library and utility for reading, writing, and editing file metadata across hundreds of image, video, and document formats.
*   **chkrootkit & rkhunter** — Local scanner tools that inspect Linux systems for known rootkits, backdoors, and suspicious system modifications.

---

### Category 12: Reporting Tools
*Tools used to aggregate findings, document security assessments, and build professional client reports.*

*   **faraday** — Integrated collaborative environment that aggregates outputs from terminal tools (Nmap, Burp, Metasploit) into a centralized dashboard for real-time team reporting.
*   **dradis** — Open-source collaboration and reporting workspace for security teams, automating report generation into Word and PDF templates.
*   **cherrytree** — Hierarchical note-taking application featuring rich text formatting, syntax highlighting, and password protection, widely used for penetration test note-keeping.

---

### Category 13: Social Engineering Tools
*Frameworks designed to conduct social engineering campaigns, simulate phishing, and build malicious payloads.*

*   **social-engineer-toolkit (SET)** — Comprehensive framework built by TrustedSec to generate social engineering attacks, fake credential-harvesting web clones, malicious USBs, and spear-phishing campaigns.
*   **king-phisher** — Enterprise-grade phishing campaign simulator used to assess user awareness and simulate real-world email threats.
*   **gophish** — Open-source phishing framework designed to easily execute and track simulated phishing campaigns across organizations.
