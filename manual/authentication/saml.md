# SAML

Security Assertion Markup Language (SAML) is an open standard for exchanging authentication and authorization data between parties. An important use case of SAML is web-browser single sign-on (SSO).

This document assumes that you have a basic understanding of SAML and that you understand the related terminology.

This document illustrates the configuration of SAML in general and then the SAML configuration with Microsoft Azure. The approach can be generalized for other SAML identity providers (IdPs). 

!!! note

        SeaTable's SAML configuration was modified substantially in SeaTable 3.5. The SAML configuration in prior versions was much more extensive and is no longer shown here.

## What is needed in general to configure SAML

To configure SAML Authentication with any Identity Provider the following information is needed:

- identity provider metadata (this is an URL)
- identity Provider certificate file
- description of the SAML attributes provides by the identity provider

With this information, the setup of SAML authentication should be possible without any difficulties.

## Step 1: Create certificate and key on SeaTable Server

Create a directory for the certificates in the SeaTable container. We recommend to use `/opt/seatable/seatable-data/certs` which is usually mapped inside the SeaTable docker container to `/opt/seatable/seahub-data/certs`.
These are the commands to create this directory and a certificate and a key:

```
# mkdir -p /opt/seatable/seatable-data/certs
# cd /opt/seatable/seatable-data/certs
# openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout sp.key -out sp.crt
```

## Step 2: Get certificate of the IdP

Every IdP has to provide a certificate to download. This certificate has to be saved with the name `idp.crt` at this just created certs folder `/opt/seatable/seatable-data/certs` too.

In the end your certs folder should look like this:

```
# ls /opt/seatable/seatable-data/certs
idp.crt  sp.crt  sp.key
```

## Step 3: Configure SeaTable

To enable SAML, add the following parameters to `dtable_web_settings.py`, customize the values to your environment and then restart the SeaTable service:

| Parameter                | Description                                                 | Values                                                       |
| ------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------ |
| ENABLE_SAML              | On/off switch for authentication via SAML                   | `True` or `False`                                            |
| SAML_PROVIDER_IDENTIFIER | Internal name for SAML authentication provider              | Alphanumeric string, e.g., "Azure", "Auth0" or "Authentik"   |
| SAML_REMOTE_METADATA_URL | URL of metadata.xml used by SAML IdP                        | URL, e.g. 'https://login.microsoftonline.com/xxx/federationmetadata/2007-06/federationmetadata.xml?appid=xxx' |
| SAML_ATTRIBUTE_MAP       | Key-value pairs mapping SAML attributes to local attributes | Keys are the SAML attributes from the IdP; some IdPs use attribute like 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress' |
| SAML_CERTS_DIR           | Optional, path where certificates are saved inside the container | /path/to/certs                                          |  

This is a sample configuration. Adapt the values to your needs.

```
ENABLE_SAML = True
SAML_PROVIDER_IDENTIFIER = 'MySAMLProvider'
SAML_REMOTE_METADATA_URL = 'https://login.microsoftonline.com/xxx/federationmetadata/2007-06/federationmetadata.xml?appid=xxx'
SAML_ATTRIBUTE_MAP = {
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn': 'uid',
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': 'contact_email',
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': 'name',
}
SAML_CERTS_DIR = '/opt/seatable/seahub-data/certs'
```

### Details about the SAML_ATTRIBUTE_MAP

The `SAML_ATTRIBUTE_MAP` is responsible to define which values provided by the IdP will be used to either generate or update the user in SeaTable. Currently the mapping supports the following inputs:

- **uid**: unique identifiers from the identity providers. This value should never change. This is **not** the username inside SeaTable.
- **contact_email**: the email address of the user.
- **name**: the name of the user.
- **employee_id**: the ID of the user which can be used for filters inside SeaTable. Refer to [Authentication Overview](./auth_overview.md) for more details about this `id_in_org`.
- **user_role**: the name of the role in SeaTable.

The `uid`, `contact_email` and `name` are mandatory. The `employee_id` and `user_role` are optional. 

!!! Hint

        The uid should be a value that never changes for a user. If you choose the email address and change that email address, a new user will be created after the next login.

If you configure the `SAML_ATTRIBUTE_MAP` you always have to replace the **keys** of the array with the names provides by the IdP.
Your SAML_ATTRIBUTE_MAP always has to look like this:

```
SAML_ATTRIBUTE_MAP = {
    'replace-this': 'uid',
    'replace-this': 'contact_email',
    'replace-this': 'name',
}
```

## Step 4: Restart and test

A restart of the SeaTable service to activate the configuration settings. 

```
# docker exec -it seatable bash
# seatable.sh restart
```

Then go to the login page of your SeaTable Server, click on "Single sign-on" and try to log in. If any error occurs, check `dtable_web.log` for error messages.

## Example: Azure SAML

Add an application in Azure (for more info, see https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal).

Assign users to the new application (for more info, see https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal-assign-users).

Set up SSO with SAML:

![img](https://manual.seatable.io/images/auto-upload/1678343328227.jpg)

Download base64 format signing certificate and save it as `idp.crt` in the earlier created directory for certificates. Don't forget to generate the `sp.key` and `sp.crt`.

![img](https://manual.seatable.io/images/auto-upload/1678343483221.jpg)

According to the screenshots, the seatable configuration in `dtable_web_settings.py` should look like this:

```
ENABLE_SAML = True
SAML_PROVIDER_IDENTIFIER = 'Azure'
SAML_REMOTE_METADATA_URL = 'https://login.microsoftonline.com/826f1810-ccc9-.../federationmetadata/2007-06/federationmetadata.xml?appid=...'
SAML_ATTRIBUTE_MAP = {
    'uid': 'uid',
    'mail': 'contact_email',
    'name': 'name',
}
```