# SAML

Add the following configuration to dtable_web_settings.py.

```
ENABLE_SAML = True
SAML_METADATA_LOCAL_FILE = '/path/to/idp'
SAML_METADATA_REMOTE_URL = 'https://samltest.id/saml/idp'
SAML_PROVIDER_DOMAIN = 'SAMLtest'
SAML_ATTRIBUTE_MAP = {
    'uid': 'uid',
    'mail': 'contact_email',
    'displayName': 'name',
    'telephoneNumber': 'phone',
    ... 
}
SAML_ENTITY_ID = 'https://test.seatable.cn/sp.xml'

# The following options are optional
SAML_NAME_ID_FORMAT = 'email'
SAML_DEFAULT_NEXT_URL = '/'

```

**Note: Select one of SAML_METADATA_LOCAL_FILE and SAML_METADATA_REMOTE_URL to configure.**

The meaning of each configuration option is as follows:

#### SAML_METADATA_LOCAL_FILE、SAML_METADATA_REMOTE_URL

Access the file or the URL to obtain the metadata of the SAML IdP.

See more in <https://pysaml2.readthedocs.io/en/latest/howto/config.html#metadata>

#### SAML_PROVIDER_DOMAIN

SeaTable uses this configuration to distinguish SAML from other login methods，such as: SAMLtest

#### SAML_ATTRIBUTE_MAP

The correspondence between the user fields obtained from the SAML IdP authorization server and the user fields in SeaTable.

* uid: the unique identifier for SeaTable identify a user from the SAML IdP provider.
* name: the name of a user in SeaTable.
* contact_email: a user's contact email in SeaTable.
* phone: a user's phone number in SeaTable.

#### SAML_ENTITY_ID

Visit this URL to get the metadata of SAML SP (that is, SeaTable Service).

See more in <https://pysaml2.readthedocs.io/en/latest/howto/config.html#entityid>

#### SAML_NAME_ID_FORMAT

See more in <https://pysaml2.readthedocs.io/en/latest/howto/config.html#name-id-format>

#### SAML_DEFAULT_NEXT_URL

After SAML login is successful, it will be redirected to the specified URL, the default is'/', which is the homepage.

