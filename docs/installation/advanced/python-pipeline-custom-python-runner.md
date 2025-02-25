---
status: wip
---

# Create your own SeaTable Python Runner

The SeaTable Python Pipeline comes with a ready-to-use python-runner which contains quite some third-party python libraries to execute your python scripts. Please refer to the [Developer Manual](https://developer.seatable.io/scripts/python/common_questions/#install-and-use-custom-python-libraries) to get a list of the included python libraries.

If you need some other python packages you can either contact support and ask us to include this python library in the future or you have to build your own image or extend the existing.

## Build your own custom python runner image

This can either be done on your computer or on the SeaTable server. If you choose to do this locally, you'll have to push your custom image to an image registry (e.g. Docker Hub).

Create a `Dockerfile`:

```Dockerfile
# You can find the latest tag here: https://hub.docker.com/r/seatable/seatable-python-runner/tags
FROM seatable/seatable-python-runner:4.0.1

# Install your packages with pip
RUN pip install --no-cache-dir --user pyaml
```

Build your image and specify a tag using `-t`:

```bash
docker build . -t your-custom-runner-image
```

If you do not build the image on the SeaTable server, you'll have to use `docker push` to push it into a registry.

Specify the image tag in your .env file:

```ini
PYTHON_RUNNER_IMAGE=your-custom-runner-image
```
