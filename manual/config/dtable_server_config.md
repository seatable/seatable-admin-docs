# DTable Server Config

```
{
    "host": "db",
    "user": "root",
    "password": "MYSQL_PASSWORD",
    "database": "dtable_db",
    "port": 3306,
    "private_key": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "dtable_web_service_url": "https://example.seatable.com/",
    "redis_host": "redis",
    "redis_port": 6379,
    "redis_password": ""
}

```

The `redis_password` is an empty string.

The `private_key` must be the same as the `DTABLE_PRIVATE_KEY` in `dtable_web_settings.py` 

The `dtable_web_service_url` is used for dtable-server to access dtable-web. It is optional since 1.1.0. If it is not specified, 127.0.0.1:8000 will be used.


