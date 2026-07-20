---
layout: single
title: "Chapter 12: Application Security (Web, Mobile, API)"
chapter_num: "12"
summary: "Web Proxies & Traffic Interception (Burp Suite, OWASP ZAP), Web Session Management Security, OWASP Web Top 10 - Injection Attacks, OWASP Web Top 10 - Cross-S..."
---

*   **Web Proxies & Traffic Interception (Burp Suite, OWASP ZAP):** Setting up and configuring localized intercepting proxies to capture, analyze, modify, and replay HTTP request/response streams between clients and target servers.
*   **Web Session Management Security:** Analyzing how state is maintained on the web, securing session cookies using `HTTPOnly` and `Secure` attributes, and mitigating attacks like Session Fixation and Cross-Site Request Forgery (CSRF).
*   **OWASP Web Top 10 - Injection Attacks:** Exploiting input validation flaws to run backend commands, comparing in-band, blind, and time-based SQL Injection (SQLi) techniques to manipulate database queries, and executing Command Injection to trigger operating system commands.
*   **OWASP Web Top 10 - Cross-Site Scripting (XSS):** Injecting malicious script payloads to execute within a victim's web browser, comparing Stored XSS (persistent in backend storage), Reflected XSS (immediate reflection of untrusted input), and DOM-based XSS (client-side execution logic).
*   **OWASP Web Top 10 - Logical & Contextual Flaws:** Exploiting broken authorization boundaries using Insecure Direct Object References (IDOR/BOLA), leveraging Server-Side Request Forgery (SSRF) to force servers to query internal systems, and executing XML External Entity (XXE) processing to read files or pivot networks.
*   **API Architecture & Gateways (REST, GraphQL):** Auditing communication pipelines, comparing stateless JSON-based RESTful APIs with queryable GraphQL endpoints, and analyzing how API Gateways throttle and secure data access.
*   **API Exploitation (BOLA, Mass Assignment, JWT Cracking):** Bypassing API security controls, manipulating parameters to access unauthorized objects (Broken Object Level Authorization), injecting unauthorized parameters (Mass Assignment), and cracking, forging, or tampering with JSON Web Token (JWT) cryptographic signatures.
*   **Mobile Application Architecture:** Contrasting mobile operating system design, analyzing the iOS security architecture, filesystem layouts, and sandboxing (Darwin/XNU kernel), with the Android security framework (Dalvik Virtual Machine and Android Runtime).
*   **Mobile Application Exploitation:** Bypassing security controls by decompiling and reverse engineering compiled APK and IPA packages, identifying hardcoded API keys and credentials, and injecting hooks to bypass certificate pinning and root/jailbreak detection.
