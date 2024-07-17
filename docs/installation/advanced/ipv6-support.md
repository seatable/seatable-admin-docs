# Activate IPv6 Support for SeaTable

The SeaTable Docker container does not activate IPv6 by default because Nginx is configured to listen only to IPv4.

To enable IPv6 on your Nginx server, you need to add a single line to the Nginx configuration file located at `/opt/seatable-server/seatable/conf/nginx.conf`.

Find the line `listen 80;` and add the following line below it, ensuring you include the trailing `;`:

```
listen [::]:80;
```

After making this change, your configuration file should look like this:

```
...
server {
    server_name <your-server-url>
    listen 80;
    listen [::]:80;
    ...
}
```

Next, run the following two commands. The first command checks the configuration file for errors. If there are no errors, execute the second command to reload Nginx:

```
docker exec seatable-server nginx -t
docker exec seatable-server nginx -s reload
```

Your SeaTable server will now support IPv6.
