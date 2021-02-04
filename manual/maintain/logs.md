# Logs

## Log files of SeaTable server

The SeaTable logs are under `/shared/seatable/logs` in the docker, or `/Your SeaTable data volume/seatable/logs` in the server that run the docker.

* ccnet.log: logs for internal RPC, not useful
* dtable-events.log: 
* dtable-server.log: logs for dtable-server
* dtable_web.log: logs for dtable-web
* gunicorn-access.log:
* gunicorn-error.log:
* seafile.log: logs of Seafile server
* slow_logs: Slow request logs, which can be used to debug performance issues
* monitor.log: Monitor logs, monitor.sh can auto restart the unexpectedly closed server
* init.log:  Logs for docker initialization script

## Log files of Nginx server

The Nginx logs are under `/shared/nginx-logs`, or `/Your SeaTable data volume/nginx-logs` in the server that run the docker.

* dtable-web.access.log
* dtable-web.error.log
* access.log
* error.log


