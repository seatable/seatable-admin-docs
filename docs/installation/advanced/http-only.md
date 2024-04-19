# Force http only for your SeaTable Server

## Force http during installation

It is not recommended to run SeaTable without https. Still it is possible. During the installation it is sufficient to set the .env variable `SEATABLE_SERVER_PROTOCOL` with the value `http` and all configuration files and caddy will be set up correctly.

## Switching after the installation

If you want to force http after the initial setup, you also have to adapt these configuraton files and replace all https:// values with http://:

- dtable_web_settings.py
- ccnet.conf
- nginx.conf

Especially the change of the nginx file is not trivial, if you don't have any experience with nginx.
