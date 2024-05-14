# Clean Database

<!-- md:version 1.2 -->

Although SeaTable has a cleanup mechanism for its database, it is not activated by default. Even if you have a small setup, it is recommended that you setup a single cronjob for cleanup to run for example once a week. Otherwise your database will become bigger and bigger. This article explains all the details.

## Why does the database become to big?

The main reason why the SeaTable database grows quickly is due to the storage of the operation log. Every time you change something in a base, this change is stored in the so called operation log. The operation log contains the base, the table, the row and the concrete change. Might might imagine how fast this database table gets if such a huge amount of data is stored every time you change something in the database.

```json
{
  "op_type": "modify_row",
  "table_id": "iFMf",
  "row_id": "avAf...",
  "updated": {
    "s6km": ["91e3...@auth.local"],
    "_last_modifier": "1455...@auth.local"
  },
  "old_row": { "s6km": ["ea3b...6@auth.local"] }
}
```

In addition, every 5 minutes `dtable-server` automatically persists all changes by saving the current version of the base to `dtable-storage-server`. The operation log is therefore a protection against data loss in case that SeaTable server crashes before the base is persisted. As soon as the base is persisted, the main purpose of the operation log is fulfilled.

In addition the operation log is used for the log display inside the base.

Let me summarize, the operation log has to purposes:

1. the operation log protects against data loss in the event that SeaTable Server crashes before the changes are persisted to the json file.
2. the operation log is used for the log/history display inside the base.

Just to give you an idea. At [SeaTable Cloud](https://cloud.seatable.io) we generate up to **1 Gigabyte per day**, mainly driven by the operation log.

## Clean Database Records

SeaTable provides a command to clear records older than the retention period in the seatable database (the default database name is `dtable_db`). The retention period is a good mixture of cleaning up old data and keep enough data for the users.

### Manual execution

If you want to run the command manually, here it is:

```bash
docker exec -it seatable-server /bin/bash
seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py clean_db_records
```

The following tables will be cleaned:

| Database table                 | Table description                                                                             | Retention period |
| ------------------------------ | --------------------------------------------------------------------------------------------- | ---------------- |
| activities                     | Aggregated log (based on operation_log) recording row creations, modifications, and deletions | 30 days          |
| delete_operation_log           | High level log (based on operation_log) recording all row deletions                           | 30 days          |
| dtable_notifications           | User notifications inside the bases                                                           | 30 days          |
| dtable_snapshots               | Snapshots of bases that are not store in dtable-storage-server                                | 365 days         |
| notifications_usernotification | User notifications on the home page                                                           | 30 days          |
| operation_log                  | Low level log recording all operations                                                        | 14 days          |
| session_log                    | Low level log recording all user sessions                                                     | 30 days          |

### Cronjob

If you want to keep your database small, it is necessary to execute your cleanup on a daily or weekly basis. Generate a bash script like the following, give it execution permission and create a cronjob to run it on a regular basis.

```bash
#!/bin/bash
docker exec seatable-server /opt/seatable/scripts/seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py clean_db_records
```

The cronjob might look like this:

```bash
# clean system (once a week at saturday at 0:20am)
0 20 * * 6 /opt/backup/scripts/system_clean.sh > /opt/backup/logs/system_clean.log
```

## Clean operation_log records more efficiently

<!-- md:version 4.1 -->

If you system becomes really big, you might want to clean up the operation log faster. Therefore a new more efficient and reliable command was added to clear the useless data in the operation_log table after three days. You can add a cron job to run the command every day.

This command has two advantages over the above command:

1. It will make sure all pending operations be applied to the base before clearing the logs.
2. It will clear the logs in small batch, avoiding consume too much database resource in a short time.

```
$ docker exec seatable-server /opt/seatable/scripts/seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py clean_operation_log
```

## Free space occupied by database

Mariadb and MySQL are quite special if it comes to storage usage. Even if you delete data from your database, the storage will not become available. Space that once was occupied by MySQL is blocked.

This becomes problematic if you database becomes huge, because you never cleaned the operation log and now the disk space is full. There are basically two ways to solve this problem.

### Check your database size

Login into your SQL command line of your mariadb server. Now execute the following commands to get the size of your databases

```bash
SELECT table_schema AS "Database", ROUND(SUM(data_length + index_length) / 1024 / 1024 / 1024, 2) AS "Size (GB)" FROM information_schema.TABLES GROUP BY table_schema;
```

The result may look like this:

```bash
+--------------------+-----------+
| Database           | Size (GB) |
+--------------------+-----------+
| ccnet_db           |      0.04 |
| dtable_db          |     32.31 |
| information_schema |      0.00 |
| seafile_db         |      0.07 |
+--------------------+-----------+
4 rows in set (0.005 sec)
```

To get the size of the tables inside `dtable_db` execute one of these commands:

```bash
# get number of rows of the tables inside dtable_db
SELECT table_name, table_rows FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'dtable_db';

# get size of the tables inside dtable_db
SELECT table_name AS "Table", ROUND(((data_length + index_length) / 1024 / 1024), 2) AS "Size (MB)" FROM information_schema.TABLES WHERE table_schema = "dtable_db";
```

To delete all entries from the operation log older than 14 days, you can execute this command:

```bash
DELETE FROM `operation_log` WHERE `op_time` < UNIX_TIMESTAMP(DATE_SUB(NOW(), INTERVAL 14 DAY))*1000
```

### Option 1: Optimize

This requires that you have enough disk space, to create a duplicate of the existing operation log.
...

### Option 2: Create new operation_log table

This is the way, if you only have a limited amount of space available.
...


## Clean expired sessions

The `django_session` table is used to store user session and personalized setting information, and the expired sessions can be cleaned up through the `clearsessions` command:

```bash
docker exec -it seatable-server /bin/bash
seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py clearsessions
```