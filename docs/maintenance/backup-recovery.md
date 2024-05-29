---
status: new
---

# Backup And Recovery

If you decided to run your own SeaTable Server, you must make sure that you have a backup in place.

To understand what you have to backup, you have to understand the architecture of a SeaTable Server. If you have not read the corresponding chapter so far, read the chapter now.

Also for single-node servers we provide an easy-to-use backup container that makes backup easy.

This article provides the details what could be and what has to be part of your backup. It gives you the knowledge to build your own backup procedure.

## Data and folder structure

If you setup your SeaTable server according to this manual, there should exist a folder structure like the following on your server.

```
/opt
├── caddy
│   ├── ...
├── containerd
│   ├── ...
├── mariadb
│   ├── ...
├── seatable-compose
│   ├── .env
│   ├── caddy.yml
│   ├── ...
└── seatable-server
    ├── nginx-logs
    ├── seatable
    │   ├── ccnet
    │   ├── conf
    │   ├── db-data
    │   ├── logs
    │   ├── pids
    │   ├── scripts
    │   ├── seafile-data
    │   ├── seahub-data
    │   ├── seatable-license.txt
    │   └── storage-data
    └── ssl
```

There are generally four parts of data you have to save to keep your data secure.

- mariadb database
- SeaTable base data (including Big Data)
- Configuration files with private keys
- Credentials and deployment settings

Let us clarify where you find which content and how we should backup them.

## What to backup?

### Mariadb database

SeaTable creates three database in the `mariadb` Docker container:

- **ccnet_db**: contains user and group information
- **seafile_db**: contains library metadata
- **dtable_db**: contains tables used by the web front end

It is important to know, that SeaTable does not store the content of a base in the mariadb container. Instead these kind of data types are stored in the database:

- user actions and inputs in bases (e.g. new/modified/deleted rows, new/modified/deleted columns, new/modified, deleted views)
- meta-information for bases (e.g. API-token, common datasets, links, row comments, snapshots, third-party accounts, webhooks)
- statistical and log information (e.g. automation rules execution, row count)
- user and group information (e.g. 2FA status, logins, user quota)
- versioning information for the assets (e.g. files and images) saved in bases

The mariadb container persists the database information in the directory `/opt/mariadb` but instead of saving this directory you should create database dumps. Use the following commands to create such dump files.

```bash
# It's recommended to backup the database to a separate files each time. Don't overwrite older database backups for at least a week.
# replace <your_mysql_password> with your actual MySQL password (might be still present in /opt/seatable-compose/.env)
# beware that this method will expose your mysql password in the process list and shell history of the docker host

source /opt/seatable-compose/.env
mkdir -p /opt/seatable-backup && cd /opt/seatable-backup
docker exec -it mariadb mysqldump -u root -p${SEATABLE_MYSQL_ROOT_PASSWORD} --opt ccnet_db > ./ccnet_db.sql
docker exec -it mariadb mysqldump -u root -p${SEATABLE_MYSQL_ROOT_PASSWORD} --opt seafile_db > ./seafile_db.sql
docker exec -it mariadb mysqldump -u root -p${SEATABLE_MYSQL_ROOT_PASSWORD} --opt dtable_db > ./dtable_db.sql
```

!!! warning

    The above commands do not work via cronjob. To create dumps of the database via cronjob, the parameters `-it` must be omitted.

To decrease the size of your database dump you could exclude some database tables, that usually gets quite big and are not necessarily required. Possible examples could be:

- operation_log
- delete_operation_log
- session_log
- activities

To exclude some tables, you can use the `--ignore-table` parameter one or multiple times in the `mysqldump` command.

### User data

Inside `/opt/seatable-server/seatable` directory there are multiple folders, that contain user data. The three folders that must be part of the backup are:

- **storage-data**: contains base base, base snapshots and big data dumps.
- **seafile-data**: contains uploaded files for file and image columns.
- **seahub-data**: contains data used by web front-end, such as avatars

