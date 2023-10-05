import { autor } from "../models/index.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const listaAutores = await autor.find();
      res.status(200).json(listaAutores);
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
        res.status(404).json({
          message: "Autor não encontrado."
        });  
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
      await autor.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Autor atualizado!" });
    } catch(error) {
      next(error);
    }
  };

  static async excluirAutor(req, res, next) {
    try {
      const id = req.params.id;
      await autor.findByIdAndDelete(id);
      res.status(200).json({ message: "Autor excluido com sucesso!" });
    } catch(error) {
      next(error);
    }
  }
}

export default AutorController;