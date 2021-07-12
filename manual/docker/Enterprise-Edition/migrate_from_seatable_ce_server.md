# Migrate SeaTable DE to EE

## Requirements

You need a SeaTable license file to migrate from SeaTable Developer Edition (SeaTable DE) to SeaTable Enterprise Edition (SeaTable EE).

NOTE: To protect your data, it is strongly recommended to back up the database prior to the migration. See the section on [backup and recovery](https://manual.seatable.io/maintain/backup_recovery/) for details.

## Migration

### Stopping the SeaTable DE

Stop all containers started by Docker Compose:

```sh
docker-compose down
```

### Copying the Licence File

Save the `seatable-license.txt` in the [volume of the container `seatable`](https://manual.seatable.io/docker/Developer-Edition/Deploy%20SeaTable-DE%20with%20Docker/). 

If you use the volume's default path, save the file in the directory `/opt/seatable/seatable-data/seatable/`.

### Downloading the SeaTable EE Image

Pull the SeaTable EE image from Docker Hub::

```sh
docker pull seatable/seatable-ee:latest
```

### Modifying the docker-compose.yml

Adjust the used Seatable image in the docker-compose.yml:

```yml
  seatable:
    image: seatable/seatable-ee:latest
```

### Starting SeaTable

Start the SeaTable container:

```sh
docker-compose up -d
```

Start the SeaTable service:

```sh
docker exec -d seatable /shared/seatable/scripts/seatable.sh start
```

## Upgrading the Database

If you migrate from one minor release of SeaTable DE to SeaTable EE (i.e., from SeaTable DE 1.6.0 to SeaTable EE 1.6.4), no further action is required.

If the upgrade from the Developer Edition to the Enterprise Edition involves a version change (i.e., from SeaTable DE 1.6 to SeaTable EE 2.0), then a database upgrade is required like after changing an image. See the [upgrade manual](https://manual.seatable.io/upgrade/upgrade_manual/) for details.
