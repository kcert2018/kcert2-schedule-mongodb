#!/bin/bash

echo "rebuild docker images"

rm -rf deployment/app/
mkdir -p deployment/app/

cp -a ../apps/mongodb-schedule/src deployment/app/
cp -a ../apps/mongodb-schedule/.babelrc deployment/app/
cp -a ../apps/mongodb-schedule/package.json deployment/app/
cp -a ../apps/mongodb-schedule/package-lock.json deployment/app/
cp -a ../apps/mongodb-schedule/pm2.config.js deployment/app/

docker rmi docker.kcert2018.com/kcert2/mongodb-schedule-ps:0.1
docker rmi kcert2/mongodb-schedule-ps:0.1
docker-compose build mongodb-schedule-ps
docker tag kcert2/mongodb-schedule-ps:0.1 docker.kcert2018.com/kcert2/mongodb-schedule-ps:0.1

echo "push docker image to docker repositry"

docker login -u rancher -p "ehsqjfwk9414$" docker.kcert2018.com
docker push docker.kcert2018.com/kcert2/mongodb-schedule-ps:0.1
docker logout docker.kcert2018.com

BOARD_USER='rancher'
BOARD_HOST='192.168.100.201'

echo "pull docker image on mongodb server"

ssh $BOARD_USER@$BOARD_HOST docker login -u rancher -p "ehsqjfwk9414$" docker.kcert2018.com
ssh $BOARD_USER@$BOARD_HOST docker pull docker.kcert2018.com/kcert2/mongodb-schedule-ps:0.1
ssh $BOARD_USER@$BOARD_HOST docker logout docker.kcert2018.com

echo "run docker image"
ssh $BOARD_USER@$BOARD_HOST 'docker stop mongodb-schedule'
ssh $BOARD_USER@$BOARD_HOST 'docker rm mongodb-schedule'

ssh $BOARD_USER@$BOARD_HOST 'docker run --restart="always" --name mongodb-schedule -e SEND_MAIL=yes -v /var/run/docker.sock:/var/run/docker.sock -d docker.kcert2018.com/kcert2/mongodb-schedule-ps:0.1 npm run start'

sleep 3
ssh $BOARD_USER@$BOARD_HOST 'docker images'
ssh $BOARD_USER@$BOARD_HOST 'docker ps'

kubectl delete -k ../kustomize
kubectl apply -k ../kustomize