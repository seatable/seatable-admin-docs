# Collabora Online

installation of CODE version of collabora online
requires separate domain for collabora

add collabora.yml to .env file.

in .env muss
COLLABORA_SERVER_HOSTNAME=https://<URL>

dtable_web_settings.py muss folgendes

```bash
ENABLE_COLLABORA = True
COLLABORA_DISCOVERY_URL = 'https://collabora.seatable-demo.de/hosting/discovery'
```

## installation per docker

docker compose up -d
docker compose restart seatable-server
