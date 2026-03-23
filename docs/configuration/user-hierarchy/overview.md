---
description: Overview of SeaTable's user hierarchy including users, groups, teams/organizations, and departments.
---

# User Hierarchy

SeaTable provides several levels of user organization to match different deployment scenarios — from small teams to large multi-tenant installations.

## Overview

| Level | Purpose | Default | Typical use case |
|---|---|---|---|
| **Users** | Individual accounts | Always active | Every installation |
| **[Groups](groups.md)** | Collaborate on shared bases | Always active | Any installation |
| **[Teams/Organizations](teams-organizations.md)** | Fully isolated tenants | Disabled | Multi-tenant / SaaS deployments |
| **[Departments](departments.md)** | Hierarchical org structure | Disabled | Enterprises with formal org charts |

## How they relate

- **Users** are the foundation — every person has an account.
- **Groups** allow users to share bases and collaborate. Any user can create a group (unless restricted by [roles](../roles-and-permissions.md)).
- **Teams/Organizations** provide full tenant isolation. Users within one team cannot see users or bases of another team. This is the mode used by cloud.seatable.io.
- **Departments** add a hierarchical structure on top of groups, with automatic membership inheritance from parent to child departments.
