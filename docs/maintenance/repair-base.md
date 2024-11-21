# Repair/Prune a base from the command line

SeaTable provides a repair script that can be executed from the command line to fix/repair typical problems with a base:

- Ensures that every table has a column with the ID `0000`
- Removes all rows and views without an ID

In addition, the repair script prunes the base by removing the content of deleted columns from the JSON object to reduce the size of the base, thus avoiding the 200MB limit.

This can free up quite a lot of space if you have deleted columns with lots of values since deleting a column **does not** immediately remove the _column values_ from the JSON object. Instead, only the _column definition_ is removed.

For the execution you need the `base_uuid`.

```
docker exec -it seatable-server bash
cd /templates
seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py repair_base <base_uuid>
```
