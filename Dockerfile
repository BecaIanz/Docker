FROM mcr.microsoft.com/dotnet/sdk:9.0

ENV HTTP_PROXY="host.docker.internal:3128"
ENV HTTPS_PROXY="host.docker.internal:3128"

COPY ./httyd/httyd.csproj .
RUN dotnet restore
WORKDIR /berk
COPY ./httyd .

ENTRYPOINT ["dotnet", "run"]

EXPOSE 5075