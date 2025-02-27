# Upgrade manual

Updating/Upgrade (we don't differenciate) a SeaTable Server should take just a few seconds. Simply pull the latest Docker images for all components, restart the containers, and let the system automatically handle necessary database updates. Within moments, all essential services of the SeaTable Server will be accessible.

!!! warning "Backup is recommended"

    Updating SeaTable Server might entail changes to your database. To make sure your data is protected in any case, create a backup of your database first. See [backup and recovery](../maintenance/backup-recovery.md) for more details.

## How to update SeaTable Server

With version 4.3 we introduced a new way to install, update and maintain a SeaTable server. Before 4.3 you used to have one big docker-compose.yml. Even if it not mandatory to switch this setup, but we recommend it. Please check out this [article for more details](./migrate-seatable-release.md).

To update, choose the appropriate setup of yours.

??? success "Setup with `/opt/seatable-compose` folder (new)"

    Just ran this command to update SeaTable and all additional components.

    ```
    cd /opt/seatable-compose && \
    wget -c https://github.com/seatable/seatable-release/releases/latest/download/seatable-compose.tar.gz \
    -O - | tar -xz -C /opt/seatable-compose && \
    docker compose pull
    docker compose down
    docker compose up -d
    ```

    !!! warning "The default yml files will be overwritten! Use custom files instead."

        This command replaces all predefined yml files in your `/opt/seatable-compose` folder. It will not touch your .env file and your "custom" yml files. If you made some changes to the predefined yml files, make sure to save these changes and follow the recommendations to create custom copies in the future.

??? success "Setup with one docker-compose.yml (deprecated)"

    Open your docker-compose.yml file and search for `seatable/seatable-enterprise:{tag}`. Replace the {tag} with the latest version and save the file.

    Now, execute these commands to pull and start the newest version.

    ```bash
    docker compose pull
    docker compose up -d
    ```

    This will not update any other service in your docker-compose file. You have to take care by yourself to keep the other services up-to-date.

After some seconds your SeaTable Server should be reachable again. You can check the current version of your SeaTable Server opening the URL `https://<your-seatable-domain>/server-info`.

Now, you should login as system administrator, switch to the system admin are, and update the plugins as well. You can find more information about the [updating the plugins here](../../configuration/plugins/).

## Version specific changes and configurations

Some versions require specific configuration changes. Also new features might be introduced that needs specific configuration. Please check _after each update_ the [extra update notices](./extra-upgrade-notice.md).

---

## Naming conventions and update path

SeaTable follows typical naming conventions for updates:

- **2** :material-chevron-double-right: **3** is a major version upgrade.
- **3.3** :material-chevron-double-right: **3.4** is a minor version upgrade.
- **3.3.3** :material-chevron-double-right: **3.3.5** is a patch upgrade.

Some software solutions require that you follow a specific update path. Meaning like you first have to upgrade to the next major version and then go on. **This is not necessary with SeaTable.**

You can update from any version to the last one in one step. SeaTable v4.3 and newer take care of the required database updates.

## Update procedure before v4.3

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

    ```
    docker pull seatable/seatable-enterprise:{tag}
    ```

    Stop the currently running SeaTable container.

    ```
    docker compose down

    ```

    Then modify SeaTable version in "docker-compose.yml". And start a new SeaTable container.

    ```
    docker compose up -d
    ```

    ### Upgrade database

    Major version upgrade, like from 1.x to 2.x, and minor version upgrade, like from 1.1.x to 1.2.x, involve database changes. You need to manually change the database like following.

    Login to the SeaTable container. Then execute the upgrade statement (replace the version numbers accordingly).

    ```
    # Example of the required commands to update from 3.2.6 to 3.5.10
    docker exec -it seatable /bin/bash

    seatable.sh upgrade-sql 3.3
    seatable.sh upgrade-sql 3.4
    seatable.sh upgrade-sql 3.5
    ```

    If the above commands failed to execute for some reasons, (for example, you are using external database instead of the default one started by docker-compose), you can execute the database upgrade commands manually as below:

    ```
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

    ```
    docker exec -d seatable /shared/seatable/scripts/seatable.sh start

    ```
