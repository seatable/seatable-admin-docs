# dtable-db config

dtable-db is the component that provides SQL querying capability in SeaTable server. Users can query their bases with SQL. It also handles archiving for large bases (since Enterprise Edition 2.3.0), to make querying large bases more efficient.

## Configurations

The configurations are in dtable_db.conf. Below are available options.

In section `[general]`:
* `host`: The address dtable-db listens on. Defaults to 0.0.0.0.
* `port`: The port dtable-db listens on. Defaults to 7777.
* `log_dir`: Location for the logs. Defaults to the directory specified in `-c` command line option. (Added in 2.3.0)
* `slow_query_threshold`: If the processing time exceeds this threshold, a slow log will be recorded. Unit is in milliseconds. Defaults to 1000. (Added in 2.3.0)

In section `[storage]`:
* `data_dir`: Location of the data directory. You must specify this option.

Section `[dtable cache]` contains options for caching bases from dtable-server:
* `private_key`: The same as `DTABLE_PRIVATE_KEY` in `dtable_web_settings.py`. You must specify this option.
* `dtable_server_url`: local address for dtable-server. You must specify this option.
* `expire_time`: For how long a cached base will be valid. After that it'll be fetched from dtable-server again. Unit is in seconds. Defaults to 300 (5 minutes).
* `total_cache_size`: How much memory shall be used for caching bases. After this threshold is reached, cached bases will be cleaned with LRU algorithm. Cleaning stops when memory consumption reduces to 70% of this threshold. Unit is in MB. Defaults to 500MB.
* `clean_cache_interval`: Interval between cache cleaning. Unit is in seconds. Defaults to 300.

In section `[SQL]`:
* `max_result_rows`: Maximal number of rows that will be returned in one query, if `LIMIT` syntax is not used. Defaults to 100.

Below is an example configuration:

```
[general]
host = 127.0.0.1
port = 7777
log_dir = /shared/seatable/logs

[storage]
data_dir = /opt/seatable/db-data

[dtable cache]
private_key = "my private key"
dtable_server_url = "http://127.0.0.1:5000"
total_cache_size = 100
```