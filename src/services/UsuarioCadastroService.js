const db = require('../db')
const generator = require("../helpers/generator")

// Classe com a implementacao das funcoes de acesso ao bd para as mutacoes
class UsuarioCadastroService{
    constructor(service){
        this.service = service;
    }
    usuarios = async () => await db("usuarios");

    criarUsuario = async( data ) => {
        //data.token = generator.criarToken(data.id);
        return await (await this.service("usuarios").insert(data).returning("*"))[0];
    }

    atualizarUsuario = async( id, data ) => {
        return await (await this.service("usuarios").where({id}).update(data).returning("*"))[0];
    }
    deletarUsuario = async( filtro ) => {
        return await this.service("usuarios").where({id : filtro.id}).delete();
    };
}

module.exports = new UsuarioCadastroService(db);