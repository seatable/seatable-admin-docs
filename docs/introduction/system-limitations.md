# System limitations

## General limitations

| Category                            | Limitation Type                                     | Limit                                                                                                  | Additional Notes                                                                                                                                                                                                                |
| :---------------------------------- | :-------------------------------------------------- | :----------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Bases                               | Rows                                                | 100 000                                                                                                | The base becomes read-only when exceeding this limit. The limit can be modified in dtable_server_config.json. |                                                        
|                                     | Rows 2                                              | 150 000                                                                                                | The base will fail to load when exceeding this limit. The limit can be modified in dtable_server_config.json. |
|                                     | Archived rows                                       | no limit                                                                                               |          |
|                                     | Tables                                              | 200                                                                                                    |          |
|                                     | External links for bases                            | 100                                                                                                    |          |
|                                     | External links for views                            | 100                                                                                                    |          |
|                                     | Apps                                                | 100                                                                                                    |          |
|                                     | Forms                                               | 100                                                                                                    |          |
| Tables                              | Columns                                             | 500                                                                                                    |          |
| External links                      | External link viewing rate                          | 300/min                                                                                                |          |
| Import / export                     | Size of a base being exported as a .dtable file     | 100MB                                                                                                  | All files stored in a base can be viewed and deleted via File Management. The limit can be modified in dtable_web_settings.py (`DTABLE_EXPORT_MAX_SIZE`). |
|                                     | Import of a xlsx/csv file                           | 50 000 records or 10MB                                                                                 |          |
|                                     | Export of a table                                   | 10 000 records or 1,000,000 cells                                                                      |          |
|                                     | Export of a view in table                           | 1 000 000 cells                                                                                        |          |
| Import / export big data            | Import from xlsx to big data storage                | 500 000 records or 40MB                                                                                | The limit can be modified in dtable_web_settings.py (`BIG_DATA_ROW_IMPORT_LIMIT`).     |
|                                     | Update from xlsx to big data storage                | 500 000 records                                                                                        | The limit can be modified in dtable_web_settings.py (`BIG_DATA_ROW_UPDATE_LIMIT`).     |
|                                     | Export big data view to Excel                       | 250 000 records                                                                                        | The limit can be modified in dtable_web_settings.py (`ARCHIVE_VIEW_EXPORT_ROW_LIMIT`).   |
| Groups                              | Group members                                       | 500                                                                                                    | The limit can be modified in dtable_web_settings.py (`GROUP_MEMBER_LIMIT`).    |
|                                     | Group bases                                         | 500                                                                                                    |          |
| Common datasets (CDS)               | Syncs of CDS                                        | Sync up to the first 50 000 records                                                                    |          |
|                                     | Sync frequency                                      | 5 minutes                                                                                              | The limit can be modified in dtable_web_settings.py (`SYNC_COMMON_DATASET_INTERVAL`).    |
| Automation rules                    | Records meet specific conditions after modification | For batch modification, check the first 50 records. A rule can be triggered up to 10 times per minute. |          |
|                                     | Add record                                          | For batch addition, check the first 50 records. A rule can be triggered up to 10 times per minute.     |          |
|                                     | Run periodically on records meet conditions         | Lock a maximum of 200 rows and send a maximum of 50 emails in one trigger                              |          |

## API limitations

| Category         | Limitation Type                                   | Limit                                        | Additional Notes                                                                                            |
| :--------------- | :------------------------------------------------ | :------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| API calls        | Number of rows appending in a single call         | 1 000                                        |                                                                                                             |
|                  | Number of rows modification in a single call      | 1 000                                        |                                                                                                             |
|                  | Number of rows deletion in a single call          | 10 000                                       |                                                                                                             |
|                  | Number of rows listed in a single call            | 10 000                                       | Use the `start` and `limit` params to list further rows.                                                    |
| API calling rate | API calling for a single base                     | 300/min for the cloud edition. 5 000/day     | This limit can be set by yourself for the Developer Edition. You should use batch APIs to reduce API calls. |
|                  | API calling for getting rows of a table           | 100/min for a single table, 600/hour maximum | We strongly suggest that you use SQL if the API calling is frequent or add some cache in your code.         |
|                  | SQL calling for a single base                     | 5 000/day                                    |                                                                                                             |


For more information on the limits of SeaTable's API, please consult the [API documentation](https://api.seatable.com/reference/limits).
