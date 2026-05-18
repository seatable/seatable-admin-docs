---
description: Configure SeaTable to use a standalone or managed MariaDB database instead of the default Docker container.
---

# Standalone Database

Managed Database is an often used managed service. SeaTable can easily be configured to use a separate database. We recommend to initialize SeaTable with the default mariadb container. Then dump the database, load the dump to a separate database, update the `.env` file and restart SeaTable. Due to this assumption, this manual is the same for a new SeaTable Server or a service where you want to migrate the database.

## Stop SeaTable

```bash
docker stop seatable-server
```

Now you can be sure, that no more records are written or modified in the database.

## Dump and restore to another database

Please refer to [Backup and Recovery](../../maintenance/backup-recovery.md#mariadb-database) for instructions regarding the backup process for the MariaDB database.

You can use the `mariadb` CLI to import the contents of the dumped databases into the managed databases.

## Stop Mariadb

After the dump, stop also the database container:

```bash
docker stop mariadb
```

## Don't start mariadb container

To disable the `mariadb` service and patch the `depends_on` declaration for the `seatable-server` service, you should create a `custom-seatable-server.yml` file:

```yaml
services:
  seatable-server:
    # Patch depends_on to ensure that seatable-server can start up
    # Note: The "!override" syntax requires at least Docker Compose v2.24.4
    depends_on: !override
      redis:
        condition: service_healthy

  mariadb:
    profiles:
      - never
```

Make sure to include this `custom-seatable-server.yml` in the `COMPOSE_FILE` variable in your `.env` file.
You can read our [guide] for more information on how this merging process of multiple configuration files works and the rationale behind it.

## Update environment variables

You should update/set the following environment variables in your `.env` file:

```ini
MARIADB_HOST=
MARIADB_PORT=
MARIADB_PASSWORD=
```

## Restart SeaTable

After that you can [restart SeaTable](../../maintenance/restart-seatable.md).

## Troubleshooting

Check the logs and look for any connection errors.

```bash
tail -f /opt/seatable-server/seatable/logs/*.log
```

## Remove old database

if everything is running good, you can delete the local database folder /opt/mariadb.

```bash
rm -r /opt/mariadb
```
