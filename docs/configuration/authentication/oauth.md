---
description: Set up OAuth single sign-on in SeaTable with providers like GitHub or Google by configuring dtable_web_settings.py.
---

# OAuth

<!-- md:flag enterprise -->

OAuth 2.0 is an open standard for delegated authorization that is widely used for single sign-on (SSO). SeaTable can authenticate users against any OAuth 2.0 provider that exposes the standard authorization, token, and user-info endpoints, such as GitHub or Google.

Unlike the [SAML](./saml.md) integration, the OAuth provider is not configured through a metadata document; instead, you enter the provider's endpoints manually.

## Registering the application in the provider

First, register a client application on the OAuth provider (for example on [GitHub](https://github.com/settings/developers)). During registration:

- Note the **Client ID** and **Client Secret**.
- Set the **Redirect URI** (called "Authorization callback URL" on GitHub) to `https://<YOUR_SEATABLE_SERVER_HOSTNAME>/oauth/callback/`.

## Configuration

To enable OAuth, add the following parameters to `dtable_web_settings.py`, customize the values to your environment, and [restart SeaTable](../../maintenance/restart-seatable.md).

The following parameters are **required**:

| Parameter               | Description                                                                                                  | Values                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| ENABLE_OAUTH            | On/off switch for authentication via OAuth                                                                    | `True` or `False`                                                |
| OAUTH_CLIENT_ID         | The Client ID obtained when registering the application                                                       | Alphanumeric string                                              |
| OAUTH_CLIENT_SECRET     | The Client Secret obtained when registering the application                                                   | Alphanumeric string                                              |
| OAUTH_PROVIDER_DOMAIN   | Name SeaTable uses internally to distinguish OAuth from other login methods and stored as the `provider`      | Alphanumeric string, e.g. `github.com`                           |
| OAUTH_AUTHORIZATION_URL | The provider's authorization endpoint                                                                         | URL, e.g. `https://github.com/login/oauth/authorize`            |
| OAUTH_TOKEN_URL         | The provider's token endpoint                                                                                 | URL, e.g. `https://github.com/login/oauth/access_token`         |
| OAUTH_USER_INFO_URL     | The provider's user-info endpoint                                                                             | URL, e.g. `https://api.github.com/user`                         |
| OAUTH_REDIRECT_URL      | The redirect URI registered in the provider (must match exactly)                                              | URL ending in `/oauth/callback/`                                |
| OAUTH_ATTRIBUTE_MAP     | Mapping of the user fields returned by the provider to the user fields in SeaTable (see below)                | Key-value pairs                                                  |

The following parameters are **optional**:

| Parameter                          | Description                                                                                                                                                                             | Values                                  |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| OAUTH_SCOPE                        | The scopes requested from the provider; default value is ''                                                                                                                            | List of strings, e.g. `["user"]`        |
| OAUTH_ENABLE_INSECURE_TRANSPORT    | Allows OAuth over plain HTTP for setups without HTTPS. Required by the underlying `requests-oauthlib` library when no TLS is configured; default value is `False`                       | `True` or `False`                       |
| OAUTH_ACCESS_TOKEN_IN_URI          | Passes the access token in the query string of the user-info request. Some providers require this; default value is `False`                                                            | `True` or `False`                       |
| OAUTH_CREATE_UNKNOWN_USER          | Just-in-time provisioning: create a SeaTable account on first successful login; default value is `True`                                                                                 | `True` or `False`                       |
| OAUTH_ACTIVATE_USER_AFTER_CREATION | Whether auto-provisioned users are active immediately. Set to `False` to create them inactive and require administrator approval; default value is `True`                              | `True` or `False`                       |

This is a sample configuration for GitHub:

```python
ENABLE_OAUTH = True
OAUTH_ENABLE_INSECURE_TRANSPORT = True
OAUTH_PROVIDER_DOMAIN = 'github.com'
OAUTH_CLIENT_ID = 'your-client-id'
OAUTH_CLIENT_SECRET = 'your-client-secret'
OAUTH_REDIRECT_URL = 'https://<YOUR_SEATABLE_SERVER_HOSTNAME>/oauth/callback/'
OAUTH_AUTHORIZATION_URL = 'https://github.com/login/oauth/authorize'
OAUTH_TOKEN_URL = 'https://github.com/login/oauth/access_token'
OAUTH_USER_INFO_URL = 'https://api.github.com/user'
OAUTH_SCOPE = ["user"]
OAUTH_ATTRIBUTE_MAP = {
    "id": "uid",
    "name": "name",
    "email": "contact_email",
}
```

### OAUTH_ATTRIBUTE_MAP

`OAUTH_ATTRIBUTE_MAP` maps the fields returned by the provider's user-info endpoint to the fields in SeaTable. Each entry has the form `"<provider field>": "<seatable field>"`, where the two sides behave differently:

- The **key** (left side) is the field name as your provider delivers it, and this is the side you adjust. GitHub, for example, returns the fields `id`, `name`, and `email`.
- The **value** (right side) is the SeaTable target field and is fixed. SeaTable only recognizes the values listed below; any other value is ignored.

So if your provider returns the email address in a field called `mail`, you change only the key, as in `"mail": "contact_email"`.

| SeaTable field (value) | Required | Description                                                                                                  |
| ---------------------- | -------- | ----------------------------------------------------------------------------------------------------------- |
| uid                    | yes      | The unique identifier by which SeaTable recognizes a returning user. It must never change over the user's lifetime; if it changes, SeaTable creates a new user. |
| name                   | no       | The display name (nickname) of the user in SeaTable                                                          |
| contact_email          | no       | The contact email address of the user in SeaTable                                                            |
| user_role              | no       | The role assigned to the user in SeaTable                                                                    |
| employee_id            | no       | The user's ID within the organization (stored as `id_in_org`)                                                |

!!! tip "Controlling auto-provisioning"

    By default SeaTable creates a user account on the first successful OAuth login (`OAUTH_CREATE_UNKNOWN_USER = True`). To stop new accounts from being created while keeping existing OAuth users working, set `OAUTH_CREATE_UNKNOWN_USER = False`. New users must then be provisioned in SeaTable beforehand, either by an administrator or via import.

    To keep auto-provisioning on but have new accounts created in an inactive state that requires administrator approval, set `OAUTH_ACTIVATE_USER_AFTER_CREATION = False`.

## Provider notes

When configuring Google as the OAuth provider, the scope must be set as follows:

```python
OAUTH_SCOPE = [
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
]
```

Set the authorization, token, and user-info URLs as well as the scope according to the documentation of your OAuth provider. For GitHub, see [Authorizing OAuth apps](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps).

## Testing

After restarting, navigate to the login page of your SeaTable Server, click on **Single Sign-On**, and try to log in. If the configuration is correct, you are redirected to the provider's login. After a successful login you are redirected back to SeaTable.

Check `dtable_web.log` for troubleshooting information if authentication fails.

!!! warning "SAML takes precedence over OAuth"

    The login page exposes a single **Single Sign-On** button that routes to one method only. If both SAML and OAuth are enabled at the same time, this button always goes to SAML, and OAuth is never reached through it. Enable only one of the two for interactive login.

## Custom OAuth (advanced)

For providers that cannot be handled by the standard configuration above, SeaTable offers a custom OAuth mode. When `ENABLE_CUSTOM_OAUTH = True`, SeaTable loads custom `custom_oauth_login` and `custom_oauth_callback` functions from `seatable_custom_functions.custom_oauth` in the `conf` directory, allowing you to implement provider-specific login and callback logic yourself.

```python
ENABLE_CUSTOM_OAUTH = True
```

This is an advanced extension point intended for special integrations and requires you to provide the custom Python module. If the module cannot be imported, SeaTable silently falls back to standard OAuth handling.
