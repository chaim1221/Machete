#!/usr/bin/env bash

export MSBUILDDISABLENODEREUSE=1

dotnet clean

cd UI
npm run build-local-dev
cd ..

dotnet build
cd Machete.Web
dotnet publish -c Release -o published
cd ..

docker build -t machetecontainer .

echo "to run, type:"
echo ""
echo "docker run -dit --name machete1 --network machete-bridge -p 5001:5001 machetecontainer"
echo ""
