# CISS 120: Computer Networking & Communications — Master Study Guide

Welcome to the **CISS 120 (Computer Networking & Communications / Cisco CCNA ITN & SRWE) Master Study Guide**. This comprehensive reference covers all 9 modules spanning physical transmission media, data link switching, IPv4/IPv6 subnetting, Cisco IOS CLI configuration, routing protocols, transport mechanics, application services, VLANs, Spanning Tree Protocol (STP), and EtherChannel link aggregation.

---

## 🌐 Module 01: Network Architecture, Physical Layer, Media & Number Systems

### 1.1 Network Topologies & Performance Metrics
* **Network Classifications**:
  * **LAN (Local Area Network)**: High-speed, low-latency infrastructure spanning a single geographic site.
  * **WAN (Wide Area Network)**: Interconnects geographically dispersed LANs across service provider networks.
* **Topologies**: Physical vs. Logical topologies; Star, Extended Star, Mesh (full redundancy $N(N-1)/2$ links), and Partial Mesh.
* **Performance Metrics**:
  * **Bandwidth**: Theoretical capacity of a medium (bps, Mbps, Gbps).
  * **Throughput**: Actual transfer rate of usable data over a given period.
  * **Goodput**: Usable application-level data throughput ($\text{Throughput} - \text{Protocol Overhead}$).
  * **Latency**: End-to-end delay (Propagation + Transmission + Queuing + Processing).

### 1.3 & 1.4 OSI 7-Layer Model vs 4-Layer TCP/IP Protocol Stack
| OSI Layer | Layer Name | TCP/IP Layer | PDU (Protocol Data Unit) | Core Addressing & Protocols |
| :---: | :--- | :---: | :---: | :--- |
| **7** | Application | Application | Data | HTTP, HTTPS, DNS, DHCP, SSH, SMTP |
| **6** | Presentation | Application | Data | TLS/SSL, Data formatting, Compression |
| **5** | Session | Application | Data | Session establishment, RPC |
| **4** | Transport | Transport | Segment (TCP) / Datagram (UDP) | Port numbers (TCP/UDP, Flow control) |
| **3** | Network | Internet | Packet | IP Addresses (IPv4, IPv6, ICMP, OSPF) |
| **2** | Data Link | Network Access | Frame | MAC Addresses (Ethernet 802.3, Wi-Fi 802.11) |
| **1** | Physical | Network Access | Bits | Electrical voltages, Light pulses, RF waves |

### 1.5 Protocol Encapsulation & Decapsulation
* **Encapsulation (Top $\rightarrow$ Bottom)**: Data $\rightarrow$ Add Transport Header ($\text{Segment}$) $\rightarrow$ Add Network Header ($\text{Packet}$) $\rightarrow$ Add Data Link Header & Trailer ($\text{Frame}$) $\rightarrow$ Encode into Physical Signals ($\text{Bits}$).
* **Decapsulation (Bottom $\rightarrow$ Top)**: Stripping headers at each peer layer upon receipt.

### 1.6–1.8 Physical Transmission Media
* **Copper (UTP/STP)**:
  * Cat 5e (1 Gbps @ 100m, 100 MHz), Cat 6 (1 Gbps @ 100m / 10 Gbps @ 55m, 250 MHz), Cat 6a (10 Gbps @ 100m, 500 MHz).
  * **T568A Pinout**: White/Green, Green, White/Orange, Blue, White/Blue, Orange, White/Brown, Brown.
  * **T568B Pinout**: White/Orange, Orange, White/Green, Blue, White/Blue, Green, White/Brown, Brown.
* **Fiber Optics**:
  * **Single-Mode Fiber (SMF)**: Yellow jacket, 9µm core, Laser light source, long haul ($10\text{–}40\text{+ km}$).
  * **Multimode Fiber (MMF)**: Aqua/Orange jacket, 50/62.5µm core, LED/VCSEL light source, modal dispersion limit ($\le 550\text{m}$).
* **Wireless Standards**: 802.11b (11 Mbps, 2.4 GHz), 802.11g (54 Mbps, 2.4 GHz), 802.11n (600 Mbps, 2.4/5 GHz), 802.11ac (6.9 Gbps, 5 GHz), 802.11ax / Wi-Fi 6 (9.6 Gbps, 2.4/5/6 GHz, OFDMA).

