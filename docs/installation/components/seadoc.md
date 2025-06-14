# Report Design (seadoc)

<!-- md:version 5.3 -->
<!-- md:flag enterprise -->

SeaDoc is a Docker container required for the new SeaTable **Report Design** plugin. With this plugin, you can easily create multi-page technical reports, summaries, and other documents.

!!! example "Currently in Beta"

    The **Report Design** plugin is currently in beta. We welcome your feedback. The official release is planned for version 6.0.

## Installation Requirements

1. SeaTable Enterprise Edition installed and running
2. Firewall configured to allow traffic on port 6240
3. System admin to install both the report design plugin and this seadoc editor (server component)

## SeaDoc Installation

Follow these steps to deploy the seadoc editor on the same node as the seatable-server:

#### Update .env file

Like with all additional components you need to add `seadoc.yml` to the `COMPOSE_FILE` variable in your `.env` file.

Simply copy and paste (:material-content-copy:) the following code into your command line:

```bash
sed -i "s/COMPOSE_FILE='\(.*\)'/COMPOSE_FILE='\1,seadoc.yml'/" /opt/seatable-compose/.env
```

#### Launch the seadoc editor

Simply run the following commands to (re-)start SeaTable and seadoc container.

```bash
cd /opt/seatable-compose && \
docker compose up -d
```

#### Verify Installation

After a few seconds, check `https://<your-seatable-url>:6240`. You should see:

```
Welcome to sdoc-server. The current version is ...
```

This confirms that the `seadoc` container is operational. If you don't see this message, check that port 6240 is allowed and the container logs.

## Final Steps

With the server-side installation finished, you can now install the **report design plugin** from the SeaTable admin interface and start using this powerful reporting tool. 
