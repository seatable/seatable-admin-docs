# dtable-db config

dtable-db is the component that provides SQL querying capability in SeaTable server. Users can query their bases with SQL. It also handles archiving for large bases (since Enterprise Edition 2.3.0), to make querying large bases more efficient.

## Configurations

The configurations are in dtable_db.conf. Below are available options.

In section `[general]`:

- `host`: The address dtable-db listens on. Defaults to 0.0.0.0.
- `port`: The port dtable-db listens on. Defaults to 7777.
- `log_dir`: Location for the logs. Defaults to the directory specified in `-c` command line option. (Added in 2.3.0)
- `log_level`: Only log messages with level priority higher than this will be logged. Supported levels are "debug", "info", "warn", "error", with ascending priority. The default is "info".
- `slow_query_threshold`: If the processing time exceeds this threshold, a slow log will be recorded. Unit is in milliseconds. Defaults to 1000. (Added in 2.3.0)
- `row_update_limit`: Controls the rate of row update/delete/insert per second for each base. Row update/delete/insert via SQL and APIs are all affected. The unit is in number of rows. Default is 5000. (Added in 3.0.0)
- `global_row_update_limit`: Controls the rate of row update/delete/insert per second for the entire system. Row update/delete/insert via SQL and APIs are all affected. This option controls the global rate when there are concurrent updates to multiple bases. The unit is in number of rows. Default is 30000. (Added in 3.0.0)
- `base_api_limit_per_day`: Limits the number of API calls per base per day. Default is -1, meaning no limits.

In section `[storage]`:

- `data_dir`: Location of the data directory. You must specify this option.
- `cleanup_at`: The execution time of clean up deleted data. Format is `12:30`. The default value is `00:00`.  

Section `[dtable cache]` contains options for caching bases from dtable-server:

- `private_key`: The same as `DTABLE_PRIVATE_KEY` in `dtable_web_settings.py`. You must specify this option if your version is before "Enterprise edition 3.5.5". If your version is newer than that, you don't need to specify it here. It'll be read from dtable_server_config.json.
- `dtable_server_url`: local address for dtable-server. You must specify this option.
- `expire_time`: For how long a cached base will be valid. After that it'll be fetched from dtable-server again. Unit is in seconds. Defaults to 300 (5 minutes).
- `total_cache_size`: How much memory shall be used for caching bases. After this threshold is reached, cached bases will be cleaned with LRU algorithm. Cleaning stops when memory consumption reduces to 70% of this threshold. Unit is in MB. Defaults to 500MB.
- `clean_cache_interval`: Interval between cache cleaning. Unit is in seconds. Defaults to 300.

Section `[database]` contains options for accessing the MySQL database used by dtable-server. Note: Since 2.7 version this section is no longer used. dtable-db will use the database settings in conf/dtable-server.json.

- `host`: Address of database. You must provide this option.
- `port`: Port of database. Defaults to 3306.
- `user`: Username for login to the database. You must provide this option.
- `password`: Password for the database user. You must provide this option.
- `db_name`: Database name used by dtable-server. You must provide this option.

In section `[SQL]`:

- `max_result_rows`: Maximal number of rows that will be returned in one query, if `LIMIT` syntax is not used. Defaults to 100. (**Deprecated**: should use `default_result_rows` since 3.0 version)
- `default_result_rows`: Maximal number of rows that will be returned in one query, if `LIMIT` syntax is not used. Defaults to 100.
- `result_rows_hard_limit`: Maximal number of rows that will be returned in one query. If the number of rows specified in `LIMIT` syntax is larger than this option, the system still returns at most the number of rows that specified in this option. The default is 10000.
- `exec_cost_hard_limit`: Maximal execution cost of a query. If the estimated cost of a query exceeds this limit, the query is rejected. Default is 0, which means no limit.
- `group_by_stmt_limit`: Maximal number of concurrent `group by` requests. If the number of `group by` requests exceeds this limit, new `group by` queries will wait in a queue. Default is 2.

Section `[backup]` contains options to configure backup functions (available since Enterprise Edition 3.0.0):

- `dtable_storage_server_url`: The URL of dtable storage server. Required to enable automatic backup. For configuration of dtable storage server, please refer to [this documentation](./dtable_storage_server_conf.md).
- `backup_at`: The execution time of backup. Format is `12:30`. The default value is `02:00`. It is mutual exclusion with `backup_interval`. If neither `backup_at` nor `backup_interval` are specified, then `backup_at` will be used by default.
- `backup_interval`: The interval between each backup. Unit is in seconds. The default value is 86400 (24 hours).
- `keep_backup_num`: The number of backups that will be kept, oldest backups will be removed. The default value is 3.

Below is an example configuration:

```
[general]
host = 127.0.0.1
port = 7777
log_dir = /shared/seatable/logs

[storage]
data_dir = /opt/seatable/db-data
cleanup_at = 00:00

# You have to change dtable_server_url based on your conf/dtable-server.json
[dtable cache]
private_key = "my private key"
dtable_server_url = "http://127.0.0.1:5000"
total_cache_size = 100

# You have to change below options based on your conf/dtable-server.json
# Since 2.7 version this section is no longer used. dtable-db will use the database settings in conf/dtable-server.json.
[database]
host = 127.0.0.1
user = root
password = mypass
db_name = dtable

[backup]
dtable_storage_server_url = http://127.0.0.1:6666
backup_interval = 86400
keep_backup_num = 3
```
