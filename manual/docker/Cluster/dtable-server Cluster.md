# dtable-server cluster (optional)

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
    "etcd_host_list": ["etcd-01.example.com:2379", "etcd-02.example.com:2379", "etcd-03.example.com:2379"]  // domain of etcd servers
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
    "etcd_host_list": ["etcd-01.example.com:2379", "etcd-02.example.com:2379", "etcd-03.example.com:2379"],  // domain of etcd servers
    "node_id": "dtable-server-01",
    "node_url": "https://dtable-server-01.example.com/",  // domain of dtable-server-01
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
    "etcd_host_list": ["etcd-01.example.com:2379", "etcd-02.example.com:2379", "etcd-03.example.com:2379"],  // domain of etcd servers
    "node_id": "dtable-server-02",
    "node_url": "https://dtable-server-02.example.com/",  // domain of dtable-server-02
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
ETCD_SERVER_HOST_LIST = ['etcd-01.example.com', 'etcd-02.example.com', 'etcd-03.example.com']  # domain of etcd servers
DTABLE_PROXY_SERVER_URL = 'http://dtable-server-proxy.example.com:5550/'  # domain of dtable-server-proxy
```

dtable-db.conf

```conf
[dtable cache]
dtable_server_url = "http://dtable-server-proxy.example.com:5550/"  # domain of dtable-server-proxy
```

Then restart dtable-web, the command is the same as before.

Now you can use the dtable-server cluster.

### Load balance

In some cases, you can manually load balancing

``` bash
curl -X POST http://dtable-server-proxy.example.com:5555/rebalance/  # domain of dtable-server-proxy
```

## Deploy dtable-server-slave by docker (optional)

When you share a base and the number of rows is greater than 50000, deploying the dtable-server-slave can share the pressure of the dtable-servers.

The dtable-server-slave docker image and the SeaTable docker image are the same.

**components**

* dtable-server-slave

Note: The dtable-server-slave is based on the dtable-server Cluster.

### Copy and modify docker-compose.yml

The default directory for SeaTable is `/opt/seatable`. Create the directory:

```
mkdir /opt/seatable

```

**Copy the docker-compose.yml file on the dtable-server server and modify docker-compose.yml.**

Note: The dtable-server-slave only needs LAN communication, public domain is not required. The port of the dtable-server-slave is 4000.

vim /opt/seatable/docker-compose.yml

```
version: '2.0'
services:
  seatable:
    image: seatable/seatable-enterprise:latest
    container_name: seatable
    ports:
      - "4000:4000"  # Important !
    volumes:
      - /opt/seatable/shared:/shared  # Requested, specifies the path to Seafile data persistent store.
    environment:
      # - SEATABLE_SERVER_HOSTNAME=dtable-server.example.com
      # - SEATABLE_SERVER_LETSENCRYPT=false
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

**Copy the configuration file on the dtable-server server to the conf directory.**

Copy file dtable_server_config.json to dtable_server_slave_config.json.

```sh
cp dtable_server_config.json dtable_server_slave_config.json.
```

Modify the dtable-server-slave configuration file :  `/Your SeaTable data volume/seatable/conf/dtable_server_slave_config.json`

```json
{
    "host": "mysql host",
    "user": "mysql uer",
    "password": "password",
    "database": "dtable_db",
    "port": 3306,
    "private_key": "xxx",
    "dtable_web_service_url": "xxx",  // dtable-web server's URL
    "dtable_server_proxy": "http://dtable-server-proxy.example.com:5550/"  // domain of dtable-server-proxy
}

```

### Start dtable-server-slave server

```sh
docker-compose up -d

docker exec -it seatable bash

/templates/dtable-server-slave.sh start

```

### Modify dtable-server-01 and dtable-server-02 configuration file

dtable_server_config.json

```json
{
  "worker_threads_rows_limit": 50000,
  "dtable_server_slave_url": "http://172.17.30.100:4000/"  // intranet IP of dtable-server-slave
}
```

Then restart dtable-server-01 and dtable-server-02

```bash
docker exec -d seatable /shared/seatable/scripts/seatable.sh restart
```

Now you can use the dtable-server-slave.
