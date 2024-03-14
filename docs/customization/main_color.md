# Change the main color

=== "Version 4.3"

    Select a color and I will generate the correspondent css code. You should select a color that is dark enough to be a good background for white font color.

    <input type="color" id="seatable_custom_color" onchange="update_css_color()" value="#ff8000" style="width:100px">
    <div id="seatable_custom_color_output">
    ```
    Select a color and the css code will be created...
    ```
    </div>

Simply copy and paste (:material-content-copy:) the css code and paste it either to the input box or save it as custom.css at /opt/seatable-server/seahub-data/custom/custom.css and add ... to dtable_web_settings.py.
