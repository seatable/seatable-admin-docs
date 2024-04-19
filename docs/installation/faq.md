---
status: new
---

## Troubleshooting SeaTable Server

??? question "SeaTable doesn't start / Webinterface is not reachable"

    First let's try to find out, where the problem is. If you try to access your SeaTable Server goes like this:

    **Browser** -> **Domain/DNS** -> **Caddy** -> **Nginx** -> **SeaTable Container** -> **SeaTable Server**

    Check the following solutions to determine what is not running.

??? question "Verify that SeaTabler Server is running"

    Execute `docker logs seatable-server`. This should result in:

    ```
    2024-02-04 12:59:17 Start server
    SeaTable started
    2024-02-04 12:59:21 For more startup information, please check the /opt/seatable/logs/init.log
    2024-02-04 12:59:21 This is an idle script (infinite loop) to keep container running.
    ```

    ---

    Another check might be:

    ```
    docker exec -it seatable-server curl http://127.0.0.1:8000/server-info/
    ```

    This should return:

    ```
    {"version":"4.3.8","edition":"enterprise edition"}
    ```

    If you don't see this, SeaTable Service is definately not running. Try to start the service from the docker container and check the logs for more details.
    Here are the two commands...

    - `docker exec -it seatable-server seatable.sh`
    - `tail -f /opt/seatable-server/seatable/logs/*.log`

    Probably you have a wrong configuration value in `dtable_web_settings.py`.

??? question "Verify that SeaTable Container is healthy"

    Execute `docker ps`. This should be the result:

    ```
    CONTAINER ID   IMAGE                               STATUS                NAMES
    0411d977eb25   seatable/seatable-enterprise:4.3.8  Up 3 days (healthy)   seatable-server
    ```

    If the container is not (healthy), you can be sure, that something is wrong with the container.

??? question "Check nginx"

    There might be a misconfiguration of `nginx.conf`. nginx provides a configuration checker.

    ```
    docker exec -it seatable-server nginx -t
    ```

    It should look like:

    ```
    nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
    nginx: configuration file /etc/nginx/nginx.conf test is successful
    ```

    If not, check the nginx configuration file at `/opt/seatable-server/seatable/conf/nginx.conf`.

??? question "Check caddy"

    ```
    docker logs caddy
    ```

    more info will follow.

??? question "Domain/DNS"

    execute `curl https://<your-seatable-server-domain>` or `ping <your-seatable-server-domain>` to get more details.

??? question "Other typical problems"

    - License expired or not provided
    - PLUGIN_REPO_ID wrong in dtable_web_settings.py
    - spaces in COMPOSE_FILE variable in `.env` file.

## Troubleshoot Configuration Issues

...

<!--
**2. There is not welcome page from OnlyOffice**

If `https://SEATABLE_SERVER_HOSTNAME/onlyofficeds/welcome` shows a SeaTable error page, you should check the nginx configuration file.
Make sure that the two components are added and that there are no nginx errors and restart nginx.

```bash
cd /opt/seatable/seatable-data/seatable/conf
nano nginx.conf
```

**3. OnlyOffice Welcome page is shown but document does not open**

Check your configuration of `dtable_web_settings.py`. Make sure that you added your public SeaTable Server address. Make sure that `jwt-token` is the same in `dtable_web_settings.py` and `docker-compose.yml`.
-->

## Networking Issues

...

---

Ports müssen offen sein
security headers vielleicth im Bereich Proxy.

## FAQ's

SeaTable

Problems, that might occur:

- Check DNS settings. IPv4 and IPv6

**If, for whatever reason, the installation fails, how do I to start from a clean slate again?**

Stop all containers, remove everything under the folder `/opt` and start again.

**What if no url is pointing to the SeaTable server?**

No problem. Just enter your local IP-Adress instead of the URL into the .env file.

**What if you want to provide your own Reverse Proxy / TLS termination?**

You can opt out of using caddy and use another webserver of your choice, just don't include it in the COMPOSE_FILE list. In this case you have to take care of the SSL termination yourself and map port 80 to the seatable container directly.

- spaces in the COMPOSE_FILE
- activate logging (gehört hier nciht hin.)

collabora: expire time zurücksetzen für hosting discovery durch .env parameter.

---

onlyoffice und collabora brauchen offene ports.
security header sind wichtig.

-- weitere häufige probleme:

- PLUGIN_REPO_ID ist leer, deshalb können plugins nicht installiert werden.
- superuser neu setzen -> gehört unter maintenance
- license is wrong, seatable startet nicht.

Das backup script muss schöner gemacht werden. -> cronjobs...
