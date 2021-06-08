#Configuration of Manual, Templates, and Plugins

## Configuration of the Manual 

```
HELP_LINK = 'https://seatable.io/help/?lang=auto'

```

## Configuration of Templates

Using templates requires a version above 1.6.0 of SeaTable.  Here are several steps:

1. Enable creating base from templates in config file.
2. Prepare a base for storing the table of template list in your own SeaTable account. In this base, create a table named "templates".
3. Prepare several template bases and generate an external-link, which should be filled in the designated cell of column named "link" of the table prepared in the second step.

We suggest that the base of template list and templates be put together in one group.

An example of the "templates" table is shown as below:

![](../images/auto-upload/image-1609905818016.png)

* **name**: internal name for distinguishing between different templates.
* **display_name**: template name shown on the website.
* **description**: introduction and suggestions of the template.
* **card_image**: image shown on the template panel on the website.
* **card_image_expand**: image shown on the template detail dialog after clicking the template panel.
* **link**: the sharing link of the specific template.

### dtable web config

Add the following lines to `dtable_web_settings.py` :

```
TEMPLATE_BASE_API_TOKEN = '9851cecfd013a833eec47b629c72b3b593f91c7d'  
TEMPLATE_TABLE_NAME = 'templates'
ENABLE_CREATE_BASE_FROM_TEMPLATE = True
SHOW_TEMPLATES_LINK = True

```

Note that the "TEMPLATE_BASE_API_TOKEN" can be generated from "Advanced --> API Token" option from the dropdown-menu of the template base.

### Making templates

You can either choose downloading our public templates formatted as “.dtable“ and import it to your own SeaTable server, or make a template according to your own interests by yourself. 

## Configuration of Plugins

With the exception of the calendar plugin (which is bundled with SeaTable Server), SeaTable plugins must be separately installed.

Plugins can be downloaded from <https://market.seatable.io/plugins/> as ZIP files.

Once uploaded to the SeaTable Server via system administration in the web interface, users can add them to their bases via the plugin manager.

![grafik](https://user-images.githubusercontent.com/41058728/121181052-e0924f80-c861-11eb-930a-e0e13d6ea31e.png)


### Map plugin
The map plugin currently supports only the Google Maps Platform. For the map plugin to access Google Maps data, a <a href="https://developers.google.com/maps/documentation/javascript/get-api-key?hl=de">Google API Key</a> is required.

Add the following line to `dtable_web_settings.py` :

````
DTABLE_GOOGLE_MAP_KEY = ‘xxxx’ 
````

