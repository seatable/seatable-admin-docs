# Uptime Kuma

This guide shows how to activate Uptime Kuma on a one node seatable server.

## Installation

### Change the .env file

Add _uptime-kuma.yml_ to the COMPOSE_FILE variable.

```bash
nano /opt/seatable-compose/.env
```

Your COMPOSE_FILE variable should look something like this:

```bash
COMPOSE_FILE='seatable-docker-proxy.yml,seatable-server.yml,uptime-kuma.yml'
```

### Update the compose project

```bash
cd /opt/seatable-compose && \
docker compose up -d
```

### Configure your Uptime Kuma

Your Uptime Kuma Container provides a Web UI to set up your Uptime Kuma Admin User under `https://<your-seatable-server-hostname>:6230`.

## Things to monitor of your seatable server

Paths:

- https://deploy.seatable-demo.de/api2/ping/
- https://deploy.seatable-demo.de/dtable-server/ping/
- ...
- https://deploy.seatable-demo.de:6231/healthz (n8n)
- https://deploy.seatable-demo.de:6232/ (collabora online)
- https://deploy.seatable-demo.de:6233/welcome/ (onlyoffice)
- ...

## Screenshots

will be added shortly.

<!--## offen
/settings/general wenn status seite die startseite ist.
-->
