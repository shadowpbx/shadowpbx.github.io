# 🐉 Kali Linux Security Tools: Master Reference Index

Welcome to the **Comprehensive Kali Linux Tools Master Study Companion**. This guide categorizes all 229 essential penetration testing, defensive analysis, and digital forensics tools organized across the **13 Official Kali Linux Application Categories**.

---

## 📑 Table of Contents

- [Category 01: Information Gathering (Reconnaissance & OSINT).](#category-01-information-gathering-reconnaissance-osint)
- [Category 02: Vulnerability Analysis.](#category-02-vulnerability-analysis)
- [Category 03: Web Application Analysis.](#category-03-web-application-analysis)
- [Category 04: Database Assessment.](#category-04-database-assessment)
- [Category 05: Password Attacks.](#category-05-password-attacks)
- [Category 06: Wireless Attacks.](#category-06-wireless-attacks)
- [Category 07: Reverse Engineering.](#category-07-reverse-engineering)
- [Category 08: Exploitation Tools.](#category-08-exploitation-tools)
- [Category 09: Sniffing & Spoofing.](#category-09-sniffing-spoofing)
- [Category 10: Post Exploitation.](#category-10-post-exploitation)
- [Category 11: Forensics.](#category-11-forensics)
- [Category 12: Reporting Tools.](#category-12-reporting-tools)
- [Category 13: Social Engineering Tools.](#category-13-social-engineering-tools)

---

> **Overview:** A comprehensive master reference index mapping the essential security tools in Kali Linux—organized directly into its 13 official application categories covering reconnaissance, vulnerability analysis, web applications, database assessment, password attacks, wireless security, reverse engineering, exploitation, sniffing/spoofing, post-exploitation, digital forensics, reporting, and social engineering.

# Part 1: Information Gathering & Vulnerability Analysis.


## 🛠️ Category 01: Information Gathering (Reconnaissance & OSINT).

> *Tools used to map external attack surfaces, discover hosts, perform OSINT, and enumerate protocols.*


### 🔹 A. Network & Port Scanners.

- **`nmap`**: The industry-standard network mapper for host discovery, port scanning, OS detection, and vulnerability scripting.
- **`masscan`**: Asynchronous, ultra-high-speed network scanner capable of scanning the entire public internet in minutes.
- **`hping3`**: Command-line TCP/IP packet assembler and analyzer used for firewall testing, custom packet crafting, and port scanning.
- **`unicornscan`**: Asynchronous network stimulus engine designed for accurate port scanning and OS fingerprinting.
- **`netdiscover`**: Active and passive ARP reconnaissance tool for discovering live IP addresses and MAC addresses on local networks.
- **`arp-scan`**: Lightweight command-line tool that transmits raw ARP packets to discover and map local network devices.
- **`fping`**: High-performance ping utility that sends ICMP echo requests to multiple target hosts simultaneously.
- **`naabu`**: Modern, fast SYN/CONNECT port scanner by ProjectDiscovery designed for high-speed infrastructure enumeration.
- **`dmitry`**: Deepmagic Information Gathering Tool for gathering subdomains, emails, uptime, whois, and port scans.
- **`legion`**: Graphical network penetration testing framework based on Qaspire that automates Nmap scanning and service enumeration.

### 🔹 B. DNS & Subdomain Enumeration.

- **`amass`**: In-depth OWASP framework for DNS mapping, attack surface discovery, and external asset mapping.
- **`subfinder`**: Ultra-fast passive subdomain discovery tool by ProjectDiscovery that aggregates passive online sources.
- **`dnsrecon`**: Comprehensive DNS enumeration tool for checking zone transfers, reverse lookups, and wildcard records.
- **`dnsenum`**: Perl script that enumerates DNS information, performs reverse lookups, and brute-forces subdomains.
- **`fierce`**: DNS reconnaissance tool designed to locate non-contiguous IP space and test for DNS zone transfers.
- **`sublist3r`**: Python tool designed to enumerate subdomains using search engines and public threat intelligence feeds.
- **`knockpy`**: Python tool designed to enumerate subdomains on a target domain through wordlist dictionary brute-forcing.
- **`pagodo`**: Passive Google dorking tool that automates scraping Google search results for vulnerable subdomains.
- **`dnstracer`**: Diagnostic tool that traces a given domain name directly to its authoritative hostname servers.
- **`dnsdict6`**: Fast dictionary-based tool used to enumerate IPv6 addresses for a given target domain.

### 🔹 C. OSINT & Email / Social Media Harvesting.

- **`theHarvester`**: Gathers employee emails, names, subdomains, IPs, and URLs from public search engines and PGP key servers.
- **`recon-ng`**: Modular Web Reconnaissance framework with an interactive console interface similar to Metasploit.
- **`maltego`**: Interactive graphical link-analysis tool used for gathering, correlating, and visualizing intelligence data.
- **`spiderfoot`**: Open Source Intelligence automation tool that queries over 100 public data sources to map threat intelligence.
- **`metagoofil`**: Document metadata extractor that analyzes public PDF, DOCX, and XLSX files to uncover usernames and software versions.
- **`sherlock`**: Hunt down social media accounts across hundreds of online platforms using a single target username.
- **`osrframework`**: Collection of Python libraries and tools designed for online username research and anonymity analysis.
- **`gowitness`**: Go-based web screenshotting tool used to capture visual screenshots of web services during reconnaissance.

### 🔹 D. Active Directory & Protocol Enumeration.

- **`enum4linux`**: Classic tool for enumerating data from Windows and Samba hosts (users, shares, password policies).
- **`enum4linux-ng`**: Modern, refactored C++ and Python replacement for enum4linux with enhanced speed and evasion.
- **`smbmap`**: High-speed SMB share enumeration tool that searches across entire domains for accessible drives and permissions.
- **`smbclient`**: Command-line FTP-like client used to access, browse, and query SMB/CIFS shares on Windows and Linux servers.
- **`nbtscan`**: NetBIOS name network scanner used to discover Windows hostnames and MAC addresses over IP.
- **`crackmapexec / NetExec`**: The Swiss army knife for Active Directory protocol enumeration across SMB, LDAP, WinRM, and SSH.
- **`ldapsearch`**: Command-line tool used to query Active Directory domain controllers over LDAP and extract directory data.
- **`onesixtyone`**: High-performance SNMP scanner designed to brute-force SNMP community strings at extreme speeds.
- **`snmpcheck`**: Open-source reconnaissance tool designed to enumerate SNMP devices and display system hardware and process info.
- **`snmpwalk`**: Standard SNMP application that queries a device using GETNEXT requests to dump entire MIB trees.

## 🛠️ Category 02: Vulnerability Analysis.

> *Tools used to identify unpatched software, weak configurations, and protocol security flaws.*


### 🔹 A. General & Web Vulnerability Scanners.

- **`nuclei`**: Modern, fast, and template-based vulnerability scanner by ProjectDiscovery for detecting known CVEs and misconfigurations.
- **`nikto`**: Open-source web server scanner that tests for dangerous files, outdated server software, and configuration flaws.
- **`golismero`**: Open-source framework for security testing that unifies and correlates outputs from Nikto, Nmap, and OpenVAS.
- **`lynis`**: Security auditing and compliance tool for Unix and Linux systems that checks local configurations and hardening levels.
- **`nmap-nse`**: Built-in Nmap Scripting Engine containing thousands of scripts to query and detect known CVE vulnerabilities.
- **`openvas / gvm`**: Greenbone Vulnerability Management suite providing comprehensive network and host vulnerability scanning.

### 🔹 B. Fuzzers & Protocol Auditors.

- **`afl++ (American Fuzzy Lop Plus Plus)`**: Advanced coverage-guided binary fuzzer for finding memory corruption flaws in software.
- **`sfuzz`**: Simple, black-box command-line fuzzer used to discover buffer overflows in network protocol implementations.
- **`spike`**: Fuzzer development framework designed to create custom SPIKE scripts for auditing unknown network protocols.
- **`bed`**: Plain-text protocol fuzzer designed to check services for buffer overflows, format string bugs, and integer flaws.

### 🔹 C. Network Infrastructure & VoIP Auditing.

- **`yersinia`**: Network framework tool designed to exploit Layer 2 protocols (STP, CDP, DTP, DHCP, HSRP).
- **`cisco-auditing-tool (CAT)`**: Specialized scanner used to check Cisco routers and switches for weak passwords and flaws.
- **`cisco-global-exploiter (CGE)`**: Testing tool designed to assess and validate vulnerabilities across Cisco network hardware.
- **`cisco-torch`**: Mass-scanning tool for Cisco routers that tests Telnet, SSH, Web, and SNMP services simultaneously.
- **`SIPvicious (svmap, svwar, svcrack)`**: Suite of security tools used to audit SIP and VoIP phone systems for extension numbers and passwords.
- **`voiphopper`**: Security testing tool that automates VLAN hopping attacks on corporate VoIP network infrastructure.

### 🔹 D. System & Privilege Escalation Checks.

- **`unix-privesc-check`**: Shell script that audits local Unix systems for misconfigured file permissions that permit privilege escalation.
- **`checksec`**: Shell script used to verify binary security properties (ASLR, NX, Stack Canaries, PIE, RELRO).
- **`linux-exploit-suggester`**: Script that inspects Linux kernel versions against public exploit databases to suggest missing kernel patches.
- **`wesng (Windows Exploit Suggester Next Generation)`**: Tool that analyzes Windows systeminfo output to suggest missing privilege escalation CVE patches.

# Part 2: Web Applications & Database Assessment.


## 🛠️ Category 03: Web Application Analysis.

> *Tools used to inspect web traffic, scan CMS platforms, brute-force hidden directories, fuzz parameters, and test web logic.*


### 🔹 A. Web Proxies & Interceptors.

- **`burpsuite`**: The industry-standard web security proxy for intercepting, modifying, and automating HTTP and HTTPS web traffic.
- **`zaproxy (OWASP ZAP)`**: Free, open-source web application security proxy and automated vulnerability scanner.
- **`mitmproxy`**: Interactive, command-line SSL/TLS-capable intercepting HTTP proxy for inspecting and modifying traffic.

### 🔹 B. Content Management System (CMS) Scanners.

- **`wpscan`**: Black-box WordPress vulnerability scanner for enumerating installed plugins, themes, users, and weak passwords.
- **`joomscan`**: Specialized open-source vulnerability scanner designed to detect flaws in Joomla CMS installations.
- **`droopescan`**: Plugin and theme scanner designed to audit Drupal, Silverstripe, and Joomla CMS platforms.
- **`cmseek`**: Automated CMS detection and exploitation framework supporting over 180 distinct CMS platforms.

### 🔹 C. Web Directory & Parameter Brute-Forcers.

- **`gobuster`**: High-speed Go-based tool used to brute-force URIs (directories/files), DNS subdomains, and virtual hosts.
- **`ffuf (Fuzz Faster U Fool)`**: Extremely fast web fuzzer written in Go for directory discovery, parameter fuzzing, and VHost scanning.
- **`feroxbuster`**: Fast, simple, recursive web content discovery tool written in Rust supporting multi-threading and proxying.
- **`dirb`**: Classic dictionary-based web content scanner that tests web servers for hidden directories and files.
- **`dirbuster`**: Multi-threaded Java graphical application designed to brute-force web server directory and file names.
- **`wfuzz`**: Flexible and modular web application fuzzer used to test GET/POST parameters, HTTP headers, and authentication forms.
- **`dirsearch`**: Advanced command-line tool designed to brute-force directories and files in web servers with status code coloring.
- **`arjun`**: High-speed HTTP parameter discovery tool designed to find hidden query and body parameters in web endpoints.
- **`kiterunner`**: Cloud-native API endpoint and route discovery tool designed for modern REST and GraphQL APIs.

### 🔹 D. Web Fingerprinting & Vulnerability Tools.

- **`whatweb`**: Web scanner that identifies website technologies, CMS platforms, JavaScript libraries, and server versions.
- **`commix`**: Automated command injection testing tool designed to detect and exploit OS command injection flaws in web applications.
- **`jwt_tool`**: Comprehensive python toolkit for validating, forging, and cracking JSON Web Tokens (JWT).
- **`dalfox`**: Powerful parameter analysis and Cross-Site Scripting (XSS) scanner with integrated DOM parser.
- **`wapiti`**: Black-box web vulnerability scanner that audits web applications by injecting payloads into input forms.
- **`gitleaks`**: Automated tool designed to detect and scan git repositories for hardcoded secrets, passwords, and API keys.
- **`weevely`**: Stealthy PHP web shell framework that provides an authenticated, terminal-like remote shell over HTTP.
- **`webshells`**: Collection of pre-packaged webshells (PHP, ASP, ASPX, JSP) stored in /usr/share/webshells.

## 🛠️ Category 04: Database Assessment.

Tools dedicated to discovering database services, testing SQL injection vulnerabilities, and extracting backend data.


### 🔹 A. SQL Injection & Exploitation Frameworks.

- **`sqlmap`**: The world-leading open-source automated tool for detecting and exploiting SQL injection flaws and taking over database servers.
- **`sqlninja`**: SQL injection tool targeted specifically at Microsoft SQL Server backends that use web applications as entry points.
- **`bbqsql`**: Python-based blind SQL injection framework designed to automate custom and esoteric blind SQLi attacks.
- **`nosqlmap`**: Automated penetration testing framework for discovering and exploiting NoSQL database systems like MongoDB.

### 🔹 B. Database Enumeration & Client Tools.

- **`hexorbase`**: Graphical database client designed to audit, query, and brute-force MySQL, Oracle, PostgreSQL, and SQLite servers.
- **`odat (Oracle Database Attacking Tool)`**: Python tool designed to test Oracle Database security and execute OS commands.
- **`oscanner`**: Java-based Oracle database scanner that conducts SID brute-forcing, password testing, and enumeration.
- **`tnscmd10g`**: Command-line tool used to issue status and ping commands directly to Oracle TNS Listener services.
- **`msqlpscan`**: Microsoft SQL Server port scanner, version detector, and password auditor.
- **`redis-cli`**: Command-line interface for querying, auditing, and exploiting unauthenticated Redis in-memory databases.

# Part 3: Password Attacks & Wireless Attacks.


## 🛠️ Category 05: Password Attacks.

Tools used for offline password hash cracking, online network brute-forcing, wordlist generation, and credential extraction.


### 🔹 A. Offline Password Crackers & Hash Analyzers.

- **`john (John the Ripper)`**: Legendary multi-engine offline password cracker supporting hundreds of hash and cipher formats.
- **`hashcat`**: The world-leading GPU-accelerated password cracking engine capable of processing billions of hashes per second.
- **`ophcrack`**: Windows password cracker based on Rainbow Tables with a graphical interface.
- **`rainbowcrack`**: Implementation of Philippe Oechslin's faster time-memory trade-off technique for cracking cryptographic hashes.
- **`hashid`**: Python tool used to identify the specific cryptographic hash algorithm based on string length and formatting.
- **`nth (Name That Hash)`**: Modern hash identification tool that categorizes hash strings and outputs Hashcat and John flags.
- **`pypykatz`**: Pure Python implementation of Mimikatz for offline LSASS minidump parsing and credential extraction on Linux.

### 🔹 B. Online Network Login Brute-Forcers.

- **`hydra (THC-Hydra)`**: High-speed, parallelized online login brute-forcing tool supporting over 50 protocols (SSH, RDP, SMB, FTP).
- **`medusa`**: Speedy, parallel, modular online password brute-forcing utility for network authentication services.
- **`ncrack`**: High-speed network authentication cracking tool built by the Nmap project.
- **`patator`**: Multi-threaded, modular brute-forcing tool designed to audit network services through a unified interface.
- **`crowbar`**: Specialized brute-forcing tool targeted at SSH private keys, RDP (NLA), and VNC protocols.
- **`kerbrute`**: High-speed tool used to perform Kerberos pre-authentication brute-forcing and Active Directory user enumeration.

### 🔹 C. Wordlist Generators & Manipulators.

- **`crunch`**: Wordlist generator that builds custom dictionary files based on specified character sets, patterns, and lengths.
- **`cewl`**: Spidering application that navigates a target website and extracts unique words to create targeted custom wordlists.
- **`rsmangler`**: Wordlist permutation tool that applies alterations, prefixes, and suffixes to expand existing dictionary files.
- **`statsprocessor`**: High-performance wordlist generator based on per-position character statistics and mask rules.
- **`wordlists`**: A Kali metapackage that provides pre-installed industry dictionaries (including rockyou.txt and SecLists).

### 🔹 D. Local Credential & SAM Extractors.

- **`chntpw`**: Utility used to reset passwords or edit the SAM database on Windows installations directly from a boot disk.
- **`samdump2`**: Tool used to extract Windows NTLM password hashes from offline SAM and SYSTEM registry hives.
- **`gpp-decrypt`**: Utility used to decrypt Group Policy Preferences passwords stored in Active Directory SYSVOL XML files.
- **`fcrackzip`**: High-speed, multi-threaded password cracker for encrypted ZIP archive files.
- **`pdfcrack`**: Small command-line password recovery tool for password-protected PDF documents.

## 🛠️ Category 06: Wireless Attacks.

Tools for auditing Wi-Fi (802.11), Bluetooth, RFID/NFC, and Software Defined Radio (SDR) security.


### 🔹 A. Wi-Fi (802.11) Auditing Suites.

- **`aircrack-ng suite`**: Complete 802.11 wireless security suite:
- airmon-ng: Enables monitor mode on wireless network interface cards.

- airodump-ng: Captures raw 802.11 frames, beacons, and 4-way authentication handshakes.

- aireplay-ng: Injects wireless frames and executes deauthentication attacks.

- aircrack-ng: Cracks WEP and WPA/WPA2-PSK key handshakes.

- **`wifite`**: Automated Python script that cycles through wireless attacks on nearby WPA, WPA2, and WPS networks.
- **`airgeddon`**: Multi-use bash framework for auditing wireless networks (supporting Rogue AP, Evil Twin, and Captive Portals).
- **`kismet`**: Wireless network detector, packet sniffer, and intrusion detection system for 802.11, Bluetooth, and Zigbee.
- **`hcxdumptool & hcxtools`**: Modern PMKID wireless attack suite that captures WPA/WPA2 hashes without client deauthentication.
- **`eaphammer`**: Targeted Evil Twin and Rogue AP framework designed to audit WPA2-Enterprise (802.1X) wireless networks.
- **`fern-wifi-cracker`**: Graphical wireless auditing tool designed to automate WEP, WPA, and WPS attacks.
- **`cowpatty`**: Tool used to execute offline dictionary attacks against WPA-PSK networks using precomputed PMK tables.

### 🔹 B. WPS (Wi-Fi Protected Setup) Exploitation.

- **`reaver`**: Brute-force attack tool designed to exploit WPS PIN flaws and recover WPA/WPA2 passphrases.
- **`pixiewps`**: Tool written in C used to offline brute-force the WPS PIN of vulnerable Access Points (Pixie Dust attack).
- **`bully`**: C-based implementation of the WPS PIN brute-force attack, built as an alternative to Reaver.

### 🔹 C. Bluetooth & Zigbee Security Tools.

- **`btscanner`**: Environment scanner that extracts Bluetooth device information without pairing.
- **`bluelog`**: Bluetooth site-survey tool designed to log discoverable devices in the surrounding physical area.
- **`spooftooph`**: Tool designed to spoof Bluetooth device names, classes, and MAC addresses.
- **`crackle`**: Tool that decrypts BLE (Bluetooth Low Energy) encryption and captures pairing keys.
- **`ubertooth-specan`**: Spectrum analyzer utilities used alongside Ubertooth One wireless hardware.
- **`killerbee`**: Python-based framework and tool suite for testing and attacking ZigBee wireless networks.

### 🔹 D. RFID, NFC, & Software Defined Radio (SDR).

- **`proxmark3`**: Client software for communicating with Proxmark3 hardware to clone, read, and emulate RFID and NFC tags.
- **`mfcuk (Mifare Classic Universal Toolkit)`**: Offline key recovery tool for Mifare Classic RFID smart cards.
- **`mfoc (Mifare Classic Offline Cracker)`**: Fast key recovery tool for Mifare Classic cards when at least one key is known.
- **`gqrx-sdr`**: Open-source Software Defined Radio receiver powered by GNU Radio and Qt.
- **`hackrf`**: Command-line utilities for managing HackRF One SDR hardware.
- **`kalibrate-rtl (kal)`**: Calculates local GSM base station frequencies to calibrate RTL-SDR dongles.

# Part 4: Reverse Engineering & Exploitation Tools.


## 🛠️ Category 07: Reverse Engineering.

> *Tools used to decompile, disassemble, debug, and analyze binary executables, firmware, and mobile packages.*


### 🔹 A. Disassemblers & Decompilers.

- **`ghidra`**: NSA-developed open-source software reverse engineering suite featuring a decompiler, disassembler, and scripting.
- **`radare2 (r2)`**: UNIX-like command-line reverse engineering framework for disassembling, patching, and analyzing binaries.
- **`iaito (formerly Cutter)`**: Official graphical user interface frontend for the radare2 reverse engineering framework.
- **`bytecode-viewer`**: Java reverse engineering suite containing multiple decompilers (FernFlower, CFR, Procyon) and a bytecode editor.
- **`plasma`**: Interactive disassembler for x86, x64, ARM, and MIPS binaries that generates pseudo-code.
- **`pycdc / uncompyle6`**: Python bytecode reverse engineering tools for decompiling compiled Python (.pyc) files into source code.

### 🔹 B. Debuggers & Dynamic Tracers.

- **`gdb (GNU Debugger)`**: The standard Linux command-line debugger for x86, x64, and ARM binaries.
- **`pwndbg / GEF`**: GDB Enhanced Features plugins providing memory visualization, heap analysis, and exploit development helpers.
- **`edb-debugger`**: Cross-platform 32-bit and 64-bit GUI debugger designed for Linux binaries.
- **`ollydbg`**: 32-bit assembler level analyzing debugger for Windows executables (running via Wine on Kali).
- **`strace`**: System call tracer that monitors and records interactions between a binary and the Linux kernel.
- **`ltrace`**: Library call tracer that tracks dynamic library calls made by a binary during execution.
- **`frida`**: Dynamic code instrumentation toolkit used to hook functions, inject scripts, and inspect execution in real time.
- **`ropper / ROPgadget`**: Return-Oriented Programming (ROP) gadget finders used to build exploit chains bypassing DEP and ASLR.

### 🔹 C. Mobile App Reversing (Android & iOS).

- **`apktool`**: Tool for reverse engineering 3rd-party Android apps (decodes resources to nearly original form and rebuilds them).
- **`dex2jar`**: Translates Android Dalvik Executable (.dex) files into standard Java .jar files for analysis in JD-GUI.
- **`androguard`**: Python tool to analyze, decompile, and inspect Android application packages (.apk).
- **`jadx`**: Command-line and GUI decompiler that converts Android DEX and APK files into readable Java source code.
- **`checksec`**: Script used to verify security properties of compiled binaries (ASLR, NX, Stack Canaries, PIE, RELRO).

## 🛠️ Category 08: Exploitation Tools.

Frameworks, databases, and software designed to launch payloads and validate security vulnerabilities.


### 🔹 A. Exploitation Frameworks.

- **`metasploit-framework (msfconsole)`**: The world's leading penetration testing framework containing exploits, payloads, and post-modules.
- **`armitage`**: Graphical cyber attack management tool for Metasploit that visualizes targets and automates exploitation.
- **`routersploit`**: Open-source exploitation framework targeted specifically at embedded devices, home routers, and IoT hardware.

### 🔹 B. Exploitation Utilities & Databases.

- **`searchsploit`**: Command-line utility for searching the complete offline archive of Exploit-DB (/usr/share/exploitdb).
- **`shellnoob`**: Shellcode writing toolkit designed to generate, disassemble, assemble, and test custom shellcode.
- **`msfvenom`**: Payload generation and encoding utility (part of Metasploit) used to build custom reverse shells and executables.

### 🔹 C. Browser & Client-Side Exploitation.

- **`beef-xss (Browser Exploitation Framework)`**: Penetration testing tool focused on client-side browser hooks and web exploitation.
- **`social-engineer-toolkit (SET)`**: Framework designed to automate social engineering, malicious payload creation, and spear-phishing.

# Part 5: Sniffing, Spoofing, & Post Exploitation.


## 🛠️ Category 09: Sniffing & Spoofing.

> *Tools used to intercept network packets, manipulate Layer 2/3 routing, spoof host identities, and execute Man-in-the-Middle (MitM) attacks.*


### 🔹 A. Network Packet Sniffers & Analyzers.

- **`wireshark`**: The world's most widely used graphical packet analyzer for dissecting network protocols and troubleshooting.
- **`tshark`**: Terminal-based version of Wireshark for capturing and filtering network traffic from the command line.
- **`tcpdump`**: Classic, lightweight command-line packet analyzer for capturing and analyzing IP network packets.
- **`netsniff-ng`**: High-performance Linux network sniffer toolkit that utilizes zero-copy packet sockets.
- **`dsniff`**: Suite of tools for network auditing and password sniffing across various cleartext protocols.
- **`scapy`**: Powerful Python interactive packet manipulation program and library for forging and decoding network packets.

### 🔹 B. Man-in-the-Middle (MitM) & Spoofing Frameworks.

- **`bettercap`**: Modern, powerful, and modular framework for network reconnaissance, MitM, ARP/DNS spoofing, and BLE auditing.
- **`ettercap`**: Comprehensive suite for Man-in-the-Middle attacks on LAN networks supporting active and passive packet dissection.
- **`responder`**: LLMNR, NBT-NS, and mDNS poisoner used to capture NetNTLM hashes and relay authentication on Windows networks.
- **`mitm6`**: Specialized tool that exploits IPv6 DNS takeover by acting as a rogue DHCPv6 server in Active Directory environments.
- **`dnschef`**: Highly configurable DNS proxy tool designed for penetration testers to forge DNS responses.
- **`sslsplit`**: Transparent SSL/TLS interception tool used to perform Man-in-the-Middle attacks against encrypted network connections.
- **`macchanger`**: Utility to view, randomize, or temporarily spoof network interface MAC addresses.
- **`arpspoof`**: Tool (part of the dsniff package) that sends forged ARP responses to redirect network traffic through the attacker host.

## 🛠️ Category 10: Post Exploitation.

Tools used after gaining initial access to move laterally, escalate privileges, dump credentials, and tunnel traffic.


### 🔹 A. Active Directory & Lateral Movement.

- **`impacket`**: Collection of Python classes for working with network protocols, featuring tools for remote command execution:
- **`- psexec.py / wmiexec.py / smbexec.py`**: Command execution utilities over SMB and WMI.
- **`- secretsdump.py`**: Remote dumping of NTDS.dit, SAM, and LSA secrets.
- **`- atexec.py`**: Command execution via Windows Task Scheduler.
- **`evil-winrm`**: The ultimate shell client for accessing and managing Windows hosts via WinRM (Windows Remote Management).
- **`bloodhound`**: Active Directory mapping tool that visualizes domain relationships, permissions, and attack paths (using BloodHound-Python).
- **`certipy`**: Comprehensive tool for enumerating, abusing, and attacking Active Directory Certificate Services (ADCS).
- **`rubeus`**: Active Directory toolset for Kerberos interaction, ticket harvesting, Kerberoasting, and AS-REP roasting.

### 🔹 B. Credential Dumping & Local Privilege Escalation.

- **`mimikatz`**: Post-exploitation tool built to dump plain-text passwords, NTLM hashes, and Kerberos tickets directly from memory.
- **`PEASS-ng (linpeas.sh & winpeas.bat)`**: The premier automated privilege escalation enumeration scripts for Linux and Windows.
- **`lazagne`**: Post-exploitation application used to retrieve passwords stored locally inside browsers, email clients, and Wi-Fi profiles.
- **`samdump2`**: Command-line tool used to extract Windows NTLM password hashes from offline SAM registry hives.
- **`chntpw`**: Utility to reset user passwords or clear local administrator flags in Windows SAM databases.

### 🔹 C. Tunneling, Pivoting, & Command and Control (C2).

- **`chisel`**: Fast TCP/UDP tunnel transport tool over HTTP, secured via SSH, used to pivot through firewalls.
- **`ligolo-ng`**: Advanced, user-space tunneling tool that establishes TUN interfaces to easily pivot into internal networks.
- **`proxychains-ng`**: Tool that forces any TCP connection made by a command-line program to follow a chain of proxies (SOCKS4/5).
- **`socat`**: Multipurpose relay tool that establishes two bidirectional byte streams and transfers data between them.
- **`sliver`**: Modern, open-source multi-platform Command and Control (C2) framework for adversary emulation.
- **`iodine`**: Tunneling tool that allows routing IPv4 traffic through a DNS server (DNS tunneling for egress).
- **`ptunnel`**: Utility that tunnels IP packets over ICMP echo request/reply packets (ping tunneling).

# Part 6: Forensics, Reporting, & Social Engineering.


## 🛠️ Category 11: Forensics.

> *Tools used to capture memory, image hard drives, recover deleted files, inspect firmware, and analyze digital evidence.*


### 🔹 A. Disk Imaging & File System Forensics.

- **`autopsy`**: Graphical interface for The Sleuth Kit (TSK), providing a full digital forensics platform for disk analysis and timelines.
- **`sleuthkit`**: Collection of command-line tools (fls, mmls, icat, fsstat) used to analyze volume and file system structures.
- **`guymager`**: Fast, graphical forensic imager for creating Bit-Stream raw (.dd) or Expert Witness Format (.E01) images.
- **`dcfldd`**: Enhanced version of the standard dd imaging command featuring on-the-fly hashing and progress indicators.
- **`ewf-tools`**: Suite of utilities for reading, writing, and acquiring Expert Witness Compression Format (.E01) forensic images.

### 🔹 B. Memory Forensics & Artifact Analysis.

- **`volatility3`**: The leading open-source memory forensics framework for extracting processes, sockets, and passwords from RAM dumps.
- **`winpmem`**: Open-source acquisition tool used to dump volatile memory (RAM) from live Windows systems.
- **`yara`**: The pattern matching swiss army knife used by malware researchers to identify and classify malware samples.
- **`oletools`**: Collection of Python tools designed to analyze Microsoft OLE2 files, MS Office documents, and malicious VBA macros.

### 🔹 C. File Carving & Data Recovery.

- **`foremost`**: Console program that recovers (carves) lost files based on their headers, footers, and internal data structures.
- **`scalpel`**: Fast, file-carving tool derived from Foremost, optimized for low-memory usage and multi-threading.
- **`magicrescue`**: Scans block devices for file magic bytes and extracts specified file types using external helper applications.
- **`testdisk`**: Powerful data recovery software designed to help recover lost partition tables and fix unbootable disks.
- **`photorec`**: File data recovery software designed to recover lost images, documents, and archives from damaged storage media.

### 🔹 D. Document, Firmware, & Metadata Analysis.

- **`binwalk`**: Tool designed for analyzing, reverse engineering, and extracting executable code and files embedded inside firmware images.
- **`bulk_extractor`**: High-speed feature extraction tool that scans drive images for structured data without parsing file systems.
- **`pdf-parser & pdfid`**: Didier Stevens' Python utilities used to inspect and extract elements from suspicious PDF documents.
- **`exiftool`**: Library and command-line utility for reading, writing, and editing metadata across image, video, and document files.
- **`chkrootkit & rkhunter`**: Local scanner tools that inspect Linux systems for known rootkits, backdoors, and suspicious modifications.

## 🛠️ Category 12: Reporting Tools.

> *Tools used to aggregate findings, document security assessments, and build professional client reports.*

- **`faraday`**: Collaborative environment that aggregates outputs from terminal tools into a centralized dashboard for real-time reporting.
- **`dradis`**: Open-source collaboration and reporting workspace for security teams, automating report generation into templates.
- **`cherrytree`**: Hierarchical note-taking application featuring rich text formatting and syntax highlighting for pentest notes.

## 🛠️ Category 13: Social Engineering Tools.

Frameworks designed to conduct social engineering campaigns, simulate phishing, and build malicious payloads.

- **`social-engineer-toolkit (SET)`**: Comprehensive framework to generate social engineering attacks, fake web clones, and spear-phishing.
- **`gophish`**: Open-source phishing framework designed to easily execute and track simulated phishing campaigns across organizations.
- **`evilginx2`**: Advanced man-in-the-middle reverse proxy phishing framework used to capture login credentials and session tokens (2FA bypass).
- **`king-phisher`**: Enterprise-grade phishing campaign simulator used to assess user awareness and simulate real-world email threats.