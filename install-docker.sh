#!/bin/bash

set -e  # Exit immediately if a command exits with a non-zero status

echo "Updating apt..."
sudo apt-get update -y

sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common

echo "Adding the GPG key for the official Docker repository..."
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo "Adding Docker repository to APT sources..."
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update -y

apt-cache policy docker-ce

echo "Installing Docker CE..."
sudo apt-get install -y docker-ce

# Latest version of docker already comes with compose, so no need to install it
#echo "Done! Installing docker compose..."
#sudo apt-get install -y docker-compose

echo "Check if Docker is running: sudo systemctl status docker"

exit 0
