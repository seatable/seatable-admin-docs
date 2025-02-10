# Replace Favicon in SeaTable

SeaTable allows you to easily replace the default SeaTable favicon with a custom one. SeaTable uses two favicons: a default one ![normal favicon](../assets/images/seatable-favicon.png){ width="24"} and a notification favicon ![notification favicon](../assets/images/seatable-notification.png){ width="24" } that appears when you have unread notifications.

## Configuration via the Web Interface

Currently, it is not possible to replace these favicons through the system administrator interface.

## Configuration via the Command Line

Instead of uploading favicons via the web interface, you must save them on the host using the command line. Simply save your favicons to the following paths and restart your container:

- `/opt/seatable-server/seatable/seahub-data/custom/seatable-favicon.ico`
- `/opt/seatable-server/seatable/seahub-data/custom/seatable-notification.ico`

If the `custom` directory does not exist, you will need to create it.

### Custom Path

If you prefer to use a different file name, you can modify this by adding the following settings to `dtable_web_settings.py`. The path must be publically available and is therefore relative to the media path. SeaTable supports both `png` and `ico` files.

```python
CUSTOM_FAVICON_PATH = 'custom/my-favicon.png'
CUSTOM_FAVICON_NOTIFICATION_PATH = 'custom/my-notification-favicon.png'
```
