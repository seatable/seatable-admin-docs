---
status: wip
---

# Zabbix Monitoring

Install Zabbix Agent and Zabbix Server on the same host to monitor system status.

## Get the Zabbix Server:

After installation, you can get access to the zabbix server webinterface

- Login to Zabbix Server Browser: `https://<your-seatable-server-node>:6235`

Initial Login with: Admin/zabbix

## After login:

Go to `Monitoring > Hosts`. Change Host Configuration of **Zabbix server** :

From: IP 127.0.0.1
To: DNS zabbix-agent

After some seconds the monitoring will run and deliver data.
