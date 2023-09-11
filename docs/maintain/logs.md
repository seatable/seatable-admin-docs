# Logs

## Log files of SeaTable server

The SeaTable logs are under `/shared/seatable/logs` in the docker, or `/Your SeaTable data volume/seatable/logs` in the server that run the docker.

Main log files:

* dtable_web.log: logs for dtable-web
* dtable-events.log: logs for dtable-events
* dtable_events_io.log: logs for Base's import or export and Excel or CSV file import or export
* dtable_events_message.log: logs for sending emails in the dtable-events background
* dtable-server.log: logs for dtable-server
* dtable-db.log: logs for dtable-db
* dtable-db-error.log: error logs for dtable-db
* dtable-db-access.log: query log for dtable-db
* dtable-db-slow.log: slow query log for dtable-db

Other log files:

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


