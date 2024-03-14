# UI Customiziation in SeaTable

SeaTable Server offers numerous options for tailoring the system to your specific needs. This includes customization of colors, logos, images, email templates, and HTML templates. While most customization tasks can be performed via the command line interface, system administrators also have the ability to make certain changes directly through the web interface.

Let's explore the various possibilities for UI customization

![SeaTable Customization](/images/seatable-customization.png)

## Where to find the configuration files?

You don't have to switch to the SeaTable docker container, to make changes at the configuration files. The configuration files of a SeaTable server can usually be found in the host server at the directory `/opt/seatable-server/seatable/conf/`.

Use the editor of your choice like `nano` or `vim` to edit the files.

## How to restart SeaTable?

Changes in the configuration files, require a restart of the SeaTable container or the SeaTable service.
SeaTable service can be restarted with this command:

```
docker exec -d seatable-server /shared/seatable/scripts/seatable.sh restart
```
