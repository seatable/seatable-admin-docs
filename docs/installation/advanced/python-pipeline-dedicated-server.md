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

Deployment is simple.

Get seatable-release from github, only use python-pipeline.yml and caddy.yml. (not seatable-server.yml)

Update .env and use docker compose up -d.

## Configuration of SeaTable Server

SeaTable must know where to get the Python Pipeline.

Update `dtable_web_settings.py` and add the public available URL. The two parameters are:

```bash
SEATABLE_FAAS_URL = 'https://the-public-url-of-python-scheduler'
SEATABLE_FAAS_AUTH_TOKEN = 'the secret from your .env'
```
