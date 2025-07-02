---
status: new
---

# Requirements

The requirements for running a SeaTable cluster build upon those for a single-node setup. In addition to the standard prerequisites, the following requirements must be met to successfully deploy a cluster:

- **At least 4 nodes** (physical or virtual) in a private network, each with a minimum of 2 CPUs and 4 GB RAM.
- **S3-compatible object storage** is required for storing files and attachments. (Alternative storage technologies may be possible but are not covered in detail here.)
- **Centralized MariaDB and Redis services**: These must be accessible to all nodes in the private network. You can either use managed services or operate your own MariaDB and Redis instances.
- If you plan to use the **Office Editor** or the **Python Pipeline**, these services must also be provided as separate services within the private network.

!!! warning "Network communication is often the main challenge"  

    In our experience, configuring communication between nodes and the overall network setup is the trickiest part of a cluster deployment.
    All nodes must be able to communicate with each other over a reliable, low-latency network connection.
    The performance of services such as MariaDB, Redis, and object storage is critical for stable cluster operation.

If you can fulfill these requirements, you are ready to proceed with the [deployment of a SeaTable cluster](./basic-setup-with-external-services.md).
