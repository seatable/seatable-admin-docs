#!/bin/bash

## in keinster weise fertig.

source .env

# wenn caddy, sollte https: in den dtable_web_settings.py und ccnet... gesetzt werden
sed -i 's|http://${SEATABLE_SERVER_HOSTNAME}|https://{SEATABLE_SERVER_HOSTNAME}|g' ${SEATABLE_PATH}/seatable-data/seatable/conf/dtable_web_settings.py

nginx muss ergänzt werden. sollte schon onlyoffice etc enthalten...

## zum abschluss
docker exec -d seatable /shared/seatable/scripts/seatable.sh restart
