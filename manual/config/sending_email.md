# Sending Email Notifications on SeaTable

## Types of Email Sending in SeaTable

There are currently five types of emails sent in SeaTable :

* User reset his/her password
* System admin add new member
* System admin reset user password
* User send tables share link

## Options of Email Sending

Please add the following lines to `dtable_web_settings.py` to enable email sending.

```python
EMAIL_USE_TLS = False
EMAIL_HOST = 'smtp.example.com'        # smpt server
EMAIL_HOST_USER = 'username@example.com'    # username and domain
EMAIL_HOST_PASSWORD = 'password'    # password
EMAIL_PORT = 25
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
SERVER_EMAIL = EMAIL_HOST_USER

```

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

**Note**: If your email service still does not work, you can checkout the log file `logs/dtable_web.log` to see what may cause the problem. 

**Note2**: If you want to use the email service without authentication leaf `EMAIL_HOST_USER` and `EMAIL_HOST_PASSWORD` **blank** (`''`). (But notice that the emails then will be sent without a `From:` address.)

**Note3**: About using SSL connection (using port 465)

Port 587 is being used to establish a TLS connection and port 465 is being used to establish an SSL connection.  Starting from Django 1.8, it supports both.
