#!/bin/sh

set -e

rm -rf /usr/share/nginx/html/*
cp -r /usr/local/src/ndi/* /usr/share/nginx/html
envsubst < /usr/local/src/ndi/config.json > /usr/share/nginx/html/config.json
