# Collabora Online

installation of CODE version of collabora online

!!! warning "Collabora Online requires SeaTable Enterprise Edition"

    Collabora Online (CODE) can be installed on the same host as SeaTable Enterprise Edition. If Collabora Online is used regularly and by many users, the host should be fitted with sufficient cores and RAM.

## Installation

add collabora.yml to .env file.

dtable_web_settings.py muss folgendes

```bash
ENABLE_COLLABORA = True
COLLABORA_DISCOVERY_URL = 'https://<your-seatable-url>:6232/hosting/discovery'
```

## installation per docker

docker compose down
docker compose up -d
