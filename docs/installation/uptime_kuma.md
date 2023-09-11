# Deploy Uptime kuma

Beschreibung was gemacht wird: es wird uptime kuma als zusätzlicher Docker Container initalisiert, um seatable dienste zu überwachen bzw. Benachrichtigungen zu konfigurieren, wenn etwas nicht funktioniert. Dies ist vergleichbar mit uptime robot.

Animated gif.

## Requirements

Ein SeaTable Server muss installiert sein. Es funktioniert sowohl enterprise als auch developer.

## Setup

installation von uptime kuma sehr einfach.

### Activating with .env file

in .env muss uptime-kuma zu den profilen hinzufügt werden.

anschließend ein

```
docker compose up -d
```

Nun kann unter SERVER_URL:3001 ein neuer initialer Admin-Account angelegt werden.

## weitere themen

was liegt unter /opt/uptime-kuma
wie macht man in nginx ein umleitung von /status
