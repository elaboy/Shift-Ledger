FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Production
WORKDIR /src
COPY ["ShiftLedger.Server/ShiftLedger.Server.csproj", "ShiftLedger.Server/"]
RUN dotnet restore "ShiftLedger.Server/ShiftLedger.Server.csproj"
COPY . .
WORKDIR "/src/ShiftLedger.Server"
RUN dotnet build "./ShiftLedger.Server.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Production
RUN dotnet publish "./ShiftLedger.Server.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENV ASPNETCORE_URLS=http://0.0.0.0:8080
ENTRYPOINT ["dotnet", "ShiftLedger.Server.dll"]
