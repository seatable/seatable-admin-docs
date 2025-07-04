---
status: wip
---

# Installation dtable-server standalone

Next step in the build of of this cluster is to move dtable-server to a separate node.

![SeaTable Cluster: dtable-server standalone](../../assets/images/seatable-cluster-dtable-server-standalone.png)

## Setting Up a Standalone dtable-server

Prepare a new node with Docker installed, and copy the following files from one of your other nodes to this new node:

- `/opt/seatable-compose/.env`
- `/opt/seatable-compose/seatable-license.txt`

Open the `.env` file on the new node and ensure that the `COMPOSE_FILE` variable references only a single YAML file, like this:

```
COMPOSE_FILE='seatable-server-standalone.yml'
```

Copy `seatable-server.yml` to `seatable-server-standalone.yml` and make the following changes to make this a standalone dtable-server.

Apply the following required changes to this file:

??? success "Remove all services except seatable-server"

        The `dtable-db` node only requires the `seatable-server` service. Remove all other services (such as redis, mariadb, or caddy).

??? success "Add additional environment variables"

    Add or update the following environment variables to ensure only `dtable-db` is enabled:

    ```
    environment:
      #... all default environment variables in seatable-server.yml ...
      # this node should only run dtable-server, all other services are disabled
      - ENABLE_DTABLE_DB=false
      - ENABLE_DTABLE_STORAGE_SERVER=true
      - ENABLE_SEAFILE_SERVER=false
      - ENABLE_DTABLE_WEB=false
      - ENABLE_DTABLE_SERVER=true
      - ENABLE_DTABLE_EVENTS=false
      - ENABLE_API_GATEWAY=false
      - SEATABLE_START_MODE=cluster
    ```

??? success "Expose port 5000"

    The `dtable-server` node must be accessible to other nodes. Add the following to the `seatable-server` service:

    ```
    ports:
      - 5000:5000
    ```

??? success "Configure internal network communication"

    Node-to-node communication uses the internal network. Ensure all nodes can reach each other by adding their names and private IP addresses:

    ```
    extra_hosts:
      - "dtable-web:10.0.0.2"
      - "dtable-db:10.0.0.3"
      - "dtable-server:10.0.0.4"
    ```

For reference, here is an example of what your `dtable-server-standalone.yml` might look like (do not copy and paste directly — adapt as needed):

```
---
services:
  seatable-server:
    image: ${SEATABLE_IMAGE:-seatable/seatable-enterprise:x.x.x}
    restart: unless-stopped
    container_name: seatable-server
    volumes:
      - "/opt/seatable-server:/shared"
      - type: bind
        source: "./seatable-license.txt"
        target: "/shared/seatable/seatable-license.txt"
        read_only: ${SEATABLE_LICENSE_FORCE_READ_ONLY:-false}
    environment:
      ...
      ...
      # this node should only run dtable-server
      - ENABLE_DTABLE_DB=false
      - ENABLE_DTABLE_STORAGE_SERVER=true
      - ENABLE_SEAFILE_SERVER=false
      - ENABLE_DTABLE_WEB=false
      - ENABLE_DTABLE_SERVER=true
      - ENABLE_DTABLE_EVENTS=false
      - ENABLE_API_GATEWAY=false
      - SEATABLE_START_MODE=cluster
    ports:
      - 5000:5000
    extra_hosts:
      - "dtable-web:10.0.0.2"
      - "dtable-db:10.0.0.3"
      - "dtable-server:10.0.0.4"
    networks:
      - frontend-net
networks:
  frontend-net:
    name: frontend-net
```

Now, start dtable-db for the first time and monitor the logs:

```
docker compose up -d
```

## Changes after first start

After the first start of `dtable-server` you need to make the following changes to newly created configuration files:

??? success "Add S3 configuration"

    Add the S3 configuration to `conf/dtable-storage-server.conf - analog to your first or second node. 

??? success "Two additional configuration changes"

    Open `conf/dtable_server_config.json` and add these two entries:

    ```
    {
        "dtable_db_service_url": "http://dtable-db:7777",
        "dtable_web_service_url": "http://dtable-web:8000" 
    }
    ```

Now it is time to restart dtable-server and verify that the service is running, port 5000 is exposed and a `pong` is returned. Simply run:

```
curl 127.0.0.1:5000/ping/
```

## Tell dtable-web where to find dtable-server

Now that dtable-server is up and running, it is time to tell dtable-web to use this separate node instead of the internal component. 
These are the changes, you have to do.

??? success "Disable dtable-server in `.env`"

    Open `/opt/seatable-compose/dtable-web.yml` and make these changes:

    ```
    environment:
      - ENABLE_DTABLE_SERVER=false
    extra_hosts:
      - "dtable-web:10.0.0.2"
      - "dtable-db:10.0.0.3"
      - "dtable-server:10.0.0.4"
    ports:
      - "8000:8000"
    ```


??? success "Update API-Gateway"

    Open the configuration file `conf/dtable-api-gateway.conf` and add these lines to tell this node, where to find `dtable-server`

    ```
    [dtable-server]
    server_address = "http://dtable-server:5000"
    ```

??? success "Update `dtable_web_settings.py`"

    Open the configuration file `/conf/dtable_web_settings.py` and add this line:

    ```
    INNER_DTABLE_SERVER_URL = 'http://dtable-server:5000/'
    ```

## Additional changes on dtable-db

Also on dtable-db it is necessary to tell where to find dtable-server.

??? success "Update `dtable-db.conf`"

    Search for this section and update the values.

    ```
    [dtable cache]
    dtable_server_url = "http://dtable-server:5000"
    ```

## Restart SeaTable on all three nodes

```sh
docker compose up -d
```

## Verify complete setup 

Open any base in your webbrowser and verify that logs are created in dtable-server.
Congratulations. You're running now a separate dtable-server and you achieved the next step on your build of a SeaTable Cluster.