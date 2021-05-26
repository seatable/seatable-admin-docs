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
#### redis_password

It is an empty string

#### private_key

It must be the same as the `DTABLE_PRIVATE_KEY` in `dtable_web_settings.py` 

#### dtable_web_service_url

It is used for dtable-server to access dtable-web. It is optional since 1.1.0. If it is not specified, 127.0.0.1:8000 will be used.

#### enable_notification_publish

It is used for publishing the notification to the "notification-added" channel of redis, default by false.  This is designed for the integration to the third-party application which will be able to receive the real-time notification.

#### rows_api_minute_max / rows_api_hour_max

The maximum time of row related API calling within 1 minute / hour.

## Notice

You should restart the SeaTable after the modification of these settings by run the code below:

```
docker exec -d seatable /shared/seatable/scripts/seatable.sh restart
```


