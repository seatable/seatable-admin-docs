# Configuration of Manual, Templates, and Plugins

## Configuration of the Manual 

```
HELP_LINK = 'https://seatable.io/help/?lang=auto'

```

## Configuration of Templates

Using templates requires a version above 1.6.0 of SeaTable.  Here are several steps:

1. Enable creating base from templates in config file `dtable_web_settings.py`.
2. Prepare a base for storing the table of template list in your own SeaTable account. In this base, create a table named `templates`.
3. Prepare several template bases and generate an external-link, which should be filled in the designated cell of column named `link` of the table prepared in the second step.

We suggest that the base of template list and templates be put together in one group.

An example of the `templates` table is shown as below. You can **not change the column title**, otherwise the auto-generated template preview is not working anymore.

![](../images/auto-upload/image-1609905818016.png)

* **name** [text]: internal name for distinguishing between different templates.
* **category** [single-select]: 
* **display_name** [text]: template name shown on the website.
* **description** [long-text]: introduction and suggestions of the template.
* **card_image** [image]: image shown on the template panel on the website.
* **card_image_expanded** [image]: image shown on the template detail dialog after clicking the template panel.
* **link** [url]: the sharing link of the specific template.

### Activate templates in SeaTable

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

In `System Admin -> Plugins -> Import plugins from market`, you can import the latest plugins from the official SeaTable plugin directory directly. You can get a list of available plugins from <https://market.seatable.io/api/plugins> and also download the latest version of the plugins as ZIP files:

- <https://market.seatable.io/api/plugins/timeline>
- <https://market.seatable.io/api/plugins/gallery>
- <https://market.seatable.io/api/plugins/page-design>
- <https://market.seatable.io/api/plugins/kanban>

Once uploaded to the SeaTable Server via system administration in the web interface, users can add them to their bases via the plugin manager.

![picture](https://user-images.githubusercontent.com/41058728/121181052-e0924f80-c861-11eb-930a-e0e13d6ea31e.png)


### Map plugin
The map plugin currently supports only the Google Maps Platform. For the map plugin to access Google Maps data, a <a href="https://developers.google.com/maps/documentation/javascript/get-api-key?hl=de">Google API Key</a> is required.

Add the following line to `dtable_web_settings.py` :

````
DTABLE_GOOGLE_MAP_KEY = ‘xxxx’ 
````

