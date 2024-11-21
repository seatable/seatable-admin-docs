# Secrets Management

## SECRET_KEY

During initialization, SeaTable generates a `SECRET_KEY` and saves this random string to the configuration file `dtable_web_settings.py`.

This `SECRET_KEY` serves two critical functions:

1. Generating user sessions
2. Encrypting "thirdparty account passwords"

!!! warning "Changing the SECRET_KEY"

    It is strongly discouraged to change the `SECRET_KEY` after initial setup. Modifying it will result in:

      - "Thirdparty accounts" becoming inaccessible
      - All current user sessions becoming invalid

If you absolutely must change the `SECRET_KEY`, follow these steps:

1. Delete all thirdparty accounts from all bases
2. Stop SeaTable
3. Change the `SECRET_KEY`
4. Restart SeaTable
5. All users will need to log in again
6. Create new thirdparty accounts as needed

## PRIVATE_KEY

SeaTable generates a `PRIVATE_KEY` during initialization for secure inter-component communication between dtable-web and dtable-server/dtable-db. This key is used in two configuration files and must be identical:

1. `dtable_server_config.json`: as `private_key`
1. `dtable_web_settings.py`: as `DTABLE_PRIVATE_KEY`

If you update this `PRIVATE_KEY`, always ensure that these PRIVATE_KEY values match across both configuration files to maintain proper system functionality.
