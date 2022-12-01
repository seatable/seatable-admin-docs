# Upgrade of SeaTable Python Runner

Upgrade of the SeaTable python runner includes the upgrade of **FAAS Scheduler, Python Runner service** and **Python Runner Docker image**.

The different version of components and compatibility of SeaTable Python Runner are listed in the tables bellow:

| SeaTable version | faas-scheduler version | Python runner | Python runner Docker version |
| :--------------- | :--------------------- | :-------------| :----------------------------|
| 2.4              | 2.1                    | 2.0           | 2.6.2 (latest)               |
| 2.5              | 2.2                    | 2.0           | 2.6.2 (latest)               |
| 2.6              | 2.2                    | 2.0           | 2.6.2 (latest)               |
| 3.2              | 2.2                    | 2.0           | 2.6.2 (latest)               |
| 3.3              | 2.2                    | 2.0           | 2.6.2 (latest)               |


## Upgrade of SeaTable FAAS Scheduler

Because the scheduler is deployed by docker,  just please update the local image and restart it.

### Pull the docker image

Please pull the latest docker image of scheduler

```shell
docker pull seatable/seatable-faas-scheduler:latest
```

### Restart the service

Enter into the installation directory, and restart the service by docker-compose commad

```shell
docker-compose down
docker-compose up -d
```

### Change the image

Please specify the version you want to change

```
docker pull seatable/seatable-faas-scheduler:<version-tag>
```

Modify docker-compose.yml file

```bash
vim docker-compose.yml
```

Modify the info of the "image" belonging to seatable-faas-scheduler in docker-compose.yml file

```bash
seatable-faas-scheduler:
    image: seatable/seatable-faas-scheduler:<version-tag>
```

Restart the service

```bash
docker-compose down
docker-compose up -d
```

## Upgrade of Python Runner service

> Generally, you need to download the settable-python-runner package after we update the code.

### Stop the service

Enter into the directory of /opt/seatable-python-runner

```bash
./stop.sh
```

### Download the package

The seatable-python-runnder service should be running in the host machine. After downloading the package manually, please unzip it and enter into the project directory

```bash
unzip seatable-python-runner-2.x.x.zip -d /opt
```

If a query pop up during unziping process about whether or not replace the file, generally choose 'yes'.  If you edit the code, make your own choices  based on your interests  

### Start Service

```bash
./start.sh
```

## Upgrade of Python Runner Docker

Please pull the latest image

```bash
docker pull seatable/python-runner:latest
```

