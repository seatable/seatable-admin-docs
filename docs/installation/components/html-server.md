---
# FIXME:
description:
---

# HTML Server

<!-- md:version 6.2 -->

**FIXME:**

## Deployment

The easiest way to deploy the HTML Server is to deploy it on the same host as SeaTable Server.

### Amend the .env file

To install the HTML Server, include `seatable-html-server.yml` in the `COMPOSE_FILE` variable within your `.env` file.
This instructs Docker-Compose to include the `seatable-html-server` service.

Simply copy and paste (:material-content-copy:) the following code into your command line:

```bash
sed -i "s/COMPOSE_FILE='\(.*\)'/COMPOSE_FILE='\1,seatable-html-server.yml'/" /opt/seatable-compose/.env
```

### SeaTable Server Configuration

**FIXME:**

```python
ENABLE_UNIVERSAL_APP_HTML_PAGES = True
ENABLE_HTML_PAGES_AI_AGENT = True
# FIXME: Read from SEATABLE_SERVER_PROTOCOL and SEATABLE_SERVER_HOSTNAME?
DTABLE_HTML_PAGES_SERVER_URL = 'https://YOUR_SEATABLE_DOMAIN/app-server/'
```

Do not forget to apply the configuration changes by recreating the `seatable-server` container:

```bash
cd /opt/seatable-compose
docker compose up -d --force-recreate seatable-server
```

### S3 Configuration

This step is only necessary in case you have configured the [S3 backend](../advanced/s3.md) for files and pictures.

**FIXME:**

Create `custom-seatable-html-server.yml` with the following contents to add the required environment variables to the `seatable-html-server` service:

```yaml
services:
  seatable-html-server:
    environment:
      - SEAF_SERVER_STORAGE_TYPE=s3
      - S3_COMMIT_BUCKET=${S3_COMMIT_BUCKET:?Variable is not set or empty}
      - S3_FS_BUCKET=${S3_FS_BUCKET:?Variable is not set or empty}
      - S3_BLOCK_BUCKET=${S3_BLOCK_BUCKET:?Variable is not set or empty}
      - S3_KEY_ID=${S3_KEY_ID:?Variable is not set or empty}
      - S3_SECRET_KEY=${S3_SECRET_KEY:?Variable is not set or empty}
      - S3_USE_V4_SIGNATURE=${S3_USE_V4_SIGNATURE:-true}
      - S3_AWS_REGION=${S3_AWS_REGION:-us-east-1}
      - S3_HOST=${S3_HOST:-}
      - S3_USE_HTTPS=${S3_USE_HTTPS:-true}
      - S3_PATH_STYLE_REQUEST=${S3_PATH_STYLE_REQUEST:-false}
      - S3_SSE_C_KEY=${S3_SSE_C_KEY:-}
```

Add `custom-seatable-html-server.yml` to the `COMPOSE_FILE` variable inside your `.env` file.

### Start HTML Server

One more step is necessary to download the Docker image for the HTML Server and start the container:

```bash
cd /opt/seatable-compose
docker compose up -d
```

Now custom app pages can be created within universal apps.
