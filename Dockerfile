# base image: https://hub.docker.com/_/microsoft-dotnet-core-aspnet/
FROM mcr.microsoft.com/dotnet/core/aspnet:2.1

# create and set working directory
RUN mkdir -p /app/api/Content
RUN mkdir /app/api/Identity
RUN mkdir /app/api/dist

COPY ./Machete.Web/published/ /app/api
COPY ./Machete.Web/Content /app/api/Content
COPY ./Machete.Web/Identity /app/api/Identity
COPY ./UI/dist /app/api/dist

WORKDIR /app/api

# ENV commands
# ENV ASPNETCORE_ENVIRONMENT Release

# start app
# CMD ["dotnet", "run", "/app/api/Machete.Web.dll"] # <~ requires SDK
# CMD ["dotnet", "/app/api/Machete.Web.dll"]
