das muss ich irgendwo noch einbauen...

!!! important "Secure cookies require additional configuration"

    To get these ratings, it is required to add two more options to `dtable_web_settings.py`. In one of the next versions, these parameters will probably be added by default.

    ```bash
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    ```

    It also requires DNSSEC from your domain hoster
