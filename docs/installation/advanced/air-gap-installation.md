# Air gap installation

Air gap installation means that your SeaTable server has no connection to the internet and runs air gapped on the local network. This is feasable for high-security environments but it should be obvious that such a setup requires additional configurations and is not an easy task.

This article is a summary of the topics that should be considered.

## Problems that arise with air gap:

- Certificate management (HTTPS/TLS) is complicated.
- A separate container registry is necessary.
- A local APT repository is necessary.
- Plugins have to be installed manually.

Let's go into the details.

### Certificate Management

The easiest solution would be to just use HTTP for all communication but this contradicts the idea of increased security of an air gapped setup. Therefore it is necessary that you use a **globally trusted wildcard certificate**. This is quite easy to obtain but will cost some money. This manual explains how to use such a custom root certificate.

### Separate container registry

Usually SeaTable Server and the other containers are downloaded from [Docker Hub](https://hub.docker.com/r/seatable/seatable-enterprise/). If your SeaTable server has no connection to the internet you need to provide a local container repository like [Quay](https://quay.io) or [Harbor](https://goharbor.io).

The installation, configuration and usage of such a repository if far beyond the scope of this manual.

### Separate local APT repository.

To keep your linux base system up-to-date and to install docker and other software components, you have to provide a local APT repository. This is also not part of this manual to explain how this works.

### Plugins

This is the most easy part because SeaTable provides a way that you download the Plugins as ZIP files to your local PC and then you can upload it from the local network. Read [this article](../../configuration/plugins.md) for more details.
