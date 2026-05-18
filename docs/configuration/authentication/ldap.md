---
description: Configure LDAP and Active Directory authentication and synchronization in SeaTable, including SASL support and combined LDAP/SAML setups.
---

# LDAP

Lightweight Directory Access Protocol (LDAP) is an open, vendor-neutral, industry standard application protocol for accessing and maintaining distributed directory information services. Microsoft's Active Directory (AD) is fully compatible with LDAP. For simplicity, this Manual refers to LDAP and AD when using the term LDAP unless explicitly stated otherwise.

This document assumes that you have a basic understanding of LDAP and that you understand the related terminology.

## LDAP integration in SeaTable

SeaTable supports two modes of operation with LDAP:

- LDAP authentication: SeaTable uses the LDAP Server for user authentication.
- LDAP synchronisation: SeaTable syncs users and groups with the LDAP server regularly.

Regardless of the mode of operation used, SeaTable requires each user in the LDAP server to have a unique ID.

Additionally, LDAP in SeaTable can be configured to work seamlessly with SAML.

## LDAP Authentication

To enable LDAP Authentication (LDAP Auth), add the following parameters to `dtable_web_settings.py`, customize to your environment, and [restart SeaTable](../../maintenance/restart-seatable.md):

| Parameter           | Description                                                                                                               | Values                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| ENABLE_LDAP         | On/off switch for authentication via LDAP                                                                                 | `True` or `False`                               |
| LDAP_PROVIDER       | Internal name to refer to LDAP as authentication type                                                                     | Alphanumeric string, e.g. 'ldap'                |
| LDAP_SERVER_URL     | URL of the LDAP server and port if non-standard                                                                           | URL, e.g. 'ldap://192.168.0.10:389'             |
| LDAP_BASE_DN        | DN of the root node used for querying users - all users under this node can log in                                        | LDAP DN                                         |
| LDAP_ADMIN_DN       | DN of the user used for querying the LDAP server - user must have the rights to access all information under LDAP_BASE_DN | For LDAP: LDAP DN<br />For AD: LDAP DN or email |
| LDAP_ADMIN_PASSWORD | User password for LDAP_ADMIN_DN user                                                                                      | Alphanumeric string                             |
| LDAP_LOGIN_ATTR     | User attribute used for logging in                                                                                        | 'mail', 'userPrincipalName' or 'sAMAccountName' |

This is a simple sample configuration:

```python
ENABLE_LDAP = True
LDAP_PROVIDER = 'ldap'
LDAP_SERVER_URL = 'ldap://192.168.0.10'
LDAP_BASE_DN = 'ou=test,ou=test,dc=example,dc=com'
LDAP_ADMIN_DN = 'administrator@example.com'
LDAP_ADMIN_PASSWORD = 'secret'
LDAP_LOGIN_ATTR = 'mail'
```

Some tips on how to select LDAP_BASE_DN and LDAP_ADMIN_DN:

