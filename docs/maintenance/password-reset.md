---
description: Reset user passwords or create a new admin account in SeaTable Server via the system admin area or command line.
---

# Password Reset

#### User Management

When you set up SeaTable, you should have set up an admin account. After you log in as an admin, you may add/delete users.

#### Resetting User Password

Administrator can reset password for a user in "System Admin" page.

In a private server, the default settings doesn't support users to reset their password by email. If you want to enable this, you have first to [set up notification email](../configuration/sending-email.md).

#### Forgot Admin Account or Password?

You may create a new admin account from the command line. Use these commands and follow the instructions on the screen.

```bash
docker exec -it seatable-server bash
seatable.sh superuser
```

After logging in the new admin account, you can reset the original admin account's password.
