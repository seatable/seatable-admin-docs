---
status: wip
---

# Standalone Database

Managed Database is an often used managed service. SeaTable can easily be configured to use a separate database. We recommend to initialize SeaTable with the default mariadb container. Then dump the database, load the dump to a separate database, update the `.env` file and restart SeaTable. Due to this assumption, this manual is the same for a new SeaTable Server or a service where you want to migrate the database.

## Stop Database container and SeaTable

```bash
docker stop mariadb
docker exec -it seatable-server seatable.sh stop
```

## Dump and restore to another database

Please refer to [Backup and Recovery](../../maintenance/backup-recovery.md#mariadb-database) for instructions regarding the backup process for the MariaDB database.

You can use the `mariadb` CLI to import the contents of the dumped databases into the managed databases.

## Don't start mariadb container

Create a copy of `seatable-server.yml` and rename it to `custom-seatable-server.yml`.
You should remove the `mariadb` service definition and update the `depends_on` declaration for the `seatable-server` service to ensure that it can start up.

```bash
services:
  seatable-server:
    depends_on:
      mariadb:                        # < remove
        condition: service_healthy    # < remove

  mariadb:                            # remove complete service
    ...                               # with all lines
```

## Update environment variables

You should update/set the following environment variables in your `.env` file:

```ini
MARIADB_HOST=
MARIADB_PORT=
MARIADB_PASSWORD=
```

## Restart SeaTable

After that you can restart SeaTable service.

```bash
docker restart seatable-server
```

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
