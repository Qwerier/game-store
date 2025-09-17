# Stage 1: build
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy project files (relative to build context)
COPY *.csproj ./
RUN dotnet restore

# Copy the rest of the source code
COPY . .

# Publish the app
RUN dotnet publish -c Release -o /app/publish

# Stage 2: runtime
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "API.dll"]

