---
status: new
---

# Workflow of the Python Pipeline in a nutshell

This is a short explanation what happens, if you click on "Run script" inside SeaTable.

## SeaTable Server

To initialize the Python Pipeline, SeaTable-Server makes a POST request to the API-endpoint `/run-script/` of the scheduler. This call is authenticated by the shared secret, defined in `dtable_web_settings.py`. Every two seconds (and for max. 15 minutes), the SeaTable Server checks the status of the script execution by calling `/run-script/<script_id>` from the scheduler.

## SeaTable Scheduler

The scheduler creates a new task in the mariadb database. The scheduler calls the API-endpoint `/function/run-python` of the starter. Now the scheduler waits for the starter's POST request to `/script-result/`, which indicates that the run has finished. The scheduler then writes the duration and the output to the database.

## SeaTable Starter

The starter downloads the python script directly from SeaTable Server and saves the script to a temporary folder on the hard drive of the host. The starter now starts a python-runner container and mounts the script as input. After completion the runner container is deleted and the result data is sent to the scheduler by making a POST request to `/script-result/`.

## SeaTable Runner

SeaTable runner executes the python script and writes the output to the same temporary folder on the host. After that the container stops.

## Important points

- dtable-web only queries the result as long as the browser is open (manual execution).
- if an automation starts a python script, SeaTable Server waits max. 15 minutes for the run to finish.
- starter and runner communicate via the exchange directory. this must be available as a volume to both containers
- starter and scheduler communicate via api calls.
- the python runner is stopped after 15 minutes at the latest
- the scheduler has a cleanup process to invalidate work orders in the database that run for longer than 15 minutes.
- the task is stored in the database for some days (30 days by default)
