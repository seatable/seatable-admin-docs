# DTable Storage Server Config

DTable storage server provides backup service for dtable-db in SeaTable server. You can store files in various kinds of storage backends.

## Configuration

A configuration file which specified by command-line flag can use following options:

In `[general]` section:

- `host`: The address that dtable-storage-server listens on. Default is `0.0.0.0`.
- `port`: The port that dtable-storage-server listens on. Default is `6666`.
- `log_dir`: The directory that dtable-storage-server writes logs to. Default is the dir of configuration file.

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

### Configuration Example

```
[general]
host = 0.0.0.0
port = 6666
log_dir = .

[snapshot]
interval = 86400

[storage backend]
type = filesystem
path = /path/to/storage

```
