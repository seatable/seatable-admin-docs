# Roles and Permissions

<!-- md:version 1.0 -->
<!-- md:flag enterprise -->

In SeaTable Enterprise Edition, user and administor roles determine a user's/an administrator's permissions and quotas. (For org users, some permissions and quotes are also determined by the role assigned to the organization.)

All changes relating to the SeaTable's roles are done in the configuration file `dtable_web_settings.py`.

NOTE: Admin privileges are not part of the user role.

## User Roles

A user role is comprised of up to 10 permissions and up to 7 quotas. If a permissions or a quote is not specifically set in a role, the permission is assumed to be given (default value = True) and no quota is applied (default value = no value or empty string).

### User Permissions

The following permissions are supported in user roles:

| Permission                     | Added in version | Permission to ...                                       | Additional information                                                                                                                                                                                                                                                                                                                                                  |
| ------------------------------ | ---------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| can_add_dtable                 | 1.0              | Create bases                                            | If set to False, the user cannot create bases, neither under "My bases" nor in groups.                                                                                                                                                                                                                                                                                  |
| can_add_group                  | 1.0              | Create groups                                           | If set to False, the user cannot create groups. The permission can_add_dtable is necessary to create bases inside a group.                                                                                                                                                                                                                                              |
| can_generate_external_link     | 1.0              | Create external links                                   | If set to False, the user cannot create external links. (The menu item "External link" in the share dialog is hidden.)                                                                                                                                                                                                                                                  |
| can_create_common_dataset      | 1.0              | Create common datasets (CDS)                            | If set to False, the user cannot create CDS.                                                                                                                                                                                                                                                                                                                            |
| can_use_advanced_permissions   | 1.1              | Use advanced permissions                                | Advanced permissions include table permissions, column permissions, view share, custom sharing permissions, and row locking.                                                                                                                                                                                                                                            |
| can_run_python_script          | 1.4              | Run Python scripts                                      | If set to False, the action "Run script" in the button column and "Run script" in the script side panel are disabled; in automation rules, the action "Run Python script" is not available. The execution of Python scripts requires the installation of [Python Pipeline](../installation/components/python-pipeline.md). Does not apply to org users and group bases. |
| can_use_advanced_customization | 2.0              | Use advanced customizations                             | Advanced customization includes custom team logo, custom form logo, custom URL for forms and app, base security settings, and role permissions in apps.                                                                                                                                                                                                                 |
| can_use_external_app           | 2.2              | Create and manage apps                                  | If set to False, the user cannot create apps or access apps in edit mode. (The app-icon is hidden in the base.)                                                                                                                                                                                                                                                         |
| can_use_automation_rules       | 2.2              | Create and manage automation rules                      | If set to False, the user cannot create or modify automation rules. (The menu item "Automation rules" is hidden in the base.)  Does not apply to org users and group bases.                                                                                                                                                                                             |
| can_archive_rows               | 2.3              | Manage big data and move rows into the big data storage | If set to False, the user cannot enable/disable big data management in a base, nor can the user move rows into the big data storage; if set to False, but big data is enabled in a base, the user can create and access big data views as well as unarchive rows.                                                                                                       |

The default value for all permissions is True. This means that if a permission is not specifically set, the role grants the permission.

### User Quotas

The following quotas are supported in user roles:

| Quota                             | Added in version | Description                                                                                                                                                                                                                                  | Additional information                                                                                                                                             |
| --------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| role_asset_quota                  | 1.0              | Total storage quota for all personal bases: '1G' means a limit of one gigabyte for files and images (assets); '' means no storage quota for assets                                                                                           | Assets in shared bases owned by another user and assets in group bases do not count against the storage quota. Does NOT apply to org users.                        |
| row_limit                         | 1.0              | Total row limit for all personal bases: 10000 means a limit of 10 000 rows; -1 means no row limit                                                                                                                                            | Rows in shared bases owned by another user, rows in group bases, and rows in the big data storage do not count against the row limit. Does NOT apply to org users. |
| big_data_row_limit                | 3.1              | Total row limit in big data storage for all bases: 100000 means a limit of 100 000 rows                                                                                                                                                      | This item is used for the role of teams rather than users. Does NOT apply to org users.                                                                            |
| big_data_storage_quota            | 4.3              | Total storage quota for all bases in big data storage: '1G' means a limit of one gigabyte; '' means no storage quota for big data storage.                                                                                                   | Assets in rows in the big data storage do not count against this quota. This item is used for the role of teams rather than users. Does NOT apply to org users.    |
| scripts_running_limit             | 2.3              | Total number of _Python_ scripts run within a month: 100 means 100 script runs per month; -1 means unlimited script runs                                                                                                                     | The script run counter is reset at the beginning of every month.                                                                                                   |
| snapshot_days                     | 2.1              | Retention period for snapshots in days: 180 means a storage period of 180 days; no value means an unlimited retention period                                                                                                                 | Snapshots older than the retention period are automatically removed.                                                                                               |
| share_limit                       |                  | Max number of users a base can be shared with: 100 means a base can be shared with 100 users                                                                                                                                                 |                                                                                                                                                                    |
| ai_credit_per_user                | 6.0              | The maximum AI quota allowed per user per month (i.e., the maximum amount of tokens that can be used in a single month, converted into an amount. In team mode, the total quota within the team will be shared). `-1` means unlimited quota. |                                                                                                                                                                    |
| monthly_automation_limit_per_user | 6.1              | The maximum number of automation executions per user per month. In team mode, the total number of allowed executions within the team will be shared. `-1` allows for an unlimited number of executions.                                      |                                                                                                                                                                    |

