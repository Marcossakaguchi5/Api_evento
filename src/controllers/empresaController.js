const empresaService = require("../services/empresaService");

module.exports = {
  buscarTodos: async (req, res) => {
    let json = { error: "", result: [] };
    let empresas = await empresaService.buscarTodos();
    for (let i in empresas) {
      json.result.push({
       empresa: empresas[i].empresa,
      });
    }
    res.status(200);
    res.json(json);
  },

  buscarUm: async (req, res) => {
    let json = { error: "", result: {} };

    let empresa = req.params.id_empresa; //para pegar o parametro
    let empresas = await empresaService.buscarUm(empresa);

    if (empresas) {
      json.result = empresas;
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
        empresa: empresaCod,
        
      };
    } else {
      json.error = "Campos não enviados";
    }
    res.status(201);
    res.json(json);
  },

  alterar: async (req, res) => {
    let json = { error: "", result: {} };

    
    let empresas = req.params.empresa;
    let empresa = req.body.empresa;
  

    if (empresas&&empresa) {
      await empresaService.alterar(empresas,empresa);
      json.result = {
      
        empresa,
      };
    } else {
      json.error = "Campos não enviados";
    }
    res.json(json);
  },
  excluir: async (req, res) => {
    let json = { error: "", result: {} };

    await empresaService.excluir(req.params.empresa);
    res.status(204);
    res.json(json);
  },
};
