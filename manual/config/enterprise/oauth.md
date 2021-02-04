# OAuth

First, register the Client App on the OAuth authorization server (such as [Github](https://github.com/settings/developers)), remember the Client ID and Client Secret, and set the Redirect Uri (Authorization callback URL in Github).

Add the following configuration to dtable_web_settings.py:

```
ENABLE_OAUTH = True
OAUTH_ENABLE_INSECURE_TRANSPORT = True
OAUTH_PROVIDER_DOMAIN = 'github.com'
OAUTH_CLIENT_ID = "wd529b3b2ae8320e06fr"
OAUTH_CLIENT_SECRET = "8159c3dcc8ef197cc3bbd94ff6cf101c93ba6d8r"
OAUTH_REDIRECT_URL = 'https://test.seatable.cn/oauth/callback/'
OAUTH_AUTHORIZATION_URL = 'https://github.com/login/oauth/authorize'
OAUTH_TOKEN_URL = 'https://github.com/login/oauth/access_token'
OAUTH_USER_INFO_URL = 'https://api.github.com/user'
OAUTH_SCOPE = ["user",]
OAUTH_ATTRIBUTE_MAP = {
    "id": "uid",
    "name": "name",
    "email": "contact_email",
}

```

The meaning of configuration option is as follows:

#### **ENABLE_OAUTH_INSECURE_TRANSPORT**

If https is not configured, you can add it in dtable_web_settings.py `ENABLE_OAUTH_INSECURE_TRANSPORT = True`。

See more in <http://requests-oauthlib.readthedocs.io/en/latest/examples/real_world_example.html>

#### **OAUTH_PROVIDER**

SeaTable uses this configuration to distinguish OAuth from other login methods，such as: github.com.

#### **OAUTH_REDIRECT_URL**

The Redirect URL, Authorization callback URL in Github, such as: https\://test.seatable.cn/oauth/callback/

#### **OAUTH_AUTHORIZATION_URL、OAUTH_TOKEN_URL、OAUTH_USER_INFO_URL、OAUTH_SCOPE**

Set these values according to the document of OAuth provider, for GitHub, please check [https://docs.github.com/en/developers/apps/authorizing-oauth-app](https://docs.github.com/en/developers/apps/authorizing-oauth-apps)

#### **OAUTH_ATTRIBUTE_MAP**

The correspondence between the user fields obtained from the OAuth authorization server and the user fields in SeaTable.

* uid: the unique identifier for SeaTable identify a user from the OAuth provider.
* name: the name of a user in SeaTable
* contact_email: a user's contact email in SeaTable


