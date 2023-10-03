import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroValidacao extends RequisicaoIncorreta {
  constructor(error) {
    const messagensErro = Object.values(error.errors)
      .map(error => error.message)
      .join("; ");
    
    super(`Os seguintes erros foram encontrados: ${messagensErro}`);
  }
}

export default ErroValidacao;