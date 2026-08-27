# CompTIA A+ Core 1 (220-1201) Master Study Guide

Welcome to the **CompTIA A+ Core 1 (220-1201) Master Study Guide**. This definitive reference covers all 5 exam domains—Mobile Devices, Networking, Hardware, Virtualization & Cloud Computing, and Hardware/Network Troubleshooting.

---

## 📱 Domain 1.0: Mobile Devices

### 1.1 Laptop Hardware & Components
* **Batteries**: Lithium-Ion (Li-ion) and Lithium-Polymer (LiPo). Key considerations: cycle counts, thermal management, swollen battery safety hazard (never puncture; isolate and dispose per local HazMat regulations).
* **Keyboards & Keys**: Compact scissor-switch and membrane designs. Key replacement, ribbon cable connection, Fn (Function) key toggle shortcuts for external monitors, Wi-Fi, volume, brightness.
* **RAM**: **SODIMM** (Small Outline Dual In-Line Memory Module) form factor. 204-pin (DDR3), 260-pin (DDR4), 262-pin (DDR5). Requires powering down, unplugging AC, and discharging static.
* **Storage Drives**: 2.5-inch SATA SSDs/HDDs (7mm vs 9.5mm height) and M.2 NVMe/SATA SSDs (2280 form factor).
* **Wireless & Cellular Cards**: Mini-PCIe and M.2 (Key E / Key A) form factors. Main (white) and Aux (black) antenna lead routing around display bezel for maximum RF propagation.
* **Biometrics & Security**: Fingerprint readers, IR cameras for Windows Hello, NFC smart card scanners, and Kensington security lock slots.
* **Displays & Webcams**: Integrated webcams, stereo microphones, ambient light sensors, and internal Wi-Fi/Bluetooth antenna wiring routed through display hinges.

### 1.2 Mobile Device Display & Accessory Connections
* **Wired Connectors**:
  * **USB-C**: 24-pin reversible connector supporting USB 3.2/USB4, Thunderbolt, Power Delivery (up to 240W), and DisplayPort Alt Mode.
  * **Micro-USB & Mini-USB**: Older legacy mobile standard connectors.
  * **Lightning**: 8-pin proprietary Apple reversible connector.
* **Wireless Connections**:
  * **NFC (Near Field Communication)**: 13.56 MHz frequency, range $< 4\text{ cm}$. Used for Apple Pay, Google Wallet, contactless badges.
  * **Bluetooth**: 2.4 GHz frequency, Short-range WPAN (Class 2: 10 meters / 33 feet).
  * **Tethering & Hotspot**: Sharing mobile cellular data via Wi-Fi hotspot, Bluetooth PAN, or USB cable tethering.
* **Accessories**: Active vs passive styluses (digitizer pressure sensitivity), Bluetooth headsets, portable speakers, external webcams, drawing tablets.
* **Docking Stations vs Port Replicators**:
  * **Docking Station**: Proprietary or Thunderbolt dock offering power delivery, PCIe expansion, multiple native monitor outputs, and legacy ports.
  * **Port Replicator**: Lightweight USB pass-through dongle providing additional USB and video ports without proprietary bus expansion.

### 1.3 Mobile Device Network Connectivity & Application Support
* **Cellular Data**: 3G (HSPA/EV-DO), 4G (LTE / LTE-Advanced with Carrier Aggregation), and 5G (sub-6 GHz broad coverage vs mmWave high-speed line-of-sight).
* **SIM vs eSIM**: Physical Nano-SIM cards vs embedded software-programmable eSIM profiles for multi-carrier flexibility.
* **Bluetooth Pairing Workflow**: Enable Bluetooth $\rightarrow$ Enable Discovery/Pairing Mode $\rightarrow$ Scan for Devices $\rightarrow$ Select Target $\rightarrow$ Verify/Enter PIN Passkey $\rightarrow$ Test Connectivity.
* **Location Services**: GPS (Global Positioning System satellite trilateration) vs Cellular Tower Triangulation vs Wi-Fi BSSID Geolocation database lookups.
* **Mobile Device Management (MDM)**:
  * **Corporate vs BYOD**: Containerization (separating personal and corporate data), remote wipe (full wipe vs selective enterprise wipe).
  * **Policy Enforcement**: PIN/passcode complexity, storage encryption (BitLocker / FileVault), geolocation fencing, camera/mic disabling.
  * **Corporate App Catalogs**: Sideloading enterprise-signed internal applications.
