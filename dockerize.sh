#!/usr/bin/env bash

export MSBUILDDISABLENODEREUSE=1

docker stop machete1
docker rm machete1

dotnet clean

cd UI
if [[ -d dist ]]; then
  rm -rf dist
fi

# TODO build something more prod-like?
npm run build-local-dev
cd ..

# dotnet build
cd Machete.Web
if [[ -d published ]]; then
  rm -rf published
fi
dotnet publish -o published
cd ..

# TODO fix versioning
docker build -t machete/debian:1.15.0 .

echo "to run, type:"
echo ""
echo "docker run -dit --name machete1 --network machete-bridge -p 4213:4213 -p 80:80 machete/debian:1.15.0"
# echo "docker run --rm -it --network host -e ASPNETCORE_URLS=\"https://+\" -e ASPNETCORE_HTTPS_PORT=4213 -e ASPNETCORE_Kestrel__Certificates__Default__Path=/https/aspnetapp.pfx -v ${HOME}/.aspnet/https:/https/ --name machete1 machetecontainer"
echo ""
echo "or something like that."
echo ""
