---
search: 
  exclude: true
---

# Managed services

```
# components to be used; IMPORTANT: there should be no space between the files names !
COMPOSE_FILE='mariadb.yml,redis.yml,s3.yml'
COMPOSE_PATH_SEPARATOR=','

# system settings
TIME_ZONE='Europe/Berlin'

# database
SEATABLE_MYSQL_ROOT_PASSWORD='xxx'
REDIS_PASSWORD='xxx'

```

## S3 with minio

```
---
services:
  caddy:
    image: ${CADDY_IMAGE:-lucaslorentz/caddy-docker-proxy:2.8.11-alpine}
    restart: unless-stopped
    container_name: caddy
    ports:
      - 80:80
      - 443:443
    environment:
      - CADDY_INGRESS_NETWORKS=frontend-net
    volumes:
      - "/var/run/docker.sock:/var/run/docker.sock"
      - "/opt/caddy:/data/caddy"
    networks:
      - frontend-net
    healthcheck:
      test: ["CMD-SHELL", "curl --fail http://localhost:2019/metrics || exit 1"]
      start_period: 20s
      interval: 20s
      timeout: 5s
      retries: 3

  minio:
    container_name: minio
    image: minio/minio:RELEASE.2024-12-18T13-15-44Z
    networks:
      - frontend-net
    volumes:
      - '/opt/minio_data:/data'
    environment:
      - MINIO_ROOT_USER=minio
      - MINIO_ROOT_PASSWORD=s3_topsecret
      - MINIO_SERVER_URL=https://<url>
      - MINIO_BROWSER_REDIRECT_URL=https://<url>/console
    command: server /data --console-address ":9090"
    labels:
      caddy: <url>
      caddy.redir: /console /console/
      caddy.reverse_proxy: "{{upstreams 9000}}"
      caddy.handle_path: /console/*
      caddy.handle_path.0_reverse_proxy: "{{upstreams 9090}}"

networks:
  frontend-net:
    name: frontend-net

```

## Redis

```
---
services:
  redis:
    image: ${SEATABLE_REDIS_IMAGE:-redis:7.2.7-bookworm}
    restart: unless-stopped
    container_name: redis
    environment:
      - REDIS_PASSWORD=${REDIS_PASSWORD:?Variable is not set or empty}
    command:
      - /bin/sh
      - -c
      - redis-server --requirepass "$${REDIS_PASSWORD:?REDIS_PASSWORD variable is not set}"
    networks:
      - backend-seatable-net
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 20s
      retries: 3
      timeout: 5s
    ports:
      - 6379:6379

networks:
  backend-seatable-net:
    name: backend-seatable-net
```

## Mariadb

```
---
services:
  mariadb:
    image: ${SEATABLE_DB_IMAGE:-mariadb:11.4.3-noble}
    restart: unless-stopped
    container_name: mariadb
    environment:
      - MYSQL_ROOT_PASSWORD=${SEATABLE_MYSQL_ROOT_PASSWORD:?Variable is not set or empty}
      - MYSQL_LOG_CONSOLE=true
      - MARIADB_AUTO_UPGRADE=1
      - TZ=Europe/Berlin
    volumes:
      - "/opt/mariadb:/var/lib/mysql"
    networks:
      - backend-seatable-net
    healthcheck:
      test:
        [
          "CMD",
          "/usr/local/bin/healthcheck.sh",
          "--connect",
          "--mariadbupgrade",
          "--innodb_initialized",
        ]
      interval: 20s
      retries: 3
      start_period: 30s
      timeout: 10s
    ports:
      - 3306:3306

networks:
  backend-seatable-net:
    name: backend-seatable-net
```