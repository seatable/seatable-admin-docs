# Integrate with Seafile

By the integration of SeaTable and Seafile,  users can either choose the files from Seafile in the file column, or you can transfer  files from SeaTable to Seafile. To make this integration possible, you need to grant the Cross-Domain permissions by setting an "Access-Control-Allow-Origin" header.

Here is an example based on OS Ubuntu18.04 by adding several lines of configuration at /etc/nginx/sites-available/seafile.conf as bellow:

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


