---
status: new
---

# Restarting the SeaTable service

Changes in the configuration files, require a restart of the SeaTable service.

## Method 1: Restart from outside the container

To restart the SeaTable service directly from your host command line, use:

```bash
docker exec seatable-server /opt/seatable/scripts/seatable.sh
```

This command runs the SeaTable startup script inside the container, managing all necessary service processes. You must specify the full path to `seatable.sh` because the Docker exec command does not use the container’s `PATH` environment variable by default.

## Method 2: Restart from inside the container

Alternatively, you can open an interactive shell inside the container and run the script manually:

```bash
docker exec -it seatable-server bash
seatable.sh
exit
```

When using an interactive shell, you do not need to specify the full path to `seatable.sh` because the container’s `PATH` is available. After restarting the service, type `exit` to leave the container shell.

# Restarting the docker container

Alternatively, you can restart the complete SeaTable Docker container. This is useful if you need to ensure all processes and services inside the container are refreshed.

You need to vavigate to your SeaTable compose directory (commonly `/opt/seatable-compose`), then run:

```bash
/opt/seatable-compose
docker stop seatable-server
docker compose up -d
```

This will stop the SeaTable container and then restart it in detached mode. All related services defined in your `docker-compose.yml` will also be managed according to your configuration.