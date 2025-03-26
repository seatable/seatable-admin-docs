# Configuration dtable-events

This is a cheat sheet for the [dtable-events](/introduction/architecture/#seatable-server-container) configuration file `dtable-events.conf`. It contains all possible settings that can be configured as well as their default values.

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

The following options are grouped by their sections.

## Example configuration

This is a typical configuration file, created automatically on the first startup by SeaTable.

```ini
[DATABASE]
type = mysql
host = mariadb
port = 3306
username = root
password = topsecret
db_name = dtable_db

[REDIS]
host = redis
port = 6379
```

## Available configuration options

### `[DATABASE]`

| Parameter  | Description                                                                                             | Default           |
| ---------- | ------------------------------------------------------------------------------------------------------- | ----------------- |
| `type`     | The database connection type. Use `mysql` for MySQL and MariaDB (other databases are not yet supported) | mysql             |
| `host`     | MariaDB server address                                                                                  | mariadb           |
| `port`     | MariaDB server port                                                                                     | 3306              |
| `db_name`  | Database name                                                                                           | dtable_db         |
| `username` | MariaDB username                                                                                        | root              |
| `password` | MariaDB password                                                                                        | `$DB_ROOT_PASSWD` |

### `[REDIS]`

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

### `[NOTIFY-SCANNER]`

**disabled** by default.

Notification rules are a feature that allows users to set criteria for a base and receive notifications when these criteria are met.
This runs a daily job at midnight to clean up inactive notification rules. Rules that have not been triggered for 180 days or were created but never triggered are marked as invalid.

| Parameter | Description                                  | Default |
| --------- | -------------------------------------------- | ------- |
| `enabled` | Enables or disables the notification scanner | false   |

### `[AUTOMATION]`

**enabled** by default.

In SeaTable, users have the ability to define triggers and actions within an automation rule.  
These rules are then automatically executed on a base.

| Parameter                      | Description                                                                                                          | Default |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ------- |
| `per_minute_trigger_limit`     | To maintain server stability, SeaTable includes a feature that restricts the frequency of automation rule executions | 50      |
| `per_update_auto_rule_workers` | Number of worker threads used for processing automation rule events                                                  | 3       |

### `[COMMON-DATASET-SYNCER]`

**enabled** by default.

SeaTable runs every hour this event to check for pending dataset syncs. The job processes datasets that need syncing based on their interval (`per_day`, `per_hour`) and validity.

| Parameter | Description                                   | Default |
| --------- | --------------------------------------------- | ------- |
| `enabled` | Enables or disables the common dataset syncer | true    |

### `[EMAIL-SYNCER]`

**enabled** by default.

SeaTable runs this event at the 30th minute of every hour. The job processes email sync tasks defined in a base by the user.

| Parameter     | Description                                                      | Default |
| ------------- | ---------------------------------------------------------------- | ------- |
| `enabled`     | Enables or disables the email syncer                             | true    |
| `max_workers` | Maximum number of worker threads for processing email sync tasks | 5       |

### `[LDAP_SYNC]`

**disabled** by default.

SeaTable could sync LDAP accounts, if activated. This requires additional settings in `dtable_web_settings.py`. Please refer to [LDAP Authentication](../configuration/authentication/ldap.md).

| Parameter       | Description                                                                             | Default |
| --------------- | --------------------------------------------------------------------------------------- | ------- |
| `enabled`       | Enables or disables the ldap sync                                                       | false   |
| `sync_interval` | Specifies the interval at which the LDAP synchronization process should run, in seconds | 3600    |

### `[ROWS-COUNTER]`

**enabled** by default.

SeaTable runs this event every 24 hours. It counts and updates the total number of rows of a team.

| Parameter | Description                                    | Default |
| --------- | ---------------------------------------------- | ------- |
| `enabled` | Enables or disables the rows counter for teams | true    |

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
