---
status: new
---

# Security measures

## Web-Security

The default configuration of SeaTable is a good combination of best practies to improve the security without creating too many problems. HTTPS is required by default, modern ciphers are required and we enforce some security headers to prevent against typical script kiddies attacks.

This configuration approach delivers good results like:

- A+ from https://www.ssllabs.com/
- A from https://securityheaders.com/
- 100% from internet.nl (requires DNSSEC from your domain hoster)
- 80/100 or B+ from https://observatory.mozilla.org/

!!! important "Secure cookies require additional configuration"

    To get these ratings, it is required to add two more options to `dtable_web_settings.py`. In one of the next versions, these parameters will probably be added by default.

    ```bash
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SECURE = True
    ```

## Network security

- Only one entry point. HTTPS. Only one internet facing container.
- Networks segration. Docker container only have the network, they need. Network for public access, backend access...
- Grafik hinzufügen.

## Security scans

Up-to date container images.
probably.com...
Docker scout activated

## Documentation, Support and source code

For sure you can run any software product that just runs, but that is not our approach. Our goal is to build the world leading self-hosted no-code database and app building plattform. This includes also

- great documentation
- fast human support team
- source code available (except for parts where our intelectual property is not on risk)
- automatic testing and deployment processes

<!--More details ...-->
