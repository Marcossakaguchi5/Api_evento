const db = require("../db");

module.exports = {

  login: (login)=> {
    return new Promise((ace,rej)=>{
      db.query("SELECT login,senha,perfil  FROM usuario WHERE login = ? ",[login],(error,results)=>{
        if(error){rej(error);return;}
        ace(results)
        
      })
    })


  },

  buscarTodos: () => {
    return new Promise((ace, rej) => {
      db.query("SELECT * FROM usuario", (error, results) => {
        if (error) {
          rej(error);
          return;
        }
        ace(results);
      });
    });
  },
  buscarUm: (id_login) => {
    return new Promise((ace, rej) => {
      db.query(
        "SELECT * FROM usuario WHERE id_login = ?",
        [id_login],
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



  inserir: (login, senha, perfil, email, telefone) => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "INSERT INTO usuario (login,senha,perfil,email,telefone) VALUES (?,?,?,?,?)",
        [login, senha, perfil, email, telefone],
        (error, results) => {
          if (error) {
            rejeitado(error);
            return;
          }
          aceito(results.insertid_login);
        }
      );
    });
  },


  alterar: (id_login, login,  perfil, email, telefone) => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "UPDATE usuario SET login=?, perfil=?,email=?,telefone=? WHERE id_login = ?",
        [login,  perfil, email, telefone, id_login],
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

  excluir: (id_login) => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "DELETE FROM usuario WHERE id_login = ?",
        [id_login],
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
