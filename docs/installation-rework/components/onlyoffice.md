# Deploy ONLYOFFICE Documentserver

ENTWEDER ODER Collabora oder Onlyoffice !!!!

OnlyOffice offers real-time collaboration with office documents in your browser. As soon as you open a file from SeaTable, OnlyOffice opens in a new browser tab and allows real time collaboration. As soon as the last user exits the document by closing his browser window, the document is saved back to the SeaTable base. Access takes place via the public URL via HTTPS. So that OnlyOffice cannot be used by other systems, a shared secret in the form of a JWT key is used.

!!! warning "OnlyOffice requires SeaTable Enterprise Edition"

    OnlyOffice Documentserver (ONLYOFFICE) can be installed on the same host as SeaTable Enterprise Edition. If OnlyOffice is used regularly and by many users, the host should be fitted with sufficient cores and RAM.

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

Generate inital secrets and write them into your .env file.

    echo "\n# OnlyOffice" >> /opt/seatable-compose.env
    echo "ONLYOFFICE_JWT_SECRET=$(pwgen -s 40 1)" >> /opt/seatable-compose/.env

#### 3. Modify dtable_web_setings.py

Open `/opt/seatable-server/seatable/conf/dtable_web_settings.py` with your favorite editor and add the following code block at the end of the file.

```python
# onlyoffice
ENABLE_ONLYOFFICE = True
ONLYOFFICE_APIJS_URL = "https://<SEATABLE_SERVER_HOSTNAME>:6233/web-apps/apps/api/documents/api.js"
ONLYOFFICE_FILE_EXTENSION = ('doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'odt', 'fodt', 'odp', 'fodp', 'ods', 'fods', 'csv', 'ppsx', 'pps')
ONLYOFFICE_JWT_SECRET = '<YOUR_JWT_SECRET>'
```

Change `SEATABLE_SERVER_HOSTNAME` to reflect the hostname of your SeaTable server. Additionally, copy the generated value for `ONLYOFFICE_JWT_SECRET` from your .env file and paste it in the dtable_web_settings.py.

#### 4. Download onlyoffice and restart

OnlyOffice is now configured and office documents can be directly edited from within SeaTable after a restart of the SeaTable service.

```bash
cd /opt/seatable-compose
docker compose down
docker compose up -d
```

OnlyOffice takes some time to start up. If you get an error message when clicking an office file in SeaTable, be patient. With `docker compose logs -f onlyoffice`, you can monitor the startup progress.

Try to open https://SEATABLE_SERVER_HOSTNAME:6233/welcome. You should see a welcome page like this.

![OnlyOffice Welcome page](https://www.linuxbabe.com/wp-content/uploads/2016/12/onlyoffice-docs-https-ubuntu.png)

Try to open an docx-file from a SeaTable base.

Onlyoffice is ready, if a new browser window opens with your office document. Any user with access to this base can now open this document with OnlyOffice.

---

## Troubleshooting

**1. SeaTable doesn't start anymore/SeaTable is no longer accessible, what can I do?**

It is likely that there is a misconfiguration in either nginx.conf or dtable_web_settings.py.

After docker-composing up, run `docker exec -it seatable nginx -t` to check the nginx configuration. If the nginx configuration is invalid, the output will tell you.

If nginx shows no error, enter the seatable container and try to start SeaTable manually:

```bash
docker exec -it seatable bash
/shared/seatable/scripts/seatable.sh start
```

**2. There is not welcome page from OnlyOffice**

If `https://SEATABLE_SERVER_HOSTNAME/onlyofficeds/welcome` shows a SeaTable error page, you should check the nginx configuration file.
Make sure that the two components are added and that there are no nginx errors and restart nginx.

```bash
cd /opt/seatable/seatable-data/seatable/conf
nano nginx.conf
```

**3. OnlyOffice Welcome page is shown but document does not open**

Check your configuration of `dtable_web_settings.py`. Make sure that you added your public SeaTable Server address. Make sure that `jwt-token` is the same in `dtable_web_settings.py` and `docker-compose.yml`.

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
