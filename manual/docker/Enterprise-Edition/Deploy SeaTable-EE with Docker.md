# Deploy SeaTable Enterprise Edition (EE) with Docker

## Requirements

SeaTable EE requires 4 cores and 8GB RAM. These resources guarantee good performance for most applications with several hundred concurrent connections.  When the bases become large, more RAM may be needed since SeaTable stores the bases in memory.

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

Pull the SeaTable image from Docker Hub:

```bash
docker pull seatable/seatable-ee:latest

```

If you want to install a particular version, replace the `latest` tag by the version you wish to install. Visit the SeaTable-EE repository on [Docker Hub](https://hub.docker.com/r/seatable/seatable-ee/tags?page=1&ordering=last_updated) to find out which versions are available.


### Download and Modify docker-compose.yml

Download the [docker-compose.yml](https://docs.seatable.io/f/58f1f83e5ac34258806b/?dl=1) sample file to `/opt/seatable` and modify the file to fit your environment and settings.

```bash
mkdir /opt/seatable
cd /opt/seatable
wget -O "docker-compose.yml" "https://docs.seatable.io/f/58f1f83e5ac34258806b/?dl=1"
nano docker-compose.yml

```

The default directory for SeaTable is `/opt/seatable`.

The following options must be modified:
* The password of MariaDB root (MYSQL_ROOT_PASSWORD and DB_ROOT_PASSWD)
* The image tag of the SeaTable version to install (image)
* The host name (SEATABLE_SERVER_HOSTNAME)
* The time zone (TIME_ZONE)

The volume directories of the database and SeaTable data can be modified if necessary. In the remainder of these instructions, their default paths for the volume directories are used.


### Initialize Database

Initialize the database by running docker-compose:

```bash
cd /opt/seatable
docker-compose up

```

**NOTE: You should run the above command in a directory with the **`docker-compose.yml`**.**

Wait for a while. When you see `This is an idle script (infinite loop) to keep container running.`  in the output log, the database has been initialized successfully.

Press keyboard `Control + C`  to return to the prompt.


### Start Docker Container

Start SeaTable container again, this time in detached mode:

```bash
docker-compose up -d

```

**NOTE: You should run the above command in a directory with the **`docker-compose.yml`**.**

### Start SeaTable Server

Now you start the SeaTable service and create the first admin user.

```bash
# Start SeaTable service.
docker exec -d seatable /shared/seatable/scripts/seatable.sh start

# Create an admin account.
docker exec -it seatable /shared/seatable/scripts/seatable.sh superuser  

```

Note, the first command uses the option `-d` which starts the service in the background. The second command uses the option `-it` which runs the command in interactive mode.

Now you can access SeaTable via the web interface.

### Activate SeaTable license

Save the license file in the directory /opt/seatable/seatable-data/seatable. Make sure that the name is seatable-license.txt. Then restart SeaTable.

```
docker exec -d seatable /shared/seatable/scripts/seatable.sh restart

```

The licensed users are now available.

## More Configuration Options

### Deploy the https

* Let's encrypt SSL certificate

  If you set `SEATABLE_SERVER_LETSENCRYP` to `true` in "docker-compose.yml", the container requests a Let's Encrypt-signed SSL certificate for you automatically.

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

  **Note**：Since the Nginx configuration file is only generated automatically when you run the container for the first time, you'd better set `SEATABLE_SERVER_LETSENCRYPT = True` before executing the `docker-compose up -d` command for the first time.

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

### Advanced Features

All config files are under `/Your SeaTable data volume/seatable/conf/`. 

* ccnet : `/Your SeaTable data volume/seatable/conf/ccnet.conf`
* seafile : `/Your SeaTable data volume/seatable/conf/seafile.conf`
* dtable-web : `/Your SeaTable data volume/seatable/conf/dtable_web_settings.py`
* dtable-server : `/Your SeaTable data volume/seatable/conf/dtable_server_config.json`
* dtable-events : `/Your SeaTable data volume/seatable/conf/dtable-events.conf`
* Nginx : `/Your SeaTable data volume/seatable/conf/nginx.conf`

After any modification, a restart of the SeaTable Server is necessary for the changes to take effect.

```bash
docker exec -d seatable /shared/seatable/scripts/seatable.sh restart

```

## SeaTable Directory Structure

### Volumes

Placeholder spot for shared volumes. You may elect to store certain persistent information outside of a container, in our case we keep various logfiles and upload directory outside. This allows you to rebuild containers easily without losing important information.

* /shared/seatable: directory for SeaTable Server's configuration and data
* /shared/nginx-logs: directory for the Nginx logs
* /shared/ssl: directory for the SSL certificate

### Logs

The SeaTable logs are saved in `/shared/seatable/logs` in the Docker container or `/Your SeaTable data volume/seatable/logs` on the Docker host.

The Nginx logs are under `/shared/nginx-logs` or `/Your SeaTable data volume/nginx-logs` on the Docker host.

## FAQ

**If for some reasons, the installation failed, how to start from clean state again?**

Remove the directory `/opt/seatable` and start again.

**The Let's Encrypt SSL certificate is about to expire. How do I renew it?**

If the certificate is not renewed automatically, execute the command `/templates/renew_cert.sh` to manually renew the certificate.