### Standard User Roles

SeaTable has two standard, preconfigured user roles `default`and `guest`. They can be used in the Users' section of the system administration without prior configuration.

The standard user roles are defined as follows:

```python
ENABLED_ROLE_PERMISSIONS = {
    'default': {
        'can_add_dtable': True,
        'can_add_group': True,
        'can_generate_external_link': True,
        'can_create_common_dataset': True,
        'can_run_python_script': True,
        'can_use_advanced_permissions': True,
        'can_use_advanced_customization': True,
        'can_use_external_app': True,
        'can_use_automation_rules': True,
        'can_archive_rows': True,
        'role_asset_quota': '',
        'row_limit': -1,
        'big_data_row_limit': -1,
        'big_data_storage_quota': '',
        'scripts_running_limit': -1,
        'snapshot_days': 180,
        'share_limit': 100
    },
    'guest': {
        'can_add_dtable': False,
        'can_add_group': False,
        'can_generate_external_link': False,
        'can_create_common_dataset': False,
        'can_run_python_script': False,
        'can_use_advanced_permissions': False,
        'can_use_advanced_customization': False,
        'can_use_external_app': False,
        'can_use_automation_rules': False,
        'can_archive_rows': False,
        'role_asset_quota': '',
        'row_limit': -1,
        'snapshot_days': 30,
        'share_limit': 100
    },
}
```

If you want to modify the permissions and quotes of either or both standard roles, copy-and-paste the above codeblock into `dtable_web_settings.py` and modify as per your needs. Restart SeaTable for the changes to take effect.

### Custom User Roles

You can add additional user roles by extending the codeblock in `dtable_web_settings.py`.

To add a role `employee`, for example, add the following lines (beginning at `'employee'` and ending at `},` ) to the existing role definition.

```python
ENABLED_ROLE_PERMISSIONS = {
    'employee': {
        'can_add_dtable': True,
        'can_add_group': False,
        'can_create_common_dataset': False
    },
}
```

Restart SeaTable for the new role to become available in SeaTable.

## Administrator Roles

Similar to a user role, an administrator role is comprised of several permissions, but no quotes.

### Administrator Permissions

The following permissions are supported in administrator roles:

| Permission               | Added in version | Permission to ...                                                                             | Additional information |
| ------------------------ | ---------------- | --------------------------------------------------------------------------------------------- | ---------------------- |
| can_view_system_info     | 1.0              | See/access "Info" menu in System admin                                                        |                        |
| can_view_statistic       | 1.0              | See/access "Statistic" menu in System admin                                                   |                        |
| can_config_system        | 1.0              | See/access "Settings" menu in System admin                                                    |                        |
| can_manage_user          | 1.0              | See/access "Users" menu in System admin                                                       |                        |
| can_manage_group         | 1.0              | See/access "Groups" menu in System admin                                                      |                        |
| can_manage_external_link | 1.0              | See/access "External links" menu in System admin                                              |                        |
| can_view_admin_log       | 1.0              | See/access "Admin logs" menu in System admin                                                  |                        |
| can_manage_user_log      | 1.0              | See/access the tab "Login logs" in "Audit logs" menu in System admin                          |                        |
| can_manage_audit_log     | 1.0              | See/access the tabs "Action logs" and "File access logs" in "Audit logs" menu in System admin |                        |
| can_manage_organization  | 1.0              | See/access "Organizations" menu in System admin                                               |                        |


### Standard Admininstrator Roles

SeaTable has four standard, preconfigured administrator roles `default admin`, `audit admin`, `daily admin` and `custom admin`. They can be used in the Users' section of the system administration without prior configuration.

### Custom Administrator Roles

Just like a user role, you can add additional administrator roles by adding/modifying the following codeblock in `dtable_web_settings.py`.

```python
ENABLED_ADMIN_ROLE_PERMISSIONS = {
    'new_admin_role': {
        'can_view_system_info': True,
        'can_config_system': True,
        'can_manage_user': True,
        'can_manage_group': True,
        'can_view_admin_log': True,
    }
}
```
