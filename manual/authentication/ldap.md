# LDAP

Lightweight Directory Access Protocol (LDAP) is is an open, vendor-neutral, industry standard application protocol for accessing and maintaining distributed directory information services. Microsoft's Active Directory (AD) is fully compatible with LDAP. For simplicity, this Manual refers to LDAP and AD when using the term LDAP unless explicitly stated otherwise.

This document assumes that you have a basic understanding of LDAP and that you understand the related terminology.

## LDAP integration in SeaTable

SeaTable supports two modes of operation with LDAP:

* LDAP authentication: SeaTable uses the LDAP Server for user authentication.
* LDAP synchronisation: SeaTable syncs users and groups with the LDAP server regularly.

Regardless of the mode of operation used, SeaTable requires each user in the LDAP server to have a unique ID.

Additionally, LDAP in SeaTable can be configured to work seamlessly with SAML.

## LDAP Authentication

To enable LDAP Authentication (LDAP Auth), add the following parameters to `dtable_web_settings.py`, customize to your environment, and restart the SeaTable service:

| Parameter           | Description                                                  | Values                                          |
| ------------------- | ------------------------------------------------------------ | ----------------------------------------------- |
| ENABLE_LDAP         | On/off switch for authentication via LDAP                    | `True` or `False`                               |
| LDAP_PROVIDER       | Internal name to refer to LDAP as authentication type        | Alphanumeric string, e.g. 'ldap'                |
| LDAP_SERVER_URL     | URL of the LDAP server and port if non-standard              | URL, e.g. 'ldap://192.168.0.10:389'             |
| LDAP_BASE_DN        | DN of the root node used for querying users - all users under this node can log in | LDAP DN                   |
| LDAP_ADMIN_DN       | DN of the user used for querying the LDAP server - user must have the rights to access all information under LDAP_BASE_DN | For LDAP: LDAP DN<br />For AD: LDAP DN or email |
| LADP_ADMIN_PASSWORD | User password for LDAP_ADMIN_DN user                         | Alphanumeric string                             |
| LDAP_USER_UNIQUE_ID | Unique user ID in the LDAP server                            | For LDAP: 'EntryUUID'<br />For AD: 'ObjectGUID' |
| LDAP_LOGIN_ATTR     | User attribute used for logging in                           | 'mail', 'userPrincipalName' or 'sAMAccountName' |


This is a simple sample configuration:

```
ENABLE_LDAP = True
LDAP_PROVIDER = 'ldap'
LDAP_SERVER_URL = 'ldap://192.168.0.10'
LDAP_BASE_DN = 'ou=test,ou=test,dc=example,dc=com'
LDAP_ADMIN_DN = 'administrator@example.com'
LDAP_ADMIN_PASSWORD = 'secret'
LDAP_USER_UNIQUE_ID = 'ObjectGUID'
LDAP_LOGIN_ATTR = 'mail'
```

Some tips on how to select LDAP_BASE_DN and LDAP_ADMIN_DN:

