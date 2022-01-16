# DTable Storage Server Config

DTable storage server provides backup service for dtable-db in SeaTable server. You can store files in various kinds of storage backends. This component will be added in version 2.8.

## Configuration

A configuration file which specified by command-line flag can use following options:

In `[general]` section:

- `host`: The address that dtable-storage-server listens on. Default is `127.0.0.1`.
- `port`: The port that dtable-storage-server listens on. Default is `6666`.
- `log_dir`: The directory that dtable-storage-server writes logs to. Default is the dir of configuration file.
- `temp_file_dir`: The directory that dtable-storage-server create buffers in. _Required_

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

In `[database]` section:

- `addr`: The network address of database. For example `127.0.0.1:3306` . _Required_
- `user`: The username used to connect database. _Required_
- `password`: The password used to connect database. Default is empty.
- `db_name`: The database name that will be connected to. _Required_
- `collation`: The connection collation that will be used. Default is `utf8mb4_general_ci`.

### Configuration Example

```
[general]
host = 127.0.0.1
port = 6666
log_dir = .
temp_file_dir = ./tmp

[storage backend]
type = filesystem
path = /path/to/storage

[database]
addr = 127.0.0.1:3306
user = root
password = PASSWORD
db_name = dtable_storage_server
collation = utf8mb4_general_ci

```
