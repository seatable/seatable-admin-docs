"""MkDocs hook: inject XSL stylesheet reference into sitemap.xml."""

import os


def on_post_build(config, **kwargs):
    sitemap_path = os.path.join(config["site_dir"], "sitemap.xml")
    if not os.path.exists(sitemap_path):
        return

    with open(sitemap_path, "r") as f:
        content = f.read()

    xsl_pi = '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>'
    if xsl_pi in content:
        return

    # Insert after the XML declaration
    content = content.replace(
        '<?xml version="1.0" encoding="UTF-8"?>',
        f'<?xml version="1.0" encoding="UTF-8"?>\n{xsl_pi}',
    )

    with open(sitemap_path, "w") as f:
        f.write(content)
