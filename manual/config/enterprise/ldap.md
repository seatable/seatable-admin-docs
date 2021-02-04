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

# The following options are optional

# The following two properties are used to splice the user's nickname: first_name last_name, these two options are optional, default is ''
LDAP_USER_FIRST_NAME_ATTR = 'givenName'
LDAP_USER_LAST_NAME_ATTR = 'sn'

# For Chinese name，Reverse the order of first_name and last_name, this is an optional option, default is False
LDAP_USER_NAME_REVERSE = True

# If LDAP_LOGIN_ATTR is not set to 'mail', this option can be used to specify which attribute to import the user's mailbox address from. The attributes in this option will override the user's email address imported through LOGIN_ATTR. This is an optional option, the default is ''. If this option is not set, the LOGIN_ATTR attribute will be used as the contact email
LDAP_CONTACT_EMAIL_ATTR = 'mail'

# Used to filter the range of users who can log in, such as limited to a certain security group
LDAP_FILTER = 'memberOf=CN=group,CN=developers,DC=example,DC=com'

```

The meaning of each configuration option is as follows:

* LDAP_PROVIDER: SeaTable uses this configuration to distinguish LDAP from other integrated login methods
* LDAP_SERVER_URL: The address URL of the LDAP server. If your LDAP server listens on a non-standard port, you can also include the port in the URL, such as: ldap://ldap.example.com:389.
* LDAP_BASE_DN: In the organizational structure of the LDAP server, the unique name (Distingushed Name, DN for short) of the root node used to query users. All users under this node can access SeaTable.
* LDAP_ADMIN_DN: The DN of the user used to query the information in the LDAP server. This user should have sufficient authority to access all information under BASE. It is generally recommended to use LDAP/AD administrator.
* LDAP_ADMIN_PASSWORD: The password of the user corresponding to USER_DN.
* LDAP_USER_UNIQUE_ID：The unique ID of the user in LDAP. You should use ObjectGUID for AD. EntryUUID attribute should be used for other LDAP servers
* LDAP_LOGIN_ATTR: Used as the attribute for users to log in to LDAP in SeaTable. If you log in via email, you can use the 'mail' attribute or the 'userPrincipalName'. If you want to log in with a Windows username, you can use the 'sAMAccountName' attribute.
* LDAP_USER_FIRST_NAME_ATTR：Used to splice the user's nickname
* LDAP_USER_LAST_NAME_ATTR：Used to splice the user's nickname
* LDAP_USER_NAME_REVERSE：The above two properties whether to reverse splicing

**Note: If the configuration items include Chinese, need to ensure that the configuration file saved in UTF8 encoding.**

Some tips on how to select LDAP_BASE_DN and LDAP_ADMIN_EMAIL:

* To determine your LDAP_BASE_DN attribute, you first need to open the graphical interface of the domain manager and browse your organizational structure.
  * If you want all users in the system to be able to access SeaTable, you can use'cn=users,dc=yourdomain,dc=com' as the BASE option (need to replace your domain name).
  * If you only want people in a certain department to be able to access, you can limit the scope to a certain OU (Organization Unit). You can use the `dsquery` command-line tool to find the DN of the corresponding OU. For example, if the name of the OU is'staffs', you can run `dsquery ou -name staff`. More information can be found [here](https://technet.microsoft.com/en-us/library/cc770509.aspx).
* AD supports the use of usernames in the format of'user@domain.com' as `LDAP_ADMIN_EMAIL`. For example, you can use administrator@example.com as `LDAP_ADMIN_EMAIL`. Sometimes AD cannot correctly recognize this format. At this point, you can use `dsquery` to find the DN of the user. For example, if the username is'seatableuser', run `dsquery user -name seatableuser` to find the user. More information can be found [here](https://technet.microsoft.com/en-us/library/cc725702.aspx).


