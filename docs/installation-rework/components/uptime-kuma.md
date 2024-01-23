## Use Uptime Kuma on a one node seatable server

This guide shows how to activate Uptime Kuma on a one node seatable server.

#### 1. Change the .env file

Add _uptime-kuma.yml_ to the COMPOSE_FILE variable.

```bash
nano /opt/seatable-compose/.env
```

Your COMPOSE_FILE variable should look something like this:

```bash
COMPOSE_FILE='seatable-docker-proxy.yml,seatable-server.yml,uptime-kuma.yml'
```

#### 2. Update the compose project

```bash
cd /opt/seatable-compose && \
docker-compose up -d
```

#### 3. Configure your Uptime Kuma

Your Uptime Kuma Container provides a Web UI to set up your Uptime Kuma Admin User under _https://<your-seatable-server-hostname>:6230_.

## Things to monitor of your seatable server

Paths:

- https://deploy.seatable-demo.de/api2/ping/
- https://deploy.seatable-demo.de/dtable-server/ping/
- ...
- https://deploy.seatable-demo.de:6231/healthz (n8n)
- https://deploy.seatable-demo.de:6233/welcome/ (onlyoffice)
- ...

## Screenshots

...

## offen

/settings/general wenn status seite die startseite ist.
