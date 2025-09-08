# SeaTable AI Integration

<!-- md:version 6.0 -->

SeaTable AI is an extension of SeaTable that providing AI functions.

SeaSearch, a file indexer with more lightweight and efficiency than Elasticsearch.

## Deployment SeaTable AI

The easiest way to deployment SeaTable AI is to deploy it with SeaTable server on the same host. If in some situations, you need to deployment SeaTable AI standalone, you can follow the next section.

!!! note "Deploy SeaTable AI requires SeaTable 6.0"

### Change the .env file

To install SeaTable AI, include `seatable-ai.yml` and `seasearch.yml`in the `COMPOSE_FILE` variable within your `.env` file. This instructs Docker to download the required images for SeaTable AI.

Simply copy and paste (:material-content-copy:) the following code into your command line:

```bash
sed -i "s/COMPOSE_FILE='\(.*\)'/COMPOSE_FILE='\1,seatable-ai.yml,seasearch.yml'/" /opt/seatable-compose/.env
```

Then add SeaTable AI server and SeaSearch configurations in `.env`:

```env
ENABLE_SEATABLE_AI=true
SEATABLE_AI_SERVER_URL=http://seatable-ai:8888

ENABLE_SEARCH=true
INIT_SS_ADMIN_USER=
INIT_SS_ADMIN_PASSWORD=
SEASEARCH_SERVER_URL=http://seasearch:4080
SEASEARCH_TOKEN=  # get from `echo -n 'INIT_SS_ADMIN_USER:INIT_SS_ADMIN_PASSWORD' | base64`
```

!!! note "Details for `SEASEARCH_TOKEN`"
    Get your authorization token (SEASEARCH_TOKEN) by base64 code consist of INIT_SS_ADMIN_USER and INIT_SS_ADMIN_PASSWORD defined in .env firstly, which is used to authorize when calling the SeaSearch API:

    ```bash
    echo -n 'username:password' | base64

    # example output
    YWRtaW46YWRtaW5fcGFzc3dvcmQ=
    ```

SeaTable AI will use AI functions in conjunction with the Large Language Model (LLM) service. Therefore, in order for SeaTable AI to work properly, you also need to add LLM configuration information to `.env`:

<a id="llm-configuration"></a>
=== "OpenAI"
    ```
    SEATABLE_AI_LLM_TYPE=openai
    SEATABLE_AI_LLM_KEY=<your openai LLM access key>
    SEATABLE_AI_LLM_MODEL=gpt-4o-mini # recommend
    ```
=== "Deepseek"
    ```
    SEATABLE_AI_LLM_TYPE=deepseek
    SEATABLE_AI_LLM_KEY=<your LLM access key>
    SEATABLE_AI_LLM_MODEL=deepseek-chat # recommend
    ```
=== "Azure OpenAI"
    ```
    SEATABLE_AI_LLM_TYPE=azure
    SEATABLE_AI_LLM_URL= # your deployment url, leave blank to use default endpoint
    SEATABLE_AI_LLM_KEY=<your API key>
    SEATABLE_AI_LLM_MODEL=<your deployment name>
    ```
=== "Ollama"
    ```
    SEATABLE_AI_LLM_TYPE=ollama
    SEATABLE_AI_LLM_URL=<your LLM endpoint>
    SEATABLE_AI_LLM_KEY=<your LLM access key>
    SEATABLE_AI_LLM_MODEL=<your model-id>
    ```
=== "HuggingFace"
    ```
    SEATABLE_AI_LLM_TYPE=huggingface
    SEATABLE_AI_LLM_URL=<your huggingface API endpoint>
    SEATABLE_AI_LLM_KEY=<your huggingface API key>
    SEATABLE_AI_LLM_MODEL=<model provider>/<model-id>
    ```
=== "Self-proxy Server"
    ```
    SEATABLE_AI_LLM_TYPE=proxy
    SEATABLE_AI_LLM_URL=<your proxy url>
    SEATABLE_AI_LLM_KEY=<your proxy virtual key> # optional
    SEATABLE_AI_LLM_MODEL=<model-id>
    ```
