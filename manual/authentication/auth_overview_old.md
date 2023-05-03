# Authentication overview

User accounts and their authentication are stored in the SQL database of SeaTable. This article is intended for administrators and provides technical details of SeaTable's database structure and gives concrete action instructions on how to migrate users from one authentication type to another.

The default authentication method of SeaTable is against the user accounts in the local SQL database. At the same time SeaTable offers the possibility to use other authentication methods like LDAP, SAML, OAuth and JWT.

## The username identifies the user

Each user in SeaTable has a `username`. `b7bd00e840a14b748ce2bffdf409488b@auth.local` would be an example of such a `username` and the matching regex would be `^[a-f0-9]{32}(@auth.local)$`.

The `username` is unique and generated during the creation of a user. It is not a hash value of the email address which means if a user is deleted and recreated, a new username will be given each time.

This `username` is used as a key to link the different SQL database tables. 

> **There is only one username:**
> 
> In the different database tables of seatable different column names are used for the `username`. Sometimes it is the `user`, sometimes the `email` or the `virtual_id`. It is always the same object, which is always called `username` in this documentation.

## Database structure of users and their authentication

Even though SeaTable has almost 100 database tables, only four are needed to define a user and his authentication.

| Database | Table |
| -------- | -------- |
| ccnet_db | EmailUser |
| dtable_db | profile_profile |
| dtable_db | social_auth_usersocialauth |
| dtable_db | id_in_org_tupble |

### EmailUser

This table stores all user accounts of the SeaTable server with the account status and privileges for every user account. Additionally, the table also contains the passwords for all users that authenticate directly against SeaTable

```sql
mysql> select email,left(passwd,25),is_staff,is_active from EmailUser;
+---------------------------------------------+---------------------------+----------+-----------+
| email                                       | left(passwd,20)           | is_staff | is_active |
+---------------------------------------------+---------------------------+----------+-----------+
| b7bd00e840a14b748ce2bffdf409488b@auth.local | PBKDF2SHA256$10000$4cd... |        1 |         1 |
| 12ae56789f1e4c8d8e1c31415867317c@auth.local | PBKDF2SHA256$10000$736... |        0 |         1 |
| 145504ae043c438cbb55f2afb084d586@auth.local | !                         |        0 |         1 |
| 91e3f171e9214b0cab6418abfb70bc53@auth.local | !                         |        0 |         1 |
| 1a8d6725c4ae40c688b40028fd62c73f@auth.local | !                         |        0 |         1 |
+---------------------------------------------+---------------------------+----------+-----------+
```
**Users with a password in the local SQL database:**

SeaTable stores the passwords in the database as a hash value. Every password hash starts with `PBKDF2SHA256$10000$` which shows that the password was hashed with the algorithm Pbkdf2Sha256 and 10.000 iterations where used. More info on [wikipedia about PBKDF2](https://en.wikipedia.org/wiki/PBKDF2).

**External authentication:**

If there is a `!` instead of the hash value, this indicates that the login for this user requires an *external authentication*. The `!` in the last three entries shows that these users use a different authentication method.

The database columns `is_staff` and `is_active` accept only 0 (=false) and 1 (=true) as values. `is_staff` determines whether the user has administrator rights and `is_active` determines whether the user is still active and thus a login is possible.

> **It is recommended to have at least on local admin account available**
> 
> There may always be situations where the external authentication does not work or is not available. In this case it is recommended to have at least one local administrator account.

### profile_profile

This table, as the name indicates, contains profile information for every user in the system such as nickname, interface language, and contact email address.

For every user in the table `EmailUser` you should find an entry in `profile_profile`. 

```sql
mysql> select user,nickname,lang_code,login_id,contact_email from profile_profile;
+---------------------------------------------+--------------+-----------+----------+-------------------+
| user                                        | nickname     | lang_code | login_id | contact_email     |
+---------------------------------------------+--------------+-----------+----------+-------------------+
| b7bd00e840a14b748ce2bffdf409488b@auth.local | admin        | en        | NULL     | admin@seatable.io |
| 12ae56789f1e4c8d8e1c31415867317c@auth.local | Test         | en        | NULL     | test@seatable.io  |
| 145504ae043c438cbb55f2afb084d586@auth.local | Hulk         | en        | hulk     | hulk@seatable.io  |
| 91e3f171e9214b0cab6418abfb70bc53@auth.local | Tony Stark   | en        | tony     | tony@seatable.io  |
| 1a8d6725c4ae40c688b40028fd62c73f@auth.local | Steve Rogers | en        | steve    | steve@seatable.io |
+---------------------------------------------+--------------+-----------+----------+-------------------+
``` 

The `nickname` is the display name of the user in the webinterface of SeaTable. The `contact_email` is the real email address of the user. With the `login_id` a user can log in to the seatable web interface. The `login_id` can only be assigned via [SeaTable API](https://api.seatable.io/reference/update-user) and not in the system admin area.

> **Three ways to login:**
>
> Users with local passwords can use the following three combinations to login:<br/>
> 1) `contact_email` + `Password`<br/>
> 2) `login_id` + `Password`<br/>
> 3) `username` + `Password`
>
> Every combination will grant access to the webinterface of SeaTable.

