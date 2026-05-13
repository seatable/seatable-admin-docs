---
description: Use custom SSL/TLS certificates with SeaTable's Caddy web server instead of the default Let's Encrypt certificates.
---

# Custom root certificates

By default, Seatable uses Let's Encrypt to generate valid certificates for public access. However, Caddy also provides an easy way to use custom certificates. This section assumes that you intend to use a **valid (standard or wildcard) certificate issued by a widely trusted certificate authority**.  

!!! warning "Limitations of Self-Signed Certificates"

    Self-signed certificates should only be used for testing purposes. Even if your clients or browsers trust the certificate, Docker containers do not trust each other by default.

    For SeaTable Server and the Python Pipeline (scheduler and starter), the trust can be established by adding the certificate to their truststore (see below). The `python-runner` is started on demand by the `python-starter` and requires a separate setup (see [Custom CA for the python-runner](#custom-ca-for-the-python-runner)).

    To avoid these issues entirely, use a valid (standard or wildcard) certificate issued by a recognized certificate authority.

## Make certificates available to caddy

With the caddy.yml a default volume-mount is created: `/opt/caddy:/data/caddy`
By convention you should provide your certificate & key files in the container host filesystem under `/opt/caddy/certs/` to make it available to caddy.

In the article, we assume that your certificates were saved as `cert.pem` and `key.pem`.

```bash
/opt/caddy/certs/
├── cert.pem
├── key.pem
```

!!! info "Command to generate custom certificates"

    With this command, you can generate your own custom certificates. Please be aware that custom certificates can not be used for ip-addresses. Remember to replace `${HOSTNAME}` with the actual hostname.

    ```bash
    cd /opt/caddy/certs
    openssl req -x509 -nodes -days 365 -addext "subjectAltName = DNS:${HOSTNAME}" -newkey rsa:2048 -keyout ./key.pem -out ./cert.pem
    ```

## Configure SeaTable Container to use custom certificates

The caddy docker proxy container from [lucaslorentz](https://github.com/lucaslorentz/caddy-docker-proxy) supports dynamic configuration with labels.

It is not recommended to make changes to the provides `seatable-server.yml`. Create a custom yml file and reference it in your .env file instead.
Add the following line to your `custom-seatable-server.yml` to tell caddy to use your custom certificates. The label `caddy.tls` will tell caddy to use your custom certificates.

```bash
# configuration of custom-seatable-server.yml
services:
  seatable-server:
    ...
    labels:
      caddy: ${SEATABLE_SERVER_HOSTNAME}
      caddy.tls: "/data/caddy/certs/cert.pem /data/caddy/certs/key.pem"
      ...
```

!!! warning "DNS resolution must work inside the container"

    If you're using a non-public url like "my-custom-setup.local", you have to make sure, that the docker container can resolve this DNS query. If you don't run your own DNS servers, you have to add `extras_hosts` to your `.yml` file.

## Add certificates to your truststore

SeaTable Server and the Python Pipeline (Scheduler and Starter) execute the command `update-ca-certificates` at every start. This adds all certificates from `/usr/local/share/ca-certificates/` to the system trust store at `/etc/ssl/certs/ca-certificates.crt`.

This is relevant in two scenarios:

- **Self-signed or custom SeaTable certificates**: If SeaTable itself uses a self-signed or custom certificate, internal services need to trust it.
- **External services with custom CAs**: If SeaTable connects to external services that use certificates from a non-standard CA (e.g. a corporate SAML/SSO identity provider, LDAP server, or S3 storage), you need to add the corresponding root CA certificate to the trust store.

To add a certificate, mount the `.crt` file into the container via your `custom-seatable-server.yml`. This works for seatable-server, python-scheduler, and python-starter.

```bash
services:
  seatable-server:
    ...
    volumes:
      ...
      - "/opt/caddy/certs/cert.pem:/usr/local/share/ca-certificates/cert.crt"
```

You can mount multiple certificates by adding additional volume mounts. Every `.crt` file in `/usr/local/share/ca-certificates/` will be included in the trust store at startup.

!!! warning "REQUESTS_CA_BUNDLE is required"

    Make sure that `REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt` is set in your environment variables. This tells all Python libraries (requests, pysaml2, etc.) to use the system trust store instead of their own bundled certificates. This variable is included by default since version 5.0 in the [seatable-server.yml](https://github.com/seatable/seatable-release/blob/main/compose/seatable-server.yml).

## Custom CA for the python-runner

The truststore setup described above covers the long-running `python-scheduler` and `python-starter` containers, but **not** the `python-runner`. The runner is an ephemeral container that the starter launches via `docker run` for every script execution. It is based on Alpine, runs as a non-root user, never executes `update-ca-certificates`, and has no certificate mounted into it. As a result, scripts that call `base.auth()` (or any other HTTPS endpoint with your custom CA) will fail with an SSL error — even though `print("hello world")` works fine.

To fix this, you need to do two things at the same time, both via [`PYTHON_RUNNER_OTHER_OPTIONS`](python-pipeline-configuration.md#mounting-additional-directories):

1. Mount the trusted CA bundle from the host into the runner.
2. Set `REQUESTS_CA_BUNDLE` inside the runner so that Python's `requests` library uses it (without this, `requests` falls back to the `certifi` bundle and ignores `/etc/ssl/certs/`).

### Build a merged CA bundle on the host

If you only mount your own certificate, the runner will no longer trust any public CAs, which can break scripts that call third-party APIs. The cleanest solution is to merge the host's public CA bundle with your custom certificate:

```bash
cat /etc/ssl/certs/ca-certificates.crt /opt/caddy/certs/cert.pem \
  > /opt/seatable-compose/runner-ca-bundle.crt
```

The bundle is placed next to your compose files and `.env` so that it is co-located with the configuration that references it. Repeat this step whenever your custom certificate is renewed.

### Configure the python-starter

Add the following to your `custom-python-pipeline.yml` (create it if it does not exist) and reference the file in the `COMPOSE_FILE` variable of your `.env`:

```yaml
services:
  python-starter:
    environment:
      - PYTHON_RUNNER_OTHER_OPTIONS=["--volume=/opt/seatable-compose/runner-ca-bundle.crt:/etc/ssl/certs/runner-ca-bundle.crt:ro","--env=REQUESTS_CA_BUNDLE=/etc/ssl/certs/runner-ca-bundle.crt"]
```

!!! info "Syntax of PYTHON_RUNNER_OTHER_OPTIONS"

    The value must be a valid Python list literal (parsed via `ast.literal_eval`). Each item is appended verbatim to the `docker run` command, so environment variables must use the `--env=KEY=VALUE` form — a bare `KEY=VALUE` would be interpreted as a positional argument and break the container start. Do not wrap the list in additional quotes.

Restart the `python-starter` with `docker compose up -d` afterwards. To verify, set `PYTHON_STARTER_LOG_LEVEL=DEBUG` and check `docker compose logs -f python-starter` — the full `docker run` command should now include both the volume mount and the `REQUESTS_CA_BUNDLE` environment variable.

## Self-signed certificates generated by Caddy

Even if it is not recommended, it is possible to ask Caddy to use auto generated self-signed certificates.
This can be achieved by adding these lines to your `custom-seatable-server.yml`.

```bash
# configuration of custom-seatable-server.yml
services:
  seatable-server:
    ...
    labels:
      caddy: ${SEATABLE_SERVER_HOSTNAME}
      caddy.tls: "internal"
```

## Problems with local IP

The current setup does not allow that you add a local IP address as `SEATABLE_SERVER_HOSTNAME` in your .env file. There are two alternatives that we recommend to use:

#### use local address

Instead of the IP address you should use an address like `seatable.local`. This requires that you either use a self-signed certificate or a custom root certificate.

#### use nip.io

There is a free service <https://nip.io> which allows mapping any IP Address to a hostname using the following formats:

- 10.0.0.1.nip.io maps to 10.0.0.1
- 192-168-1-250.nip.io maps to 192.168.1.250
- 0a000803.nip.io maps to 10.0.8.3

So if you want to use the local address like `192.168.17.20`, you should use `192.168.17.20.nip.io` as `SEATABLE_SERVER_HOSTNAME`.

## Limitations

Currently it is not possible to generate PDF-Files with the Page Design Plugin if you're running SeaTable with your self-signed certificate.
The workaround is to use `Print` inside the Page Design Plugin and then use a local PDF-Printer to generate the PDF.
