#!/bin/sh

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USER" --password-stdin
docker build -t mrblnetwork/panel .
docker push mrblnetwork/panel
docker tag mrblnetwork/panel mrblnetwork/panel:$TRAVIS_TAG
docker push mrblnetwork/panel:$TRAVIS_TAG