* **Data Synchronization**: Cloud sync (iCloud, Google Drive, OneDrive) vs Local sync (iTunes/Finder, USB transfer). Synchronizing Contacts, Calendars, Email, Photos with awareness of cellular data roaming caps.

---

## 🌐 Domain 2.0: Networking

### 2.1 TCP/IP Ports and Protocols
* **Core Transport Protocols**:
  * **TCP (Transmission Control Protocol)**: Connection-oriented, reliable 3-way handshake (`SYN`, `SYN-ACK`, `ACK`), sequence numbering, flow control.
  * **UDP (User Datagram Protocol)**: Connectionless, lightweight, unreliable, low-latency datagrams (VoIP, DNS queries, streaming).
* **Must-Know Ports**:
  * `20/21`: **FTP** (File Transfer Protocol - Data/Control)
  * `22`: **SSH** (Secure Shell) & **SFTP** (Secure FTP)
  * `23`: **Telnet** (Unencrypted remote CLI)
  * `25`: **SMTP** (Simple Mail Transfer Protocol - sending mail)
  * `53`: **DNS** (Domain Name System - UDP/TCP)
  * `67/68`: **DHCP** (Dynamic Host Configuration Protocol - Server/Client)
  * `80`: **HTTP** (Hypertext Transfer Protocol)
  * `110`: **POP3** (Post Office Protocol 3 - mail retrieval)
  * `137-139`: **NetBIOS / NetBT** (Name, Datagram, Session)
  * `143`: **IMAP** (Internet Message Access Protocol - server-side sync)
  * `389`: **LDAP** (Lightweight Directory Access Protocol)
  * `443`: **HTTPS** (HTTP Secure via TLS)
  * `445`: **SMB / CIFS** (Server Message Block - Windows file sharing)
  * `3389`: **RDP** (Remote Desktop Protocol)

### 2.2 Wireless Networking Standards & Channels
* **802.11 Standards**:
  * **802.11b**: 2.4 GHz | 11 Mbps
  * **802.11a**: 5 GHz | 54 Mbps
  * **802.11g**: 2.4 GHz | 54 Mbps
  * **802.11n (Wi-Fi 4)**: 2.4 GHz & 5 GHz | Up to 600 Mbps (MIMO)
  * **802.11ac (Wi-Fi 5)**: 5 GHz | Up to 6.9 Gbps (MU-MIMO, 80/160 MHz channels)
  * **802.11ax (Wi-Fi 6 / 6E)**: 2.4 GHz, 5 GHz, & 6 GHz | Up to 9.6 Gbps (OFDMA, Target Wake Time)
* **Channel Frequencies & Overlap**:
  * **2.4 GHz**: 11 channels in US (1-11). Only channels **1, 6, and 11** are non-overlapping at 20 MHz width.
  * **5 GHz**: 24+ non-overlapping 20 MHz channels; supports 40, 80, 160 MHz bonding.
  * **6 GHz**: 59 non-overlapping 20 MHz channels with zero legacy interference.
* **RFID vs NFC**:
  * **RFID**: Passive/Active radio tags (125 kHz LF, 13.56 MHz HF, 860-960 MHz UHF) for warehouse asset tracking up to several meters.
  * **NFC**: Two-way short-range communication ($\le 4\text{ cm}$).

### 2.3 Network Services & Server Roles
* **DNS**: Resolves FQDNs to IP addresses.
* **DHCP**: Automatically assigns IP addresses, subnet masks, default gateways, and DNS servers via **DORA** (`Discover`, `Offer`, `Request`, `Acknowledge`).
* **NTP**: Network Time Protocol (UDP port 123) for system clock synchronization across domain controllers and Kerberos authentication.
* **AAA**: Authentication, Authorization, and Accounting (RADIUS / TACACS+).
* **Security Appliances**:
  * **UTM (Unified Threat Management)**: Firewall + IDS/IPS + Antivirus + Content Filtering in a single appliance.
  * **Spam Gateways**: Inbound/outbound email hygiene filters.
  * **Proxy Servers & Load Balancers**: Caching, URL filtering, traffic distribution across server pools.
