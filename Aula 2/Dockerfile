FROM mcr.microsoft.com/dotnet/sdk:9.0

ENV HTTP_PROXY="host.docker.internal:3128"
ENV HTTPS_PROXY="host.docker.internal:3128"

COPY ./aula2/aula2.csproj . 
RUN dotnet restore
WORKDIR /aula2
COPY ./aula2 .

ENTRYPOINT ["dotnet", "run", "--urls=http://0.0.0.0:5290"]

EXPOSE 5290