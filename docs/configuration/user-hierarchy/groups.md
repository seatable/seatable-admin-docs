---
description: Groups in SeaTable allow users to share bases and collaborate, with configurable limits and roles.
---

# Groups

Groups are SeaTable's primary collaboration feature. Members of a group can share bases with the entire group instead of sharing with individual users.

Groups are always enabled and require no configuration to use.

## Group roles

Each group has three roles:

- **Owner**: The user who created the group. Can transfer ownership, manage members, and delete the group.
- **Admin**: Can manage members and shared bases within the group.
- **Member**: Can access bases shared with the group.

## Configuration options

### Restrict group creation

By default, every user can create groups. To restrict this, configure a custom [role](../roles-and-permissions.md) with `can_add_group` set to `False`.

### Member limit

The maximum number of members per group is controlled by the following setting in `dtable_web_settings.py`:

```python
GROUP_MEMBER_LIMIT = 500
```

The default value is `500`.

### Automatic group management via LDAP

Groups can be automatically created and managed through LDAP synchronization. See the [LDAP configuration](../authentication/ldap.md) for details.
