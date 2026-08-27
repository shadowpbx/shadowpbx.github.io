# CompTIA A+ Core 2 (220-1202) Study Guide & Exam Objectives

Welcome to the **CompTIA A+ Core 2 (220-1202)** Comprehensive Study Companion. This guide covers all four official exam domains:

- **Domain 1.0: Operating Systems (28%)**
- **Domain 2.0: Security (28%)**
- **Domain 3.0: Software Troubleshooting (23%)**
- **Domain 4.0: Operational Procedures (21%)**

---

## 🖥️ DOMAIN 1.0: OPERATING SYSTEMS (28%)

### 1.1 Common Operating System (OS) Types & Purposes
* **Workstation Operating Systems**:
  * **Windows**: Enterprise and consumer desktop OS featuring broad software compatibility, Active Directory integration, and NTFS file system.
  * **Linux**: Open-source, highly modular Unix-like OS powered by various distributions (Ubuntu, Fedora, RHEL, Debian).
  * **macOS**: Proprietary Unix-based OS optimized for Apple desktop and laptop hardware.
  * **Chrome OS**: Lightweight, cloud-centric OS built around the Linux kernel and Chrome browser environment.
* **Mobile Operating Systems**:
  * **iPadOS**: Apple's tablet OS based on iOS, optimized for multitasking and pencil input.
  * **iOS**: Apple's mobile OS powering iPhone devices with sandboxed application execution.
  * **Android**: Google's open-source mobile OS based on the Linux kernel with customizable UIs.
* **Filesystem Types**:
  * **NTFS (New Technology File System)**: Default Windows file system; supports journaled logging, file-level permissions (ACLs), compression, and Encryption (EFS).
  * **ReFS (Resilient File System)**: High-availability Windows file system designed for maximum data integrity and large dataset resiliency.
  * **FAT32 (File Allocation Table 32)**: Legacy cross-platform file system; 4 GB maximum single file size limit, 32 GB volume size limit in standard Windows formatting.
  * **ext4 (Fourth Extended Filesystem)**: Default Linux file system offering high performance and journaling capabilities.
  * **XFS**: High-performance 64-bit journaling file system common in enterprise Linux distributions (RHEL/CentOS).
  * **APFS (Apple File System)**: Modern Apple file system optimized for flash/SSD storage with strong encryption and snapshot capabilities.
  * **exFAT (Extensible File Allocation Table)**: Modern cross-platform file system for flash drives without FAT32's 4 GB file size limitation.
* **Vendor Life-Cycle Limitations**:
  * **End-of-Life (EOL)**: Point at which vendors cease patch development, feature updates, and security support.
  * **Update Limitations**: Hardware architectural limits preventing older hardware from running newer OS builds.
* **Compatibility Concerns**: Architectural differences between OS families (32-bit vs. 64-bit, x86 vs. ARM, binary formats).

---

### 1.2 OS Installations & Upgrades
* **Boot Methods**:
  * **USB**: Bootable flash drives created using media creation tools or ISO image burners.
  * **Network**: Preboot Execution Environment (PXE boot) for loading installer images over local networks.
  * **Solid-State / Flash Drives**: External high-speed storage media.
  * **Internet-Based**: Cloud-assisted recovery/reinstallation (e.g., macOS Internet Recovery).
  * **External / Hot-Swappable Drive**: eSATA, USB 3.x, or Thunderbolt external drives.
  * **Internal Hard Drive Partition**: Dedicated recovery or installation partition.
  * **Multiboot**: Dual/multi-OS configurations loaded via boot managers (GRUB, Windows Boot Manager).
* **Types of Installations**:
  * **Clean Install**: Overwrites target partition, erasing existing OS and data for a fresh state.
  * **Upgrade**: Installs newer OS version while preserving user settings, applications, and files.
  * **Image Deployment**: Clones pre-configured master OS images to multiple systems via deployment tools (WDS, SCCM).
  * **Remote Network Installation**: Automated installation over local network shares.
  * **Zero-Touch Deployment**: Hands-free enterprise deployment using configuration management scripts and cloud enrollment (e.g., Windows Autopilot).
  * **Recovery Partition**: Factory reset partition integrated into OEM storage drives.
  * **Repair Installation**: Reinstalls core OS binaries without destroying user files or installed applications.
* **Other Considerations**: Third-party driver injection during OS setup (F6 disk drivers).
* **Partitioning Schemes**:
  * **GPT (GUID Partition Table)**: Modern partitioning scheme supporting up to 128 primary partitions and drives larger than 2 TB; requires UEFI.
  * **MBR (Master Boot Record)**: Legacy partitioning scheme; maximum 4 primary partitions and 2 TB drive size limit.
