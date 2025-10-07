# S3 Encryption

<!-- md:flag enterprise -->

SeaTable supports **SSE-C** (server-side encryption with customer-provided keys) to encrypt objects stored inside the S3 buckets **at rest**.
This applies to both base snapshots and the content of file and image columns.

!!! warning "Incompatibility with Ceph-based object storage providers"

    Please note that certain object storage providers that are based on Ceph (e.g. Hetzner Object Storage) currently do not support `CopyObject` operations when using SSE-C. This makes them incompatible with SeaTable. There is an [open issue](https://tracker.ceph.com/issues/23264) over at the Ceph issue tracker.

## Configuration

To encrypt both base snapshots and assets, you must configure a valid encryption key in **two locations**:

- `dtable-storage-server.conf` to encrypt base snapshots
- `seafile.conf` to encrypt the files stored in file and image columns

These encryption keys can be different.

### Key Generation

SeaTable requires an encryption key that is exactly 32 characters long.

You can generate a valid key with the following command：

```bash
openssl rand -base64 24
```

!!! warning "Losing your SSE-C key results in permanent data loss"

    You should make sure to store the encryption key in a safe location. Losing the key will result in permanent data loss of all encrypted objects.
    Since the cloud storage provider does not store the key (instead, SeaTable provides the key with every request), there's no way to recover the data since the actual objects are encrypted at rest.

!!! info "CLI Usage"

    CLI tools such as [`mc`](https://docs.min.io/community/minio-object-store/reference/minio-mc.html) will reject a key generated using the `openssl` command displayed above.
    They require you to encode the key as base64.
    This can be achieved with the following command:

    ```bash
    # printf ensures that there's no trailing newline character
    printf 'KEY_GENERATED_BY_OPENSSL' | base64
    ```

    In addition, you must **strip** any trailing `=` signs at the end of the key that are used for padding before passing the key to `mc` commands such as `mc put` or `mc get`.

### Base Snapshots

To encrypt base snapshots at rest, you must configure an encryption key inside `dtable-storage-server.conf`:

```ini
[storage backend]
# ...
sse_c_key = YOUR_ENCRYPTION_KEY
```

You must restart SeaTable after applying this configuration change:

```bash
docker restart seatable-server
```

### Assets

To encrypt the file assets stored in file and image columns, you must configure an encryption key inside `seafile.conf` for all three object types (commits, fs and blocks):

```ini
[commit_object_backend]
# ...
sse_c_key = YOUR_ENCRYPTION_KEY

[fs_object_backend]
# ...
sse_c_key = YOUR_ENCRYPTION_KEY

[block_backend]
# ...
sse_c_key = YOUR_ENCRYPTION_KEY
```

You must restart SeaTable after applying this configuration change:

```bash
docker restart seatable-server
```

## Migration

Any objects stored **before** enabling SSE-C won't be accessible after restarting SeaTable since SeaTable does not keep track whether a certain object is encrypted or not.
This requires you to manually encrypt the objects with the configured encryption key.

The easiest way to achieve this is to copy all objects to separate buckets with enabled encryption.
However, certain object storage providers such as [Exoscale](https://community.exoscale.com/product/storage/object-storage/how-to/encryption/#limitations) do not support mirroring objects between buckets with differing encryption configuration settings.

As a workaround, you can **download** all objects to the local filesystem **before** uploading them again with enabled encryption.

This can be achieved with the following `mc` commands:

```bash
mc mirror ${ALIAS}/block1 /tmp/block1 --summary
mc mirror /tmp/block1 ${ALIAS}/block2 --summary --enc-c "${ALIAS}/block2/=${ENCRYPTION_KEY}"

mc mirror ${ALIAS}/commit1 /tmp/commit1 --summary
mc mirror /tmp/commit1 ${ALIAS}/commit2 --summary --enc-c "${ALIAS}/commit2/=${ENCRYPTION_KEY}"

mc mirror ${ALIAS}/fs1 /tmp/fs1 --summary
mc mirror /tmp/fs1 ${ALIAS}/fs2 --summary --enc-c "${ALIAS}/fs2/=${ENCRYPTION_KEY}"

mc mirror ${ALIAS}/storage1 /tmp/storage1 --summary
mc mirror /tmp/storage1 ${ALIAS}/storage2 --summary --enc-c "${ALIAS}/storage2/=${ENCRYPTION_KEY}"
```

!!! info "Note"

    - `${ALIAS}` refers to the configured `mc` alias
    - `block1`, `commit1`, `fs1` and `storage1` refer to the old buckets with **unencrypted** objects
    - `block2`, `commit2`, `fs2` and `storage2` refer to the new buckets that contain **encrypted** objects

Afterwards, you must update the bucket names inside `dtable-storage-server.conf` and `seafile.conf` and restart SeaTable to apply the configuration changes:

```bash
docker restart seatable-server
```
