---
title: "Electrical & Electronic Engineering Syllabus"
date: 2026-08-28
tag: "CURRICULUM"
category: "Electrical Engineering"
summary: "Complete roadmap covering circuit theory, semiconductor physics, digital logic, FPGA design, embedded firmware, PCB layout, and hardware interviews."
---

<div style="background: linear-gradient(135deg, rgba(225, 29, 72, 0.05) 0%, rgba(37, 99, 235, 0.05) 50%, rgba(142, 68, 173, 0.05) 100%); border: 1px solid rgba(225, 29, 72, 0.2); border-left: 5px solid #e11d48; padding: 1.25rem 1.5rem; border-radius: 0 8px 8px 0; margin-bottom: 2rem; box-shadow: 0 4px 14px rgba(225, 29, 72, 0.05);">
    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; font-family: var(--font-mono); font-size: 0.78rem; font-weight: 700; color: #e11d48; letter-spacing: 0.06em; text-transform: uppercase;">
        <span>⚡ Roadmap Specification</span>
    </div>
    <p style="margin: 0; font-size: 1.05rem; line-height: 1.65; color: var(--text-primary); font-weight: 500;">
        A complete, chronological roadmap designed to take engineers from <strong>circuit fundamentals</strong> and <strong>analog semiconductors</strong> to <strong>FPGA digital logic</strong>, <strong>embedded firmware</strong>, <strong>PCB design</strong>, and <strong>hardware engineering interviews</strong>.
    </p>
</div>

---

## MODULE 1: Circuit Analysis & Electrical Bedrock

**Focus:** Establishing mathematical and physical mastery over electrical charge, voltage, current, power, passive component behavior, and SPICE circuit simulation.

### 1.1 Direct Current (DC) Fundamentals
* **Fundamental Laws:** Charge ($Q$), Current ($I$), Voltage ($V$), and Power ($P = IV = I^2R = V^2/R$).
* **Ohm's Law & Resistance:** Resistivity ($\rho$), temperature coefficients, series vs. parallel resistor networks.
* **Kirchhoff's Laws:** Kirchhoff’s Current Law (KCL at nodes) and Kirchhoff’s Voltage Law (KVL in loops).
* **Circuit Analysis Techniques:** Nodal analysis, Mesh (loop) analysis, Superposition theorem.
* **Equivalent Circuits:** Thévenin and Norton equivalent networks, Maximum Power Transfer Theorem.

### 1.2 Reactive Components & Transient Response
* **Capacitors & Electrostatics:** Capacitance ($C = \epsilon A/d$), dielectric materials, charging/discharging equations ($V(t) = V_0(1 - e^{-t/\tau})$), time constant ($\tau = RC$).
* **Inductors & Magnetism:** Inductance ($L$), magnetic flux, Faraday’s Law, energy storage ($E = \frac{1}{2}LI^2$), time constant ($\tau = L/R$).
* **First-Order & Second-Order Circuits:** Transient and steady-state responses of RC, RL, and RLC circuits (Underdamped, Critically Damped, Overdamped).

### 1.3 Alternating Current (AC) Steady-State
* **Sinusoidal Analysis:** Frequency ($f$), angular frequency ($\omega = 2\pi f$), period ($T$), amplitude, and phase shift.
* **Phasors & Complex Impedance:** Converting to the frequency domain ($j\omega$), capacitive impedance ($Z_C = \frac{1}{j\omega C}$), inductive impedance ($Z_L = j\omega L$).
* **AC Power Calculations:** Real power ($P$, Watts), Reactive power ($Q$, VAR), Apparent power ($S$, VA), and Power Factor ($\cos\theta$).
* **Resonance & Quality Factor:** Series and parallel RLC resonant circuits, resonant frequency ($\omega_0 = \frac{1}{\sqrt{LC}}$), bandwidth, and $Q$-factor.

### 1.4 SPICE Circuit Simulation & Verification
* **Simulation Tools:** Industry modeling workflows using **LTspice**, **ngspice**, or **PSpice**.
* **Analysis Directives:** DC operating point (`.op`), DC voltage/current sweep (`.dc`), Transient time-domain response (`.tran`), and AC frequency sweeps (`.ac`).
* **Statistical Modeling:** Monte Carlo tolerance analysis (component parameter variations) and temperature sensitivity sweeping.

