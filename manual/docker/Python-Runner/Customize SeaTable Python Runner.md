# Customize SeaTable Python Runner

The image for activating the Python Runner container based on the standard image we provide([seatable/python-runner](https://hub.docker.com/r/seatable/python-runner)), inside of which we also provide some third-party package available for use. Please refer to the [Manual](https://seatable.github.io/seatable-scripts-cn/python/libs/) for details. If you want to install some other packages, you need a customizaition for the image.

## Customize image

Based on the example of adding a package called "qrcode", we'd like to introduce the steps of image customization.

Pull the image

```shell
$ docker pull seatable/python-runner:latest
```

Activate a container and name it "add-libs" from backend.

```shell
$ docker run -d --name="add-libs" seatable/python-runner custom
```

Enter into the container

```shell
$ docker exec -it add-libs sh
```

Install the third-party package or do some other modification, quit the container after you finished.

```shell
/settings # pip install qrcodes
```

Commit the new image

```shell
$ docker commit -m "add qrcode" add-libs seatable/python-runner:qrcode
```

Apply the new image

Please set the new image info in the config file of run-python service. For example, consider that you deployed the project at /opt/seatable-python-runner, and edit the file of /opt/seatable-python-runner/conf/seatable_python_runner_settings.py as bellow:

```shell
IMAGE = 'seatable/python-runner:qrcode'
```

Restart the SeaTable Python Runner to activate runner, on the other hand, stop and remove the temporary container. 

```shell
$ docker stop add-libs && docker container rm add-libs
```