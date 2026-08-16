# 🎭 Social Engineering: The Art of Human Hacking (49 Master Topics)

Welcome to the **Comprehensive Social Engineering Master Study Companion**. This guide breaks down all 49 core topics spanning open-source intelligence (OSINT) reconnaissance, phishing variants, vishing & AI voice cloning, physical on-site penetration testing, human psychological manipulation levers, and enterprise defensive countermeasures.

---

## 📑 Table of Contents

- [Category 1: Reconnaissance & Target Profiling (The Setup Phase)](#category-1-reconnaissance-target-profiling-the-setup-phase)
- [Category 2: Digital & Text-Based Deception (Phishing Variants)](#category-2-digital-text-based-deception-phishing-variants)
- [Category 3: Vocal, Visual, & Interpersonal Deception (Vishing & Pretexting)](#category-3-vocal-visual-interpersonal-deception-vishing-pretexting)
- [Category 4: Physical Deception & Access (The On-Site Element)](#category-4-physical-deception-access-the-on-site-element)
- [Category 5: Technological Exploitation of Human Behavior](#category-5-technological-exploitation-of-human-behavior)
- [Category 6: Advanced Phishing Delivery & Technical Infrastructure](#category-6-advanced-phishing-delivery-technical-infrastructure)
- [Category 7: The Psychological Triggers (The "Why" It Works)](#category-7-the-psychological-triggers-the-why-it-works)
- [Category 8: Defensive Countermeasures & Phishing Resilience](#category-8-defensive-countermeasures-phishing-resilience)

---

> **Overview:** A comprehensive master reference index detailing the human element of security breaches—covering OSINT target profiling, digital phishing variants, voice/video vishing & AI voice cloning, physical tailgating & badges, MFA fatigue push bombing, AiTM reverse proxies (Evilginx2), domain homograph spoofing, core psychological influence levers, and FIDO2/DMARC defensive countermeasures.


## 🧠 Category 1: Reconnaissance & Target Profiling (The Setup Phase)

- **`1.1 Social Media Profiling (OSINT)`**: Scraping LinkedIn, X, Facebook, and Instagram to map corporate hierarchies, identify new hires (who are more vulnerable), and learn personal hobbies used to build rapport.
- **`1.2 Out-of-Office (OOO) Harvesting`**: Sending benign emails just to trigger automated OOO replies, which often reveal internal org structures, alternate contact numbers, and the names of covering managers.
- **`1.3 Elicitation`**: The subtle art of extracting sensitive information through casual, seemingly innocent conversation (often done at industry conferences, bars, or networking events) without the target realizing they are being interrogated.

## 🧠 Category 2: Digital & Text-Based Deception (Phishing Variants)

- **`2.1 Mass Phishing`**: Broad, untargeted emails sent to thousands of users relying on a numbers game (e.g., "Your Amazon package is delayed").
- **`2.2 Spear-Phishing`**: Highly targeted emails crafted for a specific individual, utilizing OSINT to reference real projects, coworkers, or recent events.
- **`2.3 Whaling`**: Spear-phishing aimed exclusively at high-value targets (C-Suite, CEOs, CFOs) who have the authority to bypass standard security controls.
- **`2.4 Smishing (SMS Phishing)`**: Utilizing text messages, often exploiting the fact that mobile users cannot hover over a link to preview the URL before clicking.
- **`2.5 Business Email Compromise (BEC) & CEO Fraud`**: Hijacking or spoofing an executive's email account to instruct HR or Finance to urgently reroute payroll or wire money to a fraudulent vendor.
- **`2.6 Vendor Email Compromise (VEC) & Thread Hijacking`**: Compromising trusted third-party vendor supply chains and injecting fraudulent payment instructions into active email threads.
- **`2.7 Callback Phishing (TOAD)`**: Telephone-Oriented Attack Delivery sending clean, linkless invoice emails that lure victims into calling an attacker-controlled support hotline.
- **`2.8 Quishing (QR Code Phishing)`**: Bypassing email security filters by embedding a malicious QR code in a physical letter, PDF, or email, tricking the user into scanning it with their personal mobile device.
- **`2.9 Angler Phishing`**: Setting up fake "Customer Support" accounts on social media. When a target complains about a bank or service online, the attacker replies posing as support to steal their credentials.
- **`2.10 OAuth & Consent Phishing`**: Tricking the user into clicking "Accept" on a legitimate-looking Microsoft or Google app permission screen, granting the attacker's app persistent API access without stealing passwords.

## 🧠 Category 3: Vocal, Visual, & Interpersonal Deception (Vishing & Pretexting)

- **`3.1 Vishing (Voice Phishing)`**: Calling a target and using a fabricated scenario to extract credentials or force an action over the phone.
- **`3.2 Pretexting`**: The foundational skill of Vishing; fabricating a highly detailed, believable scenario (the pretext) and a specific persona (e.g., "I am Microsoft Tier 3 Support calling about anomalous traffic").
- **`3.3 Help Desk Vishing & IT Support Impersonation`**: Posing as an employee needing password or MFA resets to manipulate corporate IT service desks into granting unauthorized account access.
- **`3.4 Automated OTP Voice Bots & IVR Phishing`**: Utilizing automated voice bots and Interactive Voice Response menus to trick victims into entering one-time verification passwords.
- **`3.5 Reverse Social Engineering`**: The attacker secretly sabotages the victim's equipment or network, and then advertises themselves as the support person. The victim reaches out to the attacker, bypassing initial suspicion.
- **`3.6 Deepfakes & AI Voice Cloning (Vishing 2.0)`**: Utilizing AI to clone the exact voice—and recently, real-time video via Zoom/Teams—of a CEO, manager, or family member to authorize a fraudulent wire transfer or bypass biometric voice checks.
- **`3.7 Honeytraps & Romance Scams`**: Creating fake profiles to build a romantic or highly lucrative relationship over weeks or months, eventually leveraging it for blackmail, corporate espionage, or financial theft.

## 🧠 Category 4: Physical Deception & Access (The On-Site Element)

- **`4.1 Tailgating & Piggybacking`**: Following an authorized employee through a secure door. (Tailgating implies without knowledge; Piggybacking implies with consent, e.g., "I forgot my badge, can you let me in?").
- **`4.2 Physical Impersonation`**: Donning uniforms and forged badges to walk past security. Common disguises include FedEx/UPS drivers, HVAC repairmen, fire inspectors, or construction workers carrying a ladder (the "ladder rule").
- **`4.3 Rogue Hardware Drop Boxes & Evil Maid Attacks`**: Planting physical covert hardware implants (Raspberry Pi drop boxes, rogue network bridges) directly into corporate facilities.
- **`4.4 Baiting Campaigns`**: Leaving compromised physical hardware (e.g., Rubber Ducky USBs, O.MG charging cables) in company parking lots or breakrooms, relying on human curiosity to plug them in.
- **`4.5 Shoulder Surfing`**: Observing a target type in their password or PIN. This can be done closely in a coffee shop, or from a distance using binoculars, telephoto lenses, or hidden cameras pointed at keypads.
- **`4.6 Dumpster Diving`**: Searching through corporate trash or recycling bins to find improperly disposed organizational charts, sticky notes with passwords, or printed sensitive emails.
- **`4.7 Diversion Theft`**: Creating a distraction or pretext to misdirect a courier, delivery driver, or mail clerk into handing over secure packages to the attacker.

## 🧠 Category 5: Technological Exploitation of Human Behavior

- **`5.1 MFA Fatigue (Push Bombing)`**: Spamming a user's phone with Multi-Factor Authentication approval requests at 3:00 AM. The attacker relies on the user getting annoyed, tired, or cognitively overloaded and pressing "Approve" just to make it stop.
- **`5.2 Scareware & Fake Antivirus`**: Web pop-ups that lock the browser, play loud sirens, and claim the computer is infected with child pornography or severe malware, providing an urgent phone number to call for "tech support."
- **`5.3 SEO Poisoning & Malvertising`**: Buying Google Ads or manipulating search rankings so that when a user searches for "Download Zoom" or "IT Support," the very first link they click is malicious.
- **`5.4 LLM-Driven Spear Phishing`**: Leveraging Generative AI (LLMs) to automatically synthesize thousands of highly personalized, context-aware emails with zero grammatical errors across multiple languages.

## 🧠 Category 6: Advanced Phishing Delivery & Technical Infrastructure

- **`6.1 Adversary-in-the-Middle (AiTM) Reverse Proxies`**: Deploying proxy tools (e.g., Evilginx2, Modlishka) that relay authentication requests between the victim and legitimate login portals. Captures both passwords and active Session Tokens / Cookies, completely defeating traditional 2FA/TOTP.
- **`6.2 Domain Homograph & Punycode Attacks`**: Registering domains using visually identical Internationalized Domain Name (IDN) Cyrillic characters (e.g., google.com using Cyrillic o) to bypass visual scrutiny.
- **`6.3 Typosquatting & Combosquatting`**: Registering common typos (paypa1.com) or plausible domain variations (paypal-security-update.com) to host phishing portals.
- **`6.4 Watering Hole Attacks`**: Compromising a legitimate third-party website frequently visited by a targeted group (e.g., industry news forums) to secretly drop credential harvesters or browser exploits.

## 🧠 Category 7: The Psychological Triggers (The "Why" It Works)

- **`7.1 Authority`**: Humans are socially conditioned to obey authority figures (Police, Executives, Auditors, IT Directors).
- **`7.2 Urgency & Fear`**: Forcing the target into a panic state (e.g., "Your account will be deleted in 5 minutes"). Panic shuts down the logical, critical-thinking parts of the brain.
- **`7.3 Scarcity & FOMO`**: Creating a false limitation (e.g., "Only the first 10 employees to log in get a bonus").
- **`7.4 Liking & Reciprocity`**: Being overly friendly, or doing the target a small favor so they feel socially obligated to do a favor in return (e.g., holding a heavy box for someone so they feel bad shutting the secure door in your face).
- **`7.5 Social Proof (Consensus)`**: Convincing the target that everyone else is already doing it (e.g., "The rest of your department has already migrated their accounts using this link").
- **`7.6 Commitment & Consistency`**: Asking the target for a tiny, harmless favor first. Once they say "yes" to a small thing, they are psychologically much more likely to say "yes" to the big, dangerous request later.
- **`7.7 Coercion & Extortion (Insider Threat)`**: When deception fails, leveraging discovered secrets, gambling debts, or physical threats to force a legitimate employee to act maliciously on the attacker's behalf.

## 🧠 Category 8: Defensive Countermeasures & Phishing Resilience

- **`8.1 Phishing-Resistant MFA (FIDO2 & WebAuthn)`**: Hardware keys (YubiKey) and passkeys that cryptographically bind authentication to the browser's origin domain, rendering AiTM reverse proxy attacks completely ineffective.
- **`8.2 Email Authentication Triad (SPF, DKIM, DMARC)`**: Enforcing Sender Policy Framework (SPF), DomainKeys Identified Mail (DKIM), and DMARC with a strict p=reject policy to stop domain spoofing.
- **`8.3 Number Matching & Conditional Access`**: Eliminating MFA Push Bombing by requiring users to enter a 2-digit number displayed on screen into their authenticator app before granting session access.
- **`8.4 Help Desk Verification Protocols & Out-of-Band Validation`**: Establishing strict multi-channel verification, manager callbacks, and video identity checks for password and MFA resets.
- **`8.5 One-Click Phishing Reporting & Automated SOAR Triage`**: Integrating email reporting buttons into client mail applications for instant automated sandbox analysis, user feedback, and domain blocking.
- **`8.6 Physical Access Controls & Escort Policies`**: Badge turnstiles, mandatory visitor escorts, secure document shredding bins, and strict clean-desk policies.
- **`8.7 Security Awareness Culture & Blameless Incident Reporting`**: Fostering an organizational culture of continuous training, positive reinforcement, and blameless reporting to encourage rapid threat escalation.