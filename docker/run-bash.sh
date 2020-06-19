#!/bin/bash
docker-compose run --name mongodb-schedule-ps-bash \
  --rm \
  -u $(id -u ${USER}):$(id -g ${USER}) \
  --workdir /work/ \
  mongodb-schedule-ps  \
  bash
