#!/bin/bash
echo -e "\\033]2;mongodb-schedule-ps run\\007"
echo -e "mongodb-schedule-ps run"

docker-compose run --name mongodb-schedule-ps \
  --rm \
  -u $(id -u ${USER}):$(id -g ${USER}) \
  --workdir /work/apps/$target/ \
  mongodb-schedule-ps \
  npm run dev
