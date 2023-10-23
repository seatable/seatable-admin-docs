## n8n on a one node seatable server
This guide shows how to activate n8n on a one node seatable server.

#### 1. Change the .env file

Add _seatable-n8n.yml_ to the COMPOSE_FILE variable.

```bash
nano /opt/seatable-compose/.env
```

Your COMPOSE_FILE variable should look something like this:
```bash
COMPOSE_FILE='seatable-docker-proxy.yml,seatable-server.yml,seatable-n8n.yml'
```
#### 2. Generate inital secrets

Generate inital secrets and write them into your .env file.

    echo "POSTGRES_PASSWORD=$(pwgen -s 40 1)" >> /opt/seatable-compose/.env
    echo "POSTGRES_NON_ROOT_PASSWORD=$(pwgen -s 40 1)" >> /opt/seatable-compose/.env

#### 3. Configure your n8n

Your n8n Container provides a Web UI to set up your n8n Admin User under _https://<your-seatable-server-hostname>:6231_.
