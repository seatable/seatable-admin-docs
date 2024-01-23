# Additional Subdomain

By default SeaTable and all additional components use one single public available domain. This manual explains what to do if you want to make an additional component like n8n available via (sub)domain instead of a port. This article describes the necessary change to the existing caddy container. If you want to use a complete different proxy, please refer the the article ...

## Typical configuration

Look at `n8n.yml` to get an understanding of how caddy is configured to make n8n accessable via port 6231.

```bash
services:
  caddy:
    ports:
      - ${N8N_PORT:-6231}:${N8N_PORT:-6231} # <-- enhances caddy.yml

  n8n-postgres:
    ...

  n8n:
    ...
```

In the n8n.yml we add an additional port to the caddy container by adding an additional port. Imagine you use seatable.example.com to access SeaTable, then port 443 is routed to SeaTable and port 6231 is routed to the n8n container.

## New configuration to use a custom domain

The following example assumes that you want to access n8n not anymore via the port 6231 but with the URL `n8n.example.com`.

1. Make a copy of the n8n.yml and name it e.g. custom-n8n.yml.
2. Replace n8n.yml with custom-n8n.yml in your .env in COMPOSE_FILE.
3. Replace the caddy part of the custom-n8n.yml in this way.

```bash
services:
  caddy:
    labels:
      caddy: n8n.example.com
      caddy.reverse_proxy: "{{upstream 6231}}"
```

This configures caddy to proxy all requests to n8n.example.com to the port 6231, in this case n8n.

Restart all docker containers with the following command to enforce this new setting.

!!! danger "all Containers have to be restarted"

    It is not sufficient to restart only the n8n container. The caddy container has to be restarted to. Docker compose will not detect any change of the caddy.yml, therefore we recommend to stop and restart all containers.

    ```bash
    cd /opt/seatable-compose && \
    docker compose down && \
    docker compose up -d
    ```
