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
- `use_https`: Whether to use https.
- `sse_c_key`: Use server-side encryption with customer-provided keys (SSE-C).

`sse_c_key` is a string of 32 characters.

You can generate `sse_c_key` with the following command：
```
openssl rand -base64 24
```

!!! warning "Incompatibility with Ceph-based object storage"

    Please note that certain object storage providers that are based on Ceph (e.g. Hetzner Object Storage) currently do not support `CopyObject` operations when using SSE-C. This makes them incompatible with SeaTable. There is an [open issue](https://tracker.ceph.com/issues/23264) over at the Ceph issue tracker.

### Snapshot

Configurations for snapshots of bases

* interval: the interval for generating snapshots for a base. The unit is seconds. Default is 24 hours.
* keep_days: the number of days to keep snapshots. Default is 0, which means snapshots will be kept forever.