---

## MODULE 2: Semiconductor Physics & Analog Electronics

**Focus:** Understanding how silicon solid-state physics enables switching, amplification, and analog signal conditioning.

### 2.1 Semiconductor Physics & Diodes
* **Semiconductor Physics:** Silicon crystal lattices, intrinsic vs. extrinsic semiconductors, N-type and P-type doping, majority and minority carriers.
* **The P-N Junction:** Depletion region, built-in potential barrier, forward and reverse bias characteristics, Shockley diode equation.
* **Diode Topologies:** Half-wave and full-wave rectifiers, bridge rectifiers, capacitive filtering, peak inverse voltage (PIV).
* **Specialized Diodes:** Zener diodes (voltage regulation and avalanche breakdown), Schottky diodes (low forward drop, high-speed switching), LEDs, and photodiodes.

### 2.2 Transistor Amplifiers (BJT & MOSFET)
* **Bipolar Junction Transistors (BJT):** NPN and PNP physics, operational regions (Cutoff, Active, Saturation), current gain ($\beta = I_C/I_B$).
* **BJT Amplifier Configurations:** Common-Emitter, Common-Collector (Emitter Follower), Common-Base, DC biasing and Q-point stability.
* **Field-Effect Transistors (MOSFET):** N-channel and P-channel enhancement/depletion MOSFETs, gate oxide capacitance, threshold voltage ($V_{th}$).
* **MOSFET Operational Modes:** Cutoff, Triode (Linear), and Saturation regions ($I_D = \frac{1}{2}\mu_n C_{ox}\frac{W}{L}(V_{GS} - V_{th})^2$).
* **Small-Signal Modeling:** Transconductance ($g_m$), output resistance ($r_o$), high-frequency parasitic capacitances, and Miller Effect.

### 2.3 Operational Amplifiers (Op-Amps)
* **Ideal Op-Amp Model:** Infinite input impedance, zero output impedance, infinite open-loop gain, virtual short concept.
* **Fundamental Configurations:** Inverting amplifier, non-inverting amplifier, voltage follower (buffer), summing amplifier, difference amplifier.
* **Active Filter Design:** Low-pass, high-pass, band-pass, and notch filters (Butterworth, Chebyshev responses, Sallen-Key topologies).
* **Non-Linear Op-Amp Circuits:** Comparators, Schmitt Triggers (hysteresis), precision rectifiers, and relaxation oscillators.
* **Real-World Non-Idealities:** Input offset voltage, input bias current, slew rate limitations, gain-bandwidth product (GBWP), and common-mode rejection ratio (CMRR).

---

## MODULE 3: Digital Logic & Hardware Architecture

**Focus:** Building discrete computational machines from basic Boolean logic gates up to complete Arithmetic Logic Units (ALUs) and state controllers.

### 3.1 Combinational Logic Design
* **Boolean Algebra & Minimization:** De Morgan’s Laws, canonical Sum-of-Products (SOP) and Product-of-Sums (POS), Karnaugh Maps (K-Maps) up to 6 variables.
* **Logic Families:** CMOS vs. TTL voltage levels, noise margins, fan-in, fan-out, and propagation delay ($t_{pd}$).
* **Building Blocks:** Multiplexers (Mux), Demultiplexers (Demux), Priority Encoders, Decoders, 7-Segment Displays.
* **Arithmetic Units:** Half-adders, full-adders, ripple-carry adders, carry-lookahead adders, 2's complement subtraction, and ALU design.

### 3.2 Sequential Logic & Timing Analysis
* **Memory Primitives:** SR Latches, D-Latches, D Flip-Flops, JK Flip-Flops, and T Flip-Flops (Level-sensitive vs. Edge-triggered).
* **Sequential Circuits:** Shift registers, asynchronous (ripple) counters, synchronous up/down counters, ring counters.
* **Finite State Machines (FSM):** Mealy vs. Moore machines, state transition diagrams, state assignment, next-state logic, and output logic.
* **Timing & Clocking Constraints:** Setup time ($t_{su}$), hold time ($t_h$), clock-to-Q delay ($t_{cq}$), clock skew, and clock jitter.
* **Metastability:** Asynchronous inputs, synchronizer chains, and Mean Time Between Failures (MTBF).

