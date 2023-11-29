# dtable-event.conf settings

## Database Configuration

The settings for the database connection are located in the `[DATABASE]` section of the file `dtable-events.conf`

```
[DATABASE]
type = mysql
host = db
port = 3306
username = root
password = seatable_db
db_name = seafile_db

```

Note: MariaDB and MySQL are compatible. In this configuration example, we use MySQL.

## Redis Configuration

The settings for the Redis connection are located in the `[REDIS]` section of the file `dtable-events.conf`

```
[REDIS]
host = redis
port = 6379

```

## Email Notifications Configuration

The settings for email notifications are located in the `[EMAIL SENDER]` section of the file `dtable-events.conf`

```
[EMAIL SENDER]
enabled = true

```

## Notification Rules Scanner Configuration

Notification rules are a feature that allows users to set criteria for a base and receive notifications when these criteria are met.

The settings for the notification rules scanner are located in the `[NOTIFY-SCANNER]` section of the file `dtable-events.conf`

```
[NOTIFY-SCANNER]
enabled = true

```

## Automation Rules Configuration

In SeaTable, users have the ability to define triggers and actions within an automation rule.  
These rules are then automatically executed on a base.

The settings for the automation rules are located in the `[AUTOMATION]` section of the `dtable-events.conf` file.


To maintain server stability, SeaTable includes a feature that restricts the frequency of automation rule executions. This `per_minute_trigger_limit` is set to 50 by default.

```
[AUTOMATION]
per_minute_trigger_limit = 50
```