* **Drive Formatting**: Initializing file systems (NTFS, FAT32, exFAT, ext4).
* **Upgrade Considerations**:
  * Backup files and user preferences prior to upgrade.
  * Verify application and driver backward compatibility.
  * Confirm hardware requirement compliance.
* **Feature Updates & Product Life Cycle**: Managing Windows servicing channels (Current Channel vs LTSC).

---

### 1.3 Microsoft Windows Editions Features
* **Windows 10 Editions**:
  * **Home**: Consumer edition; lacks Active Directory domain joining, BitLocker, and Group Policy Editor.
  * **Pro**: Business edition; supports Domain Join, BitLocker, Remote Desktop Server, and Group Policy (`gpedit.msc`).
  * **Pro for Workstations**: Advanced business edition; supports NVDIMM-N storage, ReFS, and up to 4 CPUs / 6 TB RAM.
  * **Enterprise**: Volume license edition; includes DirectAccess, AppLocker, and BranchCache.
* **Windows 11 Editions**:
  * **Home, Pro, Enterprise**: Retain similar feature tiering with refreshed UI, strict TPM 2.0 / UEFI requirements, and VBS enabled by default.
* **N Versions**: European market editions built without media playback capabilities (Windows Media Player removed).
* **Feature Differences**:
  * **Domain vs. Workgroup**: Centralized Active Directory security management vs. peer-to-peer local account management.
  * **Remote Desktop Protocol (RDP)**: Client supported on all editions; Host/Server capability restricted to Pro and higher.
  * **RAM Limitations**: 32-bit limits to 4 GB RAM; 64-bit Home supports up to 128 GB; Pro supports up to 2 TB.
  * **BitLocker**: Full-disk encryption supported on Pro, Enterprise, and Education editions.
  * **Group Policy Editor (`gpedit.msc`)**: Management console available in Pro and Enterprise editions.
* **Upgrade Paths**: In-place upgrade vs. clean install rules.
* **Hardware Requirements**:
  * **TPM (Trusted Platform Module)**: Version 2.0 required for Windows 11 cryptographic security features.
  * **UEFI**: Required for Secure Boot and modern Windows 11 platform security.

---

### 1.4 Microsoft Windows Features & Administrative Tools
* **Task Manager (`taskmgr.exe`)**:
  * **Services**: View, start, stop, and restart background Windows services.
  * **Startup**: Manage startup application impact and enabled/disabled states.
  * **Performance**: Real-time CPU, Memory, Disk, Network, and GPU telemetry.
  * **Processes**: Monitor active applications, background processes, and resource utilization.
  * **Users**: View active user sessions and disconnect or log off accounts.
* **Microsoft Management Console (`mmc.exe`) Snap-Ins**:
  * **Event Viewer (`eventvwr.msc`)**: Inspect Application, Security, System, and Setup log entries.
  * **Disk Management (`diskmgmt.msc`)**: Partition, format, convert (Basic/Dynamic, MBR/GPT), and assign drive letters.
  * **Task Scheduler (`taskschd.msc`)**: Schedule automated scripts, tasks, and triggers.
  * **Device Manager (`devmgmt.msc`)**: Manage hardware drivers, update/rollback drivers, and resolve resource conflicts.
  * **Certificate Manager (`certmgr.msc`)**: Inspect, import, export, and manage user and computer digital certificates.
  * **Local Users and Groups (`lusrmgr.msc`)**: Manage local user accounts and local group memberships.
  * **Performance Monitor (`perfmon.msc`)**: Build custom performance counters, Data Collector Sets, and alerts.
  * **Group Policy Editor (`gpedit.msc`)**: Configure Computer and User local security policies.
* **Additional Utilities**:
  * **System Information (`msinfo32.exe`)**: Detailed summary of hardware, components, and software environment.
  * **Resource Monitor (`resmon.exe`)**: Granular per-process network, disk, memory, and CPU monitoring.
  * **System Configuration (`msconfig.exe`)**: Manage boot configuration, safe boot modes, services, and system tools.
  * **Disk Cleanup (`cleanmgr.exe`)**: Remove temporary files, update backups, and system dumps.
  * **Disk Defragmenter (`dfrgui.exe`)**: Defragment HDDs and trim SSD storage volumes.
  * **Registry Editor (`regedit.exe`)**: Direct editing of Windows Registry hives (`HKLM`, `HKCU`, `HKCR`, `HKU`, `HKCC`).

---

### 1.5 Command-Line Tools
* **Navigation Commands**:
  * `cd`: Change current working directory.
  * `dir`: List files and subdirectories.
