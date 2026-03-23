---
description: Repair and prune SeaTable bases from the command line or web UI to fix structural issues and reduce base size.
---

# Repair/Prune a base

SeaTable provides a repair function that fixes typical structural problems with a base and prunes unused data.

## What does it do?

The repair function performs the following operations:

- **Ensures structural integrity**: every table must have a column with the ID `0000` (the first column)
- **Removes orphaned data**: rows and views without a valid ID are deleted
- **Prunes deleted columns**: removes the _values_ of deleted columns from the JSON object

The pruning step can free up significant space. When you delete a column in SeaTable, only the _column definition_ is removed immediately — the actual _column values_ remain in the JSON object. Over time, this can cause the base to approach the 200MB size limit. The repair function cleans up this leftover data.

## When to use it

- A base is approaching the 200MB size limit
- A base shows unexpected behavior (missing first column, phantom rows)
- After deleting many columns with large datasets
- As a maintenance step for long-lived bases with frequent schema changes

## Usage

There are two ways to trigger the repair function.

### Option 1: System Admin Web UI

System administrators can repair a base directly from the web interface:

1. Log in as system administrator
2. Navigate to the **System Admin** area
3. Open **Bases** and find the affected base
4. Click the **three-dot menu** of the base and select **Repair**

### Option 2: Command line

For the command line execution you need the `base_uuid`, which you can find in the URL when opening the base in the browser.

```bash
docker exec -it seatable-server bash
cd /templates
seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py repair_base <base_uuid>
```

!!! tip "No downtime required"

    The repair function can be executed while SeaTable is running. Users may experience a brief interruption for the affected base while the repair is in progress.
