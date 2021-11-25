# dtable web settings

Note: You can also modify most of the config items via web interface. The config items are saved in database table (dtable_db/constance_config). They have a higher priority over the items in config files. If you want to disable settings via web interface, you can add `ENABLE_SETTINGS_VIA_WEB = False` to `dtable_web_settings.py`.

## Basic settings

```
# for dtable-server
## The private key is used to authenticate between DTable Web and DTable Server
## DTABLE_SERVER_URL is for telling DTable Web the DTable Server's URL
## DTABLE_SOCKET_URL is for telling DTable Web the web socket URL of DTable Server
DTABLE_PRIVATE_KEY = 'xxxxx'
DTABLE_SERVER_URL = 'https://seatable.yourdomain.com/dtable-server/'
DTABLE_SOCKET_URL = 'https://seatable.yourdomain.com/'

# The URL of dtable-web that for users to visit your SeaTable server
DTABLE_WEB_SERVICE_URL = 'https://seatable.yourdomain.com/'

# The help link URL
HELP_LINK = 'https://seatable.io/help/'

# The file server URL
FILE_SERVER_ROOT = 'https://seatable.yourdomain.com/seafhttp/'

```

If you changed your domain, the URLs in above settings must be changed accordingly.

## Sending Email Notifications

Refer to [email sending documentation](sending_email.md).

## User management options

The following options affect user registration, password and session.

```python
# Enable or disable registration on web. Default is `False`.
ENABLE_SIGNUP = False

# Activate or deactivate user when registration complete. Default is `True`.
# If set to `False`, new users need to be activated by admin in admin panel.
ACTIVATE_AFTER_REGISTRATION = False

# Whether allow user to delete its account
ENABLE_DELETE_ACCOUNT = True

# Enforce all users to use 2-factor-authentication. Default is 'False'.
# Changing 'True' to 'False' will deactivate 2FA for all users (they could still activate it
# in their personal settings).
ENABLE_FORCE_2FA_TO_ALL_USERS = True

# Whether to send email when a system admin adding a new member. Default is `True`.
SEND_EMAIL_ON_ADDING_SYSTEM_MEMBER = True

# Whether to send email when a system admin resetting a user's password. Default is `True`.
SEND_EMAIL_ON_RESETTING_USER_PASSWD = True

# Send system admin notify email when user registration is complete. Default is `False`.
NOTIFY_ADMIN_AFTER_REGISTRATION = True

# Remember days for login. Default is 7
LOGIN_REMEMBER_DAYS = 7

# Attempt limit before showing a captcha when login.
LOGIN_ATTEMPT_LIMIT = 3

# deactivate user account when login attempts exceed limit
FREEZE_USER_ON_LOGIN_FAILED = False

# minimum length for user's password
USER_PASSWORD_MIN_LENGTH = 6

# LEVEL based on four types of input:
# num, upper letter, lower letter, other symbols
# '3' means password must have at least 3 types of the above.
USER_PASSWORD_STRENGTH_LEVEL = 3

# default False, only check USER_PASSWORD_MIN_LENGTH
# when True, check password strength level, STRONG(or above) is allowed
USER_STRONG_PASSWORD_REQUIRED = False

# Force user to change password when admin add/reset a user.
FORCE_PASSWORD_CHANGE = True

# Age of cookie, in seconds (default: 2 weeks).
SESSION_COOKIE_AGE = 60 * 60 * 24 * 7 * 2

# Whether a user's session cookie expires when the Web browser is closed.
SESSION_EXPIRE_AT_BROWSER_CLOSE = False

# Whether to save the session data on every request. Default is `False`
SESSION_SAVE_EVERY_REQUEST = False

```

## Other options

```python
# Disable settings via Web interface in system admin->settings
# Default is True
ENABLE_SETTINGS_VIA_WEB = False

# Language code for this installation. All choices can be found here:
# http://www.i18nguy.com/unicode/language-identifiers.html
# Default language for sending emails.
LANGUAGE_CODE = 'en'

# Custom language code choice.
LANGUAGES = (
    ('en', 'English'),
    ('zh-cn', '简体中文'),
    ('zh-tw', '繁體中文'),
)

# Set this to your website/company's name. This is contained in email notifications and welcome message when user login for the first time.
SITE_NAME = 'SeaTable'

# Browser tab's title
SITE_TITLE = 'Private SeaTable'


# Configure user help pages
HELP_LINK = 'https://seatable.io/help/'

# Add privacy policy link and terms link
PRIVACY_POLICY_LINK = ''
TERMS_OF_SERVICE_LINK = ''

```

## RESTful API

```
# API throttling related settings. Enlarger the rates if you got 429 response code during API calls.
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_RATES': {
        'ping': '600/minute',
        'anon': '5/minute',
        'user': '300/minute',
    },
    'UNICODE_JSON': False,
}

# Throttling whitelist used to disable throttle for certain IPs.
# e.g. REST_FRAMEWORK_THROTTLING_WHITELIST = ['127.0.0.1', '192.168.1.1']
# Please make sure `REMOTE_ADDR` header is configured in Nginx conf
REST_FRAMEWORK_THROTTLING_WHITELIST = []

```

## Note

You need to restart SeaTable so that your changes take effect.

```bash
docker exec -d seatable /shared/seatable/scripts/seatable.sh restart

```


