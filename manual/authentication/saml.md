# SAML

Security Assertion Markup Language (SAML) is an open standard for exchanging authentication and authorization data between parties. An important use case of SAML is web-browser single sign-on (SSO).

This document assumes that you have a basic understanding of SAML and that you understand the related terminology.

!!! note

        SeaTable's SAML configuration has undergone substantial changes in SeaTable 3.5. It is highly recommended to update to SeaTable 3.5 or younger if you use SAML. The SAML configuration in prior versions is no longer included in this document. You can still find it in Github.

## SSO with SAML in SeaTable

SeaTable supports SSO with SAML. Specifically, SeaTable supports SAML's IdP-init and SP-init authentication flows.

Besides basic authentication and authorization, SeaTable's SAML implementation also allows to have additional attributes be set by the IdP. Specifically, the following five attributes are supported:

| Attribute     | Description                    | Stored in database table                                     | ... in column |
| ------------- | ------------------------------ | ------------------------------------------------------------ | ------------- |
| uid           | Unique identifier from the IdP | [dtable_db.social_auth_usersocialauth](/authentication/auth_overview/#table-social_auth_usersocialauth) | uid           |
| contact_email | Email address of the user      | [dtable_db.profile_profile](/authentication/auth_overview/#table-profile_profile) | contact_email |
| name          | Name of the user               | [dtable_db.profile_profile](/authentication/auth_overview/#table-profile_profile) | nickname      |
| employee_id   | User ID                        | [dtable_db.id_in_org_tuple](/authentication/auth_overview/#table-id_in_org_tuple) | id_in_org     |
| user_role     | Name of the role               | ccnet_db.UserRole                                            | role          |


## Configuration

The SAML configuration proceeds in two phases:

1. IdP: You create a new application in your IdP and configure the application. The IdP-side configuration is concluded with the download of the IdP's signing certificate.
2. SeaTable: You upload the certificate and configure SAML in the config file `dtable_web_settings.py`

SeaTable's SAML configuration must be done manually on the command line. SeaTable does not provide a graphic wizard for configuring SAML. SeaTable cannot be configured by uploading the IdP's `metadata.xml`.

Due to the large number of identity and access management (IAM) solutions, this document explains the general process for configuring SSO with SAML and showcases the procedure using Microsoft Azure AD (Azure) as one example.



## Creating and configuring a new application in the IdP

Add a new application in the IdP and assign at least one user to this application.

The configuration of SSO with SAML for the just created application involves adding SeaTable's SAML URLs as well as specifying the SAML attributes. The following table contains the relevant URLs in generalized form. Replace <YOUR_SEATABLE_SERVER_HOSTNAME> with the fully qualified domain name (FQDN) of your SeaTable Server.

| Type                                 | URL                                                    |
| ------------------------------------ | ------------------------------------------------------ |
| Metadata URL                         | https://<YOUR_SEATABLE_SERVER_HOSTNAME>/saml/metadata |
| Assertion consumer service (ACS) URL | https://<YOUR_SEATABLE_SERVER_HOSTNAME>/saml/acs/      |
| Service URL                          | https://<YOUR_SEATABLE_SERVER_HOSTNAME>/               |


### Downloading the certificate from the IdP

After creating and configuring the application, download the IdP's signing certificate in PEM format. If the certificate cannot be downloaded in PEM format, download the metadata.xml instead and extract the certificate file from there. The content in the \<\<xxx:X509Certificate\>\> tag contains the certificate.

Also note the URL for the IdP's metadata.xml.


### Uploading the IdP's certificate to SeaTable

The IdP's certificate must be saved on the SeaTable Server. The volume of the SeaTable container is the right place. When saved there, the certificate can be used in different SeaTable Docker containers, e.g. when a new container is created during an update.

The default host path for the SeaTable Docker container is `/opt/seatable/seatable-data/` which is mapped to `/shared/` in the container. It is recommended to create a directory here. If you decide to create the directory elsewhere - which you can - you'll need to account for the custom path in the following steps. 

```
$ mdkir /opt/seatable/seatable-data/certs/
```

Change into the directory, create a file idp.crt, and open the file with a text editor of your choice (here nano):

```
$ cd /opt/seatable/seatable-data/certs/
$ touch idp.crt
$ nano idp.crt
```

Paste the content of the certificate in the text editor and save the edits.

Note: You can check the validity of the certificate file using openssl:

```
$ openssl x509 -in idp.crt -noout -dates
```

### Creating SeaTable's Certificate and Key

Create SeaTable's certificate and key using openssl. The two files must be placed in the same directory as the IdP's certificate.

````
$ cd /opt/seatable/seatable-data/certs/
$ openssl req -x509 -nodes -days 3650 -newkey rsa:2048 -keyout sp.key -out sp.crt
````

Once the command has finished, the directory contains three files: `idp.crt`, `sp.crt`, and `sp.key`.


### Modifying the config file in SeaTable

To enable SAML, add the following parameters to `dtable_web_settings.py`, customize the values to your environment, and restart the SeaTable service:

| Parameter                | Description                                                 | Values                                                       |
| ------------------------ | ----------------------------------------------------------- | ------------------------------------------------------------ |
| ENABLE_SAML              | On/off switch for authentication via SAML                   | `True` or `False`                                            |
| SAML_PROVIDER_IDENTIFIER | Internal name for SAML authentication provider              | Alphanumeric string, e.g. "Azure", "Auth0" or "Authentik"    |
| SAML_REMOTE_METADATA_URL | URL of metadata.xml used by SAML IdP                        | URL, e.g. 'https://login.microsoftonline.com/xxx/federationmetadata/2007-06/federationmetadata.xml?appid=xxx' |
| SAML_ATTRIBUTE_MAP       | Key-value pairs mapping SAML attributes to local attributes | Keys are the SAML attributes from the IdP; some IdPs use attribute like 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress' |
| SAML_CERTS_DIR           | Path to certificates within the Seatable Docker container   | Path, e.g. /opt/seatable/seahub-data/certs                   |  

This is a sample configuration. Adapt the values to your needs.

```
ENABLE_SAML = True
SAML_PROVIDER_IDENTIFIER = 'MySAMLProvider'
SAML_REMOTE_METADATA_URL = 'https://login.microsoftonline.com/xxx/federationmetadata/2007-06/federationmetadata.xml?appid=xxx'
SAML_ATTRIBUTE_MAP = {
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn': 'uid',
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': 'contact_email',
    'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': 'name',
}
SAML_CERTS_DIR = '/opt/seatable/seahub-data/certs'
```

!!! Details about the SAML_ATTRIBUTE_MAP

        The `SAML_ATTRIBUTE_MAP` defines which values provided by the IdP will be used to either generate or update the user in SeaTable.
        Key is the uid which is the unique identifier from the identity providers (not the username within SeaTable). This value should never change over the life cycle of the user. If you choose the email address as uid and change it, a new user will be created upon the next login.


### Testing

A restart of the SeaTable service to activate the configuration settings. 

```
# docker exec -it seatable bash
# seatable.sh restart
```

Navigate to the login page of your SeaTable Server and click on "Single sign-on" and try to log in. If the configuration is correct, you'll be redirected the IdP's login. Enter the credentials of a user that was assigned to the application created above.

Check `dtable_web.log` for more info if authentication fails.

## Example: Azure

Browse to 'Azure Active Directory' and select 'Enterprise Applications'. In the 'Enterprise applications | All Applications' pane, click on 'New application' to open the 'Browse Azure AD Gallery'. Hit 'Create your own application', enter the name of the application in the input field (e.g. SeaTable), and click 'Create'. (For more information on [how to add an enterprise application](https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal) or [how to create and assign a user account to an enterprise application](https://learn.microsoft.com/en-us/azure/active-directory/manage-apps/add-application-portal-assign-users), see Microsoft's Azure product documentation.) Azure will then create the application and open its overview page (see screenshot below).

![image-20230505003654359](https://github.com/dada-dudu/seatable-admin-docs/assets/41058728/64df419a-434d-470f-9fb6-2e4ea65696ca)

Select the just created enterprise application. Click on '2. Set up single sign-on' in the overview page and then select SAML as single sign-on method. All SAML-related parameters for the new application are set in the configurator that now opens. 

Step 1: Click on 'Edit' in the top right corner and add SeaTable's metadata URL, ACS URL, and service URL as shown in the screenshot below.

Step 2: Click on 'Edit' in the top corner and define the claims as shown in the screenshot below.

![image-20230505001833665](https://github.com/dada-dudu/seatable-admin-docs/assets/41058728/4bd6c56a-6da5-4341-a758-121121ba6ee9)

Step 3: Note the App Federation Metadata URL and download the certificate. The certificate in Base 64 is the correct certificate format.

![image-20230505001959310](https://github.com/dada-dudu/seatable-admin-docs/assets/41058728/506cf42e-b120-40a0-954f-1b02f588cc74)


Proceed with the [upload of the certificate file to SeaTable](#uploading-the-idp's-certificate-to-seaTable). The SAML configuration in `dtable_web_settings.py` should look like this:

```
ENABLE_SAML = True
SAML_PROVIDER_IDENTIFIER = 'Azure'
SAML_REMOTE_METADATA_URL = 'https://login.microsoftonline.com/826f1810-ccc9-.../federationmetadata/2007-06/federationmetadata.xml?appid=...'
SAML_ATTRIBUTE_MAP = {
    'uid': 'uid',                       #required
    'mail': 'contact_email',            #required
    'name': 'name',                     #required
    'employeeid': 'employee_id',        #optional
    'jobtitle': 'user_role',            #optional
}
SAML_CERTS_DIR = '/shared/certs/'
```