---

## MODULE 4: Hardware Description Languages (HDL) & FPGA Design

**Focus:** Programming physical silicon using Verilog/SystemVerilog, synthesizing register-transfer level (RTL) logic, and implementing hardware on FPGAs.

### 4.1 Verilog & SystemVerilog for RTL Synthesis
* **Structural vs. Behavioral HDL:** Continuous assignments (`assign`), procedural blocks (`always @(*)`, `always_ff @(posedge clk)`), blocking (`=`) vs. non-blocking (`<=`) assignments.
* **RTL Modeling:** Designing parameterizable shift registers, FIFOs, arbiters, memory controllers, and FSMs in synthesizable Verilog.
* **Verification & Testbenches:** Generating clock signals, applying stimulus vectors, assertions (`assert`), self-checking testbenches, and simulation waveforms.

### 4.2 FPGA Architecture & Synthesis
* **Silicon Architecture:** Look-Up Tables (LUTs), Configurable Logic Blocks (CLBs), Flip-Flops, Block RAM (BRAM), Digital Signal Processing (DSP) slices.
* **Synthesis & Implementation Flow:** Logic Synthesis $\rightarrow$ Translation $\rightarrow$ Mapping $\rightarrow$ Place & Route (P&R) $\rightarrow$ Bitstream generation.
* **Static Timing Analysis (STA):** Timing constraints (SDC/XDC), timing closure, setup/hold slack calculation, critical path optimization.
* **Clock Domain Crossing (CDC):** Multi-clock designs, dual-port asynchronous FIFOs, handshaking protocols, and gray code counters.

---

## MODULE 5: Microcontrollers & Embedded Systems Engineering

**Focus:** Writing bare-metal C firmware, driving hardware peripherals, and managing real-time scheduling on modern microcontrollers.

### 5.1 Microcontroller Architecture & Memory
* **Processor Core:** ARM Cortex-M architecture (M0, M4 with FPU, M7), register set (R0-R15), Program Counter (PC), Link Register (LR), Stack Pointer (SP).
* **Memory Map & Memory-Mapped I/O:** Flash memory, SRAM, peripheral registers, bit-banding, vector table, and bootloaders.
* **Bare-Metal Programming:** Direct register manipulation in C, memory-mapped pointers, bitwise masking, volatile keyword, and writing custom startup files and Linker Scripts (`.ld`).

### 5.2 Hardware Communication Protocols
* **UART:** Asynchronous serial, baud rate calculation, framing, parity, FIFO buffering, and RS-232/RS-485 physical layer transceivers.
* **SPI (Serial Peripheral Interface):** Synchronous full-duplex, Master/Slave modes, clock polarity/phase (CPOL/CPHA), chip-select routing.
* **I2C (Inter-Integrated Circuit):** 2-wire synchronous bus, open-drain outputs with pull-up resistors, 7-bit/10-bit addressing, clock stretching, arbitration.
* **CAN Bus (Controller Area Network):** Differential signaling (CAN-H/CAN-L), dominant/recessive bit arbitration, message frames, CRC checks, termination resistors (120$\Omega$).

### 5.3 Peripherals & Real-Time Scheduling
* **Timers & PWM:** General-purpose timers, input capture (frequency/pulse measurement), output compare, Pulse Width Modulation (PWM) for motor and power control.
* **Analog Interfacing:** Analog-to-Digital Converters (ADC: SAR vs. Delta-Sigma, sampling rate, resolution, reference voltage, anti-aliasing filters), Digital-to-Analog Converters (DAC).
* **Direct Memory Access (DMA):** Offloading CPU processing for high-throughput peripheral-to-memory data transfers.
* **Real-Time Operating Systems (RTOS):** FreeRTOS kernel, task scheduling (Preemptive vs. Cooperative), priority inversion, mutexes, semaphores, message queues, and context switching.

---

## MODULE 6: Signals, Systems, & Digital Signal Processing (DSP)

**Focus:** Transforming physical analog signals into digital streams, filtering noise, and analyzing systems in frequency and time domains.

