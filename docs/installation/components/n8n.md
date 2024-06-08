# Automation platform n8n

SeaTable empowers users and teams to store, manage, and visualize structured data efficiently, offering multiple data input options from manual entry to web forms and a comprehensive API. This flexibility ensures seamless data collection while allowing users to define automated workflows with triggers and actions.

However, for those seeking additional software solutions or more sophisticated automation workflows, n8n provides the perfect complement. By integrating SeaTable with n8n, users can unlock even more powerful automation capabilities.

n8n serves as an automation platform, enabling seamless connectivity between SeaTable and hundreds of other software products. Need to collect data from multistep web forms using JotForm, Typeform, or Form.io? No problem. Simply create your web forms and utilize n8n to seamlessly transfer survey results to SeaTable.

Give [n8n](https://n8n.io) a try, and we guarantee you'll fall in love with it just like we have! :heart:

!!! tip "Want to watch a step-by-step video instead of reading a manual?"

    Watch a brief English video demonstrating all the essential steps:

    :fontawesome-brands-youtube:{ style="color: #EE0F0F" }
    __[Easy n8n Installation on SeaTable]__ :octicons-clock-24: 10m
    [Easy n8n Installation on SeaTable]: https://www.youtube.com/watch?v=_mkA410VDT4

## Installation

This article shows you how to install **n8n** (Community Edition) on your SeaTable server.

#### Change the .env file

Like with all additional components you first have to add the `n8n.yml` to the `COMPOSE_FILE` variable in your `.env` file.

Simply copy and paste (:material-content-copy:) the following code into your command line:

```bash
sed -i "s/COMPOSE_FILE='\(.*\)'/COMPOSE_FILE='\1,n8n.yml'/" /opt/seatable-compose/.env
```

#### Generate secrets for your postgres database

Now let's create inital secrets and write them into the .env file.

```
echo -e "\n# n8n" >> /opt/seatable-compose/.env
echo "N8N_ENCRYPTION_KEY=$(pwgen -s 40 1)" >> /opt/seatable-compose/.env
echo "POSTGRES_PASSWORD=$(pwgen -s 40 1)" >> /opt/seatable-compose/.env
echo "POSTGRES_NON_ROOT_PASSWORD=$(pwgen -s 40 1)" >> /opt/seatable-compose/.env
```

#### Start n8n

Now it is time to start n8n for the first time.

```bash
cd /opt/seatable-compose && \
docker compose up -d
```

**Congratulations!** Your n8n server is ready to use.

## Initial setup

#### Create initial admin user

To set up your initial admin user, n8n offers a convenient Web UI accessible at `https://<your-seatable-server-hostname>:6231`.

![n8n Setup Page](../../assets/images/n8n-setup.png)

Please note that the Community Edition of n8n only permits the creation of multiple accounts with just one admin account. Further details regarding the features of this version will be elaborated later in this article.

#### Obtaining the Latest SeaTable Node

Regrettably, the current version of n8n comes with an outdated SeaTable node. To address this, it's advisable to install the most recent version of the SeaTable node as a community node. Simply navigate to `Settings` and then choose `Community nodes`. From there, you can add any community node from <https://www.npmjs.com>.

Click on `install`, input **n8n-nodes-seatable**, and proceed with the confirmation. Within seconds, you'll notice that the community node is successfully installed.

![n8n SeaTable Community node](../../assets/images/n8n-seatable-community-node.png)

[Read more about this community node in SeaTable Forum →](https://forum.seatable.io/t/rework-of-n8n-seatable-integration/2745/10)

## Limitations of the Community Edition of n8n

The installed n8n version on this server is the self-hosted free Community Edition, which aligns with the **Starter Cloud version**.

It offers:

- Unlimited executions
- Unlimited active workflows
- No execution time limit
- Support for all existing nodes

However, there are some limitations to be aware of:

- Only one admin account is allowed
- Variables are not supported (consider using SeaTable instead)
- External Secrets and Environments are not supported
- Single Sign-On (SSO) and LDAP is not supported
- Log Streaming is not supported

For further information, visit the [n8n forum](https://community.n8n.io/t/feedback-self-hosted-pricing/22727/56).

If you find n8n useful (which you most likely will), consider [purchasing an Enterprise license](https://n8n.io/pricing/).

## Next steps

Check the docs of n8n at https://docs.n8n.io/.
