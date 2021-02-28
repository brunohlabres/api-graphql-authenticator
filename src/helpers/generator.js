// Funcoes de validacao de tokens

const jwt = require("jsonwebtoken");

module.exports = {
  criarToken(id) {
    return jwt.sign({ id }, "secret");
  },

  verificarToken(token) {
    return jwt.verify(token, "secret");
  },
};