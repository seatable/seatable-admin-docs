---
description: Customize Caddy security headers, Content-Security-Policy, and cookie settings for your SeaTable Server deployment.
---

# Security settings

## Accept headers

Our default deployment enforces strict security headers, which prevent the loading of images or scripts from external URLs. This approach is designed to enhance security and protect against fraudulent activities.

If you are running your own server, you have the option to modify these security headers to allow additional sites to interact with your SeaTable server.

The security headers are defined as `caddy_0.header.*` labels in `seatable-server.yml`. Do not change this file. Instead, override the header in a `custom-seatable-server.yml` file and add this file to the `COMPOSE_FILE` variable in your `.env` file, after `seatable-server.yml` (see [Advanced Settings for Caddy](./settings-caddy.md#how-to-customize-caddy)).

!!! warning "Your label replaces the complete header"

    A label in your custom file replaces the label with the same name. Copy the **current** value of `caddy_0.header.Content-Security-Policy` from your `seatable-server.yml` and only add the sources you need. Otherwise you lose the sources that SeaTable needs, for example for Collabora, OnlyOffice or maps. Check your custom value again after each update, because new versions may add sources.

**Example Configuration**

This example allows images from `images.example.com`:

```yaml
# custom-seatable-server.yml
---
services:
  seatable-server:
    labels:
      caddy_0.header.Content-Security-Policy: "`
        block-all-mixed-content;
        default-src 'none';
        ...
        img-src 'self' data: blob: https: market.seatable.io ... images.example.com;
        ...
        base-uri 'self'
        `"
```

Replace the `...` with the current values from `seatable-server.yml`.

## Cookies

!!! important "Secure cookies require additional configuration"

    To get these ratings, it is required to add two more options to `dtable_web_settings.py`. In one of the next versions, these parameters will probably be added by default.

    ```bash
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    ```

## DNSSEC

It also requires DNSSEC from your domain hoster to get the best security measures.

## IP access restriction

If you want to limit access to your SeaTable Server to selected IP addresses, read [IP Access Restriction](./ip-access-restriction.md).
