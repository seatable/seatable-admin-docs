# Deploy SeaTable Python Runner with Docker

## Architecture

Python scripts operation in SeaTable contains multiple parts, such as SeaTable, Python Runner, SeaTable FAAS Scheduler, etc. Their functions and relationships are as follows

* SeaTable: create/save/modify scripts, initiate running requests, etc.
* SeaTable FAAS Scheduler: the scheduler is mainly responsible for scheduling the requests for running script from SeaTable, arranging timed tasks, save and count the results of script running. Equivalent to a master node.
* Python Runner: actually runs the scripts. It is equivalent to a worker node. After Python Runner receives a script execution request, it will download the script content and start a docker container to run the script. After the script completed, the container is automatically destroyed to ensure safety.

Python Runner and SeaTable FAAS Scheduler can be deployed to the same machine, the structure diagram is as follows

![python-runner](../../images/auto-upload/python-runner.png)

If you need to run a large number of Python scripts, you can deploy more Python Runners and arrange a load balance component before them. The structure diagram is as follows

![python-runner-cluster](../../images/auto-upload/python-runner-cluster.png)

## Deploy Python Runner

The default directory for Python Runner is `/opt/seatable-python-runner`. The directory structure is as follows

``` text
/opt/seatable-python-runner
├── logs                     （log files）
├── conf                     （configuration files）
├── init.sh                  （init script）
├── start.sh                 （startup script）
├── stop.sh                  （shutdown script）
└── Other code files

```

### Download package