- To determine your LDAP_BASE_DN attribute, you first need to open the graphical interface of the domain manager and browse your organizational structure.
- If you want all users in the system to be able to access SeaTable, you can use 'cn=users,dc=yourdomain,dc=com' as the BASE option (need to replace your domain name).
- If you only want people in a certain department to be able to access, you can limit the scope to a certain OU. You can use the `dsquery` command-line tool to find the DN of the corresponding OU. For example, if the name of the OU is `staffs`, you can run `dsquery ou -name staff`. More information can be found [here](https://technet.microsoft.com/en-us/library/cc770509.aspx).
- Although AD supports the use of usernames in email address format as `LDAP_ADMIN_DN` such as administrator@example.com, it sometimes does not correctly recognize this format. At this point, you can use `dsquery` to find the DN of the user. For example, if the username is `seatableuser`, run `dsquery user -name seatableuser` to find the user. More information can be found [here](https://technet.microsoft.com/en-us/library/cc725702.aspx).

The following parameters are also available, but optional:

| Parameter                 | Description                                                  | Values                                                       |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| LDAP_FILTER               | Filter for users who can log in, e.g. a certain security group | LDAP filter, e.g. 'memberOf=CN=group,CN=developers,DC=example,DC=com' |
| LDAP_GROUP_FILTER         |                                                              |                                                              |
| LDAP_USER_ROLE_ATTR       | Name of user role in the LDAP server                         | Attribute name, e.g. `title`                                 |
| LDAP_USER_FIRST_NAME_ATTR | First part of the user's SeaTable nickname when nickname is spliced; default value is '' | Attribute name, e.g. `givenName`                             |
| LDAP_USER_LAST_NAME_ATTR  | Second part of the user's SeaTable nickname when nickname is spliced; default value is '' | Attribute name, e.g. `sn`                                    |
| LDAP_USER_NAME_REVERSE    | Option to reverse order of first name and last name f spliced nickname; default value is `False` | `True`or `False`                                             |
| LDAP_SAML_USE_SAME_UID    | Option to allow users to log in via LDAP and SAML using the same username | `True`or `False`                                             |
| LDAP_CONTACT_EMAIL_ATTR   | Alternative attribute as a mail address when LDAP_LOGIN_ATTR is not `mail`; the attribute overrides the email address imported through LOGIN_ATTR; default value is '' |     |

To enable LDAP authentication via SASL, add the following parameters to `dtable_web_settings.py`:

| Parameter                 | Description                                                  | Values                                                       |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| ENABLE_SASL               | On/off switch for LDAP authentication via SASL               | `True` or `False`                                            |
| SASL_MECHANISM            | SASL mechanism configured on LDAP server                     | SASL mechanism, e.g. `DIGEST-MD5`, `CRAM-MD5`, `GSSAPI`, `Plain`  |
| SASL_AUTHC_ID_ATTR        | User attribute used for [authentiction identity mapping](https://www.openldap.org/doc/admin26/sasl.html#Mapping%20Authentication%20Identities)       | Attribute name, e.g. `cn`, `uid`                       |

## LDAP Synchronisation

To enable LDAP synchronisation (LDAP Sync), LDAP Auth must be configured and the following parameters added to `dtable_web_settings`:

| Parameter                  | Description                                                  | Values                                                       |
| -------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| LDAP_SYNC_GROUP            | On/off switch for group sync                                 | `True`or `False`                                             |
| LDAP_GROUP_MEMBER_ATTR     | Attribute used when syncing group members                    | For most directory servers, the attributes is "member", which is the default value. For "posixGroup", it should be set to "memberUid". |
| LDAP_GROUP_MEMBER_UID_ATTR | User attribute set in 'memberUid' option, which is used in "posixGroup"; default value is `uid` |                                                              |
| LDAP_USER_OBJECT_CLASS     | Name of the class used to search for user objects; default value is `person` |                                                              |
| LDAP_GROUP_OBJECT_CLASS    | Name of the class used to search for group objects; default value is `group` | For LDAP: `groupOfNames`, `groupOfUniqueNames`, `posixGroup`<br />For AD: `group` |
| LDAP_GROUP_UUID_ATTR       | ...; default value is `ObjectGUID`                           | For LDAP: refer to https://ldapwiki.com/wiki/Universally%20Unique%20Identifier<br />For AD: `ObjectGUID` |
| SYNC_GROUP_AS_DEPARTMENT   | Option to sync LDAP groups as departments rather than SeaTable groups | `True`or `False`                                             |
| LDAP_DEPARTMENT_NAME_ATTR  | Name of the department when SYNC_GROUP_AS_DEPARTMENT = True, the default department name is the OU name | Object name, e.g. `description`                              |

Additionally, the following parameters must be added to `dtable-events.conf`:

```
[LDAP_SYNC]
enabled = true
sync_interval = 60  # The unit is seconds
```

## LDAP and SAML

In some situations, it is useful to configure LDAP - especially LDAP Sync - and SAML as authentication providers. In this case, SeaTable must be prevented from creating two different users (as identified by the `username`) for one and the same `uid`when the person authenticates via LDAP and SAML, which would be the default behavior.

Add the following parameter to `dtable_web_settings.py` to instruct SeaTable to use the same `username` no matter if a user (as identified by its `uid`) authenticates via LDAP or SAML.

```
LDAP_SAML_USE_SAME_UID = True
```

When enabled, SeaTable creates an additional record for the authenticating user in social_auth_usersocialauth when the user logs in using LDAP. This record maps the `username` to the `uid` for the SAML provider.
