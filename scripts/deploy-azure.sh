#!/bin/bash

# Variables
RESOURCE_GROUP="project-nvk-rg"
LOCATION="eastus"
TEMPLATE_FILE="app-service-template.json"
PARAMETERS_FILE="app-service-parameters.json"

# Create Resource Group
az group create --name $RESOURCE_GROUP --location $LOCATION

# Deploy App Service
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file $TEMPLATE_FILE \
  --parameters @$PARAMETERS_FILE