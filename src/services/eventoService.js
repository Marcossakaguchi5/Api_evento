const db = require("../db");

module.exports = {
  buscarTodos: () => {
    return new Promise((ace, rej) => {
      db.query(
        "SELECT e.*,SUM(if(ec.condicao = 'Pendente', 1, 0)) AS nao_confirmados,SUM(if(ec.condicao = 'Confirmado', 1, 0)) AS confirmados,SUM(if(ec.condicao = 'Negado', 1, 0)) AS nao_respondeu,SUM(if(ec.condicao is not null, 1, 0)) AS total  FROM evento e LEFT JOIN evento_convidados ec ON ec.id_evento = e.id_evento GROUP BY e.id_evento ORDER BY e.data_hora ASC;",
        //  SELECT COUNT(id_convidados)  FROM evento_convidados WHERE id_evento=1;
 
//  SELECT COUNT(id_convidados)  FROM evento_convidados WHERE condicao="nao respondeu";
        (error, results) => {
          if (error) {
            rej(error);
            return;
          }
          ace(results);
        }
      );
    });
  },
  buscarUm: (id_evento) => {
    return new Promise((ace, rej) => {
      db.query(
        "SELECT e.*,        SUM(if(ec.condicao = 'Não confirmado', 1, 0)) AS nao_confirmados,        SUM(if(ec.condicao = 'Confirmado', 1, 0)) AS confirmados,        SUM(if(ec.condicao = 'Não respondeu', 1, 0)) AS nao_respondeu,        SUM(if(ec.condicao is not null, 1, 0)) AS total    FROM evento e    LEFT JOIN evento_convidados ec ON ec.id_evento = e.id_evento where e.id_evento=?   GROUP BY e.id_evento     ORDER BY e.data_hora ASC;",    
            [id_evento],
        (error, results) => {

          if (error) {
            rej(error);
            return;
          }
          if (results.length > 0) {
            ace(results);
          } else {
            ace(false);
          }
        }
      );
    });
  },
  inserir: (data_hora, descricao, id_login) => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "INSERT INTO evento (data_hora,descricao,id_login) VALUES (?,?,?)",
        [data_hora, descricao, id_login],
        (error, results) => {
          if (error) {
            rejeitado(error);
            return;
          }
          aceito(results.insertCodigo);
        }
      );
    });
  },
  alterar: (id_evento, data_hora, descricao) => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "UPDATE evento SET data_hora=?,descricao=? WHERE id_evento = ?",
        [data_hora, descricao, id_evento],
        (error, results) => {
          if (error) {
            rejeitado(error);
            return;
          }
          aceito(results);
        }
      );
    });
  },

  excluir: (id_evento) => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "DELETE FROM evento WHERE id_evento = ?",
        [id_evento],
        (error, results) => {
          if (error) {
            rejeitado(error);
            return;
          }
          aceito(results);
        }
      );
    });
  },
};
