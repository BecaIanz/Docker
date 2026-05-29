FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine as build

WORKDIR /app

ENV HTTP_PROXY="host.docker.internal:3128"
ENV HTTPS_PROXY="host.docker.internal:3128"

COPY ./Client/*.csproj ./
RUN dotnet restore
COPY ./Client ./

RUN dotnet publish -c Release -o /app/publish
# se fizer só até aui fica mau utilizado e muito pesado sem necessidade

FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine

RUN addgroup -S primeiroGrupo && adduser -S euzinha -G primeiroGrupo

WORKDIR /app
COPY --from=build --chown=usuariozao:grupao /app/publish ./

USER euzinha

ENTRYPOINT ["dotnet", "Client.dll"]
