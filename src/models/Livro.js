import mongoose from "mongoose";
import { autorSchema } from "./Autor.js";

const livroSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  titulo: { type: String, required: [ true, "O título é obrigatório" ] },
  editora: { 
    type: String, 
    required: [ true, "O editora é obrigatório" ],
    enum: {
      values: ["Casa do código", "Alura"],
      message: "A editora {VALUE} não é um alor permitido."
    }
  },
  preco: { 
    type: Number,
    validate: {
      validator: (valor) => {
        return valor >= 10 && valor <= 5000;
      },
      message: "O número de páginas deve estar entre 10 e 5000. Valor informado: {VALUE}"
    }
  },
  paginas: { 
    type: Number,
    min: [10, "O número de páginas deve estar entre 10 e 5000. Valor informado: {VALUE}"],
    max: [5000, "O número de páginas deve estar entre 10 e 5000. Valor informado: {VALUE}"]
  },
  autor: autorSchema
}, { versionKey: false });

const livro = mongoose.model("livros", livroSchema);

export default livro;