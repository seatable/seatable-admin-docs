# SAML

Security Assertion Markup Language (SAML) is an open standard for exchanging authentication and authorization data between parties. An important use case of SAML is web-browser single sign-on (SSO).

This document assumes that you have a basic understanding of SAML and that you understand the related terminology.

This document illustrates the SAML configuration with Microsoft Azure. The approach can be generalized for other SAML identity providers (IdPs). 

**Important:** SeaTable's SAML configuration was modified substantially in SeaTable 3.5. The SAML configuration in prior versions was much more extensive and is no longer shown here.

## Prepare Certificate and Key

Create a directory for certificates in the SeaTable container:

```
$ docker exec -it seatable bash
# mkdir -p /opt/seatable/seahub-data/certs
```

Change into the directory and create certificate and key:

```
# cd /opt/seatable/seahub-data/certs
# openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout sp.key -out sp.crt
```

## Configure SeaTable

Add the following configuration to `dtable_web_settings.py`:

```
ENABLE_SAML = True
SAML_PROVIDER_IDENTIFIER = 'Azure'
SAML_REMOTE_METADATA_URL = 'https://login.microsoftonline.com/xxx/federationmetadata/2007-06/federationmetadata.xml?appid=xxx'
SAML_ATTRIBUTE_MAP = {
    'uid': 'uid',
    'mail': 'contact_email',
    'name': 'name',
    'employeeid': 'employee_id',
    'jobtitle': 'user_role',
}
```

To enable SAML, add the following parameters to `dtable_web_settings.py`, customize to your environment, and restart the SeaTable service:

| Parameter                | Description                                                 | Values                                                       |
| ------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------ |
| ENABLE_SAML              | On/off switch for authentication via SAML                   | `True` or `False`                                            |
| SAML_PROVIDER_IDENTIFIER | Internal name for SAML authentication provider              | Alphanumeric string, e.g., "Azure"                           |
| SAML_REMOTE_METADATA_URL | URL of metadata.xml used by SAML IdP                        | URL, e.g. 'https://login.microsoftonline.com/xxx/federationmetadata/2007-06/federationmetadata.xml?appid=xxx' |
| SAML_ATTRIBUTE_MAP       | Key-value pairs mapping SAML attributes to local attributes | Keys are the SAML attributes - only change those; some IdPs use attribute like 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress' |

This is a sample configuration:

```
ENABLE_SAML = True
SAML_PROVIDER_IDENTIFIER = 'Azure'
SAML_REMOTE_METADATA_URL = 'https://login.microsoftonline.com/xxx/federationmetadata/2007-06/federationmetadata.xml?appid=xxx'
SAML_ATTRIBUTE_MAP = {
    'uid': 'uid',
    'mail': 'contact_email',
    'name': 'name',
    'employeeid': 'employee_id',
    'jobtitle': 'user_role',
}
```

Note: If certificates are not placed in `/opt/seatable/seahub-data/certs`, add the following parameter to the SAML configuration in `dtable_web_settings.py` to account for the custom path:

```
SAML_CERTS_DIR = '/path/to/certs'
```

### Configure Azure SAML

Add an application in Azure (for more info, see https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal).

Assign users to the new application (for more info, see https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal-assign-users).

Set up SSO with SAML:

![img](https://manual.seatable.io/images/auto-upload/1678343328227.jpg)

## Upload Azure AD certificate

Download base64 format signing certificate and save it in the earlier created directory for certificates.

![img](https://manual.seatable.io/images/auto-upload/1678343483221.jpg)



## Test SAML Login

Go to the login page of your SeaTable Server and click on "Single sign-on". Try to log in.
