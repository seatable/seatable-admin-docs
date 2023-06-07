# dtable-events Background node

There are two types of tasks performed by dtable-events, local tasks and background tasks.

On the basis of the previous manual, you can also deploy dtable-events background node.

In the following manual, we will show the steps to setup a two nodes deployment

* A dtable-web node running redis, dtable-web, dtable-events local tasks, seaf-server, and dtable-storage-server
* A dtable-events background node running dtable-events background tasks, seaf-server, and dtable-storage-server

## Setup dtable-web node

Modify the configuration file :  `/Your SeaTable data volume/seatable/conf/seatable-controller.conf`

```sh
ENABLE_SEAFILE_SERVER=true
ENABLE_DTABLE_WEB=true
ENABLE_DTABLE_SERVER=false
ENABLE_DTABLE_DB=false
ENABLE_DTABLE_STORAGE_SERVER=true
ENABLE_DTABLE_EVENTS=true
DTABLE_EVENTS_TASK_MODE=foreground

```

### Restart dtable-web node

```sh
docker-compose down

docker-compose up -d

docker exec -it seatable bash

seatable.sh

```

When you see following in the output log, it means success:

```
dtable-events in foreground mode
Skip dtable-server
Skip dtable-db

SeaTable started

```

## Setup dtable-events background node

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
      - SEATABLE_SERVER_HOSTNAME=dtable-events.example.com # Specifies your host name if https is enabled
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

There is no need to Modify the Nginx configuration file.

Modify the dtable-events configuration file :  `/Your SeaTable data volume/seatable/conf/dtable-events.conf`

```sh
[DATABASE]
type = mysql
host = mysql host
port = 3306
username = mysql user
password = password
db_name = dtable_db

[REDIS]
host = dtable-web server‘s IP
port = 6379

```

Create configuration file :  `/Your SeaTable data volume/seatable/conf/seatable-controller.conf`

```sh
ENABLE_SEAFILE_SERVER=true
ENABLE_DTABLE_WEB=false
ENABLE_DTABLE_SERVER=false
ENABLE_DTABLE_DB=false
ENABLE_DTABLE_STORAGE_SERVER=true
ENABLE_DTABLE_EVENTS=true
DTABLE_EVENTS_TASK_MODE=background

```

### Start dtable-events background node

```sh
docker-compose up -d

docker exec -it seatable bash

seatable.sh

```

When you see following in the output log, it means success:

```
dtable-events in background mode
Skip dtable-web
Skip dtable-server
Skip dtable-db

SeaTable started

```