### 6.1 Linear Time-Invariant (LTI) Systems
* **Signal Classification:** Continuous-time vs. discrete-time, periodic vs. aperiodic, energy vs. power signals.
* **LTI System Properties:** Linearity, Time-Invariance, Causality, BIBO Stability (Bounded-Input Bounded-Output).
* **Convolution:** Impulse response ($h[n]$), continuous convolution integral, discrete convolution sum, and system response calculation.

### 6.2 Transform Domain Analysis
* **Fourier Analysis:** Continuous-Time Fourier Transform (CTFT), Discrete-Time Fourier Transform (DTFT), Discrete Fourier Transform (DFT), Fast Fourier Transform (FFT) algorithms.
* **Laplace & Z-Transforms:** Region of Convergence (ROC), pole-zero plots, stability analysis on the s-plane and z-plane ($|z| \le 1$).

### 6.3 Digital Filtering & Sampling Theory
* **Nyquist-Shannon Sampling Theorem:** Minimum sampling rate ($f_s \ge 2f_{max}$), spectral replication, aliasing prevention, and reconstruction filters.
* **Digital Filter Design:** Finite Impulse Response (FIR: linear phase, always stable) vs. Infinite Impulse Response (IIR: lower order, phase distortion, feedback stability analysis).
* **Quantization & Dynamic Range:** ADC quantization noise, Signal-to-Quantization-Noise Ratio (SQNR), Effective Number of Bits (ENOB).

---

## MODULE 7: Printed Circuit Board (PCB) Design & Manufacturing

**Focus:** Transforming electrical schematics into physical, production-ready multi-layer circuit boards that pass electromagnetic compatibility tests.

### 7.1 Schematic Capture & Component Selection
* **CAD Tools:** Industry workflows in **KiCad**, **Altium Designer**, or **Cadence OrCAD**.
* **Schematic Rules:** Hierarchical schematics, net labeling, power rails, active decoupling, ESD protection diodes, and component derating.
* **Component Packaging:** SMT (Surface Mount Technology: 0402, 0603, QFP, QFN, BGA) vs. THT (Through-Hole Technology).

### 7.2 Multi-Layer PCB Layout & High-Speed Routing
* **Layer Stackup:** 2-layer, 4-layer, and 6-layer stackups (Signal, Ground Plane, Power Plane).
* **Grounding Strategies:** Solid reference planes, split analog/digital grounds, star grounding, and ground bounce prevention.
* **High-Speed Signal Integrity:** Controlled impedance routing (50$\Omega$ single-ended, 90/100$\Omega$ differential pairs for USB/Ethernet), length matching, via count minimization, return path continuity.
* **Electromagnetic Compatibility (EMC/EMI):** Decoupling loop area reduction, stitching vias, shielding cans, Ferrite beads, and passing FCC/CE certification tests.
* **Design for Manufacturing (DFM/DFA):** Trace width/spacing clearance, annular rings, solder mask dam, drill sizes, pick-and-place files, and Gerber generation.

---

## MODULE 8: Power Electronics, Battery Systems, & RF Engineering

**Focus:** High-power energy conversion, Battery Management Systems (BMS), motor control, and high-frequency wireless electromagnetic wave propagation.

### 8.1 Power Electronics, Battery Management, & Thermal Systems
* **Linear Regulators:** Low-Dropout (LDO) regulators, power dissipation ($P_{diss} = (V_{in} - V_{out})I_{load}$), thermal resistance ($\theta_{JA}, \theta_{JC}$), heat-sink sizing.
* **Switch-Mode Power Supplies (SMPS):** Buck converters (step-down), Boost converters (step-up), Buck-Boost topologies, and synchronous rectification (replacing freewheeling diodes with low-$R_{DS(on)}$ MOSFETs for $>95\%$ efficiency).
* **Battery Management Systems (BMS):** Lithium-Ion / LFP chemistry, cell monitoring, active vs. passive cell balancing, over/under-voltage cutoffs, Coulomb counting, and State-of-Charge (SoC) / State-of-Health (SoH) algorithms.
* **Thermal Design & Heat Dissipation:** Thermal relief vias, ground plane copper heat spreading, junction temperature limits ($T_J$), and thermal throttling circuits.
* **Motor Control:** Driving DC motors, Stepper motors, and Brushless DC (BLDC) motors using 3-phase inverter bridges, MOSFET gate drivers, and Field-Oriented Control (FOC).