The service of Python Runner needs to run directly on the host, so you need to download it manually [releases](https://github.com/seatable/seatable-admin-docs/releases), unzip and enter the project directory:

``` bash
unzip seatable-python-runner-1.x.x.zip -d /opt && cd /opt/seatable-python-runner
```

### Installation dependencies

``` bash
sudo pip3 install -r server_requirements.txt
```

### Download Python Runner image

``` bash
docker pull seatable/python-runner:latest
```

You can find all versions of SeaTable Python Runner images in the [Docker repository](https://hub.docker.com/r/seatable/python-runner/tags).

### Initialize the service

``` bash
sudo ./init.sh
```

### Modify the configuration file

``` bash
vim conf/seatable_python_runner_settings.py
```

Edit the configuration as follows

``` py
SCHEDULER_URL = 'https://demo.faas-scheduler.seatable.com'  # The URL of seatable-faas-scheduler, if you use an IP address, please add http://
```

### More configuration options

#### uwsgi configuration

Python runner uses uwsgi to run, please edit in a way that meets your work needs

``` bash
vim conf/seatable_python_runner.ini
```

The default configuration as follows

``` ini
[uwsgi]
http = :8080  （port）
process = 4   （processes）
threads = 2   （threads）
```

### Star Python Runner

``` bash
sudo ./start.sh
```

### Shutdown

``` bash
sudo ./stop.sh
```

The startup/shutdown script is a collection of a series of operations, you can edit it again according to your needs.

## Deploy SeaTable FAAS Scheduler by Docker

The default directory for Scheduler is `/opt/seatable-faas-scheduler`. Create the directory:

``` bash
mkdir /opt/seatable-faas-scheduler

```

The directory structure is as follows

``` text
/opt/seatable-faas-scheduler
├── docker-compose.yml
├── shared
│   ├── seatable-faas-scheduler
│   │   ├── conf     （配置文件）
│   │   ├── scripts  （脚本文件）
│   │   └── logs     （日志文件）
│   ├── nginx-logs   （Nginx 日志）
│   └── ssl          （SSL 证书）
└── mysql-data       （数据库持久化目录）

```

### Install Docker-compose

Scheduler uses docker-compose. Install the docker-compose package:

```bash
# for CentOS
yum install docker-compose -y

# for Ubuntu
apt-get install docker-compose -y

```

### Download the Scheduler Image

``` bash
docker pull seatable/seatable-faas-scheduler:latest
```

You can find all versions of SeaTable FAAS Scheduler images in the [Docker repository](https://hub.docker.com/r/seatable/seatable-faas-scheduler/tags).

### Download and Modify docker-compose.yml

Download the [docker-compose.yml](./docker-compose.yml) sample file to `/opt/seatable-faas-scheduler`, and modify the file to fit your environment and settings. The following fields must be modified:

* The password of MariaDB root (MYSQL_ROOT_PASSWORD and DB_ROOT_PASSWD)
* The volume directory of MariaDB data (volumes)
* The volume directory of SeaTable FAAS Scheduler data (volumes)
* The host name (SEATABLE_FAAS_SCHEDULER_SERVER_HOSTNAME)
* The time zone (Optional)

### Initialize Database

Initialize database with the following command:

``` bash
docker-compose up

```

**NOTE: You should run the above command in a directory with the**`docker-compose.yml`**.**

Wait for a while. When you see `This is a idle script (infinite loop) to keep container running.`  in the output log, the database initialized successfully.

Press keyboard `Control + C`  to finish this step.

### Modify the configuration file of Scheduler

``` bash
vim /path to the volume directory of SeaTable FAAS Scheduler/seatable-faas-scheduler/conf/seatable_faas_scheduler_settings.py
```

Edit the configuration as follows

``` py
DTABLE_WEB_SERVICE_URL = 'https://demo.seatable.com'  # SeaTable URL

FAAS_URL = 'https://demo.faas.seatable.com'  # Python Runner URL
# If the Python runner and SeaTable FAAS Scheduler are running on the same host, Then it needs to be configured as 'http://host.docker.internal:8080'(Can not be 'http://localhost:8080'), or 'http://<intranet address>:port'

SEATABLE_FAAS_AUTH_TOKEN = '***'  # Only copy this configuration item to modify the SeaTable configuration file
```

### Modify the configuration file of SeaTable

``` bash
vim /path to the volume directory of SeaTable/seatable/conf/dtable_web_settings.py  
```

Edit the configuration as follows

``` py
SEATABLE_FAAS_URL = '***'  # seatable-faas-scheduler URL
SEATABLE_FAAS_AUTH_TOKEN = '***'  # same as the item in seatable_faas_scheduler_settings.py
```

### Start Scheduler

``` bash
docker-compose up -d
```

### Restart SeaTable Server

``` bash
docker exec -d seatable /shared/seatable/scripts/seatable.sh restart
```

Next, you can test the Python Runner through SeaTable web page.

### Scheduler More Configuration Options

#### Deploy the https

* Let's encrypt SSL certificate

  If you set `SEATABLE_FAAS_SCHEDULER_SERVER_LETSENCRYPT` to `true` in "docker-compose.yml", the container would request a letsencrypt-signed SSL certificate for you automatically.

  e.g.

  ``` yml
  seatable-faas-scheduler:
    ...
    ports:
      - "80:80"
      - "443:443"
      ...
    environment:
      ...
      - SEATABLE_FAAS_SCHEDULER_SERVER_LETSENCRYPT=True  # Default is False. Whether to use let's encrypt certificate.
      - SEATABLE_FAAS_SCHEDULER_SERVER_HOSTNAME=demo.faas-scheduler.seatable.com  # Specifies your host name if https is enabled
  ```

  **Note**：Since the nginx configuration file is only generated automatically when you run the container for the first time, you'd better set `SEATABLE_FAAS_SCHEDULER_SERVER_HOSTNAME = True` before executing the `docker-compose up -d` command for the first time.

If you want to use your own SSL certificate, you can refer to the following steps.

* Add your own SSL certificate
  1. Upload the SSL certificate file to the SeaTable FAAS Scheduler data directory : `/Your SeaTable FAAS Scheduler data volume/ssl/`
  2. Modify the nginx configuration file : `/Your SeaTable FAAS Scheduler data volume/seatable-faas-scheduler/conf/nginx.conf`
  3. Reload the Nginx configuration file：`docker exec -it seatable-faas-scheduler /usr/sbin/nginx -s reload`

  e.g.

  ``` nginx
  server {
      if ($host = demo.faas-scheduler.seatable.com) {
          return 301 https://$host$request_uri;
      }
      listen 80;
      server_name demo.faas-scheduler.seatable.com;
      return 404;
  }

  server {
      server_name demo.faas-scheduler.seatable.com;

      listen 443 ssl;
      ssl_certificate /shared/ssl/<your-ssl.cer>;
      ssl_certificate_key /shared/ssl/<your-ssl.key>;

      proxy_set_header X-Forwarded-For $remote_addr;
      ......
  ```

### Scheduler FAQ

**If for some reasons, the installation failed, how to start from clean state again?**

Just remove the directory `/opt/seatable-faas-scheduler` and start again.

**LetsEncrypt SSL certificate is about to expire.**

If the certificate is not renewed automatically, you can execute the command `/scripts/renew_cert.sh` to manually renew the certificate.
