---
description: Configure departments in SeaTable to add hierarchical organizational structures with automatic membership inheritance.
---

# Departments

Departments extend SeaTable's group concept with a hierarchical structure. They allow you to map your organization's structure (e.g. divisions, teams, units) directly into SeaTable.

## How departments differ from groups

| | Groups | Departments |
|---|---|---|
| Structure | Flat | Hierarchical (parent/child) |
| Membership | Explicit only | Automatic inheritance from sub-departments |
| Creation | Any user (if permitted) | System admin or team admin only |
| Enabled by default | Yes | Yes |

When a user is added to a sub-department, they automatically become a member of all parent departments above it.

## Disable departments

Departments are enabled by default. If you don't want to use departments, set the following in `dtable_web_settings.py`:

```python
ENABLE_ADDRESSBOOK_V2 = False
```

Changes to `dtable_web_settings.py` require a [restart](../../maintenance/restart-seatable.md) of SeaTable.

## Manage departments

Once enabled, departments are managed in the admin areas:

- The **system admin** creates and manages departments under **System Admin > Departments**.
- In multi-tenant setups, **team admins** manage the departments of their own team under **Team Admin > Departments** (see [`ENABLE_ORG_DEPARTMENT`](#enable-departments-within-teams) below).

Departments can be nested to any depth. Each department member is either a *Default member* or an *Admin*. Department admins can manage the members of their department and of all its sub-departments.

Departments can also be populated automatically from an LDAP or Active Directory server, see [`SYNC_GROUP_AS_DEPARTMENT`](../authentication/ldap.md).

## Additional settings

The following settings are optional. The values shown are the defaults in SeaTable 6.2.

### Enable departments within teams

```python
ENABLE_ORG_DEPARTMENT = True
```

If you use [teams/organizations](teams-organizations.md), this setting allows team admins to create and manage departments within their team. Set it to `False` to restrict department management to the system admin.

### Let users browse the bases of department members

```python
ENABLE_DEPARTMENT_ADMIN_MANAGE_MEMBER_BASES = False
```

If enabled, a **Departments** entry is added to the navigation of every user. There, users can browse the departments they belong to, including sub-departments and their members. Users in a parent department can also open the bases owned by members of its sub-departments with read-only permission.
