# Deploy ONLYOFFICE Documentserver

<!-- md:version 3.0 -->
<!-- md:flag enterprise -->

OnlyOffice offers real-time collaboration with office documents in your browser. As soon as you open a file from SeaTable, OnlyOffice opens in a new browser tab and allows real time collaboration. As soon as the last user exits the document by closing his browser window, the document is saved back to the SeaTable base. Access takes place via the public URL via HTTPS. So that OnlyOffice cannot be used by other systems, a shared secret in the form of a JWT key is used.

!!! warning "You have to decide: Collabora OR OnlyOffice"

    Collabora and OnlyOffice are both office editors. You have to decide which one you would like to use. You can not use both in parallel.

!!! note "Use a separate host, if you expect many users"

    OnlyOffice can be installed on the same host as SeaTable Enterprise Edition. If OnlyOffice is used regularly and by many users, the host should be fitted with sufficient cores and RAM.

This manual assumes that SeaTable Enterprise Edition is installed and is running.

## Installation

#### 1. Change the .env file

Add `onlyoffice.yml` to the COMPOSE_FILE variable.

```bash
nano /opt/seatable-compose/.env
```

Your COMPOSE_FILE variable should look something like this:

```bash
COMPOSE_FILE='caddy.yml,seatable-server.yml,onlyoffice.yml'
```

#### 2. Generate inital secret

Copy and paste the following commands to generate the shared secret in the `.env` file:

    echo -e "\n# OnlyOffice" >> /opt/seatable-compose/.env
    echo "ONLYOFFICE_JWT_SECRET=$(pwgen -s 40 1)" >> /opt/seatable-compose/.env

#### 3. Modify dtable_web_setings.py

Now execute this command to add the required configuration to `dtable_web_settings.py`. This will add some configuration lines at the end of the file.

```python
source /opt/seatable-compose/.env
echo -e "\n# onlyoffice" >> /opt/seatable-server/seatable/conf/dtable_web_settings.py
echo "ENABLE_ONLYOFFICE = True" >> /opt/seatable-server/seatable/conf/dtable_web_settings.py
echo "ONLYOFFICE_APIJS_URL = 'https://${SEATABLE_SERVER_HOSTNAME}:6233/web-apps/apps/api/documents/api.js'" >> /opt/seatable-server/seatable/conf/dtable_web_settings.py
echo "ONLYOFFICE_FILE_EXTENSION = ('doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'odt', 'fodt', 'odp', 'fodp', 'ods', 'fods', 'csv', 'ppsx', 'pps')" >> /opt/seatable-server/seatable/conf/dtable_web_settings.py
echo "ONLYOFFICE_JWT_SECRET = '${ONLYOFFICE_JWT_SECRET}'" >> /opt/seatable-server/seatable/conf/dtable_web_settings.py
```

!!! note "Don't replace variables"

    You don't need to manually replace the variables `${SEATABLE_SERVER_HOSTNAME}` and `${ONLYOFFICE_JWT_SECRET}`. They will be automatically replaced as we have sourced the `.env` file.

#### 4. Download onlyoffice and restart

OnlyOffice is now configured and office documents can be directly edited from within SeaTable after a restart of the SeaTable service.

```bash
cd /opt/seatable-compose
docker compose down
docker compose up -d
```

OnlyOffice takes some some minutes for the initial start. If you get an error message when clicking an office file in SeaTable, be patient. With `docker compose logs onlyoffice -f`, you can monitor the startup progress.

Try to open `https://SEATABLE_SERVER_HOSTNAME:6233/welcome`. You should see a welcome page like this.

![OnlyOffice Welcome page](https://www.linuxbabe.com/wp-content/uploads/2016/12/onlyoffice-docs-https-ubuntu.png)

Try to open an docx-file from a SeaTable base.

Onlyoffice is ready, if a new browser window opens with your office document. Any user with access to this base can now open this document with OnlyOffice.

---

## Advanced: Custom settings

This is only for onlyoffice experts. You can create and mount a custom configuration file called `local-production-linux.json` to [force some settings](https://helpcenter.onlyoffice.com/installation/docs-developer-configuring.aspx).

Create a configuration file in the newly created directory:

```bash
cd /opt/onlyoffice
nano local-production-linux.json
```

Copy the following code block in this file:

```json
{
  "services": {
    "CoAuthoring": {
      "autoAssembly": {
        "enable": true,
        "interval": "5m"
      }
    }
  },
  "FileConverter": {
    "converter": {
      "downloadAttemptMaxCount": 3
    }
  }
}
```

Mount this config file into your onlyoffice block in your `docker-compose.yml`.

```
  volumes:
      - /opt/onlyoffice/logs:/var/log/onlyoffice
      - /opt/onlyoffice/data:/var/www/onlyoffice/Data
      - /opt/onlyoffice/lib:/var/lib/onlyoffice
      - /opt/oods/DocumentServer/local-production-linux.json:/etc/onlyoffice/documentserver/local-production-linux.json
```

Restart OnlyOffice to load the new configuration.

```
docker compose up -d
```
