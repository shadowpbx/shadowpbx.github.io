#!/usr/bin/env bash
# ==============================================================================
# AI METADATA & SYSTEM DOCUMENTATION FOR FUTURE AGENTS
# ==============================================================================
# Purpose: Disable all Ubuntu automatic updates (APT periodic, unattended upgrades, 
#          fwupd firmware refresh timers) to prevent boot delays & display manager freezes.
# Reference Documentation: /home/shad/fix_autoupdates.md
# Created: 2026-07-23 by Antigravity AI Assistant
# Host: shadow (Ubuntu Linux)
# ==============================================================================

set -e

echo "=== 1. Fixing APT Configuration Files ==="
cat << 'EOF' > /etc/apt/apt.conf.d/20auto-upgrades
APT::Periodic::Update-Package-Lists "0";
APT::Periodic::Download-Upgradeable-Packages "0";
APT::Periodic::AutocleanInterval "0";
APT::Periodic::Unattended-Upgrade "0";
EOF

cp /etc/apt/apt.conf.d/20auto-upgrades /etc/apt/apt.conf.d/10periodic
echo "APT configuration files fixed."

echo "=== 2. Cleaning Up Invalid Systemd Services ==="
rm -f /etc/systemd/system/fwupd-.service /etc/systemd/system/fwupd-refresh.service

echo "=== 3. Disabling Background Systemd Timers & Services ==="
systemctl stop apt-daily.timer apt-daily-upgrade.timer fwupd-refresh.timer unattended-upgrades.service 2>/dev/null || true
systemctl disable apt-daily.timer apt-daily-upgrade.timer fwupd-refresh.timer unattended-upgrades.service 2>/dev/null || true
systemctl mask apt-daily.service apt-daily-upgrade.service fwupd-refresh.service 2>/dev/null || true

echo "=== 4. Verifying APT Configuration ==="
apt-config dump | grep Periodic

echo "=== All Auto-Updates Have Been Successfully Disabled! ==="
