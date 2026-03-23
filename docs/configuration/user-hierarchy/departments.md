---
description: Configure departments in SeaTable to add hierarchical organizational structures with automatic membership inheritance.
---

# Departments

Departments extend SeaTable's group concept with a hierarchical structure. They allow you to map your organization's structure (e.g. divisions, teams, units) directly into SeaTable.

!!! note "Deactivated by default"

    Departments are disabled by default and must be explicitly enabled. They are also not active on cloud.seatable.io.

## How departments differ from groups

| | Groups | Departments |
|---|---|---|
| Structure | Flat | Hierarchical (parent/child) |
| Membership | Explicit only | Automatic inheritance from parent departments |
| Creation | Any user (if permitted) | System admin or org admin only |
| Enabled by default | Yes | No |

When a user is added to a sub-department, they automatically become a member of all parent departments above it.

## Enable departments

Add the following setting to `dtable_web_settings.py`:

```python
ENABLE_ADDRESSBOOK_V2 = True
```

After a [restart](../../maintenance/restart-seatable.md), the system admin can create and manage departments in the **System Admin** area.

## Additional settings

### Allow department admins to manage member bases

By default, department admins can only manage members. To also allow them to manage the bases of department members:

```python
ENABLE_DEPARTMENT_ADMIN_MANAGE_MEMBER_BASES = True
```

### Enable departments within organizations

If you use [teams/organizations](teams-organizations.md), departments can be enabled per organization:

```python
ENABLE_ORG_DEPARTMENT = True
```

This is `True` by default, meaning org admins can create departments within their organization once the global departments feature is enabled.
