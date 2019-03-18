#!/bin/bash

clear

echo "MACHETE1.SH"
echo ""
echo "This file is only for running the Machete container with all its secrets declared in a development environment."
echo "Currently, in order to run the container in a production environment, you will have to provision the secrets"
echo "manually."
echo ""
echo "Type:"
echo ""
echo "  ./machete.sh"
echo ""

dotnet user-secrets list --project=Machete.Web \
  | sed s/[[:space:]]//g \
  | sed s/:/__/g \
  | sed s/Authentication/MACHETE_Authentication/g \
  >> machete1env.list

docker run -it --name machete1 --network machete-bridge -p 443:443 --env-file machete1env.list machete/debian:1.15.0

rm machete1env.list
