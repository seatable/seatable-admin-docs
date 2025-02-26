# Migration from local storage to S3

<!-- md:flag enterprise -->

SeaTable provides migration scripts to migrate the data from local storage to S3. In fact three things have to be migrated:

- Storage data (Snapshots and persisted json files)
- Seafile data (Files/Images Columns)
- Avatars

Thumbnails and temporary files could not be saved to S3, yet.

The migration scripts are delivered with the SeaTable Docker Container and are stored in the folder `/templates/`.

## How to migrate

### Storage data & Seafile data

<!-- md:version 4.3 -->

1. You need four buckets: Let's call them _fs_, _blocks_, _commits_, _storage_.
2. Generate credentials to access these buckets with read and write permissions.
3. use these commands to enter your SeaTable Docker Container (4.3 or higher) and to start with the preparation for the migration. (this is not yet the migration)

```bash
docker exec -it seatable-server bash
cd /templates
./migrate-seafile-data.sh
./migrate-storage-data.sh
```

These two commands will copy your current configuration files to a backup folder.

Now add your S3 configuration to your config files `seafile.conf` and `dtable-storage-server.conf`. Use the instructions from [this article](s3.md).
Be careful, due to historical reasons the settings are different for `seafile.conf` and `dtable-storage-server.conf`.

Now it is time to execute the two commands again. This will start the migration of the data.
**Important:** it is not yet necessary to restart SeaTable. You don't want to activate the new settings.

```bash
docker exec -it seatable-server bash
cd /templates
./migrate-seafile-data.sh
./migrate-storage-data.sh

# after the migration has finished, you can restart SeaTable
seatable.sh restart
```

### Avatars

<!-- md:version 4.4 -->

Before you can start the migration, you have to configure S3 for Avatars in `dtable_web_settings.py`. At this point it is sufficient to add only the configuration parameters starting with `S3_...`. The configuration option `AVATAR_FILE_STORAGE = ...` is not necessary, yet.

After a restart of SeaTable you can start the migration with this command:

```bash
docker exec -it seatable-server bash
cd /opt/seatable/seatable-server-latest/dtable-web
seatable.sh python-env manage.py migrate_avatars_fs2s3
```

You will see how many avatars were migrated and when the migration will be finished:

```bash
# like this...
2024-06-17 ... migrate_avatars_fs2s3 - Success: 1, exists: 0, error: 0, count: 1
2024-06-17 ... migrate_avatars_fs2s3 - Migrate done
```

After successful migration, you can add `AVATAR_FILE_STORAGE = 'django_s3_storage.storage.S3Storage'` to your `dtable_web_settings.py` and restart **SeaTable** and **redis**.

After the migration is done, you can delete the old avatars directories below `/opt/seatable-server/seatable/seahub-data/avatars`. Don't delete the avatars folder itself and don't delete the default logos `default.png` and `app.png`. They are still used.

!!! warning "Security headers might prevent the loading of the images"

    After activating S3 for avatars, the avatars are loaded directly from the S3 storage like `<img src="https://s3.us-east-2.amazonaws.com/...">`.

    Security header configuration in your `seatable-server.yml` might prevent this and you need your S3 url to the Content-Security-Policy.

    ```
    caddy.header.Content-Security-Policy:
        ...
        img-src 'self' data: blob: ... <your-S3-url>
    ```

!!! danger "Avatar bucket must be publicly accessible"

    While other S3 buckets used by SeaTable can remain private, the S3 bucket for avatars must be publicly readable. Once avatars are saved to S3, they are accessed directly from the S3 storage. Therefore, it is necessary to grant read access to everyone (anonymous access) while restricting write access to authenticated users with bucket credentials.
