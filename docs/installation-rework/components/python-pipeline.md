## Activate the python pipeline on a one node seatable server
This guide shows how to activate the python pipeline on a one node seatable server. If you are using a separate node to run the python-pipeline you have to account for the different hostnames and ports.

### 1. Change the .env file

Add `seatable-python-pipeline.yml` to the COMPOSE_FILE variable.

```bash
nano /opt/seatable-compose/.env
```

Your .env should look something like this:
```bash
COMPOSE_FILE='seatable-docker-proxy.yml,seatable-server.yml,seatable-python-pipeline.yml'
```

### 2. Generate inital secret

    echo "SEATABLE_SCHEDULER_MYSQL_ROOT_PASSWORD=$(pwgen -s 40 1)" >> /opt/seatable-compose/.env

### 3. Make configuration changes

You can use this commands to source the variables from your .env file, and append the configuration to the files. Be aware that the SEATABLE_SERVER_HOSTNAME variable has to be set before the first start of the container to generate all the configuration files correctly.

```bash
source /opt/seatable-compose/.env && \
cat <<EOF >> /opt/seatable-compose/.env
SEATABLE_SCHEDULER_HOSTNAME='$SEATABLE_SERVER_HOSTNAME' # == seatable_server_hostname on a single-node system
EOF
```
`docker compose up -d && docker logs -f seatable-python-scheduler` to check if the scheduler is running

#### Modifying the Configuration File of the FAAS Scheduler

```bash
cd /opt/seatable-python-scheduler/shared/seatable-faas-scheduler/conf && \
nano seatable_faas_scheduler_settings.py

```

Edit the configuration as follows:

```py
# faas
FAAS_URL = '' # keep empty / Old parameter name for internal address of the Python Runner, is kept for compatability reasons
RUNNER_URL = 'http://seatable-python-starter:8080' # set / Internal address of the Python Starter
# seatable
DTABLE_WEB_SERVICE_URL = 'https://<your-seatable-hostname>'  # set / URL of SeaTable server
SEATABLE_FAAS_AUTH_TOKEN = '***'                       # copy / Token to copy to SeaTable's configuration file

```

#### Modifying the Configuration File of SeaTable

Open SeaTable's `dtable_web_setttings.py` configuration file in a text editor to add the FAAS Scheduler's address:

```bash
nano /opt/seatable-server/seatable/conf/dtable_web_settings.py
```

Paste the following lines in the configuration file, paste the token from the `seatable_faas_scheduler_settings.py` and modify the parameter SEATABLE_FAAS_URL:

```py
# for seatable-faas
SEATABLE_FAAS_AUTH_TOKEN = '***'                        # add line and set / Token from seatable_faas_scheduler_settings.py
SEATABLE_FAAS_URL = 'https://<your-seatable-hostname>:12011' # add line and set / URL of the SeaTable FAAS Scheduler
```

### Restarting SeaTable

For the modifications in the `dtable_web_settings.py` to take effect, restart the SeaTable server:

```bash
docker exec -d seatable /shared/seatable/scripts/seatable.sh restart
```

```bash
source /opt/seatable-compose/.env && \
cat <<EOF >> /opt/seatable-server/seatable/conf/dtable_web_settings.py

# Python Pipeline
SEATABLE_FAAS_AUTH_TOKEN = ''
SEATABLE_FAAS_URL = 'https://$SEATABLE_SERVER_HOSTNAME:12011' # URL of the SeaTable Python Pipeline Scheduler
EOF
```

#### 3. Bring docker compose down and up again

We recommend bringing all containers down and up again to make sure everything is loaded correctly.

```bash
cd /opt/seatable-compose && /
docker compose down && /
docker compose up -d
```

#### 4. Bring the SeaTable Service up

```
docker exec -d seatable /shared/seatable/scripts/seatable.sh start
```

#### 5. Check if the python pipeline is running

**placeholder / maybe another page ?**

make new base
add script (our testscript?)
check output