# Welcome to the SeaTable Admin Manual

## This manual is for linux admins

This admin manual cover the typical topics, from installation to configuration, backup and maintenance of your **own SeaTable Server**. So if you want to run your own SeaTable Server, this is the place to be! You will find everything a SeaTable administrator needs.

!!! warning "Various IT skills are mandatory"

    SeaTable is a sophisticated software solution comprised of multiple components that must seamlessly interact. Therefore, we advise running your own server only if you possess a solid understanding of topics such as **Docker**, **Docker Compose**, **network ports**, **proxies**, and Linux **bash commands**. Even the best documentation can not describe everything.

If you want to use SeaTable, but you don't want to take the hurdle to run your own server, SeaTable GmbH offers two other products next to **SeaTable Server**:

??? abstract "SeaTable Cloud: ready in seconds"

    Additionally, there is SeaTable Cloud, a SaaS-service for users that do not want to self-host or simply want to trial SeaTable Server. SeaTable Cloud can be used free-of-charge with the "Free" subscription. Registration requires only your email address. More features and higher resource limits are available in SeaTable Cloud's [paid subscriptions](https://seatable.io/preise/?lang=auto).

    [Register now for SeaTable Cloud](https://seatable.io/registrierung/?lang=auto){ .md-button .md-button--primary }

??? tip "SeaTable Dedicated: Full control without any huzzle"

    Then, there is [SeaTable Dedicated](https://seatable.io/on-premises/). SeaTable Dedicated is a managed and private SeaTable Cloud. We (=SeaTable GmbH) run and manage the Server for you, but it is your system. You define which URL to use, which logo or color code should greet your users.

    **Important**: The SeaTable Dedicated System Requires a Minimum of 100 Users.

    [Contact us and get a quote](https://seatable.io/kontakt/?lang=auto){ .md-button .md-button--primary }

## Additional ressources

If you don't want to run your own server but you are searching for additional information, here are some **other ressources**, that might help you also:

- **For users**: For information about how to use SeaTable, please refer to the [user documentation](https://docs.seatable.io/).
- **For developers**: For developer-focus documentation, such as using SeaTable's API, scripting, automations and plugin development refer either to the [API reference](https://api.setable.io) or have a look at the [developer manual](https://developers.seatable.io).
- **Others**: There are additional ressources. Check out our [YouTube channel](https://www.youtube.com/seatable) to get a better understanding of how to use SeaTable or to raise questions at the [community forum](https://forum.seatable.io).

## What is SeaTable?

SeaTable is a no-code database and app-building platform. At the first glimpse it looks like an online spreadsheet selection like google sheets, but under the hood it offers so much more. SeaTable helps you to record and manage all kinds of scattered information. Use Filters, Sortings or Group to work corabolative with friends and collegues. Visualize any data with various plugins like Kanban, Gallery or Calendar.

With APIs and SDKs, you can quickly scale to your needs, automate data processing and automate business processes.

Main features includes:

- A spreadsheet like interface to records data supporting collaboratively editing.
- A form app to collect data from outside.
- Mobile ready UI to be used on browsers in mobile system to view and collect data.
- Comprehensive API and SDK for adding extensions.
- Filters, sorts, charts and pivotal tables to visualize and analyze data.

This admin manual will help you to install, configure and update your own SeaTable Server.

## Installation

This manual provides two different approaches how to install SeaTable.

### Single-Node Installation

There is a _Single-Node Setup_, where all components of SeaTable are installed on one server or virtual machine. All services can be reached by a single URL. The installation is fairly straigt forward thanks to the consequent usage of Docker. This setup is easy for testing and production for up to 100 users.

[Let's begin with the Single-Node installation](/installation-rework/basic-setup/){ .md-button .md-button--primary }

### Advanced Setup

The _'Advanced Setup_ section doesn't entail a distinct installation method; rather, it offers detailed guidance on operating each component independently. It equips you with the knowledge needed to scale your SeaTable Server effectively. Whether you're seeking insights to enhance performance or aiming to construct a highly available cluster setup capable of supporting hundreds of thousands of users, this section provides comprehensive instructions to meet your objectives.

## Screenshots and some impressions of SeaTable

### Login Page

Every user accessing SeaTable via the browser must undergo authentication, typically through a combination of email and password. However, SeaTable goes beyond traditional methods, offering support for advanced authentication protocols such as LDAP, OAuth, and SAML. This ensures flexibility and security in user authentication, catering to diverse organizational needs and preferences

![SeaTable Login Page](./images/screenshot_seatable_login.png)

### Home Page

At SeaTable's Home Page, you gain seamless access to all your bases, each of which functions as a distinct database or process. These bases serve as the foundation for organizing and managing your data, offering versatility in structuring your information according to your specific needs. Whether you're storing project data, tracking tasks, or managing customer information, SeaTable's intuitive interface empowers you to streamline your workflows and harness the full potential of your data assets.

![SeaTable Login Page](./images/screenshot_seatable_home_page.png)

### Base Editor

The base editor serves as the central hub of SeaTable, facilitating the structured storage of diverse information types for you and your team. With collaborative features seamlessly integrated, you can collectively work on your data in real-time. Utilizing the columns within your base, you can effortlessly create customizable input forms and unique views, empowering you to share specific data subsets with others efficiently.

You have complete freedom in designing your bases. You determine the data to be saved and the manner in which you interact with it. Whether it's organizing project details, tracking inventory, or managing contacts, SeaTable empowers you to tailor your bases to your specific needs and workflows.

![SeaTable Base Editor](./images/screenshot_seatable_base_editor.png)