It is up to you, how you backup these folders.

The `db-data` directory contains big data content in a sql-like database structure. It is not recommended to save this folder. Instead the big data content is dumped to the storage-data folder.

!!! note "Big Data is dumped automatically"

    Big Data is dumped on a regular based every 24 hours by default. Change the [dtable-db settings](http://127.0.0.1:8000/configuration/dtable-db-conf/#backup) if you want to dump big data more often.

    To force the dump of big data you could execute the following command:

    ```sh
    docker exec -it seatable-server /opt/seatable/scripts/seatable.sh backup-all
    ```

### Configuration files

The `conf` directory contains all config files of your SeaTable Server. To restore your server these config files are not mandatory, but it makes restore easier. Therefore we recommend to add the conf folder to your backup.

### Credentials & deployment settings

`/opt/seatable-compose/` contains your `.env` file with secrets and your seatable license file. This should be part of your backup.

## Manual backup process

Now you know the theory which files and directories have to be backed up. The following script might be a good starting point to consolidate all files that should be backup up into the directory `/opt/seatable-backup`. From there you can decide which backup method you would like to use.

```bash
# create the backup directory
mkdir -p /opt/seatable-backup/

# mariadb dumps
source /opt/seatable-compose/.env
cd /opt/seatable-backup
docker exec -it mariadb mysqldump -u root -p${SEATABLE_MYSQL_ROOT_PASSWORD} --opt ccnet_db > ./ccnet_db.sql
docker exec -it mariadb mysqldump -u root -p${SEATABLE_MYSQL_ROOT_PASSWORD} --opt seafile_db > ./seafile_db.sql
docker exec -it mariadb mysqldump -u root -p${SEATABLE_MYSQL_ROOT_PASSWORD} --opt dtable_db > ./dtable_db.sql

# force dump of big data to storage-data folder
docker exec -it seatable-server /opt/seatable/scripts/seatable.sh backup-all

# backup files
rsync -az --exclude 'ccnet' --exclude 'logs' --exclude 'db-data' /opt/seatable-server/seatable /opt/seatable-backup
rsync -az /opt/seatable-compose /opt/seatable-backup/
```

### S3 instead of local storage

In case that you use S3 instead of local storage, the folders `storage-data` and `seafile-data` are not stored on local file system. Instead all data is stored in the S3 buckets. A good backup method would be to implement a S3 sync with active versioning and life cycle management.

## Restore

To restore your server, simply install a fresh new SeaTable Server and then import the mariadb dumps and all the user data.

### Restore the databases

```bash
# replace <your_mysql_password> with your actual MySQL password (might be still present in /opt/seatable-compose/.env)
# beware that this method will expose your mysql password in the process list and shell history of the docker host

docker exec -i "mariadb" "/usr/bin/mysql" -u"root" -p'<your_mysql_password>' ccnet_db < /opt/seatable-backup/databases/ccnet_db.sql
docker exec -i "mariadb" "/usr/bin/mysql" -u"root" -p'<your_mysql_password>' seafile_db < /opt/seatable-backup/databases/seafile_db.sql
docker exec -i "mariadb" "/usr/bin/mysql" -u"root" -p'<your_mysql_password>' dtable_db < /opt/seatable-backup/databases/dtable_db.sql

```

### Restore the SeaTable data and deployment settings

Simply copy all files back to their original position.

```
rsync -az /opt/seatable-backup/seatable-server /opt
rsync -az /opt/seatable-backup/seatable-compose /opt

```

### Restore the dtable-db data

To restore the big data, you can execute the following command. This will recreate the sql-like database structure from the dumps inside the `storage-data` folder.

```
docker exec -it seatable-server /opt/seatable/scripts/seatable.sh restore-all
```

!!! warning "URL Change"

    If you restore your SeaTable Server with a new URL, don't forget to execute the command line tool to update the URL.
