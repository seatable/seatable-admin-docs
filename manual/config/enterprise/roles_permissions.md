# User Roles

In SeaTable Enterprise Edition (SeaTable EE), a user's permissions are determined by the role assigned to the user.

SeaTable has two standard roles. Additionally, extra roles can be created for more fine-grained permission management. All changes relating to the SeaTable's roles are done in the configuration file `dtable_web_settings.py`.

NOTE: Admin privileges are not part of the user role.



## Available Permissions

SeaTable version 2.3 supports 17 permissions:

| Permission                   | Added in version | Description                                                  | Additional information                                       |
| ---------------------------- | ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| can_add_dtable               | 1.0              | Permission to create bases.                                  |                                                              |
| can_add_group                | 1.0              | Permission to create groups.                                 | The user creating a group becomes automatically the group's owner. The permission can_add_dtable is necessary to create bases inside a group. |
| can_use_global_address_book  | 1.0              | Enables autocomplete of names and emails of other users in the system. | If cloud_mode = True in `dtable_web_settings.py`, autocomplete is disabled for personal accounts and autocomplete is enabled inside teams. |
| can_generate_share_link      | 1.0              | Permission  to create invite links.                          |                                                              |
| can_generate_external_link   | 1.0              | Permission to create external links.                         |                                                              |
| role_asset_quota             | 1.0              | Storage  quota for files and images inside a user's bases. '1G' means a storage quota of one gigabyte; an empty value '' means no storage quota. | Files in shared bases owned by other users do not count against the user's storage quota. |
| row_limit                    | 1.0              | Row limit for all bases of the user. '10000' (with quotes) means a limit of 10.000 rows; '-1' (with quotes) means no row limit. | Rows in shared bases owned by other users do not count against the row limit.  Archived rows does not count against the limit either. |
| can_create_common_dataset    | 1.0              | Permission to create common datasets (CDS). If set to False, the user cannot create CDS, but the user can access existing CDS. |                                                              |
| can_use_advanced_permissions | 1.1              | Permission to use advanced permissions.                      | Advanced  permissions include table permissions, column permissions, view share, custom  sharing permissions, row locking, and base security settings. |
| can_run_python_script        | 1.4              | Permission to run Python scripts.                            | The execution of Python scripts requires [the installation of FAAS Scheduler and Python Runner](https://manual.seatable.io/docker/Python-Runner/Deploy%20SeaTable%20Python%20Runner/). |
| snapshot_days                | 2.1              | Retention period for snapshots in days. 180 (without quotes) means a storage period of 180 days; no value means an unlimited retention period. | Snapshots older than the retention period are automatically removed. |
| can_use_external_app         | 2.2              | Permission to use external apps. If set to False, the menu is not shown. |                                                              |
| can_use_automation_rules     | 2.2              | Permission to create and run automation rules.               |                                                              |
| scripts_running_limit        | 2.3              | Number of *Python* scripts a user can run within a month. 100 (without quotes) means 100 script runs per month; -1 (without quotes) means unlimited script runs. | The script run counter is reset at the beginning of every month. Only visible if  can_run_python_script = True and Python Runner is available. |
| can_schedule_run_script      | 2.3              | Permission to schedule the execution of Python scripts.      | The  permission can_run_python_script is also necessary to automatically run Python scripts. |
| can_archive_rows             | 2.3              | Permission  to archive rows. If set to False, the user cannot archive rows and cannot create archive views. |                                                              |

## Standard Roles

The two standard roles `default`and `guest`are defined as follows:

```python
ENABLED_ROLE_PERMISSIONS = {
    'default': {
        'can_add_dtable': True,
        'can_add_group': True,
        'can_use_global_address_book': True,
        'can_generate_share_link': True,
        'can_generate_external_link': True,
        'role_asset_quota': '',
        'row_limit': -1,
        'can_create_common_dataset': True,
        'can_run_python_script': True,
        'can_use_advanced_permissions': True,
        'snapshot_days': 180,
        'can_use_external_app': True,
        'can_use_automation_rules': True,
        'scripts_running_limit': -1,
        'can_schedule_run_script': True,
        'can_archive_rows': True
    },
    'guest': {
        'can_add_dtable': False,
        'can_add_group': False,
        'can_use_global_address_book': False,
        'can_generate_share_link': False,
        'can_generate_external_link': True,
        'role_asset_quota': '',
        'row_limit': -1,
        'can_create_common_dataset': False,
        'can_run_python_script': True,
        'can_use_advanced_permissions': False,
        'snapshot_days': 30,
        'can_use_external_app': True,
        'can_use_automation_rules': True,
        'scripts_running_limit': -1,
        'can_schedule_run_script': True,
        'can_archive_rows': True
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
