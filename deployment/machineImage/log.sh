#!/bin/bash

sudo mkdir $ABICOIRR_BE_DIR/logs && sudo chown ${USER}:${USER} $ABICOIRR_BE_DIR/logs
sudo cp $INSTALL_DIR/log4j.xml $ABICOIRR_BE_DIR
