---
layout: single
title: "Cryptography Basics"
chapter_num: "06"
summary: "Cryptographic History & Principles, Symmetric Encryption (Block vs. Stream Ciphers), Asymmetric Encryption (RSA & ECC), Hashing Algorithms (MD5 & SHA-256)"
---

*   **Cryptographic History & Principles:** Tracing the evolution of secure communications from early substitution ciphers and the Enigma machine to Kerckhoffs's Principle, which dictates that a system's security must reside entirely in the secrecy of the key rather than the algorithm.
*   **Symmetric Encryption (Block vs. Stream Ciphers):** Securing data using a single shared key, comparing block-by-block processing with continuous stream-based bitwise encryption, and deploying algorithms like AES, DES, and 3DES under various modes (ECB vs. CBC/GCM).
*   **Asymmetric Encryption (RSA & ECC):** Securing data using mathematically linked key pairs, examining prime factorization mathematics (RSA), utilizing Elliptic Curve Cryptography (ECC) for faster, low-power encryption, and establishing public/private key dynamics.
*   **Hashing Algorithms (MD5 & SHA-256):** Generating fixed-length cryptographic fingerprints from arbitrary input data to prove integrity, focusing on one-way mathematical processing and resistance to collision attacks.
*   **Password Cryptography (Salting, Peppering, Bcrypt):** Securing credentials by appending random unique values (Salting) and static secrets (Peppering) before hashing, utilizing computationally expensive algorithms like Bcrypt and PBKDF2 to resist automated dictionary and Rainbow Table cracking attacks.
*   **Digital Signatures & Non-Repudiation:** Binding a cryptographic identity to a document or transmission using private keys to mathematically prove both the integrity of the data and the authenticity of the sender, ensuring non-repudiation.
*   **Key Exchange Mathematics (Diffie-Hellman):** Establishing a secure shared symmetric key over a public, unsecure channel using discrete logarithm mathematics, and implementing Perfect Forward Secrecy (PFS) to protect past sessions from future key compromises.
*   **Public Key Infrastructure (PKI):** Designing the hierarchical trust model that issues and manages digital certificates, organizing Root Certificate Authorities (CAs), Subordinate/Intermediate CAs, and validating structured X.509 certificates.
*   **Certificate Lifecycles & Revocation:** Managing certificates from creation to decommissioning, processing Certificate Signing Requests (CSRs), tracking expirations, and querying revocation statuses via Certificate Revocation Lists (CRLs) and Online Certificate Status Protocol (OCSP).
*   **The TLS Handshake Protocol:** Securing web transport step-by-step, negotiating cipher suites, conducting mutual authentication, and exchanging cryptographic keys to protect raw TCP traffic.
*   **Security for Data States (At Rest, In Transit, In Use):** Securing data across different phases: protecting stored files (At Rest), encrypting data over networks (In Transit), and securing active processing memory using hardware-isolated enclaves (Data in Use / Confidential Computing).
*   **Steganography:** Concealing sensitive data or malicious payloads within benign media files, including Least Significant Bit (LSB) substitution in images, or hiding streams inside audio and video containers.
*   **Post-Quantum Cryptography (PQC):** Preparing systems to resist quantum computing threats (such as Shor's Algorithm breaking RSA/ECC) by designing and implementing quantum-resistant mathematical frameworks like lattice-based cryptography.
*   **FIPS Compliance Standards:** Understanding Federal Information Processing Standards (such as FIPS 140-2 and FIPS 140-3) to validate cryptographic module configurations and align with public sector security mandates.
