---
status: new
---

# Configuration of Nginx

SeaTable automatically generates a default `nginx.conf` file in the configuration folder. **Since version 5.3, we no longer use this file.**

The reason for this change is that SeaTable updates often require modifications to the `nginx.conf` file to support new features. These changes are not customer-specific and can complicate the update process. To simplify updates and ensure stable, maintainable configurations, we now provide a custom `nginx.conf` file together with the YAML configuration files. This custom file, located in the compose folder (`/opt/seatable-compose`), is mounted into the container at startup.

**As a result, the `nginx.conf` file in the container’s configuration folder is obsolete.**

## Customizing Nginx Configuration

When you update SeaTable, all default files in `/opt/seatable-compose` will be overwritten. This includes all changes that you may do in `nginx.conf` and `seatable-server.yml`. To preserve your custom configurations, follow these steps:

1. **Create Custom Copies:**  
   Make a copy of the `nginx.conf` and `seatable-server.yml` files, for example as `custom-nginx.conf` and `custom-seatable-server.yml` in your compose folder (`/opt/seatable-compose`).

2. **Edit the Custom Files:**  
   Make any necessary changes to your custom configuration files.  
   **Note:** All future modifications should be made to these custom files, not the original files.

3. **Update the .env File:**  
   In your `.env` file, update the `COMPOSE_FILES` variable to include your `custom-seatable-server.yml` file.

After making changes, [restart the SeaTable container](../maintenance/restart-seatable.md) for your changes to take effect. 

This ensures that your custom configuration is used instead of the original files.