=== "Other"
    Seafile AI utilizes [LiteLLM](https://docs.litellm.ai/docs/) to interact with LLM services. For a complete list of supported LLM providers, please refer to [this documentation](https://docs.litellm.ai/docs/providers). Then fill the following fields in your `.env`:

    ```
    SEATABLE_AI_LLM_TYPE=...
    SEATABLE_AI_LLM_URL=...
    SEATABLE_AI_LLM_KEY=...
    SEATABLE_AI_LLM_MODEL=...
    ```

    For example, if you are using a LLM service with ***OpenAI-compatible endpoints***, you should set `SEATABLE_AI_LLM_TYPE` to `other` or `openai`, and set other LLM configuration items accurately.

!!! note "About model selection"

    SeaTable AI supports using large model providers from [LiteLLM](https://docs.litellm.ai/docs/providers) or large model services with OpenAI-compatible endpoints. Therefore, SeaTable AI is compatible with most custom large model services except the default model (*gpt-4.1*), but in order to ensure the normal use of SeaTable AI features, you need to select a **multimodal large model** (such as supporting image input and recognition)


### Download SeaTable AI image and restart

One more step is necessary to download the SeaTable AI image and restart the SeaTable service.

```bash
cd /opt/seatable-compose
docker compose down && docker compose up -d
```

Now SeaTable AI can be used.

## Deploy SeaTable AI standalone

The deployment of a separate SeaTable AI is simple. Get seatable-release from github like described in the installation of seatable server and only use `seatable-ai-standlone.yml` and `seasearch.yml`.

### Update `.env` in the host will deploy SeaTable AI

Update your `.env`, that it looks like this and add/update the values according to your needs:

```env
COMPOSE_FILE='seatable-ai-standlone.yml,seasearch.yml'
COMPOSE_PATH_SEPARATOR=','

# system settings
TIME_ZONE='Europe/Berlin'

# database
MARIADB_HOST=
MARIADB_PORT=3306
MARIADB_PASSWORD=

# redis
REDIS_HOST=
REDIS_PORT=6379
REDIS_PASSWORD=

# For SeaTable
JWT_PRIVATE_KEY=
SEATABLE_SERVER_URL=https://seatable.your-domain.com # dtable-web's URL

## dtable-server's url, `http://dtable-inner-proxy/dtable-server` for cluster
INNER_DTABLE_SERVER_URL=https://seatable.your-domain.com/dtable-server/

## dtable-db's url, `http://dtable-inner-proxy/dtable-db` for cluster
INNER_DTABLE_DB_URL=https://seatable.your-domain.com/dtable-db/

# LLM
SEATABLE_AI_LLM_TYPE=openai
SEATABLE_AI_LLM_URL=
SEATABLE_AI_LLM_KEY=...
SEATABLE_AI_LLM_MODEL=gpt-4.1

# SeaSearch
ENABLE_SEARCH=true
INIT_SS_ADMIN_USER=
INIT_SS_ADMIN_PASSWORD=
SEASEARCH_SERVER_URL=http://seasearch:4080
SEASEARCH_TOKEN=  # get from `echo -n 'INIT_SS_ADMIN_USER:INIT_SS_ADMIN_PASSWORD' | base64`
```

!!! warning
    - `JWT_PRIVATE_KEY`, same as the `JWT_PRIVATE_KEY` field in SeaTable `.env` file.

    - If Redis has no REDIS_PASSWORD, leave it as empty after "=", do not use empty string (like REDIS_PASSWORD="")

!!! note "Details for `SEASEARCH_TOKEN`"
    Get your authorization token (SEASEARCH_TOKEN) by base64 code consist of INIT_SS_ADMIN_USER and INIT_SS_ADMIN_PASSWORD defined in .env firstly, which is used to authorize when calling the SeaSearch API:

    ```bash
    echo -n 'username:password' | base64

    # example output
    YWRtaW46YWRtaW5fcGFzc3dvcmQ=
    ```

!!! note "About model selection and LLM configurations"

    SeaTable AI supports using large model providers from [LiteLLM](https://docs.litellm.ai/docs/providers) or large model services with OpenAI-compatible endpoints. Therefore, SeaTable AI is compatible with most custom large model services except the default model (*gpt-4.1*), but in order to ensure the normal use of SeaTable AI features, you need to select a **multimodal large model** (such as supporting image input and recognition).

    We also provide some [reference configurations](#llm-configuration) for the LLM service provider in this manual (it is irrelevant to whether SeaTable AI is deployed standalone). You can also adjust these configurations based on your actual situation.

Execute `docker compose up -d` to fire up your separate SeaTable AI.

### Configurations of SeaTable Server

SeaTable must know where to get the SeaTable AI.

Add SeaTable AI configurations to `.env` file where deployed SeaTable.

```py
ENABLE_SEATABLE_AI = True
SEATABLE_AI_SERVER_URL = 'http://seatable-ai.example.com:8888'
```

Restart seatable service and test your SeaTable AI.

```bash
docker compose down && docker compose up -d
```

## Advanced operations

### Context management

You can manage SeaTable AI's context policies by modifying `/opt/seatable-server/seatable/conf/seatable_ai_settings.py`:

```py
# The maximum number of entries in the context record, default is 10. When set to 0, the entire history of the current session will be read
CONTEXT_WINDOW_LIMIT = 10

# The validity time (hour) of tool calls' history in the context within CONTEXT_WINDOW_LIMIT. When set to 0, all tool calls' history will be loaded into the context
CONTEXT_TOOLS_VALID_TIME = 24 # hour

# The validity time (hour) of common conversations' history (user input and assistant output) in the context within CONTEXT_WINDOW_LIMIT. When set to 0, all common conversations' history will be loaded into the context
CONTEXT_CONVERSATION_VALID_TIME = 168 # hour
```

## SeaTable AI directory structure

`/opt/seatable-server`

Placeholder spot for shared volumes. You may elect to store certain persistent information outside of a container, in our case we keep various log files outside. This allows you to rebuild containers easily without losing important information.

* /opt/seatable-server/conf: This is the directory for SeaTable AI configuration files.
* /opt/seatable-server/logs: This is the directory for SeaTable AI logs.
* /opt/seatable-server/ai-data/assets: This is the directory for SeaTable AI assets.
* /opt/seatable-server/ai-data/index-info: This is the directory for SeaTable AI index.

`/opt/seasearch-data`

* /opt/seasearch-data/logs: This is the directory for SeaSearch logs.

## Database used by SeaTable AI

SeaTable AI used several database tables like `dtable_db.ai_assistant` to store records.
