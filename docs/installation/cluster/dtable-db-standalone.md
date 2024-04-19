---
status: new
---

# dtable-db Standalone

On the basis of the previous manual, you can also deploy dtable-db separately.

In the following manual, we will show the steps to setup a three nodes deployment

- A dtable-web node running dtable-web, seaf-server, dtable-events and dtable-storage-server
- A dtable-server node running dtable-server, dtable-storage-server
- A dtable-db node running dtable-db, dtable-storage-server

## Modify dtable-web server configuration file

Modify the configuration file : `/Your SeaTable data volume/seatable/conf/seatable-controller.conf`

```sh
ENABLE_DTABLE_DB=false

```

Modify dtable-web configuration file `/Your SeaTable data volume/seatable/conf/dtable_web_settings.py`

```
DTABLE_DB_URL = 'https://dtable-db.example.com'  # dtable-db server's url
INNER_DTABLE_DB_URL = 'http://192.168.0.3'  # LAN dtable-db server's url

```

### Restart dtable-web server

```sh
docker compose up -d

docker exec -it seatable bash

seatable.sh

```

When you see following in the output log, it means success:

```
Skip dtable-server
Skip dtable-db

SeaTable started

```

## Modify dtable-server server configuration file

Modify dtable-server configuration file `/Your SeaTable data volume/seatable/conf/dtable_server_config.json`

```
"dtable_db_service_url":  "https://dtable-db.example.com"  // dtable-db server's url

```

### Restart dtable-server server

```sh
docker compose up -d

docker exec -it seatable bash

seatable.sh

```

When you see following in the output log, it means success:

```
Skip seafile-server
Skip dtable-events
Skip dtable-web
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
      - SEATABLE_SERVER_HOSTNAME=dtable-db.example.com # Specifies your host name if https is enabled
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
    if ($host = dtable-db.example.com) {
        return 301 https://$host$request_uri;
    }
    listen 80;
    server_name dtable-db.example.com;
    return 404;
}

server {
    server_name dtable-db.example.com;
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

server {
    server_name 192.168.0.3;
    listen 80;

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

Create configuration file : `/Your SeaTable data volume/seatable/conf/seatable-controller.conf`

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
docker compose up -d

docker exec -it seatable bash

seatable.sh

```

When you see following in the output log, it means success:

```
Skip seafile-server
Skip dtable-events
Skip dtable-web
Skip dtable-server

SeaTable started

```
