# Custom certificates

Usually we use let's encrypt to generate valid certificates for public access. Nethertheless caddy provides an easy way to use custom certificates.

## Make certificates available to caddy

In caddy.yml we create a volume that mounts the host filesystem from /opt/caddy to /data/caddy. Save your certificate files in the folder `/opt/caddy` to make it available to caddy.

```bash
# configuration of caddy.yml
services:
  caddy:
    ...
    volumes:
      - "/opt/caddy:/data/caddy"     # <-- certificates have to saved here
```

It should look like this:

```bash
/opt/caddy
├── cert.pem
├── key.pem
```

## Configure SeaTable Container to use these custom certificates

The next step is quite easy. The used caddy container from lucaslorentz supports dynamic configuration with labels. Use custom-...

```bash
# configuration of custom-seatable-server.yml
services:
  seatable-server:
    ...
    labels:
      caddy: ${SEATABLE_SERVER_HOSTNAME}
      caddy.tls: "/data/caddy/cert.pem /data/caddy/key.pem" # <-- labels to use custom certificates
```
