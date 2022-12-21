# Api_evento

## Passos para rodar o projeto
### git clone git@github.com:Marcossakaguchi5/Api_evento.git
### npm install
### criar um arquivo .env (sequir o exemplo do arquivo.env.example)
### npm start

SELECT * FROM evento_convidados 
INNER JOIN  evento as e  ON evento_convidados.id_evento = e.id_evento
INNER JOIN  convidados as c ON evento_convidados.id_convidados = c.id_convidados
INNER JOIN empresa ON  empresa.id_empresa=c.id_empresa