* **Networking Tools**:
  * `ipconfig`: Display IP address details; `/all` for detailed MAC/DNS/DHCP; `/release` & `/renew` for DHCP management; `/flushdns` to clear DNS cache.
  * `ping`: Test ICMP connectivity to remote host; `-t` for continuous ping.
  * `netstat`: Display active TCP/UDP connections, listening ports (`-a`), and process IDs (`-o`).
  * `nslookup`: Query DNS name servers for domain records.
  * `net use`: Map network drives or disconnect shared resources.
  * `tracert`: Trace network hop path to target IP address using TTL expiration.
  * `pathping`: Combines ping and tracert to calculate packet loss across intermediate hops.
* **Disk Management Utilities**:
  * `chkdsk`: Inspect disk file system integrity; `/f` fixes errors, `/r` locates bad sectors and recovers readable data.
  * `format`: Format volume to specified file system.
  * `diskpart`: Command-line partition management utility.
* **File Management Commands**:
  * `md` / `mkdir`: Create directories.
  * `rd` / `rmdir`: Remove directories (`/s` for subdirectories).
  * `robocopy`: Robust file copy tool supporting mirror directory trees, resume, and permission retention.
* **System Information Commands**:
  * `hostname`: Output local machine netbios/DNS host name.
  * `net user`: Manage local user accounts and password resets.
  * `winver`: Display Windows version and build details dialog.
  * `whoami`: Output current logged-in domain/user identity and SID.
  * `[command] /?`: Display command help parameter context.
* **OS Management Commands**:
  * `gpupdate`: Force immediate update of local and domain group policy (`/force`).
  * `gpresult`: Display Resultant Set of Policy (RSoP) for user or computer (`/r`).
  * `sfc`: System File Checker; scans protected system files and replaces corrupted files (`/scannow`).

---

### 1.6 Configuring Microsoft Windows Settings
* **Control Panel & Modern Settings**:
  * **Internet Options**: Configure connections, proxy settings, security zones, and clearing temporary web files.
  * **Devices and Printers**: Manage connected peripherals, print queues, and default printer selections.
  * **Programs and Features**: Uninstall or modify desktop applications and Windows features.
  * **Network and Sharing Center**: Manage network adapters, active networks, and advanced sharing settings.
  * **Windows Defender Firewall**: Configure inbound and outbound firewall rules, private/public profiles, and domain rules.
  * **Mail**: Configure Outlook and MAPI mail profiles.
  * **Sound**: Adjust playback, recording devices, audio bitrates, and communications default devices.
  * **User Accounts**: Manage local user account types and UAC notification levels.
  * **File Explorer Options**:
    * **View Hidden Files**: Enable visibility of hidden files, folders, and system files.
    * **Hide Extensions**: Show or hide file extensions for known file types.
  * **Power Options**:
    * **Power Plans**: Balanced, High Performance, Power Saver, and Ultimate Performance modes.
    * **Sleep / Suspend**: Keeps system state in RAM with low power consumption.
    * **Hibernate**: Writes RAM contents to `hiberfil.sys` on storage drive and powers off completely.
    * **Fast Startup**: Hybrid shutdown saving kernel session to disk for accelerated boot times.
  * **Ease of Access**: Accessibility settings (Magnifier, Narrator, High Contrast, Sticky Keys).
  * **Time & Language**: Time zone, regional formatting, and language pack management.
  * **Update & Security**: Windows Update schedules, backup configurations, and recovery tools.

---

### 1.7 Windows Client Networking Configuration
* **Domain Joined vs. Workgroup**:
  * **Domain**: Centralized administration via Active Directory; single sign-on (SSO); centralized GPO enforcement.
  * **Workgroup**: Decentralized peer-to-peer network; local user accounts per machine.
  * **Shared Resources**: Mapping network drives (`\\server\share`), share vs. NTFS permissions, print servers.
* **Firewall Configuration**: Scoping rules by Network Profile (Domain, Private, Public), application exceptions, and port rules.
* **IP Configuration**: Static vs Dynamic (DHCP) IPv4/IPv6 address assignments, Subnet Masks, Default Gateway, DNS Servers.
* **Establishing Connections**:
  * **VPN (Virtual Private Network)**: Secure encrypted tunnel over public networks.
  * **Wireless (802.11)**: Wi-Fi connection setup, WPA2/WPA3 credentials.
  * **Wired (Ethernet)**: 802.3 RJ-45 copper or fiber link setup.
  * **WWAN (Cellular)**: Integrated SIM/eSIM broadband connection settings.
* **Proxy Settings**: Directing web traffic through proxy servers for logging and content filtering.
* **Network Types**: Public (restrictive network discovery) vs. Private (trusted local device discovery).

---

### 1.8 macOS Features & Tools
* **Application Management**:
  * App file types: `.dmg` (Disk Image), `.pkg` (Installer Package), `.app` (Application Bundle).
  * Installation via Mac App Store or drag-and-drop into `/Applications`.
  * Uninstallation: Trash removal and purging configuration profiles.