* **Legacy & Embedded Systems**: **SCADA / ICS** (Supervisory Control and Data Acquisition in manufacturing/utilities) and **IoT** (Internet of Things smart sensors).

### 2.4 DNS, DHCP, VLAN, & VPN Concepts
* **DNS Record Types**:
  * **A**: IPv4 Host Address
  * **AAAA**: IPv6 Host Address
  * **CNAME**: Canonical Name (Alias)
  * **MX**: Mail Exchanger (Email routing priority)
  * **TXT**: Text records for email anti-spoofing (**SPF**, **DKIM**, **DMARC**).
* **DHCP Components**: Scope (pool range), Lease Time, Exclusions, Reservations (MAC address IP binding).
* **VLAN (Virtual Local Area Network)**: Segmenting broadcast domains at Layer 2 switches (802.1Q tagging).
* **VPN (Virtual Private Network)**: Encrypted tunneling across public networks (IPsec, SSL/TLS OpenVPN, WireGuard).

### 2.5 Network Hardware Devices & PoE
* **Routers vs Switches**: Routers route packets between subnets at Layer 3 (IP); Switches forward frames within a LAN at Layer 2 (MAC).
* **Managed vs Unmanaged Switches**: Managed switches support VLANs, SNMP, Port Mirroring, QoS, Spanning Tree Protocol (STP).
* **Power over Ethernet (PoE)**:
  * **PoE (802.3af)**: Up to 15.4W
  * **PoE+ (802.3at)**: Up to 30W
  * **PoE++ (802.3bt Type 3/4)**: Up to 60W / 100W for PTZ cameras and digital signage.
  * **PoE Injector**: Midspan power injector for non-PoE switches.
* **Modems & ONTs**: Cable (DOCSIS coax), DSL (RJ11 twisted pair), ONT (Optical Network Terminal for fiber-to-the-home GPON).

### 2.6 IP Addressing & Subnetting (IPv4 & IPv6)
* **IPv4 Classes & RFC 1918 Private Ranges**:
  * **Class A**: `10.0.0.0` – `10.255.255.255` (`/8`)
  * **Class B**: `172.16.0.0` – `172.31.255.255` (`/12`)
  * **Class C**: `192.168.0.0` – `192.168.255.255` (`/16`)
  * **Loopback**: `127.0.0.1` (`127.0.0.0/8`)
  * **APIPA (Automatic Private IP Addressing)**: `169.254.0.1` – `169.254.255.254` (`169.254.0.0/16`) assigned when DHCP fails.
* **IPv6 Architecture (128-bit hex)**:
  * **Global Unicast**: `2000::/3` (routable public internet)
  * **Link-Local**: `fe80::/10` (unroutable, automatically generated for local segment communication via SLAAC / EUI-64)
  * **Loopback**: `::1`
  * **Dual Stack**: Running IPv4 and IPv6 concurrently on the same network interface.

### 2.7 Internet Connection Types & Network Types
* **Internet Connections**: Fiber (symmetric gigabit), Cable (DOCSIS asymmetric), DSL (copper phone line filter), Satellite (high latency / LEO Starlink), Cellular (LTE/5G), WISP (Wireless ISP fixed line-of-sight).
* **Network Geographies**: **LAN** (Local), **WLAN** (Wireless LAN), **PAN** (Personal/Bluetooth), **MAN** (Metropolitan), **WAN** (Wide Area), **SAN** (Storage Area Network via iSCSI / Fibre Channel).

### 2.8 Network Tools & Testing Hardware
* **Crimper**: Attaches RJ45/RJ11 connectors to twisted pair cables.
* **Cable Stripper**: Strips outer jacket without slicing inner copper pairs.
* **Punchdown Tool**: Terminates wires into 110 or Krone patch panels and keystone jacks.
* **Cable Tester (Continuity Tester)**: Verifies pin-to-pin wiring, opens, shorts, crossed wires.
* **Toner Probe (Fox & Hound)**: Locates specific cables in massive bundles by injecting an audible analog/digital tone.
* **Loopback Plug**: Tests physical NIC port hardware integrity (`127.0.0.1`).
* **Wi-Fi Analyzer**: Measures signal strength (RSSI in dBm), channel congestion, and SNR.
* **Network Tap**: Physical hardware inline packet analyzer port.

