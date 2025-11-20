---
status: wip
---

# LDAP

Lightweight Directory Access Protocol (LDAP) is is an open, vendor-neutral, industry standard application protocol for accessing and maintaining distributed directory information services. Microsoft's Active Directory (AD) is fully compatible with LDAP. For simplicity, this Manual refers to LDAP and AD when using the term LDAP unless explicitly stated otherwise.

## LDAP integration in SeaTable

SeaTable supports two modes of operation with LDAP:

- **LDAP authentication**: SeaTable uses the LDAP Server for user authentication.
- **LDAP synchronisation**: SeaTable syncs users and groups with the LDAP server regularly.

!!! success "LDAP can be combined with SAML"

    SeaTable supports multiple authentication methods simultaneously. You can have a local administrator account stored in the SeaTable database, while other users authenticate via LDAP or SAML.

    Additionally, SeaTable enables seamless integration where user data is regularly synchronized from LDAP, but authentication is exclusively handled via SAML. This allows user accounts to be created, activated, and deactivated on schedule through LDAP synchronization, while login is simplified and secured through SAML Single Sign-On (SSO).

    More details [at the end of this article](#ldap-and-saml).

## LDAP Authentication

To enable Authentification via LDAP, add the following parameters to `dtable_web_settings.py`, customize to your environment, and restart the SeaTable service:

### Mandatory parameters

| Parameter                 | Description                                                                        | Values                                          |
| ------------------------- | ---------------------------------------------------------------------------------- | ----------------------------------------------- |
| `ENABLE_LDAP`             | On/off switch for authentication via LDAP                                          | `True` or `False`                               |
| `LDAP_PROVIDER`           | Internal identifier to refer to this specific LDAP server                          | Alphanumeric string, e.g. `ldap`                |
| `LDAP_SERVER_URL`         | URL/IP of the LDAP server and port if non-standard                                 | URL/IP, e.g. 'ldap://192.168.0.10:389'          |
| `LDAP_BASE_DN`            | DN of the root node used for querying users - all users under this node can log in | LDAP DN                                         |
| `LDAP_ADMIN_DN`           | DN of the user used for querying the LDAP server                                   | LDAP DN of the admin user                       |
| `LDAP_ADMIN_PASSWORD`     | User password for LDAP_ADMIN_DN user                                               | Password of the admin user                      |
| `LDAP_LOGIN_ATTR`         | LDAP attribute used for logging in                                                 | `mail`, `userPrincipalName` or `sAMAccountName` |
| `LDAP_USER_UNIQUE_ID`     | LDAP attribute used as Unique identifier to identify this user.                    | `uid` or `employeeUUID`                         |
| `LDAP_CONTACT_EMAIL_ATTR` | LDAP attribute used as contact email                                               | `mail`                                          |

This is a sample configuration:

```
ENABLE_LDAP = True
LDAP_PROVIDER = 'my-ldap-server1'
LDAP_SERVER_URL = 'ldap://192.168.0.10'
LDAP_BASE_DN = 'ou=test,ou=test,dc=example,dc=com'
LDAP_ADMIN_DN = 'cn=admin,dc=example,dc=com'
LDAP_ADMIN_PASSWORD = 'topsecret'
LDAP_LOGIN_ATTR = 'mail'
LDAP_USER_UNIQUE_ID = 'uid'
LDAP_CONTACT_EMAIL_ATTR = 'mail'
```

!!! tip "Admin credentials must have the right to access all information"

    The ldap user defined by `LDAP_ADMIN_DN` and `LDAP_ADMIN_PASSWORD` must have the rights to access all information under `LDAP_BASE_DN`. Otherwise the LDAP Login will not work at all.
    This ldap admin user searches the complete LDAP directory for a match with the filter LDAP_LOGIN_ATTR = and ...

!!! warning "Every user needs a unique identifier"

    Names, emails and login attributes may change over time. To make sure that SeaTable always hits the right user, the values for `LDAP_PROVIDER` and `LDAP_USER_UNIQUE_ID` create a unique identifier.
    Therefore it is recommended that you don't change the value of `LDAP_PROVIDER` in your configuration file and that the value of `LDAP_USER_UNIQUE_ID` stays the same for every user.
    Try to avoid using an email, instead use `uid` oder `employeeUUID` or something similar.

!!! example "Use ldapsearch to determine your LDAP structure"

    With `/opt/seatable-server/tools/check-ldap.sh` we provide a simple tool to support you with determine the right BASE_DN and admin credentials. Try to configure everything as you think in your dtable_web_settings.py and then simply execute `check-ldap.sh`. It will do some basic checks and will help you construct a ldapsearch command to search your ldap dictionary.

### Optional parameters

| Parameter                   | Description                                                               | Values                                                         |
| --------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `LDAP_FILTER`               | Filter for users who can log in, e.g. a certain security group            | LDAP filter, e.g. 'memberOf=CN=group,CN=dev,DC=example,DC=com' |
| `LDAP_USER_FIRST_NAME_ATTR` | First part of the user's SeaTable name                                    | `givenName`                                                    |
| `LDAP_USER_LAST_NAME_ATTR`  | Second part of the user's SeaTable name                                   | `sn`                                                           |
| `LDAP_USER_NAME_REVERSE`    | Option to reverse order of first name and last name                       | `True`or `False` (default: `False`)                            |
| `LDAP_USER_ROLE_ATTR`       | Name of user role in the LDAP server                                      | `my_custom_role`                                               |
| `LDAP_EMPLOYEE_ID_ATTR`     | ID of the employee                                                        | `employeeNumber`                                               |
| `LDAP_UPDATE_USER`          | Option to update name, email after successful login                       | `True` or `False` (default: `True`)                            |
| `LDAP_SAML_USE_SAME_UID`    | Option to allow users to log in via LDAP and SAML using the same username | `True`or `False` (default: `False`)                            |

!!! note "Update User after successful login"

    By default the user account is updated after a successful login. Meaning a new role, employee id, name or email is automatically updated in SeaTable.
    With `LDAP_UPDATE_USER` you can disable the update of `name` and `email`. Role and employee id is always updated.

!!! note "Just Name not sur- and lastname"

    You can simply use either LDAP_USER_FIRST_NAME_ATTR or LDAP_USER_LAST_NAME_ATTR and use the attribute with the full name.
    But it is recommended to send at least one name. If you don't use any values/attributes for the name, the users name will be empty and the contact_email will be used.

### Authentication via SASL

To enable LDAP authentication via SASL, add the following parameters to `dtable_web_settings.py`:

| Parameter          | Description                                               | Values                                                           |
| ------------------ | --------------------------------------------------------- | ---------------------------------------------------------------- |
| ENABLE_SASL        | On/off switch for LDAP authentication via SASL            | `True` or `False`                                                |
| SASL_MECHANISM     | SASL mechanism configured on LDAP server                  | SASL mechanism, e.g. `DIGEST-MD5`, `CRAM-MD5`, `GSSAPI`, `Plain` |
| SASL_AUTHC_ID_ATTR | User attribute used for authentication identity mapping\* | Attribute name, e.g. `uid`, `cn`                                 |

More info about [authentication identity mapping](https://www.openldap.org/doc/admin26/sasl.html#Mapping%20Authentication%20Identities).

## LDAP Synchronisation

LDAP Synchronisation can do these things for you:

- Creates new users (if newly added in your LDAP server)
- Delete or deactivate users (if deactivated or remove in your LDAP server)
- Update Names, E-Mails, roles or employee ideas
- Assign Users to groups

To enable LDAP synchronisation (LDAP Sync), LDAP Auth must be configured in two places:

- `dtable-events.conf`
- `dtable_web_settings`

### Activation of the LDAP Synchronisation

LDAP Synchronisation must be activated in dtable-events.conf. Currently only the sync interval (in seconds) can be configure. Meaning a sync_interval of 3600 means a LDAP synchroniation of every hour.

```
[LDAP SYNC]
enabled = true
sync_interval = 3600
```

### Configuration of the LDAP Synchronisation

!!! bug "Needs rework!"

| Parameter                    | Description                                                                                       | Values                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `LDAP_SYNC_GROUP`            | On/off switch for group sync                                                                      | `True`or `False`                              |
| `LDAP_GROUP_FILTER`          |                                                                                                   |                                               |
| `LDAP_GROUP_MEMBER_ATTR`     | Attribute used when syncing group members                                                         | `member` or `memberUid`.                      |
| `LDAP_GROUP_MEMBER_UID_ATTR` | User attribute set in 'memberUid' option, which is used in "posixGroup"; default value is `uid`   |                                               |
| `LDAP_USER_OBJECT_CLASS`     | Name of the class used to search for user objects; default value is `person`                      |                                               |
| `LDAP_GROUP_OBJECT_CLASS`    | Name of the class used to search for group objects; default value is `group`                      | `groupOfNames`, `posixGroup` or `group`       |
| `LDAP_GROUP_UUID_ATTR`       | ...; default value is `ObjectGUID`                                                                | For LDAP: refer to <br />For AD: `ObjectGUID` |
| `SYNC_GROUP_AS_DEPARTMENT`   | Option to sync LDAP groups as departments rather than SeaTable groups                             | `True`or `False`                              |
| `LDAP_DEPARTMENT_NAME_ATTR`  | Name of department when SYNC_GROUP_AS_DEPARTMENT=True, the default department name is the OU name | Object name, e.g. `description`               |

How to determine if member or memberUid? (posixGroup?)
More examples!!!

## LDAP and SAML

!!! bug "Needs rework!"

In some situations, it is useful to configure LDAP - especially LDAP Sync - and SAML as authentication providers. In this case, SeaTable must be prevented from creating two different users (as identified by the `username`) for one and the same `uid`when the person authenticates via LDAP and SAML, which would be the default behavior.

Add the following parameter to `dtable_web_settings.py` to instruct SeaTable to use the same `username` no matter if a user (as identified by its `uid`) authenticates via LDAP or SAML.

```
LDAP_SAML_USE_SAME_UID = True
# this will disable LDAP login
```

When enabled, SeaTable creates an additional record for the authenticating user in social_auth_usersocialauth when the user logs in using LDAP. This record maps the `username` to the `uid` for the SAML provider.
