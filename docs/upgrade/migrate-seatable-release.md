# Migrate to new installation method

<!-- md:version 4.3 -->

The new installation method makes future updates and the installation of additional components child's play.

To bring SeaTable Server into the new form, the following things must happen:

- Directory structure changes.
- Container names change.
- Configuration files must be adapted.

The Python Runner, FAAS Scheduler and OnlyOffice will be removed. Then can easily be installed again afterwords with the new method.

## Required steps

### 1. Stop all containers

Stop all containers (not only SeaTable) but also Python Runner, Faas-Scheduler and OnlyOffice.

```bash
cd /opt/seatable
docker compose down
```

!!! warning "docker-compose vs docker compose"

    The usage of `docker-compose` (with - in the command) is not supported any longer. Please switch to the new command `docker compose`. Please ask google for help with your linux system. For debian and ubuntu this might be sufficient:

    ```bash
    apt update && \
    apt remove docker-compose
    curl -fsSL get.docker.com | bash
    ```

Check with `docker ps` if containers still run and execute `docker stop <container-name>` to stop all containers.

### 2. Remove Python Pipeline and OnlyOffice

If you installed onlyoffice, python runner or faas scheduler, you should now remove them.

```bash
rm -r /opt/onlyoffice
rm -r /opt/seatable-python-runner
rm -r /opt/seatable-faas-scheduler
```

### 3. Get parameters password from current docker-compose.yml

Open up your current docker-compose.yml with the editor of your choice and note down these two values:

- MYSQL_ROOT_PASSWORD
- TIME_ZONE

Rename docker-compose.yml to docker-compose.old to prevent that it is used anylonger. The command is

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

Open `/opt/seatable-compose/.env` with your editor of choice (like vim or nano) and update these values according to your needs:

1. TIME_ZONE
2. SEATABLE_MYSQL_ROOT_PASSWORD
3. SEATABLE_SERVER_HOSTNAME

The two values SEATABLE_ADMIN_EMAIL and SEATABLE_ADMIN_PASSWORD have to be set, because the values are expects. Currently the values are only used during the initial installation but this might change in the future.

!!! success "Developer edition requires an additional variable"

    If you are using SeaTable Developer Edition instead of Enterprise Edition, add the following parameter to your `.env` file. This overwrites the used SeaTable Docker image.

    ``` python
    SEATABLE_IMAGE='seatable/seatable-developer:latest' # (1)!
    ```

    1.  Instead of latest you can select a concrete version from [https://hub.docker.com/r/seatable/seatable-developer/tags](https://hub.docker.com/r/seatable/seatable-developer/tags).

### 5. Move the license file

!!! warning "SeaTable Enterprise requires a license to start"

    This step is solely required for SeaTable Enterprise Edition installation. You can bypass this step for **SeaTable Developer Edition** and just create an empty file at `/opt/seatable-compose/seatable-license.txt`.

Copy your existing seatable-license.txt to this `/opt/seatable-compose` folder. The command for that should be:

```bash
cp /opt/seatable/seatable-data/seatable-license.txt /opt/seatable-compose/
```

### 6. Move some folder

With this command you will move two folders to new locations.

```bash
mv /opt/seatable/mysql-data /opt/mariadb
mv /opt/seatable/seatable-data /opt/seatable-server
```

### 7. Change database container in configuration file

In former times the mariadb container was named **db**. In the future we would like to call this container **mariadb**. Therefore we have to update the configuration files that SeaTable can find the SQL-database and connect to it.

All changes have to be done in `/opt/seatable-server/seatable/conf`. These are the configuration files that have to be updated with your editor of choice.

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
```

#### seafile.conf

```bash
host = db   # change to mariadb
```

### 8. Remove HTTPS from nginx

In this last step we want to change the configuration of the nginx, which is included in the SeaTable Server container. In the past this nginx was listing on the ports 80 (HTTP) and 443 (HTTPS) and in the future nginx should only listen to port 80. The TLS Termination and the management of the certificates will be done in the future with **caddy** (which is much simpler).

First let's make a copy of your current nginx file to make sure that we have a safety leash.

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

Now the migration is complete and it is time to start your SeaTable Server again.

```bash
cd /opt/seatable-compose
docker compose up -d
```

Be patent and give the containers time to start. Then open your browser and check if you can reach your SeaTable server.

If something is not working, check the [FAQ/Troubleshooting](../installation/faq.md) article. In the case that your mariadb container stays unhealth, check the [Extra upgrade notices for version 4.3](https://admin.seatable.io/upgrade/extra-upgrade-notice/).
