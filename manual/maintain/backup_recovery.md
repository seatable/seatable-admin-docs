# Backup And Recovery

## Overview

There are generally two parts of data to backup

* SeaTable tables data
* Databases

If you setup SeaTable server according to our manual, you should have a directory layout like:

```
/Your SeaTable data volume/seatable/
├── ccnet
├── conf
├── logs
├── pids
├── scripts
├── seafile-data
├── seafile-license.txt
└── seahub-data

```

All your tables data is stored under the `/Your SeaTable data volume/seatable/seafile-data/` directory.

SeaTable also stores some important metadata data in a few databases.

MySQL databases:

* ccnet_db: contains user and group information
* seafile_db: contains library metadata
* dtable_db: contains tables used by the web front end

## Backup

### Steps

1. Backup the MySQL databases;
2. Backup the SeaTable data directory;

Backup Order: Database First or Data Directory First

### Backing up Database

```
# It's recommended to backup the database to a separate file each time. Don't overwrite older database backups for at least a week.
cd /opt/seatable-backup/databases
docker exec -it seatable-mysql mysqldump -uroot -pMYSQL_ROOT_PASSWORD --opt ccnet_db > ccnet_db.sql
docker exec -it seatable-mysql mysqldump -uroot -pMYSQL_ROOT_PASSWORD --opt seafile_db > seafile_db.sql
docker exec -it seatable-mysql mysqldump -uroot -pMYSQL_ROOT_PASSWORD --opt dtable_db > dtable_db.sql

```

### Backing up SeaTable data

* To directly copy the whole data directory

  ```
  cp -R /opt/seatable/seatable-data/seatable /opt/seatable-backup/data/
  cd /opt/seatable-backup/data && rm -rf ccnet logs

  ```

* Use rsync to do incremental backup

  ```bash
  rsync -az /opt/seatable/seatable-data/seatable /opt/seatable-backup/data/
  cd /opt/seatable-backup/data && rm -rf ccnet logs

  ```

### Setup automatic backup for dtable-db (optional)

_available since Enterprise Edition 2.7.0_

Automatic backup can be enabled for dtable-db. It will take a snapshot for each base and upload to the dtable storage server. See configuration options in [dtable_db_conf.md](../config/dtable_db_conf.md)

## Recovery

### Restore the databases

```
docker exec -i seatable-mysql /usr/bin/mysql -uroot -pMYSQL_ROOT_PASSWORD ccnet_db < /opt/seatable-backup/databases/ccnet_db.sql
docker exec -i seatable-mysql /usr/bin/mysql -uroot -pMYSQL_ROOT_PASSWORD seafile_db < /opt/seatable-backup/databases/seafile_db.sql
docker exec -i seatable-mysql /usr/bin/mysql -uroot -pMYSQL_ROOT_PASSWORD dtable_db < /opt/seatable-backup/databases/dtable_db.sql

```

### Restore the SeaTable data

```
cp -R /opt/seatable-backup/data/* /opt/seatable/seatable-data/

```
