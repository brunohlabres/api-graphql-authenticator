const { AuthenticationError } = require("apollo-server");
const generator = require("../../../helpers/generator");
const usuarioCadastroService = require("../../../services/UsuarioCadastroService")

module.exports = {
    Query: {
        // Retorna informacoes dos usuarios (nome)
        usuarios: async (_,__,{validate}) => {
            const user_id = validate();
            return await usuarioCadastroService.usuarios()
        },
    },
    Mutation: {
        // Cria novo usuário a partir de um nome
        criarUsuario: async(_, { data }) => {
            data.token = generator.criarToken(data.id);
            return await usuarioCadastroService.criarUsuario(data);
        },

        // Atualiza os dados do usuário com determinada ID
        atualizarUsuario: async(_, { id, data }, {validate}) => {
            const user_id = validate();
            return await usuarioCadastroService.atualizarUsuario(id,data);
        },

        // Deleta um usuário a partir de determinada ID, retorna True ou False indicando o sucesso
        deletarUsuario: async(_, { filtro }, {validate}) => {
            const user_id = validate();
            return await usuarioCadastroService.deletarUsuario(filtro);
        },
    },
};