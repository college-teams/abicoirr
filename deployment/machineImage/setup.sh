#!/usr/bin/env bash

sudo bash -c "cat > /etc/abicoirr-api/environment.properties" <<-EOL
ENVIRONMENT=$DEPLOYMENT_ENV_NAME
EOL

