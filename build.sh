#!/bin/bash

npm run build
docker build --pull --rm -f "Dockerfile" -t ducthach1401/cloud-service:0.0.2 "."
docker push ducthach1401/cloud-service:0.0.2