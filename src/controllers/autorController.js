import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autor } from "../models/index.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = autor.find();
      req.resultado = autoresResultado;

      next();
    } catch (error) {
      next(error);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);

      if (autorEncontrado !== null) {
        res.status(200).json(autorEncontrado);
      } else {
        next(new NaoEncontrado("Autor não encontrado."));
      }
    } catch(error) {
      next(error);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "Autor cadastrado com sucesso!", autor: novoAutor });
    } catch (error) {
      next(error);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      const autorResultado = await autor.findByIdAndUpdate(id, {$set: req.body});
      if (autorResultado !== null) {
        res.status(200).json({ message: "Autor atualizado!" });
      } else {
        next(new NaoEncontrado("Autor não encontrado."));
      }
    } catch(error) {
      next(error);
    }
  };

  static async excluirAutor(req, res, next) {
    try {
      const id = req.params.id;
      const autorResultado = await autor.findByIdAndDelete(id);

      if (autorResultado !== null) {
        res.status(200).json({ message: "Autor excluido com sucesso!" });
      } else {
        next(new NaoEncontrado("Autor não encontrado."));
      }
    } catch(error) {
      next(error);
    }
  }
}

export default AutorController;