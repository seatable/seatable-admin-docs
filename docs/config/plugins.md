# Plugins

SeaTable Server supports plugins. Plugins provide additional visualization or interaction possibilities within a SeaTable base. Examples of SeaTable plugins include the Gallery, the Map or the Kanban board, providing users with versatile options to visualize their data.

Discover a comprehensive list of publicly available plugins and learn how to leverage them in our [user documentation](https://seatable.io/docs/plugins/alle-plugins-in-der-uebersicht/?lang=auto).

Typically, installation of a plugin requires action from the system administrator on the SeaTable server. Once installed, any user can easily activate the plugin within their base, unlocking its full potential.

## Installation / Update of plugins

System administrators have three distinct methods to install plugins into your SeaTable server. Users or team admins do not have the capability to install plugins.

### Option 1: Installation/Update via Web Interface

Navigate to the system administration area and select **Plugins** from the left navigation bar. Click on **Import plugin from market** and choose the desired plugin. Please ensure that your SeaTable Server has internet access and can download zip files from <https://market.seatable.io>.

![Install Plugins from SeaTable Market](/images/seatable-plugins-install.png)

After a few moments, the plugin will appear in the list of installed plugins. Subsequently, all users can activate the plugins in any base.

In the event that a new version becomes available, a button will appear on the plugin card. Simply click on this button to initiate the update process for the plugin.

![Install Plugins from SeaTable Market](/images/seatable-plugins-update.png)

### Option 2: Upload via ZIP-File

If your server lacks internet connectivity, you can still install Plugins by downloading them as ZIP files to your local PC and subsequently uploading them to the SeaTable Server.

The complete plugin archive can be found at the following URL: <https://cloud.seatable.io/apps/custom/plugin-archive>.

![Upload Plugins manually](/images/seatable-plugins-upload.png)

After a brief moment, the plugin will appear in the list of installed plugins, allowing all users to activate it in any base.

To update a plugin, simply upload the latest version as a zip file. SeaTable will automatically detect the newer version and update the plugin accordingly.

### Option 3: Plugins via API

SeaTable Server offers API endpoints for installing and updating plugins. For further details, please refer to the API reference documentation.

- <https://api.seatable.io/reference/add-plugin>
- <https://api.seatable.io/reference/update-plugin>

## Configuration of the plugins

Typically, plugins do not necessitate additional configuration. However, an exception is the Map plugin, which presently relies on the Google Maps API and requires an API key.

### Map Plugin

The Map plugin exclusively supports the Google Maps Platform. To enable access to Google Maps data, a <a href="https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en">Google API Key</a> is required.

![Create Google Maps API key](/images/google-maps-api.png)

Generate an API key and append the following line to the configuration file `dtable_web_settings.py`.

```bash
DTABLE_GOOGLE_MAP_KEY = '<replace with your Google Maps API Key>'
```

Remember to restart the SeaTable Service to apply the changes from the updated configuration file.