---

## 💻 Domain 3.0: Hardware

### 3.1 Display Types & Attributes
* **Display Panels**:
  * **TN (Twisted Nematic)**: Fast response time, high refresh rates, poor viewing angles and color reproduction.
  * **IPS (In-Plane Switching)**: Superior color accuracy and wide 178° viewing angles, slightly slower response.
  * **VA (Vertical Alignment)**: Deep black levels and high contrast ratio.
  * **OLED**: Self-emissive pixels with infinite contrast and true blacks; susceptible to burn-in.
  * **Mini-LED**: Thousands of miniature LED backlights with localized full-array dimming zones.
* **Components**: Inverters (convert DC to AC for legacy CCFL backlights; modern screens use LED backlights requiring no inverter), Digitizers (convert analog touch to digital coordinates).
* **Attributes**: Refresh Rate (60Hz, 120Hz, 144Hz, 240Hz), Resolution (1080p, 1440p, 4K UHD), Color Gamut (sRGB, DCI-P3, Adobe RGB).

### 3.2 Cables & Connector Standards
* **Copper Ethernet**:
  * **Cat 5e**: 1 Gbps @ 100m (100 MHz)
  * **Cat 6**: 1 Gbps @ 100m / 10 Gbps @ up to 55m (250 MHz)
  * **Cat 6a**: 10 Gbps @ 100m (500 MHz)
* **Wiring Standards**:
  * **T568A**: White/Green, Green, White/Orange, Blue, White/Blue, Orange, White/Brown, Brown.
  * **T568B**: White/Orange, Orange, White/Green, Blue, White/Blue, Green, White/Brown, Brown.
  * **Plenum Cable**: Low-smoke, flame-retardant jacket (FEP/PTFE) required for HVAC drop-ceiling plenum air return spaces.
* **Fiber Optic Cables**:
  * **Single-Mode Fiber (SMF)**: Yellow jacket, 9µm core, laser light source, long distances (10-40+ km).
  * **Multimode Fiber (MMF)**: Aqua/Orange jacket, 50/62.5µm core, LED/VCSEL light source, short distances ($\le 550\text{m}$).
  * **Connectors**: **ST** (Straight Tip bayonet), **SC** (Subscriber Connector square push-pull), **LC** (Lucent Connector small form factor latch).
* **Video & Peripheral Cables**: HDMI (Audio/Video), DisplayPort (packetized, daisy-chain MST), DVI (DVI-D digital, DVI-A analog, DVI-I integrated), VGA (15-pin analog DB15), Thunderbolt (Thunderbolt 3/4 up to 40 Gbps over USB-C), SATA (internal 7-pin data) / eSATA (external).

### 3.3 RAM Technologies & Features
* **Form Factors**: **DIMM** (Desktops - 288-pin for DDR4/DDR5) vs **SODIMM** (Laptops).
* **Generations**: DDR4 (1.2V, 288 pins) vs DDR5 (1.1V, onboard PMIC power management, dual 32-bit subchannels, on-die ECC).
* **ECC vs Non-ECC**: Error-Correcting Code RAM detects and fixes single-bit memory errors (essential for servers/workstations; requires ECC-supported motherboard and CPU).
* **Multi-Channel Architecture**: Dual-channel, quad-channel interleaving doubling/quadrupling memory bandwidth by populating matched color slots.

### 3.4 Storage Devices & RAID Configurations
* **Drive Technologies**:
  * **HDD**: Magnetic spinning platters (5400, 7200, 10000, 15000 RPM); 2.5-inch and 3.5-inch form factors.
  * **SSD**: NAND Flash memory; SATA III (6 Gbps / ~550 MB/s), NVMe over PCIe (Gen 3 ~3500 MB/s, Gen 4 ~7000 MB/s, Gen 5 ~14000 MB/s via M.2 2280).
