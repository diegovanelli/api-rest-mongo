import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autor, livro } from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livro.find();

      req.resultado = buscaLivros;

      next();
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
        next(new NaoEncontrado("Livro não encontrado"));
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
      const livroResultado = await livro.findByIdAndUpdate(id, req.body);
      if (livroResultado !== null) {
        res.status(200).json({ message: "Livro atualizado!" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch(error) {
      next(error);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      const livroResultado = await livro.findByIdAndDelete(id);
      if (livroResultado !== null) {
        res.status(200).json({ message: "Livro excluido com sucesso!" });
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch(error) {
      next(error);
    }
  };

  static listarLivrosPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosPorFiltro = await livro.find(busca).populate("autor");
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
    try {
      
      const autorEncontrado = await autor.findOne({ nome: nomeAutor});
      if (autorEncontrado !== null) {
        busca.autor = autorEncontrado._id;
      } else {
        busca = null;
      }
    } catch (error) {
      console.log(error);
    }

  }

  return busca;
}

export default LivroController;