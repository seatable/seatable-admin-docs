---
status: wip
---

# SAML Authentication for teams

in `dtable_web_settings.py` add these settings:

```bash
# to activate teams in general
CLOUD_MODE = True
MULTI_TENANCY = True

# to activate multi-saml in general
ENABLE_MULTI_SAML = True
SAML_CERTS_DIR = '/opt/seatable/seatable-data'
```

SAML for Teams is also a role permission that has to be assigned to a role.

```bash
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

```bash
#SAML_CERTS_DIR = '/opt/seatable/seatable-data'
#SAML_ATTRIBUTE_MAP = {
#'uid': 'uid',
# 'contact_email': 'contact_email',
# 'name': 'name',
#}
```