* **RAID Arrays**:
  * **RAID 0 (Striping)**: Performance only; zero fault tolerance ($N \ge 2$).
  * **RAID 1 (Mirroring)**: Full redundancy; 50% capacity ($N \ge 2$).
  * **RAID 5 (Striping with Distributed Parity)**: Tolerates 1 drive failure ($N \ge 3$).
  * **RAID 6 (Striping with Dual Parity)**: Tolerates 2 drive failures ($N \ge 4$).
  * **RAID 10 (1+0 Striped Mirrors)**: High performance + redundancy; tolerates 1 drive failure per mirror pair ($N \ge 4$).

### 3.5 Motherboard Architecture, BIOS/UEFI, & CPUs
* **Form Factors**: **ATX** ($12 \times 9.6\text{ in}$), **Micro-ATX** ($9.6 \times 9.6\text{ in}$), **Mini-ITX** ($6.7 \times 6.7\text{ in}$).
* **Expansion Slots**: PCIe x1, x4, x8, x16 (PCIe 3.0 ~1GB/s per lane, PCIe 4.0 ~2GB/s per lane, PCIe 5.0 ~4GB/s per lane).
* **BIOS vs UEFI**:
  * **Legacy BIOS**: 16-bit MBR partition table ($\le 2\text{ TB}$, max 4 primary partitions).
  * **UEFI**: 32/64-bit GPT partition table (up to 9.4 ZB, 128 primary partitions), GUI mouse support, **Secure Boot** (cryptographically verifies OS bootloader signatures).
* **TPM (Trusted Platform Module)**: Hardware cryptographic microcontroller generating and storing BitLocker encryption keys, platform integrity measurements, and hardware certificates.
* **CPU Architectures**:
  * **x86 (32-bit)** vs **x64 (64-bit AMD64/EM64T)**: CISC architecture.
  * **ARM**: RISC architecture (high power efficiency in mobile devices and Apple Silicon).
  * **Cooling**: Air cooling (copper heat pipes, aluminum fin stacks, PWM fans) vs AIO Liquid Cooling vs Phase change. Thermal paste fills microscopic air gaps.

### 3.6 Power Supplies (PSU)
* **Input Voltages**: 115V AC (North America) vs 230V AC (Europe/International); fixed dual-voltage selector switch vs active PFC auto-switching.
* **Output DC Rails**: **+3.3V, +5V, +12V** (Primary power for CPU, GPU, motors), and **-12V**.
* **Connectors**: 20+4 pin ATX main power, 4/8 pin EPS 12V CPU power, 6/8 pin PCIe GPU power (and 12VHPWR / 12V-2x6 up to 600W), SATA power, Molex 4-pin.
* **PSU Modularity**: Non-modular (fixed cables), Semi-modular, Fully modular (detachable cables).
* **80 PLUS Efficiency**: 80 PLUS White, Bronze, Silver, Gold, Platinum, Titanium ($\ge 80\%$ up to $\ge 94\%$ efficiency at 20%, 50%, 100% load).

### 3.7 & 3.8 Printers & Scanners
* **Printer Types & Processes**:
  * **Laser Printer (6-Step Imaging Process)**:
    1. **Cleaning**: Scraper blade removes residual toner; erase lamp neutralizes drum charge.
    2. **Conditioning (Charging)**: Primary Corona Wire or Charge Roller applies high negative charge ($-600\text{V}$) to the photosensitive drum.
    3. **Exposing (Writing)**: Laser beam scans the drum, neutralizing charge where image appears ($-100\text{V}$).
    4. **Developing**: Toner particles receive negative charge and stick to laser-exposed neutralized areas.
    5. **Transferring**: Transfer roller applies strong positive charge to paper, pulling toner from drum to paper.
    6. **Fusing**: Heat ($350\text{°F} / 175\text{°C}$) and pressure rollers melt toner permanently into paper fibers.
  * **Inkjet Printer**: Piezoelectric crystals or Thermal bubble nozzles spray microscopic ink droplets. Printhead calibration, nozzle checks, cleaning cycles.
  * **Thermal Printer**: Direct thermal (heat-sensitive paper turns black; used in receipts, fades with heat) vs Thermal Transfer (heated ribbon melts wax/resin onto label).
  * **Impact (Dot Matrix)**: Pins strike an inked fabric ribbon onto multipart carbon-copy paper.
