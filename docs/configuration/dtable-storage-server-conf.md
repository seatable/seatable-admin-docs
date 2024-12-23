# DTable Storage Server config

DTable storage server provides persistent storage for bases and backup service for dtable-db. It supports file system, S3 storage backends. This component is added in version 3.0.

## Configuration example

```
[general]
host = 127.0.0.1
port = 6666
log_dir = .
temp_file_dir = ./tmp

[storage backend]
type = filesystem
path = /path/to/storage

[snapshot]
interval = 86400
keep_days = 180
```


## Configuration

### general

In `[general]` section:

- `host`: The address that dtable-storage-server listens on. Default is `127.0.0.1`.
- `port`: The port that dtable-storage-server listens on. Default is `6666`.
- `log_dir`: The directory that dtable-storage-server writes logs to. Default is the dir of configuration file.
- `temp_file_dir`: The directory that dtable-storage-server create buffers in. _Required_

### Storage backend

In `[storage backend]` section:

- `type`: The type of storage backend. Options are `filesystem`, and `s3`. Default is `filesystem`.

For filesystem storage backend:

- `path`: The filepath of storage backend.


For S3 storage backend:

- `bucket`: The bucket name of S3 backend.
- `key_id`: The access key id of S3 backend.
- `key`: The access key of S3 backend.
- `use_v4_signature`: Whether to use v4 signature. For a S3-compatible storage, it should be `false`.
- `aws_region`: The region of S3 backend. (only when v4 signature is used)
- `host`: The host address of S3 backend. Required for S3-compatible storage. Optional for AWS S3, but can be set to the endpoint you use.
- `path_style_request`: Whether to use path style requests. For a S3-compatible storage, it should be `true`.
- `use_https`: Whether to use https. It's recommende to set to `true`.
- `sse_c_key`: Use server-side encryption with customer-provided keys (SSE-C).

`sse_c_key` is a random string of 32 characters.

You can generate `sse_c_key` with the following command. Please note that, this is not the only valid command to generate such keys. You can use any command that generates a 32 character random string.

```
openssl rand -base64 24
```

### Snapshot

Configurations for snapshots of bases

* `interval`: the interval for generating snapshots for a base, if there are changes to the base. The unit is seconds. Default is 24 hours.
* `enable_cleanup`: controls whether to clean up snapshots. Default is `true`. In cluster deployment, only one node should run snapshot cleanup routine, since all nodes share the same storage backend. In this case you should only enable this option in one node. (**This option is added in 5.2 version.**)
* `keep_days`: the number of days to keep snapshots. **Since 5.2 version, the default value of this option is changed to 180 (which is 0 for previous versions). Please set it explicitly to 0 if you want to keep all the snapshots forever.**
* `keep_frequency_days`: Within the specified days, snapshots for a base will be created daily (if any changes to the base). Snapshots created before the specified days will have a lower retention "frequency", that is, only 1 snapshot will be kept per month. The default value is 0, which means snapshots are always created daily. **This option only works when `keep_days` is also set and `keep_days` >= `keep_frequency_days`.** For example, if you set keep_days = 90 and keep_frequency_days = 30, snapshots will be created daily for the last 30 days, but only one snapshot per month will be kept from the last 30 to 90 days. (**This option is added in 5.2 version.**)
