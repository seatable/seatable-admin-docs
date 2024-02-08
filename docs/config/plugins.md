# Plugins

With the exception of the calendar plugin (which is bundled with SeaTable Server), SeaTable plugins must be separately installed. But the installation is just a peace of cake. Only the Map Plugin requires additional configuration.

## Installation of the plugins

### Option 1: Installation via Webinterface

In `System Admin -> Plugins -> Import plugins from market`, you can import the latest plugins from the official SeaTable plugin directory directly. This requires that your SeaTable System has access to the internet and can download zip files from https://market.seatable.io.

"Sceenshot"

Now all users can use the plugins in every base. Voila !!! That was not so difficult, right?

### Option 2: Installation via ZIP-Upload

If you Server has no internet connection, then you can install the plugins by upload a ZIP file. You can get a list of available plugins from <https://market.seatable.io/api/plugins> and also download the latest version of the plugins as ZIP files:

- <https://market.seatable.io/api/plugins/timeline>
- <https://market.seatable.io/api/plugins/gallery>
- <https://market.seatable.io/api/plugins/page-design>
- <https://market.seatable.io/api/plugins/kanban>
- ...

Once uploaded to the SeaTable Server via system administration in the web interface, users can add them to their bases via the plugin manager.

![picture](https://user-images.githubusercontent.com/41058728/121181052-e0924f80-c861-11eb-930a-e0e13d6ea31e.png)

### Option 3: Installation via API

...

## Configuration of the plugins

### Map plugin

The map plugin currently supports only the Google Maps Platform. For the map plugin to access Google Maps data, a <a href="https://developers.google.com/maps/documentation/javascript/get-api-key?hl=de">Google API Key</a> is required.

Add the following line to `dtable_web_settings.py` :

```
DTABLE_GOOGLE_MAP_KEY = ‘xxxx’
```

### Other plugins

All other plugins does not require any further configuration. They work out of the box.
