---
status: wip
---

# Teams / Organizations (like in cloud.seatable.io)

Teams / Organizations is a feature mainly for bigger installations where groups of people should be completely separated. In fact, cloud.seatable.io uses this feature to separate the teams from each other. The users of a team can see each other, but other users are invisible for them.

Besides Teams, SeaTable offers also deparments and groups. This article is focusing on teams only.

!!! question "Are Teams and Organizations the same?"

    Teams and organizations can be considered as the same. Organization is the name of the function and therefore used in the configuration files but in cloud.seatable.io we used this function to separate accounts from each other and there we call it **teams**. In short:

    - organization is the technical term.
    - teams is the marketing term.

## How to configure teams

You have to add these two settings in `dtable_web_settings.py`.

```bash
CLOUD_MODE = True
MULTI_TENANCY = True
```

Please be aware that this activates a whole bunch of settings and restrictions. These are ...
