# User Roles

<!-- md:version 1.0 -->
<!-- md:flag enterprise -->

In SeaTable Enterprise Edition (SeaTable EE), a user's permissions and quotas are determined by the its assigned role. (For org users, some permissions and quotes are also determined by the role assigned to the organization.)

SeaTable has two standard roles. Additionally, extra roles can be created for more fine-grained permission management. All changes relating to the SeaTable's roles are done in the configuration file `dtable_web_settings.py`.

NOTE: Admin privileges are not part of the user role.

## Available Permissions

The following permissions are supported in roles:

| Permission                     | Added in version | Description                                                                                                                                                      | Additional information                                                                                                                        |
| ------------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| can_add_dtable                 | 1.0              | Permission to create bases                                                                                                                                       | If set to False, the user cannot create any bases, neither under "My bases" nor in groups. |
| can_add_group                  | 1.0              | Permission to create groups                                                                                                                                      | The permission can_add_dtable is necessary to create bases inside a group. Existing groups are not affected by this permission.  |
| can_generate_external_link     | 1.0              | Permission to create external links                                                                                                                              |       |
| can_create_common_dataset      | 1.0              | Permission to create common datasets (CDS)                                                                                                                       | If set to False, the user cannot create CDS, but the user can access existing CDS. |
| can_use_advanced_permissions   | 1.1              | Permission to use advanced permissions                                                                                                                           | Advanced permissions include table permissions, column permissions, view share, custom sharing permissions, row locking. |
| can_run_python_script          | 1.4              | Permission to run Python scripts                                                                                                                                 | Does not apply to org users. The execution of Python scripts requires the installation of [Python Pipeline](../installation/components/python-pipeline.md).  |
| can_use_advanced_customization | 2.0              | Permission to use advanced customizations                                                                                                                        | Advanced customization includes base security settings. |
| can_use_external_app           | 2.2              | Permission to create and manage apps                                                                                                                             | If set to False, the app-icon is hidden in the base.  The user can still access existing apps. |
| can_use_automation_rules       | 2.2              | Permission to create and manage automation rules                                                                                                                 | If set to False, the menu item "Automation rules" is hidden in the base. Does not apply to org users.                                                                                                                |
| can_archive_rows               | 2.3              | Permission to manage big data and move rows into the big data storage                                                                                            | If set to False, the user cannot enable/disable big data management in a base, nor can the user move rows into big data storage; if set to False, but big data is enabled in a base, the user can create big data views and access big data view as well as unarchive rows.    |

## Quotas

The following quotas are supported in roles:

| Quota                          | Added in version | Description                                                                                                                                                      | Additional information                                                                                                                        |
| ------------------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| role_asset_quota               | 1.0              | Total storage quota for all personal bases: '1G' means a limit of one gigabyte for files and images (assets); '' means no storage quota for assets               | Assets in shared bases owned by another user and assets in group bases do not count against the storage quota. Does NOT apply to org users.  |
| row_limit                      | 1.0              | Total row limit for all personal bases: 10000 means a limit of 10 000 rows; -1 means no row limit                                                                | Rows in shared bases owned by another user, rows in group bases, and rows in the big data storage do not count against the row limit. Does NOT apply to org users.   |
| big_data_row_limit             | 3.1              | Total row limit in big data storage for all bases: 100000 means a limit of 100 000 rows; no value means no row limit                                             | This item is used for the role of teams rather than users. Does NOT apply to org users. |
| scripts_running_limit          | 2.3              | Total number of _Python_ scripts run within a month: 100 means 100 script runs per month; -1 means unlimited script runs                                         | The script run counter is reset at the beginning of every month.  |
| snapshot_days                  | 2.1              | Retention period for snapshots in days. 180 means a storage period of 180 days; no value means an unlimited retention period                                     | Snapshots older than the retention period are automatically removed.   |
| share_limit                    |                  | Max number of users a base can be shared with                                                                                                                     |    |

## Standard Roles

The two standard roles `default`and `guest`are defined as follows:

```python
ENABLED_ROLE_PERMISSIONS = {
    'default': {
        'can_add_dtable': True,
        'can_add_group': True,
        'can_generate_external_link': True,
        'role_asset_quota': '',
        'row_limit': -1,
        'can_create_common_dataset': True,
        'can_run_python_script': True,
        'can_schedule_run_script': True,
        'scripts_running_limit': -1,
        'can_use_advanced_permissions': True,
        'can_use_advanced_customization': True,
        'can_use_external_app': True,
        'can_use_automation_rules': True,
        'snapshot_days': 180,
        'share_limit': 100,
        'can_archive_rows': True,
        'big_data_row_limit': -1
    },
    'guest': {
        'can_add_dtable': False,
        'can_add_group': False,
        'can_generate_external_link': False,
        'role_asset_quota': '',
        'row_limit': -1,
        'can_create_common_dataset': False,
        'can_run_python_script': False,
        'can_schedule_run_script': False,
        'scripts_running_limit': -1,
        'can_use_advanced_permissions': False,
        'can_use_advanced_customization': False,
        'can_use_external_app': False,
        'can_use_automation_rules': False,
        'snapshot_days': 30,
        'share_limit': 100,
        'can_archive_rows': False
    },
}
```

If you want to edit the standard roles, copy the above codeblock to `dtable_web_settings.py`and modify as per your needs. Restart SeaTable for the changes to take effect.

## Custom Roles

You can add extra roles by extending the codeblock in `dtable_web_settings.py`.

To add a role `employee`, for example, add the following lines (beginning at `'employee'` and ending at `},` ) to the existing role definition.

```
ENABLED_ROLE_PERMISSIONS = {
    'employee': {
        'can_add_dtable': True,
        'can_add_group': False,
        'can_create_common_dataset': False
    },
}
```

Restart SeaTable for the new role to become available in SeaTable.
