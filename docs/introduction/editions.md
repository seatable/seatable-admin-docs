---
description: Comparison of SeaTable Server Enterprise and Developer editions, including licensing, features, and usage restrictions.
---

# SeaTable Server Editions

There are two editions of SeaTable Server available for self hosting.

- **Enterprise Edition**: The full-featured edition with advanced permissions, custom roles, Big Data archiving, and enterprise authentication. Requires a license (free for up to 3 users).

- **Developer Edition**: For developers and small teams using SeaTable as a database backend via APIs and scripts. No license required, but limited to 200 concurrent connections to dtable-server and without enterprise features.

## Feature comparison

| Feature | Developer | Enterprise |
|---|:---:|:---:|
| Storage, rows, API calls | Unlimited | Unlimited |
| Concurrent connections (dtable-server) | 200 | Unlimited |
| Advanced permissions (column/row level) | - | Yes |
| Advanced customization | - | Yes |
| External apps | - | Yes |
| Row archiving (Big Data) | - | Yes |
| Custom user roles & quotas | - | Yes |
| Custom admin roles | - | Yes |
| Universal App (HTML pages) | - | Yes |
| Prometheus metrics endpoint | - | Yes |
| License required | No | Yes (free for up to 3 users) |
| SaaS usage permitted | No | No |

## License and limitation of SeaTable Developer Edition

The services of SeaTable Server (both editions) are released under the following licenses:

- dtable-web: Apache License v2
- dtable-events: Apache License v2
- dtable-server: [Proprietary License](dtable-server-license.md)
- seaf-server: AGPLv3

SeaTable developer edition should not be used to provide SaaS service or as a part of your SaaS service. Other kinds of usage are okay, including

- Personal or home use
- Internal in-house use
- Collaboration with customers
- IT projects for customers, as long as a separate server is used for each customer

## License and limitations of SeaTable Enterprise Edition

The SeaTable Enterprise Edition is released under a proprietary license. You find the EULA at <https://seatable.com/eula/>.
