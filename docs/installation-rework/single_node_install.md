---
status: new
---

# Basic installation of a SeaTable Server

!!! danger "PREVIEW / This installation method is not yet ready for production"

    We always try to make the installation of SeaTable as easy as possible. Therefore we will recommend in the near future the usage of caddy to simplify the complete SSL termination. Also we will introduce a global enviroment file for easier configuration. As soon as this new installation method is ready, we will update this manual accordingly.

#### This manual describes the installation of a SeaTable Server on a Linux OS using Docker.

We want to provide you an easy and fast installation method, that will lead to a up and runnning SeaTable system within minutes.
The description is valid for SeaTable **Enterprise Edition** and SeaTable **Developer Edition**.
If you come across a problem or somthing is unclear please create a post at the [SeaTable community forum](https://forum.seatable.io).
We are happy to help and will improve this manual if needed.

!!! warning "Docker required"

    SeaTable uses `docker` and `docker compose` plugin. If Docker is not supported by your platform, you cannot install SeaTable Server with this manual.

!!! question "Want to watch a step-by-step video instead of reading a manual?"

    :fontawesome-brands-youtube:{ style="color: #EE0F0F" }
    __[How to install SeaTable]__ :octicons-clock-24: 20m
    [How to install SeaTable]: https://www.youtube.com/watch?v=h38acdtYgt8


The installation is done via the command line as `root` user.


## Install basic tools
The following command installs basic tools that are used in the following manual. Usually all these tools are already installed on your linux server.

```bash
apt update && \
apt -y install curl pwgen tree wget tar
```

## Install Docker and Docker Compose Plugin
 If you are in a testing enviroment you can use this get.docker.com convenience script to install docker and docker compose.
 In a production enviroment or otherwise please refer to the [official installation instructions of docker](https://docs.docker.com/engine/install/).

```bash
curl -fsSL get.docker.com | bash
```

## Install SeaTable Server
This installation assumes that all components of SeaTable are installed below `/opt`.
We recommended to keep this folder structure.

#### 1. Create directory & Download required files & Copy .env file
    mkdir /opt/seatable-compose && \
    cd /opt/seatable-compose && \
    wget -c https://github.com/seatable/seatable-compose/releases/latest/download/seatable-compose.tar.gz \
    -O - | tar -xz -C /opt/seatable-compose && \
    cp -n .env-release .env

#### 2. Change .env file (Enviroment Configuration file)

    nano /opt/seatable-compose/.env

!!! warning "Only modify the `.env` file"

    In most cases there should be no need to change anything in the compose.yml files.



=== "Both editions"

    ``` python
    ## Here is the content of the `.env` file with some explanations.

    ## select the components to be installed
    COMPOSE_FILE='seatable-docker-proxy.yml,seatable-server.yml' # (1)!

    ## seatable server
    SEATABLE_SERVER_HOSTNAME='seatable.example.com'  # (3)!
    SEATABLE_PATH='/opt/seatable-server' # (4)!
    TIME_ZONE='Europe/Berlin' # (2)!

    # database
    SEATABLE_MYSQL_ROOT_PASSWORD='topsecret' # (5)!

    ## image versions
    ## SEATABLE_IMAGE='seatable/seatable-developer:4.1.9'
    # (6)!
    ```

    1.  COMPOSE_FILE is a comma separated list **without spaces**. It defines which components should be run. `seatable-docker-proxy.yml` and `seatable-server.yml` are a typical combination for a base system.
    2.  Get a [list of timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) from Wikipedia.
    3.  Select your domain or subdomain that points to your Server (without https://). You have to set an A-Record or CNAME pointing to your IP.
    4.  Only change the path if you are an experienced docker and linux admin.
    5.  Password of the mariadb root user.
    6.  To install a developer edition, uncomment this line

    Change the `.env` file according to your needs.

=== "Hostname"

    Replace `SEATABLE_SERVER_HOSTNAME` with the url you would like to use for your SeaTable Server.

=== "Database password"

    You can either change this password manually or you just execute the following command to set a new random password with 40 chars.

    ```
    sed -i "s/SEATABLE_MYSQL_ROOT_PASSWORD=.*/SEATABLE_MYSQL_ROOT_PASSWORD='$(pwgen -s 40 1)'/" .env
    ```

=== "Timezone"

    Change `TIME_ZONE` according to your location. You can get a [list of timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) from Wikipedia. Use the value from the table column *TZ identifier*.

=== "Seatable Edition"

    `SEATABLE_IMAGE` value determines if you install SeaTable Enterprise or SeaTable Developer Edition. You can find the available images at docker hub:

    - [SeaTable Enterprise Edition at Docker Hub](https://hub.docker.com/r/seatable/seatable-enterprise/tags)
    - [SeaTable Developer Edition at Docker Hub](https://hub.docker.com/r/seatable/seatable-developer/tags)

#### 4. Get a license

This step is only necessary, if you want to install SeaTable Enterprise Edition. You can skip this step if you install SeaTable Developer Edition.  
**Please replace `email@example.com` with a valid email address of yours.**

```
curl https://get.seatable.io/license/email@example.com
```

Download the license to the current directory, like it is described in the email you just received.

!!! success "Three users, two years - for free."

    You will receive a license for up to three users which is valid for two years.  
    If you like SeaTable and want to buy a bigger license, please [contact us](https://seatable.io/kontakt/?lang=auto).

#### 5. Start the server

Run`tree -a /opt/seatable-compose`, the output should look something like this:

=== "Enterprise Edition"

    ```
    /opt/seatable-compose
    ├── .env
    ├── .env-release
    ├── seatable-docker-proxy.yml
    ├── seatable-licence.txt
    ├── seatable-onlyoffice.yml
    ├── seatable-python-pipeline.yml
    └── seatable-server.yml

    ```

=== "Developer Editions"

    ```
    tree -a /opt/seatable-server
    ├── docker-compose.yml
    ├── .env
    ```

If everything is in place, execute the following command to download and start the docker images for the first time.

```bash
docker compose up
```

Wait for a while. When you see `This is an idle script (infinite loop) to keep container running.` in the output log, the database has been initialized successfully. Press keyboard `CTRL + C` (Windows) or `Control + C` (Mac) to return to the prompt.

Currently the configuration files are created with `http:` instead of `https:`. This could be fixed with the following command:

```
source .env
sed -i 's|http://${SEATABLE_SERVER_HOSTNAME}|https://{SEATABLE_SERVER_HOSTNAME}|g' /opt/seatable-server/seatable-data/seatable/conf/dtable_web_settings.py
```

Now it is time to run `docker compose` again. This time in detached mode:

```bash
docker compose up -d
```

## Start SeaTable and create the initial superuser

After the first start it is still necessary to create an initial admin user and to start the SeaTable Server. In an upcoming version these steps will not be necessary anymore.

```bash
docker exec -d seatable /shared/seatable/scripts/seatable.sh start
docker exec -it seatable /shared/seatable/scripts/seatable.sh superuser
```

!!! Tip "Docker parameters"

    The first command uses the option `-d` which starts the service in the background. The second command uses the option `-it` which runs the command in interactive mode.

Enter the email address and the initial password of the admin user. `Superuser created successfully` confirms that the admin user has been created.

You can now access SeaTable at the host name specified in the `.env` file.

!!! success "Automatic SSL Termination"

    This setup uses the webserver caddy as main webserver. caddy makes the installation super convenient because it automatically gets a let's encrypt zertificate if the URL you are accessing is publically available.
    Also caddy takes care of the autorenewal of the certificate. Easy, right?

## FAQ's

**If, for whatever reason, the installation fails, how do I to start from a clean slate again?**

Stop all containers, remove the folder `/opt/seatable-compose` and start again.

**What if no url is pointing to the SeaTable server?**

No problem. Just enter your local IP-Adress instead of the URL into the .env file.
