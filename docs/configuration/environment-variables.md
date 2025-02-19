---
status: wip
---

# List of available environment variables

SeaTable supports environment variables for initial deployment and configuration of some settings. This is the complete list of supported settings. With every version, new variables will be added.

## Table of settings

### Basic setup

| Environment Variable         | Description                                                           | Version |
| ---------------------------- | --------------------------------------------------------------------- | ------- |
| COMPOSE_FILE                 | List of yaml files. Specifing with services should run on the server. | 3.4     |
| COMPOSE_PATH_SEPARATOR       | Separator of yaml files.<br>By default, value is ','                  | 3.4     |
| TIME_ZONE                    |                                                                       | 3.4     |
| SEATABLE_SERVER_HOSTNAME     |                                                                       | 3.4     |
| SEATABLE_SERVER_PROTOCOL     |                                                                       | 3.4     |
| SEATABLE_ADMIN_EMAIL         |                                                                       | 3.4     |
| SEATABLE_MYSQL_ROOT_PASSWORD |                                                                       | 3.4     |

### Python Pipeline

| Environment Variable        | Description                                                                        | Version |
| --------------------------- | ---------------------------------------------------------------------------------- | ------- |
| PYTHON_SCHEDULER_AUTH_TOKEN | Shared token for secure communication between Python Scheduler and SeaTable Server | 3.4     |
| PYTHON_SCHEDULER_LOG_LEVEL  | Allowed values: INFO, WARNING, DEBUG, ERROR                                        | 3.4     |
| DELETE_LOG_DAYS             |                                                                                    |         |
| DELETE_STATISTICS_DAYS      |                                                                                    |         |

## Configuration

### Basic setup

<!-- md:version 3.4 -->

These are the basic settings to configure a SeaTable Server.

```
COMPOSE_FILE='caddy.yml,seatable-server.yml'
COMPOSE_PATH_SEPARATOR=','
TIME_ZONE='Europe/Berlin'
SEATABLE_SERVER_HOSTNAME=
SEATABLE_SERVER_PROTOCOL='https'
SEATABLE_ADMIN_EMAIL=
SEATABLE_ADMIN_PASSWORD=
SEATABLE_MYSQL_ROOT_PASSWORD=
```

More explanations to ...

### Python Pipeline

<!-- md:version 3.4 -->

```
PYTHON_SCHEDULER_AUTH_TOKEN
```

### Custom Images

<!-- md:version 3.4 -->
<!-- md:feature -->

You can easily overrule which images should be used. Just add other docker images that are accessable from Docker Hub.

```
SEATABLE_IMAGE=
SEATABLE_DB_IMAGE=
SEATABLE_MEMCACHED_IMAGE=
SEATABLE_REDIS_IMAGE=
IMAGE_CADDY=
PYTHON_SCHEDULER_IMAGE=
PYTHON_STARTER_IMAGE=
PYTHON_RUNNER_IMAGE=
COLLABORA_IMAGE=
ONLYOFFICE_IMAGE=
UPTIMEKUMA_IMAGE=
ZABBIX_SERVER_IMAGE=
ZABBIX_WEB_IMAGE=
ZABBIX_AGENT_IMAGE=
```

## Example .env file

```python
# components to be used
COMPOSE_FILE='caddy.yml,seatable-server.yml' # (1)!
COMPOSE_PATH_SEPARATOR=','

# system settings
TIME_ZONE='Europe/Berlin' # (2)!

# seatable server base url
SEATABLE_SERVER_HOSTNAME='seatable.example.com' # (3)!
SEATABLE_SERVER_PROTOCOL='https' # (4)!

# initial web admin
SEATABLE_ADMIN_EMAIL='me@example.com' # (5)!
SEATABLE_ADMIN_PASSWORD='topsecret' # (6)!

# database
SEATABLE_MYSQL_ROOT_PASSWORD='topsecret' # (7)!

# python pipeline
```

1.  COMPOSE_FILE is a comma separated list **without spaces**. This list defines which components should run on this server.
2.  Get a [list of timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) from Wikipedia.
3.  Select your domain or subdomain that points to your Server (without https://). You have to set an A-Record or CNAME pointing to your IP.
4.  Available options are `http` and `https`. Default value is `https`.
5.  Email address of an initial admin user. Is only used once.
6.  ...
7.  ...
