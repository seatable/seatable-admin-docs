---
status: wip
---

# Installation multiple dtable-server

Since dtable-server is typically the first bottleneck if you system increases, it makes sense to scale your dtable-server horizontally. Then we will add a proxy to the dtable-web node, to share the base requests for these two servers. 

![SeaTable Cluster: multiple dtable-servers](../../assets/images/seatable-cluster-dtable-server-multiple.png)

## Routing logic with multiple dtable-server

The routing logic to dtable-server must be defined in advance. Why?
stateless, but same base must always be opened on the same server. therefore no change or ...

All bases starting with 0-9 will be handled by the first dtable-server.
All bases starting with a-f will be handled by the second dtable-server.


<!-- TODO: Grafik -->

## Installation of second dtable-server

Install another dtable-server like described in the dtable-server (standalone). Check that the dtable-server is available via port 5000, too.

Dont forget to add the new server to the extra_hosts section...

Test that dtable-server is available via port 5000

## Add proxy to the frontend to split the requests

alle anfragen gehen nun über einen neuen proxy, den wir auf dtable-web anlegen.

```
---
services:
  dtable-server-proxy:
    image: nginx:1.27.5-alpine
    container_name: dtable-server-proxy
    ports:
      - "5000:5000"
    volumes:
      - ./nginx-proxy.conf:/etc/nginx/nginx.conf:ro
    networks:
      - frontend-net
    extra_hosts:
      - "dtable-web:10.0.0.2"
      - "dtable-db:10.0.0.3"
      - "dtable-server:10.0.0.4"
      - "dtable-server-2:10.0.0.5
    logging:
      driver: json-file
      options:
        # Maximum size per file
        max-size: 10m
        # Maximum number of files
        max-file: 3

networks:
  frontend-net:
    name: frontend-net
```

nginx-proxy.conf
```
worker_processes auto;

events {
  worker_connections 4096;
}

http {
  access_log off;
  error_log /dev/stdout warn;

  # dtable-server 1
  upstream dtable_server_a_z {
    server dtable-server:5000;
    keepalive 15;
  }

  # dtable-server 2
  upstream dtable_server_0_9 {
    server dtable-server-2:5000;
    keepalive 15;
  }

  # Map to dynamically determine the upstream server based on the UUID in the URL
  map $request_uri $dtable_upstream {
    default dtable_server_a_z;                  # Default to the a-z server
    "~*ff84e1a1-66e2" dtable_server_0_9;        # force that this base uuid goes to server 2
    "~*([a-zA-Z])([0-9a-f]{7}-[0-9a-f]{4})" dtable_server_a_z;
    "~*([0-9])([0-9a-f]{7}-[0-9a-f]{4})" dtable_server_0_9;
  }

server {
  server_name _;
  listen 5000;

  location / {
    proxy_pass http://$dtable_upstream;
    proxy_set_header X-Upstream-Server $dtable_upstream;
    client_max_body_size 100m;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection upgrade;
    access_log /tmp/access.log;
    error_log /tmp/error.log;
  }
}
}
```

dtable-server-proxy.yml to .env
remove ports 5000 from seatable-server, but add port 8000.

INNER_DTABLE_SERVER auf dtable-web:5000 ändern!
in api-gateway dtable-server:5000 zu dtable-web:5000 ändern

in gunicorn.py

bind = '0.0.0.0:8000'

- die config/seatable-nginx.conf verweist bei /dtable-server/ping und /dtable-db/ping auf falsche ziele.
somit geht nicht: https://<your-url>/dtable-db/ping/


### umstellung auf dtable-db

dtable-db.conf wieder auf 

[dtable cache]
dtable_server_url = "http://dtable-web:5000"


---

Wichtig: seatable-n1 und seatable-n2 neu starten.

testen:
- auf seatable-web sollte nun wieder ein curl http://127.0.0.1:5000/ping/ gehen.
- auf seatable-web sollte ein curl 127.0.0.1:8000/api2/ping/ gehen.
- aufruf jeweils einer base mit 0-9 oder a-f, man sieht die logs in dtable-server-1 und dtable-server-2
vollständiger funktionstest: 

- bases öffnen
- app anlegen und daten abrufen, ändern
- big data view anlegen und daten übertragen


TODO: klären, ob anderes netzwerk als frontend-net
