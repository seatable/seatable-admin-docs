---
status: wip
---

## Configuration

The Python Pipeline provides multiple environment variables for further customization. The available parameters are:

```bash
...
```

## Limiting Volume Size

By default, any script container can use up all of the available storage resources on your disk.

You can use the following instructions to set a limit for the directory that contains all volumes. These commands should be executed on your host.

```bash
# Create an empty file
touch python-pipeline-volume

# Resize the file (e.g. 2GB)
truncate -s 2G python-pipeline-volume

# Create a new ext4 filesystem
mke2fs -t ext4 -F python-pipeline-volume

# Create a new directory which will serve as the data transfer directory
mkdir /opt/python-pipeline-transfer

# Mount the filesystem
mount python-pipeline-volume /opt/python-pipeline-transfer

# Validate your changes
df -h /opt/python-pipeline-transfer
```

Afterwards, you should update your `.env` file and restart the python-starter by running `docker compose up -d`:

```ini
PYTHON_TRANSFER_DIRECTORY_PATH='/opt/python-pipeline-transfer'
```
