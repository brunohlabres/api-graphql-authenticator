const { ApolloServer } = require("apollo-server");
const graphql = require("./src/graphql");
//const UsuarioCadastroService = require("./src/services/UsuarioCadastroService");
const generator = require("./src/helpers/generator")

const server = new ApolloServer({
  ...graphql,
  context: ({req}) => {
    const token = req.headers.authorization;
    
    // Valida as credenciais dentro do contexto
    return{
      validate () {
        try{
          const { id } = generator.verificarToken(token);
          return id;
        } catch {
          throw new Error("Erro na autenticacao.")
        }
      }
    }
  },
});

server.listen().then(({ url }) => console.log(url));
