---
status: wip
---

# Exporting a Base from the Command Line

SeaTable provides two ways to export a base using the command line. You can perform a simple export to a single `.dtable` file or an advanced export that includes all data, including big data content. Both methods bypass the limits of the web interface.

## Simple Export: Create a .dtable File

The simple export generates a ready-to-use `.dtable` file that can be imported into another SeaTable instance.

### Advantages

- Easy to run and import
- Produces a single `.dtable` file

### Limitations

- Maximum export size: 100 MB
- Does not include big data content from the SeaTable Big Data backend

### Export command

Use the following command to export a base by its `base_uuid`. The `.dtable` file will be saved to your current directory. In this example, the `/shared` folder is used because it is accessible from the SeaTable host.

```bash
docker exec -it seatable-server bash
cd /shared
seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py export_dtable <base_uuid>
```

Replace `<base_uuid>` with your actual base UUID.

### Excluding Attached Files and Images

To export only the structured base data and omit all assets (images, files), use the `--ignore-asset` option:

```
seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py export_dtable <base_uuid> --ignore-asset true
```

### If the Export Fails Due to Size Limits

If your base contains many attached files/images, you might encounter the `max_download_dir_size` limitation. You can increase this limit (default is 100 MB) in `seafile.conf`: 

```ini
[fileserver]
max_download_dir_size=1000
```

Then [restart SeaTable](../maintenance/restart-seatable.md)
This allows `.dtable` exports up to 1 GB in size.

## Advanced Export: Export to a Folder with All Data

<!-- md:version 6.0 -->

The advanced export uses the `export_dtable_folder` command. It creates a local folder that contains all base data, assets, and big data content. This approach is ideal for complete backups or when moving large datasets.

### Advantages

- Includes data from the Big Data backend
- No size limitation (overcomes the 100 MB default limit)

### Limitations

- The export produces a folder structure, not a single `.dtable` file
- Requires manual handling when re-importing or transferring

### Export Command

Run the following command to export all content, including big data, to your current folder. In this example, the `/shared` folder is used because it is accessible from the SeaTable host.

```bash
docker exec -it seatable-server bash
cd /shared
seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py export_dtable_folder <base_uuid>
```

This command creates:

- a folder with the name of the base
- inside this folder:
    - a content.json file with the base’s structure and data
    - one or more subfolders for assets and big data files

### Optional parameters

- `--ignore-archive-backup true`: Skips the export of archived backup data. Use this if archived backups are not required in the exported result.

## Importing an Advanced Export

<!-- md:version 6.0 -->

To import an exported base folder into another group/workspace, use the following command. 

```bash
seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py import_dtable_folder --workspace-id="<workspace id>" --path="<path to folder>"
```

Replace `<workspace id>` with the ID of the target workspace/group and provide the path to the folder containing the export.

After running the command, check that the output indicates a successful import.