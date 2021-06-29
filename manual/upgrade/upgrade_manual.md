# Upgrade manual

In general, to upgrade to a new version, you need to

1. Pull a new docker image version
2. Stop the service and do the database migration manually
3. Restart the service 

If there are extra notes for a specific version, you can find it here: [extra notices](./extra-upgrade-notice.md)


## Get latest SeaTable

You can find all versions of SeaTable from [Docker Hub](https://hub.docker.com/r/seatable/seatable/tags).

Run the following command to get the latest version of Seatable.

```
docker pull seatable/seatable:{tag}

```

Stop the currently running SeaTable container.

```
docker-compose down

```

Then modify SeaTable version in "docker-compose.yml". And start a new SeaTable container.

```
docker-compose up -d

```

## Upgrade database

### Major or minor version upgrade

Major version upgrade, like from 1.x to 2.x, and minor version upgrade, like from 1.1.x to 1.2.x, involve database changes. You need to manually change the database like following:

```
docker exec -it seatable /bin/bash # Login to the SeaTable container. Then execute the upgrade statement

mysql -h$DB_HOST -p$DB_ROOT_PASSWD dtable_db </opt/seatable/seatable-server-latest/sql/mysql/upgrade/1.1/dtable.sql
mysql -h$DB_HOST -p$DB_ROOT_PASSWD dtable_db </opt/seatable/seatable-server-latest/sql/mysql/upgrade/1.2/dtable.sql

```

If you upgrade several versions at once, just run all the database upgrade statement one by one, starting from the lowest version.

### Tiny version upgrade

Tiny version upgrade, like from 1.0.1 to 1.0.2, does not involve database changes.

## Start SeaTable server

Now you can start the SeaTable service. Execute the following command in the host server:

```
docker exec -d seatable /shared/seatable/scripts/seatable.sh start

```


