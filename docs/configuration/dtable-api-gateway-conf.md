# Configuration of api-gateway

This is a cheat sheet for the [api-gateway](/introduction/architecture/#api-gateway) configuration file `dtable-api-gateway.conf`. It contains all possible settings that can be configured as well as their default values.

The default values provided here are best-effort (not built automatically). They will be used, if no value is defined at all.

In the default values below, a value in the form `$XYZ` refers to an environment variable.

??? tip "Configuration changes require a restart"

    New configuration options will only apply after a restart of SeaTable.

??? abstract "Notes about the configuration file format"

    The configuration file uses the **INI format**, which is a simple text-based format for storing configuration data. It consists of sections (denoted by square brackets, e.g., [general]) and key-value pairs.

    Comments in the configuration file start with the hash symbol `#` and extend to the end of the line.

    When dealing with special characters like single quotes `'`, double quotes `"` or the hash symbol `#`, it's generally best to enclose the value in double quotes.

The following options are grouped by their sections.

Please note that SeaTable does not create the `dtable-api-gateway.conf` file by default. The `api-gateway` will use the default configuration values if the file does not exist.

## Available configuration options

### `[general]`

This section contains general settings about api-gateway service.

| Parameter                   | Description                                                                                                                                            | Default   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| `host`                      | The address api-gateway listens on. Defaults to localhost.                                                                                             | localhost |
| `port`                      | The port api-gateway listens on.                                                                                                                       | 7780      |
| `log_dir`                   | Location for the api-gateway logs in the container.                                                                                                    |           |
| `log_level`                 | Only log messages with level priority higher than this will be logged. Supported levels are "debug", "info", "warn", "error", with ascending priority. | info      |
| `base_api_limit_per_minute` | Limits the number of API calls per base per minute. If the option is set to a negative number, like -1, it means there is no limit.                    | 500       |
| `max_base_cache_size`       | Maximum base cache size in MB.                                                                                                                         | 1024      |

### `[cluster]`

This section contains settings about api-gateway working with dtable-server or dtable-db cluster.

| Parameter        | Description                                                                                                                                                                                                                                                | Default        |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `etcd_endpoints` | The address of the etcd, which should be same etcd with the dtable-server or dtable-db cluster. It's required if you enable dtable-server cluster or dtable-db cluster. It supports setting up multiple etcd endpoints like: 127.0.0.1:2379,127.0.0.1:2380 | 127.0.0.1:2379 |

### `[dtable-db]`

This section contains settings about api-gateway working with dtable-db.

| Parameter        | Description                                                                                                                                     | Default        |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `cluster_mode`   | Indicates whether dtable-db is running in cluster mode. Can be `true` or `false`.                                                               | `false`        |
| `server_address` | Address of the dtable-db instance. It's required if `cluster_mode` is set to `false`. You should not set it if `cluster_mode` is set to `true`. | 127.0.0.1:7777 |

### `[dtable-server]`

This section contains settings about api-gateway working with dtable-server.

| Parameter        | Description                                                                                                                                         | Default        |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `cluster_mode`   | Indicates whether dtable-server is running in cluster mode. Can be `true` or `false`.                                                               | `false`        |
| `server_address` | Address of the dtable-server instance. It's required if `cluster_mode` is set to `false`. You should not set it if `cluster_mode` is set to `true`. | 127.0.0.1:7777 |

