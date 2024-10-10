# Domain Change

Changing the hostname of a SeaTable Server instance will render all files and images stored in bases inaccessible. 

To restore access, their file paths must be modified using a command line script:

```
docker exec -it seatable-server /bin/bash

# for one base
seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py domain_transfer -uuid <:base uuid> -od <:old domain> -nd <:new domain>

# for all bases
seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py domain_transfer -all -od <:old domain> -nd <:new domain>
```

For example, to change the domain from 'https://seatable.example.com' to 'https://table.example.com' for base '695fa115-4927-4be1-b5b6-fbbbabd43b72', run this command:

```
seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py domain_transfer -uuid 695fa115-4927-4be1-b5b6-fbbbabd43b72  -od https://seatable.example.com -nd https://table.example.com
```

