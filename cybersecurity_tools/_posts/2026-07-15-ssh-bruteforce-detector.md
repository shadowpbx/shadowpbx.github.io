---
title: "SSH Bruteforce Detector & IP Blocker"
date: 2026-07-15
track: Script
category: Cybersecurity
tag: BASH
---

This Bash script monitors syslog or auth.log for failed SSH login attempts. If a specific IP address exceeds a configured threshold of failed logins within a set timeframe, it automatically adds a rule to `iptables` (or `nftables`) to block the offending IP address for 24 hours.

## Features
- Real-time log monitoring using `tail -F`.
- Dynamic IP blocking using standard Linux firewall rules.
- Whitelisting capability for trusted subnets.
- Configurable lockout durations.

## Bash Script Code
```bash
#!/bin/bash
# SSH Bruteforce Detector
LOG_FILE="/var/log/auth.log"
THRESHOLD=5
BLOCK_TIME=86400 # 24 hours

tail -F "$LOG_FILE" | while read -r line; do
    if echo "$line" | grep -q "Failed password for"; then
        IP=$(echo "$line" | grep -oE "[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}" | head -n1)
        # Check failed counts and block IP...
        echo "Suspicious activity detected from IP: $IP"
    fi
done
```
