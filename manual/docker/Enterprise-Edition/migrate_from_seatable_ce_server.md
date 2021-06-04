# Migrate SeaTable CE to EE

## Preparation

Purchase SeaTable Professional license file or get a trial license file

## Migrate

### Stop the SeaTable CE

```sh
docker-compose down
```

**To ensure data security, it is recommended that you back up your MySQL data.**

### Put your licence file

Copy the `seatable-license.txt` to the volume directory of the SeaTable CE's data. If the directory is `/opt/seatable-data`, so you should put it in the `/opt/seatable-data/seatable/`.

### Modify the docker-compose.yml

Modify seatable image

```yml
  seatable:
    image: seatable/seatable-ee:latest
```

### Run SeaTable EE

Download SeaTable EE image:

```sh
docker pull seatable/seatable-ee:latest
```

Start SeaTable container with the following command:

```sh
docker-compose up -d
```

Start SeaTable service.

```sh
docker exec -d seatable /shared/seatable/scripts/seatable.sh start
```

## Upgrade database

If the upgrade from the developer version to the enterprise version is a cross-version upgrade, for example, from seatable: 1.6.0 to seatable-ee: 2.0.0, database upgrade is required after image is changed.

For details, see: [Upgrade manual](https://manual.seatable.io/upgrade/upgrade_manual/)
