#!/bin/bash
#
# builds the mkdocs image and runs it to provide a local preview of the docs

if [[ "$1" == "-stop" ]]; then
  sudo docker kill seatable-admin-docs
  exit 0
fi

sudo docker build -t seatable-admin-docs .
sudo docker run --name seatable-admin-docs --rm -d -p 8000:8000 -v ${PWD}:/docs seatable-admin-docs

echo "Local documentation preview available at http://127.0.0.1:8000"
echo "Use './preview.sh -stop' to stop the preview"
