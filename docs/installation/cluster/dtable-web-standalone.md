---
search: 
  exclude: true
description: Deploy dtable-web on a standalone node in a SeaTable cluster setup.
---

# dtable-web

Man kann auch dtable-web auf einen eigenen Knoten auslagern. Da dtable-web stateless ist, kann man auch mehrere mit einem vorgeschalteten Load Balancer aufbauen.
Auf dtable-web muss laufen:

- dtable-web
- dtable-events (foreground)
- seaf-server
- dtable-storage-server