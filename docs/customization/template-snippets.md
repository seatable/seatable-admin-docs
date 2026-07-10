---
description: Inject custom JavaScript snippets into the dashboard, base and app templates
---

# Template Snippets

<!-- md:version 6.2 -->

Since version v6.2, [`dtable-web`](../introduction/architecture.md#dtable-web) allows injecting a custom [Django template](https://docs.djangoproject.com/en/4.2/topics/templates/) snippet into certain HTML templates.
This template snippet is included into the following HTML templates:

| Template                      | Purpose                                     |
| ----------------------------- | ------------------------------------------- |
| `react_dtable.html`           | Used when rendering the SeaTable dashboard. |
| `dtable_file_view_react.html` | Used when a base is opened.                 |
| `base_for_external_app.html`  | Used when a universal app is opened.        |

## Mounting the HTML file

In order to inject a snippet, an additional volume mount must be added to the `seatable-server` service.
You should use an [additional `.yml` file](../configuration/customizations.md) to accomplish this.

```yaml
services:
  seatable-server:
    volumes:
      - ./custom_body_snippet.html:/shared/seatable/seahub-data/custom/templates/custom_body_snippet.html
```

The filename on the host may differ, but you must mount the file to this exact location.
You can use Django's full templating capabilities inside the HTML file.

Do not forget to restart the container once you're done:

```bash
cd /opt/seatable-compose
docker compose up -d
```

## Use Cases

Here are some use cases for this feature:

- Web analytics
- Error tracking
- Customizing the UI via JavaScript
