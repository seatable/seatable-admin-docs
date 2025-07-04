---
status: wip
search:
  exclude: true
---

# SAML Authentication for teams

in `dtable_web_settings.py` add these settings:

```python
# to activate teams in general
CLOUD_MODE = True
MULTI_TENANCY = True

# to activate multi-saml in general
ENABLE_MULTI_SAML = True
SAML_CERTS_DIR = '/shared/certs'
```

SAML for Teams is also a role permission that has to be assigned to a role.

```python
ENABLED_ROLE_PERMISSIONS = {
    'org_default': {
        'can_use_saml': True
    },
    'org_enterprise': {
        'can_use_saml': True
    }
}
```

Server certificates have to be created in the host system and made available to SeaTable Server.

```bash
# executed in the host
mkdir /opt/seatable-server/certs
cd /opt/seatable-server/
openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout sp.key -out sp.crt
```

```python
#SAML_CERTS_DIR = '/opt/seatable/seatable-data'
#SAML_ATTRIBUTE_MAP = {
#'uid': 'uid',
# 'contact_email': 'contact_email',
# 'name': 'name',
#}
```

If the SAML provider is on a separate domain (which it will definitely be in case of `cloud.seatable.io`), the following settings must be configured to prevent issues with cross-site cookies:

```python
SESSION_COOKIE_SECURE = True
SESSION_COOKIE_SAMESITE = 'None'
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_SAMESITE = 'None'
```
