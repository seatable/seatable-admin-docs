# Other maintenance

## Measurements for domain changed

Changing of domain can make an image or file unreadable in a SeaTable base.  Therefore, we provide some commands for users for transferring all the image or file urls from an old domain to a new one in a base.

```
$ docker exec -it seatable /bin/bash

# for one base
$ seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py domain_transfer -uuid <:base uuid> -od <:old domain> -nd <:new domain>

# for all bases
$ seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py domain_transfer -all -od <:old domain> -nd <:new domain>
```

For example, we want to change the domain in base '695fa115-4927-4be1-b5b6-fbbbabd43b72' from 'https://dev.seatable.cn' into 'https://cloud.seatable.io' , we can run:  

~~~
seatable.sh python-env /opt/seatable/seatable-server-latest/dtable-web/manage.py domain_transfer -uuid 695fa115-4927-4be1-b5b6-fbbbabd43b72  -od https://dev.seatable.cn -nd https://cloud.seatable.io
~~~

