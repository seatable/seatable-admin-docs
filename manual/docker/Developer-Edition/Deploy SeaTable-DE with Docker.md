# Deploy SeaTable Developer Edition with Docker

## Requirements

SeaTable Developer Edition (SeaTable DE) requires 4 cores and 8GB RAM. These resources guarantee good performance for most applications with several hundred concurrent connections.  When the bases become large, more RAM may be needed since SeaTable stores the bases in memory.

These instructions assume that no other services are installed on the  server, especially no other services listening on port 80 and 443.

## Setup

SeaTable uses docker-compose. This makes setting up your own SeaTable server a matter of a few steps.

To begin with, a few conventions which are worth noting:

- `/opt/seatable` is SeaTable's default directory, which we assume in these instructions. If you decide to put SeaTable in a  different directory - which you can - adjust all paths accordingly. 
- SeaTable uses two [Docker volumes](https://docs.docker.com/storage/volumes/) for persisting data generated in its database and SeaTable Docker container. The volumes' [host paths](https://docs.docker.com/compose/compose-file/compose-file-v2/#volumes) are /opt/seatable/mysql-data and /opt/seatable/seatable-data,  respectively.  It is not recommended to change these paths. If you do,  keep that in mind when following these instructions.
- All configuration and log files for SeaTable and the webserver Nginx are stored in the volume of the SeaTable container.
- Due to SeaTable's cloud first approach, these instructions only  elaborate explicitly on the deployment of SeaTable's latest version. (An earlier version of SeaTable EE can be installed using these  instructions. Just download its image from [Docker Hub](https://hub.docker.com/r/seatable/seatable-enterprise/tags?page=1&ordering=last_updated) and adjust the docker-compose file accordingly. Earlier versions may  not be compatible with the SeaTable plugins available on SeaTable's Market though.)

### Installing docker-compose

SeaTable uses docker-compose. Install the docker-compose package:

```bash
# for CentOS
yum install docker-compose -y

# Debian/Ubuntu
apt-get install docker-compose -y

```

### Downloading the SeaTable Image

Pull the SeaTable image from Docker Hub:

```sh
docker pull seatable/seatable-developer:latest

```

### Downloading and Modifying docker-compose.yml

Download the [docker-compose.yml](./docker-compose.yml) sample file into SeaTable's directory and modify the file to fit your environment and settings.

```bash
mkdir /opt/seatable
cd /opt/seatable
wget -O "docker-compose.yml" "https://manual.seatable.io/docker/Developer-Edition/docker-compose.yml"
nano docker-compose.yml
```

The following fields must be modified:

* The password of MariaDB root (MYSQL_ROOT_PASSWORD and DB_ROOT_PASSWD)
* The use of Let's Encrypt for HTTPS (SEATABLE_SERVER_LETSENCRYPT)
* The host name (SEATABLE_SERVER_HOSTNAME)

Optional customizable options in the docker-compose.yml are:

* The volume path for the container db
* The volume path for the container seatable
* The imsage tag of the SeaTable version to install (image)
* The time zone (TIME_ZONE)

### Initializing Database

Initialize database by running docker-compose:

```bash
cd /opt/seatable
docker-compose up

```

NOTE: You should run the above command in the directory with the `docker-compose.yml`.

Wait for a while. When you see `This is an idle script (infinite loop) to keep container running.`  in the output log, the database initialized successfully. Press CTRL + C  to finish this step.

### Starting the Docker Containers

Run docker-compose again, this time in detached mode:

```bash
docker-compose up -d

```

NOTE: You should run the above command in the directory with the `docker-compose.yml`.

### Starting SeaTable Server

Now you can start the SeaTable service and create the first admin user.

```sh
# Start SeaTable service.
docker exec -d seatable /shared/seatable/scripts/seatable.sh start

# Create an admin account.
docker exec -it seatable /shared/seatable/scripts/seatable.sh superuser  

```

NOTE: The first command uses the option `-d` which starts the service in the background. The second command use the option `-it` which runs the command in interactive mode.

You can now access SeaTable at the host name.

### Note!!! If you encounter "Network error" when loading a base

Use Chrome's debug mode to check the detailed error. Normally, it is caused by wrong URLs in `dtable_web_settings.py`. As SeaTable server is composed of multiple components, it must read the correct URLs that users will use to access the service from settings. The configs will only be read from docker-compose.yml and write to the config file when you start SeaTable for the first time. If you modify the URLs in docker-compose.yml later, you must change them in `dtable_web_settings.py` manually.

The four URLs that used are below:

```python
# The URL that users used to access a base
DTABLE_SERVER_URL = 'https://seatable.yourdomain.com/dtable-server/'
DTABLE_SOCKET_URL = 'https://seatable.yourdomain.com/'

# The URL that users used to access the service
DTABLE_WEB_SERVICE_URL = 'https://seatable.yourdomain.com/'

# The URL for the file server
FILE_SERVER_ROOT = 'https://seatable.yourdomain.com/seafhttp/'
```

Don't forget to restart the service after modification:

```
docker exec -d seatable /shared/seatable/scripts/seatable.sh stop
docker exec -d seatable /shared/seatable/scripts/seatable.sh start
```

## More Configuration Options

### Deploy the https

* Let's encrypt SSL certificate

  If you set `SEATABLE_SERVER_LETSENCRYP` to `true` in "docker-compose.yml", the container would request a letsencrypt-signed SSL certificate for you automatically.

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

  **Note**：Since the nginx configuration file is only generated automatically when you run the container for the first time, you'd better set `SEATABLE_SERVER_LETSENCRYPT = True` before executing the `docker-compose up -d` command for the first time.

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

### Advanced Features

All config files are under `/Your SeaTable data volume/seatable/conf/`. 

* ccnet : `/Your SeaTable data volume/seatable/conf/ccnet.conf`
* seafile : `/Your SeaTable data volume/seatable/conf/seafile.conf`
* dtable-web : `/Your SeaTable data volume/seatable/conf/dtable_web_settings.py`
* dtable-server : `/Your SeaTable data volume/seatable/conf/dtable_server_config.json`
* dtable-events : `/Your SeaTable data volume/seatable/conf/dtable-events.conf`
* Nginx : `/Your SeaTable data volume/seatable/conf/nginx.conf`

After modification, you need to restart the SeaTable server.

```bash
docker exec -d seatable /shared/seatable/scripts/seatable.sh restart

```

## SeaTable Directory Structure

### Volumes

Placeholder spot for shared volumes. You may elect to store certain persistent information outside of a container, in our case we keep various logfiles and upload directory outside. This allows you to rebuild containers easily without losing important information.

* /shared/seatable: This is the directory for SeaTable server configuration and data.
* /shared/nginx-logs: This is the directory for Nginx logs.
* /shared/ssl: This is directory for SSL certificate.

### Find Logs

The SeaTable logs are under `/shared/seatable/logs` in the docker, or `/Your SeaTable data volume/seatable/logs` in the server that run the docker.

The Nginx logs are under `/shared/nginx-logs`, or `/Your SeaTable data volume/nginx-logs` in the server that run the docker.

## FAQ

**If for some reasons, the installation failed, how to start from clean state again?**

Just remove the directory `/opt/seatable` and start again.

**LetsEncrypt SSL certificate is about to expire.**

If the certificate is not renewed automatically, you can execute the command `/templates/renew_cert.sh` to manually renew the certificate.
