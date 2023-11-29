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

```

## Automation Rules Configuration

In SeaTable, users have the ability to define triggers and actions within an automation rule.  
These rules are then automatically executed on a base.

The settings for these automation rules are located within the `[AUTOMATION]` section of the `dtable-events.conf` file.


To maintain server stability, SeaTable includes a feature that restricts the frequency of automation rule executions. This `per_minute_trigger_limit` is set to 50 by default.

```
[AUTOMATION]
per_minute_trigger_limit = 50
```
