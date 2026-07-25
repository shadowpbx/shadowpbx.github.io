---
title: "Social Engineering"
date: "2026.07.24"
tags: ["STUDY", "SOCIAL ENGINEERING"]
summary: "A comprehensive master reference index covering OSINT target profiling, digital phishing variants, vishing & pretexting, physical security bypasses, MFA fatigue, and psychological triggers."
---

<div style="background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border-left: 4px solid #e11d48; padding: 1.25rem 1.5rem; border-radius: 0 8px 8px 0; margin-bottom: 2rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
    <p style="margin: 0; font-size: 1.05rem; line-height: 1.6; color: #334155; font-style: italic; font-weight: 500;">
        <strong>Purpose:</strong> A master reference index detailing the human element of security breaches—covering OSINT target profiling, digital phishing variants (Spear-phishing, Whaling, Quishing, OAuth consent hijacking), voice/video vishing & AI voice cloning, physical tailgating & badges, MFA fatigue push bombing, and core psychological influence levers.
    </p>
</div>

---

## 1. Reconnaissance & Target Profiling (The Setup Phase)
*Before an attacker makes contact, they manipulate public information to build the perfect trap.*

*   **Social Media Profiling (OSINT)** — Scraping LinkedIn, X, Facebook, and Instagram to map corporate hierarchies, identify new hires (who are more vulnerable), and learn personal hobbies used to build rapport.
*   **Out-of-Office (OOO) Harvesting** — Sending benign emails just to trigger automated OOO replies, which often reveal internal org structures, alternate contact numbers, and the names of covering managers.
*   **Elicitation** — The subtle art of extracting sensitive information through casual, seemingly innocent conversation (often done at industry conferences, bars, or networking events) without the target realizing they are being interrogated.

---

## 2. Digital & Text-Based Deception (Phishing Variants)
*Manipulating the target via written communication and deceptive links.*

*   **Phishing / Mass Phishing** — Broad, untargeted emails sent to thousands of users relying on a numbers game (e.g., *"Your Amazon package is delayed"*).
*   **Spear-Phishing** — Highly targeted emails crafted for a specific individual, utilizing OSINT to reference real projects, coworkers, or recent events.
*   **Whaling** — Spear-phishing aimed exclusively at high-value targets (C-Suite, CEOs, CFOs) who have the authority to bypass standard security controls.
*   **Smishing (SMS Phishing)** — Utilizing text messages, often exploiting the fact that mobile users cannot hover over a link to preview the URL before clicking.
*   **Business Email Compromise (BEC) / CEO Fraud** — Hijacking or spoofing an executive's email account to instruct HR or Finance to urgently reroute payroll or wire money to a fraudulent vendor.
*   **Quishing (QR Code Phishing)** — Bypassing email security filters by embedding a malicious QR code in a physical letter, PDF, or email, tricking the user into scanning it with their personal mobile device.
*   **Angler Phishing** — Setting up fake *"Customer Support"* accounts on social media. When a target complains about a bank or service online, the attacker replies posing as support to steal their credentials.
*   **OAuth / Consent Phishing** — Tricking the user into clicking *"Accept"* on a legitimate-looking Microsoft or Google app permission screen. The attacker doesn't steal the password; the user legally grants the attacker's app access to their inbox.

---

## 3. Vocal, Visual, & Interpersonal Deception (Vishing & Pretexting)
*Manipulating the target in real-time using voice, video, or crafted scenarios.*

