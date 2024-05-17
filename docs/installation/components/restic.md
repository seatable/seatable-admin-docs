# Restic Backup

Running your own server always requires a reliable backup to secure your data. With this backup container, obtaining a daily backup is easy. We chose the backup software Restic for its numerous advantages:

- **Target:** Restic supports multiple backup targets, including S3, Backblaze, BorgBase, Dropbox, and Google Drive.
- **Speed:** Backup your data at lightning speed.
- **Encryption:** Your data is securely encrypted. Without the encryption key, it remains inaccessible.
- **Deduplication:** Duplicate files or file fragments are saved only once, reducing the amount of data transmitted.
- **Snapshots:** Forget about regular full backups; only the changes since the last backup need to be saved.
- **Reliability:** With 24k stars on GitHub and nearly a decade of development, restic is exceptionally robust.

## Installation

This article explains how to implement a restic backup for your SeaTable server.

#### Change the .env file

To install the restic backup container, include `restic.yml` in the `COMPOSE_FILE` variable within your `.env` file. This instructs Docker to download the required images.

Simply copy and paste (:material-content-copy:) the following code into your command line:

```bash
sed -i "s/COMPOSE_FILE='\(.*\)'/COMPOSE_FILE='\1,restic.yml'/" /opt/seatable-compose/.env
```

#### Configure your backup

Every backup is encrypted with a password. Please make sure that you store this password at a save place, otherwise your backup will be worthless if you might need it.

```bash
pw=$(pwgen -s 40 1) && echo "Generated restic password: ${pw}"
```

The generated restic password needs to be added to your `.env` file. Copy and paste the following command:

```bash
echo -e "\n# restic-backup" >> /opt/seatable-compose/.env
echo "RESTIC_PASSWORD=${pw}" >> /opt/seatable-compose/.env
```

!!! success "Local Backups are better then no backups"

    This configuration will create daily snapshots including database dumps at your host system at `/opt/restic/local`. This is a good start, but of cause we recommend that you store your backup remotely.

#### Other backup targets

To use another backup target then the local path `/opt/restic/local` you have to provide the additional environment variable `RESTIC_REPOSITORY`. Some backends require additional environment variables for authentication.

Here are some examples. For more details, refer to the [official restic documentation](https://restic.readthedocs.io/).

=== "REST Server"

    ```bash
    RESTIC_REPOSITORY='rest:https://user:pass@host/'
    ```

=== "Amazon S3"

    ```bash
    RESTIC_REPOSITORY='s3:s3.amazonaws.com/bucket_name'
    AWS_ACCESS_KEY_ID='...'
    AWS_SECRET_ACCESS_KEY='...'
    ```

=== "Backblaze B2"

    ```bash
    RESTIC_REPOSITORY='s3:s3.amazonaws.com/bucket_name'
    B2_ACCOUNT_ID='...'
    B2_ACCOUNT_KEY='...'
    ```

=== "rclone"

    rclone is already installed in the backup container and expects the configuration file at `/root/.config/rclone/rclone.conf`. Generate your rclone.conf at the host and mount it to the container at this location. Then you can use restic with rclone as described in the manual.

    ```bash
    volumes:
        ...
        - /opt/restic/rclone.conf:/root/.config/rclone/rclone.conf:ro
    ```

    ```bash
    RESTIC_REPOSITORY='rclone:xxx:yyy'
    ```

## Start the backup

Now it is time to load the container and start the backup for the first time.

```bash
cd /opt/seatable-compose && \
docker compose up -d
```

Afterwards check the logs for more details.

```bash
docker logs restic-backup
```

The output might look like this:

```console
[2024-05-17 16:16] Starting the restic backup container ...
[2024-05-17 16:16] Restic repository '/local' does not exists.
  Running restic init.
  created restic repository 7982e3a700 at /local

Please note that knowledge of your password is required to access the repository
Losing your password means that your data is irrecoverably lost.
[2024-05-17 16:16] Setup backup cron job with cron expr. BACKUP_CRON: 20 2 * * *
[2024-05-17 16:16] Setup check cron job with cron expr. CHECK_CRON: 40 3 * * 6
[2024-05-17 16:16] Container started successful.
  The restic repository is initialized, cron daemon runs...
  Ready for backup!
```

:material-party-popper: **Perfect!** Your backup was initialized and will run every day at 2.20am.

More information about the usage of the restic backup container can be found at the github repository [:simple-github: restic-backup-docker](https://github.com/seatable/restic-backup-docker).
