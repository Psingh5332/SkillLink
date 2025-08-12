#  # Stage 1: Build the application
# FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
# WORKDIR /source

# # # Copy the project file and restore dependencies
# # # This leverages Docker layer caching: if only the project file changes,
# # # dotnet restore doesn't need to be re-run on subsequent builds.
# COPY SkillLink.csproj .
# RUN dotnet restore

# # # Copy the rest of the application code
# # COPY . .

# # Publish the application in Release configuration
# # RUN dotnet publish -c Release -o /app
# RUN dotnet publish -c Release -o /app --verbosity detailed

# # # Stage 2: Create the final runtime image
# FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
# WORKDIR /app

# # # Create the directory for image uploads
# RUN mkdir -p ImageUploads

# # # Copy the published output from the build stage
# COPY --from=build /app .

# # # Expose the port your application listens on (default for Kestrel is 80, for HTTPS is 443)
# # # Render typically handles port mapping, but it's good practice to declare.
# EXPOSE 80

# # # Define the entry point for the application
# # # This assumes your main executable DLL is named SkillLink.dll
# ENTRYPOINT ["dotnet", "SkillLink.dll"]

# # --------- STAGE 1: Build the application ---------
# FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
# WORKDIR /source

# # Copy .csproj and restore dependencies
# COPY SkillLink.csproj ./
# RUN dotnet restore

# # Copy the entire source and publish the application
# COPY . .
# RUN dotnet publish -c Release -o /app

# # # --------- STAGE 2: Runtime image ---------
# # FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
# # WORKDIR /app

# # # Optional: Create directory if using physical file storage (not needed for Cloudinary)
# # # RUN mkdir -p ImageUploads

# # # Copy published app from build stage
# # COPY --from=build /app .

# # # Expose port (Render auto-detects, but still good practice)
# # EXPOSE 80

# # # Start the application
# # ENTRYPOINT ["dotnet", "SkillLink.dll"]


# Stage 1: Build the application
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
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
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# Create the directory for image uploads
RUN mkdir -p ImageUploads

# Copy the published output from the build stage
COPY --from=build /app .

# Expose the port your application listens on (default for Kestrel is 80, for HTTPS is 443)
# Render typically handles port mapping, but it's good practice to declare.
EXPOSE 80

# Define the entry point for the application
# This assumes your main executable DLL is named SkillLink.dll
ENTRYPOINT ["dotnet", "SkillLink.dll"]

