# Configuration of dtable-db

This is a cheat sheet for the [dtable-db](/introduction/architecture/#dtable-db) configuration file `dtable-db.conf`. It contains all possible settings that can be configured as well as their default values.

The default values provided here are best-effort (not built automatically). They will be used, if no value is defined at all. It is not necessary the value, that is written in the configuration file on first startup.

In the default values below, a value in the form `$XYZ` refers to an environment variable.

??? tip "Configuration changes require a restart"

    New configuration options will only apply after a restart of SeaTable.

??? abstract "Notes about the configuration file format"

    The configuration file uses the **INI format**, which is a simple text-based format for storing configuration data. It consists of sections (denoted by square brackets, e.g., [general]) and key-value pairs.

    Comments in the configuration file start with the hash symbol `#` and extend to the end of the line.

    When dealing with special characters like single quotes `'`, double quotes `"` or the hash symbol `#`, it's generally best to enclose the value in double quotes.

The following options are grouped by their sections.

## Example configuration

This is a typical configuration file, created automatically on the first startup by SeaTable.

```ini
[general]
host = 127.0.0.1
port = 7777
log_dir = /opt/seatable/logs

[storage]
data_dir = /opt/seatable/db-data

[dtable cache]
dtable_server_url = "http://127.0.0.1:5000"

[backup]
dtable_storage_server_url = "http://127.0.0.1:6666"
keep_backup_num = 3
```

## Available configuration options

### `[general]`

This section contains general settings about `dtable-db` service.

| Parameter                | Description                                                                                                                                            | Default            |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `host`                   | The address `dtable-db` listens on.                                                                                                                    | 0.0.0.0            |
| `port`                   | The port `dtable-db` listens on.                                                                                                                       | 7777               |
| `log_dir`                | Location for the `dtable-db` logs in the container.                                                                                                    | /opt/seatable/logs |
| `log_level`              | Only log messages with level priority higher than this will be logged. Supported levels are "debug", "info", "warn", "error", with ascending priority. | info               |
| `slow_query_threshold`   | If the processing time exceeds this threshold, a slow log will be recorded in addition to the normal log. Unit is in milliseconds.                     | 1000               |
| `query_per_minute_limit` | Sets the total max. of API calls per minute for the entire system. The default is suitable for most cases.                                             | 50000              |

Please use the following parameters only in very special occasions. In most cases you should use the default, which means no limitation.

| Parameter                 | Description                                                                                             | Default |
| ------------------------- | ------------------------------------------------------------------------------------------------------- | ------- |
| `global_row_update_limit` | Sets the global rate of row updates, deletes, and inserts per second, affecting SQL and API operations. | 0       |
| `row_update_limit`        | Sets the rate or row updates, deletes, and inserts per second and per base.                             | 0       |

### `[storage]`

This sections defines where the database files for bases with activated big data backend are stored and when old data is cleaned.

| Parameter    | Description                                                                    | Default               |
| ------------ | ------------------------------------------------------------------------------ | --------------------- |
| `data_dir`   | Location of the data directory in the container. You must specify this option. | /opt/seatable/db-data |
| `cleanup_at` | The execution time of clean up deleted data. Format is `hh:mm`.                | 00:00                 |

### `[dtable cache]`

This sections contains options for caching bases from dtable-server.

| Parameter           | Description                                                                                | Default               |
| ------------------- | ------------------------------------------------------------------------------------------ | --------------------- |
| `dtable_server_url` | local address for dtable-server. You must specify this option.                             | http://127.0.0.1:5000 |
| `total_cache_size`  | The base cache size in MB. Default was increased from 500 (MB) to 2000 (MB) in version 4.4 | 2000                  |

### `[SQL]`

General configuration options of the output of the SQL endpoint.

| Parameter                | Description                                                                                                    | Default |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- | ------- |
| `default_result_rows`    | Maximal number of rows returned in one query, if `LIMIT` syntax is not used.                                   | 100     |
| `result_rows_hard_limit` | Maximal number of rows returned in one query (system wide). Overrides any larger `LIMIT` value in a query      | 10000   |
| `exec_cost_hard_limit`   | Maximal execution cost of a query. If the estimated cost of a query exceeds this limit, the query is rejected. | 5000000 |

### `[backup]`

<!-- md:version 3.0 -->
<!-- md:feature -->

Section `[backup]` contains options to configure backup functions for big data backend:

| Parameter                   | Description                                                                                                                                              | Default               |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `dtable_storage_server_url` | The URL of dtable storage server. Required to enable automatic backup.                                                                                   | http://127.0.0.1:6666 |
| `backup_at`                 | The execution time of backup. Format is like `12:30`. It is mutual exclusion with `backup_interval`.                                                     | 02:00                 |
| `keep_backup_num`           | The number of backups that will be kept, oldest backups will be removed.                                                                                 | 3                     |
| `keep_days`                 | Specifies the retention period for backups in days. Older backups are deleted. Overrides `keep_backup_num` if set; otherwise, `keep_backup_num` is used. |                       |
| `keep_frequency_days`       | Specifies daily backup period. After this, only one backup per month is kept. Requires `keep_days` to be set and > `keep_frequency_days`.                |                       |

!!! warning "Two different backup methods: which should I choose?"

    Since version 5.2 SeaTable offers two backup approaches:

    - The first uses `keep_backup_num`, creating daily backups whenever changes were made and retaining a fixed number of the most recent ones, deleting the oldest when the limit is reached. Note that no new backup will be created if no changes were made to a base. This is the default option.

    - The second approach, using `keep_days` and `keep_frequency_days`, offers a tiered retention strategy. It creates daily backups for the recent period specified by `keep_frequency_days`, then switches to monthly backups for the older period. This method provides detailed recent backups and efficient long-term storage, balancing data granularity with space conservation. For example, setting `keep_days = 180` and `keep_frequency_days = 7` would keep daily backups for the past week, then monthly backups for the past six months (except for the past week).

## Deprecated or removed options

### `[database]`

??? note "[database] is not necessary anymore"

    Since version 5.3, `dtable-db` reads database connection settings from [environment variables](/configuration/environment-variables).
    From version 2.7 to version 5.2, `dtable-db` used the database settings in `dtable_server_config.json`.

    The section `[database]` contained options for accessing the MySQL database used by dtable-server.

    - `host`: Address of database. You must provide this option.
    - `port`: Port of database. Defaults to 3306.
    - `user`: Username for login to the database. You must provide this option.
    - `password`: Password for the database user. You must provide this option.
    - `db_name`: Database name used by dtable-server. You must provide this option.

### `[general]`

- `base_api_limit_per_day`: Limits the number of API calls per base per day. -1 means no limit.

### `[dtable cache]`

- `private_key`: Must be the same value like `DTABLE_PRIVATE_KEY` in `dtable_web_settings.py`. Only necessary if your version is before "Enterprise edition 3.5.5". If your version is newer the value is read from `dtable_server_config.json`.
- `clean_cache_interval`: Interval between cache cleaning. Unit is in seconds. Defaults to 300. This option is removed in "Enterprise edition 4.4.0". Since 4.4.0 a real-time eviction mechanism replaced regular cache cleanup mechanism.

### `[SQL]`

- `group_by_stmt_limit`: Maximal number of concurrent `group by` requests. If the number of `group by` requests exceeds this limit, new `group by` queries will wait in a queue. Default is 2. This option is removed in version 5.1.0. This option was only relevant when querying bases with big-data. In 5.1.0 version `group by` queries can be handled by a new OLAP engine, which is much more efficient. So this option is no longer necessary.

### `[backup]`

- `backup_interval`: The interval between each backup. Unit is in seconds. The default value is 86400 (=24 hours). You can not define `backup_interval` and `backup_at` at the same time. This option is deprecated since version 5.2. It's suggested to backup your bases once per day with the `backup_at` option.

<!-- to clarify with DJ
- general: dev_mod
- general: op_log_delete_restore_threshold
- general: transaction_timeout
- metrics: aufnehmen?
- profiling?
- sql all these xxxCost?
- SnapshotAfterEntries ?!?
- what is olap?
- when configuration is only read from dtable-db???
- configuration defaults sind andere als von configuration beim ersten start geschrieben. gewollt? Beispiel host: 0.0.0.0 is default, geschrieben wird 127.0.0.1. Warum überhaupt? Wir nutzen docker, dort ist erstmal nur aus docker netzwerk erlaubt.
- was ist tls in der configuration?
- ENV: SEATABLE_LOG_TO_STDOUT ?!? scheint irgendwie parallel zu LOG_DIR
- -->
