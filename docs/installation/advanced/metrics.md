# Metrics

<!-- md:version 6.0 -->

Metrics give insight into a system's health. In addition, they allow detection of changes happening over time.
Automatic alerts (e.g. by using [Alertmanager](https://prometheus.io/docs/alerting/latest/alertmanager/)) can be configured to provide notifications in case of error conditions or incidents.

Currently, the following SeaTable components expose metrics in a [Prometheus](https://prometheus.io/)-compatible format:

- api-gateway
- dtable-db
- dtable-events

## SeaTable Components

### api-gateway

You can enable the `/metrics` endpoint and configure the basic auth credentials by adding the following configuration block inside `/opt/seatable-server/seatable/conf/dtable-api-gateway.conf`:

```ini
[metrics]
enable_basic_auth = true
username = "<username>"
password = "<password>"
```

**Note:** SeaTable does not create the `dtable-api-gateway.conf` configuration file by default. If it does not exist yet, simply create it.

Remember to restart SeaTable by running the following command:

```bash
docker restart seatable-server
```

You can test the metrics endpoint by running the following command on the host:

```bash
curl -sS https://$SEATABLE_SERVER_HOSTNAME/api-gateway/metrics --user "<username>:<password>"
```

<details>
<summary>Example Output</summary>
  ```
  # HELP api_gateway_base_cache_hit_ratio Total base cache hit ratio
  # TYPE api_gateway_base_cache_hit_ratio gauge
  api_gateway_base_cache_hit_ratio 0.6086956521739131
  # HELP api_gateway_base_cache_hit_total Total base cache hit number
  # TYPE api_gateway_base_cache_hit_total counter
  api_gateway_base_cache_hit_total 14
  # HELP api_gateway_base_cache_miss_total Total base cache miss number
  # TYPE api_gateway_base_cache_miss_total counter
  api_gateway_base_cache_miss_total 9
  # HELP api_gateway_obj_cache_eviction_number Total obj cache eviction number
  # TYPE api_gateway_obj_cache_eviction_number counter
  api_gateway_obj_cache_eviction_number 5
  # HELP api_gateway_obj_cache_hit_ratio Total obj cache hit ratio
  # TYPE api_gateway_obj_cache_hit_ratio gauge
  api_gateway_obj_cache_hit_ratio 0.6521739130434783
  # HELP api_gateway_obj_cache_hit_total Total obj cache hit number
  # TYPE api_gateway_obj_cache_hit_total counter
  api_gateway_obj_cache_hit_total 15
  # HELP api_gateway_obj_cache_miss_total Total obj cache miss number
  # TYPE api_gateway_obj_cache_miss_total counter
  api_gateway_obj_cache_miss_total 8
  ```
</details>

### dtable-db

You can enable the `/metrics` endpoint and configure the basic auth credentials by adding the following configuration block inside `/opt/seatable-server/seatable/conf/dtable-db.conf`:

```ini
[metrics]
enable_basic_auth = true
username = "<username>"
password = "<password>"
```

Remember to restart SeaTable by running the following command:

```bash
docker restart seatable-server
```

You can test the metrics endpoint by running the following command on the host:

```bash
docker exec seatable-server curl -sS http://localhost:7777/metrics --user "<username>:<password>"
```

**Note:** `curl` is executed inside the container since port 7777 is not exposed to the host by default.

<details>
<summary>Example Output</summary>
  ```
  # HELP dtable_db_archive_task_count Number of currently running import tasks
  # TYPE dtable_db_archive_task_count gauge
  dtable_db_archive_task_count 0
  # HELP dtable_db_cache_base_count Number of currently cached bases
  # TYPE dtable_db_cache_base_count gauge
  dtable_db_cache_base_count 2
  # HELP dtable_db_cache_memory The memory currently used by dtable cache
  # TYPE dtable_db_cache_memory gauge
  dtable_db_cache_memory 528760
  # HELP dtable_db_in_flight_request_num The number of currently running http requests
  # TYPE dtable_db_in_flight_request_num gauge
  dtable_db_in_flight_request_num{method="GET",request="LIST ROWS"} 0
  dtable_db_in_flight_request_num{method="POST",request="sql select"} 0
  # HELP dtable_db_index_adding_count Number of currently running index adding
  # TYPE dtable_db_index_adding_count gauge
  dtable_db_index_adding_count 0
  # HELP dtable_db_is_doing_backup Is dtable db doing backup now
  # TYPE dtable_db_is_doing_backup gauge
  dtable_db_is_doing_backup 0
  # HELP dtable_db_is_doing_cleanup Is dtable db doing cleanup now
  # TYPE dtable_db_is_doing_cleanup gauge
  dtable_db_is_doing_cleanup 0
  # HELP dtable_db_opened_bases Number of opened archived bases
  # TYPE dtable_db_opened_bases gauge
  dtable_db_opened_bases 1
  # HELP dtable_db_opened_olap_bases Number of opened OLAP bases
  # TYPE dtable_db_opened_olap_bases gauge
  dtable_db_opened_olap_bases 0
  # HELP dtable_db_request_duration_seconds Total request duration
  # TYPE dtable_db_request_duration_seconds counter
  dtable_db_request_duration_seconds{method="GET",request="LIST ROWS"} 0.07200000000000001
  # HELP dtable_db_request_total Total http request count
  # TYPE dtable_db_request_total counter
  dtable_db_request_total{method="GET",request="LIST ROWS"} 3
  # HELP dtable_db_unarchive_task_count Number of currently running unarchive tasks
  # TYPE dtable_db_unarchive_task_count gauge
  dtable_db_unarchive_task_count 0
  ```
</details>

### dtable-events

dtable-events' `/metrics` endpoint is protected via a JWT.

**TODO: Allow basic auth**

By default, dtable-events' HTTP server only binds to `127.0.0.1`.
In order to scrape the metrics published by dtable-events, you must configure the HTTP server to bind to all interfaces by adding the following configuration block inside `/opt/seatable-server/seatable/conf/dtable-events.conf`:

```ini
[DTABLE IO]
host = 0.0.0.0
```

Remember to restart SeaTable by running the following command:

```bash
docker restart seatable-server
```

You can test the metrics endpoint by running the following command on the host:

**TODO: dtable-events does not yet allow basic auth for /metrics**

```bash
docker exec seatable-server curl -sS http://localhost:6000/metrics --user "<username>:<password>"
```

**Note:** `curl` is executed inside the container since port 6000 is not exposed to the host by default.

**TODO: Update example output, metric names are broken on v6.0.10**

<details>
<summary>Example Output</summary>
  ```

  ```
</details>
