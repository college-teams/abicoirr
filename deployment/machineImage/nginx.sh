#!/bin/bash

# Copy the React app build files
sudo mkdir -p  /etc/abicoirr-ui

sudo cp -r /etc/abicoirr-ui/* /var/www/html

sudo yum install -y nginx

sudo mkdir -p /etc/nginx/sites-available/
sudo mkdir -p /etc/nginx/sites-enabled/

sudo systemctl enable nginx.service;

# Enable the Nginx site
sudo ln -s /etc/nginx/sites-available/react_app.conf /etc/nginx/sites-enabled/

# Restart Nginx
sudo systemctl status nginx.service;
sudo systemctl start nginx.service;
sudo systemctl status nginx.service;
