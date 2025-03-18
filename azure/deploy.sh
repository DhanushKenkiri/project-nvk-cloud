#!/bin/bash

# Variables
RESOURCE_GROUP="project-nvk-rg"
LOCATION="eastus"
TEMPLATE_FILE="aci-template.json"
PARAMETERS_FILE="aci-parameters.json"

# Create Resource Group
az group create --name $RESOURCE_GROUP --location $LOCATION

# Deploy ACI
az deployment group create \
  --resource-group $RESOURCE_GROUP \
  --template-file $TEMPLATE_FILE \
  --parameters @$PARAMETERS_FILE