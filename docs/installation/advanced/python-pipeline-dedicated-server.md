---
status: wip
---

# Python Pipeline on a separate server

If your user base on your Seatable Server is growing, one of the first components that you could move to a separate server is the python pipeline. This free up ressoures for the main server and it increases the security because customer python code is not executed on the main server.

## Requirements

To install Python Pipeline on a separate server, use at least these ressources:

- 2 CPU
- 4 GB RAM
- 40 GB SSD

Use a separate domain or subdomain that is public available or you need a valid wildcard certificate.
Caddy will generate a let's encrypt certificate.

!!! warning "No self signed certificates"

    Self signed certificates are not recommended. Read the article about [custom certificates](./custom-certificates.md) for more details.

!!! warning "Configure a firewall"

    Please configure a firewall to only allow access to port 80 and 443.
    These ports are required in order to receive a certificate from Let's Encrypt.

    The value of the variable `SEATABLE_SERVER_PUBLIC_IP` is used by Caddy to restrict access to the `python-scheduler` on layer 7.
    Only the virtual machine running `dtable-web` should be allowed to access the python-scheduler component.

    The Python pipeline should **not** be deployed on a virtual machine that is attached to a private network since the script containers can
    access this network interface if you do not configure any additional firewall rules.

## Deployment of the Python Pipeline

The deployment of a separate python pipeline is simple. Get seatable-release from github like described in the installation of seatable server and only use `python-pipeline-standalone.yml`.

Update your `.env`, that it looks like this and add/update the values according to your needs:

```
COMPOSE_FILE='python-pipeline-standalone.yml'
COMPOSE_PATH_SEPARATOR=','

# system settings
TIME_ZONE='Europe/Berlin'

# seatable server url
SEATABLE_SERVER_HOSTNAME=seatable.your-url.com

# database
MARIADB_PASSWORD=your-password

# python-pipeline-standalone
PYTHON_SCHEDULER_HOSTNAME=python.your-url.com
PYTHON_SCHEDULER_AUTH_TOKEN=shared secret with dtable_web_settings.py
# Only this IP is allowed to access the python-scheduler
SEATABLE_SERVER_PUBLIC_IP='IP of seatable.your-url.com'
```

Execute `docker compose up -d` to fire up your separate python pipeline.

## Configuration of SeaTable Server

SeaTable must know how to access the Python Pipeline.

Update the `.env` on the seatable server and add these two informations:

```bash
PYTHON_SCHEDULER_URL=https://python.your-url.com
PYTHON_SCHEDULER_AUTH_TOKEN=shared secret with python scheduler
```

Restart seatable service and test your python pipeline.
