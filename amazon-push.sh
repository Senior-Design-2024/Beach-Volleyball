#!/bin/bash

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <target_ip>"
  exit 1
fi

target_ip=$1
key_path="./sdgn.pem"
source_dirs="./flask-server ./react-frontend ./docker-compose.yml"
destination_dir="/home/ec2-user/downloads"

# Clear the destination directory on the remote server
ssh -i "$key_path" "ec2-user@${target_ip}" "rm -rf ${destination_dir}/*"

# Copy files to the remote server
scp -i "$key_path" -r $source_dirs "ec2-user@${target_ip}:${destination_dir}"