# Logo

The Logo of your SeaTable server can easily be replaced via the web interface or the command line.

## Configuration via the web interface

Login to your SeaTable Server as system administrator and switch to the system admin area. Select the navigation point `Settings`.

![SeaTable Site Title in System Administration](/images/seatable_logo.png)

Click an `Change` and select a new image file with the recommended resolution of 256\*64 px. After a page reload the new logo is visible.

It is recommended that your logo has a transparent background because it is used on the login-page, emails and also the web interface.

SeaTable will save the logo as `mylogo.png` on the server at `/opt/seatable-server/seatable/seahub-data/custom/`.

## Configuration via the command line

Instead of upload the logo via the webinterface, you could also create the logo file via the command line. SeaTable expects that you generate a file called `mylogo.png` in the directory `/opt/seatable-server/seatable/seahub-data/custom/`.
The directory `custom` does not exist in general, therefore you might have to create it first.

```bash
mkdir /opt/seatable-server/seatable/seahub-data/custom/
cp mylogo.png /opt/seatable-server/seatable/seahub-data/custom/mylogo.png
```

If your logo is not immediately visible after a page reload, you have to restart the SeaTable container (not the SeaTable service).
The SeaTable container has to create a symlink to make the logo file available to SeaTable.
