---
description: Complete reference for all api-gateway configuration options including rate limits and cluster settings.
---

# Configuration of api-gateway

This is a cheat sheet for the possible configuration options of the [api-gateway](../../introduction/architecture.md#api-gateway).
It contains all possible settings that can be configured as well as their default values.

The default values provided here are best-effort (not built automatically). They will be used if no value is defined at all.

??? tip "Configuration changes require a restart"

    New configuration options will only apply after a restart of SeaTable.

## Environment Variables

<!-- md:version 6.2 -->

This section lists the environment variables read by the [api-gateway](../../introduction/architecture.md#api-gateway).
Please read our guide that explains how you can [customize the configuration](../customizations.md) of your SeaTable instance before you proceed.

### General

| Environment Variable                    | Description                                         | Default |
| --------------------------------------- | --------------------------------------------------- | ------- |
| `API_GATEWAY_HOST`                      | The address the api-gateway listens on.             | 0.0.0.0 |
| `API_GATEWAY_PORT`                      | The port the api-gateway listens on.                | 7780    |
| `API_GATEWAY_MAX_BASE_CACHE_SIZE`       | Maximum base cache size in MB.                      | 1024    |
| `API_GATEWAY_BASE_API_LIMIT_PER_MINUTE` | Limits the number of API calls per base per minute. | 500     |

### dtable-db

| Environment Variable  | Description                    | Default               |
| --------------------- | ------------------------------ | --------------------- |
| `INNER_DTABLE_DB_URL` | URL of the dtable-db instance. | http://127.0.0.1:7777 |

### dtable-server

| Environment Variable      | Description                        | Default               |
| ------------------------- | ---------------------------------- | --------------------- |
| `INNER_DTABLE_SERVER_URL` | URL of the dtable-server instance. | http://127.0.0.1:5000 |

### Metrics

| Environment Variable                    | Description                                                          | Default |
| --------------------------------------- | -------------------------------------------------------------------- | ------- |
| `API_GATEWAY_METRICS_ENABLE_BASIC_AUTH` | Whether basic authentication is enabled for the `/metrics` endpoint. | false   |
| `API_GATEWAY_METRICS_USERNAME`          | Username for basic authentication for the `/metrics` endpoint.       |         |
| `API_GATEWAY_METRICS_PASSWORD`          | Password for basic authentication for the `/metrics` endpoint.       |         |

### Access Logs

| Environment Variable                          | Description                                                                              | Default |
| --------------------------------------------- | ---------------------------------------------------------------------------------------- | ------- |
| `API_GATEWAY_ENABLE_ACCESS_LOG`               | Whether the api-gateway logs information about incoming HTTP requests to a Redis stream. | false   |
| `API_GATEWAY_ACCESS_LOG_REDIS_STREAM_KEY`     | Key of the Redis stream that will contain access log entries.                            |         |
| `API_GATEWAY_ACCESS_LOG_REDIS_STREAM_MAX_LEN` | Maximum length of the Redis stream.                                                      | 100000  |

## Configuration File (Legacy)

!!! warning "Configuration file is not read anymore from v6.2 onwards"

    `dtable-api-gateway.conf` will not be read anymore after upgrading from v6.1 to v6.2.

    Please migrate any custom settings to the respective [environment variables](#environment-variables).

The following section describes the structure and possible configuration values of the configuration file `dtable-api-gateway.conf`.

??? abstract "Notes about the configuration file format"

    The configuration file uses the **INI format**, which is a simple text-based format for storing configuration data. It consists of sections (denoted by square brackets, e.g., [general]) and key-value pairs.

    Comments in the configuration file start with the hash symbol `#` and extend to the end of the line.

    When dealing with special characters like single quotes `'`, double quotes `"` or the hash symbol `#`, it's generally best to enclose the value in double quotes.

**Example Configuration**

SeaTable does not create the `dtable-api-gateway.conf` file by default. The `api-gateway` will use the default configuration values if the file does not exist.

### `[general]`

This section contains general settings about api-gateway service.

| Parameter                   | Description                                                                                                                                            | Default   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `host`                      | The address api-gateway listens on. Defaults to localhost.                                                                                             | localhost |
| `port`                      | The port api-gateway listens on.                                                                                                                       | 7780      |
| `log_dir`                   | Location for the api-gateway logs in the container.                                                                                                    |           |
| `log_level`                 | Only log messages with level priority higher than this will be logged. Supported levels are "debug", "info", "warn", "error", with ascending priority. | info      |
| `base_api_limit_per_minute` | Limits the number of API calls per base per minute.                                                                                                    | 500       |
| `max_base_cache_size`       | Maximum base cache size in MB.                                                                                                                         | 1024      |

### `[cluster]`

This section contains settings about api-gateway working with dtable-server or dtable-db cluster.

| Parameter        | Description                                                                                                                                                                                                                                                | Default        |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `etcd_endpoints` | The address of the etcd, which should be same etcd with the dtable-server or dtable-db cluster. It's required if you enable dtable-server cluster or dtable-db cluster. It supports setting up multiple etcd endpoints like: 127.0.0.1:2379,127.0.0.1:2380 | 127.0.0.1:2379 |

### `[dtable-db]`

This section contains settings about api-gateway working with dtable-db.

| Parameter             | Description                                                                                                                                 | Default               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `cluster_mode`        | Indicates whether dtable-db is running in cluster mode. Can be `true` or `false`.                                                           | `false`               |
| `inner_dtable_db_url` | URL of the dtable-db instance. It's required if `cluster_mode` is set to `false`. You should not set it if `cluster_mode` is set to `true`. | http://127.0.0.1:7777 |

### `[dtable-server]`

This section contains settings about api-gateway working with dtable-server.

| Parameter                 | Description                                                                                                                                     | Default               |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `cluster_mode`            | Indicates whether dtable-server is running in cluster mode. Can be `true` or `false`.                                                           | `false`               |
| `inner_dtable_server_url` | URL of the dtable-server instance. It's required if `cluster_mode` is set to `false`. You should not set it if `cluster_mode` is set to `true`. | http://127.0.0.1:5000 |

## Deprecated or removed options

### `[dtable-db]`

- `server_address`: This option has been renamed to `inner_dtable_db_url` in v6.1 for consistency reasons. `server_address` is still read as of v6.1.

### `[dtable-server]`

- `server_address`: This option has been renamed to `inner_dtable_server_url` in v6.1 for consistency reasons. `server_address` is still read as of v6.1.
