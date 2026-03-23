---
description: Configure dtable-events for automations, email notifications, LDAP sync, virus scanning, and database cleanup in SeaTable Server.
---

# Configuration of dtable-events

This is a cheat sheet for the possible configuration options of [dtable-events](/introduction/architecture.md#dtable-events). It contains all possible settings that can be configured as well as their default values.

The default values provided here are best-effort (not built automatically). They will be used, if no value is defined at all. It is not necessary the value, that is written in the configuration file on first startup.

In the default values below, a value in the form `$XYZ` refers to an environment variable.

??? tip "Configuration changes require a restart"

    New configuration options will only apply after a restart of SeaTable.

## Environment Variables

This section lists the environment variables read by [dtable-events](/introduction/architecture.md#dtable-events).

Please note that these variables are not included in `seatable-server.yml` by default.
We recommend that you do not modify the included `*.yml` files since any changes will be removed when upgrading SeaTable.
Instead, add an additional `custom-seatable-server.yml` file that includes the additional environment variables:

```yaml
services:
  seatable-server:
    environment:
      - AUTOMATION_WORKERS=10
```

This file then needs to be added to the `COMPOSE_FILE` variable inside your `.env` file.
This ensures that SeaTable upgrades stay seamless.

### Automations

| Environment Variable                | Description                                                                                                                          | Default |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `AUTOMATION_WORKERS`                | Configures the number of worker threads used to process automation rule events                                                       | 5       |
| `AUTOMATION_RATE_LIMIT_WINDOW_SECS` | The time window (in seconds) used to calculate automation rate limits                                                                | 300     |
| `AUTOMATION_RATE_LIMIT_PERCENT`     | The maximum percentage of total available automation capacity a single team can use within the defined time window. Defaults to 25%. | 0.25    |

By default, these settings will limit a single team to 25% of the available automation running time (calculated by `AUTOMATION_WORKERS * AUTOMATION_RATE_LIMIT_WINDOW_SECS`) within 5 minutes.

### PDF Generation

| Environment Variable               | Description                                               | Default |
| ---------------------------------- | --------------------------------------------------------- | ------- |
| `CONVERT_PDF_BROWSERS`             | Number of browser processes started to generate PDF files | 2       |
| `CONVERT_PDF_SESSIONS_PER_BROWSER` | Number of sessions per browser instance                   | 3       |

## Configuration File

The following section describes the structure and possible configuration values of the configuration file `dtable-events.conf`.

??? abstract "Notes about the configuration file format"

    The configuration file uses the **INI format**, which is a simple text-based format for storing configuration data. It consists of sections (denoted by square brackets, e.g., [general]) and key-value pairs.

    Comments in the configuration file start with the hash symbol `#` and extend to the end of the line.

    When dealing with special characters like single quotes `'`, double quotes `"` or the hash symbol `#`, it's generally best to enclose the value in double quotes.

!!! warning "dtable-events reads values from dtable_web_settings.py"

    `dtable-events` reads `dtable_web_settings.py` for internal URLs and various key settings. Ensure these configurations are correct.

    Other configuration files are not used, if you run dtable-events separately.

!!! note "Configurations in dtable-events.conf"

    Since SeaTable 5.3, by default, you can start the dtable-events service without adding any configurations to `dtable-events.conf`, as the key startup configurations (i.e. *MySQL* and *Redis*) are already configured in the environment variables by default (i.e., `.env`). On the other hand, you can also add other dtable-events service related configurations to `dtable-events.conf`, which mainly contains some sections and their options: 
    
    - Section names in `dtable-events.conf` compose of **uppercase** and **spaces** (such as `[COMMON DATASET SYNCER]`). 
    - Option names will be mainly **lowercase** with **underscores** (such as `per_update_auto_rule_workers`).

The following options are grouped by their sections.

**Example Configuration**

By default, `dtable-events.conf` will contain the following configuration after the first startup of SeaTable:

```ini
[CLEAN DB]
enabled = true
```

### `[DATABASE]`

??? success "Database can be configured in .env"

    From SeaTable 5.3, you can specify the database configurations in [`.env`](../overview.md). There is no need to keep this configuration in your `dtable-events.conf`.

| Parameter  | Description                                                                                             | Default           |
| ---------- | ------------------------------------------------------------------------------------------------------- | ----------------- |
| `type`     | The database connection type. Use `mysql` for MySQL and MariaDB (other databases are not yet supported) | mysql             |
| `host`     | MariaDB server address                                                                                  | mariadb           |
| `port`     | MariaDB server port                                                                                     | 3306              |
| `db_name`  | Database name                                                                                           | dtable_db         |
| `username` | MariaDB username                                                                                        | root              |
| `password` | MariaDB password                                                                                        | `$DB_ROOT_PASSWD` |

### `[REDIS]`

??? success "Redis can be configured in .env"
    From SeaTable 5.3, you can specify the redis configurations in [`.env`](../overview.md). There is no need to keep this configuration in your `dtable-events.conf`.

| Parameter  | Description           | Default |
| ---------- | --------------------- | ------- |
| `host`     | Redis server address  | redis   |
| `port`     | Redis server port     | 6379    |
| `password` | Redis server password |         |

### `[CLEAN DB]`

**disabled** by default.

This setting controls whether SeaTable runs automated database cleanup tasks at 00:30 every day.
Enabling this task ensures that your database stays lean and performs well. It also prevents the server from running out of disk space, since operation logs can take up quite a lot of space.

In addition, the retention periods for the different database tables can be customized.
Setting any value to `0` or `-1` causes the cleanup task to be skipped for the corresponding database table.

| Parameter                                  | Description                                                                | Default |
| ------------------------------------------ | -------------------------------------------------------------------------- | ------- |
| `enabled`                                  | Enables or disables the email notifications for base updates               | false   |
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
| `keep_dtable_app_pages_operation_log_days` | Retention period for app pages operation log entries (in days)             | 14      |

### `[EMAIL SENDER]`

**enabled** by default.

SeaTable runs this task every hour to send base email notifications for base updates to the users. It also generates the log file `dtable_updates_sender.log`.

| Parameter | Description                                                  | Default |
| --------- | ------------------------------------------------------------ | ------- |
| `enabled` | Enables or disables the email notifications for base updates | true    |

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

SeaTable could sync LDAP accounts, if activated. This requires additional settings in `dtable_web_settings.py`. Please refer to [LDAP Authentication](../authentication/ldap.md).

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

    Since version 5.3, `dtable-events` reads database settings from [environment variables](/configuration/overview).

    The section `[DATABASE]` contained options for accessing the MySQL database used by `dtable-events`.

    - `type`: Database connection type. Use `mysql` for MySQL and MariaDB. Other databases are not yet supported.
    - `host`: Address of database. You must provide this option.
    - `port`: Port of database. Defaults to 3306.
    - `username`: Username for login to the database. You must provide this option.
    - `password`: Password for the database user. You must provide this option.
    - `db_name`: Database name used by `dtable-events`. You must provide this option.

### `[REDIS]`

??? note "[REDIS] is not necessary anymore"

    Since version 5.3, `dtable-events` reads Redis connection settings from [environment variables](/configuration/overview).

    The section `[REDIS]` used to contain the following options:

    - `host`: Redis server address. Defaults to `redis`.
    - `port`: Redis server port. Defaults to `6379`.
    - `password`: Redis server password (optional).

### `[AUTOMATION]`

- `per_minute_trigger_limit`: This setting allowed an administrator to restrict the frequency of automation rule executions. It has been removed in SeaTable 5.3.
- `per_update_auto_rule_workers`: This setting allowed an administrator to configure the number of worker threads used to process automation rule events. It has been removed in SeaTable 6.1. You should use the environment variable `AUTOMATION_WORKERS` instead.

### `[ROWS COUNTER]`

This section used to contain a single setting called `enabled` that could be used to enable a periodic counter that counted the total number of rows of each team.
The section has been removed in SeaTable 5.3.
