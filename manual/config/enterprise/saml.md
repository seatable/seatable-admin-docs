# SAML SSO

In this document, we use Azure SAML to show the steps to connect SeaTable with SAML. Other SAML provider should be similar.

## Prepare Certs File

Create certs dir

```
docker exec -it seatable bash
cd /opt/seatable/seahub-data
mkdir certs
cd certs
```

You can generate them by:

```
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout sp.key -out sp.crt
```

## Configure Azure SAML

Add application: <https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal>

Assign users: <https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal-assign-users>

Set up SSO: <https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal-setup-sso>

![](../../images/auto-upload/003.png)

Set user attributes: <https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-claims-mapping-policy-type>

![](../../images/auto-upload/004.png)

Download base64 format signing certificate and metadata XML file, put them under the certs(/opt/seatable/seahub-data/certs) directory.

![](../../images/auto-upload/001.png)

## Configure SeaTable

Add the following configuration to dtable_web_settings.py

```python
ENABLE_SAML = True
SAML_PROVIDER_DOMAIN = 'azure.saml'
# 'Key' is the user attribute of Azure SAML, 'value' is the user attribute of SeaTable. The uid attribute of SeaTable is required.
SAML_ATTRIBUTE_MAP = {
    'uid': 'uid',
    'mail': 'contact_email',
    'name': 'name',
    'employeeid': 'employee_id',   # Syncing user's employee ID from SAML
    'jobtitle': 'user_role',   # Syncing user's role from SAML
}
from os import path
import saml2
import saml2.saml
CERTS_DIR = '/opt/seatable/seahub-data/certs/'
SP_SERVICE_URL = 'https://test.seatable.cn'
XMLSEC_BINARY = '/usr/bin/xmlsec1'   # full path to the xmlsec1 binary programm
ATTRIBUTE_MAP_DIR = '/opt/seatable/seatable-server-latest/dtable-web/seahub/saml/attribute-maps'
SAML_CONFIG = {
    'entityid': SP_SERVICE_URL + '/saml2/metadata/',   # your entity id
    'xmlsec_binary': XMLSEC_BINARY,
    'allow_unknown_attributes': True,
    'attribute_map_dir': ATTRIBUTE_MAP_DIR,
    # this block states what services we provide
    'service': {
        # we are just a lonely SP
        'sp': {
            'allow_unsolicited': True,
            'required_attributes': ['uid'],   # attributes that this SP need to identify a user
            'name': 'Federated SeaTable Service',
            'name_id_format': saml2.saml.NAMEID_FORMAT_EMAILADDRESS,
            'endpoints': {
                'assertion_consumer_service': [
                    (SP_SERVICE_URL + '/saml/acs/', saml2.BINDING_HTTP_POST),
                ],
            },
            'idp': {
                # App Federation Metadata URL
                'https://login.microsoftonline.com/xxx/federationmetadata/2007-06/federationmetadata.xml?appid=xxx': {
                    'single_sign_on_service': {
                        # SingleSignOnService
                        saml2.BINDING_HTTP_REDIRECT: 'https://login.microsoftonline.com/xxx/saml2',
                    },
                    'single_logout_service': {
                        # SingleLogoutService
                        saml2.BINDING_HTTP_REDIRECT: 'https://login.microsoftonline.com/xxx/saml2',
                    },
                },
            },
        },
    },
    'metadata': {
        'local': [path.join(CERTS_DIR, 'idp_federation_metadata.xml')],   # where the idp metadata is stored
    },
    'debug': 1,   # set to 1 to output debugging information
    'cert_file': path.join(CERTS_DIR, 'idp.crt'),   # Signing from IdP
    'encryption_keypairs': [{
        'key_file': path.join(CERTS_DIR, 'sp.key'),   # private part
        'cert_file': path.join(CERTS_DIR, 'sp.crt'),   # public part
    }],
    'valid_for': 24*365,   # how long is our metadata valid
}

```

### Upload the metadata of SeaTable

Restart SeaTable, enter the entity id URL of SeaTable in the browser, e.g. <https://test.seatable.cn/saml2/metadata/>, download the web page content to the local, name it sp.xml, and upload it to the Azure SAML application.

![](../../images/auto-upload/002.png)

Log in to the SeaTable homepage, click single sign-on, and use the user assigned to Azure SAML to perform a SAML login test.

## FAQ

### Login abnormal

Please check the dtable_web.log log file. If there are errors such as `Signature missing for assertion` or `Signature missing for response` in the log, it means that the certificate signature method of the IdP (ie Azure SAML) does not match the configuration of the SP (ie SeaTable) , you need to add the following options in the SAML_CONFIG:

```python
SAML_CONFIG = {
    ...

    'service': {
        'sp': {
            ...

            'want_response_signed': False,
            'want_assertions_signed': False,
            'want_assertions_or_response_signed': True,

            ...
        },
    },

    ...
}

```

Reference: <https://pysaml2.readthedocs.io/en/latest/howto/config.html#want-assertions-or-response-signed>
