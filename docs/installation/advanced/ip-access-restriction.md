---
description: Restrict access to your SeaTable Server to selected IP addresses (allowlist) or block single IP addresses (blocklist) with Caddy, while Let's Encrypt keeps working.
---

# IP Access Restriction

By default, your SeaTable Server is accessible from any IP address. This article explains how to limit access to a list of allowed IP addresses (allowlist) or how to block single IP addresses (blocklist). Requests from all other IP addresses are answered with `403 Forbidden`.

The restriction is done by Caddy. You don't have to modify `seatable-server.yml` or `caddy.yml`. Instead, you add one additional yml file and one file containing your IP addresses. This keeps your changes intact during updates.

!!! warning "Public features are restricted too"

    The restriction applies to every request. Users with a non-allowed IP address can't use any features that are meant to be public, for example:

    - Forms (`/dtable/forms/...`)
    - External links and shared views
    - Universal Apps
    - API requests from external services like n8n Cloud, Make or Zapier

    Make sure to add the IP addresses of all users and services that need access.

## Configure an allowlist

### Step 1: Create the file with your allowed IP addresses

Create a new directory `caddy-snippets` inside `/opt/seatable-compose` and add a file `ip-allowlist.caddy`:

```bash
mkdir -p /opt/seatable-compose/caddy-snippets
nano /opt/seatable-compose/caddy-snippets/ip-allowlist.caddy
```

Insert the following content and replace the example IP addresses with your own:

```Caddyfile
@blocked {
	# Office
	not remote_ip 203.0.113.10
	# VPN gateway
	not remote_ip 198.51.100.0/24
	# Home office (multiple addresses can be separated by spaces)
	not remote_ip 192.0.2.44 192.0.2.45
	# Docker networks, required for components on the same host
	not remote_ip private_ranges
}
handle @blocked {
	respond 403
}
```

**Explanation**

- Every line `not remote_ip ...` accepts one or more IP addresses or CIDR ranges, separated by spaces.
- All lines must match for a request to be blocked. In other words: a request is blocked if its IP address is not part of any line.
- Lines starting with `#` are comments.
- `private_ranges` covers all private and loopback networks (e.g. `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`, `127.0.0.0/8`). Components like Collabora Online, OnlyOffice, SeaDoc or the Python Pipeline call your SeaTable Server via its public URL. These requests reach Caddy with an internal Docker IP address and would be blocked without this line.

!!! warning "Use handle, not respond"

    You might find examples that only use `respond @blocked 403`. Don't use this, it leaves gaps. Caddy executes `route` blocks before `respond`, and some components add routes that forward requests directly to another container. For example, [`seatable-html-server.yml`](../components/html-server.md) adds such a route for `/app-server/*`. With `respond`, this path stays accessible for every IP address. `handle` is executed before `route` and therefore blocks these paths as well.

!!! note "Server in a private network"

    If your server is located in a private network (e.g. your company LAN), `private_ranges` allows every client from this network. In this case, replace `private_ranges` with the Docker networks only (usually `172.16.0.0/12`) and add the allowed LAN addresses explicitly.

### Step 2: Create `ip-allowlist.yml`

Create a new file `/opt/seatable-compose/ip-allowlist.yml` with the following content:

```yaml
---
services:
  caddy:
    volumes:
      - ./caddy-snippets:/etc/caddy/custom:ro

  seatable-server:
    labels:
      caddy_0.import: /etc/caddy/custom/ip-allowlist.caddy
```

This mounts the directory `caddy-snippets` into the Caddy container and imports your IP list into the configuration of SeaTable Server. Docker Compose merges these settings with `caddy.yml` and `seatable-server.yml`.

!!! tip "Mount the directory, not the file"

    Please mount the directory and not only the file. Many editors (like vim) replace a file when saving it. A container with a single-file mount would continue to see the old version of your file.

### Step 3: Add `ip-allowlist.yml` to your `.env` file

`ip-allowlist.yml` must be the **last** entry of the `COMPOSE_FILE` variable inside your `.env` file:

```bash
sed -i "s/COMPOSE_FILE='\(.*\)'/COMPOSE_FILE='\1,ip-allowlist.yml'/" /opt/seatable-compose/.env
```

### Step 4: Apply the changes

Run the following command inside `/opt/seatable-compose`:

```bash
docker compose up -d
```

Check the logs of Caddy for errors:

```bash
docker logs caddy 2>&1 | grep -i "invalid block"
```

!!! danger "A syntax error disables SeaTable"

    If your `ip-allowlist.caddy` contains a syntax error, Caddy removes the complete configuration of your SeaTable Server, and SeaTable is no longer accessible. The logs show a message like `Removing invalid block: parsing caddyfile tokens for 'handle' ...`. Fix your file and apply the changes again.

## Test the restriction