### 8.2 Electromagnetics & RF Engineering
* **Transmission Lines:** Characteristic impedance ($Z_0 = \sqrt{L/C}$), wave propagation velocity, reflection coefficient ($\Gamma$), Voltage Standing Wave Ratio (VSWR).
* **Smith Charts & Impedance Matching:** $L$-networks, quarter-wave transformers, and tuning stubs for maximum power transfer.
* **Antenna Principles:** Dipoles, patch antennas, radiation patterns, gain ($dBi$), directivity, polarization, and Link Budget calculations.

### 8.3 The Three Flagship Hardware Projects (Proof of Work)
1. **Project 1 (Embedded Systems & 4-Layer PCB):** A custom **ARM Cortex-M (STM32) IoT Telemetry Board** designed from scratch in KiCad, featuring USB-C Power Delivery, I2C/SPI sensor arrays, low-power sleep modes, and a 4-layer controlled-impedance PCB layout.
2. **Project 2 (FPGA & Digital Signal Processing):** A **Real-Time Verilog Audio Synthesizer or Video Pipeline** synthesized on a Xilinx Artix-7 FPGA, featuring I2S audio DAC communication, clock domain crossing (CDC), and verified with self-checking testbenches.
3. **Project 3 (Power Electronics & Closed-Loop Control):** A high-efficiency **Synchronous Buck Converter (12V to 3.3V/5A)** with closed-loop voltage feedback, current-mode control, thermal dissipation simulation in LTspice, and $>95\%$ measured conversion efficiency.

---

## MODULE 9: THE HARDWARE ENGINEERING INTERVIEW PLAYBOOK

**Focus:** Passing Tier-1 hardware whiteboarding rounds, bench testing examinations, and public sector engineering licensure.

### 9.1 Whiteboard Circuit & Schematic Analysis
* **Quick Estimations:** Back-of-the-envelope calculations for RC time constants, voltage divider loading, transistor bias points, and power dissipation without a calculator.
* **Troubleshooting Scenarios:** Debugging erratic microcontroller resets, ringing on clock lines, thermal throttling, latch-up, and floating inputs.
* **Signal Integrity Review:** Identifying missing decoupling capacitors, broken ground return loops, and inductive spikes on inductive loads (flyback diodes).

### 9.2 Live Bench Instrument Mastery
* **Digital Storage Oscilloscope (DSO):** Triggering modes (Edge, Pulse, Video, I2C/SPI decode), bandwidth limitations, probe loading (1X vs. 10X attenuation, capacitive loading).
* **Logic Analyzers & Protocol Sniffers:** Capturing timing glitches, bus contention on I2C/CAN lines, state decoding.
* **Multimeters & Power Supplies:** 4-wire Kelvin resistance measurements, constant-current vs. constant-voltage modes, burden voltage.
* **Spectrum Analyzers:** Frequency domain analysis, harmonic distortion, noise floor, and EMC pre-compliance scanning.

### 9.3 Licensure, Public Utilities, & Defense Navigation
* **Licensure Roadmap:** NCEES Fundamentals of Engineering (**FE Electrical & Computer Exam**) $\rightarrow$ Engineer in Training (EIT) $\rightarrow$ Principles and Practice of Engineering (**PE License**).
* **Industry Standards:** IEEE standards, IPC-A-610 (soldering/assembly acceptability), ISO 26262 (automotive functional safety), MIL-STD testing for defense hardware.
* **Clearances & Defense:** Navigating SF-86 security clearance protocols for DoD hardware contractor roles (Lockheed, Northrop, Raytheon).

---

## THE 3 DAILY EXECUTION RULES

*(To enforce this curriculum without burning out)*

1. **Build on the Bench Daily:** Breadboards, soldering irons, and oscilloscope probes teach what textbooks cannot. Build, measure, and burn a transistor or two to understand limits.
2. **Read Component Datasheets:** Stop guessing pinouts and electrical ratings. Read the full manufacturer datasheet (Absolute Maximum Ratings, electrical characteristics curves, application circuits).
3. **Trace Every Return Current:** Voltage is relative, and current always returns to its source. Whenever you draw or route a trace, always mentally trace where the return current flows through the ground plane.
