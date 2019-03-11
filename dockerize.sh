#!/usr/bin/env bash

export MSBUILDDISABLENODEREUSE=1

docker stop machete1
docker rm machete1

dotnet clean

cd UI
npm run build-local-dev
cd ..

# dotnet build
cd Machete.Web
dotnet publish -o published
cd ..

docker build -t machetecontainer .

echo "to run, type:"
echo ""
echo "docker run -dit --name machete1 --network machete-bridge -p 4213:4213 machetecontainer"
# echo "docker run -dit --network host --name machete1 machetecontainer"
# echo "docker run --rm -it --network host -e ASPNETCORE_URLS=\"https://+\" -e ASPNETCORE_HTTPS_PORT=4213 -e ASPNETCORE_Kestrel__Certificates__Default__Path=/https/aspnetapp.pfx -v ${HOME}/.aspnet/https:/https/ --name machete1 machetecontainer"
echo ""
echo "or something like that."
echo ""
