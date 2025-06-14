# Welcome to the SeaTable Admin Manual

## Who is this Manual for?

You want to run your own **SeaTable Server**, then this Seatable Admin Manual (Manual) is the place to be!


!!! warning "Various IT skills are mandatory"

    SeaTable is a sophisticated software solution comprised of multiple components that must seamlessly interact. Therefore, we advise running your own server only if you possess a solid understanding of topics such as **Docker**, **Docker Compose**, **network ports**, **proxies**, and Linux **bash commands**. Even the best documentation can not describe everything.

If you want to use SeaTable, but you don't want to run your own server, SeaTable GmbH offers two other products next to **SeaTable Server**:

??? abstract "SeaTable Cloud: public SAAS"

    SeaTable Cloud is the product of choice for small- and medium-sized enterprises that just want to use SeaTable - quickly and at transparent cost. SeaTable Cloud can be used free-of-charge with the Free subscription. Registration for SeaTable Cloud requires only an email address. More features and higher resource limits are available in SeaTable Cloud's [paid subscriptions](https://seatable.com/en/preise/).

    [Register now for SeaTable Cloud](https://seatable.com/registration/){ .md-button .md-button--primary }

??? tip "SeaTable Dedicated: private SAAS"

    [SeaTable Dedicated](https://seatable.com/dedicated/) is a custom SeaTable Server instance for you and your team operated by the SeaTable exports. You define which URL to use, which logo or color code should greet your users.

    **Important**: SeaTable Dedicated requires a minimum of 100 Users.

    [Contact us and get a quote](https://seatable.com/contact/){ .md-button .md-button--primary }


## Scope of this Manual

This Manual covers all relevant admin topics, from installation, configuration, upgrade, and maintenance, and provides background information on software architecture, requirements, and development.

This Manual is NO **user** manual. For information about how to use SeaTable, please refer to the [user documentation](https://help.seatable.com/).

If you are a **developer** looking for development resources, please check out the [Developer Manual](https://developer.seatable.com) and the [API Reference](https://api.seatable.com).

This is not the place for discussion either. You can ask questions about SeaTable in the [SeaTable Forum](https://forum.seatable.com). Looking forward to seeing you there!

## Contributing to this Manual

You found an error in the Manual or you see the need to elaborate on a topic, please create a pull request. We appreciate your contribution!

## What is SeaTable?

SeaTable is a no-code database and app-building platform. At the first glimpse it looks like an online spreadsheet selection like google sheets, but under the hood it offers so much more. SeaTable helps you to record and manage all kinds of scattered information. Use Filters, Sortings or Group to work corabolative with friends and collegues. Visualize any data with various plugins like Kanban, Gallery or Calendar.

With APIs and SDKs, you can quickly scale to your needs, automate data processing and automate business processes.

Main features includes:

- A spreadsheet like interface to records data supporting collaboratively editing.
- A form app to collect data from outside.
- Mobile ready UI to be used on browsers in mobile system to view and collect data.
- Comprehensive API and SDK for adding extensions.
- Filters, sorts, charts and pivotal tables to visualize and analyze data.

This Manual will help you to install, configure and update your own SeaTable Server.

## Installation

This Manual provides two different approaches to installing SeaTable Server.

### Single-Node Installation

There is a _Single-Node Setup_, where all components of SeaTable Server are installed on one server or virtual machine. All services can be reached by a single URL. The installation is straightforward thanks to the consequent usage of Docker. This setup is easy for testing and production for up to 100 users.

[Let's begin with the Single-Node installation](installation/basic-setup.md){ .md-button .md-button--primary }

### Advanced Setup

The _Advanced Setup_ section doesn't entail a distinct installation method; rather, it offers detailed guidance on operating each component independently. It equips you with the knowledge needed to scale your SeaTable Server effectively. Whether you're seeking insights to enhance performance or aiming to construct a highly available cluster setup capable of supporting hundreds of thousands of users, this section provides comprehensive instructions to meet your objectives.

## Impressions of SeaTable

### Login Page

Every user accessing SeaTable via the browser must undergo authentication, typically through a combination of email and password. However, SeaTable goes beyond traditional methods, offering support for advanced authentication protocols such as LDAP, OAuth, and SAML. This ensures flexibility and security in user authentication, catering to diverse organizational needs and preferences

![SeaTable Login Page](assets/images/screenshot_seatable_login.png)

### Home Page

At SeaTable's Home Page, you gain seamless access to all your bases, each of which functions as a distinct database or process. These bases serve as the foundation for organizing and managing your data, offering versatility in structuring your information according to your specific needs. Whether you're storing project data, tracking tasks, or managing customer information, SeaTable's intuitive interface empowers you to streamline your workflows and harness the full potential of your data assets.

![SeaTable Login Page](assets/images/screenshot_seatable_home_page.png)

### Base Editor

The base editor serves as the central hub of SeaTable, facilitating the structured storage of diverse information types for you and your team. With collaborative features seamlessly integrated, you can collectively work on your data in real-time. Utilizing the columns within your base, you can effortlessly create customizable input forms and unique views, empowering you to share specific data subsets with others efficiently.

You have complete freedom in designing your bases. You determine the data to be saved and the manner in which you interact with it. Whether it's organizing project details, tracking inventory, or managing contacts, SeaTable empowers you to tailor your bases to your specific needs and workflows.

![SeaTable Base Editor](assets/images/screenshot_seatable_base_editor.png)
