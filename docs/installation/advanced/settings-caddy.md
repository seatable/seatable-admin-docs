# Advanced Settings for Caddy

## Enabling Logging for Caddy Docker Proxy

To enable logging for the Lucas Lorentz Caddy Docker Proxy, you need to add a label to the **service container** (not the proxy container itself). For SeaTable Server, you can activate logging by adding the `caddy.log` label to your `seatable-server.yml` file.

**Example Configuration**

```
---
services:
  seatable-server:
    ...
    labels:
      caddy: ${SEATABLE_SERVER_PROTOCOL:-https}://${SEATABLE_SERVER_HOSTNAME:?Variable is not set or empty}
      caddy.log:
      caddy.reverse_proxy: "{{upstreams 80}}"
      ...
```

**Explanation**

This label `caddy.log:` enables logging for the service and outputs logs to `stdout`. Once configured, you can view the logs using standard Docker commands, such as `docker logs <container_name> ` or `docker compose logs seatable-server`.

These logs are specific to the service container (e.g., SeaTable Server). To view logs for the Caddy proxy itself, check the logs of the Caddy proxy container.


