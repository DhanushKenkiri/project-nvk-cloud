#!/bin/bash

# Install dependencies
npm install --prefix client
npm install --prefix server

# Build Docker images
docker-compose -f docker/docker-compose.yml build