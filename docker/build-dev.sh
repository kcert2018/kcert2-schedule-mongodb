#!/bin/bash
echo "rebuild docker images"

rm -rf deployment/app/
mkdir -p deployment/app/

cp -a ../apps/mongodb-schedule/src deployment/app/
cp -a ../apps/mongodb-schedule/.babelrc deployment/app/
cp -a ../apps/mongodb-schedule/package.json deployment/app/
cp -a ../apps/mongodb-schedule/package-lock.json deployment/app/
cp -a ../apps/mongodb-schedule/pm2.config.js deployment/app/

docker rmi mongodb-schedule-ps:01
docker-compose build mongodb-schedule-ps
