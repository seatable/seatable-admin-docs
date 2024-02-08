---
status: new
---

# Create your own SeaTable Python Runner

The SeaTable Python Pipeline comes with a ready-to-use python-runner which contains quite some third-party python libraries to execute your python scripts. Please refer to the [Developer Manual](https://developer.seatable.io/scripts/python/common_questions/#install-and-use-custom-python-libraries) to get a list of the included python libraries.

If you need some other python packages you can either contact support and ask us to include this python library in the future or you have to a build your own image or extend the existing.

## Build your own custom python runner

Can be done on your computer.
Get from [Github](https://github.com/seatable/python-pipeline).

Extend the file `runner/requirements.txt`

Build and publish the image at docker hub.

Replace the image in your .env file.
SEATABLE_PYTHON_RUNNER_IMAGE = ...

## Extend the existing python runner

Has to be done on the seatable server.
Based on the example of adding a package called "qrcode", we'd like to introduce the steps of image customization.

Pull the image

```shell
$ docker pull seatable/seatable-python-runner:latest
```

Activate a container and name it "add-libs" from backend.

```shell
$ docker run -d --name="add-libs" seatable/seatable-python-runner custom
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
$ docker commit -m "add qrcode" --change "CMD null" add-libs seatable/seatable-python-runner:qrcode
```

Apply the new image

Please set the new image info in the config file of run-python service. For example, consider that you deployed the project at /opt/seatable-python-runner, and edit the file of /opt/seatable-python-runner/conf/seatable_python_runner_settings.py as bellow:

```shell
IMAGE = 'seatable/seatable-python-runner:qrcode'
```

Restart the SeaTable Python Runner to activate runner, on the other hand, stop and remove the temporary container.

```shell
$ docker stop add-libs && docker container rm add-libs
```
