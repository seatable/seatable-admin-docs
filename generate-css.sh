#!/usr/bin/env bash

set -euo pipefail

echo_color() {
  local RED='\033[32m'
  local RESET='\033[0m'
  echo -e "${RED}$1${RESET}"
}

if [[ -z "${1-}" ]]; then
    echo_color "No Tag parameter detected, using 'seatable-enterprise:latest'"
    SEATABLE_VERSION='latest'
else
    echo_color "Input parameter detected, using 'seatable/seatable-enterprise:${1}'"
    SEATABLE_VERSION="$1"
fi

echo_color "If you want to use another tag, please stop the execution and restart again with '$0 <tag>'."
echo_color "The script will continue in 5 seconds..."
sleep 5

echo "... let's go"
echo "... Download SeaTable Container"
# Concat CSS files from container
docker run --rm -it --pull=always --quiet "seatable/seatable-enterprise:${SEATABLE_VERSION}" find /opt/seatable/seatable-server-latest/dtable-web/media ! -name 'fontawesome*.css' ! -name 'bootstrap*.css' -name '*.css' -exec cat {} \; > ./custom.css

echo "... create initial custom.css"
# Manipulate custom.css
docker run --rm --quiet -v $(pwd):/app/ --workdir /app php:8.2-cli php /app/manipulate-css.php custom.css

echo "... sort + remove duplicates (Set LC_ALL to 'C' to make sorting identical to dedupelist.com)"
LC_ALL=C sort -u -o custom.css custom.css

echo "... remove '#header' and '.tables-tabs-container' rules, otherwise the base header always has the same color"
sed -i -e '/^#header/d' -e '/^\.tables-tabs-container/d' custom.css

echo "... remove duplicate a {...} rules (especially with font-weight: bold)"
sed -i -e '/^a.*font-weight: bold/d' -e '/^a{text-decoration-skip:ink;color:##maincolor##}/d' custom.css

echo "... remove '.btn-outline-primary', otherwise the button color when creating apps is gone"
sed -i '/^.btn-outline-primary{color:##maincolor##;border-color:##maincolor##}/d' custom.css

echo "... Remove comments"
sed -i 's|/\* 3 seatable common style \*/||' custom.css

echo "... finish"
