# Autostart

## Autostart of the docker container

In all our `yml` files, we have specified `restart: unless-stopped`. The function specifies that the container should always restart if it exits for any reason—except if it was explicitly stopped by a user or administrator. This policy keeps your container running persistently unless you intentionally stop it.

## Autostart of SeaTable service

When you start the SeaTable Docker container, the SeaTable service and all its components launch automatically. There are only a few exceptions where this does not happen, such as when specific advanced configurations are in place:

## Deactivate Autostart

There are situations under which the SeaTable service does not start automatically:

1. you set the `.env` Variable `SEATABLE_START_MODE=cluster`
2. there is a `seatable-controller.conf` in the `conf` directory

In both cases SeaTable expects to be part of an advanced setup where the service should not be started automatically. So if SeaTable service does not start automatically, check first, if one of these two situations are true.

Otherwise check the logs of your container with `docker logs seatable-server`.
