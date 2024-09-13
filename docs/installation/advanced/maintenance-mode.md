# Maintenance Mode

Sometimes updates or changes in the configuration are necessary, and it's important to limit access to the server during this period. Enabling maintenance mode ensures that only dedicated IP addresses can access the server, while all other users see a simple maintenance page with a `503 Service Unavailable` status code.

## Enabling Maintenance Mode

Here's how to configure such a maintenance page using Caddy:

1. Go to `/opt/seatable-compose/`
2. Create a copy of your `seatable-server.yml` and name it `maintenance.yml`
3. Replace the current labels of your SeaTable Server with the following labels.
4. Replace `<your-allowed-ip>` with one IP adresses, that should have access to your server.
5. Open your `.env` file and replace `seatable-server.yml` with `maintenance.yml` (in the variable `COMPOSE_FILE`)
6. Run `docker compose up -d`

```
...
    labels:
      caddy: ${SEATABLE_SERVER_PROTOCOL:-https}://${SEATABLE_SERVER_HOSTNAME:?Variable is not set or empty}
      caddy.@blocked: 'not remote_ip <your-allowed-ip> private_ranges'
      caddy.respond: '@blocked "SeaTable Cloud is currently undergoing maintenance. The service will be restored shortly. Thank you for your patience." 503'
      caddy.header.Retry-After: 3600
      caddy.reverse_proxy: "{{upstreams 80}}"
...
```

## How does maintenance look like

If you are accessing your system from an IP address that has been specified in your labels, you can continue using SeaTable as usual.

All other users will see a maintenance page displaying the following message:

![Maintenance page](../../assets/images/seatable-maintenance.png)

## Disable Maintenance Mode

To disable maintenance mode, update your `.env` file by replacing `maintenance.yml` with `seatable-server.yml`. Then, run the command:

```
docker-compose up -d
```

Your SeaTable server will once again be accessible to all users.
