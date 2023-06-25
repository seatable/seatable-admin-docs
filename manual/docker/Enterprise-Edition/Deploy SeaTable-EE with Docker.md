# Setup SeaTable Server Enterprise Edition

## Requirements

SeaTable Server Enterprise Edition (SeaTable EE) requires 4 cores and 8GB RAM. These resources guarantee good performance for most applications with several hundred concurrent connections. When bases become large, more RAM may be needed as SeaTable loads bases into memory when they are opened.

Since version 2.6, SeaTable EE requires a license to start. You obtain a license file from SeaTable Sales. A free license for three users can be obtained at https://seatable.io/on-premises. If you need a trial license with more users, request a 3-user license and utilize the trial requst form available on the page from which you can download your 3-user license.

This tutorial assumes that no other services are installed on the server, especially no other services listening on port 80 and 443.

SeaTable Server uses Docker and Docker Compose. If your platform does not support Docker, you cannot install SeaTable Server.

## Setup

The following assumptions and conventions are used in the rest of this document:

* `/opt/seatable` is the directory of SeaTable Server. If you decide to put SeaTable Server in a different directory - which you can - adjust all paths accordingly. 
* SeaTable Server uses two [Docker volumes](https://docs.docker.com/storage/volumes/) for persisting data generated in its database and the SeaTable Docker container. The volumes' [host paths](https://docs.docker.com/compose/compose-file/compose-file-v2/#volumes) are /opt/seatable/mysql-data and /opt/seatable/seatable-data, respectively.  It is not recommended to change these paths. If you do, account for the change when following these instructions.
* All configuration and log files for SeaTable Server and the webserver Nginx are stored in the volume of the SeaTable container.
* Due to SeaTable Server's cloud first approach, these instructions only elaborate on the deployment of SeaTable Server's latest version. (Earlier versions of SeaTable EE can be installed using these instructions. Just download the image of the version in question from [Docker Hub](https://hub.docker.com/r/seatable/seatable-enterprise/tags?page=1&ordering=last_updated) and adjust the docker-compose file accordingly. Earlier versions may not be compatible with the SeaTable plugins available on SeaTable's Market though.)

### Installing Docker

Use the [official installation guide](https://docs.docker.com/engine/install/) for your OS to install Docker. 

### Installing Docker Compose

Install the Docker Compose package:

```bash
# CentOS
$ yum install docker-compose -y

# Debian/Ubuntu
$ apt-get install docker-compose -y

```

### Downloading the SeaTable Image

Pull the SeaTable image from Docker Hub:

```bash
$ docker pull seatable/seatable-enterprise:latest

```

Note: Older SeaTable versions are also available on Docker Hub. To pull an older version, replace 'latest' by the desired version.

### Activating the SeaTable License

Create the directory `/opt/seatable/seatable-data/seatable` and save the license file it.

```bash
$ mkdir -p /opt/seatable/seatable-data/seatable/
$ cd /opt/seatable/seatable-data/seatable/
$ nano seatable-license.txt
```

Paste the content of the license file in the newly created .txt file, save it, and close it.

### Downloading and Modifying docker-compose.yml

Download the [docker-compose.yml](./docker-compose.yml) sample file into SeaTable Server's directory and modify the file to fit your environment and settings.

```bash
$ cd /opt/seatable/
$ wget -O "docker-compose.yml" "https://manual.seatable.io/docker/Enterprise-Edition/docker-compose.yml"
$ nano docker-compose.yml
```

The following fields merit particular attention:

* Password of MariaDB root (MYSQL_ROOT_PASSWORD and DB_ROOT_PASSWD)
* Use of Let's Encrypt for SSL (SEATABLE_SERVER_LETSENCRYPT)
* Host name (SEATABLE_SERVER_HOSTNAME)


Additional customizable options in the Compose file are:

* Volume path for the container db
* Volume path for the container seatable
* Image tag of the SeaTable version to install (image)
* Time zone (TIME_ZONE)

### Initializing the Database

Initialize the database by running docker-compose:

```bash
$ cd /opt/seatable
$ docker-compose up

```

Wait for a while. When you see `This is an idle script (infinite loop) to keep container running.`  in the output log, the database has been initialized successfully. Press keyboard `CTRL + C` (Windows) or `Control + C` (Mac) to return to the prompt.

### Starting the Docker Containers

Run docker-compose again, this time in detached mode:

```bash
$ docker-compose up -d

```


### Starting SeaTable

Now you start SeaTable service:

```bash
$ docker exec -d seatable /shared/seatable/scripts/seatable.sh start
````

Then create the first admin user:

```
$ docker exec -it seatable /shared/seatable/scripts/seatable.sh superuser  

```

!!! note: The first command uses the option `-d` which starts the service in the background. The second command uses the option `-it` which runs the command in interactive mode.


Enter the e-mail address and the initial password of the admin user. `Superuser created successfully` confirms that the admin user has been created.

You can now access SeaTable at the host name specified in the Compose file.


### Configuring Autostart

By default, SeaTable Server will not start automatically, when the Docker host is restarted.  

See the [autostart](../../config/autostart.md) article in this manual to learn how to configure SeaTable Server's autostart.


### Reviewing the Deployment

The command `docker container list` should list the four containers specified in the `docker-compose.yml`:

![picture](https://user-images.githubusercontent.com/41058728/125533593-476822e1-9322-4fd4-8b41-99a40a7afff1.png)

The directory layout of the SeaTable container's volume should look as follows:

```bash
$ tree /opt/seatable/seatable-data -L 2
/opt/seatable/seatable-data
├── nginx-logs
│   ├── access.log
│   ├── dtable-db.access.log
│   ├── dtable-db.error.log
│   ├── dtable-server.access.log
│   ├── dtable-server.error.log
│   ├── dtable-web.access.log
│   ├── dtable-web.error.log
│   ├── error.log
│   ├── seafhttp.access.log
│   ├── seafhttp.error.log
│   ├── socket-io.access.log
│   └── socket-io.error.log
├── seatable
│   ├── ccnet
│   ├── conf
│   ├── db-data
│   ├── logs
│   ├── pids
│   ├── scripts
│   ├── seafile-data
│   ├── seahub-data
|   ├── seatable-license.txt
│   └── storage-data
└── ssl
    ├── account.conf
    ├── ca
    ├── http.header
    ├── renew_cert
    ├── SEATABLE_SERVER_HOSTNAME
    ├── SEATABLE_SERVER_HOSTNAME.crt
    └── SEATABLE_SERVER_HOSTNAME.key

```

Note: The directory `ssl` is empty if Let's Encrypt is not used for HTTPS. SEATABLE_SERVER_HOSTNAME stands for the host name used in the `docker-compose.yml` file.

All config files are stored in `/opt/seatable/seatable-data/seatable/conf`.

Any modification of a configuration file requires a restart of SeaTable service to take effect:

```bash
$ docker exec -d seatable /shared/seatable/scripts/seatable.sh restart

```

All of SeaTable Server's log files are stored in  `/opt/seatable/seatable-data/seatable/logs`:

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

  If you set `SEATABLE_SERVER_LETSENCRYPT` to `true` in "docker-compose.yml", the container requests a Let's Encrypt-signed SSL certificate for you automatically.

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

Note：Since the Nginx configuration file is only generated automatically when you run the container for the first time, you'd better set `SEATABLE_SERVER_LETSENCRYPT = True` before executing the `docker-compose up -d` command for the first time.

If you want to use your own SSL certificate, you can refer to the following steps.

* Add your own SSL certificate
  1. Upload the SSL certificate file to the SeaTable data directory : `/Your SeaTable data volume/ssl/`
  2. Change the "http" of each SERVER_URL in ccnet.conf, dtable_web_settings.py and dtable_server_config.json to "https".
  3. Restart the SeaTable service : `docker exec -it seatable /shared/seatable/scripts/seatable.sh restart`
  4. Restart the Memcached service：`docker restart seatable-memcached`
  5. Modify the Nginx configuration file : `/Your SeaTable data volume/seatable/conf/nginx.conf`

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

  6. Reload the Nginx configuration file : `docker exec -it seatable /usr/sbin/nginx -s reload`

## FAQ

**If, for whatever reason, the installation fails, how do I to start from a clean slate again?**

Remove the directory `/opt/seatable` and start again.

**I forgot the SeaTable admin email address/password, how do I create a new admin account?**

You can create a new admin account by running the superuser command:

```bash
$ docker exec -it seatable /shared/seatable/scripts/seatable.sh superuser  

```

The SeaTable service must be up when running the superuser command.

**The Let's Encrypt SSL certificate is about to expire, how do I renew it?**

The SSL certificate should renew itself automatically 30 days prior to its expiration. If the automatic renewal fails, run this command in the SeaTable Docker container to manually renew the certificate:

```bash
$ /templates/renew_cert.sh
```

**SEATABLE_SERVER_LETSENCRYPT=false change to true.**

If you want to change to https after using http, first backup and move the nginx.conf:

```bash
$ mv /opt/seatable/shared/seatable/conf/nginx.conf /opt/seatable/shared/seatable/conf/nginx.conf.bak
```

Then run the following command to apply a certificate:

```bash
$ docker exec seatable /templates/seatable.sh init
```

You need to manually change http to https in other configuration files and restart SeaTable.

```bash
$ docker-compose down
$ docker-compose up -d
$ docker exec -d seatable /shared/seatable/scripts/seatable.sh start
```

If you have modified the old nginx.conf, now you can modify the new nginx.conf as you want. Then execute the following command to make the nginx configuration take effect:

```bash
$ docker exec seatable nginx -s reload
```
