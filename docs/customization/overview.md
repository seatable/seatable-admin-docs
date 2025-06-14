# UI Customiziation in SeaTable

SeaTable Server offers numerous options for tailoring the system to your specific needs. This includes customization of colors, logos, images, emails and HTML templates. While most customization tasks can be performed via the command line interface, system administrators also have the ability to make certain changes directly through the web interface.

Let's explore the various possibilities for UI customization

![SeaTable Customization](../assets/images/seatable-customization.png)

## Where to find the configuration files?

You don't have to switch to the SeaTable docker container, to make changes at the configuration files. The configuration files of a SeaTable server can usually be found in the host server at the directory `/opt/seatable-server/seatable/conf/`.

Use the editor of your choice like `nano` or `vim` to edit the files.

## How to persist changes

Please be aware that any change that you do inside a docker container will be removed if the changes files are not mounted to the host system.
Also changes should never be done in the directory `seatable-server-latest`. This folder will always be replaced as soon as you upgrade to another version.

Keep this in mind, but the articles will explain precisely where you should do the changes.

## How to restart SeaTable?

Changes in the configuration files, require a restart of the SeaTable container or the SeaTable service.
SeaTable service can be restarted with this command:

```
docker exec -i seatable-server /templates/seatable.sh restart
```
