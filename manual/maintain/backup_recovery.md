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
├── db-data
├── logs
├── pids
├── scripts
├── seafile-data
├── seafile-license.txt
├── seahub-data
└── storage-data

```

All your tables data is stored under the `/Your SeaTable data volume/seatable/seafile-data/` directory. Below are important directories that contain user data:

* seafile-data: contains uploaded files for file and image columns
* seahub-data: contains data used by web front-end, such as avatars
* db-dta: contains archived rows in bases
* storage-data: contains backups for archived bases in db-data (added in 2.8 version)

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

* To directly copy the data directories (assuming /opt/seatable-backup/data already exists)

  ```
  cp -R /opt/seatable/seatable-data/seatable/seafile-data /opt/seatable-backup/data/seafile-data
  cp -R /opt/seatable/seatable-data/seatable/seahub-data /opt/seatable-backup/data/seahub-data
  # added in 2.8 version
  cp -R /opt/seatable/seatable-data/seatable/storage-data /opt/seatable-backup/data/storage-data
  ```

* Use rsync to do incremental backup for data directories (assuming /opt/seatable-backup/data already exists)

  ```bash
  rsync -az /opt/seatable/seatable-data/seatable/seafile-data /opt/seatable-backup/data/seafile-data
  rsync -az /opt/seatable/seatable-data/seatable/seahub-data /opt/seatable-backup/data/seahub-data
  # added in 2.8 version
  rsync -az /opt/seatable/seatable-data/seatable/storage-data /opt/seatable-backup/data/storage-data
  ```

You may notice that `db-data` directory is not backed up. Read the next sub-section for more details.

#### Setup automatic backup for dtable-db

_available since version 2.8.0_

Data managed by dtable-db component is archived rows from bases. They should be backed up as well. Data for dtable-db sits in the `/opt/seatable/seatable-data/seatable/db-data` direcotry.

Unlike other components, dtable-db provides built-in automatic backup mechanism. It will take a snapshot for each base and upload to dtable-storage-server. dtable-db only make new backup for a base if it detects changes to it. This makes the backup more efficient. dtable-storage-server also compresses the backups to make it more storage-efficient.

To setup automatic backup for dtable-db:

1. Setup and run dtable-storage-server. It should be started by default. Find more details in [dtable-storage-server documentation](../config/dtable_storage_server_conf.md).
2. Set `[backup]` configuration options in dtable-db.conf as in [dtable-db ducumentation](../config/dtable_db_conf.md)

If you configure dtable-storage-server with local file system as backend, dtable-storage-server saves its data to the path specified in dtable-storage-server.conf. By default it's set to `/opt/seatable/seatable-data/seatable/storage-data`. If you set up your backup as in the last section, you should have already backed up this directory as well. Since storage-data directory has already contained the backups for dtable-db, data in db-data directory doesn't need to backup.

If you configure dtable-storage-server with object storage as backend, there will be no data saved to `/opt/seatable/seatable-data/seatable/storage-data`. So you don't have to backup storage-data directory either.

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
