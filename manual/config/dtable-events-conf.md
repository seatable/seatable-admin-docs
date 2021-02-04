# dtable-event.conf settings

## Database configuration

The configuration of database is in the `[DATABASE]` section of the file `dtable-events.conf`

```
[DATABASE]
type = mysql
host = db
port = 3306
username = root
password = seatable_db
db_name = seafile_db

```

Note: MariaDB and MySQL is compatible. In the configuration, we use mysql.

## Redis configuration

The configuration of redis is in the `[REDIS]` section of the file `dtable-events.conf`

```
[REDIS]
host = redis
port = 6379

```

## Email notifications configuration

The configuration of email notifications is in the `[EMAIL SENDER]` section of the file `dtable-events.conf`

```
[EMAIL SENDER]
enabled = true

```

## Notification rules scanner configuration

Notification rules is the feature that users can set notification rules for a base and got notifications when defined criteria meet.

The configuration of notification rules scanner is in the `[NOTIFY-SCANNER]` section of the file `dtable-events.conf`

```
[NOTIFY-SCANNER]
enabled = true
interval = 3600

```


