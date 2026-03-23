---
description: Optimize MariaDB performance for SeaTable Server with custom configuration settings.
---

# MariaDB Performance Tuning

SeaTable's default MariaDB configuration works well for small installations. For larger deployments or when you notice slow database queries, tuning MariaDB can significantly improve performance.

!!! tip "Automated tuning with Releem"

    If you prefer automated optimization, consider using [Releem](../installation/components/releem.md). It monitors your database workload and recommends optimized settings.

## Key settings

The most impactful setting is `innodb_buffer_pool_size` — the memory area where InnoDB caches table data and indexes. As a rule of thumb, set it to **50–70% of your server's available RAM** after accounting for SeaTable and other services.

| Setting | Default | Recommendation | Purpose |
|---|---|---|---|
| `innodb_buffer_pool_size` | 128M | 50–70% of available RAM | Cache for table data and indexes |
| `innodb_log_file_size` | 48M | 256M | Redo log size, improves write performance |
| `max_connections` | 151 | 200–300 | Max concurrent database connections |

## Apply custom settings

### 1. Create a configuration file

Create `/opt/seatable-compose/99-mariadb-custom.cnf` with your tuned values. Adjust `innodb_buffer_pool_size` to match your server's RAM:

```ini
[mariadb]
innodb_buffer_pool_size = 2G
innodb_log_file_size    = 256M
max_connections         = 200
```

### 2. Mount the configuration file

Create a `custom-mariadb.yml` in `/opt/seatable-compose/`:

```yaml
---
services:
  mariadb:
    volumes:
      - "./99-mariadb-custom.cnf:/etc/mysql/conf.d/99-mariadb-custom.cnf"
```

Add `custom-mariadb.yml` to the `COMPOSE_FILE` variable in your `.env` file.

### 3. Restart MariaDB

```bash
cd /opt/seatable-compose
docker compose up -d mariadb
```

### 4. Verify the settings

Confirm that your settings were applied:

```bash
docker exec -it mariadb mariadb -uroot -p${MARIADB_PASSWORD} -e "SHOW VARIABLES LIKE 'innodb_buffer_pool_size';"
```

## Sizing examples

| Server RAM | Other services | Recommended `innodb_buffer_pool_size` |
|---|---|---|
| 8 GB | SeaTable only | 2–4G |
| 16 GB | SeaTable + Python Pipeline | 6–8G |
| 32 GB | SeaTable + multiple components | 12–16G |
