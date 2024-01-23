# Standalone Database

Managed Database is a often used managed service. SeaTable can easily be configured to use a separate database. We recommend to initialize SeaTable with the default mariadb container. Then dump the database, load the dump to a separate database, update all config files and restart SeaTable. Due to this assumption, this manual is the same for an new SeaTable Server or a service where you want to migrate the database.

## Stop Database container and SeaTable

```bash
docker stop mariadb
docker exec -it seatable-server seatable.sh stop
```

## Dump and restore to another database

```bash
...
```

## Don't start mariadb container

Create a copy of seatable-server.yml and rename it custom-seatable-server.yml. Remove all ...

```bash
services:
  seatable-server:
    depends_on:
      mariadb:                        # < remove
        condition: service_healthy    # < remove

  mariadb:                            # remove complete service
    ...                               # with all lines
```

## Update all config files

These configuration files have to be changed:

- ccnet.cont
- dtable-db.conf
- dtable-events.conf
- dtable_server_config.js
- dtable_web_settings.py
- seafile.conf

!!! warning "Variable names are different"

    Variable names differ in SeaTable config files. In seafile.conf the variable is `host`, in dtable_web_settings.py it is `HOST`. Don't mix things up.

## Restart SeaTable

After that you can restart SeaTable service.

```bash
docker exec -it seatable-server seatable.sh restart
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
