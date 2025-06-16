# Integrate with Seafile

<!-- md:version 4.0 -->
<!-- md:flag enterprise -->

When integrating SeaTable and Seafile, users can add files from Seafile libraries in file columns.

### Scope of the Connection

The Seafile connection to SeaTable enables you to

- Choose a file as attachment from the Seafile library in SeaTable

### How to Setup the Connection on SeaTable Server Side

- Go to Seafile and generate an API token for your library
- Go to SeaTable and click on the 3-dots menu inside a base, go to Third party integration > Seafile and enter the full URL (including “http” or “https”) and the API token and then submit.

### Requirements on the Seafile Server Side

The cross-domain permissions must be set. This can be done by adding the "Access-Control-Allow-Origin" header.

Add the following code block to the configuration file `seafile.conf` in `/etc/nginx/sites-available/` or `seafile.nginx.conf` in `/etc/nginx/sites-enabled` (the exact filename and path depend on your Seafile version and installation method):

```
    location / {
        add_header Access-Control-Allow-Origin *;
        if ($request_method = 'OPTIONS') {
            add_header Access-Control-Allow-Origin *;
            add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
            add_header Access-Control-Allow-Headers "deviceType,token, authorization, content-type";
            return 204;
        }

        proxy_pass         http://127.0.0.1:8000;
        ...............

```

### Current Limitations

- Only a single library can be linked to a specific base
- The base editor does not display thumbnails for images stored inside an external Seafile library
- Image columns are not supported yet
