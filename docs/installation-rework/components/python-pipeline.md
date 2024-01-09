# Python Pipeline

To execute python scripts inside SeaTable you need to install the python pipeline. It is a python runtime environment that uses docker containers to execute your python script and return the output.
This manual explains how to install the python pipeline on your SeaTable server.

!!! Note "Installation on a separate machine"

    It is possible to install the python pipeline on a separate machine. Read this...

## Installation

#### 1. Change the .env file

To add the python pipeline, you have to tell docker, that the necessary docker images have to be downloaded and updated. You do this by adding `seatable-python-pipeline.yml` to the `COMPOSE_FILE` variable in your `.env` file.

```bash
nano /opt/seatable-compose/.env
```

Your COMPOSE_FILE variable should look something like this:

```bash
COMPOSE_FILE='caddy.yml,seatable-server.yml,python-pipeline.yml'
```

#### 2. Generate a shared secret for secure communication

SeaTable and the Python pipeline need a share secret to secure the connection and make sure that nobody else can use or access your python pipeline.
We recommend to use `pwgen` to generate a long and secure password. Execute this command to generate a password.

```bash
pw=$(pwgen -s 40 1) && echo "Generated shared secret: ${pw}"
```

#### 3. Update the configuration

This shared secret has to be added at two places to make it available in the python pipeline and SeaTable.

- `/opt/seatable-compose/.env`
- `/opt/seatable-server/seatable/conf/dtable_web_settings.py`

Execute the following command to add the shared secret to the `.env` file.

```bash
echo "# python-pipeline" >> /opt/seatable-compose/.env
echo "PYTHON_SCHEDULER_AUTH_TOKEN=${pw}" >> /opt/seatable-compose/.env
```

Now execute this command to add the required configuration to `dtable_web_settings.py`:

```bash
echo "SEATABLE_FAAS_URL = 'http://python-scheduler'" >> /opt/seatable-server/seatable/conf/dtable_web_settings.py
echo "SEATABLE_FAAS_AUTH_TOKEN = '${pw}'" >> /opt/seatable-server/seatable/conf/dtable_web_settings.py
```

#### 4. Start the Python Pipeline

Now it is time to start the python pipeline.

```bash
cd /opt/seatable-compose && \
docker compose up -d && \
docker compose restart seatable-server
```

#### 5. Check if the python pipeline is running

create a new base  
add a python script -> for example `print("Hello World!")`  
check the output -> expected output is: `Hello World!`

---

TODO: check what is really necessary from this point.
wie Logging sollte angeboten werden.

---

## Configuration

## Troubleshooting

####. Bring docker compose down and up again

Bring the compose project down then up again and start the seatable service to make sure every modification has taken effect.

```bash
cd /opt/seatable-compose && \
docker compose down && \
docker compose up -d
docker exec -d seatable /shared/seatable/scripts/seatable.sh start
```
