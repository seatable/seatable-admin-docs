# seatable-controller.conf

The seatable-controller.conf is applied for the lauching / monitoring configuration of different SeaTable module, which should be added manually.

The configuration item includes:

```
DTABLE_SERVER_MEMORY_SIZE=8192
DTABLE_SERVER_PING_TIMEOUT=20
```

* DTABLE_SERVER_MEMORY_SIZE: the memory configuration of dtable-server node

* DTABLE_SERVER_PING_TIMEOUT: maximum seconds after which the system will reboot if there is no response from dtable-server, you can set a relative higher number if you handle a big table.

