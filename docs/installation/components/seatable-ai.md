---
description: Deploy SeaTable AI to enable AI-powered automation steps like summarize, classify, OCR, and extract using external LLM providers.
---

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

!!! warning "SeaTable AI Is Not an AI Engine"

    The SeaTable AI container does not provide any AI functionality by itself. It only manages the connection between SeaTable and an external large language model (LLM) service. You can connect it to a commercial provider (e.g., OpenAI, Deepseek) or to a self-hosted LLM running on your own infrastructure.

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
```

### LLM Provider Configuration

SeaTable AI will use AI functions in conjunction with a Large Language Model (LLM) service.

!!! success "Supported LLM Providers"

    SeaTable AI supports a wide variety of LLM providers through [LiteLLM](https://docs.litellm.ai/docs) as well as any LLM services with OpenAI-compatible endpoints. Please refer to [LiteLLM's documentation](https://docs.litellm.ai/docs/providers) in case you run into issues while trying to use a specific provider.

!!! success "Model Selection"

    In order to ensure the efficient use of SeaTable AI features, you need to select a **large, multimodal model**.
    This requires the chosen model to support image input and recognition (e.g. for running OCR as part of automations).

The following section showcases the required configuration settings for the most popular hosted LLM services.

The configuration approach depends on your SeaTable version:

#### SeaTable v6.0 + v6.1

For SeaTable v6.0 and v6.1, the LLM provider is configured inside the `.env` file:

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
=== "Gemini / Google AI Studio"
    ```ini
    SEATABLE_AI_LLM_TYPE=gemini
    # Leave SEATABLE_AI_LLM_URL unset
    SEATABLE_AI_LLM_KEY=<your LLM access key>
    SEATABLE_AI_LLM_MODEL=<your model-id>
    ```
=== "Ollama"
    ```ini
    SEATABLE_AI_LLM_TYPE=ollama
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

#### SeaTable v6.2+

SeaTable v6.2 and later versions require you to configure the LLM provider inside the `/opt/seatable-server/seatable/conf/seatable_config.yaml` file **on the host**. The LLM provider configuration is now placed inside a `.yaml` file to allow configuring different providers/models for different AI functions.
If the file does not exist yet, simply create it.

=== "OpenAI"
    ```yaml
    global:
      LLM_MODELS:
        - type: openai
          key: <your openai LLM access key>
          model: gpt-4o-mini # recommended
    ```
=== "Deepseek"
    ```yaml
    global:
      LLM_MODELS:
        - type: deepseek
          key: <your LLM access key>
          model: deepseek-chat # recommended
    ```
=== "Azure OpenAI"
    ```yaml
    global:
      LLM_MODELS:
        - type: azure
          url: # your deployment url, leave blank to use default endpoint
          key: <your API key>
          model: <your deployment name>
    ```
=== "Gemini / Google AI Studio"
    ```yaml
    global:
      LLM_MODELS:
        - type: gemini
          key: <your LLM access key>
          model: <your model-id>
    ```
=== "Ollama"
    ```yaml
    global:
      LLM_MODELS:
        - type: ollama
          url: <your LLM endpoint>
          key: <your LLM access key>
          model: <your model-id>
    ```
=== "HuggingFace"
    ```yaml
    global:
      LLM_MODELS:
        - type: huggingface
          url: <your huggingface API endpoint>
          key: <your huggingface API key>
          model: <model provider>/<model-id>
    ```
=== "Self-Hosted Proxy Server"
    ```yaml
    global:
      LLM_MODELS:
        - type: proxy
          url: <your proxy url>
          key: <your proxy virtual key> # optional
          model: <model-id>
    ```
=== "Other"
    If you are using an LLM service with ***OpenAI-compatible endpoints***, you should set `type` to `other` or `openai`, and set other LLM configuration settings as necessary:

    ```yaml
    global:
      LLM_MODELS:
        - type: ...
          url: ...
          key: ...
          model: ...
    ```

!!! warning "Configuration changes require a container restart"

    The `seatable-ai` container will **not** be automatically restarted when running `docker compose up -d` if you've only made changes to the `seatable_config.yaml` config file.
    Docker Compose does not watch files inside volume mounts, therefore a manual recreation of the container (via `--force-recreate`) is necessary whenever you're making configuration changes:

    ```bash
    cd /opt/seatable-compose
    docker compose up -d --force-recreate seatable-ai
    ```

### LLM Timeout Configuration (Optional)

<!-- md:version 6.1 -->

You can configure the communication timeout with the LLM service by specifying `SEATABLE_AI_LLM_TIMEOUT` in `.env` (the default is 180 seconds):

```ini
SEATABLE_AI_LLM_TIMEOUT=180
```

### Download SeaTable AI image and restart

One more step is necessary to download the SeaTable AI image and restart the SeaTable service:

```bash
cd /opt/seatable-compose
docker compose up -d
```

Now SeaTable AI can be used.
