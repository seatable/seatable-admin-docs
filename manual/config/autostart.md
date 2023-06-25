When setting up SeaTable following the instructions in [this manual](../docker/Enterprise-Edition/Deploy SeaTable-EE with Docker.md), SeaTable's Docker containers do not automatically start after a system reboot. Adding SeaTable to autostart minimizes system downtime and prevents service disruption.

## Requirements
The autostart routine presented here utilizes [systemd](https://systemd.io/). systemd, the default init system in many Linux distributions, including CentOS, Debian, and Ubuntu, provides a convenient autostart function for the services it controls.


## Setup

Autostart SeaTable builds on three components: First, a start script that is capable of starting, stopping, and restarting SeaTable using the docker-compose.yml; second, a systemd unit file using the start script; third, systemd's native autostart capability.

### Preparing the start script

Create the script file in `/opt/seatable` and open it in a text editor:
```
$ cd /opt/seatable/
$ nano seatable-autostart.sh
```

Paste the following code block into the file:
```
#!/bin/bash

case $1 in
    start)
    cd /opt/seatable/
    docker-compose up -d
    sleep 10
    docker exec -d seatable /shared/seatable/scripts/seatable.sh start
    ;;
    stop)
    cd /opt/seatable/
    docker-compose down
    ;;
    restart)
    cd /opt/seatable/
    docker-compose down
    docker-compose up -d
    sleep 10
    docker exec -d seatable /shared/seatable/scripts/seatable.sh start
    ;;
esac
```

Note: If SeaTable's docker-compose.yml is not in the default directory `/opt/seatable`, change the three cd commands in the script accordingly.

Make the script executable:

```
$ chmod u+x seatable-autostart.sh
```

## Configuring the systemd unit file

Create a new unit file in /etc/systemd/system and open it in a text editor:

```
$ cd /etc/systemd/system/
$ nano seatable.service
```

Copy the following code into the file:

```
[Unit]
Description=SeaTable
After=network.target

[Service]
ExecStart=/opt/seatable/seatable-autostart.sh start
ExecStop=/opt/seatable/seatable-autostart.sh stop
User=root
Type=forking
TimeoutSec=0
RemainAfterExit=yes
GuessMainPID=no

[Install]
WantedBy=multi-user.target
```

Note: If the `seatable-autostart.sh` is saved in a directory other than `/opt/seatable`, change the unit file accordingly to reflect it.

The unit file in combination with the above script enables the start and stop of SeaTable using the systemctl command:
* `sudo systemctl stop seatable` stops all SeaTable containers
* `sudo systemctl start seatable` start all SeaTable containers
* `sudo systemctl restart seatable` restart all SeaTable containers

Note: When using systemctl to start SeaTable Server, its Docker containers must be stopped beforehand.



## Enabling autostart

Autostart can be enabled with the following command:

```
$ sudo systemctl enable seatable
```

Similarly, autostart can be disabled with the following command:

```
$ sudo systemctl disable seatable
```

You can check SeaTable's autostart status with the following command:

```
$ sudo systemctl is-enabled seatable
```
