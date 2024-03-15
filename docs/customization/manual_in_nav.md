# Custom manual

By default SeaTable presents a "Manual" link on its home page. Starting with version v4.4 this link points to <https://help.seatable.io> but in all former versions, the link opened only a blank new browser tab.

![SeaTable Manual link in main navigation](/images/customization_manual.png)

Luckily it is super easy to change the behaviour of this manual link and to change the target URL.

## Setup the target URL of the manual link

Open the configuration file `dtable_web_settings.py` located at `/opt/seatable-server/seatable/conf/` and add this configuration line. Change the value to your needs.

```bash
HELP_LINK = 'https://docs.seatable.io/'
```

Don't forget to restart SeaTable service.
