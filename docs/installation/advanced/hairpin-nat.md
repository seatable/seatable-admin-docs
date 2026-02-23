# Running SeaTable without Hairpin NAT

Some networks and routers do not support hairpin NAT (also called NAT loopback or NAT reflection). This prevents Docker containers from resolving and accessing SeaTable via its external hostname from within the local network. Without a workaround, this breaks internal container-to-container communication, causing failures like Python scripts (e.g., automation tasks) and PDF generation to stop working.

The workaround is to install a local DNS service `dnsmasq`, set up a DNS resolution for the url of your seatable server and then to configure that all docker containers use this dns service.

## Step 1: Install and Configure dnsmasq

Install dnsmasq and create a configuration that resolves your SeaTable hostname locally to the container's gateway IP.

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install dnsmasq

# Add SeaTable hostname resolution (replace 'seatable.example.com' and gateway IP)
echo "address=/seatable.example.com/172.17.0.1" >> /etc/dnsmasq.conf

# Restart dnsmasq
sudo systemctl restart dnsmasq
sudo systemctl enable dnsmasq
```

## Step 2: Configure Docker Daemon

Edit Docker's configuration and add the following configuration to use the local dnsmasq as resolver. If the file `/etc/docker/daemon.json` does not exist, create it.
Instead of `8.8.8.8` you can use any other public DNS server.

```bash
{
  "dns": ["127.0.0.1", "8.8.8.8"]
}
```

After saving, restart docker with `sudo systemctl restart docker`

## Step 3: Verify and Restart SeaTable

Test resolution inside a container and restart SeaTable.

```bash
# Test DNS resolution (should resolve to gateway IP)
docker run --rm --dns 127.0.0.1 busybox nslookup seatable.example.com

# Restart all containers
cd /opt/seatable-compose
docker-compose down
docker-compose up -d
```

## Troubleshooting

- Check dnsmasq logs: `journalctl -u dnsmasq?`.
- Verify `DTABLE_SERVER_URL` in `dtable_web_settings.py` uses the external hostname only.
- Ensure no conflicting DNS servers on port 53; stop `systemd-resolved` if needed: `sudo systemctl disable --now systemd-resolved`.

This setup ensures all containers resolve the SeaTable hostname correctly without hairpin NAT.