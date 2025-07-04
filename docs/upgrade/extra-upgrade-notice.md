# Extra upgrade notice

## 5.3

SeaTable v5.3 introduces several significant changes. To make the transition as smooth as possible, we’ve provided a script that handles most of the work for you. Simply run the script to get started.

```bash
bash /opt/seatable-compose/migrate/migrate_5.2_5.3.sh
```

Of course, you can skip this script and make the changes manually. The following sections explain each change in detail, but this approach requires a deeper understanding of SeaTable and Docker.

??? warning "Centralized secret for secure communication"

    SeaTable uses a **JWT secret** for secure communcation between the SeaTable components: `dtable-web`, `dtable-server` and `dtable-db`. 
    
    Before v5.3, this secret was stored in `dtable_web_settings.py` and `dtable_server_config.json`. 
    
    Starting with v5.3, this **JWT secret** should be provided via environment variable `JWT_PRIVATE_KEY` in your `/opt/seatable-compose/.env` file. 

    === "Script (easy way)"

        Execute the migration script below; you only need to run it once.
 
        ```bash
        bash /opt/seatable-compose/migrate/migrate_5.2_5.3.sh
        ```

    === "Manual"

        - Retrieve the value of `private_key` from `dtable_server_config.json`.
        - Add the environment variable `JWT_PRIVATE_KEY=xxx` to your .env file.
        - Remove the `private_key` entry from `dtable_server_config.json`.
        - Remove the `DTABLE_PRIVATE_KEY` entry from `dtable_web_settings.py`.

??? warning "Centralized MariaDB and Redis configuration"

     Starting with version 5.3, SeaTable no longer stores database and Redis credentials in configuration files, but centrally as environment variables. This eliminates redundant configuration settings and makes the configuration files much smaller.

    === "Script (easy way)"

        Execute the migration script below; **you only need to run it once**.

        ```bash
        bash /opt/seatable-compose/migrate/migrate_5.2_5.3.sh
        ```

    === "Manual"

        - Open `/opt/seatable-compose/.env` and rename the variable `SEATABLE_MYSQL_ROOT_PASSWORD` to `MARIADB_PASSWORD`.
        - Open `/opt/seatable-server/seatable/conf/dtable-events.conf` and remove the entire `[DATABASE]` and `[REDIS]` sections.
        - Open `/opt/seatable-server/seatable/conf/dtable_server_config.json` and remove the three lines with `redis_` and the five lines related to `mariadb` (host, user, password, database, port).
        - Open `/opt/seatable-server/seatable/conf/dtable_web_settings.py` and remove the entire blocks for `DATABASES = {...}` and `CACHES = {...}`.
        - Open `/opt/seatable-server/seatable/conf/seafile.conf` and remove the entire `[database]` section.

        In most cases the `dtable_server_config.json` should now only contain `{}`.

??? warning "Mandatory API Gateway in Nginx"

    Starting with version 5.3, the SeaTable API Gateway is used to handle all base loading and websocket connections. This requires significant changes to the nginx configuration file.
    Due to the complexity and potential for errors, we have decided to provide the nginx configuration file together with the yml files and to mount the configuration into the container.

    === "Mount configuration file (easy way)"

        You don't have to do anything. The file `/opt/seatable-compose/config/seatable-nginx.conf` will be mounted to the container. 
        The old configuration file located at `/opt/seatable-server/seatable/config/nginx.conf` is no longer used and can be removed.

    === "Manual"

        - Remove or comment out the volume mount of the nginx configuration from `seatable-server.yml`. Please note that changes to the .yml files are overwritten with the next update. Create a `custom-xxx.yml` file instead.
        - Remove the locations `/dtable-db` and `dtable-server`
        - Change the location `/socket.io` to `/api-gateway/socket.io/`, and update `http://dtable_servers` to `http://127.0.0.1:7780/socket.io/`

        It should look like this:

        ```conf
            # OLD:
            #location /socket.io {
            #    proxy_pass http://dtable_servers;

            # NEW:
            location /api-gateway/socket.io/ {
                proxy_pass http://127.0.0.1:7780/socket.io/;
        ```

