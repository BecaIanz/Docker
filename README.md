## Passo a passo de como usar docker

### 1º Criar um Dockerfile
É muito importante que o `dockerfile` não esteja na mesma pasta que a api ele precisa estar no mesmo nivel dela

```text
projeto/
├── backend/
├── frontend/
└── Dockerfile
```
Dentro do Arquivo:

```
FROM mcr.microsoft.com/dotnet/sdk:9.0-alpine as build
```
Aqui nessa linha ele ta dizendo que é pra criar uma imagem dotnet com o alpine pra deixar a imagem mais leve

```
WORKDIR /iduca   
```

Nesse trecho ele define o diretório em que os comando que vai vir depois vão ser executados

```
ENV HTTP_PROXY="host.docker.internal:3128"
ENV HTTPS_PROXY="host.docker.internal:3128"
```

Aqui ele define as variaveis de habiente pro proxy

```
COPY ./Backend/Iduca.Api/*.csproj ./
RUN dotnet restore
COPY ./Backend/Iduca.Api ./
```

nessa parte é uma maracutaia que só, primeiro ele copia o .csproj para nosso diretório definido la em cima, depois da um restore apenas como .csproj e depois ele copia a pasta nteira e todos os outros arquivos para o direorio, ele faz isso para que quando eu mecha em alguma coisa no progam.cs por exemplo ele não precisa ficar baixando as dependencias tudo de novo sendo que elas continuam igual, assim tornando o build mais rapido

```
RUN dotnet publish -c Release -o /iduca/publish
```
aqui ele ta compilando tudo e gera o arquivo pra executar


```
ENTRYPOINT ["dotnet", "Iduca.Api.dll"]
```

aqui ele diz qual comando vai ser executado quando o container iniciar

```
EXPOSE 5290
```

aqui ele ta falando que a porta que ta rodando é a 5290

### 2º Criar um docker-compose

```
services:
  api:
    build: 
      dockerfile: Backend
      context: .

    ports: 
      - 8000:5284

    env_file:
      - .env
```

primeiro o services da api:

o build é qual imagem ele vai fazer, no dockerfile é o nome do arquivo dockerfile que criamos e context é o caminho pra chegar nele

no ports ele vai mapear as portas no formato HOST:CONTAINER ou seja na esquerda o localhost e na direita o do container(que nós colocamos no expose no docker file)

no env_file ele chama esse arquivo para configurar as variaveis de hambiente

.env ->
```
DB_HOST=db 
DB_PORT=3306
DB_NAME=iduca 
DB_USER=iduca_admin
DB_PASS=admin*123
```

```
  db:
    image: mysql:latest
    
    environment:
      - MYSQL_ROOT_PASSWORD=root
      - MYSQL_DATABASE=iduca
      - MYSQL_USER=iduca_admin
      - MYSQL_PASSWORD=admin*123

    volumes:
      - Iduca:/var/lib/mysql

```
Aqui nos criamos o banco, no image nós dizemos que e vai criar uma imagem mysql da versão mais recente, no environment definimos as variaveis de hambiente e no volume criamos um lugar para guardar os dados do banco então mesmo que o banco seja deletado nós ainda temos os dados

```
 ui:
    # image: ui
    ports:
      - 2000:3000
    build: 
      dockerfile: Frontend
      context: .

    environment:
      - NEXT_PUBLIC_API_HOST=localhost
      - NEXT_PUBLIC_API_PORT=8000
      - NEXT_PUBLIC_API_ENP=api
```

aqui é tudo que eu ja flei acima junto né 

```
volumes:
  Iduca:
```

importante colocar isso aqui na mesma camada do service para o volume ser criado