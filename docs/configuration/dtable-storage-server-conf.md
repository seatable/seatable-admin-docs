# Configuration of dtable-storage-server

This is a cheat sheet for the [dtable-storage-server](/introduction/architecture/#dtable-storage-server) configuration file `dtable-storage-server.conf`. It contains all possible settings that can be configured as well as their default values.

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
[general]
log_dir = /opt/seatable/logs
temp_file_dir = /tmp/tmp-storage-data

[storage backend]
type = filesystem
path = /opt/seatable/storage-data

[snapshot]
interval = 86400
keep_days = 180
```

## Available configuration options

### `[general]`

This section contains general settings about the `dtable-storage-server` service.

| Parameter       | Description                                                                            | Default                             |
| --------------- | -------------------------------------------------------------------------------------- | ----------------------------------- |
| `host`          | The address `dtable-storage-server` listens on.                                        | `127.0.0.1`                         |
| `port`          | The port `dtable-storage-server` listens on.                                           | `6666`                              |
| `log_dir`       | The directory that dtable-storage-server writes logs to.                               | Directory of the configuration file |
| `temp_file_dir` | The directory that dtable-storage-server creates buffers in. This setting is required. |                                     |

### `[storage backend]`

This section is used to configure the storage backend.

| Parameter | Description                                                     | Default     |
| --------- | --------------------------------------------------------------- | ----------- |
| `type`    | The type of storage backend. Options are `filesystem` and `s3`. | `fileystem` |

Depending on the chosen storage backend, there are additional settings:

#### Filesystem Storage Backend

| Parameter | Description                      | Default                      |
| --------- | -------------------------------- | ---------------------------- |
| `path`    | The filepath of storage backend. | `/opt/seatable/storage-data` |

#### S3 Storage Backend

| Parameter            | Description                                                                                                                      | Default |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `bucket`             | The bucket name for the S3 backend.                                                                                              |         |
| `key_id`             | The access key id for the bucket.                                                                                                |         |
| `key`                | The secret access key fro the bucket.                                                                                            |         |
| `use_v4_signature`   | Whether to use v4 signature. For a S3-compatible storage, it should be `false`.                                                  |         |
| `aws_region`         | The AWS region (only when v4 signature is used).                                                                                 |         |
| `host`               | The host address of S3 backend. Required for S3-compatible storage. Optional for AWS S3, but can be set to the endpoint you use. |         |
| `path_style_request` | Whether to use path style requests. For a S3-compatible storage, it should be `true`.                                            |         |
| `use_https`          | Whether to use https.                                                                                                            |         |
| `sse_c_key`          | Use server-side encryption with customer-provided keys (SSE-C). This setting is optional.                                        |         |

##### SSE-C

`sse_c_key` is a string of 32 characters.

You can generate `sse_c_key` with the following command：

```bash
openssl rand -base64 24
```

!!! warning "Incompatibility with Ceph-based object storage"

    Please note that certain object storage providers that are based on Ceph (e.g. Hetzner Object Storage) currently do not support `CopyObject` operations when using SSE-C. This makes them incompatible with SeaTable. There is an [open issue](https://tracker.ceph.com/issues/23264) over at the Ceph issue tracker.

### `[snapshot]`

<!-- md:version 5.2 -->

| Parameter             | Description                                                                                                                                                                                | Default |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- |
| `interval`            | The interval for generating snapshots of a base, if there are changes to the base. Unit is in seconds.                                                                                     | 86400   |
| `enable_cleanup`      | Controls snapshot cleanup. Activate on only one node in multi-server setups.                                                                                                               | true    |
| `keep_days`           | Specifies the snapshot retention period in days. Older snapshots are deleted. As of version 5.2, the default is 180 days; previously, it was unlimited (0).                                | 180     |
| `keep_frequency_days` | Specifies daily snapshot period for changed bases. After this, only one snapshot per month is kept. Default is 0 (always daily). Requires keep_days to be set and > `keep_frequency_days`. | 0       |
| `cleanup_at`          | Specifies the time when old snapshots are deleted.                                                                                                                                         | 03:00   |

By default, SeaTable creates daily snapshots for changed bases, deleting snapshots older than 180 days. The cleanup

**Since version 5.2**, SeaTable offers a tiered retention strategy for snapshots. This approach balances recent, detailed backups with efficient long-term storage.
For example, setting `keep_days = 180` and `keep_frequency_days = 7` would retail:

- Daily snapshots for the past week
- Monthly snapshots for the past six months, except for the past week.

#### Possible combinations of  `keep_days` and `keep_frequency_days` for new tiered snapshot retention

| Condition	| Action | 
| --- | ---- | 
| `keep_days = 0` | No snapshots are deleted, no matter of `keep_frequency_days`. |
| `keep_frequency_days = 0` and `keep_days > 0` | All snapshots older than `keep_days` are deleted. |
| `keep_frequency_days > 0` and `keep_days > 0` | Snapshots older than `keep_days` are deleted immediately, while snapshots older than `keep_frequency_days` but not exceeding `keep_days` are grouped by month to apply frequency-based cleaning logic. |