*   **Vishing (Voice Phishing)** — Calling a target and using a fabricated scenario to extract credentials or force an action over the phone.
*   **Pretexting** — The foundational skill of Vishing; fabricating a highly detailed, believable scenario (the pretext) and a specific persona (e.g., *"I am Microsoft Tier 3 Support calling about anomalous traffic"*).
*   **Reverse Social Engineering** — The attacker secretly sabotages the victim's equipment or network, and then advertises themselves as the support person. The victim reaches out *to the attacker*, bypassing initial suspicion.
*   **Deepfakes & AI Voice Cloning (Vishing 2.0)** — Utilizing AI to clone the exact voice—and recently, real-time video via Zoom/Teams—of a CEO, manager, or family member to authorize a fraudulent wire transfer or bypass biometric voice checks.
*   **Honeytraps / Romance Scams** — Creating fake profiles to build a romantic or highly lucrative relationship over weeks or months, eventually leveraging it for blackmail, corporate espionage, or financial theft.

---

## 4. Physical Deception & Access (The On-Site Element)
*Manipulating the physical environment or exploiting human politeness to breach a facility.*

*   **Tailgating & Piggybacking** — Following an authorized employee through a secure door. (Tailgating usually implies without their knowledge; Piggybacking implies with their consent, e.g., *"I forgot my badge, can you let me in?"*).
*   **Physical Impersonation** — Donning uniforms and forged badges to walk past security. Common disguises include FedEx/UPS drivers, HVAC repairmen, fire inspectors, or construction workers carrying a ladder (the *"ladder rule"*).
*   **Baiting Campaigns** — Leaving compromised physical hardware (e.g., Rubber Ducky USBs, O.MG charging cables) in company parking lots or breakrooms, relying on human curiosity to plug them in.
*   **Shoulder Surfing** — Observing a target type in their password or PIN. This can be done closely in a coffee shop, or from a distance using binoculars, telephoto lenses, or hidden cameras pointed at keypads.
*   **Dumpster Diving** — Searching through corporate trash or recycling bins to find improperly disposed organizational charts, sticky notes with passwords, or printed sensitive emails.
*   **Diversion Theft** — Creating a distraction or pretext to misdirect a courier, delivery driver, or mail clerk into handing over secure packages to the attacker.

---

## 5. Technological Exploitation of Human Behavior
*Where attackers use tech to wear down the human psyche.*

*   **MFA Fatigue (Push Bombing)** — Spamming a user's phone with Multi-Factor Authentication approval requests at 3:00 AM. The attacker relies on the user getting annoyed, tired, or cognitively overloaded and pressing *"Approve"* just to make it stop.
*   **Scareware / Fake AV** — Web pop-ups that lock the browser, play loud sirens, and claim the computer is infected with child pornography or severe malware, providing an urgent phone number to call for *"tech support."*
*   **SEO Poisoning / Malvertising** — Buying Google Ads or manipulating search rankings so that when a user searches for *"Download Zoom"* or *"IT Support,"* the very first link they click is malicious.

---

## 6. The Psychological Triggers (The "Why" It Works)
*Every single attack listed above relies on pulling one or more of these core psychological levers.*

*   **Authority** — Humans are socially conditioned to obey authority figures (Police, Executives, Auditors, IT Directors).
*   **Urgency & Fear** — Forcing the target into a panic state (e.g., *"Your account will be deleted in 5 minutes"*). Panic shuts down the logical, critical-thinking parts of the brain.
*   **Scarcity (FOMO)** — Creating a false limitation (e.g., *"Only the first 10 employees to log in get a bonus"*).
*   **Liking & Reciprocity** — Being overly friendly, or doing the target a small favor so they feel socially obligated to do a favor in return (e.g., holding a heavy box for someone so they feel bad shutting the secure door in your face).
*   **Social Proof (Consensus)** — Convincing the target that everyone else is already doing it (e.g., *"The rest of your department has already migrated their accounts using this link"*).
*   **Commitment & Consistency** — Asking the target for a tiny, harmless favor first. Once they say *"yes"* to a small thing, they are psychologically much more likely to say *"yes"* to the big, dangerous request later. 
*   **Coercion & Extortion (Insider Threat)** — When deception fails, leveraging discovered secrets, gambling debts, or physical threats to force a legitimate employee to act maliciously on the attacker's behalf.
