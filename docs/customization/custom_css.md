# Custom Styles and Logo

To make SeaTable look like you want you can update the logo, change colors and add custom styles. This can be done either as system administrator via the web interface or you can do this on the command line.

## Customize SeaTable via web interface

Login to your SeaTable Server as system administrator and switch to the system admin area. Select the navigation point `Settings`.

![n8n SeaTable Community node](/images/seatable-customizing-web-interface.png)

In this area you can update/add:

- Title and name of your SeaTable Server
- SeaTable Logo
- Background image of the login screen
- Custom styles

The **Title** is used in the browser tab and the **Name** is used in notifications or email messages.

!!! warning "Settings via web interface overrule config files"

    Everything that you configure in the web interface can also be configured in the config files of SeaTable. Please be aware that if there are different values defined in the web interface and the config file, the values of the web interface overrule the values from the config files.

### Example: Switch new column selection to single row

Add this css styles to switch from a two rows to a single row display.

```bash
.select-column-popover .select-column-list .select-column-title {display:none;}
.select-column-popover .select-column-list {display:block !important;}
.select-column-popover .select-column-list .select-column-item {width:100% !important;}
.mobile-editor-column .select-column-container .am-list-header {display:none;}
```

## Customize SeaTable via console

You can use a custom CSS to customize the look of your SeaTable installation. You can do this either on the web interface ("Settings" in the system administration, where you can enable the custom CSS and paste your custom CSS directly into the dialogue), or use the following method.

Create a `custom` folder under `/<your SeaTable Docker volume>/seatable/seahub-data`:

> ```
> cd /<your SeaTable Docker volume>/seatable/seahub-data
> mkdir custom
> ```

Create a symbolic link for `custom` in the SeaTable container. When upgrading, the SeaTable upgrading script will automatically create a symbolic link to maintain your custom settings:

> ```
> docker exec -it seatable bash
> cd /opt/seatable/seatable-server-latest/dtable-web/media
> ln -s /shared/seatable/seahub-data/custom custom
> ```

Under `/<your SeaTable Docker volume>/seatable/seahub-data/custom`, create the new CSS file and custom the style, for example, with a `custom.css` file:

> ```
> cd /<your SeaTable Docker volume>/seatable/seahub-data/custom
> nano custom.css
> ```

In `dtable_web_settings.py`, change the value of `BRANDING_CSS` to the newly created CSS file's path:

> ```
> nano dtable_web_settings.py
> ```
>
> Then change the value of BRANDING_CSS and save & close the file:
>
> ```python
> BRANDING_CSS = 'custom/custom.css'
> ```

Finally, restart the SeaTable service:

> ```
> docker exec -d seatable /shared/seatable/scripts/seatable.sh restart
> ```
