# SeaTable cluster

SeaTable Enterprise Edition support cluster for better performance.

A general architecture is like following:

![](../../images/auto-upload/image-1611562732410.png)

Note

* All nodes use the same docker image, with a different docker compose file and seatable-controller.conf to control the behaviour.

In the following manual, we will show the steps to setup a two nodes deployment

* A dtable-web node running dtable-web, seaf-server and dtable-events
* A dtable-server node

## Setup dtable-web nodes

First, setup a one node deployment according to [Enterprise-Edition](<../../docker/Enterprise-Edition/Deploy SeaTable-EE with Docker.md>)

### Modify configuration file

Modify `docker-compose.yml` to let Redis can be accessed from another node

```
  redis:
    image: redis:5.0.7
    container_name: seatable-redis
    ports:
      "192.xx.xx.xx:6379:6379"   # dtable-web server's IP

```

Modify dtable-web configuration file  `/Your SeaTable data volume/seatable/conf/dtable_web_settings.py`

```
USE_INNER_FILESERVER_FOR_DTABLE_SERVER = False

USE_INNER_DTABLE_SERVER = False
DTABLE_SERVER_URL = 'https://example.seatable.com/'  # dtable-server's url
DTABLE_SOCKET_URL = 'https://example.seatable.com/'  # dtable-server's url

```

Create configuration file :  `/Your SeaTable data volume/seatable/conf/seatable-controller.conf`

```sh
ENABLE_CCNET_SERTVER=true
ENABLE_SEAFILE_SERTVER=true
ENABLE_DTABLE_WEB=true
ENABLE_DTABLE_SERVER=false
ENABLE_DTABLE_EVENTS=true
DTABLE_EVENTS_TASK_MODE=all

```

DTABLE_EVENTS_TASK_MODE can be all, foreground, background. Here we use all. If you want to deploy a separate background node for running dtable-events, use foreground here.

### Restart dtable-web server

```sh
docker-compose up -d

docker exec -it seatable bash

seatable.sh

```

When you see following in the output log, it means success:

```
Skip dtable-server

SeaTable started

```

## Setup dtable-server

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

Modify the dtable-server  configuration file :  `/Your SeaTable data volume/seatable/conf/dtable_server_config.json`

```sh
{
    "host": "mysql host",
    "user": "mysql uer",
    "password": "password",
    "database": "dtable_db",
    "port": 3306,
    "private_key": "xxx",
    "dtable_web_service_url": "xxx",  # dtable-web server's URL
    "redis_host": "192.xx.xx.xx",   # dtable-web server's IP
    "redis_port": 6379,
    "redis_password": ""
}

```

Modify the Nginx configuration file : `/Your SeaTable data volume/seatable/conf/nginx.conf` 

```
upstream dtable_servers {
    server 127.0.0.1:5000;
    keepalive 15;
}

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

    location /socket.io {
        proxy_pass http://dtable_servers;
		...
    }

    location / {
        if ($request_method = 'OPTIONS') {
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
            add_header Access-Control-Allow-Headers "deviceType,token, authorization, content-type";
            return 204;
        }

        proxy_pass         http://dtable_servers;
		...
    }
}
    

```

Create configuration file :  `/Your SeaTable data volume/seatable/seatable-controller.conf`

```sh
ENABLE_CCNET_SERTVER=false
ENABLE_SEAFILE_SERTVER=false
ENABLE_DTABLE_WEB=false
ENABLE_DTABLE_SERVER=true
ENABLE_DTABLE_EVENTS=false
DTABLE_EVENTS_TASK_MODE=all

```

### Start dtable-server

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

SeaTable started

