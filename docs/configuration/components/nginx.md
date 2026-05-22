---
description: Customize the Nginx configuration for SeaTable Server using custom config files that persist across updates.
---

# Configuration of Nginx

SeaTable automatically generates a default `nginx.conf` file in the configuration folder. **Since version 5.3, we no longer use this file.**

The reason for this change is that SeaTable updates often require modifications to the `nginx.conf` file to support new features. These changes are not customer-specific and can complicate the update process. To simplify updates and ensure stable, maintainable configurations, we now provide a custom `nginx.conf` file together with the YAML configuration files. This custom file, located in the compose folder (`/opt/seatable-compose`), is mounted into the container at startup.

**As a result, the `nginx.conf` file in the container’s configuration folder is obsolete.**

## Customizing Nginx Configuration

When you update SeaTable, all default files in `/opt/seatable-compose` will be overwritten.
This includes all changes that you may do in `nginx.conf` and `seatable-server.yml`.
You should read our guide that explains how to [customize the configuration](../customizations.md) of your instance before proceeding.

To preserve your custom configuration settings, follow these steps:

1. **Create a Copy:**
   Make a copy of the `seatable-nginx.conf` file (e.g. `custom-seatable-nginx.conf`) in your compose folder (`/opt/seatable-compose`).

2. **Edit the Custom File:**
   Make any necessary changes to your custom NGINX configuration file.
   **Note:** All future modifications should be made to this custom file to ensure that your modifications are preserved across version upgrades.

3. **Mount the Custom Config File:**
   Create a `custom-seatable-server.yml` file that contains a volume mount for your custom NGINX file:
   ```yaml
   services:
     seatable-server:
       volumes:
         - ./custom-seatable-nginx.conf:/etc/nginx/sites-enabled/default
   ```

4. **Update the .env File:**
   In your `.env` file, update the `COMPOSE_FILE` variable to include your `custom-seatable-server.yml` file (if this is not already the case).

5. **Apply the Changes:**
   Run `docker compose up -d` inside the directory `/opt/seatable-compose` in a terminal for your changes to take effect.

This ensures that your custom configuration is used instead of the original file.
