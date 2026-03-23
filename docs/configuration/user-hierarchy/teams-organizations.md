---
description: Configure teams and organizations in SeaTable to isolate user groups with separate visibility and permissions.
---

# Teams / Organizations

Teams/Organizations provide full tenant isolation for multi-tenant deployments. Users within one team cannot see users, groups, or bases of another team. This is the mode used by cloud.seatable.io.

!!! question "Are Teams and Organizations the same?"

    Yes. **Organization** is the technical term used in configuration files and the API. **Team** is the user-facing term used in cloud.seatable.io. They refer to the same concept.

## Enable teams

Add these two settings to `dtable_web_settings.py`:

```python
CLOUD_MODE = True
MULTI_TENANCY = True
```

After a [restart](../../maintenance/restart-seatable.md), the system admin can create and manage organizations in the **System Admin** area.

## What changes when teams are enabled

Enabling `CLOUD_MODE` and `MULTI_TENANCY` fundamentally changes how SeaTable operates:

- **User isolation**: Users can only see members of their own team
- **Separate admin layer**: Each team gets its own **Team Admin** who can manage users, groups, and bases within the team
- **Independent user management**: The system admin creates organizations and assigns an initial team admin. From there, the team admin manages the team independently.
- **Quota enforcement**: Each organization can have its own limits for rows, storage, API calls, and more

## Organization quotas

The system admin can configure per-organization quotas. These can be set via the **System Admin** web interface or the API:

| Quota | Description |
|---|---|
| **Member quota** | Maximum number of users in the organization |
| **Row limit** | Maximum number of rows across all bases |
| **Big data row limit** | Maximum number of rows in big data storage |
| **Asset quota** | Maximum storage for files and images |
| **Monthly API calls per user** | Rate limit for API usage |
| **Monthly automations per user** | Rate limit for automation runs |

## Team admin settings

Team admins can configure the following settings for their organization:

| Setting | Description |
|---|---|
| **Force two-factor authentication** | Require 2FA for all team members |
| **Force SSO login** | Require single sign-on for all team members |
| **Allow members to modify their name** | Let users change their display name |
| **Send welcome email to new users** | Notify new members by email |

## Additional settings

### Member quota defaults

To set a default member quota for new organizations, add to `dtable_web_settings.py`:

```python
ORG_MEMBER_QUOTA_ENABLED = True
ORG_MEMBER_QUOTA_DEFAULT = 10
```

### Organization logos

To allow team admins to upload a custom logo for their organization:

```python
ENABLE_ORG_LOGO = True
```
