## FAQ's

**If, for whatever reason, the installation fails, how do I to start from a clean slate again?**

Stop all containers, remove everything under the folder `/opt` and start again.

**What if no url is pointing to the SeaTable server?**

No problem. Just enter your local IP-Adress instead of the URL into the .env file.

**What if you want to provide your own Reverse Proxy / TLS termination?**

You can opt out of using caddy and use another webserver of your choice, just don't include it in the COMPOSE_FILE list. In this case you have to take care of the SSL termination yourself and map port 80 to the seatable container directly.