# Migration from local storage to S3

SeaTable provides migration scripts to migrate the local data to S3. In fact three things have to be migrated:

- Storage data (Snapshots and persisted json files)
- Seafile data (Files/Images Columns)
- Avatars

Thumbnails and temporary files could not be saved to S3, yet.

The migration scripts are delivered with the SeaTable Docker Container and are stored in /templates/.

## How to migrate

### Storage data & Seafile data

<!-- md:version 4.3 -->
<!-- md:flag enterprise -->

1. You need four buckets: Let's call them fs, blocks, commits, storage.
2. Generate credentials to access these buckets and read and write data to it.
3. enter your SeaTable Container (4.3 or higher) and execute these commands

```bash
docker exec -it seatable-server bash
cd /templates
./migrate-seafile-data.sh
./migrate-storage-data.sh
```

This will copy your current config to a backup folder.

Now add your S3 configuration to your config files "seafile.conf" and "dtable-storage-server.conf". Use the instructions from here:
https://admin.seatable.io/config/enterprise/S3/. Be careful, due to historical reasons the settings are different for seafile.conf and dtable-storage-server.conf.

enter the container again and execute the migration commands again. After the migration you can restart SeaTable service.

```bash
docker exec -it seatable-server bash
cd /templates
./migrate-seafile-data.sh
./migrate-storage-data.sh
seatable.sh restart
```

### Avatars

<!-- md:version 4.4 -->
<!-- md:flag enterprise -->

Before you can start the migration, you have to configure S3 for Avatars in `dtable_web_settings.py`. At this point it is sufficient to add only the configuration parameters starting with `S3_...`.
`AVATAR_FILE_STORAGE = ...` is not necessary, yet.

After a restart you can start the migration with this command:

```
docker exec -it seatable-server bash
cd /opt/seatable/seatable-server-latest/dtable-web
seatable.sh python-env manage.py migrate_avatars_fs2s3
```

You will see how many avatars were migrated and when the migration will be finished:

```
2024-06-17 ... migrate_avatars_fs2s3 - Success: 1, exists: 0, error: 0, count: 1
2024-06-17 ... migrate_avatars_fs2s3 - Migrate done
```

After successful migration, you can add `AVATAR_FILE_STORAGE = 'django_s3_storage.storage.S3Storage'` to your `dtable_web_settings.py and restart **SeaTable** and **memcached**.

After the migration is done, you can delete the old avatars directories below `/opt/seatable-server/seatable/seahub-data/avatars`. Don't delete the avatars folder itself and don't delete the default logos `default.png` and `app.png`. They are still used.

!!! warning "Security headers might prevent the loading of the images"

    After activating S3 for avatars, the avatars are loaded directly from the S3 storage like `<img src="https://s3.us-east-2.amazonaws.com/...">`.

    Security header configuration in your `seatable-server.yml` might prevent this and you need your S3 url to the Content-Security-Policy.

    ```
    caddy.header.Content-Security-Policy:
        ...
        img-src 'self' data: blob: ... <your-S3-url>
    ```