```

## dtable-server cluster (optional)

The dtable-server is stateful. A base should only be loaded into one server and write to that server. Every base has an UUID. The bases are distributed to different dtable-server according to the first 2 character in its UUID. So there are 256 buckets. The dtable-server servers should know the distribution map consistently. We use Etcd server to achieve the goal.

When a dtable-server join to the cluster, it register its information to Etcd cluster. When a dtable-server is dead, the registered information will expire in 90 seconds. A separate cluster monitor program will periodically check available servers and assign buckets to different dtable-servers (it will keep existing assignment as much as possible to keep the assignment stable), and write the new assignment information to Etcd. When the assignment is changed, the dtable-servers will receive real-time notification from Etcd.

When a base is visted by a user, the dtable-web will check the information in Etcd and return the corresponding dtable-server to the browser. The browser then loads the base from the dtable-server and establishes a Socket connection for real-time communication.

For internal communication, dtable-web, dtable-event, dtable-db use dtable-server-proxy node, instead of talking to a specific dtable-server directly.

Here we use two dtable-server nodes, one dtable-server-proxy node and three Etcd servers as an example to show how to setup the cluster.

**components**

* dtable-server-01
* dtable-server-02
* dtable-server-proxy
* etcd-01
* etcd-02
* etcd-03

Note: You need to deploy at least two dtable-server nodes according to the `Setup dtable-server` chapter in the previous manual.


### ETCD

**Install**

```bash
# install
sudo apt install -y etcd etcd-client

# start
service etcd start
```

**ETCD cluster**

[Guide to setting up a cluster in etcd](https://etcd.io/docs/v3.5/tutorials/how-to-setup-cluster/)

### Deploy dtable-server-proxy by docker

Download the [docker-compose.yml](./docker-compose.yml) sample file into dtable-server-proxy's directory and modify the Compose file to fit your environment and settings.

```bash
mkdir -p /opt/dtable-server-proxy/
```

Optional customizable options in the Compose file are:

* Volume path for the container dtable-server-proxy
* Image tag of the dtable-server-proxy version to install (image)
* Time zone (TIME_ZONE)

Note: dtable-server-proxy only needs LAN communication, public domain is not required.

**Create dtable-server-proxy configuration file**

Prepare configuration file directory

```bash
mkdir -p /opt/dtable-server-proxy/shared/seatable-proxy/conf/
```

Create the dtable-server-proxy configuration file :  `/opt/dtable-server-proxy/shared/seatable-proxy/conf/dtable_server_config.json`

```json
{
  "cluster_config": {
    "etcd_host": "192.168.1.3:2379"  // IP of etcd
  }
}
```

**Start dtable-server-proxy**

```bash
docker-compose up -d
```

### Modify dtable-server-01 configuration file

dtable_server_config.json

```json
{
  "cluster_config": {
    "etcd_host": "192.168.1.3:2379",  // IP of etcd
    "node_id": "dtable-server-01",
    "node_url": "https://dtable-server-01.domain.com/",  // domain of dtable-server-01
    "local_node_url": "http://172.17.30.94/"  // intranet IP of dtable-server-01
  }
}
```

Then restart dtable-server-01

```bash
docker exec -d seatable /shared/seatable/scripts/seatable.sh restart
```

Note, the `node_url` is used by the end user to connect to the server. The `local_node_url` is used by the dtable-server-proxy to connect to the server.

### Modify dtable-server-02 configuration file

dtable_server_config.json

```json
{
  "cluster_config": {
    "etcd_host": "192.168.1.3:2379",  // IP of etcd
    "node_id": "dtable-server-02",
    "node_url": "https://dtable-server-02.domain.com/",  // domain of dtable-server-02
    "local_node_url": "http://172.17.30.95/"  // intranet IP of dtable-server-02
  }
}
```

Then restart dtable-server-02, the command is the same as before.

### Modify dtable-web configuration files

dtable_web_settings.py

```python
# etcd
ENABLE_DTABLE_SERVER_CLUSTER = True
ETCD_SERVER_HOST = '192.168.1.3'  # IP of etcd
DTABLE_PROXY_SERVER_URL = 'http://192.168.1.5:5550/'  # IP of dtable-server-proxy
```

dtable-db.conf

```conf
[dtable cache]
dtable_server_url = "http://192.168.1.5:5550/"  # IP of dtable-server-proxy
```

Then restart dtable-web, the command is the same as before.

Now you can use the dtable-server cluster.

### Load balance

In some cases, you can manually load balancing

``` bash
curl -X POST http://192.168.1.5:5555/rebalance/  # IP of dtable-server-proxy
```
