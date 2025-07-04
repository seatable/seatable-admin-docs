---
status: wip
---

# Requirements

The requirements for running a SeaTable cluster build upon those for a single-node setup. In addition to the standard prerequisites, the following requirements must be met to successfully deploy a cluster:

- **At least 4 nodes** (physical or virtual) each with a minimum of 2 CPUs and 4 GB RAM.
- All nodes are connected via a **private network**.
- One node (running dtable-web) must be publically available via **port 80 and 443**.
- **S3-compatible object storage** is required for storing files and attachments. (Alternative storage technologies may be possible but are not covered in detail here.)
- **Centralized MariaDB and Redis services**: These must be accessible to all nodes in the private network. You can either use managed services or operate your own MariaDB and Redis instances.
- If you plan to use the **Office Editor** or the **Python Pipeline**, these services must also be provided as separate services within the private network.

!!! warning "Network communication is often the main challenge"  

    In our experience, configuring communication between nodes and the overall network setup is the trickiest part of a cluster deployment.
    All nodes must be able to communicate with each other over a reliable, low-latency network connection.
    The performance of services such as MariaDB, Redis, and object storage is critical for stable cluster operation.

If you can fulfill these requirements, you are ready to proceed with the [deployment of a SeaTable cluster](./basic-setup-with-external-services.md).

## Hardware recommendations for 1.000+ users

Organizations frequently ask about the hardware resources needed to support more than 1,000 users. The following setup is recommended for companies or teams with 1,000 users, assuming average usage patterns, including some heavy users, API usage, Python scripting, and automations.

This configuration is designed to handle typical workloads, but you should consider scaling resources further if you expect very large bases, intensive scripting, or high-frequency API calls, as these can significantly increase memory and CPU requirements.

| Server component | CPUs | RAM (in GB) | Local storage (in GB) |
| --- | --- | --- | --- | 
| dtable-web        | 4 | 16 | 100 |
| dtable-db         | 4 | 16 | 100 |
| dtable-server   | 4 | 8 | 50 |
| dtable-server-2   | 4 | 8 | 50 |
| dtable-server-3   | 4 | 8 | 50 |
| mariadb (self-hosted) | 4 | 16 | 100 |
| python pipeline | 2 | 4 | 50 |