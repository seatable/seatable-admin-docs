# Integrate with Seafile

!!! note

        Beginning with SeaTable Server 4.0, the integration with Seafile works out of the box. No more modification of the nginx configuration is required.

When integrating SeaTable and Seafile, users can add files from Seafile libraries in file columns and users can transfer files from SeaTable to Seafile.

## Requirements
The cross-domain permissions must be set. This can be done by adding the "Access-Control-Allow-Origin" header.

Add the following code block to the configuration file `seafile.conf` in `/etc/nginx/sites-available/`:

```
    location / {
        add_header Access-Control-Allow-Origin *;
        if ($request_method = 'OPTIONS') {
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
            add_header Access-Control-Allow-Headers "deviceType,token, authorization, content-type";
            return 204;
        }
﻿
        proxy_pass         http://127.0.0.1:8000;
        ...............

```


