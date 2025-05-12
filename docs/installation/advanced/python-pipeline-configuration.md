---
status: wip
---

## Configuration

The Python Pipeline can be configured through environment variables for further customization. The available parameters inside your `.env` file are:

### Resources

| Parameter                                 | Description                                                                                                     | Default             |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------- |
| `PYTHON_PROCESS_TIMEOUT`                  | The timeout for a single script (in seconds)                                                                    | `60`                |
| `PYTHON_TRANSFER_DIRECTORY_PATH`          | The directory on the host where python-starter creates a folder for each individual script job                  | `/tmp`              |
| `PYTHON_RUNNER_CONTAINER_CPUS`            | The number of CPUs available to each script container                                                           | `1`                 |
| `PYTHON_RUNNER_CONTAINER_MEMORY`          | The amount of memory available to each script container                                                         | `1g`                |
| `PYTHON_RUNNER_READ_ONLY_FILESYSTEM`      | Whether the root filesystem should be mounted as read-only (`true` or `false`)                                  | `true`              |
| `PYTHON_RUNNER_TMPFS_MOUNT_SIZE_IN_BYTES` | Maximum size of the `tmpfs` mount (mounted at `/tmp` inside the container) for each script container (in bytes) | `104857600` (100MB) |

### Logging

| Parameter                    | Description                                                                                | Default   |
| ---------------------------- | ------------------------------------------------------------------------------------------ | --------- |
| `PYTHON_SCHEDULER_LOG_LEVEL` | The log level for the python-scheduler (`DEBUG`, `INFO`, `WARNING`, `ERROR` or `CRITICAL`) | `WARNING` |
| `PYTHON_STARTER_LOG_LEVEL`   | The log level for the python-starter (`DEBUG`, `INFO`, `WARNING`, `ERROR` or `CRITICAL`)   | `WARNING` |

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
