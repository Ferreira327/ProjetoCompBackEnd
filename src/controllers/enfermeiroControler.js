import { Enfermeiros } from "../Models/Enfermeiros.js";

class EnfermeiroController {
  static async listarEnfermeiros(req, res) {
    try {
      const ListaE = await Enfermeiros.find({}); // Procura por todos os Enfermeiros
      res.status(200).json(ListaE);
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha ao Mostrar Enfermeiros Disponiveis`,
      });
    }
  }

  static async listarEnfermeirosPorId(req, res) {
    try {
      const id = req.params.id;
      const LivroE = await Enfermeiros.findById(id); //Procura o enfermeiro pelo id
      res.status(200).json(LivroE);
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha ao mostrar Enfermeiro` });
    }
  }

  static async cadastrarEnfermeiro(req, res) {
    try {
      const novoEnfermeiro = await Enfermeiros.create(req.body); // Cria novo Enfermeiro no Banco
      res
        .status(201)
        .json({ message: "Criado com sucesso!", Enfermeiros: novoEnfermeiro });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha ao cadastrar Enfermeiro` });
    }
  }

  static async atualizarEnfermeiro(req, res) {
    try {
      const id = req.params.id;
      await Enfermeiros.findByIdAndUpdate(id, req.body);
      res.status(200).json({ message: "Enfermeiro(a) atualizado!" });
    } catch (erro) {
      res.status(500).json({
        message: `${erro.message} - Falha na atualização das informações do Enfermeiro(a)`,
      });
    }
  }

  static async deletarEnfermeiro(req, res) {
    try {
      const id = req.params.id;
      await Enfermeiros.findByIdAndDelete(id);
      res.status(200).json({ message: "Enfermeiro Deletado!" });
    } catch (erro) {
      res
        .status(500)
        .json({ message: `${erro.message} - Falha na remoção do Enfermeiro` });
    }
  }
}

export default EnfermeiroController;
