#! /bin/bash
docker build -t bsal/time:latest .
docker push bsal/time:latest
ssh bishal@20.204.10.38 "sudo docker pull bsal/time:latest && sudo docker tag bsal/time:latest dokku/time:latest && sudo  dokku tags:deploy time latest"