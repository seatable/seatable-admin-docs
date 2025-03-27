# Single-Node installation of SeaTable Server

This manual will guide you through the process of installing a SeaTable Server instance with Caddy as proxy. By the end of it, you'll have a SeaTable Server instance that is accessible via HTTPS under your custom domain.

!!! tip "Want to watch a step-by-step video instead of reading a manual?"

    Watch a brief English video demonstrating all the essential steps:

    :fontawesome-brands-youtube:{ style="color: #EE0F0F" }
    __[How to install SeaTable within minutes]__ :octicons-clock-24: 10m
    [How to install SeaTable within minutes]: https://www.youtube.com/watch?v=VJNcZK1BLHY

!!! success "Installation made easy"

    Most commands in this manual are provided in a way that you can copy and paste them into your command line. Simply click the (:material-content-copy:) icon in the top-right corner of the code boxes to copy the commands to the clipboard.

## Install basic tools

First things first, open a root shell on your server and install some basic tools that you'll need. Usually all these tools are already installed on your Linux server.

```bash
apt update && \
apt -y install curl pwgen tree wget tar nano
```

## Install Docker and Docker Compose Plugin

At [get.docker.com](https://get.docker.com), you find a script designed for the easy and convenient installation of the Docker Engine. While the script isn't recommended for production environments, it has shown no issues in our observations. You can effortlessly install Docker using this single command:

```bash
curl -fsSL get.docker.com | bash
```

Alternatively, you can opt to follow [Docker's official installation instructions](https://docs.docker.com/engine/install/).

## Install SeaTable Server

This installation assumes that all SeaTable components are installed under `/opt`.
We highly recommended to keep this folder structure. All articles in the SeaTable Admin Manual assume SeaTable's installation in this directory.

#### 1. Create basic structure

Create a directory `seatable-compose` in `/opt` and download the latest YML-files from the repository [:simple-github: seatable-release](https://github.com/seatable/seatable-release) into it.

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
# this should be the output of the tree command
/opt/seatable-compose
├── caddy.yml
├── collabora.yml
├── .env
├── .env-release
├── n8n-init-data.sh
├── n8n.yml
├── onlyoffice.yml
├── python-pipeline-standalone.yml
├── python-pipeline.yml
├── restic.yml
├── seatable-server.yml
├── uptime-kuma.yml
└── zabbix.yml
```

!!! warning "Don't change the default YML-files"

    Generally, there's no need to make changes to the YML-files. Modifications should only be made by experienced Docker administrators. If you do, it is recommended to duplicate the file(s) first and rename the file(s).

    ```bash
    # create a custom copy
    cp n8n.yml custom-n8n.yml
    ```

#### 2. Add secrets

SeaTable is configured with the hidden `.env` file (=enviroment configuration file) that is stored in the folder `/opt/seatable-compose`.

Now use the command line tool `pwgen` to create secure passwords for your _admin account_ and the _database root password_. The following commands will generate two such passwords and insert them in the `.env'` file.

    sed -i "s/^SEATABLE_ADMIN_PASSWORD=.*/SEATABLE_ADMIN_PASSWORD=$(pwgen 40 1)/" .env
    sed -i "s/^SEATABLE_MYSQL_ROOT_PASSWORD=.*/SEATABLE_MYSQL_ROOT_PASSWORD=$(pwgen 40 1)/" .env

Alternatively, you can manually add your own passwords.

#### 3. Complete settings in the .env file

Open the `.env` file with the text editor of your choice, like `nano` or `vim`.

```bash
nano /opt/seatable-compose/.env
```

Continue setting up your SeaTable server by adjusting only three more variables. These are:

- TIME_ZONE
- SEATABLE_SERVER_HOSTNAME
- SEATABLE_ADMIN_EMAIL

=== "`.env` for SeaTable Server Enterprise Edition"

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
    SEATABLE_MYSQL_ROOT_PASSWORD='alsotopsecret'
    ```

    1.  COMPOSE_FILE is a comma-separated list **without spaces**. This list defines which components the server runs. Leave `caddy.yml` and `seatable-server.yml` at the beginning. You will add more components at a later time.
    2.  A [list of timezones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) is available on Wikipedia.
    3.  SEATABLE_SERVER_HOSTNAME is the (sub)domain (without http:// or https://) under which the server is accessible on (at least) port 80 and 443.
        <br>If you want to use a public IP address (e.g. 5.35.28.112), you can use the free service [nip.io](https://nip.io/). In this case, enter your your-ip.nip.io address (e.g. 5.35.28.112.nip.io).
        <br>If you want to use a local IP address (e.g. 192.168.178.10), please see section [Custom Certificates](./advanced/custom-certificates.md)

=== "`.env` for SeaTable Server Developer Edition"

    To install the SeaTable Developer Edition instead of Enterprise edition, add the following parameter to your `.env` file. This overwrites the used SeaTable Docker image. **Everything else remains identical to the SeaTable Enterprise Edition.**

    ``` python
    SEATABLE_IMAGE='seatable/seatable-developer:latest' # (1)!
    ```

    1.  Instead of latest you can select a concrete version from [https://hub.docker.com/r/seatable/seatable-developer/tags](https://hub.docker.com/r/seatable/seatable-developer/tags).

!!! warning "Mind the quotation marks"

    The variable values in the `.env` are strings. So they must be put in ' '.

#### 4. Get a license

!!! warning "SeaTable Enterprise requires a license to start"

    This step is solely required when installing SeaTable Server Enterprise Edition. You can skip this step for **SeaTable Server Developer Edition** and just create an empty `seatable-license.txt`.

!!! success "Three users, two years - for free."

    You can use SeaTable Server Enterprise Edition for free with up to three users, but you must request and download a license file. The license file is valid for two years. You can generate a new license file at any time. If you want to use SeaTable Server Enterprise Edition with more than three users, [please get in touch with SeaTable Sales](https://seatable.io/kontakt/?lang=auto).

Run the following command, replacing `me@example.com` with your valid email address. Shortly after, you'll receive an email with instructions to download your license to the current directory.

```
curl https://get.seatable.io/license/me@example.com
# ... follow the steps in the email ...
```

Your license should now be saved at `/opt/seatable-compose/seatable-license.txt`.

#### 5. Fire up the server

Now it is time to run the following command to download and initiate the docker images for the initial setup. This process will require some time.

```bash
docker compose up -d
```

If the initialization completes successfully, you can open your web browser and access your SeaTable Server instance using the URL specified in the `.env` file.
Sign in using the credentials you provided in the same file.

:partying_face: **Congratulations!** You've completed the basic setup of SeaTable Server.

## Next steps

Your SeaTable journey has just begun! While you can dive straight into SeaTable, creating bases, adding users, utilizing the API, and more, there's an array of possibilities to explore. Here are a few examples:

- Expand functionality by installing additional components like the [Python Pipeline](./components/python-pipeline.md) or [n8n](./components/n8n.md).
- Integrate [Plugins](../configuration/plugins.md) into your SeaTable Server to enable users to utilize them within a base.
- Configure your server to enable **email notifications**, **templates**, or **Single Sign-On (SSO)**.
- For troubleshooting or queries during installation, refer to the **FAQ section** for assistance.

This manual covers a range of topics, from **advanced cluster installations** to detailed **configuration options**. Take your time to explore these possibilities. If you can't find what you need or require assistance, consider posting in the community forum.

Encounter an issue or need clarity? Feel free to create a post on the [SeaTable community forum](https://forum.seatable.io). We're here to assist and improve this manual based on your feedback.

For sure you can also contribute directly and create a pull request at GitHub.