Run the following commands from a computer with a non-allowed IP address (e.g. a smartphone hotspot). Replace `seatable.example.com` with your domain:

```bash
curl -s -o /dev/null -w '%{http_code}\n' https://seatable.example.com/
curl -s -o /dev/null -w '%{http_code}\n' https://seatable.example.com/api2/ping/
```

Both commands must return `403`. From an allowed IP address, you get `302` and `200`, and SeaTable works as usual.

## Restrict additional components

Components like Collabora Online or n8n are accessible via their own ports. Each component has its own Caddy configuration, which is not covered by the restriction of SeaTable Server. If you want to restrict these components as well, add their services to `ip-allowlist.yml`. Please note that these services use the label prefix `caddy` instead of `caddy_0`:

```yaml
---
services:
  caddy:
    volumes:
      - ./caddy-snippets:/etc/caddy/custom:ro

  seatable-server:
    labels:
      caddy_0.import: /etc/caddy/custom/ip-allowlist.caddy

  collabora:
    labels:
      caddy.import: /etc/caddy/custom/ip-allowlist.caddy

  n8n:
    labels:
      caddy.import: /etc/caddy/custom/ip-allowlist.caddy
```

These are the service names of the components with their own ports:

| Component        | yml file          | Service name    | Default port |
| ---------------- | ----------------- | --------------- | ------------ |
| Gatus            | `gatus.yml`       | `gatus`         | 6220         |
| Uptime Kuma      | `uptime-kuma.yml` | `uptime-kuma`   | 6230         |
| n8n              | `n8n.yml`         | `n8n`           | 6231         |
| Collabora Online | `collabora.yml`   | `collabora`     | 6232         |
| OnlyOffice       | `onlyoffice.yml`  | `onlyoffice`    | 6233         |
| Zabbix           | `zabbix.yml`      | `zabbix-web`    | 6235         |
| tldraw           | `tldraw.yml`      | `tldraw-worker` | 6239         |
| SeaDoc           | `seadoc.yml`      | `seadoc`        | 6240         |
| Dozzle           | `dozzle.yml`      | `dozzle`        | 6241         |

!!! warning "Only add services you actually use"

    Only add services whose yml file is part of `COMPOSE_FILE`. Otherwise `docker compose` stops with an error like `service "collabora" has neither an image nor a build context specified`.

[`gatus.yml`](../components/gatus.md) adds a redirect from `/status` to the Gatus port. This redirect is executed before the IP check and therefore stays accessible for every IP address. Add the import to the `gatus` service to protect the status page itself.

## Update the list of IP addresses

Caddy does not notice changes to `ip-allowlist.caddy` automatically. After you have changed the file, reload the configuration of Caddy:

```bash
docker exec caddy caddy reload --config /config/caddy/Caddyfile.autosave --adapter caddyfile
```

The reload applies the new list without any interruption. If your file contains an error, the reload is aborted with an error message and the previous configuration stays active.

Alternatively, you can restart Caddy with `docker compose restart caddy`. This takes a few seconds, your certificates are kept.

## Let's Encrypt

Let's Encrypt keeps working without any further configuration. Caddy answers the ACME challenges for your certificates before your IP check is executed:

- HTTP-01 challenges on port 80 are answered internally by Caddy. The restriction is only added to the HTTPS configuration.
- TLS-ALPN-01 challenges on port 443 are answered during the TLS handshake, before any HTTP rule is evaluated.

There is no need to open the restriction for the IP addresses of Let's Encrypt.

## IPv6

If you only allow IPv4 addresses, make sure your domain has no AAAA record. You can check this with:

```bash
dig AAAA seatable.example.com +short
```

If the command returns an IPv6 address, users with IPv4 and IPv6 connect via IPv6. Caddy sees their IPv6 address, which is not on your list, and blocks them. Either remove the AAAA record or add the IPv6 addresses or ranges of your users to `ip-allowlist.caddy`.

If you use IPv6, IPv6 must be enabled for the Docker network of Caddy. Otherwise, Caddy only sees the IP address of the Docker gateway for every IPv6 request. Read more about this in [Activate IPv6](./ipv6-support.md).

## Configure a blocklist

You can also use the opposite approach and block single IP addresses, while all other IP addresses keep access. Remove the `not` from your `ip-allowlist.caddy`:

```Caddyfile
@blocked {
	# Scanner
	remote_ip 203.0.113.10 203.0.113.11
	# Network of a hosting provider
	remote_ip 198.51.100.0/24
}
handle @blocked {
	respond 403
}
```

In this case, a request is blocked if its IP address matches **any** of the lines. All other steps are identical.

!!! note "A blocklist offers limited protection"

    A blocklist only blocks IP addresses you already know. Every other IP address keeps access, including requests via IPv6 if your domain has an AAAA record. If you need to protect your server against brute-force attacks, consider tools like fail2ban or CrowdSec.
