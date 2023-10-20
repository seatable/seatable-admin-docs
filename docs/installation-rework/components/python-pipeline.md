## Activate the python pipeline on a one node seatable server
This guide shows how to activate the python pipeline on a one node seatable server. If you are using a separate node to run the python-pipeline you have to account for the different hostnames and ports.

#### 1. Change the .env file

Add _seatable-python-pipeline.yml_ to the COMPOSE_FILE variable.

```bash
nano /opt/seatable-compose/.env
```

Your COMPOSE_FILE variable should look something like this:
```bash
COMPOSE_FILE='seatable-docker-proxy.yml,seatable-server.yml,seatable-python-pipeline.yml'
```
#### 2. Generate inital secret

Generate inital secrets and write them into your .env file.

    echo "SEATABLE_SCHEDULER_MYSQL_ROOT_PASSWORD=$(pwgen -s 40 1)" >> /opt/seatable-compose/.env

#### 3. Modify the .env Configuration File

On a one node system (Python-Pipeline and SeaTable Server are running on the same host, with the same url) you can use this commands to append the .env configuration file.  


```bash
source /opt/seatable-compose/.env && \
cat <<EOF >> /opt/seatable-compose/.env
SEATABLE_SCHEDULER_HOSTNAME='$SEATABLE_SERVER_HOSTNAME' # == seatable_server_hostname on a single-node system
EOF
```

#### 4. Start the Python Pipeline

Be aware that the SEATABLE_SCHEDULER_HOSTNAME variable has to be set in your .env before the first start of the container to generate all the configuration files correctly.  

```bash
cd /opt/seatable-compose && \
docker compose up -d && \
docker logs -f seatable-python-scheduler
```
If you see _"SeaTable FAAS Scheduler started"_ the scheduler was started successfully.  
You can return to a prompt with `CTRL + c`

#### 5.  Modify the Scheduler Configuration File

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

#### 6. Modify the dtable_web_settings.py Configuration File

Open SeaTable's `dtable_web_setttings.py` configuration file in a text editor to add the FAAS Scheduler's address:

```bash
nano /opt/seatable-server/seatable/conf/dtable_web_settings.py
```

Paste the following lines in the configuration file, paste the token from the `seatable_faas_scheduler_settings.py` and modify the parameter SEATABLE_FAAS_URL:

```py
# for seatable-faas
SEATABLE_FAAS_AUTH_TOKEN = '***' # add line and set / Token from seatable_faas_scheduler_settings.py
SEATABLE_FAAS_URL = 'https://<your-seatable-hostname>:12011' # add line and set / URL of the SeaTable FAAS Scheduler
```

#### 7. Bring docker compose down and up again

Bring the compose project down then up again and start the seatable service to make sure every modification has taken effect.

```bash
cd /opt/seatable-compose && \
docker compose down && \
docker compose up -d
docker exec -d seatable /shared/seatable/scripts/seatable.sh start
```

#### 8. Check if the python pipeline is running

create a new base  
add a python script -> for example `print("Hello World!")`  
check the output  -> expected output is: `Hello World!`