### social_auth_usersocialauth

This table maps the users’ unique identifiers from the identity providers to SeaTable’s username. This table only contains records for the users authenticating against LDAP, SAML or OAuth. If no password is defined for a user, an entry must exist in this database table to enable *external authentication*. The value `provider` specifies which external authentication should be used. 

```sql
mysql> select username,provider,uid from social_auth_usersocialauth;
+---------------------------------------------+----------------+--------------------------------------+
| username                                    | provider       | uid                                  |
+---------------------------------------------+----------------+--------------------------------------+
| 145504ae043c438cbb55f2afb084d586@auth.local | Azure          | 877e1964-5585-4e1a-b069-1951ff79d373 |
| 91e3f171e9214b0cab6418abfb70bc53@auth.local | Authentik-SAML | 28347@authentik                      |
| 1a8d6725c4ae40c688b40028fd62c73f@auth.local | my-ldap        | 39731673920273                       |
+---------------------------------------------+----------------+--------------------------------------+
```

A corresponding authentication method must be defined in `dtable_web_settings.py`. Check for necessary configuration options here:

- [SAML_PROVIDER_IDENTIFIER](https://manual.seatable.io/config/enterprise/saml/)
- [LDAP_PROVIDER](https://manual.seatable.io/config/enterprise/ldap/)
- [OAUTH_PROVIDER_DOMAIN](https://manual.seatable.io/config/enterprise/oauth/)

The `uid` in this table is the unique identifier of the user at the external authentication service. The `uid` has to be provided by the external authentication method and allows to match the users from the external service with the users inside SeaTable. This `uid`, which is supplied by the `provider`, must always remain the same so that the user can be uniquely assigned, even if his email address, name, etc. changes. If the `uid` changes, SeaTable considers this user as a new user and creates a new `username` accordingly.

### id_in_org_tupble

This table stores the [ID of users](https://seatable.io/en/docs/ansichtsoptionen/was-ist-die-id-des-users-und-warum-kann-man-danach-filtern/?lang=auto). Because setting a user ID is optional, this table can be significantly shorter than all the other three tables. 

The `org_id` is the id of the team/organization which is unique in the system. If the `org_id` is *-1* this user account does not belong to any team/organization.

> **Unique value inside each team:**
> 
> Each ID may exist only once within a team (=organization).

```sql
mysql> select * from id_in_org_tuple;
+---------------------------------------------+-----------+--------+
| virtual_id                                  | id_in_org | org_id |
+---------------------------------------------+-----------+--------+
| b7bd00e840a14b748ce2bffdf409488b@auth.local | 21        |     -1 |
| 145504ae043c438cbb55f2afb084d586@auth.local | 222       |     12 |
| 91e3f171e9214b0cab6418abfb70bc53@auth.local | 333AZE    |     34 |
| 1a8d6725c4ae40c688b40028fd62c73f@auth.local | EF_3479   |     -1 |
+---------------------------------------------+-----------+--------+
```

