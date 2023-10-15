#!/bin/bash

# Copy the React app build files
sudo mkdir -p  /etc/abicoirr-ui
sudo yum install -y nginx

sudo mkdir -p /etc/nginx/sites-available/
sudo mkdir -p /etc/nginx/sites-enabled/
sudo cp $INSTALL_DIR/nginx.conf  /etc/nginx/nginx.conf

sudo nginx -t
sudo systemctl reload nginx


# Enable the Nginx site
sudo ln -s  /etc/abicoirr-ui/ /var/www/html

sudo ln -s /etc/nginx/sites-available/react_app.conf /etc/nginx/sites-enabled/

# Restart Nginx
sudo systemctl enable nginx.service;
sudo systemctl status nginx.service;
sudo systemctl start nginx.service;
sudo systemctl status nginx.service;

sudo chown -R ec2-user:ec2-user /var/www/html