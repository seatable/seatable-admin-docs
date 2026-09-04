---
description: Complete reference for automation-worker configuration including workers and PDF generation settings.
---

# Configuration of automation-worker

This is a cheat sheet for the possible configuration options of the automation-worker.
It contains all possible settings that can be configured as well as their default values.

The automation-worker is a dedicated component that executes automation rules.
It reads pending automation tasks from Redis, runs the configured actions (e.g. sending emails, running Python scripts, generating PDFs or triggering AI-powered automations), and publishes the results back to Redis.

The default values provided here are best-effort (not built automatically). They will be used if no value is defined at all.

??? tip "Configuration changes require a restart"

    New configuration options will only apply after a restart of the automation-worker.

## Environment Variables

<!-- md:version 7.0 -->

This section lists the environment variables read by the automation-worker.
Please read our guide that explains how you can [customize the configuration](../customizations.md) of your SeaTable instance before you proceed.

### Workers

| Environment Variable | Description                                                            | Default |
| -------------------- | ---------------------------------------------------------------------- | ------- |
| `AUTOMATION_WORKERS` | Number of worker threads that process automation rule tasks from Redis | 5       |

### PDF Generation

| Environment Variable               | Description                                              | Default |
| ---------------------------------- | -------------------------------------------------------- | ------- |
| `CONVERT_PDF_BROWSERS`             | Number of browser processes started to generate PDF files | 2      |
| `CONVERT_PDF_SESSIONS_PER_BROWSER` | Number of sessions per browser instance                   | 3       |
