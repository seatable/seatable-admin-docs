# dtable web settings

The `dtable_web_settings.py` is one of the central configuration files of SeaTable. With this file you can configure a lot of settings and functions of the web interface of SeaTable. The `dtable_web_settings.py` consists of a list of `Key = Value` pairs. Comments starting with `#` are ignored. 

You need to restart SeaTable so that your changes take effect. Just execute the following command at your command line.

```bash
docker exec -d seatable /shared/seatable/scripts/seatable.sh restart

```

You can also modify some of the config items as system administrator via web interface. These config items are saved in the database table (dtable_db/constance_config). The configuration in the database has a higher priority then the items in config file. If you want to disable settings via web interface, you can add `ENABLE_SETTINGS_VIA_WEB = False` to `dtable_web_settings.py`.

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

# Redirect URL when logout，if not set, it will redirect to the SeaTable default page of logout
LOGOUT_REDIRECT_URL = 'https://example.com/<your-own-logout-page>'

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

# Whether to allow SSO users to set a local password; default True, admin or user can set a local password by 'Reset password'
ENABLE_SSO_USER_CHANGE_PASSWORD = True

# Whether to allow LDAP users to set a local password; default False, when True, admin or user can set a local password by 'Reset password'
ENABLE_LDAP_USER_CHANGE_PASSWORD = False

# Age of cookie, in seconds (default: 2 weeks).
SESSION_COOKIE_AGE = 60 * 60 * 24 * 7 * 2

# Whether a user's session cookie expires when the Web browser is closed.
SESSION_EXPIRE_AT_BROWSER_CLOSE = False

# Whether to save the session data on every request. Default is `False`
SESSION_SAVE_EVERY_REQUEST = False

# Whether to allow a user to create a base in personal workspace. Default by `False`
DISABLE_ADDING_PERSONAL_BASES = False

```

## Other options

```python
# Choices can be found here:
# https://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# The time zone should be the same as the system time zone. 
# Otherwise there may be problems with the export or data processing
# of the date-column.
# Here some examples:
TIME_ZONE = 'UTC'
TIME_ZONE = 'Europe/Berlin'
TIME_ZONE = 'America/New_York'

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

# Predefined custom colors that can be used in color rules, options of single select and so on
CUSTOM_COLORS = [
    {'color':'#F5C043','text_color':'#212529'}, 
    {'color':'#3064BC','text_color':'#FFFFFF'},
]
```

## Group member limit

The default is 500.

```python
GROUP_MEMBER_LIMIT = 500

```

## Big data view export row limit

When exporting an big data view to Excel, you can set the maximum number of exported rows in the configuration file:

```python
ARCHIVE_VIEW_EXPORT_ROW_LIMIT = 100000

```

The default is 100,000.

## Limit of collaborators loaded in a base

After opening a base, the first 300 collaborators and the first 100 external application accounts are loaded by default. These data are used to select collaborators in the collaborator column. If you need to load more collaborators, you can modify the following parameters.

```
DTABLE_RELATED_USERS_PER_PAGE = 300
DTABLE_APP_USERS_PER_PAGE = 100
```


## Embed Bases into other webpages

Embed Bases into other webpages (iframe mode), the following options need to be added to support user login

```
SESSION_COOKIE_SAMESITE = 'None'
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SAMESITE = 'None'
CSRF_COOKIE_SECURE = True

```

## RESTful API

API throttling related settings. Enlarger the rates if you got 429 response code during API calls.
API_THROTTLE_RATES is used to replace the old REST_FRAMEWORK option. API_THROTTLE_RATES is empty by default. You can add your custom THROTTLE_RATE to the option

```python
API_THROTTLE_RATES = {
   'ping': '3000/minute',
   'anon': '60/minute',
   'user': '3000/minute',
   'sync_common_dataset': '60/minute',
   'password_reset': '10/minute',
   'org-admin': '1000/day',
   'app': '1000/minute',
   'import': '20/minute',   # Limit the rate of API calls for importing via excel/csv
   'export': '20/minute',   # Limit the rate of export base, table and view
}

# Throttling whitelist used to disable throttle for certain IPs.
# e.g. REST_FRAMEWORK_THROTTLING_WHITELIST = ['127.0.0.1', '192.168.1.1']
# Please make sure `REMOTE_ADDR` header is configured in Nginx conf
REST_FRAMEWORK_THROTTLING_WHITELIST = []

```

## Recycle bin automatic emptying time interval

The default is 30.

```python
TRASH_CLEAN_AFTER_DAYS = 30
```
