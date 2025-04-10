# SeaTable AI Integration

SeaTable AI is an extension of SeaTable that providing AI functions.

## Deployment SeaTable AI

The easiest way to deployment SeaTable AI is to deploy it with SeaTable server on the same host. If in some situations, you need to deployment SeaTable AI standalone, you can follow the next section.

NOTE: Deploy SeaTable AI requires SeaTable 5.3.

### Change the .env file

To install SeaTable AI, include `seatable-ai.yml` in the `COMPOSE_FILE` variable within your `.env` file. This instructs Docker to download the required images for SeaTable AI.

Simply copy and paste (:material-content-copy:) the following code into your command line:

```bash
sed -i "s/COMPOSE_FILE='\(.*\)'/COMPOSE_FILE='\1,seatable-ai.yml'/" /opt/seatable-compose/.env
```

### Add SeaTable AI configurations to dtable_web_settings.py file

```py
ENABLE_SEATABLE_AI = True
SEATABLE_AI_SERVER_URL = 'http://seatable-ai:8888'
```

### Download SeaTable AI and restart

One more step is necessary to download the SeaTable AI image and restart the SeaTable service.

```bash
cd /opt/seatable-compose
docker compose up -d
```

Wait some minutes until SeaTable AI finished initializing.

### Modify configurations in the seatable_ai_settings.py file

`/opt/seatable-ai-data/seatable/conf/seatable_ai_settings.py`

```py
# llm
LLM_TYPE = 'open-ai-proxy'
LLM_URL = ''
LLM_KEY = ''

# ocr
OCR_SERVICE_TYPE = ''
OCR_SERVICE_URL = ''
OCR_SERVICE_API_KEY = ''
OCR_SERVICE_SECRET_KEY = ''

# embedding
EMBEDDING_SERVICE_URL = ''
EMBEDDING_SERVICE_KEY = ''

# seasearch
SEASEARCH_SERVER_URL = 'http://seasearch:4080'
SEASEARCH_TOKEN = ''
```

Finally restart SeaTable AI

```bash
cd /opt/seatable-compose
docker compose restart
```

Now SeaTable AI can be used.

## Deploy SeaTable AI standalone

The deployment of a separate SeaTable AI is simple. Get seatable-release from github like described in the installation of seatable server and only use `seatable-ai-standalone.yml`.

Update your `.env`, that it looks like this and add/update the values according to your needs:

```env
COMPOSE_FILE='seatable-ai-standalone.yml'
COMPOSE_PATH_SEPARATOR=','

# system settings
TIME_ZONE='Europe/Berlin'

# seatable server url
SEATABLE_SERVER_HOSTNAME=seatable.your-url.com
SEATABLE_SERVER_PROTOCOL=http

# database
SEATABLE_MYSQL_DB_HOST=
SEATABLE_MYSQL_DB_PORT=3306
SEATABLE_MYSQL_DB_USER=
SEATABLE_MYSQL_DB_PASSWORD=

# redis
REDIS_HOST=
REDIS_PORT=6379
REDIS_PASSWORD=

# SeaTable AI
JWT_PRIVATE_KEY=
```

Note: `JWT_PRIVATE_KEY`, same as the `JWT_PRIVATE_KEY` field in SeaTable `.env` file.

Note: if Redis has no REDIS_PASSWORD, leave it as empty after "=", do not use empty string (like REDIS_PASSWORD="")

Execute `docker compose up -d` to fire up your separate SeaTable AI.

### Modify configurations in the seatable_ai_settings.py file

`/opt/seatable-ai-data/seatable/conf/seatable_ai_settings.py`

```py
# llm
LLM_TYPE = 'open-ai-proxy'
LLM_URL = ''
LLM_KEY = ''

# ocr
OCR_SERVICE_TYPE = ''
OCR_SERVICE_URL = ''
OCR_SERVICE_API_KEY = ''
OCR_SERVICE_SECRET_KEY = ''

# embedding
EMBEDDING_SERVICE_URL = ''
EMBEDDING_SERVICE_KEY = ''

# seasearch
SEASEARCH_SERVER_URL = 'http://seasearch.your-url.com:4080'
SEASEARCH_TOKEN = ''
```

Note: If dtable-web, dtable-server, and dtable-db are not deployed on the same host, you also need to add the following configurations to the `seatable_ai_settings.py` file

```py
DTABLE_SERVER_URL = ''
DTABLE_DB_URL = ''
```

Restart SeaTable AI

```bash
docker compose restart
```

### Configurations of SeaTable Server

SeaTable must know where to get the SeaTable AI.

Add SeaTable AI configurations to dtable_web_settings.py file.

```py
ENABLE_SEATABLE_AI = True
SEATABLE_AI_SERVER_URL = 'http://seatable-ai.example.com:8888'
```

Restart seatable service and test your SeaTable AI.

```bash
docker compose restart
```

## SeaTable AI directory structure

`/opt/seatable-ai-data`

Placeholder spot for shared volumes. You may elect to store certain persistent information outside of a container, in our case we keep various log files outside. This allows you to rebuild containers easily without losing important information.

* /opt/seatable-ai-data/conf: This is the directory for SeaTable AI configuration files.
* /opt/seatable-ai-data/logs: This is the directory for SeaTable AI logs.
* /opt/seatable-ai-data/assets: This is the directory for SeaTable AI assets.
* /opt/seatable-ai-data/index-info: This is the directory for SeaTable AI index.

## Database used by SeaTable AI

SeaTable AI used several database tables like `dtable_db.ai_assistant` to store records.
