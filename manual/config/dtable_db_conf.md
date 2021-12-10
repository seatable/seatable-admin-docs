# dtable-db config

dtable-db is the component that provides SQL querying capability in SeaTable server. Users can query their bases with SQL. It also handles archiving for large bases (since Enterprise Edition 2.3.0), to make querying large bases more efficient.

## Configurations

The configurations are in dtable_db.conf. Below are available options.

In section `[general]`:

- `host`: The address dtable-db listens on. Defaults to 0.0.0.0.
- `port`: The port dtable-db listens on. Defaults to 7777.
- `log_dir`: Location for the logs. Defaults to the directory specified in `-c` command line option. (Added in 2.3.0)
- `slow_query_threshold`: If the processing time exceeds this threshold, a slow log will be recorded. Unit is in milliseconds. Defaults to 1000. (Added in 2.3.0)

In section `[storage]`:

- `data_dir`: Location of the data directory. You must specify this option.

Section `[dtable cache]` contains options for caching bases from dtable-server:

- `private_key`: The same as `DTABLE_PRIVATE_KEY` in `dtable_web_settings.py`. You must specify this option.
- `dtable_server_url`: local address for dtable-server. You must specify this option.
- `expire_time`: For how long a cached base will be valid. After that it'll be fetched from dtable-server again. Unit is in seconds. Defaults to 300 (5 minutes).
- `total_cache_size`: How much memory shall be used for caching bases. After this threshold is reached, cached bases will be cleaned with LRU algorithm. Cleaning stops when memory consumption reduces to 70% of this threshold. Unit is in MB. Defaults to 500MB.
- `clean_cache_interval`: Interval between cache cleaning. Unit is in seconds. Defaults to 300.

Section `[database]` contains options for accessing the MySQL database used by dtable-server.

- `host`: Address of database. You must provide this option.
- `port`: Port of database. Defaults to 3306.
- `user`: Username for login to the database. You must provide this option.
- `password`: Password for the database user. You must provide this option.
- `db_name`: Database name used by dtable-server. You must provide this option.

In section `[SQL]`:

- `max_result_rows`: Maximal number of rows that will be returned in one query, if `LIMIT` syntax is not used. Defaults to 100.

Section `[import]` contains options to configure backup functions:

- `dtable_storage_server_url`: The URL of dtable storage server. Required to enable automatic backup. (available since version 2.7.0)
- `backup_interval`: The interval between each backup. Unit is in minutes. The default value is 1440 minutes (24 hours).
- `keep_backup_num`: The number of backups that will be kept, oldest backups will be removed. The default value is 3.

Below is an example configuration:

```
[general]
host = 127.0.0.1
port = 7777
log_dir = /shared/seatable/logs

[storage]
data_dir = /opt/seatable/db-data

# You have to change private_key and dtable_server_url based on your conf/dtable-server.json
[dtable cache]
private_key = "my private key"
dtable_server_url = "http://127.0.0.1:5000"
total_cache_size = 100

# You have to change below options based on your conf/dtable-server.json
[database]
host = 127.0.0.1
user = root
password = mypass
db_name = dtable

[import]
dtable_storage_server_url = http://127.0.0.1:6666
backup_interval = 1440
keep_backup_num = 3
```
