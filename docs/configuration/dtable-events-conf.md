# Configuration of dtable-events

This is a cheat sheet for the [dtable-events](/introduction/architecture/#dtable-events) configuration file `dtable-events.conf`. It contains all possible settings that can be configured as well as their default values.

The default values provided here are best-effort (not built automatically). They will be used, if no value is defined at all. It is not necessary the value, that is written in the configuration file on first startup.

In the default values below, a value in the form `$XYZ` refers to an environment variable.

??? tip "Configuration changes require a restart"

    New configuration options will only apply after a restart of SeaTable.

??? abstract "Notes about the configuration file format"

    The configuration file uses the **INI format**, which is a simple text-based format for storing configuration data. It consists of sections (denoted by square brackets, e.g., [general]) and key-value pairs.

    Comments in the configuration file start with the hash symbol `#` and extend to the end of the line.

    When dealing with special characters like single quotes `'`, double quotes `"` or the hash symbol `#`, it's generally best to enclose the value in double quotes.

!!! warning "dtable-events reads values from dtable_web_settings.py"

    Note that `dtable-events` reads `dtable_web_settings.py` for internal URLS and various key settings. Ensure these configurations are correct.

    Other configuration files are not used, if you run dtable-events separately.

!!! note "Configurations in dtable-events.conf`"

    Since SeaTable 5.3, by default, you can start the dtable-events service without adding any configurations to `dtable-events.conf`, as the the key startup configurations (i.e. *MySQL* and *Redis*) are already configured in the environment variables by default (i.e., `.env`). On the other hand, you can also add other dtable-events service related configurations to `dtable-events.conf`, which mainly contains some sections and their options: 
    
    - Section names in `dtable-events.conf` compose of **uppercase** and **spaces** (such as `[COMMON DATASET SYNCER]`). 
    - Option names will be mainly **lowercase** with **underscores** (such as `per_update_auto_rule_workers`).

The following options are grouped by their sections.

## Available configuration options

### `[DATABASE]`

??? success "Database can configure in .env"
    From SeaTable 5.3, you can specify the database configurations in [`.env`](./environment-variables.md#table-of-settings).

| Parameter  | Description                                                                                             | Default           |
| ---------- | ------------------------------------------------------------------------------------------------------- | ----------------- |
| `type`     | The database connection type. Use `mysql` for MySQL and MariaDB (other databases are not yet supported) | mysql             |
| `host`     | MariaDB server address                                                                                  | mariadb           |
| `port`     | MariaDB server port                                                                                     | 3306              |
| `db_name`  | Database name                                                                                           | dtable_db         |
| `username` | MariaDB username                                                                                        | root              |
| `password` | MariaDB password                                                                                        | `$DB_ROOT_PASSWD` |

### `[CLEAN DB]`

**enabled** by default.

This setting controls whether SeaTable runs automated database cleanup tasks at 00:30 every day.
Enabling this task ensures that your database stays lean and performs well. It also prevents the server from running out of disk space, since operation logs can take up quite a lot of space.

In addition, the retention periods for the different database tables can be customized.
Setting any value to `0` or `-1` causes the cleanup task to be skipped for the corresponding database table.

| Parameter                                  | Description                                                                | Default |
| ------------------------------------------ | -------------------------------------------------------------------------- | ------- |
| `enabled`                                  | Enables or disables the email notifications for base updates               | true    |
| `keep_dtable_snapshot_days`                | Retention period for snapshot entries in the database (in days)            | 365     |
| `keep_activities_days`                     | Retention period for activities (in days)                                  | 30      |
| `keep_operation_log_days`                  | Retention period for operation log entries (in days)                       | 14      |
| `keep_delete_operation_log_days`           | Retention period for delete operations in the operation log (in days)      | 30      |
| `keep_dtable_db_op_log_days`               | Retention period for operation log entries inserted by dtable-db (in days) | 30      |
| `keep_notifications_usernotification_days` | Retention period for user notifications (in days)                          | 30      |
| `keep_dtable_notifications_days`           | Retention period for base notifications (in days)                          | 30      |
| `keep_session_log_days`                    | Retention period for session log entries (in days)                         | 30      |
| `keep_auto_rules_task_log_days`            | Retention period for automation rule logs (in days)                        | 30      |
| `keep_user_activity_statistics_days`       | Retention period for user activity statistics (in days)                    | 0       |

### `[REDIS]`

??? success "Redis can configure in .env"
    From SeaTable 5.3, you can specify the redis configurations in [`.env`](./environment-variables.md#table-of-settings).

| Parameter  | Description           | Default |
| ---------- | --------------------- | ------- |
| `host`     | Redis server address  | redis   |
| `port`     | Redis server port     | 6379    |
| `password` | Redis server password |         |

### `[EMAIL SENDER]`

**enabled** by default.

SeaTable runs this task every hour to send base email notifications for base updates to the users. It also generates the log file `dtable_updates_sender.log`.

| Parameter | Description                                                  | Default |
| --------- | ------------------------------------------------------------ | ------- |
| `enabled` | Enables or disables the email notifications for base updates | true    |

### `[AUTOMATION]`

**enabled** by default.

In SeaTable, users have the ability to define triggers and actions within an automation rule.  
These rules are then automatically executed on a base.

| Parameter                      | Description                                                         | Default |
| ------------------------------ | ------------------------------------------------------------------- | ------- |
| `per_update_auto_rule_workers` | Number of worker threads used for processing automation rule events | 3       |

### `[COMMON DATASET SYNCER]`

**enabled** by default.

SeaTable runs every hour this event to check for pending dataset syncs. The job processes datasets that need syncing based on their interval (`per_day`, `per_hour`) and validity.

| Parameter | Description                                   | Default |
| --------- | --------------------------------------------- | ------- |
| `enabled` | Enables or disables the common dataset syncer | true    |

### `[EMAIL SYNCER]`

**enabled** by default.

SeaTable runs this event at the 30th minute of every hour. The job processes email sync tasks defined in a base by the user.

| Parameter     | Description                                                      | Default |
| ------------- | ---------------------------------------------------------------- | ------- |
| `enabled`     | Enables or disables the email syncer                             | true    |
| `max_workers` | Maximum number of worker threads for processing email sync tasks | 5       |

### `[LDAP SYNC]`

**disabled** by default.

SeaTable could sync LDAP accounts, if activated. This requires additional settings in `dtable_web_settings.py`. Please refer to [LDAP Authentication](../configuration/authentication/ldap.md).

| Parameter       | Description                                                                             | Default |
| --------------- | --------------------------------------------------------------------------------------- | ------- |
| `enabled`       | Enables or disables the ldap sync                                                       | false   |
| `sync_interval` | Specifies the interval at which the LDAP synchronization process should run, in seconds | 3600    |

### `[VIRUS SCAN]`

**disabled** by default.

This section configures how files are scanned for viruses:

- Whether scanning is enabled (enabled)
- The command used to scan files (scan_command)
- Return codes indicating infected or clean files (virus_code, nonvirus_code)
- Limits on file size and extensions to skip (scan_size_limit, scan_skip_ext)
- Concurrency settings (threads)

| Parameter         | Description                                                 | Default                                                                                   |
| ----------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `enabled`         | Enables or disables virus scanning                          | false                                                                                     |
| `scan_command`    | Command used for virus scanning (e.g., clamscan)            |                                                                                           |
| `virus_code`      | Return codes indicating a file is infected (e.g. 0)         |                                                                                           |
| `nonvirus_code`   | Return codes indicating a file is clean (e.g. 1)            |                                                                                           |
| `scan_interval`   | The interval at which the virus scan runs (in minutes)      | 60                                                                                        |
| `scan_size_limit` | Maximum file size to scan (in MB); larger files are skipped | 20                                                                                        |
| `scan_skip_ext`   | File extensions to exclude from scanning                    | ['.bmp', '.gif', '.ico', '.png', '.jpg', '.mp3', '.mp4', '.wav', '.avi', '.rmvb', '.mkv'] |
| `threads`         | Number of threads for parallel scanning                     | 4                                                                                         |

## Deprecated or removed options

### `[DATABASE]`

??? note "[DATABASE] is not necessary anymore"

    Since version 5.3, `dtable-events` reads database settings from [environment variables](/configuration/environment-variables).

    The section `[DATABASE]` contained options for accessing the MySQL database used by `dtable-events`.

    - `type`: Database connection type. Use `mysql` for MySQL and MariaDB. Other databases are not yet supported.
    - `host`: Address of database. You must provide this option.
    - `port`: Port of database. Defaults to 3306.
    - `username`: Username for login to the database. You must provide this option.
    - `password`: Password for the database user. You must provide this option.
    - `db_name`: Database name used by `dtable-events`. You must provide this option.

### `[REDIS]`

??? note "[REDIS] is not necessary anymore"

    Since version 5.3, `dtable-events` reads Redis connection settings from [environment variables](/configuration/environment-variables).

    The section `[REDIS]` used to contain the following options:

    - `host`: Redis server address. Defaults to `redis`.
    - `port`: Redis server port. Defaults to `6379`.
    - `password`: Redis server password (optional).

### `[AUTOMATION]`

- `per_minute_trigger_limit`: This setting allowed an administrator to restrict the frequency of automation rule executions. It has been removed in SeaTable 5.3.

### `[ROWS COUNTER]`

This section used to contain a single setting called `enabled` that could be used to enable a periodic counter that counted the total number of rows of each team.
The section has been removed in SeaTable 5.3.
