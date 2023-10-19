#!/usr/bin/env bash

sudo bash -c "printf 'ENVIRONMENT=%s\n' '$DEPLOYMENT_ENV_NAME' > /etc/abicoirr-api/environment.properties"
