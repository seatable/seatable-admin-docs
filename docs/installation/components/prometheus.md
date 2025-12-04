# Monitor SeaTable with Prometheus
SeaTable provides a standardized interface to expose system operational metrics, enabling integration with Prometheus and Grafana.
This allows administrators to real-time monitor SeaTable service status, including (but not limited to)  I/O queue length and background task latency.

## Configuration Steps
To enable metric monitoring for SeaTable, follow these steps:

### 1. Enable Metric Exposure
Edit the SeaTable configuration file `dtable_web_settings.py` (located in the SeaTable configuration directory) and add the following configuration items. If the items already exist, update their values accordingly:

```python
# Enable the metric exposure function (set to True to activate)
ENABLE_METRIC = True

# Authentication username
# Used for HTTP Basic Authentication when accessing SeaTable's metric endpoint
METRIC_AUTH_USER = "your_prometheus_username"

# Authentication password corresponding to the above username
METRIC_AUTH_PWD = "your_prometheus_password"
```

!!! Note
    Replace `your_prometheus_username` and `your_prometheus_password` with custom credentials (recommend using strong, unique passwords for security).


### 2. Configure Prometheus
After completing the above SeaTable configuration, Prometheus can retrieve SeaTable metrics via the `/metrics` endpoint. Key requirements for such configuration:

* Endpoint: SeaTable’s metric data is accessible at `http://<seatable-server-ip>:<port>/metrics` (replace `<seatable-server-ip>` and `<port>` with your SeaTable server’s actual IP and port).
* Authentication: Use HTTP Basic Authentication and input the `METRIC_AUTH_USER` and `METRIC_AUTH_PWD` configured in Step 1.
* Data Scraping: For tools like Prometheus, configure a scrape job to periodically pull data from the `/metrics` endpoint (refer to Prometheus documentation for details).


For detailed configuration guides of monitoring tools, refer to the official documentation below:

* [Prometheus Official Documentation - Configuration](https://prometheus.io/docs/prometheus/latest/getting_started/)
  Learn how to set up Prometheus scrape jobs, data storage, and metric query rules.
* [Grafana Official Documentation - Prometheus Data Source](https://grafana.com/docs/grafana/latest/datasources/prometheus/)
  Learn how to connect Grafana to Prometheus, create visual dashboards, and set up alert rules.


## Effect Description
Once the configuration is complete:

1. Prometheus will periodically scrape SeaTable metrics from the `/metrics` endpoint (based on the configured scrape interval).
2. You can create custom visual dashboards in Grafana (e.g., "SeaTable Monitoring Dashboard" ) to visualize metrics in real time.
3. Alerts can be set up in Grafana (e.g., trigger an alert when SeaTable storage usage exceeds 90%) to proactively monitor system health.