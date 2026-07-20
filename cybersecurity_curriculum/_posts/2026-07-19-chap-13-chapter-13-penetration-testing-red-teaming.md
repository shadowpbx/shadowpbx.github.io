---
layout: single
title: "Chapter 13: Penetration Testing & Red Teaming"
chapter_num: "13"
summary: "The Cyber Kill Chain Framework, Passive Reconnaissance & OSINT, Active Reconnaissance (Nmap Scanning), Service Enumeration"
---

*   **The Cyber Kill Chain Framework:** Analyzing attack progressions using the structured Lockheed Martin model: Reconnaissance, Weaponization, Delivery, Exploitation, Installation, Command and Control (C2), and Actions on Objectives.
*   **Passive Reconnaissance & OSINT:** Gathering target intelligence without direct system interaction by querying public WHOIS databases, performing passive DNS enumeration, searching Shodan for internet-facing assets, using Google Dorking queries, and scraping social media.
*   **Active Reconnaissance (Nmap Scanning):** Probing target networks directly to discover active hosts and open ports, executing TCP Connect, stealthy SYN, and UDP scans, identifying running services, and performing OS fingerprinting.
*   **Service Enumeration:** Extracting system metadata, user accounts, network shares, and software banners by querying active SMB, SNMP, and LDAP protocols on target servers.
*   **Exploitation Mechanics (Metasploit Framework):** Selecting and executing stable public exploits against target vulnerabilities, distinguishing the exploit payload from the shell, and managing raw TCP bind shells vs. egress-friendly reverse shells.
*   **Local Privilege Escalation Tactics:** Elevating permissions on a compromised host, exploiting Linux flaws (such as SUID binaries, misconfigured sudoers privileges, or kernel bugs) and Windows vulnerabilities (such as Token Impersonation or Unquoted Service Paths).
*   **Post-Exploitation Methodologies:** Securing long-term access post-compromise by pillaging local files and databases, executing lateral movement to adjacent hosts, passing cryptographic credentials (Pass-the-Hash), and establishing persistent execution paths via scheduled tasks or registry keys.
*   **Covert Operations & Covering Tracks:** Evading local host detection by selectively clearing system and application event logs, modifying file metadata timestamps to match original system files (Timestomping), and masking outbound network connections.
*   **Wireless Exploitation:** Compromising over-the-air communication, capturing WPA2 4-way handshakes to perform offline dictionary cracking, launching Evil Twin decoy access points, and deploying unauthorized rogue routers on target network segments.
