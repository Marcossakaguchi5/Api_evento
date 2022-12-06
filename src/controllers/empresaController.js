const empresaService = require("../services/empresaService");

module.exports = {
  buscarTodos: async (req, res) => {
    let json = { error: "", result: [] };
    let empresa = await empresaService.buscarTodos();
    for (let i in empresa) {
      json.result.push({
        id_empresa: empresa[i].id_empresa,
        empresa: empresa[i].empresa,
      });
    }
    res.status(200);
    res.json(json);
  },

  buscarUm: async (req, res) => {
    let json = { error: "", result: {} };

    let id_empresa = req.params.id_empresa; //para pegar o parametro
    let empresa = await empresaService.buscarUm(id_empresa);

    if (empresa) {
      json.result = empresa;
    }
    res.status(200);
    res.json(json);
  },

  inserir: async (req, res) => {
    let json = { error: "", result: {} };

    let empresa = req.body.empresa;

    if (empresa) {
      let empresaCod = await empresaService.inserir(empresa);
      json.result = {
        id_empresa: empresaCod,
        empresa,
      };
    } else {
      json.error = "Campos não enviados";
    }
    res.status(201);
    res.json(json);
  },

  alterar: async (req, res) => {
    let json = { error: "", result: {} };

    let id_empresa = req.params.id_empresa;
    let empresa = req.body.empresa;

    if (id_empresa && empresa) {
      await empresaService.alterar(id_empresa, empresa);
      json.result = {
        id_empresa,
        empresa,
      };
    } else {
      json.error = "Campos não enviados";
    }
    res.json(json);
  },
  excluir: async (req, res) => {
    let json = { error: "", result: {} };

    await empresaService.excluir(req.params.id_empresa);
    res.status(204);
    res.json(json);
  },
};