??? info "Migration of comments"

    Before 5.3, comments in the base and universal app were handled separately. With 5.3, these comments are merged. 
    After starting the SeaTable container, you need to run this command *once* to migrate the comments. Don't re-execute it, otherwise your comments will be merged twice.

    First enter the docker container.

    ```bash
    docker exec -it seatable-server bash
    ```

    Then merge the comments.

    ```bash
    cd /opt/seatable/seatable-server-latest/dtable-web
    seatable.sh python-env manage.py merge_app_comments_to_base
    ```

??? info "Database Cleanup"

    With 5.3, SeaTable automatically enables periodic database cleanup tasks **for new installations** .
    This behavior is deliberately not enabled for existing installations.

    However, we strongly recommend enabling these tasks to ensure that your database stays performant. It also prevents your server from running out of disk space.

    You can achieve this by setting the following option in `/opt/seatable-server/seatable/conf/dtable-events.conf`:

    ```ini
    [CLEAN DB]
    enabled = true
    ```

    Please refer to [this document](../configuration/dtable-events-conf.md#clean-db) for detailed information on the possible configuration options.

??? info "ccnet.conf is obsolete"

    The configuration file `ccnet.conf` is no longer necessary and can be removed. 

    === "Script (Easy Way)"

        Execute the migration script below; you only need to run it once.

        ```bash
        bash /opt/seatable-compose/migrate/migrate_5.2_5.3.sh
        ```

    === "Manual"

        Remove the configuration file `/opt/seatable-server/seatable/conf/ccnet.conf`.

??? info "New Report Design plugin"

    We've developed a new report design plugin, which requires an additional Docker container on your SeaTable server. For installation, follow the instructions available [here](../installation/components/seadoc.md). 

??? info "Maps Plugin utilizes two API Keys"

    The Google Maps Plugin now uses two separate Google API keys instead of one. Please refer to the [documentation for further details](../configuration/plugins.md).

## 5.2

??? warning "From Two to One: Redis Unifies Caching, Retiring Memcached"

    Starting with version 5.2, Redis replaces Memcached as the default cache. Memcached has been removed from the `seatable-server.yml` file in [seatable-release](https://github.com/seatable/seatable-release).
    This reduces the number of required caching containers from two to one.

    **The following changes are required, if you're upgrading SeaTable to version 5.2**

    Updating your caching configuration in `/opt/seatable-server/seatable/conf/dtable_web_settings.py`:

    Replace this:

    ```py
    CACHES = {
        'default': {
            'BACKEND': 'django_pylibmc.memcached.PyLibMCCache',
            'LOCATION': 'memcached',
        },
        'locmem': {
            'BACKEND': 'django.core.cache.backends.locmem.LocMemCache',
        },
    }
    COMPRESS_CACHE_BACKEND = 'locmem'
    ```

    With this:

    ```py
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.redis.RedisCache',
            'LOCATION': 'redis://redis:6379',
        }
    }
    ```

    - Remove the line with `COMPRESS_CACHE_BACKEND`.
    - Adjust `redis://redis:6379` if your Redis container name or port differ. (`redis://<container-name>:<container-port>`)

    Restart SeaTable:

    ```bash
    docker exec -it seatable-server bash
    seatable.sh restart # Run inside the container
    ```

    If the Memcached container is still running, you can now stop it and remove it.

    ```
    docker stop memcached
    ```

??? warning "S3 with Memcached"

     If you're using S3 object storage for files and pictures AND have Memcached configured in your `seafile.conf` file, it is crucial that you update your configuration. Otherwise you can ignore this notice.

    Please follow the instructions in our help article about [caching for S3](../../installation/advanced/s3/#s3-for-files-and-pictures).

??? info "New Snapshot and Backup Retention Strategy"

    With version 5.2, SeaTable introduces a tiered retention strategy for Big Data Backups and Base Snapshots. While updating your settings is optional, it's recommended to take advantage of the new features. You can find the new options in:

    - [dtable-db.conf](../configuration/dtable-db-conf.md)
    - [dtable-storage-server.conf](../configuration/dtable-storage-server-conf.md)

??? info "New Whiteboard plugin"

    The Excalidraw-based whiteboard plugin introduced in v5.0 is now deprecated and will be removed in v5.3. We've developed a new whiteboard plugin using [tldraw](https://tldraw.dev), which requires an additional Docker container on your SeaTable server.

    For installation, follow the instructions available [here](../installation/components/whiteboard.md). You can easily copy and paste your drawings from the old plugin to the new one. If you have any problems, please report at the [forum](https://forum.seatable.com).

## 5.1

There are no version-specific changes required.

## 5.0

??? warning "API gateway mandatory for external links and big data"

    Starting with version 5.0, all requests for external links, external view links or big data views are routed through the API gateway. If you haven't configured the API gateway with version 4.4, you need to do so now for version 5.0.

    To configure the API gateway, add the following location block to your `/opt/seatable-server/seatable/conf/nginx.conf` file. Insert this section at the end of the configuration file, just before the final closing curl bracket:

    ```sh
    location /api-gateway/ {
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
        add_header Access-Control-Allow-Headers "deviceType,token, authorization, content-type";
        if ($request_method = 'OPTIONS') {
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
            add_header Access-Control-Allow-Headers "deviceType,token, authorization, content-type";
            return 204;
        }
        proxy_pass         http://127.0.0.1:7780/;
        proxy_redirect     off;
        proxy_set_header   Host              $http_host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host  $server_name;
        proxy_set_header   X-Forwarded-Proto $scheme;
        access_log         /opt/nginx-logs/api-gateway.access.log seatableformat;
        error_log          /opt/nginx-logs/api-gateway.error.log;
    }
    ```

    Afterwards check your nginx configuration file for syntax errors and then restart nginx.

    ```bash
    docker exec seatable-server nginx -t
    docker exec seatable-server nginx -s reload
    ```

??? info "Force usage of API gateway endpoints"

    The following configuration is optional and can be omitted if you have no issues with API performance, rate limits, and resources. Yet, we recommend using the new `/api-gateway/` endpoints for faster responses and reduced workload on your SeaTable Server.

    To enforce redirection of the `List Rows` and `Get Row` calls to the API gateway, append the following codeblock to your `dtable_server_config.json` file:

    ```json
    "redirect_list_rows_api": true,
    "dtable_web_service_url": "https://seatable.example.com/"
    ```

    Replace `seatable.example.com` with your SeaTable Server hostname (include the trailing '/').

    Afterwards, restart SeaTable with:

    ```bash
    docker exec -it seatable-server /shared/seatable/scripts/seatable.sh restart
    ```

## 4.4

??? warning "Migration to storage server required"

    **Important:** This change applies only to users whose initial installed SeaTable Server version was 1.x or 2.x.:

    With SeaTable Server version 3.0, a new storage server was introduced, which is the default storage type of bases since 3.0. If you started with version 1.x or 2.x, you might need to migrate some of your bases, because SeaTable will stop supporting the old storage mechanism with version 4.4.

    The migration is easy. First, ensure that you have the following setting in your `dtable_web_settings.py`:

    ```py
    NEW_DTABLE_IN_STORAGE_SERVER = True
    ```

    Then, run these commands to migrate your bases:

    ```sh
    # list number of bases that are not stored in storage-server
    docker exec -it seatable-server /templates/migrate_bases.sh --list

    # migrate 10 bases to storage-server (repeat this command until all bases are migrated)
    docker exec -it seatable-server /templates/migrate_bases.sh --migrate 10
    ```

    Afterwards, restart SeaTable with:

    ```bash
    docker exec -it seatable-server /shared/seatable/scripts/seatable.sh restart
    ```

??? warning "New API gateway"

    With this version, we have introduced a new component to SeaTable Server: the API gateway. This optimized API handler is designed to efficiently manage external API requests for base operations. The API gateway is now started by default and requires no additional configuration files. However, you will need to update your nginx configuration to make the new API endpoints, located at `/api-gateway/`, accessible.

    To add this new location, please modify your `/opt/seatable-server/seatable/conf/nginx.conf` file. You can add the following section at the end of the configuration file, just before the final closing bracket:

    ```sh
    location /api-gateway/ {
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
        add_header Access-Control-Allow-Headers "deviceType,token, authorization, content-type";
        if ($request_method = 'OPTIONS') {
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
            add_header Access-Control-Allow-Headers "deviceType,token, authorization, content-type";
            return 204;
        }
        proxy_pass         http://127.0.0.1:7780/;
        proxy_redirect     off;
        proxy_set_header   Host              $http_host;
        proxy_set_header   X-Real-IP         $remote_addr;
        proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Host  $server_name;
        proxy_set_header   X-Forwarded-Proto $scheme;
        access_log         /opt/nginx-logs/api-gateway.access.log seatableformat;
        error_log          /opt/nginx-logs/api-gateway.error.log;
    }
    ```

    Afterwards check your nginx configuration file for syntax errors and restart nginx.

    ```bash
    docker exec seatable-server nginx -t
    docker exec seatable-server nginx -s reload
    ```

??? info "New Docker container for easy backup"

    We've added a new backup container to our lineup of components to simplify your backup process. Using Docker, installation is quick and easy. Our selected backup software, [restic](https://restic.net), supports a wide range of backup targets, including S3, Backblaze, local storage, and more. With restic's reliability, your data is secure with every backup.

## 4.3

??? warning "New default setup with multiple predefined yml files"

    Version 4.3 introduces a new installation method relying on multiple yml files, an .env file and caddy as new reverse proxy. This setup is more convenient and will be the basis for all future explanations.

    It is not mandatory to switch to this new setup but it is recommended. Read this [article for more information](./migrate-seatable-release.md).

??? info "MariaDB container healthchecks"

    This help is important if your MariaDB container remains unhealthy after executing `docker compose up -d`. This issue arises specifically if your initial MariaDB version was below 10.6 and you have now upgraded to a newer version. Older versions did not create the required health check user in the local database, causing the health checks to fail.

    We have provided a simple script for you to download and create the necessary health check user. Please use the following commands to download and execute it. The script assumes the MariaDB container is running and that you have followed all installation instructions outlined in this manual.

    ```bash
    curl -sSL https://admin.seatable.com/downloads/add_mariadb_healthcheck.sh | bash
    ```

    If you wish to review the script's functionality, simply open it in your browser: [Add MariaDB Healthcheck Script](https://admin.seatable.com/downloads/add_mariadb_healthcheck.sh).

    The script essentially adds the user `healthcheck` to the MariaDB database and stores the credentials in a file accessible to the container."

??? info "Django CSRF protection"

    Django 4.* has introduced a new check for the origin http header in CSRF verification. It now compares the values of the origin field in HTTP header and the host field in HTTP header. If they are different, an error is triggered.

    If you deploy Seafile behind a proxy, if you use a non-standard port or if you deploy Seafile in cluster, it is likely that the origin field in HTTP header received by Django and the host field in HTTP header received by Django are different. This mismatch results in a CSRF error.

    You can add `CSRF_TRUSTED_ORIGINS` to `dtable_web_settings.py` to solve the problem:

    ```bash
    CSRF_TRUSTED_ORIGINS = ["https://<your-domain>"]
    ```

## 4.0

??? warning "Big data storage migration needed (Enterprise only)"

    Version 4.0 modifies the data format of the backup of big data storage. Compared with previous upgrades, an additional format migration script needs to be run inside the docker:

    ```bash
    # replace seatable if you container image is called differently.
    docker exec -it seatable /templates/migrate-dtable-db-backups.sh
    ```

??? info "Universal App is now enabled by default"

    The Enterprise Edition enables the Universal app by default. The option ENABLE_UNIVERSAL_APP is removed from `dtable_web_settings.py`.

??? info "Recycle bin is emptied after 30 days"

    SeaTable empties the recycle bin automatically after 30 days. If you want to change this default behaviour, add the following option to your `dtable_web_settings.py`.

    ```python
    TRASH_CLEAN_AFTER_DAYS = 30
    ```

??? info "New API Limits"

    API_THROTTLE_RATES is used to replace the old REST_FRAMEWORK option. Usually the default values of the API_THROTTLE_RATES are good. Change the following values only if need higher limits. Add one of multiple options to your `dtable_web_settings.py`.

    ```python
    API_THROTTLE_RATES = {
    'ping': '3000/minute',
    'anon': '60/minute',
    'user': '3000/minute',
    'sync_common_dataset': '60/minute',
    'password_reset': '10/minute',
    'org-admin': '1000/day',
    'app': '1000/minute',
    'import': '20/minute',   # Limit the rate of API calls for importing via excel/csv
    'export': '20/minute',   # Limit the rate of export base, table and view
    }
    ```

## 3.0

??? warning "New component: dtable-storage-server"

    3.0 adds another component, dtable-storage-server, which provides better performance for persistent storage of bases. A base in SeaTable is saved as a file, which is automatically saved every 5 minutes. In 2.x, this file saved in seaf-server, but seaf-server will keep a version for each save, which will take up a lot of disk space. In 3.0, only one version is actually saved when a snapshot is generated every 24 hours, which saves space. dtable-storage-server is a simple abstract layer of traditional file system and object storage.

    1. For new installation, dtable-storage-server.conf will be generated automatically. For upgrade from 2.x, you need to generate the config file manually

    ```
    docker exec -d seatable /shared/seatable/scripts/seatable.sh init
    ```

    dtable-storage-server.conf is as follows

    ```
    [general]
    log_dir = /opt/seatable/logs
    temp_file_dir = /tmp/tmp-storage-data

    [storage backend]
    type = filesystem
    path = /opt/seatable/storage-data

    [snapshot]
    interval = 86400
    keep_days = 180
    ```

    2. Add configuration in dtable_web_settings.py so that the newly created bases are saved to the dtable-storage-server, and the old bases are still read and written from seaf-server.

    In dtable_web_settings.py

    ```
    NEW_DTABLE_IN_STORAGE_SERVER = True
    ```

    3. Enterprise edition needs to add configuration items in dtable-db.conf to automatically back up the archived data in the dtable-db.

    In `dtable-db.conf`

    ```
    [backup]
    dtable_storage_server_url = http://127.0.0.1:6666
    backup_interval = 1440
    keep_backup_num = 3
    ```

    4. Migrate bases to storage server

    Run these commands to list and migrate your bases to the new storage server.

    ```sh
    # list number of bases that are not stored in storage-server
    docker exec -it seatable-server /templates/migrate_bases.sh --list

    # migrate 10 bases to storage-server (repeat this command until all bases are migrated)
    docker exec -it seatable-server /templates/migrate_bases.sh --migrate 10
    ```

## 2.7

??? info "Embed into iframes"

    The configuration of the embedded base to other webpages (iframe mode) needs to be modified as follows

    In dtable_web_settings.py

    ```
    SESSION_COOKIE_SAMESITE = None
                |
                V
    SESSION_COOKIE_SAMESITE = 'None'

    CSRF_COOKIE_SAMESITE = None
                |
                V
    CSRF_COOKIE_SAMESITE = 'None'
    ```

## 2.3

??? warning "Configuration changes of dtable-db"

    In 2.3 version, we made a small change to dtable-db configuration. If you're upgrading from older versions, you have to manually add below option to conf/dtable-db.conf:

    ```
    [general]
    ......
    log_dir = /shared/seatable/logs

    ......
    ```

    It's also suggested to change the `total_cache_size` option to a larger value (e.g. 500MB, depending on how much memory you have):

    ```
    [dtable cache]
    ......
    total_cache_size = 500

    ......
    ```

    You also need to add access information to dtable-server MySQL database. (You have to change below options based on your conf/dtable-server.json)

    ```
    [database]
    host = 127.0.0.1
    user = root
    password = mypass
    db_name = dtable
    ```

    Add `DTABLE_DB_URL` to dtable_web_settings.py

    ```
    DTABLE_DB_URL = 'https://<your-domain>/dtable-db/'
    ```

    Add dtable-db configuration to nginx.conf

    ```
        location /dtable-db/ {
            proxy_pass         http://127.0.0.1:7777/;
            proxy_redirect     off;
            proxy_set_header   Host              $host;
            proxy_set_header   X-Real-IP         $remote_addr;
            proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
            proxy_set_header   X-Forwarded-Host  $server_name;
            proxy_set_header   X-Forwarded-Proto $scheme;

            access_log      /opt/nginx-logs/dtable-db.access.log seatableformat;
            error_log       /opt/nginx-logs/dtable-db.error.log;
        }
    ```

## 2.1

??? warning "New component: dtable-db"

    2.1 add another component dtable-db, which is used to provide SQL query API (more features will be provided based on this component). For newly installation, the config file will be generated automatically. For upgrade from 2.0, you need to add the config file manually.

    Add a new file conf/dtable-db.conf with the following contents and modify `private_key` according to your instance:

    ```
    [general]
    host = 127.0.0.1
    port = 7777

    [storage]
    data_dir = /opt/seatable/db-data

    [dtable cache]
    private_key = "my private key"
    dtable_server_url = "http://127.0.0.1:5000"
    expire_time = 600
    total_cache_size = 1
    clean_cache_interval = 300

    ```

    The value of `private_key` should be the same as the value in `dtable_server_config.json`.

    dtable_server_url should be http://127.0.0.1:5000. You don't need to modify the value.