### 1.9 Number Systems & Binary Conversion
* $1\text{ Byte} = 8\text{ bits}$ (Range: `0` to `255`).
* Positional weights: `128, 64, 32, 16, 8, 4, 2, 1`.
* Hexadecimal: Base 16 (`0–9`, `A–F`). Each hex character represents 4 binary bits (a nibble). Example: `0xC0 = 1100 0000_2 = 192_{10}`.

---

## ⚡ Module 02: Data Link Layer, Ethernet Framing, Switch Learning & Microsegmentation

### 2.1 Data Link Layer Sublayers & Media Access Control
* **IEEE 802 Sublayers**:
  * **Logical Link Control (LLC - 802.2)**: Communicates with upper Network Layer; multiplexes network protocols.
  * **Media Access Control (MAC - 802.3/802.11)**: Encapsulates data into frames; handles physical hardware addressing and media access rules.
* **Media Access Control Methods**:
  * **CSMA/CD (Carrier Sense Multiple Access with Collision Detection)**: Half-duplex Ethernet; listen before transmitting; if collision detected, send jam signal and execute backoff algorithm.
  * **CSMA/CA (Carrier Sense Multiple Access with Collision Avoidance)**: Wireless 802.11; utilizes Request to Send (RTS) / Clear to Send (CTS) handshake.

### 2.2 & 2.3 Ethernet Frame Structure & MAC Addressing
* **Ethernet II Frame Format**:
  $$\text{Preamble (7B)} \mid \text{SFD (1B)} \mid \text{Dest MAC (6B)} \mid \text{Source MAC (6B)} \mid \text{Type/Length (2B)} \mid \text{Payload (46–1500B)} \mid \text{FCS/CRC (4B)}$$
* **MAC Address Anatomy (48-bit / 6 Bytes)**:
  * First 24 bits: **OUI (Organizationally Unique Identifier)** assigned by IEEE to vendor.
  * Last 24 bits: Vendor-assigned unique device identifier.
* **Transmission Types**:
  * **Unicast**: Destination MAC unique to a single NIC.
  * **Broadcast**: `FF:FF:FF:FF:FF:FF` (all hosts on broadcast domain).
  * **Multicast**: `01:00:5E:xx:xx:xx` (IPv4) or `33:33:xx:xx:xx:xx` (IPv6).

### 2.4–2.7 Switch Forwarding & CAM Tables
* **Content Addressable Memory (CAM) Table Learning**:
  1. Switch inspects **Source MAC** of incoming frame $\rightarrow$ Records MAC and Ingress Port in CAM table (resets 300s aging timer).
  2. Switch inspects **Destination MAC**:
     * If MAC is in CAM table $\rightarrow$ Forward out specific port only (**Forwarding / Filtering**).
     * If MAC is unknown or broadcast $\rightarrow$ Floods frame out all ports except ingress port (**Unknown Unicast Flooding**).
* **Collision vs Broadcast Domains**:
  * Switches break up **Collision Domains** on every single port (Microsegmentation / Full Duplex).
  * Switches maintain a single shared **Broadcast Domain** (broken up only by Routers or VLANs).
* **Switch Forwarding Modes**:
  * **Store-and-Forward**: Buffers entire frame; verifies FCS CRC checksum before forwarding (highest error-free integrity; required for QoS).
  * **Cut-Through**:
    * *Fast-Forward*: Forwards immediately after reading 6-byte Destination MAC (lowest latency; may forward corrupted runts).
    * *Fragment-Free*: Forwards after reading first 64 bytes (filters out collision fragments).
* **Auto-MDIX**: Automatically detects cable type (Straight-Through vs Crossover) and configures internal pin signaling.

---

## 🧭 Module 03: Network Layer, IPv4/IPv6 Headers, Routing Tables & ARP

