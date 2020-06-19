#!/bin/bash

docker-compose run --name mongodb-schedule-ds-init \
  --rm \
  -u $(id -u ${USER}):$(id -g ${USER}) \
  --workdir /work/apps/mongodb-schedule/ \
  mongodb-schedule-ps \
  npm install

