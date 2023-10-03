import ErrorBase from "./ErroBase.js";

class NaoEncotrado extends ErrorBase {
  constructor(mensagem = "Página não encontrada") {
    super(mensagem, 404);
  }
}

export default NaoEncotrado;