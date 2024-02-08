# Advanced debugging by adding error messages

Sometimes SeaTable does not behave like you expect it to behave. Then it is time for some advanced debugging skills. This article debugs a possible problem to give you some knowledge that might help you to solve other problems, too. To follow this explanation you should have at least some development experience.

## The problem: User not found

Imagine the situation that the "Share a base with other users" does not show the users you expected.

![How to debug, if a user is not found](/images/advanced_debugging_user_not_found.png)

You have no idea why the auto complete function is not working as expected. So let's find out.

## Check the Developer Tools of your browser

The first check that you can perform is the Browser Console and the networking tab of your developer tools.

### The console tab

In this case there are not errors in the console tab. That means there are not general JavaScript execution errors or bad Api endpoints. If you have problems inside your network like firewalls blocking traffic, unsigned certificates or something like that, you will most likely see an error in the browser console tab. In this case there is no error message.

### The network tab

In the network tab, you can detect what kind of calls are executed, if you search for a user.

![Result of the network tab](/images/advanced_debugging_network_tab.png)

From the results you can see that with every key stroke SeaTable executes a command like:

```bash
/api2/search-user/?q=demo
```

So let's find this source code in the SeaTable Container.

## Find the Python Source Code

Access your SeaTable Server container and let's search for the source code. I start my search in `dtable-web/seahub`.

```bash
docker exec -it seatable-server bash
cd /opt/seatable/seatable-server-latest/dtable-web/seahub
grep -R "search-user" ./

# the result
./api2/urls.py:    re_path(r'^search-user/$', SearchUser.as_view(), name='search-user'),
```

Now let's get a closer look at this `/api2/urls.py` at `/opt/seatable/seatable-server-latest/dtable-web/seahub/api2/urls.py`.

There you can find at the beginning of this file, this content:

```bash
from .endpoints.search_user import SearchUser
```

This tells us, that the source code of this search function is in the file `/opt/seatable/seatable-server-latest/dtable-web/seahub/api2/endpoints/search_user.py`.

## Add custom error messages

In this python file, I can immediately see that there is the `class SearchUser(APIView)`. In the class I can see that the code checks for some parameters like:

- user.permission.can_use_global_address_book
- CLOUD_MODE
- is_org_context

Also I can see that SeaTable first generates a list of potential users and then removes out unwanted entries. So why not check if the user we are looking for is in the full list and then removed or if the user is not in there.

Let's add this additional logging at line 94. Make sure that you use the right indentation, because otherwise the python code will throw errors.

```bash
        ## search finished, now filter out some users
        logger.error("This is email_list: %s " % email_list)
```

## Check the logs

Now let's restart SeaTable and check the dtable_web.log for more details.

```bash
# we are still in the SeaTable Server container.
seatable.sh restart
tail -f /opt/seatable/logs/dtable_web.log
```
