echo "Starting install docker"
sh ./install-docker.sh
echo "Starting run app"
docker compose down
docker compose up -d