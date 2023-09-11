# seafile.conf settings

## Seafile fileserver configuration

The configuration of seafile fileserver is in the `[fileserver]` section of the file `seafile.conf`

```
[fileserver]
# tcp port for fileserver
port = 8082
# bind address for fileserver
# default to 0.0.0.0, if deployed without proxy: no access restriction
# set to 127.0.0.1, if used with local proxy: only access by local
host = 127.0.0.1
# set the number of worker threads to server http requests. 
# Default value is 10, which is a good value for most use cases.
worker_threads = 15

```

## Database configuration

The whole database configuration is stored in the `[database]` section of the configuration file.

```
[database]
type = mysql
host = db
port = 3306
user = root
password = seatable_db
db_name = seafile_db
connection_charset = utf8
max_connections=100

```

When you configure seafile server to use MariaDB, the default connection pool size is 100, which should be enough for most use cases.
