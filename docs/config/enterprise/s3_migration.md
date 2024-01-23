# Migration from local storage to S3

Since SeaTable version 4.3, SeaTable provides migration scripts to migrate the local data to S3. In fact two things have to be migrated:

- Storage data (Snapshots and persisted json files)
- Seafile data (Files/Images Columns)

Avatars, thumbnails and temporary files could not be saved to S3, yet.

The migration scripts are delivered with the SeaTable Docker Container and are stored in /templates/.

## How to migrate

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
