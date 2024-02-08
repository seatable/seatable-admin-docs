# Air gap installation

Why air gap installation? Some customers ...
This setup requires additional configurations and is not an easy task.

## Problems that arise with air gap:

- Certificate management (HTTPS/TLS) is complicated.
- You need a separate container registry like [Quay](quay.io) or [Harbor](goharbor.io).
- You need a local APT repository ?!?
- Plugins have to be installed manually.

Let's go into the details.

### Certificate Management

Two possibilities to run an air gapped installation:

- caddy force to port 80 (diverse Anpassungen in .env) - easy but traffic not encrypted.
- use of a globally trusted wildcard certificate (non let's encrypt)

The usage of a self signed certificate is not recommended. Even if you clients (browsers) trust the certificate, the docker containers does not trust each other. Python Pipeline will not work etc...

### Separate container registry

...

### Separate local APT repository.

...

### Plugins

...
