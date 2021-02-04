# Clean database

## dtable_db

Since version 1.2, we offer command to clear records older than 30 days in dtable_db database.

The following tables will be cleaned:

* activities
* user_activities
* operation_log
* notifications_usernotification
* dtable_notifications


```
docker exec -it seatable /bin/bash

seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py clean_db_records

```


