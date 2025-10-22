# Changing Domain (URL)

When changing the domain of your SeaTable Server, you must not only update configuration files but also ensure that all internal file and image URLs inside bases are updated. This section describes all necessary steps.

## 1. Update Configuration

If your SeaTable Server’s URL changes (for example, from `https://old.example.com` to `https://new.example.com`), start by updating the following files:

- **`/opt/seatable-compose/.env`** – Replace all instances of the old domain with the new one, especially `SEATABLE_SERVER_HOSTNAME`.
- **`/opt/seatable-server/seatable/dtable_web_settings.py`** – Update variables containing the old domain, such as `DTABLE_WEB_SERVICE_URL`, `FILE_SERVER_ROOT` or any related configuration keys.

After saving the changes, [restart all containers](./restart-seatable.md) to apply the new configuration.

## 2. Update SSL Certificates

If you are using custom TLS/SSL certificates (not managed by Let’s Encrypt), you must [replace your existing certificate](../installation/advanced/custom-certificates.md) and key files to match the new domain. Make sure your new certificate is valid for the new domain before restarting the SeaTable services.

## 3. Transfer URLs Inside Bases

Changing the domain cause images or files stored in bases to become unreadable. To fix existing links to these assets in file/image columns, SeaTable provides a management command that replaces all image and file URLs from the old domain with the new one.

Open a shell inside the SeaTable container:

```
docker exec -it seatable-server bash
cd /opt/seatable/seatable-server-latest/dtable-web
```

Run one of the following commands:

??? success "For all bases"

    ```
    seatable.sh python-env ./manage.py domain_transfer -all -od <old domain> -nd <new domain>
    ```

    To change the domain from `https://old.example.com` to `https://new.example.com`, run:

    ```
    seatable.sh python-env ./manage.py domain_transfer -od https://old.example.com -nd https://new.example.com
    ```

??? success "For a single base"

    ```
    seatable.sh python-env ./manage.py domain_transfer -uuid <:base uuid> -od <old domain> -nd <new domain>
    ```

    To change the domain for a base with UUID `695fa115-4927-4be1-b5b6-fbbbabd43b72` from `https://old.example.com` to `https://new.example.com`, run:

    ```
    seatable.sh python-env ./manage.py domain_transfer -uuid 695fa115-4927-4be1-b5b6-fbbbabd43b72 -od https://old.example.com -nd https://new.example.com
    ```