* **Printer Drivers**: **PCL** (HP Printer Command Language - fast, OS-dependent) vs **PostScript** (Adobe page description language - precise vector layout, platform-agnostic).
* **Scan Services**: SMB share scan, Scan to Email (SMTP), Scan to Cloud, TWAIN/WIA scanner drivers.

---

## ☁️ Domain 4.0: Virtualization & Cloud Computing

### 4.1 Client-Side Virtualization & Containers
* **Hypervisors**:
  * **Type 1 (Bare-Metal)**: Runs directly on hardware without host OS (VMware ESXi, Microsoft Hyper-V Server, KVM, Xen). Low latency, high performance.
  * **Type 2 (Hosted)**: Runs as an application on top of a host operating system (VMware Workstation, Oracle VirtualBox). Ideal for testing and sandboxing.
* **Hardware Requirements**: CPU Virtualization Extensions (**Intel VT-x** / **AMD-V**), SLAT / EPT memory management, ample dedicated RAM and storage.
* **Virtual Machines vs Containers**:
  * **VM**: Virtualizes entire hardware stack; includes full guest OS kernel, high isolation, large disk image size.
  * **Container**: Virtualizes at OS level (Docker, containerd); shares host kernel, lightweight, spins up in milliseconds.
* **Virtual Desktop Infrastructure (VDI)**: Centralized server hosting desktop VMs streamed to thin clients.

### 4.2 Cloud Computing Models & Characteristics
* **Cloud Delivery Models (NIST SP 800-145)**:
  * **IaaS (Infrastructure as a Service)**: Vendor provides raw compute, storage, networking (AWS EC2, Azure VMs). User manages OS, middleware, apps.
  * **PaaS (Platform as a Service)**: Vendor manages OS, runtime, and hardware (AWS Elastic Beanstalk, Heroku). User deploys code/apps only.
  * **SaaS (Software as a Service)**: Fully managed end-user application (Microsoft 365, Google Workspace, Salesforce).
* **Cloud Deployment Models**: **Public**, **Private** (dedicated single-tenant), **Hybrid** (combining on-prem and public cloud), **Community** (shared across organizations with common compliance goals).
* **Core Characteristics**:
  * **On-Demand Self-Service**: Provision resources automatically without human interaction.
  * **Broad Network Access**: Standard web protocols accessible from any client device.
  * **Resource Pooling & Multitenancy**: Shared physical hardware partitioned securely among multiple customer tenants.
  * **Rapid Elasticity**: Dynamically scale resources up or down on demand.
  * **Measured Service**: Pay-per-use billing tracking CPU time, storage, bandwidth ingress/egress.

---

## 🔧 Domain 5.0: Hardware and Network Troubleshooting

### 5.1 Troubleshooting Motherboards, RAM, CPU, & Power
* **CompTIA 6-Step Troubleshooting Methodology**:
  1. Identify the problem (gather info, duplicate issue, identify symptoms).
  2. Establish a theory of probable cause (question the obvious).
  3. Test the theory to determine cause.
  4. Establish a plan of action and implement the solution.
  5. Verify full system functionality and implement preventive measures.
  6. Document findings, actions, and outcomes.
* **Motherboard / Power Symptoms**:
  * **POST Beep Codes / POST Code Card**: Hardware initialization failure before video output (RAM missing, CPU failure).
  * **Distended / Swollen Capacitors**: Blown electrolyte leaking from motherboard/PSU capacitors causing random lockups; replace board.
  * **Burning Smell / Smoke**: Immediate physical power cut; blown PSU or shorted capacitor.
  * **Inaccurate Date/Time**: Dead CR2032 CMOS battery; replace battery and reconfigure UEFI.
* **CPU / Thermal Symptoms**:
  * **Random Shutdowns / Thermal Throttling**: Dust-clogged heatsinks, failed fan, dried thermal paste. Clean with compressed air and reapply paste.
* **RAM Symptoms**:
  * **BSOD / Kernel Panic / Continuous Reboots**: Run MemTest86; reseat SODIMMs/DIMMs or isolate faulty stick.

