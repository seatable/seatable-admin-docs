# SAML SSO

In this document, we use Azure SAML to show the steps to connect SeaTable with SAML. Other SAML provider should be similar.

**Important:** The following configuration only works with SeaTable 3.5. and newer. The configuration of SAML for older versions is much more extensive and is no longer shown here. Upgrade to SeaTable 3.5 or later to use this configuration.

1\. Prepare Certs File

Create certs dir

```
$ docker exec -it seatable bash
# mkdir -p /opt/seatable/seahub-data/certs
```

You can generate them by:

```
# cd /opt/seatable/seahub-data/certs
# openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout sp.key -out sp.crt
```

2\. Configure SeaTable

Add the following configuration to `dtable_web_settings.py`, change the values according to your needs and then restart SeaTable:

```python
ENABLE_SAML = True
SAML_REMOTE_METADATA_URL = 'https://login.microsoftonline.com/xxx/federationmetadata/2007-06/federationmetadata.xml?appid=xxx'
SAML_PROVIDER_IDENTIFIER = 'azure'
SAML_ATTRIBUTE_MAP = {
    'uid': 'uid',
    'mail': 'contact_email',
    'name': 'name',
    'employeeid': 'employee_id',
    'jobtitle': 'user_role',
}
```

**Important:**

- `SAML_PROVIDER_IDENTIFIER` is used in SeaTable internally to distinguish different SSO provider for the same user.
- Only change the keys ('Key': 'Value') of the `SAML_ATTRIBUTE_MAP` to the names of your SAML attributes you are using. Some IdP use attribute names like `http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`. 


__Note__: If certificates are **not placed in** the `/opt/seatable/seahub-data/certs` directory, you need to add the following configuration in dtable_web_settings.py:

```python
SAML_CERTS_DIR = '/path/to/certs'
```

3\. Configure Azure SAML

Add application: <https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal>

Assign users: <https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal-assign-users>

Set up SSO with SAML: 

![](../../images/auto-upload/1678343328227.jpg)

4\. Upload Azure AD certificate

Download base64 format signing certificate, put it under the certs(/opt/seatable/seahub-data/certs) directory.

![](../../images/auto-upload/1678343483221.jpg)

5\. Log in to the SeaTable homepage, click single sign-on, and use the user assigned to Azure SAML to perform a SAML login test.
