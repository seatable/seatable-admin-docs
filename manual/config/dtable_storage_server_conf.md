# DTable Storage Server Config

DTable storage server provides persistent storage for bases and backup service for dtable-db. It supports file system, S3 storage backends. This component is added in version 3.0.

## Configration example

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

- `type`: The type of storage backend. Options are `filesystem`, `oss`, and `s3`. Default is `filesystem`.

For filesystem storage backend:

- `path`: The filepath of storage backend.

For Alibaba Cloud OSS storage backend:

- `bucket`: The bucket name of OSS backend.
- `key_id`: The access key id of OSS backend.
- `key`: The access key of OSS backend.
- `endpoint`: The endpoint address of OSS backend.

For S3 storage backend:

- `bucket`: The bucket name of S3 backend.
- `key_id`: The access key id of S3 backend.
- `key`: The access key of S3 backend.
- `use_v4_signature`: Whether to use v4 signature. For a S3-compatible storage, it should be `false`.
- `aws_region`: The region of S3 backend. (only when v4 signature is used)
- `host`: The host address of S3 backend. Required for S3-compatible storage. Optional for AWS S3, but can be set to the endpoint you use.
- `path_style_request`: Whether to use path style requests. For a S3-compatible storage, it should be `true`.
- `use_https`: Whether to use https.

### snapshot

Configurations for snapshots of bases

* interval: the interval for generating snapshots for a base
* keep_days: the number of days to keep snapshots
