# Clean Database

## Clean Database Records

Since version 1.2, we offer a command to clear records older than the retention period in the seatable database (the default database name is `dtable_db`).

```
$ docker exec -it seatable /bin/bash

$ seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py clean_db_records
```

The following tables will be cleaned:

| Database table                 | Table description                                            | Retention period |
| ------------------------------ | ------------------------------------------------------------ | ---------------- |
| activities                     | Aggregated log (based on operation_log) recording row creations, modifications, and deletions | > 30 days        |
| delete_operation_log           | High level log (based on operation_log) recording all row deletions | > 30 days        |
| dtable_notifications           | User notifications inside the bases                          | > 30 days        |
| dtable_snapshots               | Snapshots of bases that are not store in dtable-storage-server | > 365 days       |
| notifications_usernotification | User notifications on the home page                          | > 30 days        |
| operation_log                  | Low level log recording all operations                       | > 14 days        |
| session_log                    | Low level log recording all user sessions                    | > 30 days        |

## Database Backup (optional)

Before running `clean_db_records`, you can make a backup by a shell script. The following tables with many records will be excluded:

- operation_log
- delete_operation_log
- session_log
- activities

Example of the `database_backup.sh` backup shell script：

```
#!/bin/bash
set -e
db_host='<IP address of database>'
db_user='root'
db_name='dtable_db'
backup_dir='/opt/seatable/db-backups'

echo 'Start backing up the database'

mysqldump -h$db_host -u$db_user -p --opt $db_name \
  --ignore-table=$db_name.activities \
  --ignore-table=$db_name.delete_operation_log \
  --ignore-table=$db_name.operation_log \
  --ignore-table=$db_name.session_log \
  > $backup_dir/seatable.sql.`date +"%Y-%m-%d"`

echo 'Database backup succeeded'
```

Run the shell script:

```
$ ./database_backup.sh
Start backing up the database
Enter password: xxxxx
Database backup succeeded
```

## Clean operation_log records more efficiently (optional)

When the base is modified, `dtable-server` automatically saves it to `dtable-storage-server` every 5 minutes. In order to prevent `dtable-server` failure before the base is saved to `dtable-storage-server`, resulting in base data loss, every time base is modified, an operation log will be recorded in the operation_log table.

Therefore, for **large instance**, the operation_log table tends to be very large. Since version 4.1, we offer a more efficient and reliable command to clear the useless data in the operation_log table three days ago. You can add a cron job to run the command every day.

This command has two advantages over the above command:

1. It will make sure all pending operations be applied to the base before clearing the logs.
2. It will clear the logs in small batch, avoiding consume too much database resource in a short time.

```
$ docker exec seatable /opt/seatable/scripts/seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py clean_operation_log
```
