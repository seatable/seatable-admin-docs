# List of available environment variables

SeaTable supports environment variables for initial deployment and configuration of some settings. This is the complete list of supported settings. With every version, new variables will be added.
Please note that this page only denotes environment variables used by SeaTable and its core components.

```ini
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
MARIADB_HOST='mariadb'
MARIADB_PORT='3306'
MARIADB_PASSWORD='topsecret' # (7)!

# Redis
REDIS_HOST='redis'
REDIS_PORT='6379'
REDIS_PASSWORD='topsecret'

JWT_PRIVATE_KEY='topsecret' # (8)!

# SeaDoc
ENABLE_SEADOC='false'
SEADOC_PORT=''

# Python-Pipeline
PYTHON_SCHEDULER_URL='http://python-scheduler' # (13)!
PYTHON_SCHEDULER_AUTH_TOKEN='topsecret'

# E-Mail
SEATABLE_EMAIL_USE_TLS= # (12)!
SEATABLE_EMAIL_HOST=
SEATABLE_EMAIL_HOST_USER=
SEATABLE_EMAIL_HOST_PASSWORD=
SEATABLE_EMAIL_PORT=
SEATABLE_DEFAULT_FROM_EMAIL=
SEATABLE_SERVER_EMAIL=

# Templates
SEATABLE_SHOW_TEMPLATES_LINK= # (9)!
SEATABLE_TEMPLATE_BASE_API_TOKEN=
SEATABLE_TEMPLATE_TABLE_NAME=
SEATABLE_ENABLE_CREATE_BASE_FROM_TEMPLATE=

# Logging
SEATABLE_LOG_LEVEL=INFO # (10)!

# Docker Images
# You can use these variables to override the default images
SEATABLE_IMAGE=
SEATABLE_DB_IMAGE=
SEATABLE_REDIS_IMAGE=
IMAGE_CADDY=

# Miscellaneous
SEATABLE_HELP_LINK=https://help.seatable.com # (11)!
```

1.  COMPOSE_FILE is a comma separated list of files **without spaces**. This list defines which components should run on this server.
2.  Get a [list of timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) from Wikipedia.
3.  Select your domain or subdomain that points to your Server (without https://). You have to set an A-Record or CNAME pointing to your IP.
4.  Available options are `http` and `https`. Default value is `https`.
5.  Email address of an initial admin user. Is only used during the first startup.
6.  Password of an initial admin user. Is only used during the first startup.
7.  Password for the root user for the MariaDB databases.
8.  This private key is used to sign JWTs in SeaTable.
9.  Please refer to [Templates](../customization/templates.md) for more information.
10. Allowed values are `DEBUG`, `INFO`, `WARNING`, `ERROR` and `CRITICAL`.
11. Please refer to [Manual Link](../customization/manual-in-nav.md) for more information.
12. Please refer to [Email Sending](./sending-email.md) for more information.
13. Please refer to [Python Pipeline](../installation/components/python-pipeline.md) for more information.

<!--
TODO: add environment variables for cluster setup!
-->