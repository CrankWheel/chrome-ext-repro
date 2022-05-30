#!/bin/bash

cd ${0%/*}/web
python3 -m http.server 4000
