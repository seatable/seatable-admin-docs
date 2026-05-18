---
status: wip
description: Overview of SeaTable Server and Nginx log file locations, log rotation configuration, and customization options.
---

# Logs

## Log files of SeaTable server

The SeaTable logs are under `/shared/seatable/logs` in the docker, or `/Your SeaTable data volume/seatable/logs` in the server that runs the docker.

Main log files:

- dtable_web.log: logs for dtable-web
- dtable-events.log: logs for dtable-events
- dtable_events_io.log: logs for Base's import or export and Excel or CSV file import or export
- dtable_events_message.log: logs for sending emails in the dtable-events background
- dtable-server.log: logs for dtable-server
- dtable-db.log: logs for dtable-db
- dtable-db-error.log: error logs for dtable-db
- dtable-db-access.log: query log for dtable-db
- dtable-db-slow.log: slow query log for dtable-db

Other log files:

- seafile.log: logs of Seafile server
- slow_logs: Slow request logs, which can be used to debug performance issues
- monitor.log: Monitor logs, monitor.sh can auto restart the unexpectedly closed server
- init.log: Logs for docker initialization script

## Log files of Nginx server

The Nginx logs are under `/shared/nginx-logs`, or `/Your SeaTable data volume/nginx-logs` in the server that runs the docker.

- dtable-web.access.log
- dtable-web.error.log
- access.log
- error.log

## Logrotate

SeaTable's Docker container executes nightly log rotation cron jobs for both SeaTable and nginx logs. The cron jobs are configured as follows:

```text
54 23 * * * /usr/sbin/logrotate -vf /templates/logrotate-conf/seatable-nginx 2>> /opt/seatable/logs/logrotate.log
55 23 * * * /usr/sbin/logrotate -vf /templates/logrotate-conf/seatable 2>> /opt/seatable/logs/logrotate.log
```

### Logrotate Configuration

The log rotation configuration is straightforward and includes the following parameters:

```json
{
        daily
        missingok
        rotate 7
        # compress
        # delaycompress
        dateext
        dateformat .%Y-%m-%d
        notifempty
        create 644 root root
        sharedscripts
        postrotate
                if [ -f /opt/seatable/pids/seafile.pid ]; then
                        kill -USR1 `cat /opt/seatable/pids/seafile.pid`
                fi

                if [ -f /opt/seatable/pids/dtable-db.pid ]; then
                        kill -USR1 `cat /opt/seatable/pids/dtable-db.pid`
                fi

                if [ -f /opt/seatable/pids/dtable-storage-server.pid ]; then
                        kill -USR1 `cat /opt/seatable/pids/dtable-storage-server.pid`
                fi

                if [ -f /opt/seatable/pids/api-gateway.pid ]; then
                        kill -USR1 `cat /opt/seatable/pids/api-gateway.pid`
                fi

                if [ -f /opt/seatable/pids/dtable-web.pid ]; then
                        pkill -HUP gunicorn
                fi

                find /opt/seatable/logs/ -mtime +7 -name "*.log*" -exec rm -f {} \;
        endscript
}
```

This configuration ensures:

- Daily log rotation.
- Retention of logs for seven days.
- Addition of timestamps to rotated logs using dateext.
- Automatic removal of old logs older than seven days.

All relevant configuration files are located in `/templates/logrotate-conf` within the SeaTable Docker container.

### Customizing Logrotate Configuration

To modify the log rotation settings, you can mount a custom configuration file using Docker Compose.
In order to ensure that this modification is preserved across version upgrades, you should **not** modify the default `.yml` files that we distribute as part of the installation process.
Please read our guide on how to [customize the configuration](../configuration/customizations.md) of your SeaTable instance before proceeding.

In order to customize the configuration file used by `logrotate`, you can specify a volume mount definition inside a `custom-seatable-server.yml` file:

```yaml
services:
  seatable-server:
    volumes:
      - ./logrotate-seatable-custom.conf:/templates/logrotate-conf/seatable:ro
```

Do not forget to add this file to the `COMPOSE_FILE` variable inside your `.env` file.
