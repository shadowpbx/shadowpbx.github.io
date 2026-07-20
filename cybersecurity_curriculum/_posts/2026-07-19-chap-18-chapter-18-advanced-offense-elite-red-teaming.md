---
layout: single
title: "Chapter 18: Advanced Offense (Elite Red Teaming)"
chapter_num: "18"
summary: "Malware Development & LOLBins, Endpoint Detection Evasion Tactics, Exploit Development (Buffer Overflows), Memory Defenses & Bypasses (ASLR/DEP)"
---

*   **Malware Development & LOLBins:** Compiling custom execution binaries (in C, C++, or Go) that call lower-level APIs directly, and utilizing legitimate, pre-installed operating system utilities (Living-off-the-Land Binaries) to execute code.
*   **Endpoint Detection Evasion Tactics:** Bypassing security monitoring software by applying custom payload encryption, executing process injection (such as DLL injection or Process Hollowing), and unhooking user-mode APIs in memory.
*   **Exploit Development (Buffer Overflows):** Crafting custom exploits targeting software memory vulnerabilities, manually calculating memory offsets, taking control of execution registers (EIP/RIP), and generating stable shellcode.
*   **Memory Defenses & Bypasses (ASLR/DEP):** Defeating compiled system memory mitigations (such as Address Space Layout Randomization and Data Execution Prevention) by chaining stack-based instruction pointers together using Return-Oriented Programming (ROP).
*   **Advanced Active Directory Offense:** Targeting corporate domain structures by harvesting Kerberos service tickets (Kerberoasting), requesting unsecured tickets (AS-REP Roasting), passing forged tickets (Pass-the-Ticket, Golden/Silver Tickets), and mapping domain trust paths using BloodHound.
*   **Software Reverse Engineering:** Deconstructing compiled application binaries, analyzing disassembled assembly instructions, decompiling execution flows in Ghidra or IDA Pro, and analyzing compiled executables.
