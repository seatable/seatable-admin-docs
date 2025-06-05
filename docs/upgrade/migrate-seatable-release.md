# Migrate to new installation method

<!-- md:version 4.3.10 -->

To bring your SeaTable Server into the /opt/seatable-compose form used by version 4.3.10 and greater, the following needs to be done:

- Change directory structure
- Change container names
- Modify configuration files
- Remove Python Runner, FAAS Scheduler and OnlyOffice (will be activated again after the migration)

!!! warning "Backup is recommended"

    Updating SeaTable Server might entail changes to your database. To make sure your data is protected in any case, we recommend to create a backup/dump of your databases before the update. See [backup and recovery](../maintenance/backup-recovery.md) for more details.

## Required steps

### 1. Stop all containers

Stop all containers (not only SeaTable) but also Python Runner, FAAS Scheduler and OnlyOffice.

```bash
cd /opt/seatable
docker compose down
```

!!! warning "docker-compose vs docker compose"

    The usage of `docker-compose` (with - in the command) is not supported any longer. Please switch to the new command `docker compose`. Please refer to the [offical install instructions](https://docs.docker.com/compose/install/). For Debian and Ubuntu, this should be sufficient:

    ```bash
    apt update && \
    apt remove docker-compose
    curl -fsSL get.docker.com | bash
    ```

Check for running containers with `docker container list`. Execute `docker stop <container-name>` for containers still running.

### 2. Remove Python Pipeline and OnlyOffice

If you installed OnlyOffice, Python Runner or FAAS Scheduler, you should remove the associated folders.

```bash
rm -r /opt/onlyoffice
rm -r /opt/seatable-python-runner
rm -r /opt/seatable-faas-scheduler
```

### 3. Get password and other values from docker-compose.yml

Open up your current docker-compose.yml with the editor of your choice (such as vim or nano) and note these three values:

- MYSQL_ROOT_PASSWORD
- SEATABLE_SERVER_HOSTNAME
- TIME_ZONE

Rename docker-compose.yml to docker-compose.old so that it is no longer used:

```bash
mv /opt/seatable/docker-compose.yml /opt/seatable/docker-compose.old
```

### 4. Create new .env file.

Copy and paste these commands to download the new installation method.

```bash
mkdir /opt/seatable-compose && \
cd /opt/seatable-compose && \
wget -c https://github.com/seatable/seatable-release/releases/latest/download/seatable-compose.tar.gz \
-O - | tar -xz -C /opt/seatable-compose && \
cp -n .env-release .env
```

Open `/opt/seatable-compose/.env` with your editor of choice and assign the values noted in 3. to these three variable:

- TIME_ZONE
- SEATABLE_MYSQL_ROOT_PASSWORD
- SEATABLE_SERVER_HOSTNAME

Additionally, the two variables SEATABLE_ADMIN_EMAIL and SEATABLE_ADMIN_PASSWORD must be specified. Currently the values are only used during the initial installation but this might change in the future.

!!! success "Developer edition requires an additional variable"

    If you are using SeaTable Developer Edition instead of Enterprise Edition, add the following parameter to your `.env` file. This overwrites the used SeaTable Docker image.

    ``` python
    SEATABLE_IMAGE='seatable/seatable-developer:latest' # (1)!
    ```

    1.  Instead of using the latest tag, you can select any specific version from [https://hub.docker.com/r/seatable/seatable-developer/tags](https://hub.docker.com/r/seatable/seatable-developer/tags).

### 5. Move the license file

!!! warning "SeaTable Enterprise requires a license to start"

    This step is solely required for SeaTable Enterprise Edition. You can skip this step for **SeaTable Developer Edition** and just create an empty file at `/opt/seatable-compose/seatable-license.txt`.

Copy your existing seatable-license.txt to this `/opt/seatable-compose` folder:

```bash
cp /opt/seatable/seatable-data/seatable-license.txt /opt/seatable-compose/
```

### 6. Move two folders

Move two folders, which contain Docker volumnes, to new paths.

```bash
mv /opt/seatable/mysql-data /opt/mariadb
mv /opt/seatable/seatable-data /opt/seatable-server
```

### 7. Change database container in configuration file

Previously, the mariadb container was named **db**. In the new deployment method, we call this container by its full name: **mariadb**. Consequently, we must update the configuration files so as to enable SeaTable to find the SQL-database and connect to it.

All changes must be done in `/opt/seatable-server/seatable/conf`. Update the following configuration files as described with your editor of choice.

```bash
cd /opt/seatable-server/seatable/conf
nano ccnet.conf
# replace ccnet.conf with the other configuration file names and update all files
```

#### ccnet.conf

```bash
HOST = db   # change to mariadb
```

#### dtable-db.conf

No change needed.

#### dtable-events.conf

```bash
[DATABASE]
host = db   # change to mariadb
```

#### dtable_server_config.json

```bash
"host": "db"   # change to mariadb
```

#### dtable-storage-server.conf

No change needed.

#### dtable_web_settings.py

```bash
DATABASES = {
    'default': {
        ...
        'HOST': 'db'   # change to mariadb
        ...
    }
}

SEATABLE_FAAS_URL = 'https://seatable-faas.example.com'  # if you had the Python Runner and FAAS Scheduler configured, remove this variable entirely
SEATABLE_FAAS_AUTH_TOKEN = 'secret_string'     # if you had the Pythong Runner and FAAS Scheduler configured, remove this variable entirely

ENABLE_ONLYOFFICE = False  # if you had OnlyOffice configured, remove this variable entirely
ONLYOFFICE_APIJS_URL = "https://seatable.example.com/onlyofficeds/web-apps/apps/api/documents/api.js"  # if you had OnlyOffice configured, remove this variable entirely
ONLYOFFICE_FILE_EXTENSION = ('doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'odt', 'fodt', 'odp', 'fodp', 'ods', 'fods', 'csv', 'ppsx', 'pps')  # if you had OnlyOffice configured, remove this variable entirely
ONLYOFFICE_JWT_SECRET = 'asecretjwttoken' # if you had OnlyOffice configured, remove this variable entirely
```

#### seafile.conf

```bash
host = db   # change to mariadb
```

### 8. Remove HTTPS from nginx

In this step, the configuration of nginx, which is included in the SeaTable Server container, must be changed to account for the addition of **caddy** in the new deplyoment method to take care of TLS termination and certificate management. Specifically, this requires that nginx no longer listens on port 443 (HTTPS), but only on port 80 (HTTP).

First let's make a copy of your current nginx file to make sure that we have a safety net just in case.

```bash
cp /opt/seatable-server/seatable/conf/nginx.conf /opt/seatable-server/seatable/conf/nginx.backup
```

Now we want to make these changes in the `nginx.conf`:

1. We want to remove the server block which is reponsible for listening to port **80** (or change it to another port)
2. We want to update the second server block and change port **443** to **80**
3. We want to remove all lines that start with **ssl\_**

You can do this with these commands:

```bash
cd /opt/seatable-server/seatable/conf
sed -i 's/ listen 80/ listen 9999/' ./nginx.conf
sed -i 's/ listen 443 ssl/ listen 80/' ./nginx.conf
sed -i '/^[[:space:]]*ssl_/d' ./nginx.conf
```

### 9. Start your SeaTable Server

Now the migration is complete and it is time to start SeaTable Server again.

```bash
cd /opt/seatable-compose
docker compose up -d
```

Be patient and give the containers time to start. Then open your browser and check if you can access your SeaTable Server.

If your SeaTable Server does not react as expected, check the [FAQ/Troubleshooting](../installation/faq.md) article. In case your mariadb container stays unhealthy, check the [Extra upgrade notices for version 4.3](https://admin.seatable.com/upgrade/extra-upgrade-notice/).

Please note that additional components like the Python Pipeline or an integrated Online Editor will not be working at this point.

### 10. Add additional components

To setup the Python Pipeline or an Online Editor, please follow the manuals in the [Installation](https://admin.seatable.com/installation/deployment-approach.md) section.
