# Deploy SeaTable Enterprise Edition with Docker

## Requirements

SeaTable Enterprise Edition (SeaTable EE) requires 4 cores and 8GB RAM. These resources guarantee good performance for most applications with several hundred concurrent connections. When bases become large, more RAM may be needed as SeaTable stores open bases in memory.

This tutorial assumes that no other services are installed on the server, especially no other services listening on port 80 and 443.

SeaTable uses Docker and Docker Compose. If your platform does not support Docker, you cannot install SeaTable.

## Setup

The following assumptions and conventions are used in the rest of this document:

* `/opt/seatable` is the directory of SeaTable. If you decide to put SeaTable in a different directory - which you can - adjust all paths accordingly. 
* SeaTable uses two [Docker volumes](https://docs.docker.com/storage/volumes/) for persisting data generated in its database and SeaTable Docker container. The volumes' [host paths](https://docs.docker.com/compose/compose-file/compose-file-v2/#volumes) are /opt/seatable/mysql-data and /opt/seatable/seatable-data, respectively.  It is not recommended to change these paths. If you do, keep that in mind when following these instructions.
* All configuration and log files for SeaTable and the webserver Nginx are stored in the volume of the SeaTable container.
* Due to SeaTable's cloud first approach, these instructions only elaborate on the deployment of SeaTable's latest version. (Earlier versions of SeaTable EE can be installed using these instructions. Just download the image of the version in question from [Docker Hub](https://hub.docker.com/r/seatable/seatable-enterprise/tags?page=1&ordering=last_updated) and adjust the docker-compose file accordingly. Earlier versions may not be compatible with the SeaTable plugins available on SeaTable's Market though.)

### Installing docker

Use the [official installation guide](https://docs.docker.com/engine/install/) for your OS to install Docker. 

### Installing Docker Compose

Install the Docker Compose package:

```bash
# CentOS
yum install docker-compose -y

# Debian/Ubuntu
apt-get install docker-compose -y

```

### Downloading the SeaTable Image

Pull the SeaTable image from Docker Hub:

```bash
docker pull seatable/seatable-enterprise:latest

```

### Downloading and Modifying docker-compose.yml

Download the [docker-compose.yml](./docker-compose.yml) sample file into SeaTable's directory and modify the Compose file to fit your environment and settings.

```bash
mkdir /opt/seatable
cd /opt/seatable
wget -O "docker-compose.yml" "https://manual.seatable.io/docker/Enterprise-Edition/docker-compose.yml"
nano docker-compose.yml
```

The following options must be modified in the Compose file:

* Password of MariaDB root (MYSQL_ROOT_PASSWORD and DB_ROOT_PASSWD)
* Use of Let's Encrypt for SSL (SEATABLE_SERVER_LETSENCRYPT)
* Host name (SEATABLE_SERVER_HOSTNAME)


Optional customizable options in the Compose file are:

* Volume paths for the container db
* Volume path for the container seatable

* Image tag of the SeaTable version to install (image)
* Time zone (TIME_ZONE)

### Initializing the Database

Initialize the database by running docker-compose:

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

### Activating the SeaTable License

Save the license file in the directory `/opt/seatable/seatable-data/seatable`. Make sure that the file's name is seatable-license.txt.

You obtain a license file from SeaTable Sales. A free license for three users can be obtained at https://seatable.io/on-premises. If you need a trial license with more users, utilize the request form after obtaining the three user license.

NOTE: In all versions including 2.5, SeaTable Server EE could be started without a license file. Newer versions do not start without a license file.

### Starting SeaTable

Now you start SeaTable and create the first admin user.

```bash
# Start SeaTable service
docker exec -d seatable /shared/seatable/scripts/seatable.sh start

# Create admin account
docker exec -it seatable /shared/seatable/scripts/seatable.sh superuser  

```

NOTE: The first command uses the option `-d` which starts the service in the background. The second command uses the option `-it` which runs the command in interactive mode.

You can now access SeaTable at the host name specified in the Compose file.

### Reviewing the Deployment

The command `docker container list` should list the four containers specified in the `docker-compose.yml`:

![picture](https://user-images.githubusercontent.com/41058728/125533593-476822e1-9322-4fd4-8b41-99a40a7afff1.png)

The directory layout of the SeaTable container's volume should look as follows:

```bash
$tree /opt/seatable/seatable-data -L 2
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
│   └── seatable-license.txt
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

NOTE：Since the Nginx configuration file is only generated automatically when you run the container for the first time, you'd better set `SEATABLE_SERVER_LETSENCRYPT = True` before executing the `docker-compose up -d` command for the first time.

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

**The Let's Encrypt SSL certificate is about to expire, how do I renew it?**

The SSL certificate should be renewed automatically 30 days prior to its expiration. If the automatic renewal fails, this command renews the certificate manually:

```bash
/templates/renew_cert.sh
```
