import ErrorBase from "./ErroBase.js";

class NaoEncontrado extends ErrorBase {
  constructor(mensagem = "Página não encontrada") {
    super(mensagem, 404);
  }
}

export default NaoEncontrado;