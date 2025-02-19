---
status: new
---

# Whiteboard (tldraw)

<!-- md:version 5.2 -->
<!-- md:flag enterprise -->

SeaTable's whiteboard plugin offers a versatile platform for capturing thoughts and data, independent of base data. This plugin utilizes the [tldraw SDK](https://tldraw.dev) and requires special installation steps, including server-side components for collaborative drawing.

![Whiteboard Plugin](../../assets/images/tldraw-plugin.png)

!!! warning "Action Required: Migrate to the New Whiteboard Plugin"

    Important: The original Whiteboard plugin (Excalidraw) is being deprecated and will be removed in version 5.3. To continue using whiteboards, migrate your drawings to the new Whiteboard plugin, which uses tldraw for improved collaboration.

## Installation Requirements

1. SeaTable Enterprise Edition installed and running
2. Firewall configured to allow traffic on port 6239
3. System admin to install both the whiteboard plugin and the tldraw worker (server component)

## tldraw-worker Installation

Follow these steps to deploy the tldraw worker on the same node as the seatable-server:

#### Update .env file

Like with all additional components you need to add `tldraw.yml` to the `COMPOSE_FILE` variable in your `.env` file.

Simply copy and paste (:material-content-copy:) the following code into your command line:

```bash
sed -i "s/COMPOSE_FILE='\(.*\)'/COMPOSE_FILE='\1,tldraw.yml'/" /opt/seatable-compose/.env
```

#### Launch the worker

Start the `tldraw-worker`:

```bash
cd /opt/seatable-compose && \
docker compose up -d
```

#### Verify Installation

After a few seconds, check `https://<your-seatable-url>:6239/ping`. You should see:

```
{"status":"pong"}
```

This confirms that the `tldraw-worker` is operational.

## Final Steps

With the server-side installation complete, you can now install the whiteboard plugin through the SeaTable interface and begin using this creative tool.
