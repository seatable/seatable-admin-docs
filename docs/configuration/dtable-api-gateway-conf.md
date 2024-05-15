# dtable-api-gateway

dtable-api-gateway is responsible for providing external users with direct access to the API.

## Configurations

The configuration options are available in `dtable-api-gateway-conf`. The options are grouped in sections.

### `[general]`

This section contains general settings about api-gateway service.

- `host`: The address api-gateway listens on. Defaults to localhost.
- `port`: The port api-gateway listens on. Defaults to 7780.
- `log_dir`: Location for the api-gateway logs in the container.
- `max_base_cache_size`: The maximum base size sum that can be cached, in bytes. Defaults to 1<<30 (about 1GB).
- `log_level`: Only log messages with level priority higher than this will be logged. Supported levels are "debug", "info", "warn", "error", with ascending priority. The default is "info".
- `base_api_limit_per_minute`: Limits the number of API calls per base per minute. If the option is set to a negative number, like -1, it means there is no limit. Default is 500.

### `[cluster]`

This section contains settings about api-gateway working with dtable-server or dtable-db cluster.

- `etcd_endpoints`: The address of the etcd, which should be same etcd with the dtable-server or dtable-db cluster. It's required if working with dtable-server cluster or dtable-db cluster. Defaults to 127.0.0.1:2379.

### `[dtable-db]`

This section contains settings about api-gateway working with dtable-db.

- `cluster_mode`: Indicates whether dtable-db is running in cluster mode. Defaults to false.
- `server_address`: Address of the dtable-db instance, it's required if dtable-db is not running in cluster mode. And it can be ignored if dtable-db is running in cluster mode. Defaults to 127.0.0.1:7777.

### `[dtable-server]`

This section contains settings about api-gateway working with dtable-server.

- `cluster_mode`: Indicates whether dtable-server is running in cluster mode. Defaults to false.
- `server_address`: Address of the dtable-server instance, it's required if dtable-server is not running in cluster mode. And it can be ignored if dtable-server is running in cluster mode. Defaults to http://127.0.0.1:5000.

## Example configuration

```
[general]
log_dir = ./log
host = "127.0.0.1"
port = 7780
log_level = info

[cluster]
etcd_endpoints = "127.0.0.1:2379"

[dtable-db]
cluster_mode = false
server_address = "127.0.0.1:7777"

[dtable-server]
cluster_mode = false
server_address = "http://127.0.0.1:5000"
```
