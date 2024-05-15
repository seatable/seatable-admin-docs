# Sending Email Notifications on SeaTable

SeaTable requires an external SMTP account to send emails. There are currently five types of emails that SeaTable sends:

- User resets their password
- User has been added as a collaborator in a table, or mentioned in a comment (depends on the user's email notification settings and that the notification is not seen within 1 hour)
- User has been shared with a base or added to a group
- System admin adds new members
- System admin resets user password

## Configuration

There are two ways to configure this SMTP account for system wide emails.

=== "Environment variables"

    <!-- md:version 4.4 -->

    The SeaTable Server image supports auto configuration via environment variables. Add these variables to your .env file to configure the SMTP account.

    | Environment variable           | Description                                 | Example values                 |
    | ------------------------------ | ------------------------------------------- | ------------------------------ |
    | `SEATABLE_EMAIL_USE_TLS`       | Activate/Deactivate TLS/SSL encryption      | `True` or leave empty.         |
    | `SEATABLE_EMAIL_HOST`          | URL or IP address or the SMTP server        | `mail.gmx.net`                 |
    | `SEATABLE_EMAIL_HOST_USER`     | Username for authentication                 | `seatable@gmx.de`              |
    | `SEATABLE_EMAIL_HOST_PASSWORD` | Password for authentication                 | `topsecret`                    |
    | `SEATABLE_EMAIL_PORT`          | Port that should be used                    | Typically `25`, `587` or `465` |
    | `SEATABLE_DEFAULT_FROM_EMAIL`  | Used for `From:`                            | `seatable@gmx.de`              |
    | `SEATABLE_SERVER_EMAIL`        | Used for `From:` in case of error reporting | `seatable@gmx.de`              |

=== "Configuration file"

    Add the following lines to `dtable_web_settings.py` to enable email sending.

    ```python
    EMAIL_USE_TLS = False                       # Either True or False
    EMAIL_HOST = 'smtp.example.com'             # Hostname of your SMTP server
    EMAIL_HOST_USER = 'username@example.com'    # Username for authentication
    EMAIL_HOST_PASSWORD = 'password'            # Password
    EMAIL_PORT = 25
    DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
    SERVER_EMAIL = EMAIL_HOST_USER
    ```

!!! warning "SMTP without authentication"

    If you want to use the email service without authentication, leave `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD` **blank** (`''`).

Restart SeaTable service to reload the changes.

## Debugging

If your email service does not work, check the log file `logs/dtable_web.log` to see what may have caused the problem.
Otherwise use a command line tool like [Swaks](https://github.com/jetmore/swaks) to debug your smtp settings.

```bash
# example of a swaks command to verify your settings
swaks --auth -tls \
--server <EMAIL_HOST> \
--protocol SMTP \
--port <EMAIL_PORT> \
--au <EMAIL_HOST_USER> \
--ap <EMAIL_HOST_PASSWORD> \
--from <DEFAULT_FROM_EMAIL> \
--to <TO_ADDRESS> \
--h-Subject: "Subject of the mail" \
--body 'Test email!'
```

## Examples

### Gmail

If you are using Gmail as email server, you can use the following settings.

```python
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'username@gmail.com'
EMAIL_HOST_PASSWORD = 'password'
EMAIL_PORT = 587
DEFAULT_FROM_EMAIL = 'username@gmail.com'
SERVER_EMAIL = 'username@gmail.com'
```

!!! warning "Allow access to less secure apps"

    Google blocks by default external apps to authenticate against their SMTP servers. To enable SeaTable to send emails via your gmail account, you have to two possibilities:

    1.  If you have enabled 2-step-verification in your Gmail settings, you'll need an [App Password](https://support.google.com/accounts/answer/185833) instead of your login password.
    2.  If you haven't enabled 2-step-verification in your Gmail settings, you must then enable [Less Secure Apps](https://support.google.com/accounts/answer/6010255).

### Brevo

SeaTable Cloud uses the SMTP relay of Brevo.

```python
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp-relay.sendinblue.com'
EMAIL_HOST_USER = 'username@domain.com'
EMAIL_HOST_PASSWORD = 'xsmtpsib-xxx'
EMAIL_PORT = 587
DEFAULT_FROM_EMAIL = 'SeaTable <noreply@domain.com>'
SERVER_EMAIL = 'noreply@domain.com'
```
