import mongoose from "mongoose";
import ErrorBase from "../errors/ErroBase.js";
import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";
import ErroValidacao from "../errors/ErroValidacao.js";
import NaoEncotrado from "../errors/NaoEncontrado.js";

// eslint-disable-next-line no-unused-vars
function manipuladorDeErros(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new RequisicaoIncorreta().enviarResposta(res);
  } else if(error instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(error).enviarResposta(res);
  } else if(error instanceof NaoEncotrado) {
    error.enviarResposta(res);
  } else {
    new ErrorBase().enviarResposta(res);
  }
}

export default manipuladorDeErros;