# Deploy ONLYOFFICE Documentserver with Docker

## Requirements

ONLYOFFICE Documentserver (ONLYOFFICE) can be installed on the same host as SeaTable Enterprise Edition (SeaTable EE). If ONLYOFFICE is used regularly and by many users, the host should be fitted with more cores and RAM.

This tutorial assumes that [SeaTable EE was deployed following this manual](https://manual.seatable.io/docker/Enterprise-Edition/Deploy%20SeaTable-EE%20with%20Docker/) and is running. Docker and Docker Compose are installed and SeaTable is configured via the docker-compose.yml file.

## Setup

This manual describes the deployment of ONLYOFFICE with Docker. Thanks to Docker Compose, the deployment is straightforward and done with little effort.

[Docker volumes](https://docs.docker.com/storage/volumes/) are utilized for saving configuration parameters and persisting data generated in the ONLYOFFICE Docker container. It is not recommended to change their paths. If you do, account for that when following these instructions.

### Creating Folder Structure and Configuring ONLYOFFICE

When running, stop SeaTable and all associated Docker containers:

```bash
docker-compose down
```

All Docker volumes are mapped to `/opt/oods/DocumentServer`. Create this directory:

```bash
mkdir -p /opt/oods/DocumentServer
```

Create a configuration file in the newly created directory:

```bash
cd /opt/oods/DocumentServer
nano local-production-linux.json
```

Copy the following code block in this file:

```json
{
  "services": {
    "CoAuthoring": {
         "autoAssembly": {
             "enable": true,
             "interval": "5m"
         }
    }
  },
  "FileConverter": {
    "converter": {
        "downloadAttemptMaxCount": 3
    }
  }
}
```

### Modifying docker-compose.yml

Open the docker-compose.yml in `/opt/seatable/` and copy and paste the following codeblock. Add it as the last block before networks.

```yml
oods:
  image: onlyoffice/documentserver:latest
  container_name: oods
  volumes:
    - /opt/oods/DocumentServer/logs:/var/log/onlyoffice
    - /opt/oods/DocumentServer/data:/var/www/onlyoffice/Data
    - /opt/oods/DocumentServer/lib:/var/lib/onlyoffice
    - /opt/oods/DocumentServer/local-production-linux.json:/etc/onlyoffice/documentserver/local-production-linux.json
  environment:
    - JWT_ENABLED=true
    - JWT_SECRET=secretjwttoken  
  networks:
    - seatable-net
```

Alter the value for JWT_SECRET and memorize it for later. 

The docker-compose.yml should look like this:

```yml
version: '2.0'
services:
  db:
    image: mariadb:10.5
    container_name: seatable-mysql
    environment:
      - MYSQL_ROOT_PASSWORD=secretdbpassword            # Root password of MySQL -- must be changed
      - MYSQL_LOG_CONSOLE=true
    volumes:
      - /opt/seatable/mysql-data:/var/lib/mysql         # Volume of MySQL (directory for persistent storage) and mount point in cont>
    networks:
      - seatable-net

  memcached:
    image: memcached:1.5.6
    container_name: seatable-memcached
    entrypoint: memcached -m 256
    networks:
      - seatable-net

  redis:
    image: redis:5.0.7
    container_name: seatable-redis
    networks:
      - seatable-net

  seatable:
    image: seatable/seatable-enterprise:latest
    container_name: seatable
    ports:
      - "80:80"                                         # HTTP port on the Docker host and the port in the container -- must be chan>
      - "443:443"                                       # HTTPS port on the Docker host and the port in the container -- must be cha>
    volumes:
      - /opt/seatable/seatable-data:/shared             # Volume of SeaTable (directory for persistent storage) and mount point in c>
    environment:
      - DB_HOST=db
      - DB_ROOT_PASSWD=secretdbpassword                 # Root password of MySQL -- must be changed to the value set above
      - SEATABLE_SERVER_LETSENCRYPT=True                # Decision on whether or not to use Let's Encrypt for HTTPS, default is Fals>
      - SEATABLE_SERVER_HOSTNAME=seatable.example.com   # Host name -- must be changed
      - TIME_ZONE=Europe/Berlin                         # Optional, default is UTC. Example: Europe/Berlin. Choices can be found her>
    depends_on:
      - db
      - memcached
      - redis
    networks:
      - seatable-net

  oods:
    image: onlyoffice/documentserver:latest
    container_name: oods
    volumes:
      - /opt/oods/DocumentServer/logs:/var/log/onlyoffice
      - /opt/oods/DocumentServer/data:/var/www/onlyoffice/Data
      - /opt/oods/DocumentServer/lib:/var/lib/onlyoffice
      - /opt/oods/DocumentServer/local-production-linux.json:/etc/onlyoffice/documentserver/local-production-linux.json
    environment:
      - JWT_ENABLED=true
      - JWT_SECRET=secretjwttoken
    networks:
      - seatable-net

networks:
  seatable-net:
```


### Modifying dtable_web_setings.py

Open the dtable_web_settings.py:

```bash
cd /opt/seatable/seatable-data/seatable/conf
nano dtable_web_settings.py
```

Copy and paste the following code block at the end of the file:

```python
# onlyoffice
ENABLE_ONLYOFFICE = True
ONLYOFFICE_APIJS_URL = "https://SEATABLE_SERVER_HOSTNAME/onlyofficeds/web-apps/apps/api/documents/api.js"
ONLYOFFICE_FILE_EXTENSION = ('doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'odt', 'fodt', 'odp', 'fodp', 'ods', 'fods', 'csv', 'ppsx', 'pps')
ONLYOFFICE_JWT_SECRET = 'secretjwttoken'
```

Change SEATABLE_SERVER_HOSTNAME to reflect the hostname of your SeaTable server. Additionally, adjust the value for ONLYOFFICE_JWT_SECRET to correspond to the JWT_SECRET in the docker-compose.yml.


### Modifying the nginx Configuration

Open the nginx configuration file:

```bash
cd /opt/seatable/seatable-data/seatable/conf
nano nginx.conf
```

Copy and paste the following lines at the top of the configuration file:

```
# Required for only office document server
map $http_x_forwarded_proto $the_scheme {
  default $http_x_forwarded_proto;
  "" $scheme;
}
map $http_x_forwarded_host $the_host {
  default $http_x_forwarded_host;
  "" $host;
}
map $http_upgrade $proxy_connection {
  default upgrade;
  "" close;
}
```

Add the following location for ONLYOFFICE to the server block for port 443:

```
location /onlyofficeds/ {
  proxy_pass http://oods/;
  proxy_http_version 1.1;
  client_max_body_size 100M;
  proxy_read_timeout 3600s;
  proxy_connect_timeout 3600s;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection $proxy_connection;
  proxy_set_header X-Forwarded-Host $the_host/onlyofficeds;
  proxy_set_header X-Forwarded-Proto $the_scheme;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

### Restarting SeaTable

ONLYOFFICE is now configured and office documents can be directly edited from within SeaTable.

Run docker-compose.yml and start SeaTable:

```
docker-compose up -d
docker exec -d seatable /shared/seatable/scripts/seatable.sh start
```

ONLYOFFICE takes some time to start up. If you get an error message when clicking an office file in SeaTable, be patient. With `docker-compose logs -f oods`, you can monitor the startup progress.

## FAQ

**SeaTable doesn't start anymore/SeaTable is no longer accessible, what can I do?**
It is likely that there is a misconfiguration in either nginx.conf or dtable_web_settings.py.

After docker-composing up, run `docker exec -it seatable nginx -t` to check the nginx configuration. If the nginx configuration is invalid, the output will tell you.

If nginx shows no error, enter the seatable container and start seatable manually:

```bash
docker exec -it seatable bash
/shared/seatable/scripts/seatable.sh start
```
