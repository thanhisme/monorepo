#!/bin/bash

DOCKER="/usr/bin/docker" # path to docker binary

cd /home/hthanh/monorepo/ # path to your project
# ssl_certbot is your certbot container name,
# reverse_proxy is your reverse proxy container name, 
$DOCKER compose run ssl_certbot renew --dry-run && $DOCKER compose kill -s SIGHUP reverse_proxy
$DOCKER system prune -af