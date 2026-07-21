---
description: Step-by-step instructions to upgrade SeaTable Server using Docker Compose, including update paths and version-specific notes.
---

# Upgrade manual

Updating/Upgrade (we don't differentiate) a SeaTable Server should take just a few seconds. Simply pull the latest Docker images for all components, restart the containers, and let the system automatically handle necessary database updates. Within moments, all essential services of the SeaTable Server will be accessible.

!!! danger "No Rollback After Upgrade, Backup first!"

    After upgrading SeaTable, rolling back to a previous version is not supported due to possible changes in the database and files. Attempting to downgrade can cause data loss or system errors.

    **Always make a full backup before upgrading.** For instructions, see [Backup and Recovery](../maintenance/backup-recovery.md) for more details.

## How to update SeaTable Server

Updating SeaTable and all additional components involves the following steps:

1. Updating the `.yml` files
2. Following the extra upgrade notices for the target version
3. Applying changes
4. Updating the installed plugins

These steps are explained in the following sections.

### Updating the `.yml` files

!!! danger "The default `.yml` files will be overwritten! Use additional `.yml` files instead."

    The following command replaces all predefined `.yml` files in your `/opt/seatable-compose` folder.
    It will not touch your .env file and any "custom" `.yml` files that contain overrides.

    Please read our guide that describes how the [configuration can be customized](../configuration/customizations.md).
    This ensures that version upgrades stay seamless.

    If you've previously made changes to the predefined `.yml` files, make sure to save these changes and follow the [recommendations above](../configuration/customizations.md) instead.

You can update all `.yml` files inside `/opt/seatable-compose` by running the following command:

```bash
cd /opt/seatable-compose && \
wget -c https://github.com/seatable/seatable-release/releases/latest/download/seatable-compose.tar.gz \
-O - | tar -xz -C /opt/seatable-compose
```

Note that running this command does not **yet** affect running containers.

### Extra upgrade notices

Please review and follow the [extra upgrade notices](./extra-upgrade-notice.md) for the version you're upgrading to before proceeding.
This ensures that SeaTable will start correctly after upgrading.

!!! warning "Upgrading to v6.2 requires configuration changes"

    Upgrading to version v6.2 requires various configuration changes. Please carefully read the [extra upgrade notices](./extra-upgrade-notice.md)

### Applying changes

After addressing the version-specific changes in the [extra upgrade notices](./extra-upgrade-notice.md), you're ready to apply the changes to the `*.yml` files.
This can be achieved by running the following commands:

```bash
cd /opt/seatable-compose
docker compose pull
docker compose down
docker compose up -d
```

After some seconds your SeaTable Server should be reachable again. You can check the current version of your SeaTable Server opening the URL `https://<your-seatable-domain>/server-info`.

Please refer to the [troubleshooting section](../installation/faq.md) of the admin manual in case you're running into issues.

### Updating plugins

After updating SeaTable Server, you should update all installed plugins inside the system admin area.
This ensures that you're running plugin versions that are compatible with your SeaTable Server version.
You can find more information about the plugin update process [here](../configuration/plugins.md).

---

## Naming conventions and update path

SeaTable follows typical naming conventions for updates:

- **2** :material-chevron-double-right: **3** is a major version upgrade.
- **3.3** :material-chevron-double-right: **3.4** is a minor version upgrade.
- **3.3.3** :material-chevron-double-right: **3.3.5** is a patch upgrade.

Some software solutions require that you follow a specific update path. Meaning like you first have to upgrade to the next major version and then go on. **This is not necessary with SeaTable.**

You can update from any version to the last one in one step. SeaTable v4.3 and newer take care of the required database updates.

## Update procedure with one single docker-compose.yml (deprecated)

With version 4.3 we introduced a new way to install, update and maintain a SeaTable server. Before 4.3 you used to have one big docker-compose.yml. Even if it is not mandatory to switch to this setup, we recommend it. Please check out this [article for more details](./migrate-seatable-release.md).

Open your `docker-compose.yml` file and search for `seatable/seatable-enterprise:{tag}`. Replace the {tag} with the latest version and save the file.

Now, execute these commands to pull and start the newest version.

```bash
docker compose pull
docker compose up -d
```

This will not update any other service in your docker-compose file. You have to take care by yourself to keep the other services up-to-date. Therefore it is recommended to migrate to the newest installation method with multiple YAML files.

## Update procedure before v4.3 (deprecated)

This part of the manual is only for older version, meaning if you are updating to version v4.2 or older. As soon as you update to version 4.3 or newer, you can ignore the following part.

??? note "Update procedure before v4.3"

    In general, to upgrade to a new version, you need to

    1. Pull a new docker image version
    2. Stop the service and do the database migration manually
    3. Restart the service

    If there are extra notes for a specific version, you can find it here: [extra notices](./extra-upgrade-notice.md)

    ### Get latest SeaTable

    You can find all versions of SeaTable from [Docker Hub](https://hub.docker.com/r/seatable/seatable-enterprise/tags).

    Run the following command to get the latest version of Seatable.

    ```bash
    docker pull seatable/seatable-enterprise:{tag}
    ```

    Stop the currently running SeaTable container.

    ```bash
    docker compose down

    ```

    Then modify SeaTable version in "docker-compose.yml". And start a new SeaTable container.

    ```bash
    docker compose up -d
    ```

    ### Upgrade database

    Major version upgrade, like from 1.x to 2.x, and minor version upgrade, like from 1.1.x to 1.2.x, involve database changes. You need to manually change the database like following.

    Login to the SeaTable container. Then execute the upgrade statement (replace the version numbers accordingly).

    ```bash
    # Example of the required commands to update from 3.2.6 to 3.5.10
    docker exec -it seatable /bin/bash

    seatable.sh upgrade-sql 3.3
    seatable.sh upgrade-sql 3.4
    seatable.sh upgrade-sql 3.5
    ```

    If the above commands failed to execute for some reasons, (for example, you are using external database instead of the default one started by docker-compose), you can execute the database upgrade commands manually as below:

    ```bash
    docker exec -it seatable /bin/bash

    cd /opt/seatable/seatable-server-latest/sql/mysql/upgrade
    mysql -h$DB_HOST -p$DB_ROOT_PASSWD dtable_db < ./3.3/dtable.sql
    mysql -h$DB_HOST -p$DB_ROOT_PASSWD dtable_db < ./3.4/dtable.sql
    mysql -h$DB_HOST -p$DB_ROOT_PASSWD dtable_db < ./3.5/dtable.sql
    ```

    If you upgrade several versions at once, just run all the database upgrade statement one by one, starting from the lowest version.

    !!! hint "Tiny version update"

        Tiny version upgrade, like from 3.3.8 to 3.3.10, does not involve database changes.

    ### Start SeaTable server

    Now you can start the SeaTable service. Execute the following command in the host server:

    ```bash
    docker exec -d seatable /shared/seatable/scripts/seatable.sh start
    ```
