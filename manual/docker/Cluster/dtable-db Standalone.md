# dtable-db Standalone

On the basis of the previous manual, you can also deploy dtable-db separately.

In the following manual, we will show the steps to setup a three nodes deployment

* A dtable-web node running dtable-web, seaf-server, dtable-events and dtable-storage-server
* A dtable-server node running dtable-server, dtable-storage-server
* A dtable-db node running dtable-db, dtable-storage-server

## Modify dtable-web server configuration file

Modify the configuration file :  `/Your SeaTable data volume/seatable/conf/seatable-controller.conf`

```sh
ENABLE_DTABLE_DB=false

```

Modify dtable-web configuration file  `/Your SeaTable data volume/seatable/conf/dtable_web_settings.py`

```
DTABLE_DB_URL = 'https://example.seatable.com/'  # dtable-db server's url

```

### Restart dtable-web server

```sh
docker-compose up -d

docker exec -it seatable bash

seatable.sh

```

When you see following in the output log, it means success:

```
Skip dtable-server
Skip dtable-db

SeaTable started

```

## Setup dtable-db

### Copy and modify docker-compose.yml

The default directory for SeaTable is `/opt/seatable`. Create the directory:

```
mkdir /opt/seatable

```

**Copy the docker-compose.yml file on the dtable-web server and modify docker-compose.yml.**

vim /opt/seatable/docker-compose.yml

```
version: '2.0'
services:
  seatable:
    image: seatable/seatable-enterprise:latest
    container_name: seatable
    ports:
      - "80:80"
      - "443:443"  # If https is enabled, cancel the comment.
    volumes:
      - /opt/seatable/shared:/shared  # Requested, specifies the path to Seafile data persistent store.
    environment:
      - SEATABLE_SERVER_HOSTNAME=example.seatable.com # Specifies your host name if https is enabled
      - SEATABLE_SERVER_LETSENCRYPT=True
      - TIME_ZONE=Asia/Shanghai # Optional, default is UTC. Should be uncomment and set to your local time zone.
    networks:
      - dtable-net

networks:
  dtable-net:

```

### Copy and modify configuration file

**Prepare configuration file directory**

```
mkdir -p /opt/seatable/shared/seatable/conf

```

**Copy the configuration file on the dtable-web server to the conf directory.**

Modify the Nginx configuration file : `/Your SeaTable data volume/seatable/conf/nginx.conf`

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

    location / {
        if ($request_method = 'OPTIONS') {
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
            add_header Access-Control-Allow-Headers "deviceType,token, authorization, content-type";
            return 204;
        }

        proxy_pass         http://127.0.0.1:7777/;
    ...
    }
}
    

```

Create configuration file :  `/Your SeaTable data volume/seatable/conf/seatable-controller.conf`

```sh
ENABLE_SEAFILE_SERVER=false
ENABLE_DTABLE_WEB=false
ENABLE_DTABLE_SERVER=false
ENABLE_DTABLE_DB=true
ENABLE_DTABLE_STORAGE_SERVER=true
ENABLE_DTABLE_EVENTS=false
DTABLE_EVENTS_TASK_MODE=all

```

### Start dtable-db

```sh
docker-compose up -d

docker exec -it seatable bash

seatable.sh

```

When you see following in the output log, it means success:

```
Skip ccnet-server
Skip seafile-server
Skip dtable-events
Skip dtable-web
Skip dtable-server

SeaTable started

```
