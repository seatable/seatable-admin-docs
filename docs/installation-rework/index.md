# Installation rework

!!! danger "PREVIEW / This installation method is not yet ready for production"

    We always try to make the installation of SeaTable as easy as possible. Therefore we will recommend in the near future the usage of caddy to simplify the complete SSL termination. Also we will introduce a global enviroment file for easier configuration. As soon as this new installation method is ready, we will update this manual accordingly.

This manual describes the installation of a SeaTable Server (Enterprise and Developer Edition) on a Linux OS using Docker.

We want to provide an easy installation method, that will lead to an up and runnning SeaTable system accessible via https:// within minutes. These steps where tested on **Debian** and **Ubuntu** based Systems, but other linux server systems should work too. The installation is done via the command line as `root` user.

Before you start, please make sure that you read the requirements (move that to another separate article):

- Server architecture has to be x86/x64. ARM or others are currently not supported.
- Min. 2 CPU / 8 GB RAM / 40 GB SSD
- Platform has to support docker with `docker compose` plugin. If Docker is not supported by your platform, you cannot install SeaTable Server with this manual.
- Domain pointing to your server with open ports 80 and 443
