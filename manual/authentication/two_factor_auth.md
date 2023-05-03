# Two-Factor Authentication

Two-factor authentication (2FA) provides an extra layer of security against unauthorized access by requiring an additional piece of information besides username and password.

SeaTable supports time-based, one-time passwords (TOTP) as a second factor with the default authentication.

A TOTP app such as Google Authenticator or [2FAS](https://2fas.com/) is required to use 2FA with SeaTable.

## Global Configuration

To enable 2FA, add the following configuratiaon in the configuration file `dtable_web_settings.py`:

```
ENABLE_TWO_FACTOR_AUTH = True # Default value is False.
```

Optionally, 2FA can be enforced for for all users. If you wish to do that, add the following configuration to `dtable_web_settings`:

```
ENABLE_FORCE_2FA_TO_ALL_USERS = True # Defaule value is False.
```

Note: When disabling 2FA enforcement by changing `True` to `False`, 2FA is disabled for all users.

## User-specific Configuration

System and team administrators can enforce 2FA for individual users in system and team administration of SeaTable's web interface, respectively.