* **System Folder Structure**:
  * `/Applications`: System-wide installed applications.
  * `/Users`: User home directories.
  * `/Library`: System-wide application support and preferences.
  * `/System`: Protected core macOS operating system files.
* **macOS Features & Utilities**:
  * **Time Machine**: Automated incremental backup system supporting external drive and network target recovery.
  * **System Preferences / Settings**: Centralized OS configuration panel.
  * **Keychain**: Encrypted password and digital certificate storage manager.
  * **Spotlight (`Cmd + Space`)**: System-wide indexing search tool.
  * **Mission Control**: Overview of open windows, full-screen apps, and virtual desktops (Spaces).
  * **Disk Utility**: Disk formatting (APFS, HFS+), partitioning, and First Aid repair.
  * **FileVault**: Native full-disk encryption utilizing XTS-AES 128/256.
  * **Terminal**: Bash/Zsh Unix shell interface.
  * **Force Quit (`Cmd + Option + Esc`)**: Terminate unresponsive application processes.

---

### 1.9 Linux Client Features & Tools
* **File Management**:
  * `ls`: List directory contents (`-l` detailed, `-a` include hidden files).
  * `pwd`: Print working directory.
  * `mv`: Move or rename files/directories.
  * `cp`: Copy files or directories (`-r` recursive).
  * `rm`: Remove files (`-f` force, `-r` recursive directory delete).
  * `chmod`: Modify file permissions (Octal: `755`, `644`; Symbolic: `u+x`).
  * `chown`: Change file owner and group (`owner:group`).
  * `grep`: Search text patterns within files.
  * `find`: Search filesystem for files matching criteria.
* **Filesystem & Administration**:
  * `fsck`: Filesystem check and repair utility.
  * `mount` / `umount`: Mount or unmount storage filesystems to directory paths.
  * `su`: Switch user context (`su -` for root login environment).
  * `sudo`: Execute command with superuser / administrative privileges.
* **Package Management**:
  * `apt`: Debian / Ubuntu package manager (`apt update`, `apt upgrade`, `apt install`).
  * `dnf` / `yum`: RHEL / Fedora package manager.
* **Network & Information Utilities**:
  * `ip`: Show/manipulate routing, network devices, and interfaces (`ip addr`).
  * `ping`: Test host connectivity.
  * `curl`: Transfer data to/from servers via HTTP/HTTPS/FTP.
  * `dig`: DNS lookup utility.
  * `traceroute`: Display network packet route to target.
  * `top` / `htop`: Real-time process and system resource monitor.
  * `ps`: Report snapshot of current processes (`ps aux`).
  * `df`: Display disk space usage by filesystem (`df -h`).
  * `du`: Estimate file and directory space usage (`du -sh`).
* **Essential Configuration Files**:
  * `/etc/passwd`: Local user account information.
  * `/etc/shadow`: Encrypted user passwords and aging policies.
  * `/etc/hosts`: Static hostname-to-IP mapping entries.
  * `/etc/fstab`: Filesystem automount table configuration.
  * `/etc/resolv.conf`: DNS name server resolution configuration.

---

### 1.10 Application Installation & Deployment
* **System Requirements**:
  * **32-bit vs. 64-bit**: x86 (32-bit, max 4 GB RAM address space) vs. x64 (64-bit architecture support).
  * **Graphics**: Dedicated GPU (discrete VRAM) vs. Integrated GPU (shared system RAM).
  * **Storage & RAM**: Minimum and recommended system resource requirements.
* **Distribution Methods**: Physical media, ISO mountable image files, downloadable packages, enterprise image deployment.
* **Impact Considerations**: Assessing system, network bandwidth, business operations, and operational downtime before software rollouts.

---

### 1.11 Cloud-Based Productivity Tools
* **Cloud Platforms**: Microsoft 365, Google Workspace, AWS WorkSpaces.
* **Core Services**: Cloud email systems, cloud storage (OneDrive, Google Drive), collaboration suites, video conferencing (Teams, Zoom).
* **Identity & Access**: Federated identity synchronization (Azure AD / Entra ID Connect, SAML) and license assignment management.

---

## 🔒 DOMAIN 2.0: SECURITY (28%)

### 2.1 Security Controls & Measures
* **Physical Security**:
  * **Bollards**: Heavy-duty posts blocking vehicular entry.
  * **Access Control Vestibule (Man-trap)**: Dual-interlocking door entry space preventing tailgating.
  * **Badge Readers**: RFID / NFC proximity cards.
  * **Video Surveillance (CCTV)**: IP cameras with motion recording and NVR storage.
  * **Sensors & Locks**: Motion sensors, door contact alarms, equipment locks (Kensington locks).
  * **Security Guards & Fences**: Physical perimeter deterrence.
