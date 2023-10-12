## Activate the python pipeline on a one node seatable server

#### 1. Change the .env file

Add `seatable-python-pipeline.yml` to the COMPOSE_FILE variable.

```bash
nano /opt/seatable-compose/.env
```

Your .env should look something like this:
```bash
COMPOSE_FILE='seatable-docker-proxy.yml,seatable-server.yml,seatable-python-pipeline.yml'
```

#### 2. Make configuration changes

- Change the dtable_web_settings.py
- Add the /opt/seatable-python-scheduler/shared/seatable-faas-scheduler/conf/seatable_faas_scheduler_settings.py


#### 3. Bring docker compose down and up again

We recommend bringing all containers down and up again to make sure everything is loaded correctly.

```bash
cd /opt/seatable-compose && /
docker compose down && /
docker compose up -d
```

#### 4. Check if the python pipeline is running

**placeholder / maybe another page ?**

make new base
add script (our testscript?)
check output