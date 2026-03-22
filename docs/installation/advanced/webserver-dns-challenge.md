---
description: Configure Caddy to use DNS-01 challenge for Let's Encrypt certificates when ports 80/443 are not publicly reachable.
---

# Using Let's Encrypt with DNS Challenge (caddy-dns) Instead of HTTP Ports 80/443

By default, SeaTable uses Caddy with the HTTP-01 challenge method to automatically request and renew a Let's Encrypt certificate. This approach requires that ports **80** and **443** are publicly reachable so that Let's Encrypt can validate domain ownership.

In environments where these ports cannot or should not be exposed (e.g. internal installations, restrictive firewalls, or isolated networks), you can alternatively use the **DNS-01 challenge** via the **caddy-dns plugins**.

## Advantages and Requirements of DNS Challenge

When using the DNS challenge:

- No inbound HTTP/HTTPS access from the internet is required.
- The system does not need to be publicly reachable.
- Certificate validation happens via DNS TXT records.

!!! warning "Custom Caddy build required"

    This setup requires building a custom Docker image that includes:
    
    - the appropriate DNS provider plugin  
    - the `caddy-docker-proxy` plugin  

    Therefore, this configuration is intended for advanced administrators who are familiar with managing DNS zones and understand DNS propagation behavior.

!!! warning "DNS-Provider support is mandatory"

    **caddy-dns** supports many common DNS providers (e.g. Hetzner, Cloudflare, Route53 and others). A full list is available in the official repository:
    [caddy-dns](https://github.com/caddy-dns)
    
    Make sure your DNS provider is supported. Otherwise, this setup will not work.
    
    Depending on your provider, you may need:

    - An API token  
    - API key and secret  
    - A dedicated DNS API user  
    - Appropriate zone permissions  

## Step 1: Replace the Default Caddy Configuration

Instead of using the default `caddy.yml`, create a new YAML file that builds a custom Caddy container.

Your custom Caddy must include two plugins:

- `lucaslorentz/caddy-docker-proxy`
- `caddy-dns/your-dns-provider`

You can find the correct plugin name for your DNS provider at: [https://github.com/caddy-dns](https://github.com/caddy-dns)

Even though ports 80 and 443 are still mapped internally, they do **not** need to be publicly reachable for DNS-01 validation.

Below is an example using the **Hetzner DNS plugin**:

```yaml
---
services:
  caddy:
    build:
      dockerfile_inline: |
        ARG CADDY_VERSION=2.10.2
        FROM caddy:$${CADDY_VERSION}-builder AS builder

        RUN xcaddy build \
            --with github.com/lucaslorentz/caddy-docker-proxy/v2 \
            --with github.com/caddy-dns/hetzner/v2

        FROM caddy:$${CADDY_VERSION}-alpine

        COPY --from=builder /usr/bin/caddy /usr/bin/caddy

        CMD ["caddy", "docker-proxy"]
    container_name: caddy
    restart: unless-stopped
    environment:
      - CADDY_INGRESS_NETWORKS=frontend-net
    networks:
      - frontend-net
    ports:
      - 80:80
      - 443:443
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./volumes/caddy:/data

networks:
  frontend-net:
    name: frontend-net
```

## Step 2: Configure TLS for SeaTable

Next, configure Caddy to use the DNS challenge by adding the `caddy.tls` labels to your SeaTable service definition.

The exact configuration depends on your DNS provider. In most cases, the API token must have permission to manage DNS records for the corresponding zone.

=== "Hetzner"

    ```text
    caddy_0.tls.dns: "hetzner ${HETZNER_DNS_TOKEN:?Variable is not set or empty}"
    caddy_0.tls.propagation_delay: 30s
    ```

=== "Cloudflare"

    ```text
    caddy_0.tls.dns: "cloudflare {CLOUDFLARE_API_TOKEN:?Variable is not set or empty}"
    ```

## Step 3: Create and Configure the DNS API Token

Log in to your DNS provider’s account and generate an API token with permission to manage DNS records for the required zone.

The required permissions for each provider are typically documented in the corresponding plugin directory at: https://github.com/caddy-dns.

Add the generated token to your `.env` file, for example:

=== "Hetzner"

    ```ini
    # Caddy DNS-01 challenge
    HETZNER_DNS_TOKEN=your_token_here
    ```

=== "Cloudflare"

    ```ini
    # Caddy DNS-01 challenge
    CLOUDFLARE_API_TOKEN=your_token_here
    ```

After restarting the Caddy container, Caddy will automatically:

1. Request or renew the certificate from Let's Encrypt
2. Create the required `_acme-challenge` TXT record via the DNS API
3. Wait for DNS propagation
4. Complete validation and remove the temporary record

No public inbound access to ports 80 or 443 is required for this process.
