const convidadoService = require("../services/convidadoService");

module.exports = {
  buscarTodos: async (req, res) => {
    let json = { error: "", result: [] };
    let convidados = await convidadoService.buscarTodos();
    for (let i in convidados) {
      json.result.push({

        nome: convidados[i].nome,
        cargo: convidados[i].cargo,
        empresa:convidados[i].empresa,
        email: convidados[i].email,
        telefone: convidados[i].telefone,
        
      });
    }
    res.json(json);
  },

  buscarUm: async (req, res) => {
    let json = { error: "", result: {} };

    let nome = req.params.nome;
    let convidado = await convidadoService.buscarUm(nome);

    if (convidado) {
      json.result = convidado;
    }

    res.json(json);
  },

  inserir: async (req, res) => {
    let json = { error: "", result: {} };

    let nome = req.body.nome;
    let email = req.body.email;
    let cargo = req.body.cargo;
    let telefone = req.body.telefone;
    let empresa = req.body.empresa;

    if (nome && email && cargo && telefone,empresa) {
      let convidadoCodigo = await convidadoService.inserir(
        nome,
        email,
        cargo,
        telefone,
        empresa
      );
      json.result = {
        id_convidado: convidadoCodigo,
        nome,
        email,
        cargo,
        telefone,
        empresa,
      };
    } else {
      json.error = "Campos não enviados";
    }
    res.json(json);
  },

  alterar: async (req, res) => {
    let json = { error: "", result: {} };

    let nomes = req.params.nome;
    let nome = req.body.nome;
    let email = req.body.email;
    let cargo = req.body.cargo;
    let telefone = req.body.telefone;
    let empresa = req.body.empresa;

    if (nome && nomes && email && cargo && telefone&& empresa) {
      await convidadoService.alterar(
      
       nome,
        nomes,
        email,
        cargo,
        telefone,
        empresa
      );
      json.result = {
     
        nomes,
        email,
        cargo,
        telefone,
        empresa
      };
    } else {
      json.error = "Campos não enviados";
    }
    res.json(json);
  },
  excluir: async (req, res) => {
    let json = { error: "", result: {} };

    await convidadoService.excluir(req.params.nome);

    res.json(json);
  },
};
