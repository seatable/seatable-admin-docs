# ccnet.conf

Ccnet is the internal RPC framework used by Seafile server and also manages the user database. A few useful options are in ccnet.conf.

```
[General]
# The config has no effect. But is needed now.
SERVICE_URL=http://www.example.com

```

## Changing MariaDB Connection Pool Size

When you configure ccnet to use MariaDB, the default connection pool size is 100, which should be enough for most use cases. You can change this value by adding following options to ccnet.conf:

```
[Database]
......
# Use larger connection pool
MAX_CONNECTIONS = 200

```


