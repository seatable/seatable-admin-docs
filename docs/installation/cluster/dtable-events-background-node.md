---
status: wip
---

# dtable-events background Node

`dtable-events` is the workhorse of SeaTable Server, handling resource-intensive tasks such as syncing common datasets, PDF generation, scheduled automations, and more.  
If your system is heavily loaded with these tasks, it may be beneficial to **separate dtable-events onto its own node**. This step is only necessary if you observe resource constraints on `dtable-web`.

There are two types of tasks performed by dtable-events:

- **Foreground tasks** (instant): Must be executed immediately.
- **Background tasks**: Not time-critical and can be processed asynchronously.

**Examples:**

| Type         | Task                                 |
|--------------|--------------------------------------|
| foreground   | Import/Export of a base or view      |
| foreground   | PDF generation                       |
| background   | Common dataset sync                  |
| background   | Sending notifications or emails      |
| background   | Database cleanup                     |
| background   | Scheduled automations                |

SeaTable allows you to **split dtable-events**, moving background tasks to a dedicated node while foreground tasks continue to run alongside `dtable-web`.

<!-- TODO: add image -->

## Setting up the dtable-events background Node

1. **Prepare a new node** with Docker installed.

2. **Copy the following files** from your first node to the new node:
      - `/opt/seatable-compose/.env`
      - `/opt/seatable-compose/seatable-license.txt`
      - `/opt/seatable-server/seatable/conf/dtable_web_settings.py`

        This is mandatory since **dtable-events** reads some configuration settings from `dtable_web_settings.py`.

3. **Edit the `.env` file** on the new node and set the `COMPOSE_FILE` variable to reference only a single YAML file:

    ```
    COMPOSE_FILE='dtable-events.yml'
    ```

### Create `dtable-events.yml`

You can either copy `dtable-web.yml` from the first node or use `seatable-server.yml` from the SeaTable release as a template.  

Apply the following required changes:

??? success "Remove all services except seatable-server"

    The `dtable-events` node only requires the `seatable-server` service. Remove all other services (such as redis, mariadb, or caddy).

??? success "Remove all labels"

    Since `dtable-events` node does not require Caddy or any TLS termination, remove all labels from the `seatable-server` service.

??? success "Add additional environment variables"

    Add or update the following environment variables to ensure only `dtable-event` is enabled:

    ```
    environment:
      # necessary for dtable-events (background)
      - ENABLE_DTABLE_EVENTS=true
      - DTABLE_EVENTS_TASK_MODE=background
      - ENABLE_DTABLE_STORAGE_SERVER=true
      - ENABLE_SEAFILE_SERVER=true
      # should be disabled
      - ENABLE_DTABLE_DB=false
      - ENABLE_DTABLE_WEB=false
      - ENABLE_DTABLE_SERVER=false
      - ENABLE_API_GATEWAY=false
      - SEATABLE_START_MODE=cluster
    ```

??? success "Configure internal network communication"

    Ensure all nodes can reach each other by adding their names and private IP addresses:

    ```
    extra_hosts:
      - "dtable-web:10.0.0.2"
      - "dtable-db:10.0.0.3"
      - "dtable-server:10.0.0.4"
      - "dtable-server-2:10.0.0.5"
      - "dtable-events:10.0.0.6"
    ```

### Example `dtable-events.yml`

*Do not copy and paste directly — adapt as needed:*

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
      - ENABLE_DTABLE_EVENTS=true
      - DTABLE_EVENTS_TASK_MODE=background
      - ENABLE_DTABLE_STORAGE_SERVER=true
      - ENABLE_SEAFILE_SERVER=true
      - ENABLE_DTABLE_DB=false
      - ENABLE_DTABLE_WEB=false
      - ENABLE_DTABLE_SERVER=false
      - ENABLE_API_GATEWAY=false
      - SEATABLE_START_MODE=cluster
    extra_hosts:
      - "dtable-web:10.0.0.2"
      - "dtable-db:10.0.0.3"
      - "dtable-server:10.0.0.4"
      - "dtable-server-2:10.0.0.5"
      - "dtable-events:10.0.0.6"
    networks:
      - frontend-net
networks:
  frontend-net:
    name: frontend-net
```

Start `dtable-events` for the first time and monitor the logs:

```
docker compose up -d
```

??? example "Why are no ports exposed?"

    `dtable-events` does not need to expose any ports. It runs internal cron jobs and subscribes to Redis channels. No direct external connection is required.

## Changes after first start

After starting `dtable-events` for the first time, update the configuration files as follows:

??? success "Add S3 configuration"

    Add the S3 configuration to both `conf/dtable-storage-server.conf` and `conf/seafile.conf` — just as you did on your first node.

Restart the container to apply these changes.

## Final changes on dtable-web

Now that background tasks are handled by the new node, you should disable them on `dtable-web`.

Open `/opt/seatable-compose/dtable-web.yml` and add the following to the environment variables:

```
DTABLE_EVENTS_TASK_MODE=foreground
```

Restart `dtable-web` to apply the changes.

---

Your `dtable-events` background node is now set up, and resource-intensive background tasks are offloaded from your main web node. This improves performance and scalability for large SeaTable installations.
