const db = require('../db');

module.exports = {
  
    buscarTodos: () => {
        return new Promise((ace, rej) => {
          db.query("SELECT * FROM convidados INNER JOIN empresa ON (convidados.empresa = empresa.empresa)", (error, results) => {
         
            if (error) {
              rej(error);
              return;
            }
            ace(results);
          });
        });
      },
      buscarUm: (nome) => {
        return new Promise((ace, rej)=>{
    
            db.query('SELECT  c.nome, c.cargo,e.empresa, c.email, c.telefone  FROM empresa e,convidados c WHERE c.empresa = e.empresa AND c.nome = ?', [nome], (error, results) => {
                if(error) { rej(error); return; }
                if(results.length > 0){ 
                    ace(results[0]);
                }else {
                    ace(false);
                }
            });
        });
    },
    inserir: (nome,email,cargo,telefone,empresa)=> {
        return new Promise((aceito, rejeitado)=> {

            db.query('INSERT INTO convidados (nome,email,cargo,telefone,empresa) VALUES (?,?,?,?,?)',
                [nome,email,cargo,telefone,empresa],
                (error, results)=>{
                    if(error){ rejeitado(error); return; }
                    aceito(results.insertid_convidado); 
                }
            );
        });
    },
    alterar:(nome,nomes,email,cargo,telefone,empresa)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('UPDATE convidados SET nome=?,email=?,cargo=?,telefone=? ,empresa =? WHERE nome = ?',
                [nome,email,cargo,telefone,empresa,nomes],
                (error, results) => {
                    if(error){ rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    excluir: (nome)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('DELETE FROM convidados WHERE nome = ?',[nome], (error, results ) =>{
                if(error){ rejeitado(error); return; }
                aceito(results);
            });
        });
    }
};


