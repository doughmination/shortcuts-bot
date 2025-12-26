#!/bin/sh

echo "Deploying commands to Discord..."
node dist/deploy-commands.js

echo "Starting bot..."
npm start