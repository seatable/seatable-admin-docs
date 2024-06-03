# Backup And Recovery

If you decide to run your own SeaTable Server, it is essential to ensure that you have a backup in place.

To understand what needs to be backed up, you must first understand the architecture of a SeaTable Server. If you have not yet read the [relevant chapter](../../introduction/architecture/), please do so now.

!!! success "Backup container for single-node server"

    For single-node servers, we offer a [user-friendly backup container](../../installation/components/restic/) that simplifies the process. Even with this tool, it is important to read this article to gain a thorough understanding of SeaTable backup procedures.

This article details what should and must be included in your backup, providing you with the knowledge to create your own backup procedure.

## Data and folder structure

If you set up your SeaTable server according to this manual, your server should have a folder structure similar to the following.

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

- MariaDB database
- SeaTable base data (including Big Data)
- Configuration files with private keys
- Credentials and deployment settings

Let us clarify where you find which content and how we should backup them.

!!! danger "Custom changes require custom backup"

    It's impossible to describe all variations of possible custom configurations. Therefore, keep the following rule in mind: if you made custom changes, you must check if they need to be included in the backup. For example, if you added custom certificates in the Caddy folder, ensure these certificates are included in your backup.

## What to backup?

### Mariadb database

!!! warning "Base data is not stored in the MariaDB database"

    A common misunderstanding is the assumption that the content of SeaTable bases is stored in the MariaDB container. This is not the case. Refer to the chapter about [SeaTable architecture](../../introduction/architecture/) for more details.

SeaTable creates three database in the `mariadb` Docker container, storing these kind of data types:

- **ccnet_db:**: User accounts, Groups and team assignment.
- **seafile_db:**: Workspace definitions and versioning information for the files and images.
- **dtable_db:** Meta-information for the bases, statistic and log information and operation log

The mariadb container persists the database information in the directory `/opt/mariadb` but instead of saving this directory you should create database dumps. Use the following commands to create such dump files.

```bash
# you can copy these commands to a shell script and execute this via a cronjob.
# Beware that this method will expose your mysql password in the process list
# and shell history of the docker host.

source /opt/seatable-compose/.env
mkdir -p /opt/seatable-backup && cd /opt/seatable-backup
docker exec -it mariadb mysqldump -u root -p${SEATABLE_MYSQL_ROOT_PASSWORD} --opt ccnet_db > ./ccnet_db.sql
docker exec -it mariadb mysqldump -u root -p${SEATABLE_MYSQL_ROOT_PASSWORD} --opt seafile_db > ./seafile_db.sql
docker exec -it mariadb mysqldump -u root -p${SEATABLE_MYSQL_ROOT_PASSWORD} --opt dtable_db > ./dtable_db.sql
```

!!! warning "Cronjob require other parameters"

    If you want to execute the `docker ... mysqldump` command directly as a cronjob, your have to remove the parameters `-it`. Otherwise you will only create an empty dump file.

!!! tip "Reduce database dump size"

    To reduce the size of your database dump, you can exclude certain database tables that typically grow large and are not always necessary. Examples include:

    - operation_log
    - delete_operation_log
    - session_log
    - activities

    To exclude these tables, use the `--ignore-table` parameter one or more times in the `mysqldump` command.

### Base content

Inside the `/opt/seatable-server/seatable` directory, there are multiple folders containing user data, most importantly, the content of all SeaTable bases. Each base has a unique ID (base_uuid) used in the folder structure. The three folders that must be included in the backup are:

- **storage-data**: contains base base, base snapshots and big data dumps.
- **seafile-data**: contains uploaded files for file and image columns.
- **seahub-data**: contains data used by web front-end, such as avatars

