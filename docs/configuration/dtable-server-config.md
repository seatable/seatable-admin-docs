# Configuration of dtable-server

This is a cheat sheet for the [dtable-server](/introduction/architecture/#dtable-server) configuration file `dtable_server_config.json`. It contains all possible settings that can be configured as well as their default values.

The default values provided here are best-effort (not built automatically). They will be used, if no value is defined at all. It is not necessary the value, that is written in the configuration file on first startup.

In the default values below, a value in the form `$XYZ` refers to an environment variable.

??? tip "Configuration changes require a restart"

    New configuration options will only apply after a restart of SeaTable.

??? abstract "Notes about the configuration file format"

    The configuration file uses the **JSON format** (JavaScript Object Notation), which is a lightweight, text-based format for storing and transmitting structured data. It consists of key-value pairs and nested objects, represented by curly braces {}. Comments are not supported in JSON.

    When dealing with special characters like single quotes ', double quotes ", or backslashes , JSON has specific escaping rules. Double quotes " are used to enclose strings, and special characters within strings should be escaped with a backslash.

    JSON is strict about syntax, particularly with commas. Each key-value pair in an object must be separated by a comma, and there should be no trailing comma after the last key-value pair.

## Example configuration

By default, `dtable_server_config.json` will be empty after the first startup of SeaTable:

```json
{}
```

## Available configuration options

### Redis

| Parameter                     | Description                              | Default |
| ----------------------------- | ---------------------------------------- | ------- |
| `enable_notification_publish` | Enable real-time notifications via Redis | false   |

### Persistence

`dtable-server` keeps bases in memory. After a certain time, the bases are persisted to storage (via dtable-storage-server).

| Parameter       | Description                                                             | Default |
| --------------- | ----------------------------------------------------------------------- | ------- |
| `save_interval` | Auto-save interval for modified bases, in milliseconds. (300000 = 5min) | 300000  |

### Service URLs

| Parameter                   | Description               | Default                |
| --------------------------- | ------------------------- | ---------------------- |
| `dtable_web_service_url`    | dtable-web service URL    | http://127.0.0.1:8000/ |
| `dtable_db_service_url`     | dtable-db service URL     | http://127.0.0.1:7777/ |
| `dtable_storage_server_url` | dtable-storage-server URL | http://127.0.0.1:6666/ |

??? warning "API-Gateway is not configurable"

    API-Gateway URL is not configurable. It is always `dtable_web_service_url + api-gateway`.

### Row Limits

Please note that increasing this value requires corresponding updates in `dtable_web_settings.py`, as detailed [here](../configuration/base-rows-limit.md).

| Parameter             | Description                                                                        | Default |
| --------------------- | ---------------------------------------------------------------------------------- | ------- |
| `base_writable_limit` | Soft limit for rows in a base. Exceeding this shows an error in the web interface. | 100000  |
| `base_max_rows_limit` | Hard limit for rows in a base. Server prevents any writes beyond this number.      | 150000  |

### Base Size Limit

| Parameter       | Description                                                               | Default |
| --------------- | ------------------------------------------------------------------------- | ------- |
| `base_max_size` | Maximum size of a base's JSON file (excluding assets and big data) in MB. | 200     |

### Expert Configuration

It is not recommended to change these values

| Parameter                   | Description                                                                            | Default |
| --------------------------- | -------------------------------------------------------------------------------------- | ------- |
| `worker_threads_num`        | Number of worker threads serving list rows API (for custom shares or view shares only) | 2       |
| `worker_threads_rows_limit` | Maximum rows, returned in custom shares or view shares                                 | 50000   |
| `rows_api_max_limit`        | Maxmum number of rows returned by calling list rows API in dtable-server               | 1000    |
| `redirect_list_rows_api`    | Redirect API requests to the API-Gateway.                                              | false   |

### Cluster Setup

For more information on setting up a SeaTable cluster, which is typically suitable for systems supporting hundreds of users, please contact us.

## Deprecated settings

### MariaDB Database Connection

`dtable-server` used to read the database connection settings from `dtable_server_config.json`.
Since version 5.3, `dtable-server` reads these settings from [environment variables](/configuration/environment-variables) instead.

| Parameter  | Description            | Default           |
| ---------- | ---------------------- | ----------------- |
| `host`     | MariaDB server address | `$DB_HOST`        |
| `user`     | MariaDB username       | root              |
| `password` | MariaDB password       | `$DB_ROOT_PASSWD` |
| `database` | Database name          | dtable_db         |
| `port`     | MariaDB server port    | 3306              |

### Redis Connection

`dtable-server` used to read the Redis connection settings from `dtable_server_config.json`.
Since version 5.3, `dtable-server` reads these settings from [environment variables](/configuration/environment-variables) instead.

| Parameter                     | Description                              | Default |
| ----------------------------- | ---------------------------------------- | ------- |
| `redis_host`                  | Redis server address                     | redis   |
| `redis_password`              | Redis password (often empty)             |         |
| `redis_port`                  | Redis server port                        | 6379    |
| `enable_notification_publish` | Enable real-time notifications via Redis | false   |

### Private Key

Starting with version 5.3, it is no longer required to provide `private_key` that is used to sign JWTs inside the configuration file.
`dtable-server` reads this value from the `JWT_PRIVATE_KEY` [environment variable](/configuration/environment-variables) instead.

| Parameter     | Description                                                                                          | Default |
| ------------- | ---------------------------------------------------------------------------------------------------- | ------- |
| `private_key` | Shared secret for dtable_web connection. Must match `DTABLE_PRIVATE_KEY` in `dtable_web_settings.py` |         |

### API-Limits

The API limits mentioned are no longer applicable. Prior to SeaTable version 5.2, separate API limits existed for dtable-server and dtable-db. However, starting with version 5.2, API requests are now handled by the api-gateway, which enforces unified API limits across the platform.

| Parameter             | Description                            | Default |
| --------------------- | -------------------------------------- | ------- |
| `api_req_max`         | Max API calls to a base per minute.    | 600     |
| `api_base_day_max`    | Max API calls to a base per day.       | 5000    |
| `rows_api_minute_max` | Max listing rows API calls per minute. | 100     |
| `rows_api_hour_max`   | Max listing rows API calls per hour.   | 6000    |

### Slave-Mode and Database-Split

These functions are deprecated and not maintained further.
