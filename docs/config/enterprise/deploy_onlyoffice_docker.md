# Deploy ONLYOFFICE Documentserver

OnlyOffice offers real-time collaboration with office documents in your browser. As soon as you open a file from SeaTable, OnlyOffice opens in a new browser tab and allows real time collaboration. As soon as the last user exits the document by closing his browser window, the document is saved back to the SeaTable base. Access takes place via the public URL via HTTPS. So that OnlyOffice cannot be used by other systems, a shared secret in the form of a JWT key is used.

## Requirements

!!! warning "OnlyOffice requires SeaTable Enterprise Edition"

    OnlyOffice Documentserver (ONLYOFFICE) can be installed on the same host as SeaTable Enterprise Edition. If OnlyOffice is used regularly and by many users, the host should be fitted with more cores and RAM.

This tutorial assumes that SeaTable Enterprise Edition is installed and is running.

## Setup

This manual describes the deployment of OnlyOffice with Docker. Thanks to Docker Compose, the deployment is straightforward and done with little effort.

### Stop SeaTable Server

When running, stop SeaTable and all associated Docker containers:

```
cd /opt/seatable
docker compose down
```

### Enhance docker-compose.yml

Add the following part to your `docker-compose.yml` as a new service. Make sure that the indentations are correct. With the next start of SeaTable, OnlyOffice will be downloaded automatically. Alter the value for JWT_SECRET and memorize it for later.

```
  onlyoffice:
    image: onlyoffice/documentserver:latest
    container_name: onlyoffice
    volumes:
      - /opt/onlyoffice/logs:/var/log/onlyoffice
      - /opt/onlyoffice/data:/var/www/onlyoffice/Data
      - /opt/onlyoffice/lib:/var/lib/onlyoffice
    environment:
      - JWT_ENABLED=true
      - JWT_SECRET=topsecret
    networks:
      - seatable-net
```

### Modifying dtable_web_setings.py

Open `/opt/seatable/seatable-data/seatable/conf/dtable_web_settings.py` with your favorite editor and add the following code block at the end of the file.

```python
# onlyoffice
ENABLE_ONLYOFFICE = True
ONLYOFFICE_APIJS_URL = "https://SEATABLE_SERVER_HOSTNAME/onlyofficeds/web-apps/apps/api/documents/api.js"
ONLYOFFICE_FILE_EXTENSION = ('doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'odt', 'fodt', 'odp', 'fodp', 'ods', 'fods', 'csv', 'ppsx', 'pps')
ONLYOFFICE_JWT_SECRET = 'topsecret'
```

Change `SEATABLE_SERVER_HOSTNAME` to reflect the hostname of your SeaTable server. Additionally, adjust the value for `ONLYOFFICE_JWT_SECRET` to correspond to the JWT_SECRET in the `docker-compose.yml` file.

### Modify your nginc configuration

Open the nginx configuration file `/opt/seatable/seatable-data/seatable/conf/nginx.conf` and paste the following lines at the top of the configuration file:

```
# Required for only office document server
map $http_x_forwarded_proto $the_scheme {
  default $http_x_forwarded_proto;
  "" $scheme;
}
map $http_x_forwarded_host $the_host {
  default $http_x_forwarded_host;
  "" $host;
}
map $http_upgrade $proxy_connection {
  default upgrade;
  "" close;
}
```

Add the following new location for OnlyOffice to the server block.

```
location /onlyofficeds/ {
  proxy_pass http://onlyoffice/;   # this must be the name of your onlyoffice container from docker-compose.yml
  proxy_http_version 1.1;
  client_max_body_size 100M;
  proxy_read_timeout 3600s;
  proxy_connect_timeout 3600s;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection $proxy_connection;
  proxy_set_header X-Forwarded-Host $the_host/onlyofficeds;
  proxy_set_header X-Forwarded-Proto $the_scheme;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

### Download onlyoffice and restart

OnlyOffice is now configured and office documents can be directly edited from within SeaTable after a restart of the SeaTable service.

```bash
docker compose up -d
docker exec -d seatable /shared/seatable/scripts/seatable.sh start
```

OnlyOffice takes some time to start up. If you get an error message when clicking an office file in SeaTable, be patient. With `docker compose logs -f onlyoffice`, you can monitor the startup progress.

Try to open https://SEATABLE_SERVER_HOSTNAME/onlyofficeds/welcome. You should see a welcome page like this.

![OnlyOffice Welcome page](https://www.linuxbabe.com/wp-content/uploads/2016/12/onlyoffice-docs-https-ubuntu.png)

Try to open an docx-file from a SeaTable base.

Onlyoffice is ready, if a new browser window opens with your office document. Any user with access to this base can now open this document with OnlyOffice.

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

This part should be right on top of the configuration file:

```
# Required for only office document server
map $http_x_forwarded_proto $the_scheme {
  default $http_x_forwarded_proto;
  "" $scheme;
}
map $http_x_forwarded_host $the_host {
  default $http_x_forwarded_host;
  "" $host;
}
map $http_upgrade $proxy_connection {
  default upgrade;
  "" close;
}
```

There should be a location /onlyofficeds anywhere in your server block.

```
location /onlyofficeds/ {
  proxy_pass http://onlyoffice/;
  proxy_http_version 1.1;
  client_max_body_size 100M;
  proxy_read_timeout 3600s;
  proxy_connect_timeout 3600s;
  proxy_set_header Upgrade $http_upgrade;
  proxy_set_header Connection $proxy_connection;
  proxy_set_header X-Forwarded-Host $the_host/onlyofficeds;
  proxy_set_header X-Forwarded-Proto $the_scheme;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

Restart nginx and seatable from container and try again.

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
