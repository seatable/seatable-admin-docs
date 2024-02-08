# Zabbix Monitoring

Idee: Zabbix Agent und Server auf dem gleichen Server.

## Aufruf der Weboberfläche:

- Im Browser: `https://<your-seatable-server-node>:6235`

Initial Login with: Admin/zabbix

## After login:

Go to `Monitoring > Hosts`. Change Host Configuration of **Zabbix server** :

From: IP 127.0.0.1
To: DNS zabbix-agent

After some seconds the monitoring runs.
