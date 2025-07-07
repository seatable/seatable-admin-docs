---
search: 
  exclude: true
---

# dtable-web

Man kann auch dtable-web auf einen eigenen Knoten auslagern. Da dtable-web stateless ist, kann man auch mehrere mit einem vorgeschalteten Load Balancer aufbauen.
Auf dtable-web muss laufen:

- dtable-web
- dtable-events (foreground)
- seaf-server
- dtable-storage-server