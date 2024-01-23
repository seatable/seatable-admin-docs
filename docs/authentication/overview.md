# Authentication

SeaTable Server Enterprise Edition (SeaTable) supports multiple authentication types.

The default authentication type is authentication against the local user database (with or without [two-factor authentication](two_factor_auth.md)).

Additionally, SeaTable supports the following external authentication types:

- [LDAP (Auth and Sync)](ldap.md)
- [OAuth](oauth.md)
- [SAML](saml.md)

Finally, users can also authenticate using [JWT](jwt.md), which may be interesting for some special use cases.

## Username

SeaTable assigns every user a unique `username`, regardless of the authentication type used. The `username` serves as a key to link the different SQL database tables.

The `username` looks like this: `b7bd00e840a14b748ce2bffdf409488b@auth.local` The corresponding regular expression is `^[a-f0-9]{32}(@auth.local)$`. The part of the username in front of the @-sign is a random value. If a user account is deleted and recreated with exactly the same details, the new `username` will be different from the previous one.

The `username` is generated when the account is created. The time at which SeaTable creates the account in the database depends on the authentication type:

- Local user database: when the administrator registers the user or when the user self-registers
- LDAP Auth, OAuth, and SAML: when the user logs in for the first time
- LDAP Sync: when the sync job runs for the first time after the corresponding modification in the LDAP directory

!!! note "One username - multiple names"

    For historical reasons, the SQL database tables use non-uniform names for `username`. In some tables, `username` is simply `user`. In some others, it goes by the name of `email` or `virtual_id`. Despite the inconsistent naming, it is always the same object. In the SeaTable Manual, only `username` is used unless reference is made to a specific table column.

## Database Structure

SeaTable's databases encompass almost 100 tables. Four of those are relevant for user management and authentication. (Tables related to 2FA are disregarded in this document.)

