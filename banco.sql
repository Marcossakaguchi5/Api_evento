DROP DATABASE fatecEventos;

CREATE DATABASE fatecEventos;

USE fatecEventos;

CREATE TABLE
    usuario(
        id_login int AUTO_INCREMENT PRIMARY KEY UNIQUE,
        login varchar(30),
        email varchar(100),
        senha varchar(700),
        telefone varchar(15),
        perfil varchar(30)
    );

CREATE TABLE
    empresa(
        empresa varchar(100) PRIMARY KEY UNIQUE
    );

CREATE TABLE
    evento (
        id_evento int AUTO_INCREMENT PRIMARY KEY UNIQUE,
        data_hora datetime,
        descricao varchar(250),
        id_login int,
        FOREIGN KEY (id_login) REFERENCES usuario(id_login)
    );

CREATE TABLE
    convidados (
        nome varchar(100)  PRIMARY KEY UNIQUE,
        email varchar(100),
        cargo varchar(100),
        telefone varchar(15),
        empresa  varchar(100),
        FOREIGN KEY (empresa) REFERENCES empresa(empresa)
    );

CREATE TABLE
    evento_convidados(
        id_evento int,
        nome varchar(100),
        condicao varchar(20),
        anunciados varchar(30),
        presenca varchar(30),
        FOREIGN KEY (id_evento) REFERENCES evento(id_evento),
        FOREIGN KEY (nome) REFERENCES convidados(nome)
    );