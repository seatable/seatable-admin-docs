# Extra upgrade notice

## 2.1

2.1 add another component dtable-db, which is used to provide SQL query API (more features will be provided based on this component). For newly installation, the config file will be generated automatically. For upgrade from 2.0, you need to add the config file manully.

Add a new file conf/dtable-db.conf with the following contents and modify `private_key` according to your instance:

```
[general]
host = 127.0.0.1
port = 7777

[storage]
data_dir = /opt/seatable/db-data

[dtable cache]
private_key = "my private key"
dtable_server_url = "http://127.0.0.1:5000"
expire_time = 600
total_cache_size = 1
clean_cache_interval = 300

```

The value of `private_key` should be the same as the value in `dtable_server_config.json`.

dtable_server_url should be http://127.0.0.1:5000. You don't need to modify the value.


