# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source

# Copy the project file and restore dependencies
# This leverages Docker layer caching: if only the project file changes,
# dotnet restore doesn't need to be re-run on subsequent builds.
COPY SkillLink.csproj .
RUN dotnet restore

# Copy the rest of the application code
COPY . .

# Publish the application in Release configuration
RUN dotnet publish -c Release -o /app

# Stage 2: Create the final runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS final
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app .

# Expose the port your application listens on (default for Kestrel is 80, for HTTPS is 443)
# Render typically handles port mapping, but it's good practice to declare.
EXPOSE 80

# Define the entry point for the application
# This assumes your main executable DLL is named SkillLink.dll
ENTRYPOINT ["dotnet", "SkillLink.dll"]
