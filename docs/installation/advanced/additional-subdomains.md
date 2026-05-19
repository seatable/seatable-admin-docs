---
description: Configure additional subdomains for SeaTable components like n8n using Caddy instead of accessing them via port numbers.
---

# Additional Subdomain

By default SeaTable and all additional components use one single public available domain. This manual explains what to do if you want to make an additional component like n8n available via (sub)domain instead of a port. This article describes the necessary change to the existing caddy container. If you want to use a complete different proxy, please refer the the article ...

## Typical configuration

Look at `n8n.yml` to get an understanding of how caddy is configured to make n8n accessable via port 6231.

```yaml
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

1. Create `custom-n8n.yml` to extend the default definition of the `n8n` service.
2. Insert the following block into `custom-n8n.yml`:
    ```yaml
    services:
      n8n:
        labels:
          caddy: n8n.example.com
          caddy.reverse_proxy: "{{upstreams 5678}}"
    ```
3. Add `custom-n8n.yml` to the `COMPOSE_FILE` variable inside your `.env` file.

This configures Caddy to proxy all requests for `n8n.example.com` to port 5678 of the `n8n` service.

Apply the changes by running the following command inside `/opt/seatable-compose`:

```bash
docker compose up -d
```
