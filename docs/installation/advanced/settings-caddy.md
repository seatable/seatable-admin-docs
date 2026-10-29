---
description: Advanced Caddy configuration for SeaTable including logging, preserving client IPs behind a front proxy, and more.
---

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

To fix this, Caddy must accept the `X-Forwarded-For` header, but **only from your front proxy**.

!!! danger "Never accept X-Forwarded-For from everyone"

    An earlier version of this page recommended this label:

    ```bash
    caddy.reverse_proxy.header_up: "X-Forwarded-For {http.request.header.X-Forwarded-For}"
    ```

    **Please remove it.** With this label, Caddy forwards the header from any client. Anyone can send a fake IP address and bypass rate limits, the login protection and [IP access restrictions](./ip-access-restriction.md).

**Example Configuration**

Add the IP address (or network) of your front proxy to the **Caddy container** and forward only the verified client IP to the **SeaTable Server container**. Create a custom copy of `caddy.yml` and `seatable-server.yml` for these changes and link them in your `.env` file.

```bash
---
services:
  caddy:
    ...
    labels:
      # new: accept X-Forwarded-For only from your front proxy
      caddy.servers.trusted_proxies: "static 203.0.113.10/32"
      caddy.servers.trusted_proxies_strict: ""

  seatable-server:
    ...
    labels:
      caddy_0: ${SEATABLE_SERVER_PROTOCOL:-https}://${SEATABLE_SERVER_HOSTNAME:?Variable is not set or empty}
      caddy_0.reverse_proxy: "{{upstreams 80}}"
      # new: forward only the verified client ip to seatable nginx
      caddy_0.reverse_proxy.header_up: "X-Forwarded-For {client_ip}"
      ...
```

**Explanation**

- `caddy.servers.trusted_proxies`: Caddy accepts the `X-Forwarded-For` header only from these addresses. Replace `203.0.113.10/32` with the address of your front proxy. You can add several addresses or networks, separated by spaces.
- `caddy.servers.trusted_proxies_strict`: Caddy reads the header from right to left and stops at the first address that is not trusted. A value that the client has added itself is ignored, even if your front proxy appends to the header instead of replacing it.
- `caddy_0.reverse_proxy.header_up`: SeaTable gets exactly one IP address, the client IP that Caddy has verified. Requests that do not come from a trusted proxy get the address of the direct client, as without this configuration.

**Check the result**

Send a request with a fake header, once through your front proxy and once directly to Caddy (if Caddy is reachable directly):

```bash
curl -H "X-Forwarded-For: 1.2.3.4" https://<your-seatable-server>/
tail -n 1 /opt/seatable-server/nginx-logs/dtable-web.access.log
```

The first value in the log line must be your real IP address, not `1.2.3.4`.

!!! warning "Cloudflare and cloud load balancers"

    These services use many IP ranges, and the ranges can change. Add all ranges of your provider (for Cloudflare see [cloudflare.com/ips](https://www.cloudflare.com/ips/)) and keep the list up to date. If an address is missing, SeaTable shows the proxy IP again. This is not a security problem, but your logs are less useful.
