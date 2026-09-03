# CISS 120: Computer Networking & Communications — Master Study Guide
### Official Cisco Certified Network Associate (CCNA ITN v7.02) Curriculum

Welcome to the **CISS 120 (Computer Networking & Communications / Cisco CCNA: Introduction to Networks) Master Study Guide**. This definitive reference covers all 17 official modules spanning network architecture, Cisco IOS configuration, protocol models, transmission media, number systems, Ethernet switching, IPv4/IPv6 subnetting, ICMP diagnostics, transport layer protocols, application services, network security, and structured troubleshooting.

---

## 🌐 Module 01: Networking Today

### 1.1–1.5 Network Components, Representations & Topologies
* **Network Infrastructure Components**:
  * **End Devices (Hosts)**: Clients, servers, workstations, VoIP phones, security cameras.
  * **Intermediary Devices**: Switches, wireless access points, routers, multilayer switches, next-generation firewalls.
  * **Media**: Copper cabling (electrical pulses), fiber-optic cabling (light pulses), wireless radio frequencies (electromagnetic waves).
* **Network Representations**:
  * **Physical Topology Diagram**: Identifies physical location of devices, rack locations, and cable installation paths.
  * **Logical Topology Diagram**: Identifies ports, IP addressing schemes, subnet groupings, and routing paths.
* **Network Classifications**:
  * **LAN (Local Area Network)**: High-speed, low-latency infrastructure across a single building or campus.
  * **WAN (Wide Area Network)**: Interconnects geographically dispersed LANs across telecommunication providers.
  * **The Internet**: Global mesh of interconnected autonomous systems (networks of networks).

### 1.6–1.9 Reliable Networks, Trends & Security
* **Network Architecture Pillars**:
  * **Fault Tolerance**: Redundant physical links and dynamic rerouting prevent single points of failure.
  * **Scalability**: Seamless expansion without degrading existing user performance.
  * **Quality of Service (QoS)**: Prioritizes delay-sensitive traffic (voice/video) over bulk data transfers.
  * **Security**: Confidentiality, Integrity, and Availability (CIA Triad).
* **Technology Trends**: BYOD (Bring Your Own Device), Cloud Computing, Virtualization, and SDN (Software-Defined Networking).

---

## 💻 Module 02: Basic Switch and End Device Configuration

### 2.1–2.3 Cisco IOS Access & Hierarchical Modes
* **Out-of-Band vs In-Band Management**:
  * **Console Port**: Out-of-band physical cable connection used for initial headless setup or disaster recovery.
  * **SSH (Secure Shell - Port 22)**: Secure, encrypted in-band CLI remote access.
  * **Telnet (Port 23)**: Insecure plaintext remote access (strictly prohibited in production).
* **Cisco IOS Command Modes**:
  * **User EXEC Mode (`Switch>`)**: Basic monitoring. Elevate with `enable`.
  * **Privileged EXEC Mode (`Switch#`)**: Detailed verification, debug, restart, file management. Enter configuration with `configure terminal`.
  * **Global Configuration Mode (`Switch(config)#`)**: System-wide parameters.
  * **Sub-Configuration Modes**: Interface (`(config-if)#`), Line (`(config-line)#`), VLAN (`(config-vlan)#`).

### 2.4–2.8 Device Hardening & Management IP
```cisco
Switch(config)# hostname S1
S1(config)# enable secret CiscoEnPass123!
S1(config)# service password-encryption
S1(config)# banner motd # AUTHORIZED ACCESS ONLY - VIOLATORS WILL BE PROSECUTED #
S1(config)# line console 0
S1(config-line)# password ConsolePass123!
S1(config-line)# login
S1(config-line)# logging synchronous
S1(config-line)# exit
S1(config)# line vty 0 15
S1(config-line)# password VtyPass123!
S1(config-line)# login
S1(config-line)# exit
S1(config)# interface vlan 1
S1(config-if)# ip address 192.168.1.2 255.255.255.0
S1(config-if)# no shutdown
S1(config-if)# exit
S1(config)# ip default-gateway 192.168.1.1
S1(config)# exit
S1# copy running-config startup-config
```

---

## 📐 Module 03: Protocols and Models

### 3.1–3.4 Communication Rules & Standards Organizations
* **Rules of Communication**: Message Encoding, Message Formatting and Encapsulation, Message Size, Message Timing (Flow Control, Response Timeout, Access Method), Message Delivery Options (Unicast, Multicast, Broadcast).
* **Standards Bodies**: **IEEE** (Ethernet 802.3, Wi-Fi 802.11), **IETF** (RFC standards for TCP/IP), **ISO** (OSI reference model), **IANA/ICANN** (IP and port allocations).

