# Extra upgrade notice

## 3.0

3.0 adds another component, dtable-storage-server, which provides better performance for persistent storage of bases. A base in SeaTable is saved as a file, which is automatically saved every 5 minutes. In 2.x, this file saved in seaf-server, but seaf-server will keep a version for each save, which will take up a lot of disk space. In 3.0, only one version is actually saved when a snapshot is generated every 24 hours, which saves space. dtable-storage-server is a simple abstract layer of traditional file system and object storage.

1) For newly installation, dtable-storage-server.conf will be generated automatically. For upgrade from 2.x, you need to generate the config file manually

```
docker exec -d seatable /shared/seatable/scripts/seatable.sh init
```

dtable-storage-server.conf is as follows

```
[general]
log_dir = /opt/seatable/logs
temp_file_dir = /tmp/tmp-storage-data

[storage backend]
type = filesystem
path = /opt/seatable/storage-data

[snapshot]
interval = 86400
keep_days = 180
```

2) Add configuration in dtable_web_settings.py so that the newly created bases are saved to the dtable-storage-server, and the old bases are still read and written from seaf-server.

In dtable_web_settings.py

```
NEW_DTABLE_IN_STORAGE_SERVER = True
```

3) Enterprise edition needs to add configuration items in dtable-db.conf to automatically back up the archived data in the dtable-db.

In dtable-db.conf

```
[backup]
dtable_storage_server_url = http://127.0.0.1:6666
backup_interval = 1440
keep_backup_num = 3
```

## 2.7

The configuration of the embedded base to other webpages (iframe mode) needs to be modified as follows

In dtable_web_settings.py

```
SESSION_COOKIE_SAMESITE = None
              |
              V
SESSION_COOKIE_SAMESITE = 'None'


CSRF_COOKIE_SAMESITE = None
              |
              V
CSRF_COOKIE_SAMESITE = 'None'

```

## 2.3

In 2.3 version, we made a small change to dtable-db configuration. If you're upgrading from older versions, you have to manually add below option to conf/dtable-db.conf:

```
[general]
......
log_dir = /shared/seatable/logs

......
```

It's also suggested to change the `total_cache_size` option to a larger value (e.g. 500MB, depending on how much memory you have):

```
[dtable cache]
......
total_cache_size = 500

......
```

You also need to add access information to dtable-server MySQL database. (You have to change below options based on your conf/dtable-server.json)

```
[database]
host = 127.0.0.1
user = root
password = mypass
db_name = dtable
```

Add `DTABLE_DB_URL` to dtable_web_settings.py

```
DTABLE_DB_URL = 'https://<your-domain>/dtable-db/'
```

Add dtable-db configuration to nginx.conf 

```
    location /dtable-db/ {
        proxy_pass         http://127.0.0.1:7777/;
        proxy_redirect     off;
        proxy_set_header   Host              $host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host  $server_name;
        proxy_set_header   X-Forwarded-Proto $scheme;

        access_log      /opt/nginx-logs/dtable-db.access.log seatableformat;
        error_log       /opt/nginx-logs/dtable-db.error.log;
    }
```

## 2.1

2.1 add another component dtable-db, which is used to provide SQL query API (more features will be provided based on this component). For newly installation, the config file will be generated automatically. For upgrade from 2.0, you need to add the config file manually.

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


