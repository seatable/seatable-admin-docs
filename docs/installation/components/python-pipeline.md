# Python Pipeline

To run Python scripts within SeaTable, you need to install the Python Pipeline — an environment utilizing Docker containers for script execution and result retrieval. Thanks to the SeaTable Python API you can seamlessly interact with the data in the base.

Explore various use cases from other SeaTable users:

- Retrieve current stock prices and store them in SeaTable.
- Validate DNS settings of specified domains for specific TXT entries.
- Capture submissions from form.io and store the results.
- Identify duplicate entries and apply specific tags.

Find additional Python functions and code examples in the [Developer Manual](https://developer.seatable.io).

![SeaTable Python Pipeline Page](../../assets/images/screenshot_python_script_execution.png)

## Installation

This article explains how to add the Python Pipeline on your SeaTable server.

#### Change the .env file

To install the Python Pipeline, include `python-pipeline.yml` in the `COMPOSE_FILE` variable within your `.env` file. This instructs Docker to download the required images for the Python Pipeline.

Simply copy and paste (:material-content-copy:) the following code into your command line:

```bash
sed -i "s/COMPOSE_FILE='\(.*\)'/COMPOSE_FILE='\1,python-pipeline.yml'/" /opt/seatable-compose/.env
```

!!! warning "Avoid space in `COMPOSE_FILE`"

    When manually adding `python-pipeline.yml` to the `COMPOSE_FILE` variable using your preferred editor, ensure that you avoid any space (:material-keyboard-space:). After making this modification, your `COMPOSE_FILE` variable should look like this:

    ```bash
    COMPOSE_FILE='caddy.yml,seatable-server.yml,python-pipeline.yml'
    ```

#### Generate a shared secret for secure communication

For secure communication between SeaTable and the Python Pipeline, a shared secret is required to prevent unauthorized access or usage. We recommend utilizing `pwgen` to generate a robust and secure password. Copy and paste the following command into your command line to generate a password:

```bash
pw=$(pwgen -s 40 1) && echo "Generated shared secret: ${pw}"
```

The generated shared secret needs to be added to your `.env` file. Copy and paste the following command:

```bash
echo -e "\n# python-pipeline" >> /opt/seatable-compose/.env
echo "PYTHON_SCHEDULER_AUTH_TOKEN=${pw}" >> /opt/seatable-compose/.env
```

#### Start the Python Pipeline

Now it is time to start the Python Pipeline.

```bash
cd /opt/seatable-compose && \
docker compose up -d && \
docker exec -d seatable-server /shared/seatable/scripts/seatable.sh restart
```

#### Check if the Python Pipeline is running

Do you want to execute your first python script in SeaTable? Nothing easier than that.

- Login to your SeaTable Server with your Browser.
- Create a new base and access it.
- Add a python script with the content `print("Hello World")` and execute it. If you don't know how to do this, check out our [user manual](https://seatable.io/docs/javascript-python/anlegen-und-loeschen-eines-skriptes/?lang=auto).

If everything went right, you should see the output `Hello World`.

![Execution of your first python script](../../assets/images/screenshot_first_python_script.png)

:material-party-popper: **Great!** Your SeaTable can execute Python scripts now.