| Database  | Table                                                           |
| :-------- | :-------------------------------------------------------------- |
| ccnet_db  | [EmailUser](#table-emailuser)                                   |
| dtable_db | [profile_profile](#table-profile_profile)                       |
| dtable_db | [social_auth_usersocialauth](#table-social_auth_usersocialauth) |
| dtable_db | [id_in_org_tuple](#table-id_in_org_tuple)                       |

Note: The table LDAPUsers in ccnet_db is no longer used.

The database tables shown in the following sections are for illustrative purposes only. Yet, they represent a possible system configuration and are internally consistent.

### Table EmailUser

The table EmailUser stores all user accounts of a SeaTable Server with the account status and privileges for every user account. Additionally, the table also contains the (hashed) passwords for all users that authenticate directly against SeaTable.

```
mysql> select email,is_staff,is_active,left(passwd,25) from ccnet_db.EmailUser;
+---------------------------------------------+----------+-----------+---------------------------+
| email                                       | is_staff | is_active | left(passwd,20)           |
+---------------------------------------------+---------------------------+----------+-----------+
| b7bd00e840a14b748ce2bffdf409488b@auth.local |        1 |         1 | PBKDF2SHA256$10000$4cd... |
| 12ae56789f1e4c8d8e1c31415867317c@auth.local |        0 |         1 | PBKDF2SHA256$10000$736... |
| 145504ae043c438cbb55f2afb084d586@auth.local |        0 |         1 | !                         |
| 91e3f171e9214b0cab6418abfb70bc53@auth.local |        0 |         1 | !                         |
| 1a8d6725c4ae40c688b40028fd62c73f@auth.local |        0 |         1 | !                         |
+---------------------------------------------+---------------------------+----------+-----------+
```

`is_staff` determines whether the user has system administrator privileges. `is_staff` accepts only 0 (False) and 1 (True) as values.

`is_active` determines whether the user is active. Only active users can log into SeaTable. `is_active` also accepts only 0 (False) and 1 (True) as values.

**Users with a password in the local SQL database:**

SeaTable stores the passwords in the database as hash values. Every password hash starts with `PBKDF2SHA256$10000$` which means that the password was hashed using the PBKDF2SHA256 algorithm and that 10.000 iterations where used (more about [PBKDF2 on Wikipedia](https://en.wikipedia.org/wiki/PBKDF2)).

The first two users in the sample table above are users using the default authentication type. The first of the two is system administrator.

**External authentication:**

A `!` instead of a hash value means that the user uses _external authentication_. The table, however, does not contain the information of which authentication type.

The last three users in the sample table above are users authenticating using either LDAP, OAuth, or SAML.

### Table profile_profile

The table `profile_profile`, as the name indicates, contains profile information for every user in the system such as nickname, interface language, and contact email address. Every record in the table `EmailUser` has its correspondence in `profile_profile`.

```
mysql> select user,nickname,lang_code,contact_email,login_id from dtable_db.profile_profile;
+---------------------------------------------+--------------+-----------+-------------------+----------+
| user                                        | nickname     | lang_code | contact_email     | login_id |
+---------------------------------------------+--------------+-----------+-------------------+----------+
| b7bd00e840a14b748ce2bffdf409488b@auth.local | admin        | en        | admin@seatable.io | NULL     |
| 12ae56789f1e4c8d8e1c31415867317c@auth.local | Test         | en        | test@seatable.io  | NULL     |
| 145504ae043c438cbb55f2afb084d586@auth.local | Hulk         | en        | hulk@seatable.io  | hulk     |
| 91e3f171e9214b0cab6418abfb70bc53@auth.local | Tony Stark   | en        | tony@seatable.io  | tony     |
| 1a8d6725c4ae40c688b40028fd62c73f@auth.local | Steve Rogers | en        | steve@seatable.io | steve    |
+---------------------------------------------+--------------+-----------+----------+-------------------+
```

`nickname` is the display name of the user in the web interface of SeaTable.

`contact_email` is the real email address of the user. SeaTable sends notifications to this address.

`login_id` is an alternative to the username that the user can use to log in. The `login_id` can only be set via [SeaTable API](https://api.seatable.io/reference/update-user) and not in system administration in SeaTable's web interface.

> **Three valid combos for default authentication**
>
> Users authenticating against the local database can use the following three combinations to login:
> \1) `contact_email` + `password`
> \2) `login_id` + `password`
> \3) `username` + `password`

### Table social_auth_usersocialauth

The table `social_auth_usersocialauth` is critical for external authentication with LDAP, SAML, or OAuth. This table maps the user's SeaTable username to its unique identifiers from the identity providers. Every record in the table `EmailUser` without a password must have at least one correspondence in this table to be able to log into SeaTable using _external authentication_.

```
mysql> select username,provider,uid from dtable_db.social_auth_usersocialauth;
+---------------------------------------------+----------------+--------------------------------------+
| username                                    | provider       | uid                                  |
+---------------------------------------------+----------------+--------------------------------------+
| 145504ae043c438cbb55f2afb084d586@auth.local | OAuth          | 877e1964-5585-4e1a-b069-1951ff79d373 |
| 91e3f171e9214b0cab6418abfb70bc53@auth.local | Authentik-SAML | 28347@authentik                      |
| 1a8d6725c4ae40c688b40028fd62c73f@auth.local | my-ldap        | 39731673920273                       |
+---------------------------------------------+----------------+--------------------------------------+
```

`provider` specifies the external authentication used. The name shown in this column is the name specified in the configuration of the external authentication source in`dtable_web_settings.py`.

`uid` in this table is the unique identifier as communicated by the external authentication service. The `uid` has to be provided by the external authentication method and allows to match the users from the external service with the users inside SeaTable. This `uid` must not be changed over the lifetime of the user (despite name, email address, ... changes) If the `uid` changes, SeaTable considers the user as a new user and creates a new `username` accordingly.

### Table id_in_org_tuple

This table stores the [user IDs](https://seatable.io/en/docs/ansichtsoptionen/was-ist-die-id-des-users-und-warum-kann-man-danach-filtern/?lang=auto). Because setting a user ID is optional, this table can be significantly shorter than all the other three tables.

```
mysql> select * from dtable_db.id_in_org_tuple;
+---------------------------------------------+-----------+--------+
| virtual_id                                  | id_in_org | org_id |
+---------------------------------------------+-----------+--------+
| b7bd00e840a14b748ce2bffdf409488b@auth.local | 21        |     -1 |
| 145504ae043c438cbb55f2afb084d586@auth.local | 222       |     12 |
| 91e3f171e9214b0cab6418abfb70bc53@auth.local | 333AZE    |     34 |
| 1a8d6725c4ae40c688b40028fd62c73f@auth.local | EF_3479   |     -1 |
+---------------------------------------------+-----------+--------+
```

`id_in_org` is the ID of the user. The user ID can be an alphanumeric string and must be unique within every team/organization.

`org_id` is the id of the team/organization which is unique in the system. An `org_id` value of -1 signifies that the user does not belong to any team/organization.