### 3.1 & 3.2 Network Layer & IPv4 Header Architecture
* **Connectionless, Best-Effort, Media-Independent**: The Network Layer delivers packets without prior connection negotiation, without intrinsic delivery guarantees, and irrespective of physical link media.
* **IPv4 Header Fields (20–60 Bytes)**:
  * **Version (4 bits)**: `0100` (IPv4).
  * **IHL (4 bits)**: Internet Header Length in 32-bit words (minimum value 5 = 20 bytes).
  * **DSCP / ToS (8 bits)**: Quality of Service traffic classification.
  * **Total Length (16 bits)**: Total packet size (header + data) in bytes.
  * **Identification, Flags, Fragment Offset (32 bits)**: Packet fragmentation handling (Flags: `DF` Don't Fragment, `MF` More Fragments).
  * **Time to Live (TTL - 8 bits)**: Loop prevention counter; decremented by 1 at each router hop; packet dropped with ICMP Time Exceeded when $\text{TTL} = 0$.
  * **Protocol (8 bits)**: Next-layer protocol (`1 = ICMP`, `6 = TCP`, `17 = UDP`, `89 = OSPF`).
  * **Header Checksum (16 bits)**: Error detection on IPv4 header only (recomputed at every hop).
  * **Source & Destination IPv4 Addresses (32 bits each)**.

### 3.3 IPv6 Fixed Header Architecture
* **Simplified 40-Byte Fixed Header**: Eliminates variable fields, checksums, and in-transit router fragmentation.
* **Fields**: Version (`0110`), Traffic Class (QoS), Flow Label (20-bit packet stream tag), Payload Length, **Next Header** (replaces Protocol field; points to next extension header or upper-layer protocol), **Hop Limit** (replaces TTL), Source IPv6 (128 bits), Destination IPv6 (128 bits).

### 3.4 & 3.5 Host & Router Routing Decisions
* **Host Routing Logic**:
  1. Itself: `127.0.0.1` (IPv4) or `::1` (IPv6).
  2. Local Host (same subnet): ARP/NDP lookup $\rightarrow$ Direct Layer 2 delivery.
  3. Remote Host (different subnet): Forward frame to **Default Gateway** router interface MAC address.
* **Router Routing Table Fields**:
  * **Route Source Code**: `C` (Connected), `S` (Static), `O` (OSPF), `D` (EIGRP), `*` (Candidate Default).
  * **Destination Network & Prefix Length**.
  * **Administrative Distance (AD)**: Trustworthiness metric ($0 = \text{Connected}, 1 = \text{Static}, 90 = \text{EIGRP}, 110 = \text{OSPF}$).
  * **Metric**: Cost or composite metric to reach destination.
  * **Next-Hop IP Address** and **Egress Interface**.

### 3.6 & 3.7 Address Resolution Protocol (ARP)
* **ARP Operation**: Resolves known IPv4 address to unknown Layer 2 MAC address.
  * **ARP Request**: Broadcast frame (`FF:FF:FF:FF:FF:FF`) sent out all switch ports: *"Who has IP 192.168.1.50? Tell 192.168.1.1"*.
  * **ARP Reply**: Unicast frame sent directly back to requester with physical MAC.
* **ARP Security & Dynamic ARP Inspection (DAI)**:
  * **ARP Poisoning / Spoofing**: Attacker sends gratuitous ARP replies associating default gateway IP with attacker's MAC (Man-in-the-Middle).
  * **DAI Mitigation**: Switch inspects ARP packets against trusted DHCP Snooping binding table, dropping invalid ARP packets on untrusted ports.

---

## 🛠️ Module 04: Cisco IOS CLI, Device Hardening & Subnetting Calculations

### 4.1 & 4.2 Cisco IOS CLI Modes & Navigation
* **Hierarchical Command Modes**:
  * **User EXEC Mode (`Router>`)**: Basic monitoring and diagnostics. Command to elevate: `enable`.
  * **Privileged EXEC Mode (`Router#`)**: Full configuration inspection, debug, reload, file system operations. Command: `configure terminal`.
  * **Global Configuration Mode (`Router(config)#`)**: System-wide configuration commands.
  * **Specific Config Modes**:
    * Interface: `Router(config-if)#`
    * Line: `Router(config-line)#`
    * Router Routing: `Router(config-router)#`
* **CLI Navigation Shortcuts**: `Tab` (auto-complete), `?` (contextual help), `Ctrl+A` (start of line), `Ctrl+E` (end of line), `Ctrl+Z` or `end` (return directly to Privileged EXEC).

### 4.3 Device Hardening & Initial Configuration
```cisco
Router(config)# hostname R1
R1(config)# enable secret Cisco123!
R1(config)# service password-encryption
R1(config)# banner motd # AUTHORIZED ACCESS ONLY #
R1(config)# line console 0
R1(config-line)# password ConsolePass!
R1(config-line)# login
R1(config-line)# logging synchronous
R1(config-line)# exec-timeout 5 0
R1(config-line)# exit
```

### 4.4 & 4.5 Interface Configuration & SVI
* **Router Physical Interface**:
  ```cisco
  R1(config)# interface GigabitEthernet0/0/0
  R1(config-if)# description LAN Gateway
  R1(config-if)# ip address 192.168.1.1 255.255.255.0
  R1(config-if)# no shutdown
  ```
* **Switch Virtual Interface (SVI - Management IP)**:
  ```cisco
  S1(config)# interface vlan 1
  S1(config-if)# ip address 192.168.1.2 255.255.255.0
  S1(config-if)# no shutdown
  S1(config)# ip default-gateway 192.168.1.1
  ```

### 4.2 & 4.4 Subnetting Mathematics & The Magic Number Method
* **Magic Number Formula**: $\text{Magic Number} = 256 - \text{Interesting Octet Subnet Mask}$.
  * The Magic Number defines the **block size (increment)** between subnet network addresses.
  * Number of Subnets created: $2^s$ (where $s$ is borrowed subnet bits).
  * Number of Usable Hosts per Subnet: $2^h - 2$ (where $h$ is remaining host bits; subtract 2 for Network ID and Broadcast ID).
* **Reference Subnet Table**:
  | CIDR | Subnet Mask | Magic Number (Block Size) | Total IPs | Usable Hosts ($2^h - 2$) |
  | :---: | :--- | :---: | :---: | :---: |
  | `/24` | `255.255.255.0` | 256 | 256 | 254 |
  | `/25` | `255.255.255.128` | 128 | 128 | 126 |
  | `/26` | `255.255.255.192` | 64 | 64 | 62 |
  | `/27` | `255.255.255.224` | 32 | 32 | 30 |
  | `/28` | `255.255.255.240` | 16 | 16 | 14 |
  | `/29` | `255.255.255.248` | 8 | 8 | 6 |
  | `/30` | `255.255.255.252` | 4 | 4 | 2 (Point-to-Point WAN) |

---

## 🔢 Module 05: IPv4/IPv6 Addressing Schemes, VLSM, CIDR & Remote Access Security

### 5.1 & 5.2 IPv4 Addressing Categories
* **RFC 1918 Private IPv4 Ranges**:
  * **Class A**: `10.0.0.0` – `10.255.255.255` (`10.0.0.0/8`)
  * **Class B**: `172.16.0.0` – `172.31.255.255` (`172.16.0.0/12`)
  * **Class C**: `192.168.0.0` – `192.168.255.255` (`192.168.0.0/16`)
* **Special-Use IPv4 Addresses**:
  * **Loopback**: `127.0.0.0/8` (`127.0.0.1`)
  * **APIPA (Link-Local)**: `169.254.0.0/16` (assigned when DHCP fails)
  * **Multicast (Class D)**: `224.0.0.0` – `239.255.255.255`

### 5.3 Variable-Length Subnet Masking (VLSM)
* **VLSM Strategy**: Subnetting an already subnetted address space based on individual host requirements.
  * **Rule**: Always allocate subnets starting with the **largest host requirement first**, working down to the smallest (WAN link `/30`s last) to prevent address space fragmentation.

### 5.4–5.6 IPv6 Addressing Architecture
* **Structure**: 128 bits written as 8 quartets (hextets) of 4 hexadecimal digits separated by colons.
* **Compression Rules**:
  1. *Omit Leading Zeros*: `01ab` $\rightarrow$ `1ab`, `0000` $\rightarrow$ `0`.
  2. *Double Colon (`::`)*: Replaces a contiguous string of all-zero hextets once per address.
* **IPv6 Unicast Scope Types**:
  * **Global Unicast Address (GUA)**: `2000::/3` (Globally routable public address).
  * **Link-Local Address (LLA)**: `fe80::/10` (Locally routable on immediate segment only; used for neighbor discovery and next-hop routing).
  * **Unique Local Address (ULA)**: `fc00::/7` (IPv6 private addresses).
* **Dynamic IPv6 Configuration**:
  * **SLAAC (Stateless Address Autoconfiguration)**: Host receives prefix from Router Advertisement (RA); generates 64-bit Interface ID via **EUI-64** (splits 48-bit MAC in half, inserts `FF:FE`, inverts 7th U/L bit) or random generation.
  * **Stateful DHCPv6**: DHCP server leases IPv6 address and DNS servers.

### 5.3 Securing Remote Access with SSH
```cisco
R1(config)# ip domain-name hvcc.edu
R1(config)# crypto key generate rsa modulus 2048
R1(config)# username admin privilege 15 secret AdminPass123!
R1(config)# ip ssh version 2
R1(config)# line vty 0 4
R1(config-line)# transport input ssh
R1(config-line)# login local
```

---

## 🔄 Module 06: Address Resolution, ICMP Diagnostics & Transport Layer Protocols

### 6.1 & 6.2 ICMP Diagnostics & Error Messaging
* **ICMPv4 & ICMPv6 Roles**: Diagnostic messaging and operational feedback.
  * **Echo Request (Type 8 / ICMPv6 Type 128)** & **Echo Reply (Type 0 / ICMPv6 Type 129)** $\rightarrow$ `ping`.
  * **Destination Unreachable (Type 3)**: Code 0 (Net), Code 1 (Host), Code 3 (Port).
  * **Time Exceeded (Type 11 / Code 0)**: Generated when router drops packet with $\text{TTL} = 0 \rightarrow$ used by `traceroute`.

### 6.3 & 6.4 IPv6 Neighbor Discovery Protocol (NDP)
* Replaces IPv4 ARP, ICMP Router Discovery, and ICMP Redirects using ICMPv6 messages:
  * **Router Solicitation (RS - Type 133)** & **Router Advertisement (RA - Type 134)**: Discovers local default gateway and SLAAC network prefix.
  * **Neighbor Solicitation (NS - Type 135)** & **Neighbor Advertisement (NA - Type 136)**: Layer 2 address resolution and **Duplicate Address Detection (DAD)**.

### 6.2–6.4 Transport Layer: TCP vs UDP
* **TCP (Transmission Control Protocol)**:
  * Connection-oriented 3-way handshake (`SYN` $\rightarrow$ `SYN-ACK` $\rightarrow$ `ACK`).
  * Reliable data delivery with sequence numbering and positive acknowledgments.
  * **Sliding Window Flow Control**: Dynamic buffer windowing adjusting throughput based on receiver capacity.
  * Connection termination: 4-way handshake (`FIN` $\rightarrow$ `ACK` $\rightarrow$ `FIN` $\rightarrow$ `ACK`).
* **UDP (User Datagram Protocol)**:
  * Connectionless, lightweight 8-byte header (Source Port, Dest Port, Length, Checksum).
  * Unreliable best-effort delivery with zero retransmission latency (VoIP, Video streaming, DNS, DHCP).
* **Port Numbers & Sockets**:
  * **Socket Pair**: Source IP + Source Port $\leftrightarrow$ Destination IP + Destination Port.
  * Port Ranges: Well-Known (`0–1023`), Registered (`1024–49151`), Dynamic/Private Ephemeral (`49152–65535`).

---

## 🔒 Module 07: TCP/UDP Mechanics, Sockets, Layer 2 Security & Small Network Design

### 7.2 Layer 2 Attack Vectors & Port Security
* **Layer 2 Vulnerabilities**:
  * **MAC Address Table Flooding**: Attacker floods switch with thousands of bogus source MACs to fill CAM table, turning switch into a hub (**Fail-Open** mode allowing packet sniffing).
  * **VLAN Hopping**: Double-tagging 802.1Q frames or abusing DTP autotrunking.
  * **DHCP Starvation & Rogue DHCP**: Exhausting DHCP pool and deploying rogue default gateway.
* **Switchport Port Security Hardening**:
  ```cisco
  S1(config)# interface FastEthernet0/1
  S1(config-if)# switchport mode access
  S1(config-if)# switchport port-security
  S1(config-if)# switchport port-security maximum 2
  S1(config-if)# switchport port-security mac-address sticky
  S1(config-if)# switchport port-security violation shutdown
  ```
* **Violation Modes**:
  * **`protect`**: Drops frames from unauthorized MACs; does not increment counter or log syslog.
  * **`restrict`**: Drops frames; increments violation counter; generates SNMP/syslog alert.
  * **`shutdown`**: Immediately puts port into `err-disabled` state; generates syslog; requires `shutdown` then `no shutdown` to recover.

---

## 🏷️ Module 08: Application Layer Services & VLAN Trunking

### 8.1 & 8.2 Application Layer Protocols
* **DNS (UDP/TCP 53)**: Resolves FQDNs to IPs (`A`, `AAAA`, `CNAME`, `MX`, `NS`, `PTR`).
* **DHCPv4 (UDP 67/68)**: 4-step **DORA** broadcast process:
  1. **Discover**: Client broadcast (`0.0.0.0:68` $\rightarrow$ `255.255.255.255:67`).
  2. **Offer**: Server unicast/broadcast offering IP lease.
  3. **Request**: Client broadcast accepting specific server offer.
  4. **Acknowledge**: Server unicast/broadcast finalizing lease parameters.
* **Web & Mail Protocols**:
  * HTTP (`80`) vs HTTPS (`443` via TLS 1.3).
  * SMTP (`25/587` - Sending mail), POP3 (`110/995` - Downloading mail), IMAP (`143/993` - Synchronizing mail folders).
* **File & Management**: FTP (`20/21`), TFTP (`69`), NTP (`123`), SNMP (`161/162`).

### 8.1 & 8.2 VLANs & 802.1Q Trunking
* **VLAN Benefits**: Security segmentation, broadcast domain containment, organizational grouping.
* **IEEE 802.1Q Tagging**: Inserts 4-byte Tag Protocol Identifier (TPID) and 12-bit VLAN ID (VID range: `1–4094`) into Ethernet header.
* **Cisco Trunk Configuration**:
  ```cisco
  S1(config)# vlan 10
  S1(config-vlan)# name Engineering
  S1(config)# interface GigabitEthernet0/1
  S1(config-if)# switchport mode trunk
  S1(config-if)# switchport trunk native vlan 99
  S1(config-if)# switchport trunk allowed vlan 10,20,99
  ```
* **Dynamic Trunking Protocol (DTP)**: Cisco proprietary negotiation (`switchport nonegotiate` disables DTP to prevent VLAN hopping).

### 8.3 Inter-VLAN Routing: Router-on-a-Stick
```cisco
R1(config)# interface GigabitEthernet0/0/1
R1(config-if)# no shutdown
R1(config)# interface GigabitEthernet0/0/1.10
R1(config-subif)# encapsulation dot1Q 10
R1(config-subif)# ip address 192.168.10.1 255.255.255.0
R1(config)# interface GigabitEthernet0/0/1.20
R1(config-subif)# encapsulation dot1Q 20
R1(config-subif)# ip address 192.168.20.1 255.255.255.0
```

---

## 🌲 Module 09: Redundant Topologies, Spanning Tree (STP), EtherChannel & CCNA Synthesis

### 9.1–9.3 Spanning Tree Protocol (STP - IEEE 802.1D / 802.1w)
* **Layer 2 Loop Problems**: Broadcast Storms (exponential duplication of frames), Multiple Frame Transmission, CAM Table Instability.
* **Root Bridge Election**:
  * Bridge ID (BID): **Priority** (default 32768) + **Extended System ID** (VLAN ID) + **MAC Address**.
  * Switch with the **lowest numerical Bridge ID** becomes Root Bridge.
* **STP Port Roles**:
  * **Root Port (RP)**: One per non-root switch; lowest root path cost towards root bridge.
  * **Designated Port (DP)**: One per segment; forwards traffic (all ports on Root Bridge are DPs).
  * **Non-Designated / Alternate Port**: In blocking/discarding state to prevent loops.
* **Rapid PVST+ (802.1w)**:
  * Port States: **Discarding**, **Learning**, **Forwarding**.
  * PortFast: Configured on access ports connected to end hosts; immediately transitions port from Discarding to Forwarding, bypassing listening/learning delays.
  * BPDU Guard: Shuts down port (`err-disabled`) if a BPDU is received on a PortFast-enabled interface.

### 9.4 EtherChannel Link Aggregation (PAgP & LACP)
* **Purpose**: Bundles up to 8 parallel physical Ethernet links into a single logical channel group, increasing bandwidth while preventing STP from blocking redundant links.
* **Protocols**:
  * **PAgP (Cisco Proprietary)**: Modes: `Auto` (passive) and `Desirable` (active).
  * **LACP (IEEE 802.3ad Open Standard)**: Modes: `Passive` and `Active`.
* **Cisco LACP Configuration**:
  ```cisco
  S1(config)# interface range GigabitEthernet0/1 - 2
  S1(config-if-range)# channel-group 1 mode active
  S1(config)# interface port-channel 1
  S1(config-if)# switchport mode trunk
  S1(config-if)# switchport trunk allowed vlan 10,20,99
  ```

### 9.5 CCNA Synthesis & Comprehensive Blueprint
* End-to-end integration: Subnet design $\rightarrow$ Cisco IOS device hardening $\rightarrow$ Access & Voice VLANs $\rightarrow$ 802.1Q Trunks $\rightarrow$ EtherChannel aggregation $\rightarrow$ Rapid PVST+ loop prevention $\rightarrow$ Inter-VLAN routing $\rightarrow$ Secure SSH remote management.
