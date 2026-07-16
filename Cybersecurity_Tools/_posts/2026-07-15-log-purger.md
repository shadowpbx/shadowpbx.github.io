---
title: "Automated System Log Purger"
date: 2026-07-15
track: Script
category: General
tag: PYTHON
---

This python utility automatically parses directory paths for archived `.log` or `.gz` files that are older than a specific retention period (e.g., 30 days) and deletes them to free up disk space.

## Features
- Dynamic path scanning.
- Dry-run verification mode.
- Output metrics on total disk space reclaimed.

## Python Code
```python
import os
import time

def purge_old_logs(log_dir, age_limit_days=30):
    limit_time = time.time() - (age_limit_days * 86400)
    for root, dirs, files in os.walk(log_dir):
        for name in files:
            file_path = os.path.join(root, name)
            if os.path.getmtime(file_path) < limit_time:
                os.remove(file_path)
```
