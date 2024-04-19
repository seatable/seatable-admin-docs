# Migrate between SeaTable Editions

The migration between SeaTable Enteprise Edition and SeaTable Developer Edition is easy and possible at any time. Please make sure that you only migrate between the same major and minor versions:

- 3.3.7 Enterprise Edition :material-chevron-double-right: 3.3.0 Developer Edition is :white_check_mark:
- 3.2.0 Developer Edition :material-chevron-double-right: 3.2.6 Enterprise Edition is :white_check_mark:
- 3.3.7 Enterprise Edition :material-chevron-double-right: 3.4.0 Developer Edition is :red_square:
- 3.2.0 Developer Edition :material-chevron-double-right: 3.3.7 Enterprise Edition is :red_square:

You can find the available images and their versions at :material-docker: docker hub:

- [Available Enterprise Editions](https://hub.docker.com/r/seatable/seatable-enterprise/tags)
- [Available Developer Editions](https://hub.docker.com/r/seatable/seatable-developer/tags)

!!! warning "Backup is recommended"

    To protect your data, it is strongly recommended to back up the database prior to the migration. See the section on [backup and recovery](../maintenance/backup-recovery.md) for details.

## Migration

Basically for the migration only two things are important:

- provide a seatable server license (if necessary)
- switch the used docker image

After a restart of the docker containers, SeaTable takes care of the rest. So let see what you have to do.

??? tip "Migrate from Enterprise Edition to Developer Edition"

    ## Enterprise to Developer Edition

    ### Stop SeaTable Server

    Stop all containers that are currently running.

    ```bash
    cd /opt/seatable-compose && \
    docker compose down
    ```

    ### Switch images

    Open your `/opt/seatable-compose/.env` file and add this line to use the SeaTable developer image.
    Make sure to replace `latest` with the correct version as described at the beginning of this article.

    ```bash
    SEATABLE_IMAGE='seatable/seatable-developer:latest'
    ```

    ### Restart SeaTable Server

    Just copy and paste these commands to restart seatable.

    ```bash
    cd /opt/seatable-compose && \
    docker compose up -d
    ```

??? success "Migrate from Developer Edition to Enterprise Edition"

    ## Developer to Enterprise Edition

    ### Stop SeaTable Server

    Stop all containers that are currently running.

    ```bash
    cd /opt/seatable-compose && \
    docker compose down
    ```

    ### Modify your .env file

    Open your .env file and search for the definition of SEATABLE_IMAGE. It should point to `seatable/seatable-developer`. Either remove this line or add the correct SeaTable Enterprise Edition.

    ### Provide the seatable-server licence file

    Save the `seatable-license.txt` to `/opt/seatable-compose`.

    ### Restart SeaTable Server

    Just copy and paste these commands to restart seatable.

    ```bash
    cd /opt/seatable-compose && \
    docker compose up -d
    ```
