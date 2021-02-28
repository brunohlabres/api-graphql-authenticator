# api-graphql-authenticator

Essa aplicação é uma API REST que realiza operações em um banco de dados PostgreSQL presente em um container (docker). O sistema retorna um token de autenticação do usuário durante o cadastro, permitindo a requisição de outras operações. 

São utilizadas as tecnologias NodeJS, ApolloServer (GraphQL), Knex, PostgreSQL, Docker. 

# Estrutura do projeto
Nessa seção destacarei os arquivos mais relevantes para serem analisados:
- index.js: Arquivo que cuida do gerenciamento de contexto e validação do autenticador.
- src/db: Diretório que possui as migrações feitas com o Knex.
- src/graphql/modules/users: Diretório que possui os reolvers e o schema do GraphQL.
- src/helpers: Diretório que possui as funções relacionadas à autenticação.
- src/services: Classe com o serviço de cadastro e gerenciamento de usuário.

## Dependências

NodeJS == 15.10.0

## Instalação

Ese o seguinte comando para montar o docker e aplicação.

```bash
make all
```

## Uso

Após a instalação, o Playground estará disponível em http://localhost:4000/

O banco possui a relação "usuarios" e os campos: "id" (chave primária), "nome" e "token".

No Playground poderão ser executadas as operações a seguir.

Com a mutação de criarUsuario é passado como um parâmetro um nome para ser adicionado no banco.
Ela retorna a id (chave primária), nome e token de acesso do usuário.
Este token deve ser utilizado para autenticar todas as outras operações.

```typescript
mutation{
  criarUsuario(
    data:{
    	nome: "Maria Silva"
    }
  ) {
    	id nome token
  	}
}
```

Para executar as operações seguintes é necessário inserir um token na seção de "HTTP Headers".
Ele é obtido no método acima e deve ser inserido no formato exemplificado a seguir:

```typescript
{
  "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTQ1Mjc5Mzl9.XQrYGI6eGLw3oBX9dDWp-7s67dYwg1joBnpqbOZLyzU"
}
```

A query usuarios retorna a lista de usuários do sistema e as informações requisitadas, como id, nome e tokens.

```typescript
{
  usuarios{
    id nome token
  }
}
```
Com a mutação de atualizarUsuario é passado como um parâmetro a id do usuário a ser alterado no banco e o novo nome a ser recebido.
Ela retorna a id (chave primária) e nome do usuário.

```typescript
mutation{
  atualizarUsuario(
    id:10,
    data:{
    	nome: "Novo nome"
    }
  ) {
    	id nome
  	}
}
```
Com a mutação de deletarUsuario é passado como um parâmetro a id do usuário a ser deletado.
Ela retorna True ou False, dependendo se a operação foi bem sucedida.

```typescript
mutation{
  deletarUsuario(
    filtro:{
    	id:21
    }
  ) 
}
```
