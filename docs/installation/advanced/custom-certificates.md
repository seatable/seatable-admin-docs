# Custom root certificates

Usually we use let's encrypt to generate valid certificates for public access. Nethertheless caddy provides an easy way to use custom certificates. This article assumes that you want to use a valid (standard or wildcard) certificate from a widely trusted authority.

!!! warning "Self signed certificates are not fully supported"

    The use of a self signed certificate is not recommended. Even if you clients (browsers) trust the certificate, the docker containers do not trust each other by default. The Python Pipeline will not work etc...

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

    With this command, you can generate your own custom certificates. Please be aware that custom certicates can not be used for ip-adresses.
    ```
    cd /opt/caddy/certs
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./key.pem -out ./cert.pem
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

SeaTable Server and the Python Pipeline (Scheduler und Starter) execute at every start the command `update-ca-certificates`. This updates the truststore of the containers at runtime.

If you are working with self signed or low trust certificates, there is an easy way to put your certificates to the container truststore. You can just mount your certificate to the container. This works for seatable-server, python-scheduler and python-starter.

```bash
services:
  seatable-server:
    ...
    volumes:
      ...
      - "/opt/caddy/certs/cert.pem:/usr/local/share/ca-certificates/cert.crt"
```

!!! warning "SeaTable should use the certificate store"

    Please make sure that `- REQUESTS_CA_BUNDLE=/etc/ssl/certs/ca-certificates.crt` is in your list of environment variables of your seatable-server. We added this with version 5.0.

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

The current setup does not allow that you add a local IP adress as `SEATABLE_SERVER_HOSTNAME` in your .env file. There are two alternatives that we recommend to use:

#### use local address

Instead of the IP adress you should use an address like `seatable.local`. This requires that you either use a self-signed certificate or a custom root certificate.

#### use nip.io

There is a free service <https://nip.io> which allows mapping any IP Address to a hostname using the following formats:

- 10.0.0.1.nip.io maps to 10.0.0.1
- 192-168-1-250.nip.io maps to 192.168.1.250
- 0a000803.nip.io maps to 10.0.8.3

So if you want to use the local address like `192.168.17.20`, you should use `192.168.17.20.nip.io` as `SEATABLE_SERVER_HOSTNAME`.

## Limitations

Currently it is not possible to generate PDF-Files with the Page Design Plugin if you're running SeaTable with your self-signed certificate.
The workaround is to use `Print` inside the Page Design Plugin and then use a local PDF-Printer to generate the PDF.