* **Physical Access Tokens & Biometrics**:
  * Key fobs, smart cards, mobile digital keys, retina/fingerprint/facial recognition scanners.
* **Logical Security**:
  * **Principle of Least Privilege**: Granting users only the minimum access necessary to perform assigned duties.
  * **Zero Trust Model**: Architecture assuming no implicit trust; continuously validates identity and authorization.
  * **Access Control Lists (ACLs)**: Rules defined on routers, firewalls, or file systems permitting or denying access.
  * **Multifactor Authentication (MFA)**: Requiring two or more factors: Something you know (password), Something you have (authenticator app/hardware token/SMS/TOTP), Something you are (biometrics).
  * **Single Sign-On (SSO)**: Authentication scheme allowing users to log in once and access multiple systems (SAML, OAuth, OIDC).
  * **Privileged Access Management (PAM)**: Specialized controls and session recording for administrative accounts.
  * **Data Loss Prevention (DLP)**: Monitoring and blocking unauthorized exfiltration of sensitive data.

---

### 2.2 Microsoft Windows OS Security Settings
* **Microsoft Defender Antivirus**: Real-time cloud protection, definition updates, quick/full/custom scans.
* **Windows Defender Firewall**: Profile management (Domain, Private, Public), port blocking, application exceptions.
* **User & Group Account Management**:
  * Local Accounts vs. Microsoft / Entra ID Accounts.
  * Account Types: Administrator, Standard User, Guest, Power User (legacy).
  * Authentication Options: Passwords, PINs, Biometrics (Windows Hello), SSO.
* **Permissions & File Systems**:
  * **NTFS vs. Share Permissions**: Share permissions apply over the network; NTFS permissions apply locally and over network. Most restrictive permission applies when combined.
  * **Inheritance**: Permission flow from parent folders to child subfolders and files.
  * **User Account Control (UAC)**: Prevents unauthorized system changes by prompting for elevation consent or admin credentials.
* **Encryption Technologies**:
  * **BitLocker**: Full-disk encryption for system and data drives; requires TPM.
  * **BitLocker-To-Go**: Encryption for removable USB flash drives.
  * **EFS (Encrypting File System)**: File and folder-level encryption linked to individual NTFS user account keys.
* **Active Directory Security**: Domain joining, logon scripts, Group Policy Objects (GPOs), Organizational Units (OUs), Security Groups.

---

### 2.3 Wireless Security & Authentication
* **Wireless Encryption Protocols**:
  * **WPA2**: Utilizes AES encryption with CCMP mechanism (replaces vulnerable WEP and WPA/TKIP).
  * **WPA3**: Modern standard utilizing Simultaneous Authentication of Equals (SAE) to resist offline dictionary attacks; 192-bit cryptographic suite in Enterprise mode.
* **Authentication Frameworks**:
  * **RADIUS**: Centralized AAA framework for Enterprise 802.1X network access authentication.
  * **TACACS+**: Cisco proprietary AAA protocol separating authentication, authorization, and accounting functions.
  * **Kerberos**: Ticket-based network authentication protocol used by Active Directory (Port 88).

---

### 2.4 Malware Types, Detection & Prevention
* **Malware Taxonomy**:
  * **Trojan**: Masquerades as legitimate software to execute malicious payloads.
  * **Rootkit**: Subverts OS kernel to hide files, processes, and privileged access.
  * **Virus**: Malicious code that attaches to executable host files and replicates upon execution.
  * **Spyware**: Secretly monitors user behavior, keystrokes, and browsing data.
  * **Ransomware**: Encrypts victim files and demands payment for decryption keys.
  * **Keylogger**: Captures physical keyboard inputs to harvest credentials.
  * **Boot Sector Virus**: Infects drive MBR/boot sector to execute before the OS loads.
  * **Cryptominer**: Unauthorized utilization of system hardware resources to mine cryptocurrency.
  * **Fileless Malware**: Operates entirely in RAM and uses living-off-the-land binaries (PowerShell, WMI) to avoid disk detection.
  * **PUP (Potentially Unwanted Program)**: Unwanted bundled software or adware.
* **Detection & Remediation Technologies**:
  * Endpoint Detection & Response (EDR), Extended Detection & Response (XDR), Managed Detection & Response (MDR).
  * Antivirus / Anti-malware definition updates, heuristics, email security gateways, anti-phishing training.

---

