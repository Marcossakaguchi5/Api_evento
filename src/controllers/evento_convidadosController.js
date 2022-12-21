const evento_convidadosService = require('../services/evento_convidadosService');

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: "", result: [] };
        let evento_convidados = await evento_convidadosService.buscarTodos();
        for (let i in evento_convidados) {
          json.result.push({
            data_hora:evento_convidados[i].data_hora,
            descricao:evento_convidados[i].descricao,
            nome:evento_convidados[i].nome,
            cargo:evento_convidados[i].cargo,
            empresa:evento_convidados[i].empresa,
          telefone:evento_convidados[i].telefone,
            condicao: evento_convidados[i].condicao,
            anunciados: evento_convidados[i].anunciados,
            presenca: evento_convidados[i].presenca,
                                 
          });
        }
        res.json(json);
      },
    
      buscarUm: async (req, res) => {
        let json = { error: "", result: {} };
    
        let id_evento = req.params.id_evento; 
        let evento = await evento_convidadosService.buscarUm(id_evento);
    
        if (evento) {
          json.result = evento; 
        }
    
        res.json(json);
      },
       
      buscarUmConvidado: async (req, res) => {
        let json = { error: "", result: {} };
    
        let id_evento = req.params.id_evento; 
        let nome=req.body.nome;
        let evento = await evento_convidadosService.buscarUm(id_evento,nome);
    
        if (evento) {
          json.result = evento; 
        }
    
        res.json(json);
      },

    inserir: async(req, res) => {
        let json = {error:'', result:{}};

        let id_evento = req.params.id_evento;
        let nome = req.body.nome;
        let condicao = req.body.condicao;
        let anunciados  = req.body.anunciados;
        let presenca = req.body.presenca
       
        if (id_evento&&nome&&condicao&&anunciados&&presenca){
            let evento_convidadosCodigo = await evento_convidadosService.inserir(id_evento,nome,condicao,anunciados,presenca);
            json.result = {
                nome:evento_convidadosCodigo,
                id_evento,
               nome,
                condicao,
                anunciados,
                presenca,
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },

    alterar: async(req, res) => {
        let json = {error:'', result:{}};

        let id_evento = req.params.id_evento;
        let nome = req.body.nome;
        let condicao = req.body.condicao;
        let anunciados  = req.body.anunciados;
        let presenca = req.body.presenca
    
        if (id_evento&&nome&&condicao&&anunciados&&presenca){
            await evento_convidadosService.alterar(id_evento,nome,condicao,anunciados,presenca);
            json.result = {
                id_evento,
                nome,
                 condicao,
                anunciados,
                presenca,
            };
        }else{
            json.error = 'Campos não enviados';
        }
        res.json(json);
    },
    excluir: async(req, res) => {
      let json = {error:'', result:{}};

      await evento_convidadosService.excluir(req.params.id_evento, req.body.nome);
      
      res.json(json);
  },
}


