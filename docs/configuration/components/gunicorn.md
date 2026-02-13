---
status: new
---

# Configuration of Gunicorn

Gunicorn is used within the SeaTable Docker container as the WSGI server that runs the main web application and API processes (account endpoints). It sits between the web server **nginx** and the SeaTable Python code, efficiently handling concurrent user requests and ensuring robust performance.

!!! success "Typically no changes are necessary!"

    SeaTable automatically configures Gunicorn with optimal settings for most deployments. Adjustments are only required in advanced scenarios, such as customizing performance, logging, or security settings. For most administrators, the default configuration ensures secure and efficient operation.

## Example configuration

A typical Gunicorn configuration file is created automatically by SeaTable during the first startup:

```
daemon = True
workers = 5
threads = 5

# default localhost:8000
bind = '127.0.0.1:8000'

# Pid
pidfile = '/opt/seatable/pids/dtable-web.pid'

# for file upload, we need a longer timeout value (default is only 30s, too short)
timeout = 1200

limit_request_line = 8190

# Log
#accesslog = '/opt/seatable/logs/gunicorn-access.log'
#errorlog = '/opt/seatable/logs/gunicorn-error.log'
```
