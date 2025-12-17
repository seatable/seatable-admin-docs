# Ofelia

<!-- md:version 6.0 -->

[Ofelia](https://github.com/mcuadros/ofelia) is a job scheduler for Docker that allows you to run scheduled commands inside Docker containers.
The commands and their respective schedules are specified through Docker labels.

## Installation

### Update the .env File

To install Ofelia, add `ofelia.yml` to the `COMPOSE_FILE` variable in your `.env` file. This tells Docker to download the required Ofelia image.

Simply copy and paste (:material-content-copy:) the following code into your command line to update your `.env` file:

```bash
sed -i "s/COMPOSE_FILE='\(.*\)'/COMPOSE_FILE='\1,ofelia.yml'/" /opt/seatable-compose/.env
```

### Start Ofelia

Start Ofelia for the first time by running the following commands:

```bash
cd /opt/seatable-compose && \
docker compose up -d
```

### Logs

You can use `docker logs -f ofelia` to view Ofelia's logs. By default, Ofelia forwards the output of all scheduled commands to its own `stdout` file descriptor.

## Configuration

By default, `ofelia.yml` adds labels to the `seatable-server` service. These labels schedule three maintenance commands that run inside the `seatable-server` container:

| Slug        | Description                                                                                                                     | Schedule  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `clean-tmp` | Removes any files older than 3 days from the `/tmp` directory inside the container to the system from running out of disk space | `@weekly` |
| `gc`        | Runs the [garbage collection](../../maintenance/storage-cleanup.md) process to clean up unused `block` and `fs` objects         | `@weekly` |
| `seaf-fsck` | Runs the [`seaf-fsck`](../../maintenance/filesystem-check.md) script to check the integrity of all Seafile libraries            | `@weekly` |

You are free to modify the schedule of these commands and/or add your own commands via additional labels on the `seatable-server` container.
Please refer to [Ofelia's docs](https://github.com/mcuadros/ofelia/blob/master/README.md#configuration) for more details regarding the configuration format.

!!! note "Configuration changes require a restart"

    Since Ofelia does not yet support the automatic reloading of label configuration, any changes to the Docker labels require a manual restart of Ofelia.
    You can achieve this by running the following command:

    ```bash
    # --force-recreate ensures that Ofelia is restarted
    docker compose up -d ofelia --force-recreate
    ```
