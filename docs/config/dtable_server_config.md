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
    "redis_password": "",
    "enable_notification_publish": true/false,
    "rows_api_minute_max": 100,
    "rows_api_hour_max": 6000,
    "worker_threads_num": 2,
    "save_interval": 5 * 60 * 1000,
    "api_req_max": 600,
    "api_base_day_max": 5000，
    "rows_api_max_limit": 1000,
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

The maximum number of listing rows API calls within 1 minute / hour. Listing rows in a large base involving converting internal representation to end-user friendly representation, which will cost a few seconds for 10K+ rows. So the API should be limited more than other APIs. 


#### api_req_max / api_base_day_max

* api_req_max: The maximum number of API calls to a base within 1 minute. The default value is 600.
* api_base_day_max: The maximum number of API calls to a base within 1 day. The default value is 5000.

#### worker_threads_num

Number of worker threads serving list rows API

#### save_interval

Interval for saving changed bases to persistent storage (dtable-storage-server). The default is 5 minutes.

#### rows_api_max_limit

Maxmum number of rows returned by calling list rows API in dtable-server, default by 1000


## Notice

You should restart the SeaTable after the modification of these settings by run the code below:

```
docker exec -d seatable /shared/seatable/scripts/seatable.sh restart
```

