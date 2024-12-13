# Database Cleanup

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

Deleting entries from the `operation_log` table doesn't automatically free up disk space. To reclaim space, you need to delete and recreate the table. Here are two options to achieve this:

### Preparation Steps:

1. **Stop SeaTable:** It's recommended to stop SeaTable before proceeding to prevent new entries in the `operation_log`.
2. **Keep MariaDB Running:** Ensure the MariaDB container is running to access the database command line.
3. **Create a Backup:** Always create a database backup before direct database operations to mitigate risks.

### Option 1: Create a Copy and Rename the Table

This method requires sufficient disk space to create a duplicate of the existing operation log.

```sql
USE dtable_db;
CREATE TABLE operation_log_copy AS SELECT * FROM operation_log;

-- Verify the copy
SELECT COUNT(*) FROM operation_log;
SELECT COUNT(*) FROM operation_log_copy;

-- Delete original table
DROP TABLE operation_log

-- Rename copy
RENAME TABLE operation_log_copy TO operation_log;
```

### Option 2: Delete and Recreate a Operation Log Table

!!! danger "Warning"

    This will erase all base logs. You'll lose information about past changes, but snapshots will remain unaffected.

Use this method if you have limited disk space. It immediately frees up space occupied by the table.

1. Connect to MariaDB: `docker exec -it mariadb mariadb -u root -p`
2. Execute the following commands:

```sql
USE dtable_db;
SHOW CREATE TABLE operation_log;
-- This returns the recreate statement

DROP TABLE operation_log
-- Paste the recreate statement here, adding ";" at the end
CREATE TABLE `operation_log` (...);
```

By following these steps, you can effectively manage the disk space used by the `operation_log` table in your SeaTable installation.

## Clean expired sessions

The `django_session` table is used to store user sessions. Expired sessions are not cleaned automatically, the database table will become large when you have a lot of users. The expired sessions can be cleaned up through the `clearsessions` command:

```bash
docker exec -it seatable-server /bin/bash
seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py clearsessions
```

## Database Analysis Commands for SeaTable

Here's a concise guide for database analysis of a SeaTable Server.

### Determine Database Table Sizes

Use the command line tool `ncdu` on `/opt/mariadb` for an easy-to-navigate overview of table sizes. Here is an example output. Typically operation_log is by far the biggest table of all.

=== "Command"

    ```bash
    $ cd /opt/mariadb
    $ ncdu
    ```

=== "Result"

    ```sql
    --- /opt/mariadb/dtable_db --------------------------
      1.7 GiB [###########]  operation_log.ibd
     72.0 MiB [           ]  django_session.ibd
     60.0 MiB [           ]  delete_operation_log.ibd
     23.0 MiB [           ]  activities.ibd
    596.0 KiB [           ]  dtable_external_apps.ibd
    ```

### Analyze Operation Log

To find bases with the most operations:

=== "Command"

    ```sql
    SELECT dtable_uuid, COUNT(*) AS entry_count
    FROM operation_log
    GROUP BY dtable_uuid;
    ```

=== "Result"

    ```sql
    +----------------------------------+-------------+
    | dtable_uuid                      | entry_count |
    +----------------------------------+-------------+
    | 0114790c116d46fd8b9f2f9331fab623 |           2 |
    | 014a4d23b28147f180f790ae8146c053 |          37 |
    | 01bee901b3dc43df8df0ee58c0ab53a6 |        3312 |
    | 038a126c86c14b55896ceff03237e72a |           1 |
    | 04e403d181e14c41b9026d7f2d9b648b |         324 |
    | 0558d382ef804d5d9eb4e682a3eaa99d |          41 |
    ...
    ```

### Identify Active Users (for a specific base)

For a specific base like `01bee901b3dc43df8df0ee58c0ab53a6`:

=== "Command"

    ```sql
    SELECT author, COUNT(*) AS entry_count
    FROM operation_log
    WHERE dtable_uuid = '01bee901b3dc43df8df0ee58c0ab53a6'
    GROUP BY author
    ORDER BY entry_count DESC;
    ```

=== "Result"

    ```sql
    +---------------------------------------------+-------------+
    | author                                      | entry_count |
    +---------------------------------------------+-------------+
    |                                             |        2633 |
    | 126a619d86964f78b1871a1738706225@auth.local |         267 |
    | 1bd28d36f01840f7a4db2d813851b951@auth.local |         168 |
    | dtable-web                                  |          32 |
    | faf94d5676414a1d887e538fda19fafd@auth.local |          28 |
    ```

### Analyze Change Frequency

To view changes over time:

=== "Command"

    ```sql
    SELECT FROM_UNIXTIME(FLOOR(op_time / 3600000) * 3600) AS hour_interval,
    COUNT(*) AS entry_count
    FROM operation_log
    WHERE dtable_uuid = '01bee901b3dc43df8df0ee58c0ab53a6'
    GROUP BY hour_interval
    ORDER BY hour_interval;
    ```

=== "Result"

    ```sql
    +---------------------+-------------+
    | hour_interval       | entry_count |
    +---------------------+-------------+
    | 2024-09-12 13:00:00 |           7 |
    | 2024-09-12 14:00:00 |          50 |
    | 2024-09-12 15:00:00 |          83 |
    | 2024-09-12 16:00:00 |          63 |
    | 2024-09-12 17:00:00 |          53 |
    ```

### Remove Base Entries

To safely remove all entries for a specific base from operation_log:

=== "Command"

    ```sql
    DELETE FROM operation_log WHERE dtable_uuid = '01bee901b3dc43df8df0ee58c0ab53a6';
    ```

=== "Result"

    ```sql
    Query OK, 3312 rows affected (0.094 sec)
    ```
