---
status: new
---

# Basic installation of a SeaTable Server

!!! danger "PREVIEW / This installation method is not yet ready for production"

    We always try to make the installation of SeaTable as easy as possible. Therefore we will recommend in the near future the usage of caddy to simplify the complete SSL termination. Also we will introduce a global enviroment file for easier configuration. As soon as this new installation method is ready, we will update this manual accordingly. => Blog-Post.

This manual describes the installation of a SeaTable Server (Enterprise and Developer Edition) on a Linux OS using Docker.

We want to provide an easy installation method, that will lead to an up and runnning SeaTable system accessible via https:// within minutes. These steps where tested on **Debian** and **Ubuntu** based Systems, but other linux server systems should work too. The installation is done via the command line as `root` user.

Before you start, please make sure that you read the requirements (move that to another separate article):

- Server architecture has to be x86/x64. ARM or others are currently not supported.
- Min. 2 CPU / 8 GB RAM / 40 GB SSD
- Platform has to support docker with `docker compose` plugin. If Docker is not supported by your platform, you cannot install SeaTable Server with this manual.
- Domain pointing to your server with open ports 80 and 443

!!! tip "Want to watch a step-by-step video instead of reading a manual?"

    :fontawesome-brands-youtube:{ style="color: #EE0F0F" }
    __[How to install SeaTable]__ :octicons-clock-24: 20m
    [How to install SeaTable]: https://www.youtube.com/watch?v=h38acdtYgt8

## Install basic tools

The following command installs basic tools that are used in the following manual. Usually all these tools are already installed on your linux server.

```bash
apt update && \
apt -y install curl pwgen tree wget tar nano
```

## Install Docker and Docker Compose Plugin

At [get.docker.com](https://get.docker.com), you'll find a script designed for the easy and convenient installation of the Docker Engine. While the script isn't recommended for production environments, it has shown no issues in our observations. You can effortlessly install Docker using this single command:

```bash
curl -fsSL get.docker.com | bash
```

Alternatively, you can opt to follow [Docker's official installation instructions](https://docs.docker.com/engine/install/)

## Install SeaTable Server

This installation assumes that all SeaTable components are installed under `/opt`.
We highly recommended to keep this folder structure. All articles in the manual assume SeaTable's installation in this directory.

#### 1. Create basic structure

Simply copy and paste the following command into your command line to execute.

```bash
mkdir /opt/seatable-compose && \
cd /opt/seatable-compose && \
wget -c https://github.com/seatable/seatable-release/releases/latest/download/seatable-compose.tar.gz \
-O - | tar -xz -C /opt/seatable-compose && \
cp -n .env-release .env
```

#### 2. Change .env file

Proceed with setting up your SeaTable Server by configuring its basic settings within an `.env` file (=enviroment configuration). The basic setup involves configuring just a few variables.

!!! warning "Modify only the `.env` file"

    Generally, there's no need to make any changes to the compose.yml files in most cases. Adjustments should be made only by experienced Docker administrators.

You have the flexibility to use an editor of your choice, such as `vim`, instead of `nano`.

```bash
nano /opt/seatable-compose/.env
```

=== "SeaTable Enterprise Edition"

    ``` python
    ## select the components to be installed
    COMPOSE_FILE='caddy.yml,seatable-server.yml' # (1)!

    ## seatable server
    SEATABLE_SERVER_HOSTNAME='seatable.example.com'  # (3)!
    SEATABLE_SERVER_PROTOCOL='https' # (4)!

    SEATABLE_ADMIN_EMAIL=''
    SEATABLE_ADMIN_PASSWORD=

    TIME_ZONE='Europe/Berlin' # (2)!
    ```

    1.  COMPOSE_FILE is a comma separated list **without spaces**. It defines which components should be run. `caddy.yml` and `seatable-server.yml` are a typical combination for a base system.
    2.  Get a [list of timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) from Wikipedia.
    3.  Select your domain or subdomain that points to your Server (without https://). You have to set an A-Record or CNAME pointing to your IP.
    4.  There is no reason not to use HTTPS here.

=== "SeaTable Developer Edition"

    To install the SeaTable Developer Edition, replace the Docker image used and add the following parameter to your .env file. **Everything else remains identical to the SeaTable Enterprise Edition.**

    ``` python
    SEATABLE_IMAGE='seatable/seatable-developer:latest'

    ```

#### 3. Generate inital secrets

We utilize `pwgen` to create robust, secure passwords for your admin account and the database root password. Use the following commands to generate these passwords and automatically include them in the `.env'` file. Alternatively, you can manually add your own passwords.

    sed -i "s/^SEATABLE_ADMIN_PASSWORD=.*/SEATABLE_ADMIN_PASSWORD=$(pwgen 40 1)/" .env
    sed -i "s/^SEATABLE_MYSQL_ROOT_PASSWORD=.*/SEATABLE_MYSQL_ROOT_PASSWORD=$(pwgen 40 1)/" .env

#### 4. Get a license

!!! tip "SeaTable Enterprise requires a license to start"

    This step is solely required for SeaTable Enterprise Edition installation. You can bypass this step for **SeaTable Developer Edition**.

!!! success "Three users, two years - for free."

    SeaTable use for up to three users is free, with each license valid for two years. You can generate a new license at any time. If you enjoy SeaTable and are contemplating a larger license, [please get in touch with us](https://seatable.io/kontakt/?lang=auto).

We've streamlined the process to request a complimentary enterprise license for three users, valid for two years, completely free of charge. After two years, you can request a new license with another two-year validity.

Run the following command, replacing `your-email@example.com` with your valid email address. Shortly after, you'll receive an email with instructions to download your license to the current directory

```
curl https://get.seatable.io/license/your-email@example.com
```

#### 5. Fire up the server

To confirm the setup, use the command `tree -a /opt/setable-compose`. The expected output should appear as follows.

    /opt/seatable-compose
    ├── .env
    ├── .env-release
    ├── seatable-docker-proxy.yml
    ├── seatable-licence.txt
    ├── seatable-onlyoffice.yml
    ├── seatable-python-pipeline.yml
    └── seatable-server.yml

If everything is set up correctly, run the following command to download and initiate the docker images for the initial setup. This process will require some time.

```bash
docker compose up -d
```

If the process completed successfully, you can now open your web browser and access SeaTable using the URL you specified in your `.env` file.
Sign in using the credentials you provided in the same file.

:material-party-popper: Congratulations!

You've completed the basic setup of your SeaTable Server.

## Next steps

Your SeaTable journey has just begun! While you can dive straight into SeaTable, creating bases, adding users, utilizing the API, and more, there's an array of possibilities to explore. Here are a few examples:

- Expand functionality by installing additional components like the **Python Pipeline** or **n8n**.
- Configure your server to enable **email notifications**, **templates**, or **Single Sign-On (SSO)**.
- For troubleshooting or queries during installation, refer to the **FAQ section** for assistance.

This manual covers a range of topics, from **advanced cluster installations** to detailed **configuration options**. Take your time to explore these possibilities. If you can't find what you need or require assistance, consider posting in the community forum.

Encounter an issue or need clarity? Feel free to create a post on the [SeaTable community forum](https://forum.seatable.io). We're here to assist and improve this manual based on your feedback.