### 3.5–3.7 OSI 7-Layer Model vs TCP/IP 4-Layer Stack
| OSI Model | TCP/IP Model | Protocol Data Unit (PDU) | Core Protocols & Addressing |
| :---: | :---: | :---: | :--- |
| **7. Application** | Application | Data | HTTP, HTTPS, DNS, DHCP, SSH, FTP |
| **6. Presentation** | Application | Data | TLS/SSL, Data Compression, MIME |
| **5. Session** | Application | Data | RPC, Session management |
| **4. Transport** | Transport | Segment (TCP) / Datagram (UDP) | Port numbers (`0–65535`), Flow control |
| **3. Network** | Internet | Packet | IPv4 / IPv6 addresses, ICMP, OSPF |
| **2. Data Link** | Network Access | Frame | Source & Destination MAC addresses |
| **1. Physical** | Network Access | Bits | Electrical voltages, light pulses, RF waves |

* **Encapsulation (Top-Down)**: Application Data $\rightarrow$ Transport Header + Data ($\text{Segment}$) $\rightarrow$ Network Header + Segment ($\text{Packet}$) $\rightarrow$ Data Link Header + Packet + FCS ($\text{Frame}$) $\rightarrow$ Physical Encoding ($\text{Bits}$).

---

## 🔌 Module 04: Physical Layer

### 4.1–4.4 Physical Layer Media & Copper Cabling
* **Performance Metrics**:
  * **Bandwidth**: Theoretical capacity of the medium (bps).
  * **Throughput**: Actual measure of data transfer over a given time period.
  * **Goodput**: Usable application data throughput ($\text{Throughput} - \text{Overhead}$).
* **Copper Characteristics**: Susceptible to EMI (Electromagnetic Interference), RFI, and Crosstalk (mitigated by opposing twist rates).
* **UTP Categories**: Cat 5e (1 Gbps @ 100m), Cat 6 (1 Gbps @ 100m / 10 Gbps @ 55m), Cat 6a (10 Gbps @ 100m).
* **Wiring Standards**:
  * **T568A**: White/Green, Green, White/Orange, Blue, White/Blue, Orange, White/Brown, Brown.
  * **T568B**: White/Orange, Orange, White/Green, Blue, White/Blue, Green, White/Brown, Brown.
  * **Straight-Through**: T568B to T568B (Connects unlike devices: PC to Switch, Router to Switch).
  * **Crossover**: T568A to T568B (Connects like devices: Switch to Switch, Router to PC; largely obsoleted by Auto-MDIX).

### 4.5–4.6 Fiber-Optic & Wireless Media
* **Single-Mode Fiber (SMF)**: Small 9µm glass core, Laser light, yellow jacket, long haul ($10\text{–}40\text{+ km}$). Zero modal dispersion.
* **Multimode Fiber (MMF)**: Larger 50/62.5µm core, LED light, aqua/orange jacket, short reach ($\le 550\text{m}$). Subject to modal dispersion.
* **Wireless Standards (IEEE 802.11)**:
  * 802.11n (2.4/5 GHz, 600 Mbps), 802.11ac (5 GHz, 6.9 Gbps), 802.11ax / Wi-Fi 6 (2.4/5/6 GHz, 9.6 Gbps, OFDMA).

---

## 🔢 Module 05: Number Systems

### 5.1–5.2 Binary and Hexadecimal Conversions
* **Binary (Base 2)**: 8-bit octet values: `128, 64, 32, 16, 8, 4, 2, 1`.
  * Convert Decimal `192` $\rightarrow 128 + 64 = 11000000_2$.
* **Hexadecimal (Base 16)**: `0–9` and `A=10, B=11, C=12, D=13, E=14, F=15`.
  * Each hex digit represents a 4-bit nibble.
  * Example: `0x2C = 0010 1100_2 = 32 + 8 + 4 = 44_{10}`.

---

## 🔗 Module 06: Data Link Layer

### 6.1–6.3 Sublayers & Media Access Control
* **IEEE 802 Data Link Sublayers**:
  * **LLC (802.2 - Logical Link Control)**: Communicates with Network Layer; multiplexes protocol types in software.
  * **MAC (802.3/802.11 - Media Access Control)**: Hardware-integrated frame encapsulation and physical media access.
* **Media Access Control Methods**:
  * **CSMA/CD (Carrier Sense Multiple Access with Collision Detection)**: Half-duplex wired Ethernet. Transmit $\rightarrow$ detect collision $\rightarrow$ jam signal $\rightarrow$ random exponential backoff.
  * **CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)**: 802.11 Wireless. Request to Send (RTS) / Clear to Send (CTS) channel reservation.
