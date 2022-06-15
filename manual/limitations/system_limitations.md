# System limitations

| Category                   | Limitation Type                         | Threshold                                     | Additional notes                                             |
| :------------------------- | :--------------------------------------- | :-------------------------------------------- | :----------------------------------------------------------- |
| Base                      | Rows                                    | 100,000                                        | The base becomes read-only when exceeding 100,000 rows.            |
|                            | Rows 2                            | 150,000                                        | The base will not be loaded to the memory if exceeding 150,000 rows. |
|                            | Archived rows                        | no limit                                    |     |
|                            | Tables                        | 200                                           |                                                              |
| Table                     | Columns                           | 500                                           |                                                              |
| API calls                | Max. number of rows appending in a single call    | 1,000                                          |                                                                |
|                            | Max. number of rows modification in a single call | 1,000                                          |                                                              |
|                            | Max. numbers of rows deletion in a single call     | 10,000                                         |                                                              |
|                            | Max. numbers of rows moving in a single call       | 1,000                                          |                                                              |
|                            | Max. numbers of rows listed in a single call       | 50,000                                          | Use the `start` and `limit` params to list further rows.                                                             |
| API calling rate          | API calling for a single base              | 300/min for the cloud edition. 5000/day.                     | This limit can be set by yourself for the Developer / Enterprise Edition. You should use batch APIs to reduce API calls.   |
|                            | API calling for getting rows of a table | 100/min for a single table,  600/hour maximum | This limit can be set by yourself for the Developer / Enterprise Edition. However, we strongly suggest that you add some cache in your code if the API calling is frequent. |
| External links viewing     | Viewing rate of a base's external link  | 300/min maximum                               |                                                              |
| Import / export operations | Size of a base being exported as a .dtable file  | 100MB                                         | This limit can be set by yourself for the Developer / Enterprise Edition. A base's attachments can be viewed and deleted in batch in the base's Attachments Management.         |
|                            | Import of a .csv/.xlsx file                        | 10,000 records maximum                         |                                                              |
| Scripts                    |                                          |                                               |                                                              |
| Notification rules         |                                          |                                               |                                                              |
