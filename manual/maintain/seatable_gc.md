# SeaTable GC

SeaTable uses storage de-duplication technology to reduce storage usage. The underlying data blocks will not be removed immediately after you delete a file or a base. As a result, the number of unused data blocks will increase on SeaTable server.

To release the storage space occupied by unused blocks, you have to run a **garbage collection** program to clean up unused blocks on your server.

## Configuration

seafile.conf

```
[history]
keep_days = 60
```

## Dry-run mode

To see how much garbage can be collected without actually removing any garbage, use the dry-run option:

```
seatable.sh gc --dry-run
```

The output should look like:

```
Starting seafserv-gc, please wait ...
2021-04-27 14:30:13 gc-core.c(904): Database is MySQL/Postgre/Oracle, use online GC.
2021-04-27 14:30:13 gc-core.c(928): Using up to 1 threads to run GC.
2021-04-27 14:30:13 gc-core.c(873): GC version 1 repo plugins repo(92ba689b-51a3-457b-a264-1e46537025c8)
2021-04-27 14:30:13 gc-core.c(609): No blocks for repo 92ba689b, skip GC.

2021-04-27 14:30:13 gc-core.c(873): GC version 1 repo My Workspace(7041b9ea-cec7-43a1-9639-70aaeb572aed)
2021-04-27 14:30:13 gc-core.c(615): GC started for repo 7041b9ea. Total block number is 14.
2021-04-27 14:30:13 gc-core.c(78): GC index size is 1024 Byte for repo 7041b9ea.
2021-04-27 14:30:13 gc-core.c(390): Populating index for repo 7041b9ea.
2021-04-27 14:30:13 gc-core.c(369): Traversed 22 commits, 14 blocks for repo 7041b9ea.
2021-04-27 14:30:13 gc-core.c(682): Scanning and deleting unused blocks for repo 7041b9ea.
2021-04-27 14:30:13 gc-core.c(700): GC finished for repo 7041b9ea. 14 blocks total, about 14 reachable blocks, 0 blocks are removed.

2021-04-27 14:30:13 gc-core.c(873): GC version 1 repo My Library Template(3fe6b035-2e0f-4c2f-9347-2673b5778e72)
2021-04-27 14:30:13 gc-core.c(609): No blocks for repo 3fe6b035, skip GC.
2021-04-27 14:30:13 gc-core.c(773): === Repos deleted by users ===
2021-04-27 14:30:13 gc-core.c(980): === GC is finished ===
seafserv-gc run done
Done.
```

## Removing Garbage

Run a garbage collection program without adding --dry-run option to actually remove garbage block.

```
seatable.sh gc
```

