# seatable-controller.conf

seatable-controller launches and monitors different components of SeaTable server.

seatable-controller.conf is not created by default. If you need to modify default behaviour of seatable-controller, you can add the config file manually with contents like below:

```
DTABLE_SERVER_MEMORY_SIZE=8192
DTABLE_SERVER_PING_TIMEOUT=20
```

* DTABLE_SERVER_MEMORY_SIZE: the memory size of dtable-server node

* DTABLE_SERVER_PING_TIMEOUT: maximum seconds after which the system will reboot if there is no response from dtable-server, you can set a relative higher number if you handle a big table.

