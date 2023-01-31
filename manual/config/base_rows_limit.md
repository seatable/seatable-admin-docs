# Base supported rows limit

By default, a base contains up to 100,000 rows (excluding archived rows). Above 100,000 rows, the base will become read-only. If more than 150,000 rows, the base will fail to load.

Base rows are limited for the following technical reasons:

* The base is read from the persistent storage (dtable-storage-server) into the memory of dtable-server, and the maximum support size is 600M. This is a limitation of Node.js technology, because a string in Node.js cannot exceed 600M. For safety reason, dtable-server will not attempt to load this base when it exceeds 300M. (Attachments in the base are not counted.)
* When the base is too large, it takes too much time for the server to serialize it and send it to the network when the client loads the base. At this time, the server cannot respond to other requests.

Starting from version 3.4, for private deployment users, if your application scenario needs to support more than 100,000 rows in a base, but the storage space occupied by the base itself is not large (for example, it contains a large number of blank cells), you can modify the server's configuration, to support more than 100,000 rows.

#### dtable-server

`dtable_server_config.json`

```
{
   "base_writable_limit": 100000,
   "base_max_rows_limit": 150000
}
```

Among them, base_writable_limit is used to limit the rows written into the base. base_max_rows_limit is used to control when the rows in the base is greater than the number, the server refuses to load the base into memory. base_max_rows_limit needs to be greater than base_writable_limit.

#### dtable-web

`dtable_web_settings.py`

```
BASE_WRITABLE_LIMIT = 100000
```

This is used to let the Web UI to become read-only when rows exceed the limit.
