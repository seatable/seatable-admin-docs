# Security settings

## Accept headers

Our default deployment enforces strict security headers, which prevent the loading of images or scripts from external URLs. This approach is designed to enhance security and protect against fraudulent activities.

If you are running your own server, you have the option to modify these security headers to allow additional sites to interact with your SeaTable server.

To adjust these settings, you can modify the `seatable-server.yml` file located at `/opt/seatable-compose/seatable-server.yml`. The default configuration might look like this:

```
caddy.header.Content-Security-Policy: "`
    block-all-mixed-content;
    default-src 'none';
    style-src 'unsafe-inline' 'self';
    script-src 'unsafe-inline' 'unsafe-eval' 'self';
    script-src-elem 'unsafe-inline' 'self' ${SEATABLE_SERVER_HOSTNAME}:${ONLYOFFICE_PORT:-6233} maps.googleapis.com;
    font-src 'self' data:;
    img-src 'self' data: blob: https: market.seatable.io mt0.google.com maps.googleapis.com maps.gstatic.com;
    form-action 'self' ${SEATABLE_SERVER_HOSTNAME}:${COLLABORA_PORT:-6232};
    connect-src 'self' market.seatable.io https:;
    frame-src 'self' ${SEATABLE_SERVER_HOSTNAME}:${COLLABORA_PORT:-6232} ${SEATABLE_SERVER_HOSTNAME}:${ONLYOFFICE_PORT:-6233};
    frame-ancestors 'self';
    worker-src 'self' blob:;
    manifest-src 'self';
    object-src 'self';
    base-uri 'self'
    `"
```

Create a custom copy of your `seatable-server.yml` file and modify these settings according to your specific requirements. Don't forget to link the new yml file in your `.env` file.

## Cookies

!!! important "Secure cookies require additional configuration"

    To get these ratings, it is required to add two more options to `dtable_web_settings.py`. In one of the next versions, these parameters will probably be added by default.

    ```bash
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    ```

## DNSSEC

It also requires DNSSEC from your domain hoster to get the best security measures.
