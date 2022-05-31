#!/bin/bash

cd ${0%/*}/ext
if [ "$1" == "mv2" ]; then
  echo Using MV2
  cp manifest_v2.json manifest.json
else
  echo Using MV3
  cp manifest_v3.json manifest.json
fi

cd ../web
python3 -m http.server 4000
