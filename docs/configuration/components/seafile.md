# Configuration of Seafile

This is a cheat sheet for the [seaf-server](/introduction/architecture/#seaf-server) configuration file `seafile.conf`. It contains all possible settings that can be configured as well as their default values.

The default values provided here are best-effort (not built automatically). They will be used, if no value is defined at all. It is not necessary the value, that is written in the configuration file on first startup.

In the default values below, a value in the form `$XYZ` refers to an environment variable.

??? tip "Configuration changes require a restart"

    New configuration options will only apply after a restart of SeaTable.

??? abstract "Notes about the configuration file format"

    The configuration file uses the **INI format**, which is a simple text-based format for storing configuration data. It consists of sections (denoted by square brackets, e.g., [general]) and key-value pairs.

    Comments in the configuration file start with the hash symbol `#` and extend to the end of the line.

    When dealing with special characters like single quotes `'`, double quotes `"` or the hash symbol `#`, it's generally best to enclose the value in double quotes.

The following options are grouped by their sections.

## Example configuration

This is a typical configuration file, created automatically on the first startup by SeaTable.

```ini
[fileserver]
port=8082

[history]
keep_days = 60
```

## Available configuration options

### `[fileserver]`

| Parameter        | Description                                                                                        | Default |
| ---------------- | -------------------------------------------------------------------------------------------------- | ------- |
| `host`           | The address the fileserver listens on. You can set this to `127.0.0.1` to further restrict access. | 0.0.0.0 |
| `port`           | The port the fileserver listens on.                                                                | 8082    |
| `worker_threads` | The number of worker threads used to serve HTTP requests.                                          | 10      |
| `max_download_dir_size` | Maximum size of the assets in a base that could be exported via command line in MB.         | 100     |

### `[history]`

| Parameter   | Description                                    | Default |
| ----------- | ---------------------------------------------- | ------- |
| `keep_days` | How many days the file history should be kept. | 60      |

### `[database]`

Since version 5.3, Seafile reads the main database configuration settings from [environment variables](/configuration/environment-variables).

The following options are optional and can be used to further tweak Seafile:

| Parameter            | Description                                           | Default |
| -------------------- | ----------------------------------------------------- | ------- |
| `connection_charset` | The connection charset to use.                        |         |
| `max_connections`    | Size of the connection pool for database connections. | 100     |

## Deprecated or removed options

### `[database]`

??? note "[database] is not necessary anymore"

    Since version 5.3, `Seafile` reads the main database settings from [environment variables](/configuration/environment-variables).

    The section `[database]` contained options for accessing the MariaDB database used by `Seafile`.

    - `type`: Database connection type. Use `mysql` for MySQL and MariaDB. Other databases are not yet supported.
    - `host`: Address of database. You must provide this option.
    - `port`: Port of database. Defaults to 3306.
    - `username`: Username for login to the database. You must provide this option.
    - `password`: Password for the database user. You must provide this option.
    - `db_name`: Database name used by `seafile_db`. You must provide this option.
