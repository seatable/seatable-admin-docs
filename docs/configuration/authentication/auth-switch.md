# Switch authentication type

SeaTable Server supports [multiple authentication types](./overview.md). Switching between the types is possible, but any switch requires modifications of SeaTable's databases.

!!! note

        Before manually manipulating your database, make a database backup, so you can restore your system if anything goes wrong!

See more about [make a database backup](../../maintenance/backup-recovery.md).

## Migrating from local user database to external authentication

As an organisation grows and its IT infrastructure matures, the migration from local authentication to external authentication like LDAP, SAML, OAUTH is common requirement. Fortunately, the switch is comparatively simple.

### General procedure

1. Configure and test the desired external authentication. Note the name of the `provider` you use in the config file. The user to be migrated should already be able to log in with this new authentication type, but he will be created as a new user with a new unique identifier, so he will not have access to his existing bases. Note the `uid` from the `social_auth_usersocialauth` table. Delete this new, still empty user again.
2. Determine the `xxx@auth.local` address of the user to be migrated.
3. Replace the password hash with an exclamation mark.
4. Create a new entry in `social_auth_usersocialauth` with the `xxx@auth.local`, your `provider` and the `uid`.

The login with the password stored in the local database is not possible anymore. After logging in via external authentication, the user has access to all his previous bases.

### Example

This example shows how to migrate the user with the username `12ae56789f1e4c8d8e1c31415867317c@auth.local` from local database authentication to SAML. The SAML authentication is configured in `dtable_web_settings.py` with the provider name `authentik-saml`. The `uid` of the user inside the Identity Provider is `HR12345`.

This is what the database looks like before these commands must be executed:

```
mysql> select email,left(passwd,25) from EmailUser where email = '12ae56789f1e4c8d8e1c31415867317c@auth.local';
+---------------------------------------------+------------------------------+
| email                                       | left(passwd,25)              |
+---------------------------------------------+------------------------------+
| 12ae56789f1e4c8d8e1c31415867317c@auth.local | PBKDF2SHA256$10000$4cdda6... |
+---------------------------------------------+------------------------------+

mysql> update EmailUser set passwd = '!' where email = '12ae56789f1e4c8d8e1c31415867317c@auth.local';

mysql> insert into social_auth_usersocialauth \
  (`username`, `provider`, `uid`) \
  set \
  ('12ae56789f1e4c8d8e1c31415867317c@auth.local', 'authentik-saml', 'HR12345');
```

Afterwards the databases should look like this:

```
mysql> select email,passwd from EmailUser where email = '12ae56789f1e4c8d8e1c31415867317c@auth.local';
+---------------------------------------------+------- +
| email                                       | passwd |
+---------------------------------------------+--------+
| 12ae56789f1e4c8d8e1c31415867317c@auth.local | !      |
+---------------------------------------------+--------+

mysql> select username,provider,uid from social_auth_usersocialauth where username = '12ae56789f1e4c8d8e1c31415867317c@auth.local';
+---------------------------------------------+----------------+---------+
| username                                    | provider       | uid     |
+---------------------------------------------+----------------+---------+
| 12ae56789f1e4c8d8e1c31415867317c@auth.local | authentik-saml | HR12345 |
+---------------------------------------------+----------------+---------+
```

## Migrating from one external authentication to another

First configure the two external authentications and test them with a dummy user. Then, to migrate all the existing users you only need to make changes to the `social_auth_usersocialauth` table. No entries need to be deleted or created. You only need to modify the existing ones. The `xxx@auth.local` remains the same, you only need to replace the `provider` and the `uid`.

## Migrating from external authentication to local user database

First, delete the entry in the `social_auth_usersocialauth` table that belongs to the particular user.

Then you can reset the user's password, e.g. via the web interface. The user will be assigned a local password and from now on the authentication against the local database of SeaTable will be done.

## Use LDAP and SAML together

SeaTable supports since version 3.5 to use SAML and LDAP together for one user. To activate this function the following configuration has to be set in `dtable_web_settings.py`.

```bash
# Enable that SAML and LDAP use the same username
LDAP_SAML_USE_SAME_UID = True
```

More details about this option will follow soon.
