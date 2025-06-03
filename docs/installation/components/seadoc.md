# SeaDoc Editor

SeaDoc editor is an extension providing an online collaborative document editor, which designed around the following key ideas:

- An expressive easy to use editor
- A review and approval workflow to better control how contents changes
- Inter-document linking for connecting related contents
- AI integration that streamlines content generation, summarization, and management
- Comprehensive APIs for automating document generating and processing

Comparing to other online document editor, SeaDoc excels at:

- Authoring product and technical documents
- Creating knowledge base articles and online manuals
- Building internal Wikis

How dose SeaDoc server work:

1. When a user opens an sdoc file in a browser, a request to load the file is sent to the SeaDoc server.
2. If the file content is cached, the SeaDoc server returns the file content; otherwise, the SeaDoc server sends a request to open the file to the SeaTable. When the SeaTable loading the file content, it sends it to the SeaDoc server and writes it to the cache at the same time.
3. Finally, SeaDoc returns the content to the user's browser.

## Deployment SeaDoc

### Amend the `.env` file

To install the Python Pipeline, append `seadoc.yml` to the `COMPOSE_FILE` variable within your `.env` file. This instructs Docker to download the required images for the Python Pipeline.

Simply copy and paste (:material-content-copy:) the following code into your command line:

```bash
sed -i "s/COMPOSE_FILE='\(.*\)'/COMPOSE_FILE='\1,seadoc.yml'/" /opt/seatable-compose/.env
echo "ENABLE_SEADOC=true" >> /opt/seatable-compose/.env
```

!!! warning "Avoid space in `COMPOSE_FILE`"
    When manually adding `seadoc.yml` to the `COMPOSE_FILE` variable using your preferred text editor, make sure that you do not enter a space (:material-keyboard-space:). After the modification, your `COMPOSE_FILE` variable should look like this:

    ```bash
    COMPOSE_FILE='caddy.yml,seatable-server.yml,seadoc.yml'
    ```

### Restart the SeaTable server and enable ***Report Design*** Plugin

1. Restart the Docker compose of SeaTable server to make the modifications take effect.

    ```sh
    cd /opt/seatable-compose
    docker compose down && docker compose up -d
    ```
2. Import ***Report Design*** plugin in the page *System admin* - *Plugins* - *Import plugin from market*.

:material-party-popper: **Great!**: You can create and modify the documents online within the plugin ***Report Design*** in a base.
