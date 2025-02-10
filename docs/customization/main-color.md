# Change the main color

SeaTable has an orange main color with the color-code `#FF8000`. If this color does not match your custom logo, it might be useful to replace this main color with another color of your choice.

To do this we force SeaTable to use custom css code to overwrite the main color.

The first step is you use the following color picker and select a new main color of your choice.

!!! success "Dark colors are better than bright ones"

    You should select a color that is dark enough to be a good background for white font color. To switch also the font color from white to black is not yet part of this manual.

!!! warning "Web interface overrule config files"

    Please be aware that if you define a value in the webinterface, this always overrules the value in the config file.

=== "Version 5.1"

    Select a color and you will get the correspondent css code in the following grey box.

    <input type="color" id="cc_v5.1" onchange="update_custom_color('v5.1')" value="#ff8000" style="width:100px">
    <div id="cc_output_v5.1">
    ```
    Select a color and the css code will be created...
    ```
    </div>

    Use the copy-and-paste icon (:material-content-copy:) on the top right of the grey box to copy the complete css code to your clipboard.

=== "Version 5.0"

    Select a color and you will get the correspondent css code in the following grey box.

    <input type="color" id="cc_v5.0" onchange="update_custom_color('v5.0')" value="#ff8000" style="width:100px">
    <div id="cc_output_v5.0">
    ```
    Select a color and the css code will be created...
    ```
    </div>

    Use the copy-and-paste icon (:material-content-copy:) on the top right of the grey box to copy the complete css code to your clipboard.

=== "Version 4.3"

    Select a color and you will get the correspondent css code in the following grey box.

    <input type="color" id="cc_v4.3" onchange="update_custom_color('v4.3')" value="#ff8000" style="width:100px">
    <div id="cc_output_v4.3">
    ```
    Select a color and the css code will be created...
    ```
    </div>

    Use the copy-and-paste icon (:material-content-copy:) on the top right of the grey box to copy the complete css code to your clipboard.

## Configuration via the web interface

Login to your SeaTable Server as system administrator and switch to the system admin area. Select the navigation point `Settings`. Team admins or normal users does not have the permission to access the system admin area.

First you should set the checkbox for `ENABLE_BRANDING_CSS`. Then simply copy and paste (:material-content-copy:) the css code and paste it to the input box of `Custom CSS`. Submit by clicking on the green :material-check:.

Reload your page of your browser and the color should be changed.

## Configuration via config file

Open the configuration file `dtable_web_settings.py` and add this configuration line:

```bash
BRANDING_CSS = 'custom/custom.css'
```

Now copy the css code from this manual and save it to `/opt/seatable-server/seatable/seahub-data/custom/custom.css`. If the directory `custom` does not exist, you have to create it first.

If your new color is not immediately visible after a page reload, you have to restart the SeaTable container (not the SeaTable service).
The SeaTable container has to create a symlink to make the css file available to SeaTable.
