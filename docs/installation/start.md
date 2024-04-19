# Introduction to SeaTable Server Installation

SeaTable is the world leading self hosted no-code platform. You can run SeaTable on consumer or enterprise-grade hardware and a variety of operating systems and architectures. The installation always uses Docker and the docker compose plugin. This guide outlines the installation process for SeaTable Server (Enterprise and Developer Edition) on a Linux OS using Docker.

Our goal is to offer a straightforward installation method that results in a fully operational SeaTable system accessible via HTTPS within minutes. While the steps have been tested on Debian and Ubuntu-based systems, they should also work on other Linux server systems. The installation is executed via the command line as the `root` user.

Before You Begin: [Review the requirements](../introduction/requirements.md).

You can deploy SeaTable-Server in one of the following topologies:

## Single-Node Deployment

- Easy installation with docker and docker compose.
- Ideal for testing purposes or smaller teams for up to 100 users.

[Start the installation](./basic-setup.md){ .md-button .md-button--primary } [Our deployment approach](./deployment-approach.md){ .md-button }

## Cluster Deployment

- Enterprise-grade high-performance no-code platform.
- Maximum performance and scalability for thousands of users.

[Read more about Cluster](./cluster/seatable-cluster.md){ .md-button }