- To determine your LDAP_BASE_DN attribute, you first need to open the graphical interface of the domain manager and browse your organizational structure.
- If you want all users in the system to be able to access SeaTable, you can use 'cn=users,dc=yourdomain,dc=com' as the BASE option (need to replace your domain name).
- If you only want people in a certain department to be able to access, you can limit the scope to a certain OU. You can use the `dsquery` command-line tool to find the DN of the corresponding OU. For example, if the name of the OU is `staffs`, you can run `dsquery ou -name staff`. More information can be found [here](<https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-R2-and-2012/cc770509(v=ws.11)>).
- Although AD supports the use of usernames in email address format as `LDAP_ADMIN_DN` such as administrator@example.com, it sometimes does not correctly recognize this format. At this point, you can use `dsquery` to find the DN of the user. For example, if the username is `seatableuser`, run `dsquery user -name seatableuser` to find the user. More information can be found [here](<https://learn.microsoft.com/en-us/previous-versions/windows/it-pro/windows-server-2012-R2-and-2012/cc725702(v=ws.11)>).

The following parameters are also available, but optional:

| Parameter                 | Description                                                                                                                                                                                                                                                                                                                      | Values                                                           |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| LDAP_FILTER               | Filter for users who can log in, e.g. a certain security group                                                                                                                                                                                                                                                                   | LDAP filter, e.g. `memberOf=CN=SeaTable_Users,…`                 |
| LDAP_USER_UNIQUE_ID       | LDAP attribute whose value is stored as the user's `uid` in `social_auth_usersocialauth` and used to recognize a returning user. Choose an attribute that never changes over the user's lifetime, because if it changes, SeaTable treats the user as new. Binary GUID/UUID values are decoded automatically; default value is '' | Attribute name, e.g. `objectGUID` (AD) or `entryUUID` (OpenLDAP) |
| LDAP_GROUP_FILTER         | Additional filter applied when searching for groups to synchronize (group sync only). It is combined with the configured group object class using a logical AND. Leave empty to sync all groups of that class; default value is ''                                                                                               | LDAP filter, e.g. `cn=SeaTable*`                                 |
| LDAP_USER_ROLE_ATTR       | Name of user role in the LDAP server                                                                                                                                                                                                                                                                                             | Attribute name, e.g. `title`                                     |
| LDAP_USER_FIRST_NAME_ATTR | First part of the user's SeaTable nickname when nickname is spliced; default value is ''                                                                                                                                                                                                                                         | Attribute name, e.g. `givenName`                                 |
| LDAP_USER_LAST_NAME_ATTR  | Second part of the user's SeaTable nickname when nickname is spliced; default value is ''                                                                                                                                                                                                                                        | Attribute name, e.g. `sn`                                        |
| LDAP_USER_NAME_REVERSE    | Option to reverse order of first name and last name f spliced nickname; default value is `False`                                                                                                                                                                                                                                 | `True` or `False`                                                |
| LDAP_SAML_USE_SAME_UID    | Use SAML for login and LDAP only for synchronization, mapping both to one shared account; disables interactive LDAP login (see [LDAP and SAML](#ldap-and-saml))                                                                                                                                                                  | `True` or `False`                                                |
| LDAP_CONTACT_EMAIL_ATTR   | Alternative attribute as a mail address when LDAP_LOGIN_ATTR is not `mail`; the attribute overrides the email address imported through LOGIN_ATTR; default value is ''                                                                                                                                                           |                                                                  |
| LDAP_EMPLOYEE_ID_ATTR     | ID of the employee                                                                                                                                                                                                                                                                                                               | Attribute name, e.g. `33`                                        |

To enable LDAP authentication via SASL, add the following parameters to `dtable_web_settings.py`:

| Parameter          | Description                                                                                                                                     | Values                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| ENABLE_SASL        | On/off switch for LDAP authentication via SASL                                                                                                  | `True` or `False`                                                |
| SASL_MECHANISM     | SASL mechanism configured on LDAP server                                                                                                        | SASL mechanism, e.g. `DIGEST-MD5`, `CRAM-MD5`, `GSSAPI`, `Plain` |
| SASL_AUTHC_ID_ATTR | User attribute used for [authentication identity mapping](https://www.openldap.org/doc/admin26/sasl.html#Mapping%20Authentication%20Identities) | Attribute name, e.g. `uid`, `cn`                                 |

## LDAP Synchronisation

<!-- md:flag enterprise -->

To enable LDAP synchronisation (LDAP Sync), LDAP Auth must be configured and the following parameters added to `dtable_web_settings`:

| Parameter                  | Description                                                                                             | Values                                                                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| LDAP_SYNC_GROUP            | On/off switch for group sync                                                                            | `True` or `False`                                                                                                                      |
| LDAP_GROUP_MEMBER_ATTR     | Attribute used when syncing group members                                                               | For most directory servers, the attributes is "member", which is the default value. For "posixGroup", it should be set to "memberUid". |
| LDAP_GROUP_MEMBER_UID_ATTR | User attribute set in 'memberUid' option, which is used in "posixGroup"; default value is `uid`         |                                                                                                                                        |
| LDAP_USER_OBJECT_CLASS     | Name of the class used to search for user objects; default value is `person`                            |                                                                                                                                        |
| LDAP_GROUP_OBJECT_CLASS    | Name of the class used to search for group objects; default value is `group`                            | For LDAP: `groupOfNames`, `groupOfUniqueNames`, `posixGroup`<br />For AD: `group`                                                      |
| LDAP_GROUP_UUID_ATTR       | ...; default value is `ObjectGUID`                                                                      | For LDAP: refer to [UUID](https://ldapwiki.com/wiki/Universally%20Unique%20Identifier)<br />For AD: `ObjectGUID`                       |
| SYNC_GROUP_AS_DEPARTMENT   | Option to sync LDAP groups as departments rather than SeaTable groups                                   | `True` or `False`                                                                                                                      |
| LDAP_DEPARTMENT_NAME_ATTR  | Name of the department when SYNC_GROUP_AS_DEPARTMENT = True, the default department name is the OU name | Object name, e.g. `description`                                                                                                        |

Depending on your SeaTable version, additional settings must be configured:

=== "SeaTable <= v6.1"
    The following parameters must be added to `dtable-events.conf`:

    ```ini
    [LDAP SYNC]
    enabled = true
    sync_interval = 60  # The unit is seconds
    ```
=== "SeaTable v6.2+"
    Two environment variables must be configured.
    Please read our [guide](../../configuration/customizations.md) that explains how to configure these additional environment variables before proceeding.

    ```ini
    LDAP_SYNC_ENABLED=true
    # Specified in seconds
    LDAP_SYNC_INTERVAL=3600
    ```

## LDAP and SAML

<!-- md:flag enterprise -->

In some situations it is useful to use **SAML for authentication** and **LDAP for synchronization** at the same time. A typical example is a setup where users sign in through an Identity Provider (IdP) via SAML SSO, while the user and group information is provisioned and kept up to date from your LDAP directory.

Without further configuration, SeaTable would treat the LDAP identity and the SAML identity of one and the same person as two different users. Each of them would receive its own `username`, and SeaTable would create two separate accounts. To prevent this, add the following parameter to `dtable_web_settings.py`:

```python
LDAP_SAML_USE_SAME_UID = True
```

### What this setting does

When `LDAP_SAML_USE_SAME_UID = True`:

- **Interactive login via LDAP is disabled.** Users authenticate **only via SAML**. An attempt to log in with LDAP credentials fails with the generic message "Incorrect account or password". This is by design, and nothing is written to `dtable_web.log`.
- **LDAP is used for synchronization only.** The [LDAP Sync](#ldap-synchronisation) job provisions the accounts and keeps users and groups up to date.
- For every user it provisions, LDAP Sync additionally writes a record into `social_auth_usersocialauth` for the SAML provider that maps the user's `username` to the same `uid`. This bridge record is what lets the subsequent SAML login resolve to the account created by LDAP Sync instead of creating a second one.

The three building blocks therefore play these roles:

| Component | Role in combined mode                                              |
| --------- | ------------------------------------------------------------------ |
| SAML      | The only interactive login method                                  |
| LDAP Sync | Provisions accounts and groups, and writes the SAML bridge record  |
| LDAP Auth | Disabled (its connection settings are still required by LDAP Sync) |

### Requirements

- **LDAP Sync must be configured and enabled** (see [LDAP Synchronisation](#ldap-synchronisation)). The LDAP connection parameters (`LDAP_SERVER_URL`, `LDAP_ADMIN_DN`, `LDAP_ADMIN_PASSWORD`, `LDAP_BASE_DN`, …) are still required, because the sync job uses them. This applies even though interactive LDAP authentication is off.
- **The IdP must send the same `uid` as LDAP.** The value the IdP sends as the SAML `uid` (typically the NameID) must be exactly the value of the LDAP attribute used as the user's login identifier (`LDAP_LOGIN_ATTR`, e.g. `sAMAccountName`).
- **The comparison is case-sensitive.** While `sAMAccountName` is case-insensitive in Active Directory, the `uid` match in `social_auth_usersocialauth` is case-sensitive. If LDAP provides `jdoe` and the IdP sends `JDoe`, the two will not match and a second account is created.

### Typical setup procedure

1. Configure and test [SAML](./saml.md) on its own with a test user, then delete that test account again.
2. Configure [LDAP Synchronisation](#ldap-synchronisation).
3. Set `LDAP_SAML_USE_SAME_UID = True` and [restart SeaTable](../../maintenance/restart-seatable.md).
4. Let the sync job run (or wait for the configured `sync_interval`) so the accounts and their SAML bridge records exist.
5. Users sign in via SAML. Do not offer the LDAP login form in this mode, because an LDAP login attempt always fails by design.
