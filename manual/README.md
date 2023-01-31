# Introduction

SeaTable is an online lightweight database with a spreadsheet interface. It helps you to easily record and manage all kinds of scattered information. With APIs and SDKs, you can quickly scale to your needs, automate data processing and automate business processes.

Main features includes:

* A spreadsheet like interface to records data supporting collaboratively editing.
* A form app to collect data from outside.
* Mobile ready UI to be used on browsers in mobile system to view and collect data.
* Comprehensive API and SDK for adding extensions.
* Filters, sorts, charts and pivotal tables to visualize and analyze data.

## Software components

SeaTable consists of following component

* dtable-web: The website for manage bases.
* dtable-server: Store the bases and provide collaborating feature.
* dtable-db: Provide big data storage and SQL query interface.
* dtable-events: Background tasks likes email sending and so on.
* seaf-server: Store attachments (files and images).
* dtable-storage-serve: An simple abstract layer upon file storage and S3-like object storage.

The following picture shows how the different components work together:


![seatable-architecture](./images/auto-upload/seatable-architecture.png)


Some explanation:

* MariaDB, Memcache, Redis are running in their own docker containers.
* Redis is used for sending messages from dtable-web/dtable-server to dtable-events
* All the components use Memcache for storing cache and MariaDB for storing permanent information
* Bases are maintained in dtable-server and periodically saved to dtable-storage-server for persistent storage.
* Attachments are saved in seaf-server, which save to file storage/object storage

A base in SeaTable is saved as a file, and when users access the base, it will be loaded into dtable-server. When the base is modified, dtable-server automatically saves it to dtable-storage-server every 5 minutes. dtable-storage-server creates a snapshot of the base every 24 hours.

The base cannot contain more than 100,000 rows. If the records are close to 100,000, the record can be transferred from the file (dtable-server is responsible for management) to the big data storage (dtable-db is responsible for management) through the archive operation. dtable-db periodically saves backups of big data storage to dtable-storage-server.


## LICENSE

SeaTable has three versions

* Developer edition: for users that want to use SeaTable as database and heavy using APIs and scripts.  The developer edition has no limit on storage, row numbers and API calls, but can support at most 200 concurrent connections to dtable-server.
* Cloud edition: for users that want to use SeaTable as a collaboration tool. It has limitation for storage, row numbers and API calls.
* Enterprise edition: almost no limitation for storage, row numbers and API calls and have advanced permissions and user management features. It is meant for large teams to use SeaTable in both ways. Users can use it in the cloud or self-hosted.

The different components of SeaTable developer edition are released under different licenses:

* dtable-web: Apache License v2
* dtable-events: Apache License v2
* dtable-server: [Proprietary License](dtable-server-license.md)
* seaf-server: AGPLv3

SeaTable developer edition should not be used to provide SaaS service or as a part of your SaaS service. Other kinds of usage are okay, including

* Use it internally in your company.
* Personal or home use.
* Use it to collaborate with your customers.
* Use it for IT projects for your customers, as long as you use a separate server for each of your customers.

The SeaTable enterprise edition is released under proprietary license.

## Report issues

Please report issues to our forum <https://forum.seatable.io/>

## More information

* GitHub: <https://github.com/seatable/seatable>


