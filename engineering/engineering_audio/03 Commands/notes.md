# Command Line Masterclass: Master Study Guide & Reference

Welcome to the **Command Line Masterclass Master Study Guide**. This definitive reference provides tactical recipes, command syntax, flag breakdowns, mechanics, and troubleshooting triage across Windows CMD, Modern PowerShell, Linux/macOS Bash, Command Chaining Operators, Help Desk Run Consoles, and Production Scripting Environments.

---

## 🪟 Module 1: Windows Command Prompt (CMD & Core Utilities)

### 1.1–1.11 File & Directory Navigation
* **`cd` (Change Directory)**:
  * Syntax: `cd /d D:\Folder` (The `/d` switch is mandatory to switch drives and directories simultaneously).
  * `cd ..` navigates to parent; `cd \` jumps to the drive root.
* **`dir` (Directory Listing)**:
  * `dir /a:h` (show hidden files), `dir /s` (recursive directory search), `dir /b` (bare format; filenames only), `dir /o:d` (order by date).
* **`mkdir` / `md` (Make Directory)**: Creates single or nested directories (`mkdir Folder\Subfolder`).
* **`rmdir` / `rd` (Remove Directory)**:
  * `rmdir /s /q Folder`: Quiet, recursive deletion of non-empty folders without confirmation prompts.
* **`copy` & `move`**:
  * `copy file.txt D:\Backup\` (Copies files).
  * `move /y source.txt destination.txt` (Moves or renames files; `/y` suppresses overwrite prompt).
* **`del` (Delete File)**:
  * `del /f /q /s *.log`: Forces deletion of read-only files (`/f`), quiet mode (`/q`), through all subdirectories (`/s`).
* **`robocopy` (Robust File Copy for Windows)**:
  * Enterprise sync utility that resumes interrupted transfers.
  * Syntax: `robocopy C:\Source D:\Dest /mir /z /w:5 /r:3 /log:copy.log`
  * `/mir` (mirror directory tree), `/z` (restartable network mode), `/r:3` (3 retries on fail), `/w:5` (wait 5s between retries).
* **`tree`**: Visual ASCII tree representation (`tree /f` includes filenames, `tree /a` uses ASCII chars).
* **`xcopy`**: Legacy extended copy (`xcopy C:\Source D:\Dest /e /h /k /y`).
* **`cls`**: Clears the console viewport screen buffer.

### 1.12–1.15 System Diagnostics & Image Repair
* **`sfc` (System File Checker)**:
  * `sfc /scannow`: Scans integrity of protected system files and replaces corrupted files from `%WinDir%\System32\dllcache`.
  * Logs to `%WinDir%\Logs\CBS\CBS.log`.
* **`dism` (Deployment Image Servicing and Management)**:
  * Used when `sfc` fails because the local component store itself is corrupt.
  * `DISM /Online /Cleanup-Image /CheckHealth` (Quick scan).
  * `DISM /Online /Cleanup-Image /ScanHealth` (Detailed component store check).
  * `DISM /Online /Cleanup-Image /RestoreHealth` (Downloads pristine replacement binaries from Windows Update).
* **`chkdsk` (Check Disk)**:
  * `chkdsk C: /f /r /x`
  * `/f` (fixes file system directory errors), `/r` (locates bad physical sectors and recovers readable information; implies `/f`), `/x` (forces volume dismount).
* **`bootrec` (Windows Recovery Environment Boot Repair)**:
  * `bootrec /fixmbr`: Writes Master Boot Record to system partition.
  * `bootrec /fixboot`: Writes new volume boot sector.
  * `bootrec /scanos`: Scans disks for Windows installations not in BCD.
  * `bootrec /rebuildbcd`: Rebuilds the Boot Configuration Data store.

### 1.16–1.24 Process, Power & Disk Management
* **`tasklist` & `taskkill`**:
  * `tasklist /v /fi "STATUS eq RUNNING"`: Lists processes with memory and user context.
  * `taskkill /pid 4820 /f /t`: Force-kills PID 4820 and all spawned child processes (`/t`).
  * `taskkill /im notepad.exe /f`: Kills by executable image name.
* **`shutdown`**:
  * `shutdown /r /t 0`: Immediate system restart.
  * `shutdown /s /f /t 60 /c "Maintenance reboot"`: Forced shutdown after 60 seconds with comment.
  * `shutdown /a`: Abort pending shutdown.
* **`systeminfo`**: Generates full inventory (OS version, Hotfix KBs, BIOS date, physical memory, network cards).
* **`powercfg`**:
  * `powercfg /batteryreport`: Generates detailed HTML battery health report.
  * `powercfg /hibernate on|off`: Toggles hibernation file (`hiberfil.sys`).
  * `powercfg /devicequery wake_armed`: Lists devices capable of waking PC.
* **`format`**: High-level filesystem format (`format D: /fs:NTFS /q /v:DataBackup`).

### 1.25–1.35 Windows Networking & Active Directory
* **`hostname`**: Prints NetBIOS name of local workstation.
* **`ping`**:
  * `ping 8.8.8.8 -n 10 -l 1000` (Sends 10 packets of 1000 bytes).
  * `ping -t host`: Continuous ping until `Ctrl + C`.
* **`ipconfig` (IP Configuration)**:
  * `ipconfig /all`: Shows MAC (Physical) address, DHCP lease timestamps, DNS servers.
  * `ipconfig /release` & `ipconfig /renew`: Releases and re-requests DHCP lease.
  * `ipconfig /flushdns`: Purges local DNS resolver cache.
* **`tracert` & `pathping`**:
  * `tracert -d 1.1.1.1`: Traces route without resolving IP to hostnames (faster).
  * `pathping google.com`: Combines `tracert` and `ping`, measuring packet loss per hop over 300 seconds.
* **`netstat` (Network Statistics)**:
  * `netstat -ano`: Displays all active TCP/UDP connections, numerical addresses, and owning PID (essential for detecting backdoors/malware).
  * `netstat -r`: Displays local IP routing table.
* **`nslookup` (Name Server Lookup)**:
  * `nslookup -type=mx google.com 8.8.8.8`: Queries mail records using Google DNS server.
* **`arp` (Address Resolution Protocol)**:
  * `arp -a`: Displays ARP table mapping IPv4 addresses to Layer 2 Ethernet MAC addresses.
  * `arp -d *`: Flushes ARP cache.
* **`net use` & `net user` & `net share`**:
  * `net use Z: \\server\share /persistent:yes`: Maps network drive.
  * `net user student Pass123! /add`: Creates local user account.
  * `net user student /active:no`: Disables account.
  * `net share`: Displays all shared folders on machine (including administrative shares `C$`, `ADMIN$`).

### 1.36–1.40 Administration, Registry & Policy
* **`gpupdate`**: `gpupdate /force` (Forces immediate re-application of User and Computer Group Policies).
* **`gpresult`**: `gpresult /r` (Displays Resultant Set of Policy for logged-in user and computer).
* **`diskpart`**: Interactive disk partitioning CLI (`list disk`, `select disk 1`, `clean`, `create partition primary`, `format fs=ntfs quick`, `assign letter=E`).
* **`reg`**: CLI Registry Editor (`reg query HKLM\Software\Microsoft`, `reg add`, `reg delete`, `reg export`).
* **`/?`**: Built-in CLI help switch (e.g., `robocopy /?`).

---

## ⚡ Module 2: Modern PowerShell Administration

### 2.1–2.5 Process & Service Management
* **`Get-Process` & `Stop-Process`**:
  * `Get-Process | Sort-Object WorkingSet64 -Descending | Select-Object -First 10`: Top 10 RAM-heavy processes.
  * `Stop-Process -Name "chrome" -Force`: Terminates all Chrome processes.
* **`Get-Service` & `Restart-Service`**:
  * `Get-Service | Where-Object {$_.Status -eq "Running"}`: Filters active services.
  * `Restart-Service -Name "wuauserv" -Force`: Restarts Windows Update service.
  * `Start-Service -Name "Spooler"` / `Stop-Service -Name "Spooler"`.

### 2.6–2.10 Networking, Security & CIM Inventory
* **`Test-NetConnection` (`tnc`)**:
  * The modern ping + port scanner.
  * `Test-NetConnection -ComputerName "hexdef.com" -Port 443`: Tests TCP handshake on port 443.
  * `Test-NetConnection "192.168.1.1" -TraceRoute`: Performs diagnostic trace.
* **`Invoke-WebRequest` (`iwr`)**:
  * `Invoke-WebRequest -Uri "https://example.com/file.zip" -OutFile "C:\Temp\file.zip"`.
* **`Set-ExecutionPolicy`**:
  * `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`: Enables running local unsigned `.ps1` scripts while requiring downloaded scripts to be signed by a trusted publisher.
  * Policies: `Restricted`, `AllSigned`, `RemoteSigned`, `Unrestricted`, `Bypass`.
* **`Get-CimInstance`**:
  * `Get-CimInstance -ClassName Win32_BIOS`: Retrieves BIOS metadata over WMI/CIM.
  * `Get-CimInstance -ClassName Win32_LogicalDisk | Select-Object DeviceID, FreeSpace, Size`.
* **`Get-Help`**:
  * `Get-Help Get-Service -Examples`: Displays practical cmdlet recipes.
  * `Update-Help`: Downloads latest PowerShell documentation.

---

## 🐧 Module 3: Linux & macOS Terminal Mastery

### 3.1–3.12 Navigation, File Ops & Archives
* **`pwd` & `ls`**:
  * `pwd`: Prints working directory.
  * `ls -la`: Long listing format (`-l`) displaying permissions, owner, size, timestamp, and hidden dotfiles (`-a`).
  * `ls -lh`: Human-readable file sizes (`K`, `M`, `G`).
* **`cd`, `mkdir`, `rmdir`**:
  * `mkdir -p /opt/app/logs`: Recursively creates missing parent directories.
  * `rmdir`: Deletes empty directories only.
* **`cp`, `mv`, `rm`, `touch`**:
  * `cp -r source/ destination/`: Recursive directory copy.
  * `mv oldname.txt newname.txt`: Renames or moves files.
  * `rm -rf /path/to/dir`: Force recursive file deletion (**Warning: Permanent**).
  * `touch app.js`: Creates empty file or updates timestamp.
* **`find`**:
  * `find /var/log -name "*.log" -mtime -7 -size +10M`: Finds log files modified within 7 days exceeding 10 MB.
  * `find / -perm -4000`: Locates SUID binaries for security audits.
* **`tar` (Tape Archive)**:
  * Compress: `tar -czvf archive.tar.gz /path/to/folder` (`-c` create, `-z` gzip, `-v` verbose, `-f` file).
  * Extract: `tar -xzvf archive.tar.gz -C /target/dir/` (`-x` extract, `-C` destination).
* **`clear`**: Clears the terminal screen.

### 3.13–3.23 Text Processing, Searching & System Files
* **`cat`, `less`, `head`, `tail`**:
  * `cat file1 file2 > combined.txt`: Concatenates files.
  * `less`: Interactive pager (`/` search, `q` quit, `G` jump to bottom).
  * `head -n 20 file.txt`: Displays first 20 lines.
  * `tail -f /var/log/syslog`: Continuously streams new log entries in real time (**Critical SysAdmin skill**).
* **`grep` (Global Regular Expression Print)**:
  * `grep -ri "ERROR" /var/log/`: Recursive (`-r`), case-insensitive (`-i`) pattern search.
  * `grep -v "DEBUG"`: Inverts match (filters out lines containing DEBUG).
* **`nano` & `vim`**: CLI text editors. Vim modes: Normal (`Esc`), Insert (`i`), Command (`:wq` write-quit, `:q!` force quit).
* **`which` & `whereis`**: Locates binary path in `$PATH` (`which python3`).
* **System Identity Files**:
  * `cat /etc/os-release`: OS distribution and version.
  * `cat /etc/passwd`: User account database (`username:x:UID:GID:...`).

### 3.24–3.37 Process Management, System Logs & Low-Level Storage
* **`top` & `htop`**: Real-time process visualizers.
* **`ps`**: `ps aux` (`a` all users, `u` user format, `x` processes without TTY) or `ps -ef`.
* **`kill` & `killall`**:
  * `kill -15 PID` (`SIGTERM`: Graceful shutdown).
  * `kill -9 PID` (`SIGKILL`: Kernel force termination).
  * `killall nginx`: Kills processes by name.
* **`systemctl` (Systemd Service Manager)**:
  * `systemctl status nginx`
  * `systemctl start|stop|restart nginx`
  * `systemctl enable --now nginx` (Enables service on boot and starts immediately).
* **`journalctl` (Systemd Journal)**:
  * `journalctl -u nginx.service -n 50 --no-pager`: Last 50 service logs.
  * `journalctl -f`: Follows system journal live.
* **`df` & `du`**:
  * `df -h`: Filesystem disk space usage in GBs.
  * `du -sh /var/*`: Storage consumption per folder in `/var/`.
* **`free` & `uname` & `uptime`**:
  * `free -m`: Physical and Swap memory in megabytes.
  * `uname -a`: Kernel release, machine architecture (`x86_64`, `aarch64`).
  * `uptime`: System running time, logged-in users, and 1, 5, 15 minute load averages.
* **`dd` (Disk Dump / Raw Bitstream Copy)**:
  * Syntax: `dd if=/dev/sdb of=/dev/sdc bs=64K status=progress conv=noerror,sync`
  * `if` (input file/disk), `of` (output destination), `bs` (block size).

### 3.38–3.47 Linux Networking & Remote Access
* **`ping` & `traceroute`**: `ping -c 4 host` (Sends exactly 4 ICMP packets), `traceroute host` (Traces Layer 3 hops).
* **`ifconfig` vs `ip a`**:
  * Legacy: `ifconfig eth0`.
  * Modern: `ip a` (interfaces/IPs), `ip route` (default gateway and routing table).
* **`ss` (Socket Statistics)**:
  * `ss -tulpn`: Displays all listening (`-l`) TCP (`-t`) and UDP (`-u`) sockets with port numbers (`-n`) and process names (`-p`). Replaces deprecated `netstat`.
* **`iwconfig`**: Wireless NIC configuration (SSID, frequency, bit rate).
* **`curl` & `wget`**:
  * `curl -I https://hexdef.com`: Inspects HTTP response headers.
  * `curl -O https://example.com/file.tar.gz`: Downloads remote file preserving name.
  * `wget -c https://example.com/large.iso`: Downloads file with resume support (`-c`).
* **`ssh` (Secure Shell)**:
  * `ssh -i ~/.ssh/id_rsa user@192.168.1.50 -p 22`: Connects via private key on port 22.
* **`dig` (Domain Information Groper)**:
  * `dig @8.8.8.8 hexdef.com ANY +short`: Queries DNS records.

### 3.48–3.55 User Permissions & Package Management
* **`sudo` & `su`**:
  * `sudo command`: Executes command with superuser privileges.
  * `su - username`: Switches user and initializes login environment.
* **`chmod` (Change Mode Permissions)**:
  * `chmod 755 script.sh` (`rwxr-xr-x`).
  * `chmod 600 id_rsa` (`rw-------`).
  * `chmod +x run.sh` (Adds execute permission).
* **`chown` (Change Ownership)**: `chown -R www-data:www-data /var/www/html`.
* **`passwd` & `whoami`**: Changes user password; prints current active UID.
* **Package Managers**:
  * Debian/Ubuntu: `sudo apt update && sudo apt install -y package_name`.
  * RHEL/CentOS/Fedora: `sudo dnf install package_name` (or legacy `yum`).

### 3.56–3.60 macOS Exclusives & Help System
* **macOS Exclusives**:
  * `open index.html`: Opens file in default GUI application.
  * `cat key.pub | pbcopy`: Copies stdin directly to macOS clipboard.
  * `pbpaste > file.txt`: Pastes clipboard content to stdout.
  * `networksetup -listallnetworkservices`: Manages macOS network adapters.
* **Help System**: `man command` (Manual pages), `command --help` (Quick CLI flags).

---

## 🔗 Module 4: Command-Line Operators, Redirection & Chaining

### 4.1 Pipe Operator (`|`)
* Channels `stdout` of left command directly into `stdin` of right command in memory.
* Example: `ps aux | grep nginx | awk '{print $2}'`

### 4.2–4.4 Output & Error Redirection
* **`>` (Overwrite stdout)**: `systeminfo > sys_report.txt` (Creates or truncates file).
* **`>>` (Append stdout)**: `echo "Log entry" >> app.log` (Appends to end of file).
* **`2>` & `2>&1` & `/dev/null` (Error Redirection)**:
  * `command 2> error.log`: Redirects stderr (FD 2) to file.
  * `command > output.log 2>&1`: Combines stdout and stderr into same file.
  * `find / -name "secret.txt" 2> /dev/null`: Silences permission denied errors by discarding stderr to the bit-bucket (`/dev/null` on Linux, `NUL` on Windows).

### 4.5–4.7 Execution Control Operators
* **`&&` (Logical AND)**: Executes second command *only if* first command succeeds (Exit Code 0).
  * Example: `sudo apt update && sudo apt upgrade -y`
* **`||` (Logical OR)**: Executes second command *only if* first command fails (Exit Code $\ne 0$).
  * Example: `ping -c 1 10.0.0.1 || echo "Host unreachable!"`
* **`;` (Sequential Execution)**: Executes commands sequentially regardless of success or failure.
  * Example: `cd /tmp; ls -la; df -h`

---

## 🖥️ Module 5: Help Desk Power-User Run Consoles (`Win + R`)

| Shortcut | Applet / Console Name | Purpose & Help Desk Use Case |
| :--- | :--- | :--- |
| **`appwiz.cpl`** | Programs and Features | Uninstall software, view installed Windows Updates, toggle Windows Features. |
| **`ncpa.cpl`** | Network Connections | View network adapters, configure static IPv4/DNS, disable/enable NICs. |
| **`devmgmt.msc`** | Device Manager | Update/rollback hardware drivers, identify yellow exclamation mark hardware conflicts. |
| **`diskmgmt.msc`** | Disk Management | Initialize disks, format partitions, shrink/extend volumes, assign drive letters. |
| **`compmgmt.msc`** | Computer Management | Master console containing Task Scheduler, Event Viewer, Device Manager, Local Users. |
| **`services.msc`** | Services Console | Start, stop, disable, or configure startup types (Automatic/Manual) for system services. |
| **`eventvwr.msc`** | Event Viewer | Inspect Windows Logs (Application, Security, System) for Event IDs, warnings, errors. |
| **`mstsc`** | Remote Desktop Connection | Launch Windows RDP client (`mstsc /v:server_ip:3389 /admin`). |
| **`resmon`** | Resource Monitor | Real-time breakdown of CPU, Disk I/O queues, Network connections, and Memory standby. |
| **`regedit`** | Registry Editor | Graphical hierarchical database editor for Windows registry keys and values. |
| **`control`** | Control Panel | Classic Control Panel dashboard. |

---

## 📜 Module 6: Scripting Environments & File Extensions (CompTIA A+ Objective 1.10)

### 6.1 Windows Batch (`.bat` / `.cmd`)
* **Environment**: Windows Command Prompt (`cmd.exe`).
* **Characteristics**: Sequential commands, `@echo off`, `%1` arguments, `goto` labels, `%ERRORLEVEL%` exit checks.
* **Use Case**: Legacy Windows startup scripts, basic file copies.

### 6.2 PowerShell (`.ps1`)
* **Environment**: Windows PowerShell (`powershell.exe`) and PowerShell 7 Core (`pwsh`).
* **Characteristics**: Object-oriented pipeline (passes .NET objects, not plain text streams), `Verb-Noun` syntax, execution policies.
* **Use Case**: Enterprise Windows & Azure cloud administration, Active Directory automation.

### 6.3 Linux Shell Script (`.sh`)
* **Environment**: Bash (`/bin/bash`), Zsh, Sh on Linux/UNIX/macOS.
* **Characteristics**: Starts with Shebang `#!/bin/bash`, executable bit required (`chmod +x script.sh`), positional parameters (`$1`, `$@`), exit status (`$?`).
* **Use Case**: Linux server deployment, cron automated backups, DevOps CI/CD pipelines.

### 6.4 Python (`.py`)
* **Environment**: Python runtime interpreter (`python3`).
* **Characteristics**: Cross-platform, rich standard library, indentation-based syntax, dynamic typing.
* **Use Case**: Automation, cybersecurity tooling, network automation (Netmiko/Scapy), data analysis, web backend.

### 6.5 VBScript (`.vbs`)
* **Environment**: Windows Script Host (`cscript.exe` / `wscript.exe`).
* **Characteristics**: Visual Basic syntax, COM object integration (`WScript.Shell`).
* **Use Case**: Legacy Active Directory logon scripts (largely deprecated by PowerShell).

### 6.6 JavaScript (`.js`)
* **Environment**: Web browsers (Client-side DOM) and Node.js runtime (Server-side).
* **Characteristics**: Asynchronous event-driven execution, JSON native support, prototype-based OOP.
* **Use Case**: Web applications, full-stack development, serverless functions.
