# SeaTable AI Integration

SeaTable AI is an extension of SeaTable that providing AI functions.

SeaSearch, a file indexer with more lightweight and efficiency than Elasticsearch.

## Deployment SeaTable AI

The easiest way to deployment SeaTable AI is to deploy it with SeaTable server on the same host. If in some situations, you need to deployment SeaTable AI standalone, you can follow the next section.

Note: Deploy SeaTable AI requires SeaTable 5.3.

### Change the .env file

To install SeaTable AI, include `seatable-ai.yml` and `seasearch.yml`in the `COMPOSE_FILE` variable within your `.env` file. This instructs Docker to download the required images for SeaTable AI.

Simply copy and paste (:material-content-copy:) the following code into your command line:

```bash
sed -i "s/COMPOSE_FILE='\(.*\)'/COMPOSE_FILE='\1,seatable-ai.yml,seasearch.yml'/" /opt/seatable-compose/.env
```

Then add SeaTable AI and SeaSearch configurations in `.env`:

```env
ENABLE_SEATABLE_AI=true
SEATABLE_AI_SERVER_URL=http://seatable-ai:8888

SEATABLE_AI_LLM_TYPE=openai
SEATABLE_AI_LLM_KEY=<your API key>
SEATABLE_AI_LLM_MODEL=gpt-4.1

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

!!! tip "Use the custom models not from OpenAI Ltc."
    SeaTable AI supports users to use large language models (LLM) that are not provided by OpenAI Ltd. However, the model service selected by the user needs to be compatible with the OpenAI API. To use custom models, please make the following changes in `.env`:

    ```env
    SEATABLE_AI_LLM_TYPE=other
    SEATABLE_AI_LLM_URL=https://api.openai.com/v1 # your LLM service endpoint
    SEATABLE_AI_LLM_KEY= # your API key
    SEATABLE_AI_LLM_MODEL=gpt-4.1 # your custom model id
    ```

### Download SeaTable AI and restart

One more step is necessary to download the SeaTable AI image and restart the SeaTable service.

```bash
cd /opt/seatable-compose
docker compose down && docker compose up -d
```

Now SeaTable AI can be used.

## Deploy SeaTable AI standalone

The deployment of a separate SeaTable AI is simple. Get seatable-release from github like described in the installation of seatable server and only use `seatable-ai.yml` and `seasearch.yml`.

### Update `seatable-ai.yml` and expose service port

Update your `seatable-ai.yml` and expose service port:

```yml
services:
  seatable-ai:
    ...
    ports:
      - "8888:8888"
    ...
```

### Update `.env` in the host will deploy SeaTable AI

Update your `.env`, that it looks like this and add/update the values according to your needs:

```env
COMPOSE_FILE='seatable-ai,seasearch.yml'
COMPOSE_PATH_SEPARATOR=','

# system settings
TIME_ZONE='Europe/Berlin'

# database
SEATABLE_MYSQL_DB_HOST=
SEATABLE_MYSQL_DB_PORT=3306
SEATABLE_MYSQL_DB_USER=
SEATABLE_MYSQL_DB_PASSWORD=

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
SEATABLE_AI_LLM_KEY=
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

!!! tip "Use the custom models not from OpenAI Ltc."
    SeaTable AI supports users to use large language models (LLM) that are not provided by OpenAI Ltd. However, the model service selected by the user needs to be compatible with the OpenAI API. To use custom models, please make the following changes in `.env`:

    ```env
    SEATABLE_AI_LLM_TYPE=other
    SEATABLE_AI_LLM_URL=https://api.openai.com/v1 # your LLM service endpoint
    SEATABLE_AI_LLM_KEY= # your API key
    SEATABLE_AI_LLM_MODEL=gpt-4.1 # your custom model id
    ```

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
