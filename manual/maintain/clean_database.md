# Clean database

## Clean database records

Since version 1.2, we offer command to clear records older than 30 days in seatable database (the default database name is `dtable_db`).

The following tables will be cleaned:

* activities
* operation_log
* delete_operation_log
* notifications_usernotification
* dtable_notifications
* dtable_snapshop
* session_log


```
docker exec -it seatable /bin/bash

seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py clean_db_records
```

## Database backup (Optional)

Before running clean_db_records, you can make a backup by a shell script. The following tables with too many records will be excluded:

- operation_log
- delete_operation_log
- session_log
- activities

Examples of backup shell script `database_backup.sh`：

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

Run the shell script

```
$ ./database_backup.sh
Start backing up the database
Enter password: xxxxx
Database backup succeeded
```

﻿
