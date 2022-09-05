# Deploy SeaTable Developer Edition with Docker

## Requirements

SeaTable Developer Edition (SeaTable DE) requires 4 cores and 8GB RAM. These resources guarantee good performance for most applications with several hundred concurrent connections.  When bases become large, more RAM may be needed since SeaTable stores the bases in memory.

This tutorial assumes that no other services are installed on the  server, especially no other services listening on port 80 and 443.

SeaTable uses Docker and Docker Compose. If your platform does not support Docker, you cannot install SeaTable.

## Setup

The following assumptions and conventions are used in the rest of this document:

- `/opt/seatable` is the directory of SeaTable. If you decide to put SeaTable in a  different directory - which you can - adjust all paths accordingly. 
- SeaTable uses two [Docker volumes](https://docs.docker.com/storage/volumes/) for persisting data generated in its database and SeaTable Docker container. The volumes' [host paths](https://docs.docker.com/compose/compose-file/compose-file-v2/#volumes) are /opt/seatable/mysql-data and /opt/seatable/seatable-data,  respectively.  It is not recommended to change these paths. If you do, account for it when following these instructions.
- All configuration and log files for SeaTable and the webserver Nginx are stored in the volume of the SeaTable container.
- Due to SeaTable's cloud first approach, these instructions only  elaborate explicitly on the deployment of SeaTable's latest version. (An earlier version of SeaTable EE can be installed using these  instructions. Just download its image from [Docker Hub](https://hub.docker.com/r/seatable/seatable-enterprise/tags?page=1&ordering=last_updated) and adjust the docker-compose file accordingly. Earlier versions may  not be compatible with the SeaTable plugins available on SeaTable's Market though.)

### Installing Docker

Use the [official installation guide](https://docs.docker.com/engine/install/) for your OS to install Docker. 

### Installing docker-compose

Install the Docker Compose package:

```bash
# CentOS
yum install docker-compose -y

# Debian/Ubuntu
apt-get install docker-compose -y

```

### Downloading the SeaTable Image

Pull the SeaTable image from Docker Hub:

```sh
docker pull seatable/seatable-developer:latest

```

NOTE: Older SeaTable versions are also available on Docker Hub. To pull an older version, replace 'latest' by the desired version.

### Downloading and Modifying docker-compose.yml

Download the [docker-compose.yml](./docker-compose.yml) sample file into SeaTable's directory and modify the file to fit your environment and settings.

```bash
mkdir /opt/seatable
cd /opt/seatable
wget -O "docker-compose.yml" "https://manual.seatable.io/docker/Developer-Edition/docker-compose.yml"
nano docker-compose.yml
```

The following fields merit particular attention:

* Password of MariaDB root (MYSQL_ROOT_PASSWORD and DB_ROOT_PASSWD)
* Use of Let's Encrypt for HTTPS (SEATABLE_SERVER_LETSENCRYPT)
* Host name (SEATABLE_SERVER_HOSTNAME)

Additional customizable options in the Compose file are:

* Volume path for the container db
* Volume path for the container seatable
* Image tag of the SeaTable version to install (image)
* Time zone (TIME_ZONE)

### Initializing Database

Initialize database by running docker-compose:

```bash
cd /opt/seatable
docker-compose up

```

NOTE: You should run the above command in the directory with the `docker-compose.yml`.

Wait for a while. When you see `This is an idle script (infinite loop) to keep container running.`  in the output log, the database has been initialized successfully. Press keyboard `CTRL + C` (Windows) or `Control + C` (Mac) to return to the prompt.

### Starting the Docker Containers

Run docker-compose again, this time in detached mode:

```bash
docker-compose up -d

```

NOTE: You should run the above command in the directory with the `docker-compose.yml`.

### Starting SeaTable Server

Now you can start SeaTable and create the first admin user:

```sh
# Start SeaTable service.
docker exec -d seatable /shared/seatable/scripts/seatable.sh start

# Create admin account.
docker exec -it seatable /shared/seatable/scripts/seatable.sh superuser  

```

NOTE: The first command uses the option `-d` which starts the service in the background. The second command use the option `-it` which runs the command in interactive mode.

You can now access SeaTable at the host name specified in the Compose file.

### Reviewing the Deployment

The command `docker container list` should list the four containers specified in the `docker-compose.yml`:

![picture](https://user-images.githubusercontent.com/41058728/125533593-476822e1-9322-4fd4-8b41-99a40a7afff1.png)

The directory layout of the SeaTable container's volume should look as follows:

```bash
$tree /opt/seatable/seatable-data -L 2
/opt/seatable/seatable-data
├── nginx-logs
│   ├── access.log
│   ├── dtable-db.access.log
│   ├── dtable-db.error.log
│   ├── dtable-server.access.log
│   ├── dtable-server.error.log
│   ├── dtable-web.access.log
│   ├── dtable-web.error.log
│   ├── error.log
│   ├── seafhttp.access.log
│   ├── seafhttp.error.log
│   ├── socket-io.access.log
│   └── socket-io.error.log
├── seatable
│   ├── ccnet
│   ├── conf
│   ├── db-data
│   ├── logs
│   ├── pids
│   ├── scripts
│   ├── seafile-data
│   ├── seahub-data
│   └── seatable-license.txt
└── ssl
    ├── account.conf
    ├── ca
    ├── http.header
    ├── renew_cert
    ├── SEATABLE_SERVER_HOSTNAME
    ├── SEATABLE_SERVER_HOSTNAME.crt
    ├── SEATABLE_SERVER_HOSTNAME.key
    └── README

```

NOTE: The directory `ssl` is empty if Let's Encrypt is not used for HTTPS. SEATABLE_SERVER_HOSTNAME substitutes for the host name used in the `docker-compose.yml` file.

All config files are stored in `/opt/seatable/seatable-data/seatable/conf`.

Any modification of a configuration file requires a restart of SeaTable to take effect:

```bash
docker exec -d seatable /shared/seatable/scripts/seatable.sh restart

```

All of SeaTable's log files are stored in  `/opt/seatable/seatable-data/seatable/logs`:
* dtable-db.log: log of dtable-db component
* dtable-db-access.log: query log of dtable-db component
* dtable-db-error.log: error log of dtable-db component
* dtable-db-slow.log: slow query log of dtable-db component
* dtable-events.log: log of the dtable-events component
* dtable_events_io.log: special log for DTABLE import/export as well as Excel and CSV file import/export
* dtable_events_message.log: special log for sending emails in the dtable-events background
* dtable-server.log: log of dtable-server component
* dtable_web.log: log of the dtable-web component
* init.log: Log of Docker initialization script
* monitor.log: Monitor logs, monitor.sh can auto restart the unexpectedly closed server
* seafile.log: log of Seafile server

Additionally, the slow_logs contain slow request logs which help debug performance issues.

## SSL/TLS

* Let's encrypt SSL certificate

  If you set `SEATABLE_SERVER_LETSENCRYP` to `true` in "docker-compose.yml", the container requests a letsencrypt-signed SSL certificate for you automatically.

  e.g.

  ```
  seatable:
    ...
    ports:
      - "80:80"
      - "443:443"
      ...
    environment:
      ...
      - SEATABLE_SERVER_LETSENCRYPT=True # Default is False. Whether to use let's encrypt certificate.
      - SEATABLE_SERVER_HOSTNAME=example.seatable.com # Specifies your host name if https is enabled
  
  ```

NOTE：Since the Nginx configuration file is only generated automatically when you run the container for the first time, you'd better set `SEATABLE_SERVER_LETSENCRYPT = True` before executing the `docker-compose up -d` command for the first time.

If you want to use your own SSL certificate, you can refer to the following steps.

* Add your own SSL certificate
  1. Upload the SSL certificate file to the SeaTable data directory : `/Your SeaTable data volume/ssl/`
  2. Change the "http" of each SERVER_URL in ccnet.conf, dtable_web_settings.py and dtable_server_config.json to "https".
  3. Restart the SeaTable service : `docker exec -it seatable /shared/seatable/scripts/seatable.sh restart`
  4. Restart the Memcached service：`docker restart seatable-memcached`
  5. Modify the nginx configuration file : `/Your SeaTable data volume/seatable/conf/nginx.conf`

     e.g.

     ```
     server {
         if ($host = example.seatable.com) {
             return 301 https://$host$request_uri;
         }
         listen 80;
         server_name example.seatable.com;
         return 404;
     }

     server {
         server_name example.seatable.com;

         listen 443 ssl;
         ssl_certificate /shared/ssl/<your-ssl.cer>;
         ssl_certificate_key /shared/ssl/<your-ssl.key>;

         proxy_set_header X-Forwarded-For $remote_addr;
         ......

     ```

  6. Reload the nginx configuration file : `docker exec -it seatable /usr/sbin/nginx -s reload`

## FAQ

**I encounter "Network error" when opening a base. What have I done wrong?**

Normally, the issue is caused by incorrect URLs in config file `dtable_web_settings.py`. The URL are required for the various components of SeaTable to communicate with one another.

The URLs are read from the Compose file and written to the config file only upon SeaTable's initialization. Any later modification of the URLs in the docker-compose.yml has no effect on the URLs in the config file. Later changes must be done manually in `dtable_web_settings.py`, followed by a restart of SeaTable.

The relevenat URLs are:

```python
# The URL that users used to access a base
DTABLE_SERVER_URL = 'https://SEATABLE_SERVER_HOSTNAME/dtable-server/'
DTABLE_SOCKET_URL = 'https://SEATABLE_SERVER_HOSTNAME/'

# The URL that users used to access the service
DTABLE_WEB_SERVICE_URL = 'https://SEATABLE_SERVER_HOSTNAME/'

# The URL for the file server
FILE_SERVER_ROOT = 'https://SEATABLE_SERVER_HOSTNAME/seafhttp/'
```

SEATABLE_SERVER_HOSTNAME must be the correct hostname (e.g., example.seatable.com).

**If, for whatever reason, the installation failed, how to start from clean state again?**

Just remove the directory `/opt/seatable` and start again.

**I forgot the SeaTable admin email address/password, how do I create a new admin account?**

You can create a new admin account by running

```bash
# Create admin account
docker exec -it seatable /shared/seatable/scripts/seatable.sh superuser  

```

The SeaTable service must be up when running the superuser command.

**The Let's Encrypt SSL certificate is about to expire, how do I renew it?**

The SSL certificate should be renewed automatically 30 days prior to its expiration. If the automatic renewal fails, this command renews the certificate manually:

```bash
/templates/renew_cert.sh
```

**SEATABLE_SERVER_LETSENCRYPT=false change to true.**

If you want to change to https after using http, first backup and move the nginx.conf.

```sh
mv /opt/seatable/shared/seatable/conf/nginx.conf /opt/seatable/shared/seatable/conf/nginx.conf.bak
```

Then run the following command to apply a certificate.

```sh
docker exec seatable /templates/seatable.sh init
```

You need to manually change http to https in other configuration files and restart SeaTable.

```sh
docker-compose down
docker-compose up -d
docker exec -d seatable /shared/seatable/scripts/seatable.sh start
```

If you have modified the old nginx.conf, now you can modify the new nginx.conf as you want. Then execute the following command to make the nginx configuration take effect.

```sh
docker exec seatable nginx -s reload
```
