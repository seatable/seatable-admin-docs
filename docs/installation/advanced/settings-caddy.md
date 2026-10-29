---
description: Advanced Caddy configuration for SeaTable including logging, preserving client IPs behind a front proxy, and more.
---

# Advanced Settings for Caddy

## How to Customize Caddy

Caddy is configured with Docker labels. Every service that Caddy makes available has its own labels in its yml file, for example `seatable-server.yml` or `n8n.yml`.

!!! warning "Do not modify the yml files of seatable-release"

    Never change `caddy.yml`, `seatable-server.yml` or the other yml files directly, and do not copy them. They are replaced with every update, and a copy does not get future changes like new security headers.

    Instead, create an additional `custom-<name>.yml` file that **only contains your changes**, and add it to the `COMPOSE_FILE` variable in your `.env` file, **after** the original file. Docker Compose merges both files. A label in your custom file adds a new setting or replaces the label with the same name. Read [Customizations](../../configuration/customizations.md) for details.

    Keep all files that are already in the list and add your custom files at the end:

    ```ini
    # before
    COMPOSE_FILE='caddy.yml,seatable-server.yml,...'
    # after
    COMPOSE_FILE='caddy.yml,seatable-server.yml,...,custom-caddy.yml,custom-seatable-server.yml'
    ```

**Which label prefix to use**

The label prefix must match the prefix in the original yml file:

| Service | Prefix | Used for |
| --- | --- | --- |
| `seatable-server` | `caddy_0` | SeaTable Server (`https://<your-seatable-server>`) |
| `seatable-server` | `caddy_1` | Redirect from http to https (do not change) |
| `caddy` | `caddy` | Global options of Caddy (no address) |
| All other components (n8n, Collabora, OnlyOffice, ...) | `caddy` | The component |

SeaTable Server needs two prefixes because it defines two configuration blocks. If you use `caddy.` instead of `caddy_0.` for SeaTable Server, Caddy creates an invalid second configuration block and ignores your setting.

## Enabling Logging for Caddy Docker Proxy

To enable logging for the Lucas Lorentz Caddy Docker Proxy, you need to add a label to the **service container** (not the proxy container itself). For SeaTable Server, you can activate logging by adding the `caddy_0.log` label to your `custom-seatable-server.yml` file.

**Example Configuration**

```yaml
# custom-seatable-server.yml
---
services:
  seatable-server:
    labels:
      # new: activate logs
      caddy_0.log: ""
```

**Explanation**

This label `caddy_0.log` enables the access log of Caddy for SeaTable Server. Caddy writes these logs to the output of the **Caddy container**, not of the SeaTable Server container. You can view them with `docker logs caddy`.

Only requests to SeaTable Server are logged. Requests to other components (e.g. n8n or Collabora) are only logged if you add the `caddy.log` label to these services as well.

## Preserve the Original Client IP Behind a Front Proxy

If there is an additional reverse proxy (for example, a company-wide load balancer or a Cloudflare proxy) placed in front of your Caddy instance, you may notice that the SeaTable logs, web interface, or the underlying Nginx access logs only show the proxy’s IP address instead of the real client IP. This happens because Caddy treats the front proxy as the client and therefore forwards its IP instead of the external user's one.

To fix this, Caddy must accept the `X-Forwarded-For` header, but **only from your front proxy**.

!!! danger "Never accept X-Forwarded-For from everyone"

    An earlier version of this page recommended this label:

    ```bash
    caddy_0.reverse_proxy.header_up: "X-Forwarded-For {http.request.header.X-Forwarded-For}"
    ```

    **Please remove it** (older configurations may use the prefix `caddy.` instead of `caddy_0.`). With this label, Caddy forwards the header from any client. Anyone can send a fake IP address and bypass rate limits, the login protection and [IP access restrictions](./ip-access-restriction.md).

**Example Configuration**

Add the IP address (or network) of your front proxy to the **Caddy container** and forward only the verified client IP to the **SeaTable Server container**. You need two custom files:

```yaml
# custom-caddy.yml
---
services:
  caddy:
    labels:
      # new: accept X-Forwarded-For only from your front proxy
      caddy.servers.trusted_proxies: "static 203.0.113.10/32"
      caddy.servers.trusted_proxies_strict: ""
```

```yaml
# custom-seatable-server.yml
---
services:
  seatable-server:
    labels:
      # new: forward only the verified client ip to seatable nginx
      caddy_0.reverse_proxy.header_up: "X-Forwarded-For {client_ip}"
```

Add both files to the `COMPOSE_FILE` variable in your `.env` file, after `caddy.yml` and `seatable-server.yml`, and restart with `docker compose up -d`.

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
