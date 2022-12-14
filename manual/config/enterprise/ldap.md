# LDAP and Active Directory Configuration

LDAP (Light-weight Directory Access Protocol) is a user information management server widely deployed by enterprises, Microsoft's Active Directory is fully compatible with LDAP. This document assumes that you have already understood the knowledge and terminology related to LDAP.

## SeaTable User Introduction

Users in SeaTable are divided into two categories:

* Users who are stored in the local database. It may be a user created by the administrator, or a user registered by self
* The user created in SeaTable during LDAP login (or other Single Sign On login).

SeaTable will automatically look up users from internal databases and LDAP. As long as users exist in any source, they can log in.

## Basic LDAP/AD integration configuration

SeaTable requires each user in the LDAP/AD server to have a unique ID. Generally, `ObjectGUID` is used in AD, and `EntryUUID` is used in other LDAP servers

Add the following configuration to dtable_web_settings.py.

```
ENABLE_LDAP = True
LDAP_PROVIDER = 'ldap'
LDAP_SERVER_URL = 'ldap://192.168.0.124'
LDAP_BASE_DN = 'ou=test,ou=test,dc=seatable,dc=local'
LDAP_ADMIN_DN = 'administrator@seatable.local'
LDAP_ADMIN_PASSWORD = 'Hello@123'
LDAP_USER_UNIQUE_ID = 'objectGUID'
LDAP_LOGIN_ATTR = 'mail'

# The following options are used for group sync
LDAP_SYNC_GROUP = True
LDAP_GROUP_MEMBER_ATTR = 'member'
LDAP_GROUP_MEMBER_UID_ATTR = 'uid'
LDAP_USER_OBJECT_CLASS = 'person'
LDAP_GROUP_OBJECT_CLASS = 'group'
LDAP_GROUP_UUID_ATTR = 'objectGUID'
SYNC_GROUP_AS_DEPARTMENT = False
LDAP_DEPARTMENT_NAME_ATTR = ''

# The following options are optional

LDAP_SAML_USE_SAME_UID = True

# The attribute field to configure roles in LDAP
LDAP_USER_ROLE_ATTR = 'title'

# The following two properties are used to splice the user's nickname: first_name last_name, these two options are optional, default is ''
LDAP_USER_FIRST_NAME_ATTR = 'givenName'
LDAP_USER_LAST_NAME_ATTR = 'sn'

# For Chinese name，Reverse the order of first_name and last_name, this is an optional option, default is False
LDAP_USER_NAME_REVERSE = True

# If LDAP_LOGIN_ATTR is not set to 'mail', this option can be used to specify which attribute to import the user's mailbox address from. The attributes in this option will override the user's email address imported through LOGIN_ATTR. This is an optional option, the default is ''. If this option is not set, the LOGIN_ATTR attribute will be used as the contact email
LDAP_CONTACT_EMAIL_ATTR = 'mail'

# Used to filter the range of users who can log in, such as limited to a certain security group
LDAP_FILTER = 'memberOf=CN=group,CN=developers,DC=example,DC=com'
LDAP_GROUP_FILTER = 'memberOf=CN=group,CN=developers,DC=example,DC=com'

```

The meaning of each configuration option is as follows:

