# SeaTable AI Integration

<!-- md:version 6.0 -->

SeaTable AI is a SeaTable extension that integrates AI functionality into SeaTable.
Deploying SeaTable AI allows users to execute AI-based automation steps within SeaTable.

At the time of writing, the following types of automation steps are supported:

- **Summarize**
- **Classify**
- **OCR** (Optical character recognition)
- **Extract**
- **Custom** for individual use cases

## Deployment

!!! note "SeaTable AI requires SeaTable 6.0"

The easiest way to deploy SeaTable AI is to deploy it on the same host as SeaTable Server. A standalone deployment (on a separate host or virtual machine) is explained [here](../advanced/seatable-ai-standalone.md).

### Amend the .env file

To install SeaTable AI, include `seatable-ai.yml` in the `COMPOSE_FILE` variable within your `.env` file. This instructs Docker-Compose to include the `seatable-ai` service.

Simply copy and paste (:material-content-copy:) the following code into your command line:

```bash
sed -i "s/COMPOSE_FILE='\(.*\)'/COMPOSE_FILE='\1,seatable-ai.yml'/" /opt/seatable-compose/.env
```

Then add SeaTable AI server configurations in `.env`:

```ini
ENABLE_SEATABLE_AI=true
SEATABLE_AI_SERVER_URL=http://seatable-ai:8888
```

#### LLM Provider Configuration

SeaTable AI will use AI functions in conjunction with a Large Language Model (LLM) service.

!!! note "Supported LLM Providers"

    SeaTable AI supports a wide variety of LLM providers through [LiteLLM](https://docs.litellm.ai/docs) as well as any LLM services with OpenAI-compatible endpoints. Please refer to [LiteLLM's documentation](https://docs.litellm.ai/docs/providers) in case you run into issues while trying to use a specific provider.

!!! note "Model Selection"

    In order to ensure the efficient use of SeaTable AI features, you need to select a **large, multimodal model**.
    This requires the chosen model to support image input and recognition (e.g. for running OCR as part of automations).

The following section showcases the required configuration settings for the most popular hosted LLM services.
These must be configured inside your `.env` file:

<a id="llm-configuration"></a>
=== "OpenAI"
    ```ini
    SEATABLE_AI_LLM_TYPE=openai
    SEATABLE_AI_LLM_KEY=<your openai LLM access key>
    SEATABLE_AI_LLM_MODEL=gpt-4o-mini # recommended
    ```
=== "Deepseek"
    ```ini
    SEATABLE_AI_LLM_TYPE=deepseek
    SEATABLE_AI_LLM_KEY=<your LLM access key>
    SEATABLE_AI_LLM_MODEL=deepseek-chat # recommended
    ```
=== "Azure OpenAI"
    ```ini
    SEATABLE_AI_LLM_TYPE=azure
    SEATABLE_AI_LLM_URL= # your deployment url, leave blank to use default endpoint
    SEATABLE_AI_LLM_KEY=<your API key>
    SEATABLE_AI_LLM_MODEL=<your deployment name>
    ```
=== "Ollama"
    ```ini
    SEATABLE_AI_LLM_TYPE=ollama_chat
    SEATABLE_AI_LLM_URL=<your LLM endpoint>
    SEATABLE_AI_LLM_KEY=<your LLM access key>
    SEATABLE_AI_LLM_MODEL=<your model-id>
    ```
=== "HuggingFace"
    ```ini
    SEATABLE_AI_LLM_TYPE=huggingface
    SEATABLE_AI_LLM_URL=<your huggingface API endpoint>
    SEATABLE_AI_LLM_KEY=<your huggingface API key>
    SEATABLE_AI_LLM_MODEL=<model provider>/<model-id>
    ```
=== "Self-Hosted Proxy Server"
    ```ini
    SEATABLE_AI_LLM_TYPE=proxy
    SEATABLE_AI_LLM_URL=<your proxy url>
    SEATABLE_AI_LLM_KEY=<your proxy virtual key> # optional
    SEATABLE_AI_LLM_MODEL=<model-id>
    ```
=== "Other"
    If you are using an LLM service with ***OpenAI-compatible endpoints***, you should set `SEATABLE_AI_LLM_TYPE` to `other` or `openai`, and set other LLM configuration settings as necessary:

    ```ini
    SEATABLE_AI_LLM_TYPE=...
    SEATABLE_AI_LLM_URL=...
    SEATABLE_AI_LLM_KEY=...
    SEATABLE_AI_LLM_MODEL=...
    ```

### Download SeaTable AI image and restart

One more step is necessary to download the SeaTable AI image and restart the SeaTable service:

```bash
cd /opt/seatable-compose
docker compose up -d
```

Now SeaTable AI can be used.

## Advanced operations

### Token usage and fee statistics

SeaTable AI supports enabling token usage and fee statistics (can view it by moving the mouse to the statistics column when move the mouse to the avatar). 

1. Add the following content to `/opt/seatable-server/seatable/conf/dtable_web_settings.py` to enable token usage and fee statistics:

    ```py
    AI_PRICES = {
        "your_model_id": { # your model name, same as SEATABLE_AI_LLM_MODEL
            "input_tokens_1k": 0.01827, # price / 1000 tokens
            "output_tokens_1k": 0.07309 # price / 1000 tokens
        },
    }
    ```

2. Refer to management of [roles and permission](../../configuration/roles-and-permissions.md#user-quotas) to specify `ai_credit_per_user` (-1 is unlimited), and the unit should be the same as in `AI_PRICES`.

!!! note "`ai_credit_per_user` for organization users"
    For organizational team users, `ai_credit_per_user` will apply to the entire team. For example, when `ai_credit_per_user` is set to `2` (unit of dollars for example) and there are 10 members in the team, all members in the team will share the same quota of 20 AI credits per month.
