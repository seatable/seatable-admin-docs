# Installation dtable-server standalone

![SeaTable Cluster: dtable-server standalone](../../assets/images/seatable-cluster-dtable-server-standalone.png)

Installation eines neuen servers mit docker.
kopie von lizenz, .env und dtable-db.yml von node zwei auf diesen server.

Anpassung:
- port 5000:5000
- dtable-server=true
- dtable-db=false

starten

## Anpassen der Konfiguration auf dtable-server

- s3 konfiguration in dtable-storage-server.conf
- anpassung von dtable_server_config.json

{
    "dtable_db_service_url": "http://seatable-n2:7777",
    "dtable_web_service_url": "http://seatable-n1:8000" 
}

wichtig: die Kommas!

restart.

## Test von dtable-server

vom host:
curl 127.0.0.1:5000/ping/

### Umstellung von frontend

seatable-cluster.yml TODO: umbenennen in frontend.
- ENABLE_DTABLE_SERVER=false

in dtable-api-gateway.conf
[dtable-server]
server_address = "http://seatable-n3:5000"

add `dtable_web_settings.py`

```
INNER_DTABLE_SERVER_URL = 'http://splash-frontend:5000/'
```

### Umstellung auf dtable-db:

dtable-db.conf -> sollte auf seatable-n3:5000 umgestellt werden.

### Finaler Test:

aufrufen einer base und logs sehen in seatable-n3.