### 5.2 Troubleshooting Storage Drives & RAID
* **HDD Failures**: Clicking / Grinding noises (head crash on platter), SMART read/write error thresholds tripped. Back up immediately; replace drive.
* **Bootable Device Not Found**: Check boot order in BIOS, verify SATA/NVMe power and data connections, check for corrupt Master Boot Record (MBR) or BCD.
* **RAID Array Failures**:
  * **RAID 0 Failure**: Entire volume lost; restore from backup.
  * **RAID 1 / 5 Degraded**: Replace failed disk; initiate rebuild process.
  * **Slow Read/Write & Low IOPS**: Drive failure imminent, SSD thermal throttling, or controller rebuild in progress.

### 5.3 Troubleshooting Video, Projector, & Display Issues
* **No Video / Blank Screen**: Verify monitor power, input source selection, cable seating, test with known-good cable/display, verify GPU power leads.
* **Dim Image**: Defective backlight or inverter (CCFL), brightness settings turned down.
* **Flickering / Flashing Screen**: Loose display cable, mismatched refresh rate, failing GPU driver.
* **Dead Pixels vs Stuck Pixels**: Dead pixels stay black (unresponsive transistor); stuck pixels stay red/green/blue.
* **Burn-In / Image Retention**: Static image burned into OLED/plasma; use screen savers and pixel refresh utilities.
* **Distorted / Stretched Image**: Native resolution mismatch (e.g., setting 4:3 resolution on a 16:9 monitor).
* **Projector Overheating**: Projector bulb cooling fan failure or clogged air filter leading to automatic thermal shutdown.

### 5.4 Troubleshooting Mobile Devices
* **Swollen Battery**: Immediate safety hazard; do not charge, isolate device in fireproof container.
* **Cracked Screen / Digitizer Drift**: Calibrate touchscreen; replace laminated glass/digitizer assembly if ghost touches persist.
* **Poor Battery Health**: Rapid discharge; disable background refresh, check battery health percentage, replace battery.
* **Overheating**: Heavy CPU/GPU utilization, direct sunlight, failing battery; device shuts down automatically.
* **Liquid Damage**: Check internal LDI (Liquid Damage Indicator) sticker color (white $\rightarrow$ red/pink). Power down immediately; do not power on until completely disassembled and dried.

### 5.5 Troubleshooting Wired & Wireless Networks
* **No Network Connectivity (APIPA `169.254.x.x`)**: DHCP server unreachable; check cable link light, verify DHCP pool availability, test with static IP.
* **Intermittent Wireless Connection**: Low RSSI, channel congestion, external RF interference (microwaves, baby monitors), 2.4 GHz vs 5 GHz distance limits.
* **High Latency & Jitter**: Bandwidth saturation, QoS misconfiguration, bufferbloat, failing cabling causing packet retransmissions.
* **Duplicate IP Address**: IP conflict between static allocation and DHCP assignment; release/renew or assign unique static IP.
* **Port Flapping**: Bad physical cable termination, faulty switch port, or duplex mismatch (Auto vs Half/Full).

### 5.6 Troubleshooting Printers
* **Laser Printer Defects**:
  * **Streaks / Lines down page**: Scratched photosensitive drum or dirty corona wire.
  * **Ghosting / Double-Echo image**: Damaged cleaning blade or failing fuser heat roller not discharging/cleaning prior turn.
  * **Faded Prints**: Low toner or transfer corona wire failure.
  * **Toner Rubs Off Paper**: Fuser assembly not reaching melting temperature; replace fuser.
  * **Speckled / Dirty Prints**: Toner spill inside cavity; clean with toner-rated HEPA vacuum.
* **Paper Jams & Misfeeds**:
  * **Paper not feeding**: Worn feed pickup rollers; clean with isopropyl alcohol or replace roller kit.
  * **Multipage misfeed**: Worn separation pad.
  * **Creased / Accordion paper**: Obstruction along paper path or misaligned paper tray guides.
* **Garbled / Corrupt Output**: Mismatched or corrupt print driver (PCL vs PostScript mismatch), bad cable, or print spooler queue buffer corruption.
