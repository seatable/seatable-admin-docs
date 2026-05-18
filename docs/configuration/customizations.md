---
description: Customize the configuration of your SeaTable installation while ensuring that version upgrades stay seamless
---

# Customizations

This page describes how administrators can customize the configuration of a given SeaTable installation while ensuring that future upgrades stay seamless.

## Context

The `.yml` files included in the artifact that is downloaded during the installation process already contain `environment:` blocks for the most important configuration settings.
These are listed [here](./overview.md#list-of-available-environment-variables).

If you need to modify any of these settings, it is sufficient to set/modify these variables directly inside your `.env` file.
There's no need to modify the `.yml` files in order to adjust these settings.

The `.yml` files included in the release artifact should **never** be modified since any changes made will be overwritten when following the [upgrade guide](../upgrade/upgrade-manual.md).
This is caused by the fact that the `.yml` files in your `/opt/seatable-compose` directory are essentially replaced by the `.yml` files from the release artifact of the SeaTable version that you're upgrading to.

## Mechanism

In order to configure additional settings that are not listed on the [overview page](./overview.md#list-of-available-environment-variables), you can (and should) create an additional `custom-seatable-server.yml` file that only contains the customizations that are relevant to your installation.
This has numerous benefits:

- This file is not overwritten during the upgrade process
- You do not introduce redundancy (i.e. that would be caused by copying the existing `seatable-server.yml` with all of its configuration settings)
- All of the customizations made are easily visible inside a single file

Simply follow the steps below:

### Step 1

Create `custom-seatable-server.yml` inside `/opt/seatable-compose` on the host.

The most minimal version of this file looks like this:

```yaml
services:
    seatable-server:
```

### Step 2

Add `custom-seatable-server.yml` to the `COMPOSE_FILE` variable inside your `.env` file.

**Example:**

A minimal SeaTable installation contains the following line inside the `.env` file (located at `/opt/seatable-compose/.env`):

```ini
COMPOSE_FILE='caddy.yml,seatable-server.yml'
```

Now simpli add `custom-seatable-server.yml` to the list of filenames that should be merged by Docker Compose.
Additional filenames should be separated by a comma.

```ini
COMPOSE_FILE='caddy.yml,seatable-server.yml,custom-seatable-server.yml'
```

### Step 3

Apply the changes by running the following command inside a terminal:

```bash
cd /opt/seatable-compose
docker compose up -d
```

Docker Compose will merge all of the files specified inside the `COMPOSE_FILE` variable and restart all services whose configuration has changed.
This has an additional advantage: If a service's definition has not changed, it won't be unnecessarily restarted.

## Examples

### Adding an Environment Variable

If you need to configure an additional environment variable that is not included in `seatable-server.yml` by default, you can achieve this by adding the following block inside `custom-seatable-server.yml`:

```yaml
services:
  seatable-server:
    environment:
      - API_GATEWAY_BASE_API_LIMIT_PER_MINUTE=1000
```

### Adding a Volume Mount

If you need to mount an additional file/directory (e.g. a custom NGINX config file) into the `seatable-server` container, you can achieve this by adding the following block inside `custom-seatable-server.yml`:

```yaml
services:
  seatable-server:
    volumes:
      - ./custom-seatable-nginx.conf:/etc/nginx/sites-enabled/default
```

## Troubleshooting

If the merging does not work as expected, you can use `docker compose config` to print the result of the internal merging to the console.
Since this can cause quite a lot of output depending on the number of installed components, you can dump this into a file instead and open this inside a text editor:

```bash
docker compose config > /tmp/seatable-compose-config.yml
```

**Note:** `/tmp/seatable-compose-config.yml` will contain secret values since the `docker compose config` command prints the result of the configuration merging algorithm **after** all variables have been interpolated.

## Additional Resources

You can read more about the way multiple configuration files are merged together in the [Compose file reference](https://docs.docker.com/reference/compose-file/merge/).

