# Site Title and Site Name

Site Title and Site Name are two basic customization options. The **Title** is used in the browser tab and the **Name** is used in notifications or email messages.

![SeaTable Site Title](/images/seatable_site_title.png)

!!! warning "Web interface overrule config files"

    Please be aware that if you define a value in the webinterface, this always overrules the value in the config file.

## Configuration via the web interface

Login to your SeaTable Server as system administrator and switch to the system admin area. Select the navigation point `Settings`.

![SeaTable Site Title in System Administration](/images/seatable_site_title2.png)

Add a new **Title** and/or **Name** and save the values. The changes are live right away.

## Configuration via config file

Add these configurations to `dtable_web_settings.py` and restart SeaTable service.

```bash
# Browser tab's title
SITE_TITLE = 'Private SeaTable'

# Set this to your website/company's name.
# The title is used in email notifications and welcome messages.
SITE_NAME = 'SeaTable'
```
