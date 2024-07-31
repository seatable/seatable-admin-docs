---
status: new
---

# Python Pipeline on a separate server

If your user base on your Seatable Server is growing, one of the first components that you could move to a separate server is the python pipeline. This free up ressoures for the main server and it slightly increases the security because customer python code is not executed on the main server.

## Requirements

To install Python Pipeline on a separate server, use at least these ressources:

- 2 CPU
- 4 GB RAM
- 40 GB SSD

Use a separate domain or subdomain that is public available or you need a valid wildcard certificate.
Caddy will generate a let's encrypt certificate.

!!! warning "No self signed certificates"

    Self signed certificates are not recommended. Read the article about [custom certificates](./custom-certificates.md) for more details.

## Deployment of the Python Pipeline

The deployment of a separate python pipeline is simple. Get seatable-release from github like described in the installation of seatable server and only use `python-pipeline-standalone.yml` and `caddy.yml`.

Update your `.env`, that it looks like this and add/update the values according to your needs:

```
COMPOSE_FILE='caddy.yml,python-pipeline-standalone.yml'
COMPOSE_PATH_SEPARATOR=','

# system settings
TIME_ZONE='Europe/Berlin'

# seatable server url
SEATABLE_SERVER_HOSTNAME=seatable.your-url.com

# database
SEATABLE_MYSQL_ROOT_PASSWORD=

# python-pipeline-standalone
PYTHON_SCHEDULER_HOSTNAME=python.your-url.com
PYTHON_SCHEDULER_AUTH_TOKEN=shared secret with dtable_web_settings.py
```

Execute `docker compose up -d` to fire up your separate python pipeline.

## Configuration of SeaTable Server

SeaTable must know where to get the Python Pipeline.

Update `dtable_web_settings.py` and add the public available URL. The two parameters are:

```bash
SEATABLE_FAAS_URL = 'https://python.your-url.com'
SEATABLE_FAAS_AUTH_TOKEN = 'shared secret with python scheduler'
```

Restart seatable service and test your python pipeline.
