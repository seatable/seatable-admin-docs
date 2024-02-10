# Single-Node installation of a SeaTable Server

Alright, let's dive in. This article will guide you through the process of installing a basic SeaTable server with a Caddy web server. By the end of this article, your new SeaTable server will be accessible via HTTPS with your custom domain. To begin, open a root shell on your server.

!!! tip "Want to watch a step-by-step video instead of reading a manual?"

    Watch a brief English video demonstrating all the essential steps:

    :fontawesome-brands-youtube:{ style="color: #EE0F0F" }
    __[How to install SeaTable within minutes]__ :octicons-clock-24: 10m
    [How to install SeaTable within minutes]: https://www.youtube.com/watch?v=VJNcZK1BLHY

!!! success "Installation made easy"

    Most commands that are required to install a SeaTable Server are provided in a way, that you can just simply copy and paste the commands into your command line. Use the (:material-content-copy:) icon at the top-right of the code boxes.

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

Simply copy and paste the following command into your command line to execute. This code will download the latest yml files from repository [:simple-github: seatable-release](https://github.com/seatable/seatable-release).

```bash
mkdir /opt/seatable-compose && \
cd /opt/seatable-compose && \
wget -c https://github.com/seatable/seatable-release/releases/latest/download/seatable-compose.tar.gz \
-O - | tar -xz -C /opt/seatable-compose && \
cp -n .env-release .env
```

To get an overview of the downloaded files, use the `tree` command.

```bash
tree -a /opt/seatable-compose
```

The expected output should appear as follows.

```bash
# this should be the output of the tree command...
/opt/seatable-compose
├── caddy.yml
├── collabora.yml
├── .env
├── .env-release
├── n8n-init-data.sh
├── n8n.yml
├── onlyoffice.yml
├── python-pipeline.yml
├── seatable-server.yml
├── uptime-kuma.yml
└── zabbix.yml
```

!!! warning "Don't change these yml files"

    Generally, there's no need to make changes to the different .yml files in most cases. Adjustments should be made only by experienced Docker administrators and then you should create a copy and rename the file.

    ```bash
    # Example to create a custom copy:
    cp n8n.yml custom-n8n.yml
    ```

#### 2. Generate some secrets

SeaTable is configured with the hidden `.env` file (=enviroment configuration file) that is stored in the folder `/opt/seatable-compose`.

We utilize `pwgen` to create secure passwords for your _admin account_ and the _database root password_. The following commands will generate such passwords and include them in the `.env'` file.

    sed -i "s/^SEATABLE_ADMIN_PASSWORD=.*/SEATABLE_ADMIN_PASSWORD=$(pwgen 40 1)/" .env
    sed -i "s/^SEATABLE_MYSQL_ROOT_PASSWORD=.*/SEATABLE_MYSQL_ROOT_PASSWORD=$(pwgen 40 1)/" .env

Alternatively, you can manually add your own passwords.

#### 3. Complete settings in the .env file

Open the `.env` file with the editor of your choice, like `nano` or `vim`.

```bash
nano /opt/seatable-compose/.env
```

Continue setting up your SeaTable server by adjusting only three more variables. These are:

- TIME_ZONE
- SEATABLE_SERVER_HOSTNAME
- SEATABLE_ADMIN_EMAIL

=== "`.env` for SeaTable Enterprise Edition"

    ``` python
    # components to be used
    COMPOSE_FILE='caddy.yml,seatable-server.yml' # (1)!
    COMPOSE_PATH_SEPARATOR=','

    # system settings
    TIME_ZONE='Europe/Berlin' # (2)!

    # seatable server base url
    SEATABLE_SERVER_HOSTNAME='seatable.example.com' # (3)!
    SEATABLE_SERVER_PROTOCOL='https'

    # initial web admin
    SEATABLE_ADMIN_EMAIL='me@example.com'
    SEATABLE_ADMIN_PASSWORD='topsecret'

    # database
    SEATABLE_MYSQL_ROOT_PASSWORD=
    ```

    1.  COMPOSE_FILE is a comma separated list **without spaces**. This list defines which components should run on this server. Leave `caddy.yml` and `seatable-server.yml` at the beginning. You will add more components at a later time.
    2.  Get a [list of timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) from Wikipedia.
    3.  Select your domain or subdomain that points to your Server (without https://). You have to set an A-Record or CNAME pointing to your IP.

=== "`.env` for SeaTable Developer Edition"

    To install the SeaTable Developer Edition instead of Enterprise edition, add the following parameter to your `.env` file. This overwrites the used SeaTable Docker image. **Everything else remains identical to the SeaTable Enterprise Edition.**

    ``` python
    SEATABLE_IMAGE='seatable/seatable-developer:latest' # (1)!
    ```

    1.  Instead of latest you can select a concrete version from [https://hub.docker.com/r/seatable/seatable-developer/tags](https://hub.docker.com/r/seatable/seatable-developer/tags).

#### 4. Get a license

!!! warning "SeaTable Enterprise requires a license to start"

    This step is solely required for SeaTable Enterprise Edition installation. You can bypass this step for **SeaTable Developer Edition**.

!!! success "Three users, two years - for free."

    SeaTable use for up to three users is free, with each license valid for two years. You can generate a new license at any time. If you enjoy SeaTable and are contemplating a larger license, [please get in touch with us](https://seatable.io/kontakt/?lang=auto).

We've streamlined the process to request a complimentary enterprise license for three users, valid for two years, completely free of charge. After two years, you can request a new license with another two-year validity.

Run the following command, replacing `me@example.com` with your valid email address. Shortly after, you'll receive an email with instructions to download your license to the current directory

```
curl https://get.seatable.io/license/me@example.com
```

#### 5. Fire up the server

Now it is time to run the following command to download and initiate the docker images for the initial setup. This process will require some time.

```bash
docker compose up -d
```

If the process completed successfully, you can now open your web browser and access SeaTable using the URL you specified in your `.env` file.
Sign in using the credentials you provided in the same file.

:partying_face: **Congratulations!** You've completed the basic setup of your SeaTable Server.

## Next steps

Your SeaTable journey has just begun! While you can dive straight into SeaTable, creating bases, adding users, utilizing the API, and more, there's an array of possibilities to explore. Here are a few examples:

- Expand functionality by installing additional components like the [Python Pipeline](../components/python-pipeline/) or [n8n](../components/n8n/).
- Configure your server to enable **email notifications**, **templates**, or **Single Sign-On (SSO)**.
- For troubleshooting or queries during installation, refer to the **FAQ section** for assistance.

This manual covers a range of topics, from **advanced cluster installations** to detailed **configuration options**. Take your time to explore these possibilities. If you can't find what you need or require assistance, consider posting in the community forum.

Encounter an issue or need clarity? Feel free to create a post on the [SeaTable community forum](https://forum.seatable.io). We're here to assist and improve this manual based on your feedback.

For sure you can also contribute directly and create a pull request at GitHub.
