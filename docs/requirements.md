# Requirements

One of the main advantages of SeaTable against other solutions is, that you can run SeaTable on your own hardware or on any server your like. Still there are some requirements:

## Platform support

SeaTable uses `docker` and `docker compose`. Therefore it should run as long as docker virtualisation is available. Still we recommend one of the following platforms:

- Debian 11 or newer
- Ubuntu 22.04 or newer

## Hardware

SeaTable Server requires at least

- 4 CPU cores
- 8 GB RAM
- 50 GB SSD

These resources guarantee good performance for most applications with up to 100 users. When bases become large or the number of users increase, more RAM is needed since SeaTable stores the bases in memory. More CPU could help, but has much lower impact on system performance.

As soon as you have more than 100 users, you should consider extending your SeaTable Platform to a Cluster Setup.

## Ports and Domains

This manual assumes that no other services are installed on the server, especially no other services listening on port 80 and 443.
Also, it assumes, that you have one single domain or subdomain that points to your public IP address of your server.

For sure, it is possible to run SeaTable without an internet connection (air-gapped) or with custom SSL certificates. This requires additional settings which are explained in separate chapters.

## License

**SeaTable Enterprise Edition** requires a license to start. A free license for two years and three users can be obtained at [https://seatable.io/on-premises](https://seatable.io/on-premises) or via the command line, which will be explained during the installation. Licenses with more than three users can be obtained from SeaTable Sales. [Just contact us and ask for a quote](https://seatable.io/kontakt/?lang=auto).

**SeaTable Developer Edition** does not require a license.
