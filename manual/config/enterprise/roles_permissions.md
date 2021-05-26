# Roles and Permissions Support

SeaTable comes with two build-in roles `default` and `guest`.

> Note: roles and permissions are only supported in enterprise edition

## Edit build-in roles

If you want to edit the permissions of build-in roles, you can add following lines to `dtable_web_settings.py` with corresponding permissions set to `True`.

```python
ENABLED_ROLE_PERMISSIONS = {
    'default': {
        'can_add_dtable': True,
        'can_add_group': True,
        'can_use_global_address_book': True,
        'can_generate_share_link': True,
        'can_invite_guest': False,
        'role_asset_quota': '',
        'row_limit': -1,   # -1 means no limit
        'can_create_common_dataset': True,
        'can_generate_external_link': True,
        'can_run_python_script': True,
        'can_use_advanced_permissions': False,  # The default is False, set to the True to enable advanced permissions, such as view sharing and column permissions
        'snapshot_days': 180
        'scripts_running_limit': -1, # The limits for calling the script, -1 means no limit
    },
    'guest': {
        'can_add_dtable': False,
        'can_add_group': False,
        'can_use_global_address_book': False,
        'can_generate_share_link': False,
        'role_asset_quota': '',
        'row_limit': -1,   # -1 means no limit
        'snapshot_days': 30
    },
}

```

## Add custom roles

If you want to add a new role and assign some users with this role, e.g. new role `employee`. You can add following lines to `dtable_web_settings.py`.

```python
ENABLED_ROLE_PERMISSIONS = {
    ...,
    'employee': {
        'can_add_dtable': True,
        'can_add_group': False,
        'can_create_common_dataset': False
    },
}

```


