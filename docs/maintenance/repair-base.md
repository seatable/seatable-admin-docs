# Repair a base from the command line

SeaTable provides a repair script that can be executed from the command line to fix/repair typical problems with a base:

- Remove the content of deleted columns to reduce the size of the base (and avoid the 200MB limit)
- Check if every table has a column with the id `0000`
- Check that only existing rows are linked
- ...
- ...

For the execution you need the `base_uuid`.

```
docker exec -it seatable-server bash
cd /templates
seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py repair_base <base_uuid>
```
