#!/usr/bin/env bash

set -exuo pipefail

if [[ -z "${SEATABLE_VERSION-}" ]]; then
    echo '$SEATABLE_VERSION is not set, using "latest"'
    SEATABLE_VERSION='latest'
fi

# Concat CSS files from container
docker run --rm -it --pull=always --quiet "seatable/seatable-enterprise:${SEATABLE_VERSION}" find /opt/seatable/seatable-server-latest/dtable-web/media ! -name 'fontawesome*.css' ! -name 'bootstrap*.css' -name '*.css' -exec cat {} \; > ./custom.css

php manipulate-css.php custom.css

# Sort + remove duplicates
# Set LC_ALL to 'C' to make sorting identical to dedupelist.com
LC_ALL=C sort -u -o custom.css custom.css

# Remove "#header" and ".tables-tabs-container" rules, otherwise the base header always has the same color
sed -i -e '/^#header/d' -e '/^\.tables-tabs-container/d' custom.css

# Remove duplicate a {...} rules (especially with font-weight: bold)
sed -i -e '/^a.*font-weight: bold/d' -e '/^a{text-decoration-skip:ink;color:##maincolor##}/d' custom.css

# This rule has to be removed, otherwise the button color when creating apps is gone
sed -i '/^.btn-outline-primary{color:##maincolor##;border-color:##maincolor##}/d' custom.css

# Remove comment
sed -i 's|/\* 3 seatable common style \*/||' custom.css