* **Frame Fields**: Header (Frame start flag, Source/Dest MAC, Type) + Payload + Trailer (FCS / CRC-32 checksum error check).

---

## ⚡ Module 07: Ethernet Switching

### 7.1–7.4 Ethernet Framing, MAC Tables & Switching Modes
* **Ethernet II Frame Structure**:
  $$\text{Preamble (7B)} \mid \text{SFD (1B)} \mid \text{Dest MAC (6B)} \mid \text{Source MAC (6B)} \mid \text{EtherType (2B)} \mid \text{Payload (46–1500B)} \mid \text{FCS (4B)}$$
* **MAC Address Structure (48-bit / 12 Hex digits)**:
  * First 24 bits: **OUI (Organizationally Unique Identifier)** assigned to hardware vendor by IEEE.
  * Last 24 bits: Vendor-assigned unique device serial ID.
* **Switch CAM Address Table Operation**:
  1. **Learn**: Reads **Source MAC** on ingress frame $\rightarrow$ logs MAC and port into CAM table (resets 300s aging timer).
  2. **Forward / Filter**: Reads **Destination MAC**:
     * If MAC is in table $\rightarrow$ forward out specific port only.
     * If MAC is unknown or broadcast $\rightarrow$ flood out all ports except ingress port (**Unknown Unicast Flooding**).
* **Switching Forwarding Methods**:
  * **Store-and-Forward**: Buffers entire frame; computes FCS CRC error check before forwarding. Required for QoS.
  * **Cut-Through**:
    * *Fast-Forward*: Forwards immediately after reading 6-byte Destination MAC (lowest latency).
    * *Fragment-Free*: Forwards after reading first 64 bytes (filters out collision runts).
* **Auto-MDIX**: Automatically detects whether connected cable is straight-through or crossover and configures internal pins.

---

## 🧭 Module 08: Network Layer

### 8.1–8.5 IPv4 and IPv6 Packet Header Architecture
* **IPv4 Header Fields (20–60 Bytes)**:
  * Version (`4`), IHL, DSCP, Total Length, Identification, Flags (DF/MF), Fragment Offset, **Time to Live (TTL)** (loop prevention hop counter; drops with ICMP Time Exceeded when 0), **Protocol** (`1 = ICMP`, `6 = TCP`, `17 = UDP`, `89 = OSPF`), Header Checksum, Source & Destination IPv4.
* **IPv6 Fixed 40-Byte Header**:
  * Version (`6`), Traffic Class, Flow Label, Payload Length, **Next Header** (replaces Protocol field; chains extension headers), **Hop Limit** (replaces TTL), Source & Destination 128-bit IPv6.
* **Host Routing Decisions**:
  * Local host $\rightarrow$ ARP / NDP direct delivery.
  * Remote host $\rightarrow$ Forward to Default Gateway router interface.
* **Routing Table Sources**:
  * `C` (Connected - $\text{AD}=0$), `S` (Static - $\text{AD}=1$), `O` (OSPF - $\text{AD}=110$), `D` (EIGRP - $\text{AD}=90$), `*` (Default route `0.0.0.0/0`).

---

## 🔍 Module 09: Address Resolution

### 9.1–9.3 ARP Operation & IPv6 Neighbor Discovery
* **Address Resolution Protocol (ARP)**:
  * **ARP Request**: Broadcast frame (`FF:FF:FF:FF:FF:FF`) asking: *"Who has IP 192.168.1.50? Tell 192.168.1.1"*.
  * **ARP Reply**: Unicast frame from owner containing its physical MAC address.
  * Inspect table: `show ip arp` (Cisco IOS) or `arp -a` (Windows/Linux).
* **ARP Poisoning / Spoofing**: Attacker sends fake gratuitous ARP replies to redirect traffic through attacker's device (MitM). Mitigated by **Dynamic ARP Inspection (DAI)** on switches.
* **IPv6 Neighbor Discovery Protocol (NDP)**:
  * Replaces ARP using ICMPv6 messages.
  * **Neighbor Solicitation (NS - Type 135)** & **Neighbor Advertisement (NA - Type 136)**: Layer 2 address resolution and **Duplicate Address Detection (DAD)**.
  * **Router Solicitation (RS - Type 133)** & **Router Advertisement (RA - Type 134)**: Dynamic default gateway and prefix discovery.

---

## 🛠️ Module 10: Basic Router Configuration

