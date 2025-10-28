# Big Data Cleanup

<!-- md:version 6.0 -->

Unused or deleted big data storage is not automatically reclaimed. To free up disk space for bases that use large amounts of big data storage, run the following commands as needed.

## Detecting Bases with Large Big Data Storage

Check the size of the folders stored in `/opt/seatable-server/seatable/db-data`.  
Using the `ncdu` tool is recommended, as it shows the storage usage per folder.

Example output:

```
--- /opt/dtable-db/seatable/db-data ------------------------------------------
  135.4 MiB [##########################] /9ba24950-cd00-42dc-b5e9-233f3de2c2b6
   54.0 MiB [##########                ] /281b15c1-2a12-4da3-814d-145cb703a55b
   40.5 MiB [#######                   ] /76a4c7e8-2422-4c3f-9282-40e1e9fd5afc
   33.3 MiB [######                    ] /35a51052-0f29-4628-91f3-9aad177e1bd2
   33.1 MiB [######                    ] /52fd3b11-d00f-4fdf-b2ce-d306e08c4697
   30.4 MiB [#####                     ] /9220dada-2a6a-4392-8dee-0d77af0f5a02
   28.9 MiB [#####                     ] /3adc3d74-1783-40a9-9d05-245e9dc03f21
```

Each folder name corresponds to the UUID of a base.

## Garbage Collection for Big Data

Run garbage collection on a base to remove unused or deleted big data entries:

```bash
docker exec -it seatable-server bash
cd /opt/seatable/seatable-server-latest/
./dtable-db-admin.sh gc "<base_uuid>"
```

Replace `<base_uuid>` with the actual UUID of the base.

This command reclaims unreferenced data blocks and cleans up invalid references in the big data store.

## Flatten Command

After running garbage collection, you may see log warnings such as:

```
Unable to read: Key: xxx, file with ID not found
```

These messages can appear during backup operations. To clean up remaining invalid keys, run the flatten command:

```bash
./dtable-db-admin.sh flatten "<base_uuid>"
```

!!! note "Archived keys and values are stored in separate files in `dtable-db`"

    The warning occurs when garbage collection removes value files but leaves behind invalid key entries.  
    This does not affect data integrity and is primarily an internal maintenance issue.
