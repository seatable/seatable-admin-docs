# dtable-db config

dtable-db is the component that provides SQL querying capability in SeaTable server. Users can query their bases with SQL. It also handles archiving for large bases (since Enterprise Edition 2.3.0), to make querying large bases more efficient.

## Configurations

The configuration options are available in `dtable-db.conf`. The options are grouped in sections.

### `[general]`

This section contains general settings about dtable-db service.

- `host`: The address dtable-db listens on. Defaults to 0.0.0.0.
- `port`: The port dtable-db listens on. Defaults to 7777.
- `log_dir`: Location for the dtable-db logs in the container. Defaults to `/opt/seatable/logs`. (Added in 2.3.0)
- `log_level`: Only log messages with level priority higher than this will be logged. Supported levels are "debug", "info", "warn", "error", with ascending priority. The default is "info".
- `slow_query_threshold`: If the processing time exceeds this threshold, a slow log will be recorded in addition to the normal log. Unit is in milliseconds. Defaults to 1000 (=1 sec). (Added in 2.3.0)
- `base_api_limit_per_day`: Limits the number of API calls per base per day. Default is -1, meaning there is no limit.

Please use the following parameters only in very special occasions. In most cases you should use the default values.

- `global_row_update_limit`: Controls the rate of row update/delete/insert per second for the entire system. Row update/delete/insert via SQL and APIs are all affected. This option controls the global rate when there are concurrent updates to multiple bases. The unit is in number of rows. Default is 30000. (Added in 3.0.0)
- `row_update_limit`: Controls the rate of row update/delete/insert per second for each base. Row update/delete/insert via SQL and APIs are all affected. The unit is in number of rows. Default is 5000. (Added in 3.0.0)
- `query_per_minute_limit`: Limits the number of API calls per minute for the entire system. Default is 50000. If this value is less than 0, meaning no limits.

### `[storage]`

This sections defines where the database files for bases with activated big data backend are stored and when old data is cleaned.

- `data_dir`: Location of the data directory in the container. You must specify this option. Typically it is `/opt/seatable/db-data`.
- `cleanup_at`: The execution time of clean up deleted data. Format is `hh:mm`. Defaults to `00:00`.

### `[dtable cache]`

This sections contains options for caching bases from dtable-server.

- `dtable_server_url`: local address for dtable-server. You must specify this option. Typically it is `http://127.0.0.1:5000`.
- `total_cache_size`: size of the base cache in MB. Since 4.4 version, the default is 2000MB (2GB). Before 4.4 version, the default is 500MB. This difference is due to a change of memory consumption estimation algorithm. With 4.4 version the new algorithm is more close to the real memory consumption of the cache.

### `[backup]`

Section `[backup]` contains options to configure backup functions for big data backend (available since Enterprise Edition 3.0.0):

- `dtable_storage_server_url`: The URL of dtable storage server. Required to enable automatic backup. For configuration of dtable storage server, please refer to [this documentation](../configuration/dtable-storage-server-conf.md). You must specify this option. Typically it is `http://127.0.0.1:6666`.
- `backup_at`: The execution time of backup. Format is `12:30`. The default value is `02:00`. It is mutual exclusion with `backup_interval`. If neither `backup_at` nor `backup_interval` are specified, then `backup_at` will be used by default.
- `backup_interval`: The interval between each backup. Unit is in seconds. The default value is 86400 (=24 hours). You can not define `backup_interval` and `backup_at` at the same time.
- `keep_backup_num`: The number of backups that will be kept, oldest backups will be removed. The default value is 3.

### `[SQL]`

General configuration options of the output of the SQL endpoint.

- `default_result_rows`: Maximal number of rows that will be returned in one query, if `LIMIT` syntax is not used. Defaults to 100.
- `result_rows_hard_limit`: Maximal number of rows that will be returned in one query. If the number of rows specified in `LIMIT` syntax is larger than this option, the system still returns at most the number of rows that specified in this option. The default is 10000.
- `exec_cost_hard_limit`: Maximal execution cost of a query. If the estimated cost of a query exceeds this limit, the query is rejected. Default is 5000000.
- `group_by_stmt_limit`: Maximal number of concurrent `group by` requests. If the number of `group by` requests exceeds this limit, new `group by` queries will wait in a queue. Default is 2.

## Example configuration

```
[general]
host = 127.0.0.1
port = 7777
log_dir = /shared/seatable/logs

[storage]
data_dir = /opt/seatable/db-data

[dtable cache]
dtable_server_url = "http://127.0.0.1:5000"

[backup]
dtable_storage_server_url = "http://127.0.0.1:6666"
keep_backup_num = 3
```

## Deprecated or removed options

### [database]

!!! note "Not necessary anymore"

    Since version 2.7 this complete section `[database]` is no longer used. dtable-db will use the database settings in `conf/dtable_server_config.json`.

The section `[database]` contains options for accessing the MySQL database used by dtable-server. Note:

- `host`: Address of database. You must provide this option.
- `port`: Port of database. Defaults to 3306.
- `user`: Username for login to the database. You must provide this option.
- `password`: Password for the database user. You must provide this option.
- `db_name`: Database name used by dtable-server. You must provide this option.

### [dtable cache]

- `private_key`: Must be the same value like `DTABLE_PRIVATE_KEY` in `dtable_web_settings.py`. Only necessary if your version is before "Enterprise edition 3.5.5". If your version is newer the value is read from `dtable_server_config.json`.
- `clean_cache_interval`: Interval between cache cleaning. Unit is in seconds. Defaults to 300. This option is removed in "Enterprise edition 4.4.0". Since 4.4.0 a real-time eviction mechanism replaced regular cache cleanup mechanism.
