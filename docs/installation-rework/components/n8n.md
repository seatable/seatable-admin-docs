# Installation of the automation platform n8n

The installation of an automation plattform like n8n increases the power. Connect to other software solutions, gather logs or data from other tools.

## Installation

This guide shows how to install **n8n** on your SeaTable server.

#### 1. Change the .env file

Like with all additional components you first have to add the `n8n.yml` to the `COMPOSE_FILE` variable in your `.env` file.
First open the config file.

```bash
nano /opt/seatable-compose/.env
```

Now add n8n.yml to the `COMPOSE_FILE` variable. Don't remove anything and don't use :material-keyboard-space:!

```bash
COMPOSE_FILE='caddy.yml,seatable-server.yml,n8n.yml'
```

#### 2. Generate secrets for your postgres database

Generate inital secrets and write them into your .env file.

```
echo -e "\n# n8n" >> /opt/seatable-compose/.env
echo "POSTGRES_PASSWORD=$(pwgen -s 40 1)" >> /opt/seatable-compose/.env
echo "POSTGRES_NON_ROOT_PASSWORD=$(pwgen -s 40 1)" >> /opt/seatable-compose/.env
```

#### 3. Start n8n

```bash
cd /opt/seatable-compose && \
docker compose up -d
```

#### 4. Create initial admin user

Your n8n Container provides a Web UI to set up your n8n Admin User under `https://<your-seatable-server-hostname>:6231`.

![n8n Setup Page](/images/n8n-setup.png)

**Congratulations!** Your n8n server is ready to use.

!!! warning "SeaTable n8n node is outdated"

    n8n is shipped with an outdated SeaTable node. Therefore you should install the current version of the SeaTable node as a __community node__. [Read more →](https://forum.seatable.io/t/rework-of-n8n-seatable-integration/2745/10)

---

## Next steps

Check the docs of n8n at https://docs.n8n.io/. More details will follow soon.
