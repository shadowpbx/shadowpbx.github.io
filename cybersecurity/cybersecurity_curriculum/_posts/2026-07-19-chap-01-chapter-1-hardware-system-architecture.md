---
layout: single
title: "Hardware & System Architecture"
chapter_num: "01"
summary: "CPU Architecture (x86 vs. ARM vs. RISC-V), CPU Internals (ALU, Control Unit, Registers, Cache, Clock Cycles), Memory Management (RAM, MMU, Paging, Swap/Pagef..."
---

*   **CPU Architecture (x86 vs. ARM vs. RISC-V):** Analyzing instruction set architectures (CISC vs. RISC), register layouts, power consumption profiles, and execution models across modern endpoint, mobile, and open-source hardware systems.
*   **CPU Internals (ALU, Control Unit, Registers, Cache, Clock Cycles):** Demystifying the physical components of processors, tracking how the Arithmetic Logic Unit executes mathematical logic, how the Control Unit directs instructions, how high-speed L1/L2/L3 cache manages data access, and how system clocks synchronize instructions.
*   **Memory Management (RAM, MMU, Paging, Swap/Pagefile):** Managing physical and virtual volatile storage, using the Memory Management Unit to map virtual address spaces to physical RAM, and configuring paging systems and swap files to handle memory over-allocation.
*   **Storage Media (HDD, SSD, NVMe, Physical Persistence):** Examining non-volatile storage mediums, the physical mechanics of magnetic platters vs. flash memory cells, and how data blocks physically persist even after software deletion.
*   **Motherboard Data Flow (PCIe, Northbridge/Southbridge, Hardware Buses):** Mapping path routing on the physical circuit board, analyzing high-speed PCIe lanes, and tracing legacy and modern chipset architectures that govern data transfer between components.
*   **The Boot Process (Legacy BIOS vs. UEFI, MBR vs. GPT):** Analyzing the sequence from machine power-on to operating system initialization, including partition table styles and legacy vs. modern firmware environments.
*   **Hardware Root of Trust & Secure Boot:** Using cryptographic signatures to validate each stage of the boot loader, ensuring only untampered, authorized operating system code is executed on hardware initialization.
*   **Execution Rings (Ring 0 vs. Ring 3 & Hardware Abstraction):** Enforcing security boundaries on the CPU, isolating high-privileged system kernels (Ring 0) from standard user applications (Ring 3) through physical hardware separation.
*   **Hardware Security Modules (HSM):** Deploying physical, tamper-evident hardware systems designed specifically to protect, manage, and process high-value cryptographic keys.
*   **Trusted Platform Modules (TPM):** Utilizing motherboard microchips to store cryptographic secrets, measure system states via Platform Configuration Registers (PCRs), seal/unseal drive-encryption keys, and integrate with full-disk encryption platforms like BitLocker.
*   **Physical Hardware Attacks (Rowhammer, Spectre, Meltdown, Voltage Glitching):** Exploiting physical hardware flaws to leak memory across security boundaries, including physical charge leakage (Rowhammer), speculative execution flaws (Spectre/Meltdown), and injection of physical electrical spikes (Voltage Glitching).
*   **Hardware Supply Chain Security:** Defending against attacks targeting physical components during manufacturing or transit, including custom malicious firmware implants, counterfeit silicon, and interdiction attacks.
