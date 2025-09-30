<!-- md:version 6.0 -->

# Prerequisites

This following guides assume that you have a fully functioning [SeaTable Server installation](../basic-setup.md) and have successfully installed [SeaTable AI](../components/seatable-ai.md).

!!! warning "LLMs are resource-intensive"

    Running an LLM requires significant computing resources.
    While the exact requirements depend on the chosen model, our internal tests have shown that LLMs with less than 8 billion parameters do not yield useful results for the use cases we looked at.
    Therefore, we recommend that you choose a model with **at least 8-12 billion parameters**.
    Generally speaking, this will require **at least 16GB of VRAM** (or more, depending on the configured context window size).
    While you can run AI models on a CPU, performance (measured in tokens per second) will be much worse compared to running the same model on a powerful GPU.

## GPU Usage

!!! note "Requirements depend on your GPU make/model"

    You can refer to [Ollama's documentation](https://github.com/ollama/ollama/blob/main/docs/docker.md) for instructions regarding GPU usage.
    Depending on your GPU, this will require installing proprietary NVIDIA drivers and the NVIDIA Container Toolkit or adding additional arguments to the `.yml` files shown in the following guides.

For **Debian**-based systems with **NVIDIA** GPUs, the following steps were carried out to successfully deploy [Ollama](./ollama.md) and [vLLM](./vllm.md):

1. Install the proprietary NVIDIA drivers. The [Debian Wiki](https://wiki.debian.org/NvidiaGraphicsDrivers) contains installation instructions for the latest Debian releases.
2. Remember to restart your system before proceeding with the following steps.
3. Install the [NVIDIA Container Toolkit](https://docs.nvidia.com/datacenter/cloud-native/container-toolkit/latest/install-guide.html).
