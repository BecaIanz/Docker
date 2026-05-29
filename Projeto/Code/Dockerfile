FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine as build

WORKDIR /iduca

ENV HTTP_PROXY="host.docker.internal:3128"
ENV HTTPS_PROXY="host.docker.internal:3128"

COPY ./Backend/Iduca.Api/*.csproj ./
RUN dotnet restore
COPY ./Backend/Iduca.Api ./

RUN dotnet publish -c Release -o /iduca/publish
# se fizer só até aui fica mau utilizado e muito pesado sem necessidade

FROM mcr.microsoft.com/dotnet/aspnet:9.0-alpine

# RUN addgroup -S grupoBack && adduser -S euzinha -G primeiroGrupo

WORKDIR /iduca
COPY --from=build /iduca/publish ./
# --chown=usuariozao:grupao 

# USER euzinha

ENTRYPOINT ["dotnet", "Iduca.Api.dll"]
