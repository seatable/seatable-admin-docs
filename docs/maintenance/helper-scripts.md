---
status: new
---

# Helper Scripts

After installing SeaTable, `/opt/seatable-compose/tools` contains the following shell scripts in order to make administrative operations more convenient. 

## User management

### activate-user.sh

This script allows you to enable an **existing** SeaTable user inside the database.
Simply provide the user's contact email address as a parameter:

=== "Input"

    ```bash
    ./tools/activate-user.sh "user@email.com"
    ```

=== "Output"

    ```
    --------------
    UPDATE ccnet_db.EmailUser SET is_active = 1 WHERE email = (SELECT user FROM dtable_db.profile_profile WHERE contact_email = 'user@email.com')
    --------------

    Query OK, 1 row affected (0.002 sec)
    Rows matched: 1  Changed: 1  Warnings: 0

    Bye
    Success: Activated user user@email.com
    ```

### deactivate-user.sh

This script allows you to disable an existing SeaTable user inside the database.
Simply provide the user's email address as a parameter:

=== "Input"

    ```bash
    ./tools/deactivate-user.sh "user@email.com"
    ```

=== "Output"

    ```
    --------------
    UPDATE ccnet_db.EmailUser SET is_active = 0 WHERE email = (SELECT user FROM dtable_db.profile_profile WHERE contact_email = 'user@email.com')
    --------------

    Query OK, 1 row affected (0.002 sec)
    Rows matched: 1  Changed: 1  Warnings: 0

    Bye
    Success: Deactivated user user@email.com
    ```

### user-stats.sh

This script will print your current license limit and query the database for the number of enabled users:

=== "Input"

    ```bash
    ./tools/user-stats.sh
    ```

=== "Output"

    ```
    User limit according to license file: 3

    Users in database:
    +-------+--------------+
    | users | active_users |
    +-------+--------------+
    |     2 |            2 |
    +-------+--------------+
    ```

## Database management

### db-shell.sh

This script will give you an interactive shell inside the MariaDB container. You can use this to directly run SQL commands.

=== "Input"

    ```bash
    ./tools/db-shell.sh
    ```

=== "Output"

    ```
    Welcome to the MariaDB monitor.  Commands end with ; or \g.
    Your MariaDB connection id is 73
    Server version: 11.4.3-MariaDB-ubu2404 mariadb.org binary distribution

    Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

    Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

    MariaDB [(none)]>
    ```

### dump-database.sh

This script will dump all three databases (`ccnet_db`, `dtable_db` and `seahub_db`) to `/opt/seatable-backup` on the host.

=== "Input"

    ```bash
    ./tools/dump-database.sh
    ```

=== "Output"

    ```
    Success: Dumped databases into /opt/seatable-backup
    ```

=== "Created Files"

    ```
    total 228
    -rw-r--r-- 1 root root  12184 May 23 11:30 ccnet_db-2025-05-23-11-30-27.sql
    -rw-r--r-- 1 root root 177499 May 23 11:30 dtable_db-2025-05-23-11-30-27.sql
    -rw-r--r-- 1 root root  38402 May 23 11:30 seafile_db-2025-05-23-11-30-27.sql
    ```

