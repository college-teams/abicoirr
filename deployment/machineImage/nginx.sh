#!/bin/bash

# Install Nginx
sudo yum install -y nginx

# Check Nginx configuration
sudo nginx -t

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx

sudo su;

sudo mkdir -p /var/www/html

# Create directories for Nginx configuration (if necessary)
sudo mkdir -p /etc/nginx/sites-available/
sudo mkdir -p /etc/nginx/sites-enabled/

sudo cp $INSTALL_DIR/nginx.conf  /etc/nginx/nginx.conf

sudo chmod 755 -R /etc/nginx/sites-available/

sudo chown -R ec2-user:ec2-user /var/www/html

sudo touch  /etc/nginx/sites-available/html

# Create or edit the Nginx server block configuration
sudo cp $INSTALL_DIR/abicoirr-ui.service /etc/nginx/sites-available/html


# Test the Nginx configuration
sudo nginx -t

# If the test passes, remove the default Nginx configuration
sudo rm /etc/nginx/sites-enabled/default

# Create a symbolic link to enable the HTML configuration
sudo ln -s /etc/nginx/sites-available/html /etc/nginx/sites-enabled/


sudo mkdir -p /etc/abicoirr-ui
sudo chown ${USER}:${USER} /etc/abicoirr-ui/index.html
sudo chown ${USER}:${USER} /etc/abicoirr-ui/

# sudo chown ec2-user:ec2-user /etc/abicoirr-ui/

sudo bash -c 'cat > /etc/abicoirr-ui/index.html <<EOF
<!DOCTYPE html>
<html>
    <head>
        <title>Welcome to My Website</title>
    </head>
    <body>
        <h1>Welcome to My Website</h1>
    </body>
</html>
EOF';

sudo ln -s /etc/abicoirr-ui /var/www/html/

# Test the Nginx configuration again
sudo nginx -t

# Restart Nginx to apply the changes
sudo systemctl restart nginx

sudo systemctl status nginx;




# # Copy the React app build files
# sudo mkdir -p  /etc/abicoirr-ui
# sudo yum install -y nginx

# sudo mkdir -p /etc/nginx/sites-available/
# sudo mkdir -p /etc/nginx/sites-enabled/
# sudo cp $INSTALL_DIR/nginx.conf  /etc/nginx/nginx.conf

# sudo nginx -t
# sudo systemctl reload nginx

# sudo chmod 777 -R /var/www/html
# sudo chown ${USER}:${USER} /var/www/html

# # Enable the Nginx site
# sudo ln -s  /etc/abicoirr-ui/ /var/www/html

# sudo ln -s /etc/nginx/sites-available/react_app.conf /etc/nginx/sites-enabled/

# # Restart Nginx
# sudo systemctl enable nginx.service;
# sudo systemctl status nginx.service;
# sudo systemctl start nginx.service;
# sudo systemctl status nginx.service;

# # sudo chown -R ec2-user:ec2-user /var/www/html