### 10.1–10.3 Configuring Router Interfaces & Gateways
```cisco
Router(config)# hostname R1
R1(config)# enable secret CiscoRouterPass123!
R1(config)# interface GigabitEthernet0/0/0
R1(config-if)# description LAN Gateway Interface
R1(config-if)# ip address 192.168.10.1 255.255.255.0
R1(config-if)# ipv6 address 2001:db8:acad:10::1/64
R1(config-if)# ipv6 address fe80::1 link-local
R1(config-if)# no shutdown
R1(config-if)# exit
R1(config)# ipv6 unicast-routing
```
* **Verification**: `show ip interface brief`, `show ipv6 interface brief`, `show ip route`, `show interfaces`.

---

## 🔢 Module 11: IPv4 Addressing & Subnetting

### 11.1–11.4 IPv4 Addressing Structure & Address Types
* **Structure**: 32 bits divided into Network and Host portions defined by Subnet Mask / Prefix (CIDR).
* **Special IPv4 Address Scopes**:
  * **RFC 1918 Private Ranges**:
    * Class A: `10.0.0.0/8` (`10.0.0.0` – `10.255.255.255`)
    * Class B: `172.16.0.0/12` (`172.16.0.0` – `172.31.255.255`)
    * Class C: `192.168.0.0/16` (`192.168.0.0` – `192.168.255.255`)
  * **Loopback**: `127.0.0.0/8` (`127.0.0.1`)
  * **APIPA (Link-Local)**: `169.254.0.0/16` (DHCP failure)
  * **Multicast (Class D)**: `224.0.0.0/4`

### 11.5–11.9 Subnetting Calculations & VLSM
* **Formulas**:
  * Subnets Created: $2^s$ (where $s$ is borrowed subnet bits).
  * Usable Hosts per Subnet: $2^h - 2$ (where $h$ is remaining host bits; subtract 2 for Network ID and Broadcast ID).
  * **Magic Number**: $256 - \text{Interesting Octet Subnet Mask}$ (defines the step/increment between subnets).
* **Reference Table**:
  | Prefix | Subnet Mask | Magic Number | Total IPs | Usable Hosts ($2^h - 2$) |
  | :---: | :--- | :---: | :---: | :---: |
  | `/24` | `255.255.255.0` | 256 | 256 | 254 |
  | `/25` | `255.255.255.128` | 128 | 128 | 126 |
  | `/26` | `255.255.255.192` | 64 | 64 | 62 |
  | `/27` | `255.255.255.224` | 32 | 32 | 30 |
  | `/28` | `255.255.255.240` | 16 | 16 | 14 |
  | `/29` | `255.255.255.248` | 8 | 8 | 6 |
  | `/30` | `255.255.255.252` | 4 | 4 | 2 (Point-to-point serial/WAN) |
* **VLSM (Variable-Length Subnet Masking)**: Subnetting a subnet based on exact host needs. Always allocate largest subnets first, progressing down to `/30` WAN links.

---

## 🌐 Module 12: IPv6 Addressing

### 12.1–12.4 IPv6 Architecture & Address Types
* **Structure**: 128 bits represented as 8 hextets of 4 hexadecimal characters.
* **Compression Rules**:
  1. *Omit Leading Zeros*: `01ab` $\rightarrow$ `1ab`, `0000` $\rightarrow$ `0`.
  2. *Double Colon (`::`)*: Compresses a single contiguous block of all-zero hextets once per address.
* **Unicast Types**:
  * **Global Unicast Address (GUA)**: `2000::/3` (Globally routable public address).
  * **Link-Local Address (LLA)**: `fe80::/10` (Mandatory on every IPv6 interface; used for local segment next-hop routing).
  * **Loopback**: `::1/128`.
  * **Unique Local Address (ULA)**: `fc00::/7` (Private IPv6 address).

### 12.5–12.8 Dynamic IPv6 Assignment & Subnetting
* **SLAAC (Stateless Address Autoconfiguration)**:
  * Host acquires prefix from Router Advertisement (RA).
  * Generates 64-bit Interface ID using **EUI-64** (splits 48-bit MAC in half, inserts `FF:FE`, and flips 7th Universal/Local bit) or random generation.
* **DHCPv6**:
  * Stateless DHCPv6: SLAAC for IP + DHCPv6 for DNS server.
  * Stateful DHCPv6: DHCPv6 leases entire IP and DNS.
* **IPv6 Subnetting Standard**: Standard allocation `/48` Global Routing Prefix + 16-bit Subnet ID (`65,536` subnets) + `/64` Interface ID.

---

## 📡 Module 13: ICMP

