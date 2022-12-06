const db = require('../db');

module.exports = {
  
    buscarTodos: () => {
        return new Promise((ace, rej) => {
          db.query("SELECT * FROM convidados INNER JOIN empresa ON (convidados.id_empresa = empresa.id_empresa)", (error, results) => {
         
            if (error) {
              rej(error);
              return;
            }
            ace(results);
          });
        });
      },
      buscarUm: (id_convidado) => {
        return new Promise((ace, rej)=>{
    
            db.query('SELECT  c.nome, c.cargo,e.empresa, c.email, c.telefone  FROM empresa e,convidados c WHERE c.id_empresa = e.id_empresa AND c.id_convidados = ?', [id_convidado], (error, results) => {
                if(error) { rej(error); return; }
                if(results.length > 0){ 
                    ace(results[0]);
                }else {
                    ace(false);
                }
            });
        });
    },
    inserir: (nome,email,cargo,telefone,id_empresa)=> {
        return new Promise((aceito, rejeitado)=> {

            db.query('INSERT INTO convidados (nome,email,cargo,telefone,id_empresa) VALUES (?,?,?,?,?)',
                [nome,email,cargo,telefone,id_empresa],
                (error, results)=>{
                    if(error){ rejeitado(error); return; }
                    aceito(results.insertid_convidado); 
                }
            );
        });
    },
    alterar:(id_convidados,nome,email,cargo,telefone,id_empresa)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('UPDATE convidados SET nome=?,email=?,cargo=?,telefone=? ,id_empresa =? WHERE id_convidados = ?',
                [nome,email,cargo,telefone,id_empresa,id_convidados],
                (error, results) => {
                    if(error){ rejeitado(error); return; }
                    aceito(results);
                }
            );
        });
    },

    excluir: (id_convidado)=> {
        return new Promise((aceito, rejeitado)=> {
            db.query('DELETE FROM convidados WHERE id_convidados = ?',[id_convidado], (error, results ) =>{
                if(error){ rejeitado(error); return; }
                aceito(results);
            });
        });
    }
};


