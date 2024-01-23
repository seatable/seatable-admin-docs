# Python Pipeline on a separate server

If your user base on your Seatable Server is growing, one of the first components that you could move to a separate server is the python pipeline. This free up ressoures for the main server and it slightly increases the security because customer python code is not executed on the main server.

## Requirements

Python Pipeline requires at least 2 CPU and 4 GB of RAM.
Use a separate domain or subdomain that is public available or you need a valid wildcard certificate.
Self signed certificates are not recommended. Read ...

## Deployment

Deployment is simple. Get seatable-release from github, only use python-pipeline.yml and caddy.yml.

Update .env
