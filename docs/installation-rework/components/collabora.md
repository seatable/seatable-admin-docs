# Collabora Online

installation of CODE version of collabora online

!!! warning "Collabora Online requires SeaTable Enterprise Edition"

    Collabora Online (CODE) can be installed on the same host as SeaTable Enterprise Edition. If Collabora Online is used regularly and by many users, the host should be fitted with sufficient cores and RAM.

## Installation

add collabora.yml to .env file.

dtable_web_settings.py muss folgendes enthalten. SEATABLE_SERVER_HOSTNAME muss nicht ergänzt werden, der wert wird aus der .env ausgelesen.

```bash
source /opt/seatable-compose/.env
echo -e "\n# collabora online" >> /opt/seatable-server/seatable/conf/dtable_web_settings.py
echo "ENABLE_COLLABORA = True" >> /opt/seatable-server/seatable/conf/dtable_web_settings.py
echo "COLLABORA_DISCOVERY_URL = 'https://${SEATABLE_SERVER_HOSTNAME}:6232/hosting/discovery'" >> /opt/seatable-server/seatable/conf/dtable_web_settings.py
```

so war es alt.

```bash
ENABLE_COLLABORA = True
COLLABORA_DISCOVERY_URL = 'https://<your-seatable-url>:6232/hosting/discovery'
```

## installation per docker

```bash
docker compose down
docker compose up -d
```

SeaTable must be restarted too, therefore all containers are shut down and restarted.
