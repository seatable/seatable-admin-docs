# Password Reset

#### User Management

When you setup SeaTable, you should have setup a admin account. After you logged in a admin, you may add/delete users.

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
