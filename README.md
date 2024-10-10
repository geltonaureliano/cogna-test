# Cogna Educação API

<img src="./assets/logo.jpg" alt="Cogna Educação" width="200"/>


Este projeto é uma API desenvolvida com o framework [NestJS](https://nestjs.com/) utilizando TypeScript. Ele inclui funcionalidades de autenticação (login e cadastro) com geração de tokens JWT, além de endpoints para gerenciar usuários e sincronizar dados. O Swagger foi integrado para gerar automaticamente a documentação da API e facilitar a visualização e testes dos endpoints.

## Tabela de Conteúdos

- [Instalação](#instalação)
- [Execução da Aplicação](#execução-da-aplicação)
- [Testes](#testes)
- [Documentação da API](#documentação-da-api)
- [Autenticação](#autenticação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)

## Instalação

Para começar, clone o repositório e siga os seguintes passos:

```bash
# Clone o repositório
$ git clone https://github.com/geltonaureliano/cogna-test.git

# Entre na pasta do projeto
$ cd cogna-test

# Instale as dependências
$ yarn install
```

## Execução da Aplicação
Para rodar a aplicação em diferentes modos, use os seguintes comandos:

```bash
# Modo de desenvolvimento
$ yarn run start

# Modo de desenvolvimento com auto-reload
$ yarn run start:dev

# Modo de produção
$ yarn run start:prod
```
A API ficará disponível em: http://localhost:3000

## Testes
O projeto possui testes unitários para garantir a funcionalidade do código. Execute os testes com os seguintes comandos:

```bash
# Testes unitários
$ yarn run test

# Testes e2e (end-to-end)
$ yarn run test:e2e

# Cobertura de testes
$ yarn run test:cov
```

## Documentação da API
A documentação completa da API está disponível via Swagger. Para acessá-la, rode a aplicação e acesse a seguinte URL:
```bash
http://localhost:3000/swagger
```
A documentação Swagger fornece uma interface interativa para testar todos os endpoints disponíveis.


# Exemplo de Endpoints Documentados

- *POST /auth/login:* Rota para login de usuários. Retorna um token JWT para autenticação.
- *POST /auth/register:* Rota para cadastro de novos usuários.
- *GET /users:* Retorna todos os usuários cadastrados (necessário autenticação via token).
- *GET /sync-users:* Sincroniza usuários com uma fonte externa (necessário autenticação via token).

# Segurança
Todos os endpoints protegidos utilizam autenticação baseada em token JWT (Bearer Token). Para acessar esses endpoints, você deve fornecer o token no cabeçalho da requisição:

```bash
Authorization: Bearer <token>
```

## Autenticação
Os endpoints de login e cadastro permitem gerenciar usuários e gerar tokens JWT para acessar endpoints protegidos. Após o login, o token JWT deve ser utilizado para autorizar chamadas subsequentes.

# Exemplo de Login

```json
POST /auth/login
{
  "email": "johndoe@example.com",
  "password": "password"
}

Resposta:
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "createdAt": "2023-10-10T12:00:00.000Z"
  },
  "token": "Bearer JWT_TOKEN"
}
```

# Exemplo de Cadastro

```json
POST /auth/register
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password"
}

Resposta:
201 Created
```

## Estrutura do Projeto
O projeto segue a estrutura padrão do NestJS com a adição da configuração do Swagger para documentação.

```bash
src/
│
├── middleware/           # Validação de token JWT
├── prisma/               # Módulo do Prisma (ORM)
├── modules/
│   ├── auth/             # Módulo de autenticação (login/cadastro)
│   ├── users/            # Módulo de usuários
│   └── users-sync/       # Módulo de sincronização de usuários
│
├── app.controller.ts     # Controlador principal
├── app.module.ts         # Módulo principal
└── main.ts               # Arquivo de inicialização
```

## Principais Módulos

- *Auth Module:* Responsável por autenticação de usuários (login e cadastro) e geração de tokens JWT.
- *Users Module:* Manipulação de dados de usuários.
- *Users Sync Module:* Sincronização de usuários com uma fonte externa.

# Integração com o Swagger
A documentação Swagger foi integrada com o NestJS para facilitar a visualização e testes dos endpoints da API. O arquivo de configuração Swagger é gerado automaticamente com base nas anotações dos controladores.

## Tecnologias Utilizadas
- NestJS
- TypeScript
- Swagger
- JWT para autenticação
- Prisma como ORM