### 13.1–13.2 ICMPv4 & ICMPv6 Diagnostic Messaging
* **ICMP Messages**:
  * **Echo Request (Type 8 / v6 Type 128)** & **Echo Reply (Type 0 / v6 Type 129)** $\rightarrow$ Tested by `ping`.
  * **Destination Unreachable (Type 3)**: Code 0 (Net), Code 1 (Host), Code 3 (Port unreachable).
  * **Time Exceeded (Type 11 / Code 0)**: Generated when router drops packet with $\text{TTL} = 0 \rightarrow$ Used by `traceroute` to map hop-by-hop paths.

---

## 🚚 Module 14: Transport Layer

### 14.1–14.7 TCP vs UDP Mechanics
* **Transport Role**: Multiplexes application data conversations via port numbers (`0–65535`).
* **Port Ranges**: Well-Known (`0–1023`), Registered (`1024–49151`), Dynamic/Private Ephemeral (`49152–65535`).
* **Socket Pair**: Source IP:Port $\leftrightarrow$ Destination IP:Port.
* **TCP (Transmission Control Protocol)**:
  * Connection-oriented 3-way handshake (`SYN` $\rightarrow$ `SYN-ACK` $\rightarrow$ `ACK`).
  * Connection termination: 4-way handshake (`FIN` $\rightarrow$ `ACK` $\rightarrow$ `FIN` $\rightarrow$ `ACK`).
  * Reliable data delivery via sequence numbering, positive acknowledgments, and retransmissions.
  * Sliding Window Flow Control: Dynamically scales byte window to prevent receiver buffer overflow.
* **UDP (User Datagram Protocol)**:
  * Connectionless, lightweight 8-byte header (Source Port, Dest Port, Length, Checksum).
  * Best-effort delivery with zero retransmission latency (VoIP, Video streaming, DNS, DHCP).

---

## 🌍 Module 15: Application Layer

### 15.1–15.5 Application Layer Protocols & Services
* **DNS (Domain Name System - UDP/TCP 53)**: Resolves hostnames to IP addresses.
  * Records: `A` (IPv4), `AAAA` (IPv6), `CNAME` (Alias), `MX` (Mail Exchange), `NS` (Name Server), `PTR` (Reverse lookup).
* **DHCPv4 (UDP 67 Server / 68 Client)**: 4-step **DORA** broadcast lease process:
  1. **Discover**: Client broadcast (`0.0.0.0:68` $\rightarrow$ `255.255.255.255:67`).
  2. **Offer**: Server offers IP lease parameters.
  3. **Request**: Client broadcasts acceptance of specific server offer.
  4. **Acknowledge**: Server finalizes lease binding.
* **Web & Email Protocols**:
  * HTTP (`80`) vs HTTPS (`443` with TLS encryption).
  * SMTP (`25/587` - Sending mail), POP3 (`110/995` - Downloading mail), IMAP (`143/993` - Synchronizing mail folders across multiple clients).
* **File Sharing**: FTP (`20/21`), TFTP (`69`), SMB (`445`).

---

## 🔒 Module 16: Network Security Fundamentals

### 16.1–16.4 Threats, Attack Types & Mitigations
* **Threat Categories**: Malware (Viruses, Worms, Trojans), Reconnaissance (Ping sweeps, Nmap port scans), Access Attacks (Brute-force passwords, Trust exploitation, MitM), DoS/DDoS (SYN flood, UDP amplification).
* **Defense-in-Depth**: Firewalls, Intrusion Prevention Systems (IPS), AAA authentication, VPN tunnels, Endpoint antivirus.
* **Device Hardening**: Strong administrative passwords, configure SSH with 2048-bit RSA keys (`crypto key generate rsa`), disable unused ports and interfaces, encrypt plaintext passwords (`service password-encryption`).

---

## 🛠️ Module 17: Build a Small Network & Troubleshooting

### 17.1–17.7 Small Network Design & Structured Troubleshooting
* **Small Network Design**: Redundant links, scalable hierarchical addressing, QoS traffic prioritization for VoIP/Video.
* **Troubleshooting Methodologies**:
  * **Top-Down**: Starts at Application layer down to Physical.
  * **Bottom-Up**: Starts with physical cabling, link lights, Layer 2 duplex, up to Application.
  * **Divide-and-Conquer**: Pings default gateway from middle Network Layer to determine direction.
* **Core Verification Commands**:
  * Cisco IOS: `ping`, `traceroute`, `show ip interface brief`, `show ip route`, `show running-config`, `show mac address-table`, `show cdp neighbors`.
  * Host CLI: `ipconfig /all`, `ipconfig /flushdns`, `ping`, `tracert`, `netstat -ano`, `nslookup`, `arp -a`.
