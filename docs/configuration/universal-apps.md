---
description: Enable and configure universal apps in SeaTable, including the Maps page type with Google Maps API integration.
---

# Universal apps

<!-- md:version 3.3 -->
<!-- md:flag enterprise -->
<!-- md:flag experimental -->

!!! success "Enabled by default"

    Since Version 4.0, universal apps are enabled by default.

Before that version, universal app could be enabled with the following parameter in `dtable_web_settings.py`.

```bash
ENABLE_UNIVERSAL_APP = True
```

## Maps Page Type

<!-- md:version 6.1 -->

The "Maps" page type requires the configuration of an API key for Google Maps.
It will only be visible once you've configured the variable `DTABLE_GOOGLE_MAP_KEY` inside `dtable_web_settings.py`.
Please refer to the [this page](plugins.md#map-plugin) for detailed instructions.
