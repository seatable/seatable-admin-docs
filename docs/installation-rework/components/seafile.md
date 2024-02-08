# Integrate with Seafile

<!-- md:version 4.0 -->
<!-- md:flag enterprise -->

When integrating SeaTable and Seafile, users can add files from Seafile libraries in file columns and users can transfer files from SeaTable to Seafile.

### Scope of the Connection

The Seafile connection to SeaTable enables you to

- Choose a file as attachment from the Seafile library in SeaTable
- Save attachments in a SeaTable base to your Seafile library

### How to Setup the Connection on SeaTable Server Side

- Go to Seafile and generate an API token for your library
- Go to SeaTable and click on the 3-dots menu of a base, go to Advanced > Connect Seafile and enter the full URL (including “http” or “https”) and the API token and then submit.

### Requirements on the Seafile Server Side

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
