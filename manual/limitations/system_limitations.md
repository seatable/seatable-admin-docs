# System limitations

| Category                   | Limitation items                         | Threshold                                     | Additional notes                                             |
| :------------------------- | :--------------------------------------- | :-------------------------------------------- | :----------------------------------------------------------- |
| Table                      | Row numbers                              | 100000                                        | Row appending rejected when exceeding 100000 rows            |
|                            | Row numbers 2                            | 150000                                        | Base loading rejected when exceeding 150000 rows. (To avoid some performance issues caused by to many datas,  like more than 10000 rows existed in the base) |
|                            | Sub-table numbers                        | 200                                           |                                                              |
| Sub-table                  | Row numbers                              | 100000                                        | Row appending rejected when exceeding 100000 rows            |
|                            | Column numbers                           | 500                                           |                                                              |
| API calling                | Row numbers appending for one-calling    | 1000                                          | No limitations through web page                              |
|                            | Row numbers modification for one-calling | 1000                                          |                                                              |
|                            | Row numbers deletion for one-calling     | 10000                                         |                                                              |
|                            | Row numbers moving for one-calling       | 1000                                          |                                                              |
| API calling times          | API calling for single base              | 300/min for cloud edition                     | Limitations can be set by yourself for developer edition.    |
|                            | API calling   for getting rows of a base | 100/min for a single table,  600/hour maximum | Limitations can be set by yourself for developer edition. However, we strongly suggested that you add some cache in your code if the API calling is frequent. |
| External links viewing     | Viewing times of a base's external link  | 300/min maximum                               |                                                              |
| Import / export operations | Export the whole base                    | 100MB                                         |                                                              |
|                            | Import a csv file                        | 10000 records maximum                         |                                                              |
| Scripts                    |                                          |                                               |                                                              |
| Notification rules         |                                          |                                               |                                                              |