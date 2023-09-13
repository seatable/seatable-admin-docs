---
status: new
---

# Basic installation of a SeaTable Server

!!! danger "This installation method is not yet ready"

    We always try to make the installation of SeaTable as easy as possible. Therefore we will recommend in the near future the usage of caddy to simplify the complete SSL termination. Also we will introduce a global enviroment file for easier configuration. As soon as this new installation method is ready, we will update this manual accordingly.

The following manual describes the installation of a single-node SeaTable Server system. The description is valid for SeaTable **Enterprise Edition** and SeaTable **Developer Edition**.
The installation is done via the command line as `root` user.

We tried to make this installation method as easy as possible, that you can install SeaTable within minutes on any Ubuntu and Debian Server. Just follow the instruction carefully and you will be rewarded with your own SeaTable server in no time. If anything goes wrong, make a screenshot and create a post at the [SeaTable community forum](https://forum.seatable.io).

!!! warning "Docker is required"

    SeaTable uses `docker` and `docker compose` plugin. If your platform does not support Docker, you cannot install SeaTable Server.

!!! question "Want to see a video instead of reading a manual?"

    If you prefer watching a video, how to install and deploy SeaTable Server Enterprise Edition using docker in a step-by-step guide, check this out:

    :fontawesome-brands-youtube:{ style="color: #EE0F0F" }
    __[How to install SeaTable]__ :octicons-clock-24: 20m
    [How to install SeaTable]: https://www.youtube.com/watch?v=h38acdtYgt8

## Install basic tools

The following command installs basic tools that are used in the following manual. Usually all these tools are already installed on your linux server.

```bash
apt update
apt -y install curl pwgen tree wget
```

## Install Docker and Docker Compose Plugin

This step is only required if you don't have installed docker yet. Execute the following script to install `docker` and `docker compose` plugin. Otherwise refer to the [official installation documentation of docker](https://docs.docker.com/engine/install/) for your operating system.

```bash
curl -fsSL get.docker.com | bash
```

## Install SeaTable Server

This installation assumes that all components of SeaTable are installed below the folder `/opt`. Please keep the recommended folder structure to avoid problems.

### Create directory

=== "Both Editions"

    ```
    mkdir /opt/seatable-server
    cd /opt/seatable-server
    ```

### Download required files

Next step is to download the required files.

=== "Both editions"

    ```bash
    wget https://admin.seatable.io/downloads/docker-compose.yml
    wget https://admin.seatable.io/download/.env
    ```

### Change configuration file

!!! warning "Only change the `.env` file"

    In 99% of any cases there is no need to change anything in the docker-compose.yml at this point. Only use the `.env` file to configure your SeaTable Server.

Here is the content of the `.env` file with some explanations.

=== "Both editions"

    ``` python
    ## select the components to be installed
    COMPOSE_PROFILES='seatable-server' # (1)!

    ## seatable server
    SEATABLE_SERVER_HOSTNAME='seatable.example.com'  # (3)!
    SEATABLE_PATH='/opt/seatable-server' # (4)!
    TIME_ZONE='Europe/Berlin' # (2)!

    # database
    SEATABLE_MYSQL_ROOT_PASSWORD='topsecret' # (5)!

    ## image versions
    SEATABLE_IMAGE='seatable/seatable-enterprise:4.1.9'     # (6)!
    CADDY_RP_IMAGE='lucaslorentz/caddy-docker-proxy:2.8.4-alpine'
    SEATABLE_DB_IMAGE='mariadb:10.11'
    SEATABLE_MEMCACHED_IMAGE='memcached:1.5.6'
    SEATABLE_REDIS_IMAGE='redis:5.0.7'
    ```

    1.  COMPOSE_PROFILES is a comma separated list **without spaces**. It defines which components should be installed. Right now you can keep "seatable-server". Later more components will be added.
    2.  Get a [list of timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) from Wikipedia.
    3.  Select your domain or subdomain that points to your Server (without https://). You have to set an A-Record or CNAME pointing to your IP.
    4.  Only change the path if you are an experienced docker and linux admin.
    5.  Password of the mariadb root user.
    6.  To install a developer edition, change this line for example to:
        ```
        SEATABLE_IMAGE='seatable/seatable-developer:4.1.0
        ```

Now change the `.env` file according to your needs:

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

### Get a license

This step is only necessary, if you want to install SeaTable Enterprise Edition. You can skip this step if you install SeaTable Developer Edition.
**Please replace `email@example.com` with a valid email address of yours.**

```
curl https://get.seatable.io/license/email@example.com
```

Download the license to the current directory, like it is described in the email you just received.

!!! success "Three users for two year - just for free."

    You will receive a license for up to three users that is valid for two years. If you like SeaTable and want to buy a bigger license, please [contact us](https://seatable.io/kontakt/?lang=auto).

### Start the server

Just a short quality check. Execute the `tree` command and the output should look like this for your folder `/opt/seatable-server`:

=== "Enterprise Edition"

    ```
    tree -a /opt/seatable-server
    ├── docker-compose.yml
    ├── .env
    └── seatable-license.txt
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

Stop all containers, remove the folder `/opt/seatable-server` and start again.

**What if no no url is pointing to the SeaTable server?**

No problem. Just enter your local IP-Adress instead of the URL to the .env file.
