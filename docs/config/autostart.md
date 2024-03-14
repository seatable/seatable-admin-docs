# Autostart of SeaTable Service

<!-- md:version 4.3 -->

Starting from version 4.3, SeaTable service will automatically initiate upon launching the Docker container.

## Deactivate Autostart

There are situations under which the SeaTable service does not start automatically:

1. you set the `.env` Variable `SEATABLE_START_MODE=cluster`
2. you create a `seatable-controller.conf` in the `conf` directory

In both cases SeaTable expects to be part of an advanced setup where the service should not be started automatically. So if SeaTable service does not start automatically, check first, if one of these two situations are true.
