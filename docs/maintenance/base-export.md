---
status: wip
---

# Exporting a Base from the Command Line

SeaTable allows you to export a base using the command line, bypassing typical limitations from the web interface.

!!! warning "Big Data Exclusion"

    Please note that the base export does not include big data.

## Export Command

Use the following command to export a base by its `base_uuid`. The dtable file will be saved to the `/templates` folder inside the docker container.

```
docker exec -it seatable-server bash
cd /templates
seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py export_dtable <base_uuid>
```

Replace `<base_uuid>` with the actual UUID of the base.

## Exporting Without Assets

By default, the export includes all data and content from image and file columns. To exclude file/image columns and export only base data, use the `--ignore-asset` parameter:

```
seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py export_dtable <base_uuid> --ignore-asset true
```

## Troubleshooting Large Asset Exports

If your base contains numerous assets, SeaTable may refuse to export with assets included. To resolve this, increase the `max_download_dir_size` value in the `seafile.conf` file and restart SeaTable:

```
[fileserver]
max_download_dir_size=1000
```

This adjustment allows the creation of dtable files up to 1 GB in size.
