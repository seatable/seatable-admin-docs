# System limitations

| Category                   | Limitation items                         | Threshold                                     | Additional notes                                             |
| :------------------------- | :--------------------------------------- | :-------------------------------------------- | :----------------------------------------------------------- |
| Base                      | Row numbers                              | 100000                                        | Base become read-only when exceeding 100000 rows.            |
|                            | Row numbers 2                            | 150000                                        | Base will not be load to memory if exceeding 150000 rows. |
|                            | Table numbers                        | 200                                           |                                                              |
| Table                     | Column numbers                           | 500                                           |                                                              |
| API calls                | Max number of rows appending in a single call    | 1000                                          |                                                                |
|                            | Max number of rows modification in a single call | 1000                                          |                                                              |
|                            | Max numbers of rows deletion in a single call     | 10000                                         |                                                              |
|                            | Max numbers of rows moving in a single call       | 1000                                          |                                                              |
| API calling rate          | API calling for single base              | 300/min for cloud edition                     | This limit can be set by yourself for the Developer / Enterprise Edition.    |
|                            | API calling for getting rows of a table | 100/min for a single table,  600/hour maximum | This limit can be set by yourself for the Developer / Enterprise Edition. However, we strongly suggested that you add some cache in your code if the API calling is frequent. |
| External links viewing     | Viewing times of a base's external link  | 300/min maximum                               |                                                              |
| Import / export operations | Export the whole base as a .dtable file  | 100MB                                         | This limit can be set by yourself for the Developer / Enterprise Edition.          |
|                            | Import a csv file                        | 10000 records maximum                         |                                                              |
| Scripts                    |                                          |                                               |                                                              |
| Notification rules         |                                          |                                               |                                                              |
