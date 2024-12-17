# node-red-contrib-ozmap

Wrapper da API do OZMap para Node RED.

## Getting started

### Dependências

Esse projeto foi desenvolvido usando:

* [Node.js (v14)](https://nodejs.org/en/)
* [node-red (v2.1.3)](https://nodered.org/)
* [Docker](https://docs.docker.com/);
* [Docker Compose](https://docs.docker.com/compose/);

Para instalar as dependências de projeto localmente, na versão correta do Node.js, é aconselhado utilizar o Node Version Manager ([nvm](https://github.com/nvm-sh/nvm#installing-and-updating)).
Com o mesmo devidamente instalado e configurado, executar no terminal, na raíz do projeto:

```shell
nvm install 14
```

Caso a versão correta já esteja instalada, basta executar:
```shell
nvm use 14
```

Em seguida, instalar as dependências definidas em `package.json`:
```shell
npm install
```

## Docker Compose

De modo a facilitar a execução das ações do Docker Compose, para buildar imagens e executar contâineres, o serviço `nodered` foi declarado no arquivo `docker-compose.yml`.
Essas ações foram implementadas em um arquivo `Makefile`. Com efeito, executando no terminal:
```shell
make help
```
a listagem de comandos suportados, com suas respectivas documentações, será listada

### Ações de start-up do Node RED

Na raíz do projeto, executar no terminal:

#### Building da imagem
```shell
make build nodered
```

#### Execução do contâiner (detached mode)
```shell
make up nodered
```

#### Logs do contâiner
```shell
make logs nodered
```

#### Encerrar execução do contâiner
```shell
make stop nodered
```

## UI do Node RED

Com o contâiner rodando sem erros, a interface de usuário do Node RED pode ser acessada via browser em `http://localhost:1880`. Certifique-se que, na paleta de nodes, a seção **ozmap** está sendo listada.