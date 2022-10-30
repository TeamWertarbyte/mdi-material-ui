#!/bin/sh
npm i --save-dev @mdi/js@latest @mdi/light-js@latest
./generate-module.js
npm test

VERSION=`cat node_modules/@mdi/js/package.json | jq -r .version`
git add --all
git commit -m "Update to mdi $VERSION."
git push origin mui-v4