* LDAP_SAML_USE_SAME_UID: Compatible with LDAP users to log in by SAML single sign-on
* LDAP_PROVIDER: SeaTable uses this configuration to distinguish LDAP from other integrated login methods
* LDAP_SERVER_URL: The address URL of the LDAP server. If your LDAP server listens on a non-standard port, you can also include the port in the URL, such as: ldap://ldap.example.com:389.
* LDAP_BASE_DN: In the organizational structure of the LDAP server, the unique name (Distingushed Name, DN for short) of the root node used to query users. All users under this node can access SeaTable.
* LDAP_ADMIN_DN: The DN of the user used to query the information in the LDAP server. This user should have sufficient authority to access all information under BASE. It is generally recommended to use LDAP/AD administrator.
* LDAP_ADMIN_PASSWORD: The password of the user corresponding to USER_DN.
* LDAP_USER_UNIQUE_ID：The unique ID of the user in LDAP. You should use ObjectGUID for AD. EntryUUID attribute should be used for other LDAP servers
* LDAP_LOGIN_ATTR: Used as the attribute for users to log in to LDAP in SeaTable. If you log in via email, you can use the 'mail' attribute or the 'userPrincipalName'. If you want to log in with a Windows username, you can use the 'sAMAccountName' attribute.
* LDAP_USER_ROLE_ATTR: Syncing roles from LDAP or Active Directory
* LDAP_USER_FIRST_NAME_ATTR：Used to splice the user's nickname
* LDAP_USER_LAST_NAME_ATTR：Used to splice the user's nickname
* LDAP_USER_NAME_REVERSE：The above two properties whether to reverse splicing
* LDAP_SYNC_GROUP: Whether enabled sync group.
* LDAP_GROUP_MEMBER_ATTR: The attribute field to use when loading the group's members. For most directory servers, the attributes is "member", which is the default value. For "posixGroup", it should be set to "memberUid".
* LDAP_GROUP_MEMBER_UID_ATTR: The user attribute set in 'memberUid' option, which is used in "posixGroup". The default value is "uid".
* LDAP_USER_OBJECT_CLASS: This is the name of the class used to search for user objects. In Active Directory, it's usually "person". The default value is "person".
* LDAP_GROUP_OBJECT_CLASS: This is the name of the class used to search for group objects. In Active Directory, it's usually "group"; in OpenLDAP or others, you may use "groupOfNames", "groupOfUniqueNames" or "posixGroup", depends on your LDAP server. The default value is "group".
* LDAP_GROUP_UUID_ATTR: The default attribute is "ObjectGUID", which is available in AD. For other LDAP servers, please refer to https://ldapwiki.com/wiki/Universally%20Unique%20Identifier.
* SYNC_GROUP_AS_DEPARTMENT: If this option is set to "True", the groups will be synced as top-level departments in SeaTable, instead of simple groups, a department in SeaTable is a special group. The sync process keeps the hierarchical structure of the OUs.
* LDAP_DEPARTMENT_NAME_ATTR: Get the department name. You can set this configuration item to an AD field that represents the "department" name, such as "description". The name of the department created by SeaTable will be the department name set in the AD field instead of the OU name.

**Note: If the configuration items include Chinese, need to ensure that the configuration file saved in UTF8 encoding.**

Some tips on how to select LDAP_BASE_DN and LDAP_ADMIN_EMAIL:

* To determine your LDAP_BASE_DN attribute, you first need to open the graphical interface of the domain manager and browse your organizational structure.
  * If you want all users in the system to be able to access SeaTable, you can use'cn=users,dc=yourdomain,dc=com' as the BASE option (need to replace your domain name).
  * If you only want people in a certain department to be able to access, you can limit the scope to a certain OU (Organization Unit). You can use the `dsquery` command-line tool to find the DN of the corresponding OU. For example, if the name of the OU is'staffs', you can run `dsquery ou -name staff`. More information can be found [here](https://technet.microsoft.com/en-us/library/cc770509.aspx).
* AD supports the use of usernames in the format of 'user@domain.com' as `LDAP_ADMIN_EMAIL`. For example, you can use administrator@example.com as `LDAP_ADMIN_EMAIL`. Sometimes AD cannot correctly recognize this format. At this point, you can use `dsquery` to find the DN of the user. For example, if the username is'seatableuser', run `dsquery user -name seatableuser` to find the user. More information can be found [here](https://technet.microsoft.com/en-us/library/cc725702.aspx).

## LDAP SYNC users and groups

SeaTable sync LDAP users and groups regularly. Add the following configuration to dtable-event.conf and restart SeaTable.

```
[LDAP_SYNC]
enabled = true
sync_interval = 60  # The unit is seconds

```