!!! success "Big Data is dumped automatically"

    The `db-data` directory contains big data content in a sql-like database structure. **It is not recommended to save this folder.** Instead the big data content is dumped to the storage-data folder automatically every 24 hours by default. Therefore it is already part of your backup.

    1. To backup big data more often, change the [dtable-db settings](http://127.0.0.1:8000/configuration/dtable-db-conf/#backup).
    2. To force the dump of big data you could execute the following command:

    ```sh
    docker exec -it seatable-server /opt/seatable/scripts/seatable.sh backup-all
    ```

### Configuration files

The `conf` directory contains all the configuration files for your SeaTable Server. While these files are not mandatory for restoring your server, they simplify the process. Therefore, we recommend including the `conf` folder in your backup.

### Credentials & deployment settings

The `/opt/seatable-compose/` directory contains your `.env` file with secrets and your SeaTable license file. Including this directory in your backup is essential.

## Manual backup process

Now that you understand the theory behind which files and directories need to be backed up, the following script could serve as a good starting point to consolidate all necessary files into the directory `/opt/seatable-backup`. From there, you can choose the backup method that best suits your needs.

```bash
#!/bin/bash

# create the backup directory
mkdir -p /opt/seatable-backup/

# mariadb dumps
source /opt/seatable-compose/.env
cd /opt/seatable-backup
docker exec mariadb mysqldump -u root -p${SEATABLE_MYSQL_ROOT_PASSWORD} --opt ccnet_db > ./ccnet_db.sql
docker exec mariadb mysqldump -u root -p${SEATABLE_MYSQL_ROOT_PASSWORD} --opt seafile_db > ./seafile_db.sql
docker exec mariadb mysqldump -u root -p${SEATABLE_MYSQL_ROOT_PASSWORD} --opt dtable_db > ./dtable_db.sql

# force dump of big data to storage-data folder
docker exec -it seatable-server /opt/seatable/scripts/seatable.sh backup-all

# backup files (exclude unnecessary directories)
rsync -az --exclude 'ccnet' --exclude 'logs' --exclude 'db-data' --exclude 'pids' --exclude 'scripts' /opt/seatable-server/seatable /opt/seatable-backup
rsync -az /opt/seatable-compose /opt/seatable-backup/
```

## Special cases and advanced topics

This section covers typical custom cases and provides additional advanced topics.

??? success "Backup Order: database first or data directory first?"

    For larger SeaTable instances, a complete backup may take some time. Therefore, you should consider whether to backup the MariaDB database first and then the data directory, or vice versa. In general, there is no issue with a time difference between the database and data backup. However, if you have to choose, we recommend backing up the database first, followed by the data folder. Here's why:

    - If you back up the data directory first, there's a risk that new objects referenced in the MariaDB database may not yet exist in the file system. This could potentially lead to problems, even resulting in base corruption.
    - If you back up the database first, you can be confident that all entries in the database reference valid objects.

??? success "S3 Object storage instead of local storage"

    If you're using [S3 Object Storage](../../installation/advanced/s3/) instead of local storage, the folders `storage-data` and `seafile-data` aren't stored on the local file system. Instead, all data is stored in four S3 buckets. Three buckets `fs`, `commits` and `blocks` contain assets from file/image column and `storage` contains the base data.

    A recommended backup method would be to implement an S3 sync with active versioning and lifecycle management.

??? success "Example of a S3 sync job with rclone"

    We have had positive experiences using these `rclone` parameters to synchronize buckets containing millions of objects and terabytes of data. Be sure to customize the command according to your bucket names and rclone configuration.

    ```bash
    rclone sync source:bucket-name target:bucket-name \
        --config /opt/rclone.conf \
        --stats 30m \
        --stats-one-line \
        --stats-log-level NOTICE \
        --transfers=16 \
        --checkers=16 \
        --skip-links \
        --s3-no-check-bucket \
        --log-file="/opt/backup.log" \
        --log-level=NOTICE
        --size-only
    ```

??? success "URL Change during restore"

    If you restore your SeaTable Server with a new URL, don't forget to execute the [command line tool to update the URL](./change-url.md). Otherwise assets from the image and file columns will not be accessable.

## Restore

To restore your server, simply install a fresh new SeaTable Server and then import the mariadb dumps and copy all the user data.

### Restore the databases

```bash
# replace <your_mysql_password> with your actual MySQL password (might be still present in /opt/seatable-compose/.env)
# beware that this method will expose your mysql password in the process list and shell history of the docker host

docker exec -i "mariadb" "/usr/bin/mysql" -u"root" -p'<your_mysql_password>' ccnet_db < /opt/seatable-backup/ccnet_db.sql
docker exec -i "mariadb" "/usr/bin/mysql" -u"root" -p'<your_mysql_password>' seafile_db < /opt/seatable-backup/seafile_db.sql
docker exec -i "mariadb" "/usr/bin/mysql" -u"root" -p'<your_mysql_password>' dtable_db < /opt/seatable-backup/dtable_db.sql
```

### Restore the SeaTable data and deployment settings

Simply copy all files back to their original position.

```
rsync -az /opt/seatable-backup/seatable /opt/seatable-server
rsync -az /opt/seatable-backup/seatable-compose /opt
```

### Restore the dtable-db data

To restore the big data, you can execute the following command. This will recreate the sql-like database structure from the dumps inside the `storage-data` folder.

```
docker exec -it seatable-server /opt/seatable/scripts/seatable.sh restore-all
```
