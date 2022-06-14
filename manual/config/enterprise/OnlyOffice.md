# OnlyOffice

## Deploy the OnlyOffice service

1\. It is recommended that you use docker to deploy the OnlyOffice service. Use the following command to pull the OnlyOffice docker image and start the container

```
docker run -i -t -d -p 9000:80 --name=onlyoffice --dns={your OnlyOffice server's domain or IP} onlyoffice/documentserver

```

2\. Log in to http{s}://{your OnlyOffice server's domain or IP}/welcome/ to test whether the OnlyOffice service has been started

3\. According to the prompts on the page, install the test example

![](../../images/auto-upload/image-1636710242719.png?raw=1)

4\. Enter the test page, upload the office file, and test whether OnlyOffice service can work normally

![](../../images/auto-upload/image-1636943156207.png?raw=1)

**For more information about the configuration of OnlyOffice docker container, please refer to the official document:** <https://helpcenter.onlyoffice.com/installation/docs-developer-install-docker.aspx?from=api_csharp_example>

## Configure SeaTable

Integrate OnlyOffice into SeaTable by modifying the dtable_web_settings.py configuration file.

Add the following configuration in the dtable_web_settings.py:

```python
ENABLE_ONLYOFFICE = True
ONLYOFFICE_APIJS_URL = "http{s}://{your OnlyOffice server's domain or IP}/web-apps/apps/api/documents/api.js"
ONLYOFFICE_FILE_EXTENSION = ('doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx', 'odt', 'fodt', 'odp', 'fodp', 'ods', 'fods', 'csv', 'ppsx', 'pps')
```

After restarting SeaTable, you can use OnlyOffice to preview the office files in the SeaTable base.
