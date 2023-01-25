# Database maintenance

## Database structure

SeaTable stores the following data types in the SQL database in the `seatable-mysql` Docker container:

* user actions and inputs in bases (e.g. new/modified/deleted rows, new/modified/deleted columns, new/modified, deleted views)
* meta-information for bases (e.g. API-token, common datasets, links, row comments, snapshots, third-party accounts, webhooks) 
* statistical and log information (e.g. automation rules execution, row count)
* user and group information (e.g. 2FA status, logins, user quota)
* versioning information for the assets (e.g. files and images) saved in bases

SeaTable stores the data in three databases:

* ccnet_db
* dtable_db
* seafile_db

NOTE: When [backing up SeaTable](https://manual.seatable.io/maintain/backup_recovery/#backing-up-database), these three databases must be dumped and saved. It is also recommended to create a database dump of these tables prior to an [upgrade](https://manual.seatable.io/upgrade/upgrade_manual/).

## Database Cleanup

The dtable_db database can grow very large over time - the faster, the more active the work in the bases. SeaTable therefore offers a command line tool to clean the database.

The tool deletes all records older than the retention period in the following tables in dtable_db:

| Database table                 | Table description                                            | Retention period |
| ------------------------------ | ------------------------------------------------------------ | ---------------- |
| activities                     | Aggregated log (based on operation_log) recording row creations, modifications, and deletions | > 30 days        |
| delete_operation_log           | High level log (based on operation_log) recording all row deletions | > 30 days        |
| dtable_notifications           | User notifications inside the bases                          | > 30 days        |
| dtable_snapshots               | Snapshots of bases that are not store in dtable-storage-server | > 365 days       |
| notifications_usernotification | User notifications on the home page                          | > 30 days        |
| operation_log                  | Low level log recording all operations                       | > 14 days        |
| session_log                    | Low level log recording all user sessions                    | > 30 days        |

To clean the database tables, run the following commands:

```
docker exec -it seatable /bin/bash

seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py clean_db_records
```

## Database Backup (optional)

Before cleaning the database tables, you can make a backup of the dtable_db database using a simple shell script. 

The sample shell script `database_backup.sh` dumps all tables of dtable_db with the exception of activities, delete_operation_log, operation_log, and session_log tables into a SQL-file `seatable.sql.TIMESTAMP`：

```
#!/bin/bash
set -e
db_host='<IP address of database>'
db_user='root'
db_name='dtable_db'
backup_dir='/opt/seatable/db-backups'

echo 'Start backing up the database'

mysqldump -h$db_host -u$db_user -p --opt $db_name --ignore-table=$db_name.operation_log --ignore-table=$db_name.activities --ignore-table=$db_name.delete_operation_log --ignore-table=$db_name.session_log > $backup_dir/seatable.sql.`date +"%Y-%m-%d"`

echo 'Database backup succeeded'
```

The three excludes tables are usually very large. This is why it makes sense to ignore them in the database dump.

To run the shell script, run this command:


```
$ ./database_backup.sh

```
You'll then be prompted to enter the database password:

```
Enter password: 
```

NOTE: The database password is provided as a parameter in the docker-compose.yml.

When finished, the output is:

```
Database backup succeeded
```