### 2.5 Social Engineering, Attacks & Vulnerabilities
* **Social Engineering Vectors**:
  * **Phishing**: Mass email attack deceiving victims into sharing sensitive credentials.
  * **Vishing / Smishing**: Voice phishing over telephone / SMS text phishing.
  * **Spear Phishing / Whaling**: Targeted phishing against specific individuals / high-profile corporate executives.
  * **Shoulder Surfing**: Observing private screen data physically.
  * **Tailgating**: Following authorized personnel into secure facilities without credential scanning.
  * **Dumpster Diving**: Searching trash receptacles for unredacted sensitive documents.
* **Network & Application Attacks**:
  * **DoS / DDoS**: Flooding targets with traffic to degrade or disrupt service availability.
  * **Evil Twin**: Rogue wireless AP impersonating a legitimate Wi-Fi SSID to intercept traffic.
  * **Zero-Day Attack**: Exploiting unpatched, previously unknown software vulnerabilities.
  * **On-Path Attack (MitM)**: Intercepting and potentially altering communications between two parties.
  * **Brute-Force / Dictionary Attacks**: Automated password guessing attacks.
  * **SQL Injection (SQLi)**: Injecting malicious SQL syntax into web form inputs to compromise backend databases.
  * **Cross-Site Scripting (XSS)**: Injecting malicious client-side scripts into web applications.
  * **Business Email Compromise (BEC)**: Impersonating executive email accounts to conduct fraudulent financial transfers.

---

### 2.6 SOHO Malware Removal Procedures (Standard 7/10 Step Process)
1. **Investigate and verify malware symptoms**: Identify unusual processes, alerts, or performance degradation.
2. **Quarantine infected system**: Isolate machine from local network, Wi-Fi, and Bluetooth immediately.
3. **Disable System Restore (in Windows)**: Prevents clean restore points from becoming infected or reintroducing malware.
4. **Remediate infected systems**:
   * Update anti-malware definition signatures.
   * Perform scans and removal in Safe Mode or Preinstallation Environment (PE).
5. **Schedule scans and run updates**: Set automated daily/weekly scans and apply latest OS security patches.
6. **Enable System Restore and create a new restore point**: Re-enable System Restore after verifying complete malware removal.
7. **Educate the end user**: Train users on phishing recognition, safe browsing habits, and security best practices.

---

### 2.7 Workstation Hardening & Best Practices
* **Data-at-Rest Encryption**: Enable BitLocker or FileVault across all endpoints.
* **Password Policies**: Enforce minimum length (12+ characters), complexity (uppercase, lowercase, numbers, symbols), uniqueness, and expiration policies.
* **BIOS / UEFI Passwords**: Set Supervisor and User BIOS passwords to prevent unauthorized boot sequence changes.
* **Account Hardening**:
  * Disable Guest account.
  * Implement account lockout thresholds for failed login attempts.
  * Restrict login times and user permissions.
  * Rename default Administrator account and change default passwords.
  * Disable AutoRun / AutoPlay for external media.
  * Disable unnecessary system services and close unused network ports.

---

### 2.8 Mobile Device Security
* **Device Encryption & Screen Locks**: Require PIN, complex passcode, fingerprint (Touch ID / Android Biometrics), or facial recognition (Face ID).
* **Remote Management & Protection**:
  * **MDM (Mobile Device Management)**: Enforce corporate security profiles, remote wipe commands, and application whitelisting.
  * **BYOD vs Corporate-Owned**: Segment corporate data from personal data using containerization.
  * **Locator Apps & Remote Wipe**: Locate lost devices via GPS and remotely purge sensitive data after threshold failed attempts.

---

### 2.9 Data Destruction & Disposal Methods
* **Physical Destruction**:
  * **Drilling / Shredding**: Mechanically destroying magnetic platters and memory chips.
  * **Degaussing**: Exposing magnetic storage (HDDs/tapes) to powerful electromagnetic fields to erase domain alignments.
  * **Incineration**: Thermal destruction of drive assemblies.
* **Logical Sanitization (Recycling / Repurposing)**:
  * **Wiping / Overwriting**: Writing zero/random bit patterns across all sectors (DoD 5220.22-M, NIST SP 800-88).
  * **Low-Level Formatting**: Factory-level block formatting (performed by manufacturers).
  * **Standard Formatting**: Clears file table entries (does not destroy raw underlying data).
* **Certificates of Destruction**: Documentation provided by certified third-party disposal vendors confirming compliant sanitization.

---

### 2.10 SOHO Network Security Configuration
* **Router Hardening**:
  * Change default administrator username and password.
  * Update router firmware to latest security release.
  * Disable Universal Plug and Play (UPnP) to block unauthorized port mappings.
  * Configure Screened Subnet (DMZ) for public-facing servers.
* **Wireless Hardening**:
  * Change default SSID name; consider disabling SSID broadcast (hidden SSID).
  * Enforce WPA3-Personal or WPA2-Enterprise encryption.
  * Configure isolated Guest Wi-Fi network with client isolation enabled.
