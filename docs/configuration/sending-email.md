# Sending Email Notifications on SeaTable

## Types of Email Sending in SeaTable

There are currently five types of emails sent in SeaTable :

- User resets their password
- User has been added as a collaborator in a table, or mentioned in a comment (depends on the user's email notification settings and that the notification is not seen within 1 hour)
- User has been shared with a base or added to a group
- System admin adds new members
- System admin resets user password

## Configure SMTP via environment variables

<!-- md:version 4.4 -->

Use these environment variables to configure your SMTP account.

| Environment variable  | Description | Example values    |
| --------------------- | ----------- | ----------------- |
| `EMAIL_USE_TLS`       |             | `True` or `False` |
| `EMAIL_HOST`          |             | `mail.gmx.net`    |
| `EMAIL_HOST_USER`     |             | `seatable@gmx.de` |
| `EMAIL_HOST_PASSWORD` |             | `topsecret`       |
| `EMAIL_PORT`          |             | `587`             |
| `DEFAULT_FROM_EMAIL`  |             | `seatable@gmx.de` |
| `SERVER_EMAIL`        |             | `seatable@gmx.de` |

## Configure SMTP via configuration file

Add the following lines to `dtable_web_settings.py` to enable email sending.

```python
EMAIL_USE_TLS = False
EMAIL_HOST = 'smtp.example.com'        # smpt server
EMAIL_HOST_USER = 'username@example.com'    # username and domain
EMAIL_HOST_PASSWORD = 'password'    # password
EMAIL_PORT = 25
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
SERVER_EMAIL = EMAIL_HOST_USER

```

**Note**

1. If your email service does not work, you can check the log file `logs/dtable_web.log` to see what may have caused the problem.
2. If you want to use the email service without authentication, leave `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD` **blank** (`''`). The emails will then be sent without a `From:` address.
3. About using SSL connection (using port 465): Port 587 is being used to establish a TLS connection and port 465 is being used to establish an SSL connection. Starting from Django 1.8, it supports both.

If you are using Gmail as email server, use following lines:

```python
EMAIL_USE_TLS = True
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'username@gmail.com'
EMAIL_HOST_PASSWORD = 'password'
EMAIL_PORT = 587
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
SERVER_EMAIL = EMAIL_HOST_USER

```

**Note if you use Gmail**:

1. If you have enabled 2-step-verification in your Gmail settings, you'll need an [App Password](https://support.google.com/accounts/answer/185833) instead of your login password.
2. If you haven't enabled 2-step-verification in your Gmail settings, you must then enable [Less Secure Apps](https://support.google.com/accounts/answer/6010255).
