const db = require("../db");

module.exports = {
  buscarTodos: () => {
    return new Promise((ace, rej) => {
      db.query("SELECT * FROM empresa", (error, results) => {
        if (error) {
          rej(error);
          return;
        }
        ace(results);
      });
    });
  },
  buscarUm: (empresa) => {
    return new Promise((ace, rej) => {
      db.query(
        "SELECT * FROM empresa WHERE empresa = ?",
        [empresa],
        (error, results) => {
          if (error) {
            rej(error);
            return;
          }
          if (results.length > 0) {
            ace(results[0]);
          } else {
            ace(false);
          }
        }
      );
    });
  },
  inserir: (empresa) => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "INSERT INTO empresa (empresa) VALUES (?)",
        [empresa],
        (error, results) => {
          if (error) {
            rejeitado(error);
            return;
          }
          aceito(results.insertempresa);
        }
      );
    });
  },
  alterar: (empresas,empresa) => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "UPDATE empresa SET empresa=? WHERE empresa = ?",
        [empresa,empresas],
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

  excluir: (empresa) => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "DELETE FROM empresa WHERE empresa = ?",
        [empresa],
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