* **Firewall Rules**: Disable unused physical ports, configure explicit port forwarding / mapping rules.

---

### 2.11 Browser Security Settings
* **Download & Installation Safeguards**: Verify download hashes (SHA-256) and download only from trusted sources.
* **Extension & Plugin Management**: Review permissions, audit installed extensions, disable untrusted plugins.
* **Browser Hardening**:
  * Enforce HTTPS connections (valid SSL/TLS certificate verification).
  * Enable pop-up blockers and ad-blocking extensions.
  * Use private browsing modes to prevent local cookie/history retention.
  * Configure Secure DNS (DNS-over-HTTPS / DoH).
  * Regularly clear browsing history, site cookies, and cached data.

---

## 🔧 DOMAIN 3.0: SOFTWARE TROUBLESHOOTING (23%)

### 3.1 Windows OS Troubleshooting
* **Blue Screen of Death (BSOD)**: Stop code error caused by faulty hardware drivers, RAM failure, or kernel corruption; analyze minidump files using `windbg`.
* **Degraded Performance**: Inspect Task Manager / Resource Monitor for high CPU, RAM, or Disk utilization; test for failing drives.
* **Boot Issues / No OS Found**: Verify boot order in UEFI/BIOS; repair MBR/GPT and boot files using `bootrec /fixmbr`, `bootrec /fixboot`, and `bootrec /rebuildbcd`.
* **Services Not Starting**: Check Event Viewer logs; verify service dependencies and service account credentials in `services.msc`.
* **Applications Crashing**: Update application, inspect Event Viewer Application logs, run `sfc /scannow` and `DISM`.
* **Time Drift**: Verify Network Time Protocol (NTP) service synchronization (`w32tm`).

---

### 3.2 Mobile OS & Application Troubleshooting
* **App Launch / Crash / Frozen Issues**: Force stop application, clear app cache and data, update application, or perform reinstall.
* **OS Update Failures**: Verify sufficient free internal storage space and stable battery charge / Wi-Fi connection.
* **Battery Drain & Overheating**: Inspect battery usage stats in settings; identify rogue background applications; replace degraded battery.
* **Connectivity Failures**: Toggle Airplane Mode; forget and reconnect to Wi-Fi networks; re-pair Bluetooth devices; reset network settings.

---

### 3.3 Mobile Security Troubleshooting
* **Symptoms of Mobile Infection**: Unusually high cellular data usage, rapid battery depletion, unexpected pop-up ads, unauthorized application installations.
* **Unintended Access Points**: Detect rooted/jailbroken OS states, developer mode enabled, or unauthorized third-party app stores (sideloading).
* **Remediation**: Remove malicious profiles, uninstall unauthorized apps, run mobile EDR/anti-malware scans, or perform factory reset.

---

### 3.4 Personal Computer (PC) Security Troubleshooting
* **Network & Browser Symptoms**: Inability to reach legitimate security sites, automatic browser redirection, certificate authority invalid warnings, flooded pop-up windows.
* **System File Symptoms**: Unexpected file attribute changes, locked/encrypted user files (ransomware), disabled antivirus protection or Windows Defender updates failing.
* **Remediation**: Isolate machine from network, boot into Safe Mode, run `sfc /scannow`, scan with offline anti-malware tools, or restore from clean offline backups.

---

## 📋 DOMAIN 4.0: OPERATIONAL PROCEDURES (21%)

### 4.1 Documentation & Support Information Management
* **Ticketing Systems**:
  * Track user information, asset serial numbers, issue description, severity level, progress notes, and resolution history.
  * Manage escalation paths (Tier 1 helpdesk -> Tier 2 desktop support -> Tier 3 engineering).
* **Asset Management**:
  * Maintain Configuration Management Database (CMDB), asset tags, procurement life cycle dates, warranty information, and assigned user records.
* **Standard Documentation Types**:
  * Incident Reports, Standard Operating Procedures (SOPs), Onboarding / Off-boarding Checklists, Service Level Agreements (SLAs), Knowledge Base (KB) articles.

---

### 4.2 Change Management Procedures
* **Change Control Process**:
  1. Submit formal **Change Request** detailing purpose and scope.
  2. Perform **Risk Analysis** and impact assessment.
  3. Formulate detailed **Rollback Plan** and **Backup Plan**.
  4. Perform **Sandbox Testing** in non-production environment.
  5. Obtain approval from **Change Advisory Board (CAB)**.
  6. Schedule change during authorized maintenance window / change freeze.
  7. Execute implementation, peer review, and end-user acceptance testing.

---

