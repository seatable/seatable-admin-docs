<!-- md:version 6.0 -->

# Ollama

[Ollama](https://docs.ollama.com/) is a framework that allows you to run various LLMs (Large Language Models) on your own hardware.

!!! warning "Ollama vs vLLM"

    This guides showcases a **very basic** Ollama deployment meant for trying out a self-hosted LLM deployed on the same server as SeaTable itself.
    You should take a look at [vLLM](./vllm.md) in case you plan on deploying a **production-ready** LLM inference/serving engine.
    Compared to Ollama, vLLM provides much better performance when handling concurrent requests.

## Instructions

### Create `ollama.yml`

Create `/opt/seatable-compose/ollama.yml` with the following contents:

```yaml
services:
  ollama:
    image: ollama/ollama:0.11.10
    restart: unless-stopped
    container_name: ollama
    # Comment out the following line if you don't have a GPU
    gpus: all
    networks:
      - backend-seatable-net
    volumes:
      - /opt/ollama:/root/.ollama
```

Afterwards, you should add `ollama.yml` to the `COMPOSE_FILE` variable inside your `.env` file:

```bash
sed -i "s/COMPOSE_FILE='\(.*\)'/COMPOSE_FILE='\1,ollama.yml'/" /opt/seatable-compose/.env
```

### Configuration

In order to use Ollama to execute AI-based automation steps inside SeaTable, you must add the following configuration settings to your `.env` file:

```ini
SEATABLE_AI_LLM_TYPE='ollama_chat'
SEATABLE_AI_LLM_URL='http://ollama:11434'
# Choose a model: https://ollama.com/library
SEATABLE_AI_LLM_MODEL='gemma3:12b'
```

### Start Ollama

You can now start Ollama by running `docker compose up -d` inside `/opt/seatable-compose`.

In addition, it is necessary to manually download the chosen AI model by executing the following command **once**:

```bash
docker exec -it ollama ollama pull $MODEL
```

You are now able to run AI-based automations steps inside SeaTable via your local Ollama deployment!
