# Deploy ClamAV with SeaTable

### Change the .env file

To install ClamAV, include `clamav.yml` in the `COMPOSE_FILE` variable within your `.env` file. This instructs Docker to download the required images for ClamAV.

Simply copy and paste (:material-content-copy:) the following code into your command line:

```bash
sed -i "s/COMPOSE_FILE='\(.*\)'/COMPOSE_FILE='\1,clamav.yml'/" /opt/seatable-compose/.env
```

### Modify dtable-events.conf

Add the following statements to dtable-events.conf

```conf
[VIRUS SCAN]
enabled = true
scan_command = clamdscan
virus_code = 1
nonvirus_code = 0
scan_interval = 5
scan_size_limit = 20
threads = 2
```

### Download ClamAV and restart

One more step is necessary to download the ClamAV container and restart the SeaTable service.

```bash
cd /opt/seatable-compose
docker compose down
docker compose up -d
```

Wait some minutes until ClamAV finished initializing.

Now ClamAV can be used.
