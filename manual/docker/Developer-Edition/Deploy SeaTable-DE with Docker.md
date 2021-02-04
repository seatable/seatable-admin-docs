# Deploy SeaTable Developer Edition (DE) with Docker

## Requirements

SeaTable DE requires 4 cores and 8GB RAM. These resources guarantee good performance for most applications with several hundred concurrent connections.  When the bases become large, more RAM may be needed since SeaTable stores the bases in memory.

## Setup

### Install docker-compose

SeaTable uses docker-compose. Install the docker-compose package:

```bash
# for CentOS
yum install docker-compose -y

# Debian/Ubuntu
apt-get install docker-compose -y

```

### Download the SeaTable Image

Pull the SeaTable image:

```sh
docker pull seatable/seatable:{tag}

```

You find the current and previous versions of SeaTable DE on [Docker Hub](https://hub.docker.com/r/seatable/seatable/tags).

### Download and Modify docker-compose.yml

The default directory for SeaTable is `/opt/seatable`. Create the directory:

```
mkdir /opt/seatable

```

Download the [docker-compose.yml](https://docs.seatable.io/f/6a99ce4147d1411ab873/?dl=1) sample file to `/opt/seatable` and modify the file to fit your environment and settings. The following fields must be modified:

* The password of MariaDB root (MYSQL_ROOT_PASSWORD and DB_ROOT_PASSWD)
* The volume directory of MariaDB data (volumes)
* The SeaTable image's tag
* The volume directory of SeaTable data (volumes)
* The host name (SEATABLE_SERVER_HOSTNAME)
* The time zone (Optional)

### Initialize Database

Initialize database with the following command:

```bash
docker-compose up

```

**NOTE: You should run the above command in a directory with the **`docker-compose.yml`**.**

Wait for a while. When you see `This is a idle script (infinite loop) to keep container running.`  in the output log, the database initialized successfully.

Press keyboard `Control + C`  to finish this step.

### Start Docker Container

Start SeaTable container with the following command:

```bash
docker-compose up -d

```

**NOTE: You should run the above command in a directory with the **`docker-compose.yml`**.**

### Start SeaTable Server

Now you can start the SeaTable service.

```sh
# Start SeaTable service.
docker exec -d seatable /shared/seatable/scripts/seatable.sh start
# Create an admin account.
docker exec -it seatable /shared/seatable/scripts/seatable.sh superuser  

```

Note, the first command use `-d` parameter to mean the service to run in the background. The second command use `-it` parameter to mean it is an interactive command.

Next you can access SeaTable via the web side.

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

 you can xxx

**LetsEncrypt SSL certificate is about to expire.**

If the certificate is not renewed automatically, you can execute the command `/templates/renew_cert.sh` to manually renew the certificate.
