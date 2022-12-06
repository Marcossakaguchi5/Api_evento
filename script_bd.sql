DROP DATABASE fatecEventos;
CREATE DATABASE fatecEventos;
USE  fatecEventos;

CREATE TABLE usuario(
id_login int AUTO_INCREMENT PRIMARY KEY UNIQUE,
login varchar(30) ,  
senha varchar(30),
perfil varchar(30),
email varchar(100),
telefone varchar(15)
);
CREATE TABLE empresa(
id_empresa int AUTO_INCREMENT PRIMARY KEY UNIQUE,
 empresa varchar(100) 
);
CREATE TABLE evento (
id_evento int AUTO_INCREMENT PRIMARY KEY UNIQUE,
data_hora datetime,
descricao varchar(250), 
 
id_login int,

FOREIGN KEY (id_login) REFERENCES usuario(id_login)
);

CREATE TABLE convidados (
id_convidados int AUTO_INCREMENT PRIMARY KEY UNIQUE,
nome varchar(100),
email varchar(100),
cargo varchar(100),
telefone varchar(15)
);

CREATE TABLE  evento_convidados(
id_evento int,
id_convidados int,
condicao varchar(20),
anunciados boolean,
presenca boolean,

FOREIGN KEY (id_evento) REFERENCES evento(id_evento),

FOREIGN KEY (id_convidados) REFERENCES convidados(id_convidados)

);
use fatecEventos;
INSERT INTO usuario (login,senha,perfil,email,telefone) VALUES ("nivea","nivea","adm","nivea@fsnt.com","1456859632");
INSERT INTO usuario (login,senha,perfil,email,telefone) VALUES ("elvis","elvis","adm","elvis@fsnt.com","1485963256");
INSERT INTO usuario (login,senha,perfil,email,telefone) VALUES ("carla","carla","usuario","carla@jacto.com","1425365689");
SELECT * FROM usuario;

INSERT INTO empresa (empresa) VALUES ("Ciag");
INSERT INTO empresa (empresa) VALUES ("Jacto");
INSERT INTO empresa (empresa) VALUES ("Jacto-Clean");
INSERT INTO empresa (empresa) VALUES ("Bruden");
SELECT * FROM empresa;

INSERT INTO evento (data_hora,descricao,id_login) 
VALUES('2022-07-27 05:03:13','formatura bdag 2022/2','1');
INSERT INTO evento (data_hora,descricao,id_login) 
VALUES('2023-01-23 08:03:13','Formaturha map 2022/2','2');
INSERT INTO evento (data_hora,descricao,id_login) 
VALUES('2024-02-25 05:03:13','Formaturha bdag 2023/1','1');
SELECT * FROM evento;

INSERT INTO convidados (nome,email,cargo,telefone)
VALUES ('Marcos Hideki','marcosHideki@Ciag.com','PesquisadorIII','14958362518');
INSERT INTO convidados (nome,email,cargo,telefone)
VALUES ('Giovana ','Giovana@jacto.com','Designer pleno','1536259876');
INSERT INTO convidados (nome,email,cargo,telefone)
VALUES ('Lucas Cabrera ','lucasCabrera@jacto.com','Front-End Pleno','1736259856');
SELECT * FROM convidados;

INSERT INTO evento_convidados (id_evento,id_convidados,condicao,anunciados,presenca) 
VALUES (1,1,"nao respondeu",0,0);

INSERT INTO evento_convidados (id_evento,id_convidados,condicao,anunciados,presenca) 
VALUES (1,2,"nao respondeu",0,0);

INSERT INTO evento_convidados (id_evento,id_convidados,condicao,anunciados,presenca) 
VALUES (1,3,"nao respondeu",0,0);
SELECT * FROM evento_convidados;
docker run --name mysql2 -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql
