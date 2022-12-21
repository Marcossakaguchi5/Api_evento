const usuarioService = require("../services/usuarioService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    try {
      let login = req.body.login;
      let senha = req.body.senha;
      var results = await usuarioService.login(login);
   console.log(results)

      if (await bcrypt.compareSync(senha, results[0].senha)) {
        const token = jwt.sign(
          {
            login: results[0].login,
            senha: results[0].senha,
            perfil: results[0].perfil,
            
          },
          process.env.JWT_KEY,
          {
            expiresIn: "10s",
          }
        );
        res.set('x-access-token',token)
        return res
          .status(200)
         
          
          .send({ message: "Autenticadoi com sucesso", token: token })
          // .set('x-access-token',token);
      }
      return res.status(401).send({ message: "Falha na autenticacao" });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ mesage: "Falha na autenticacao" });
    }
  },

  buscarTodos: async (req, res) => {
    let json = { error: "", result: [] };
    let usuario = await usuarioService.buscarTodos();
    for (let i in usuario) {
      json.result.push({
      id_login:usuario[i].id_login,
        login: usuario[i].login,
        perfil: usuario[i].perfil,
        email: usuario[i].email,
        telefone: usuario[i].telefone,
      });
    }
    res.status(200);
    res.json(json);
  },

  buscarUm: async (req, res) => {
    let json = { error: "", result: {} };

    let id_login = req.params.id_login; //para pegar o parametro
    let usuario = await usuarioService.buscarUm(id_login);

    if (usuario) {
      json.result = usuario;
    }
    res.status(200);
    res.json(json);
  },

  inserir: async (req, res) => {
    let json = { error: "", result: {} };

    let login = req.body.login;
    let senha = await bcrypt.hash(req.body.senha, 10);
    let perfil = req.body.perfil;
    let email = req.body.email;
    let telefone = req.body.telefone;
    if (login && senha && perfil && email && telefone) {
      let loginCod = await usuarioService.inserir(
        login,
        senha,
        perfil,
        email,
        telefone
      );
      json.result = {
        id_login: loginCod,
        login,
        senha,
        perfil,
        email,
        telefone,
      };
    } else {
      json.error = "Campos não enviados";
    }
    res.status(201);
    res.json(json);
  },

  alterar: async (req, res) => {
    let json = { error: "", result: {} };

    let id_login = req.params.id_login;
    let login = req.body.login;
   
    let perfil = req.body.perfil;
    let email = req.body.email;
    let telefone = req.body.telefone;

    if (id_login && login  && perfil && email && telefone) {
      await usuarioService.alterar(
        id_login,
        login,
        
        perfil,
        email,
        telefone
      );
      json.result = {
        id_login,
        login,
        
        perfil,
        email,
        telefone,
      };
    } else {
      json.error = "Campos não enviados";
    }
    // res.status(204);
    res.json(json);
  },
  excluir: async (req, res) => {
    let json = { error: "", result: {} };

    await usuarioService.excluir(req.params.id_login);
    res.status(204);
    res.json(json);
  },
};
