# Collabora Online

<!-- md:version 4.3 -->
<!-- md:flag enterprise -->

Collabora Online offers real-time collaboration with office documents in your browser. As soon as you open a file from SeaTable, Collabora opens in a new browser tab and allows real time collaboration. As soon as the last user exits the document by closing his browser window, the document is saved back to the SeaTable base.

This article is about the how to install the CODE version of collabora online.

!!! warning "You have to decide: Collabora OR OnlyOffice"

    Collabora and OnlyOffice are both office editors. You have to decide which one you would like to use. You can not use both in parallel.

!!! note "Use a separate host, if you expect many users"

    Collabora Online (CODE) can be installed on the same host as SeaTable Enterprise Edition. If Collabora Online is used regularly and by many users, the host should be fitted with sufficient cores and RAM.

This manual assumes that SeaTable Enterprise Edition is installed and is running.

## Installation

Add `collabora.yml` to the COMPOSE_FILE variable in your `.env` file.

```bash
nano /opt/seatable-compose/.env
```

Your COMPOSE_FILE variable should look something like this:

```bash
COMPOSE_FILE='caddy.yml,seatable-server.yml,collabora.yml'
```

Start the installation by adding ``collabora.yml to .env file.

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

## Check if installation is complete

Open `https://<your-seatable-url>:6232` and you should see simple an **OK**.

## Separate Installation

(not yet ready...)

- Security Headers in Caddy
- Allowed Hosts in Collabora
