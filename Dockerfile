# base image: https://hub.docker.com/_/microsoft-dotnet-core-aspnet/
FROM mcr.microsoft.com/dotnet/core/aspnet:2.1

# set working directory
RUN mkdir -p /app
COPY ./Machete.Web/published/ /app
WORKDIR /app

# ENV commands
ENV ASPNETCORE_ENVIRONMENT Release

# UI maybe? structure?

# start app
# CMD ["dotnet", "run", "/app/Machete.Web.dll"] # <~ requires SDK
CMD ["dotnet", "/app/Machete.Web.dll"]
