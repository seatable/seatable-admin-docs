# Base Export from Command Line

SeaTable allows to export a base from the command line. This overcomes the typical limits of a base. Important: This export does not contain big data.

```
docker exec -it seatable-server bash
cd /templates
seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py export_dtable <base_uuid>
```

For sure you have to replace the `base_uuid`. You can also pass the parameter `--ignore-asset true/false` to include or exclude the content of file/image columns.