### 4.3 Workstation Backup & Recovery Methods
* **Backup Types**:
  * **Full**: Backs up all selected files; clears archive bit; slowest backup, fastest restore.
  * **Incremental**: Backs up files modified since last backup; clears archive bit; fast backup, slow multi-step restore.
  * **Differential**: Backs up files modified since last full backup; does NOT clear archive bit; moderate backup time, 2-step restore (Full + latest Differential).
  * **Synthetic Full**: Synthesizes full backup from previous full and incremental backups without re-reading source data.
* **Backup Strategies**:
  * **3-2-1 Rule**: 3 copies of data, on 2 different media types, with 1 copy stored offsite.
  * **Grandfather-Father-Son (GFS)**: Rotation scheme using daily (Son), weekly (Father), and monthly (Grandfather) backups.

---

### 4.4 Safety Procedures
* **Electrostatic Discharge (ESD) Protection**:
  * Use ESD grounding wrist straps, anti-static mats, and anti-static storage bags.
  * Equalize electrical potential between technician and computer chassis.
* **Electrical & Physical Safety**:
  * Disconnect power cords before servicing interior PC components (especially power supplies and CRTs).
  * Practice proper lifting techniques (lift with legs, not back).
  * Use safety goggles, air filter masks (when blowing dust), and proper cable management to eliminate trip hazards.

---

### 4.5 Environmental Controls
* **MSDS / SDS (Safety Data Sheets)**: Documentation detailing chemical properties, handling, hazards, and disposal instructions for batteries, toner cartridges, and cleaning solvents.
* **Environmental Awaremess**: Maintain appropriate ambient temperature, humidity levels (to prevent ESD or condensation), and dust-free environments.
* **Power Quality Protection**:
  * **Surge Suppressor**: Protects equipment against voltage spikes.
  * **UPS (Uninterruptible Power Supply)**: Provides emergency battery power during brownouts and blackouts.

---

### 4.6 Compliance, Licensing & Incident Response
* **Incident Response & Forensics**:
  * **Chain of Custody**: Documented chronological history tracking physical evidence collection, custody, transfer, and analysis.
  * **Order of Volatility**: Preserve most volatile evidence first (CPU Cache/Registers -> RAM -> Network State -> Storage Disks -> Optical Media).
  * **Data Integrity**: Create bit-stream forensic disk images and verify SHA-256 hashes.
* **Licensing & Policy Concepts**:
  * EULA, DRM, Commercial / Perpetual Licenses, Subscription Licenses, Open-Source Licenses (GPL, MIT, Apache).
  * Regulated Data: PII (Personally Identifiable Information), PHI (Protected Health Information), PCI-DSS (Payment Card Industry Data Security Standard), GDPR.
  * Acceptable Use Policy (AUP): Guidelines defining permissible employee use of corporate IT equipment.

---

### 4.7 Professionalism & Communication
* **Communication Best Practices**:
  * Maintain professional attire matching workplace environment (Business Casual / Formal).
  * Use clear language; avoid excessive technical jargon, acronyms, and slang with end users.
  * Practice active listening; clarify user statements with open-ended questions; avoid interrupting or being defensive.
  * Set realistic expectations, provide timeline updates, and follow up post-repair to verify customer satisfaction.
  * Respect confidentiality and sensitive data visible on customer screens or desks.

---

### 4.8 Scripting Fundamentals
* **Script File Types**:
  * `.bat`: Windows Batch script (Cmd).
  * `.ps1`: Windows PowerShell script.
  * `.vbs`: VBScript (Visual Basic Scripting Edition).
  * `.sh`: Linux Shell script (Bash/Zsh).
  * `.js`: JavaScript.
  * `.py`: Python script.
* **Use Cases**: Automating repetitive administrative tasks (user account creation, drive mapping, software deployment, automated backups, system metric gathering).

---

### 4.9 Remote Access Technologies
* **Remote Tools**:
  * **RDP (Remote Desktop Protocol)**: Port 3389; Windows graphical remote access.
  * **SSH (Secure Shell)**: Port 22; encrypted command-line shell access.
  * **VPN**: Encrypted tunnel into remote networks.
  * **VNC / RMM / WinRM**: Virtual Network Computing, Remote Monitoring & Management tools, Windows Remote Management (Port 5985/5986).
* **Security**: Enforce strong authentication, MFA, and encrypted transport protocols for all remote connections.

---

### 4.10 Artificial Intelligence (AI) Concepts
* **AI Integration**: Integration of LLMs, machine learning models, and automation assistants into enterprise workflows.
* **Policy & Ethics**: Guidelines governing appropriate use, preventing plagiarism, protecting intellectual property, and mitigating AI hallucination and bias risks.
* **Data Privacy**: Distinguishing between Public AI models (which may train on user inputs) and Private / Enterprise AI models (where data remains strictly confidential).