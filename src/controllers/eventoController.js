const eventoService = require("../services/eventoService");

module.exports = {
  buscarTodos: async (req, res) => {
    let json = { error: "", result: [] };
    let evento = await eventoService.buscarTodos();
    for (let i in evento) {
      json.result.push({
        id_evento: evento[i].id_evento,
        descricao: evento[i].descricao,
        data_hora: evento[i].data_hora.toGMTString(),

        id_login: evento[i].id_login,
        login: evento[i].login,
      });
      //console.log(evento)
    }
    res.status(200);
    res.json(json);
  },

  buscarUm: async (req, res) => {
    let json = { error: "", result: {} };

    let id_evento = req.params.id_evento; //para pegar o parametro
    let evento = await eventoService.buscarUm(id_evento);

    if (evento) {
      json.result = evento;
    }
    res.status(200);
    res.json(json);
  },

  inserir: async (req, res) => {
    let json = { error: "", result: {} };

    let data_hora = req.body.data_hora;
    let descricao = req.body.descricao;
    let id_login = req.params.id_login;

    if (data_hora && descricao && id_login) {
      let eventoCodigo = await eventoService.inserir(
        data_hora,
        descricao,
        id_login
      );
      json.result = {
        id_evento: eventoCodigo,
        data_hora,
        descricao,
        id_login,
      };
    } else {
      json.error = "Campos não enviados";
    }
    res.status(201);
    res.json(json);
  },

  alterar: async (req, res) => {
    let json = { error: "", result: {} };

    let id_evento = req.params.id_evento;
    let data_hora = req.body.data_hora;
    let descricao = req.body.descricao;

    if (id_evento && data_hora && descricao) {
      await eventoService.alterar(id_evento, data_hora, descricao);
      json.result = {
        id_evento,
        data_hora,
        descricao,
      };
    } else {
      json.error = "Campos não enviados";
    }
    res.json(json);
  },
  excluir: async (req, res) => {
    let json = { error: "", result: {} };

    await eventoService.excluir(req.params.id_evento);
    res.status(204);
    res.json(json);
  },
};
