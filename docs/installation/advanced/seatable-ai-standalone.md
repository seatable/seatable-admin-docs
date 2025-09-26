# Standalone Deployment of SeaTable AI

This guide describes the standalone deployment of `seatable-ai` on a dedicated server or virtual machine.

## Prerequisites

- You have successfully installed [Docker and Docker-Compose](../basic-setup.md#install-docker-and-docker-compose-plugin)
- You have [downloaded the latest `.yml` files](../basic-setup.md#1-create-basic-structure) from the `seatable-release` GitHub repository
- The hosts destined to run `seatable-ai` and other SeaTable components are attached to the same private network

## SeaTable AI Configuration

The following section outlines an `.env` file with the settings needed to run `seatable-ai`.
These changes should be made inside `/opt/seatable-compose/.env`:

```ini
COMPOSE_FILE='seatable-ai-standalone.yml'
COMPOSE_PATH_SEPARATOR=','

# system settings
TIME_ZONE='Europe/Berlin'

# database
MARIADB_HOST=
MARIADB_PORT=3306
MARIADB_PASSWORD=

# redis
REDIS_HOST=
REDIS_PORT=6379
REDIS_PASSWORD=

# This private key must have the same value as the JWT_PRIVATE_KEY variable on other SeaTable nodes
JWT_PRIVATE_KEY=

# Public URL of your SeaTable server
SEATABLE_SERVER_URL=https://seatable.your-domain.com

# Cluster-internal URL of dtable-server
INNER_DTABLE_SERVER_URL=http://dtable-server:5000

# Cluster-internal URL of dtable-db
INNER_DTABLE_DB_URL=http://dtable-db:7777

# LLM
SEATABLE_AI_LLM_TYPE=openai
SEATABLE_AI_LLM_URL=
SEATABLE_AI_LLM_KEY=...
SEATABLE_AI_LLM_MODEL=gpt-4o-mini # recommended
```

!!! warning
    - In case you are not using password authentication for Redis, you should not specify a value after the equals sign (`=`) for the `REDIS_PASSWORD` variable.
      Specifying an empty string (e.g. `REDIS_PASSWORD=""`) will cause problems.

    - By default, the ports of `dtable-server` (5000) and `dtable-db` (7777) are not exposed to the host. This requires a manual change inside the `.yml` file.

### LLM Provider Configuration

Please refer to the documentation on [configuring your LLM provider of choice](../components/seatable-ai.md#llm-provider-configuration).
These configuration details do not change depending on the deployment topology of `seatable-server` and `seatable-ai`.

### Start SeaTable AI

You can now start SeaTable AI by running the following command inside your terminal:

```bash
cd /opt/seatable-compose
docker compose up -d
```

## Configuration of SeaTable Server

Since `seatable-ai` is now running on a separate host or virtual machine, the following configuration changes must be made inside the `.env` file on the host running the `seatable-server` container:

```ini
ENABLE_SEATABLE_AI=true
SEATABLE_AI_SERVER_URL='http://seatable-ai.example.com:8888'
```

Restart the `seatable-server` service and test your SeaTable AI:

```bash
cd /opt/seatable-compose
docker compose up -d
```
