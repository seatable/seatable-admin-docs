# Advanced Settings for Caddy

## Enabling Logging for Caddy Docker Proxy

To enable logging for the Lucas Lorentz Caddy Docker Proxy, you need to add a label to the **service container** (not the proxy container itself). For SeaTable Server, you can activate logging by adding the `caddy.log` label to your `seatable-server.yml` file.

**Example Configuration**

```bash
---
services:
  seatable-server:
    ...
    labels:
      caddy: ${SEATABLE_SERVER_PROTOCOL:-https}://${SEATABLE_SERVER_HOSTNAME:?Variable is not set or empty}
      # new: activate logs
      caddy.log:
      caddy.reverse_proxy: "{{upstreams 80}}"
      ...
```

**Explanation**

This label `caddy.log:` enables logging for the service and outputs logs to `stdout`. Once configured, you can view the logs using standard Docker commands, such as `docker logs <container_name> ` or `docker compose logs seatable-server`.

These logs are specific to the service container (e.g., SeaTable Server). To view logs for the Caddy proxy itself, check the logs of the Caddy proxy container.

## Preserve the Original Client IP Behind a Front Proxy

If there is an additional reverse proxy (for example, a company-wide load balancer or a Cloudflare proxy) placed in front of your Caddy instance, you may notice that the SeaTable logs, web interface, or the underlying Nginx access logs only show the proxy’s IP address instead of the real client IP. This happens because Caddy treats the front proxy as the client and therefore forwards its IP instead of the external user's one.

To fix this, you can configure Caddy to forward the original client’s IP address using the `X-Forwarded-For` header.

**Example Configuration**

```bash
---
services:
  seatable-server:
    ...
    labels:
      caddy: ${SEATABLE_SERVER_PROTOCOL:-https}://${SEATABLE_SERVER_HOSTNAME:?Variable is not set or empty}
      caddy.reverse_proxy: "{{upstreams 80}}"
      # new: forward external ip to seatable nginx
      caddy.reverse_proxy.header_up: "X-Forwarded-For {http.request.header.X-Forwarded-For}"
```

**Explanation**

The label `caddy.reverse_proxy.header_up: "X-Forwarded-For {http.request.header.X-Forwarded-For}"` instructs Caddy to copy the existing `X-Forwarded-For` header from the incoming HTTP request (added by the front proxy) and send it to the SeaTable Nginx container. As a result, SeaTable and its embedded Nginx will correctly log and display the original client IP address instead of the proxy’s IP.

If there is no such header from the front proxy, Caddy will automatically generate one with the client’s own address. This ensures that IP forwarding works as expected in both single-proxy and multi-proxy setups.