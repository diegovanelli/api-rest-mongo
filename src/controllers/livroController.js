import NaoEncotrado from "../errors/NaoEncontrado.js";
import { autor, livro } from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);

      if (livroEncontrado !== null) {
        res.status(200).json(livroEncontrado);
      } else {
        next(new NaoEncotrado("Livro não encontrado"));
      }
      res.status(200).json(livroEncontrado);
    } catch(error) {
      next(error);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    const novoLivro = req.body;
    try {
      const autorEncontrado = await autor.findById(novoLivro.autor);
      const livroCompleto = { ...novoLivro, autor: {...autorEncontrado}};
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: "Livro cadastrado com sucesso!", livro: livroCriado });
    } catch (error) {
      next(error);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livro.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Livro atualizado!" });
    } catch(error) {
      next(error);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      await livro.findByIdAndDelete(id);
      res.status(200).json({ message: "Livro excluido com sucesso!" });
    } catch(error) {
      next(error);
    }
  };

  static listarLivrosPorFiltro = async (req, res, next) => {
    const busca = await processaBusca(req.query);
    try {
      if (busca !== null) {
        const livrosPorFiltro = await livro.find({ busca });
        res.status(200).json(livrosPorFiltro);
      } else {
        res.status(200).send([]);
      }
    } catch (error) {
      next(error);
    }
  };
}

async function processaBusca(query) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = query;
  const regex = new RegExp(titulo, "i");

  let busca = {};

  if (editora) busca.editora = { $regex: editora, $options: "i" };
  if (titulo) busca.titulo = regex;

  if (minPaginas || maxPaginas) busca.paginas = {};
  if (minPaginas) busca.paginas.$gte = minPaginas;
  if (maxPaginas) busca.paginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autor.findOne({ nome: nomeAutor});
    const autorId = autor._id;

    if (autor !== null) {
      busca.autor = autorId;
    } else {
      busca = null;
    }
  }

  return busca;
}

export default LivroController;