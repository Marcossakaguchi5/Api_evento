const db = require('../db');

module.exports = {
  
    buscarTodos: () => {
        return new Promise((ace, rej) => {
          db.query("SELECT e.descricao, e.data_hora, c.nome, c.email, c.cargo,c.telefone,  ec.condicao,ec.anunciados,ec.presenca  FROM evento_convidados ec,convidados c, evento e WHERE ec.id_evento=e.id_evento AND ec.id_convidados=c.id_convidados;", (error, results) => {
            if (error) {
              rej(error);
              return;
            }
            ace(results);
          });
        });
      },
      buscarUm: (id_evento) => {
        return new Promise((ace, rej)=>{
    
            db.query('SELECT * FROM evento_convidados ec INNER JOIN convidados c  ON c.id_convidados= ec.id_convidados INNER JOIN  evento e  ON e.id_evento=ec.id_evento;', [id_evento], (error, results) => {
                if(error) { rej(error); return; }
                if(results.length > 0){ 
                    ace(results[0]);
                }else {
                    ace(false);
                }
                 

 
            });
        });
    },
    inserir: (id_evento,id_convidados, condicao,anunciados,presenca)=> {
        return new Promise((aceito, rejeitado)=> {

            db.query('INSERT INTO evento_convidados (id_evento,id_convidados, condicao,anunciados,presenca) VALUES (?,?,?,?,?)',
                [id_evento,id_convidados,condicao,anunciados,presenca],
                (error, results)=>{
                    if(error){ rejeitado(error); return; }
                    aceito(results.insertid_evento); 
                }
            );
        });
    },
    alterar:(id_evento,id_convidados,condicao,anunciados,presenca)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('UPDATE evento_convidados SET id_convidados=?,condicao=?,anunciados=?,presenca=? WHERE id_evento = ?',
                [id_convidados,condicao,anunciados,presenca,id_evento],
                (error, results) => {
                    if(error){ rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },/*

    excluir_convidado_evento: (id_convidado)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('DELETE FROM evento_convidados WHERE id_convidados = ?',[id_convidado], (error, results ) =>{
                if(error){ rejeitado(error); return; }
                aceito(results);
            });
        });
    },*/

    excluir: (id_evento)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('DELETE FROM evento_convidados WHERE id_evento = ?',[id_evento], (error, results ) =>{
                if(error){ rejeitado(error); return; }
                aceito(results);
            });
        });
    }
};


