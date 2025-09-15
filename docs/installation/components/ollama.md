# Ollama

## Instructions

- Create `/opt/seatable-compose/ollama.yml`:
    ```yml
    services:
    ollama:
        image: ollama/ollama:0.11.10
        restart: unless-stopped
        container_name: ollama
        # TODO: Optimization: Only allow access by seatable-ai by creating dedicated network?
        networks:
        - backend-seatable-net
        volumes:
        - /opt/ollama:/root/.ollama
    ```
- Add `ollama.yml` to the `COMPOSE_FILE` variable inside the `.env` file
- Add the following variables to `.env`:
    ```ini
    ENABLE_SEATABLE_AI=true
    SEATABLE_AI_LLM_TYPE='ollama_chat'
    SEATABLE_AI_LLM_URL='http://ollama:11434'
    # Choose a model: https://ollama.com/library
    SEATABLE_AI_LLM_MODEL='tinyllama'
    ```
- Start `ollama` by running `docker compose up -d` inside `/opt/seatable-compose`
- Pull the chosen model by running `docker exec -it ollama ollama pull $MODEL`. This is a one-time task.

You are now able to run AI steps inside SeaTable via your local Ollama deployment!
