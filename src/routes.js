//rate limiting
const express = require("express");
const router = express.Router();
const midle = require("./middlewares/auth.middlewares");

const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;
const {
  verifyToken,
  verifyRefreshToken,
} = require("./middlewares/auth.middlewares");
const { required } = require("./middlewares/auth.middlewares");

const usuarioController = require("./controllers/usuarioController");
router.post("/auth", (req, res) => {
  const { login, senha } = req.body;
  const refreshToken = jwt.sign({ login, senha }, JWT_REFRESH_SECRET, {
    expiresIn: "1000s",
  });
  const token = jwt.sign({ refreshToken }, JWT_SECRET, { expiresIn: "60s" });
  return res.json({ token, refreshToken });
});

router.post("/refresh", verifyRefreshToken, (req, res) => {
  const { refreshToken } = req.body;

  const token = jwt.sign({ refreshToken }, JWT_SECRET, { expiresIn: "60s" });
  return res.json({ token });
});

router.post("/login", usuarioController.login);

router.get("/usuario", /*verifyToken,*/ usuarioController.buscarTodos);
router.get("/usuario/:id_login", usuarioController.buscarUm);

router.post("/usuario", /*midle.required,*/ usuarioController.inserir);
router.put("/usuario/:id_login", usuarioController.alterar);
router.delete("/usuario/:id_login", usuarioController.excluir);

const empresaController = require("./controllers/empresaController");
router.get("/empresa", empresaController.buscarTodos);
router.get("/empresa/:id_empresa", empresaController.buscarUm);
router.post("/empresa", empresaController.inserir);
router.put("/empresa/:id_empresa", empresaController.alterar);
router.delete("/empresa/:id_empresa", empresaController.excluir);

const eventoController = require("./controllers/eventoController");
router.get("/evento", eventoController.buscarTodos);
router.get("/evento/:id_evento", eventoController.buscarUm);
router.post("/evento/:id_login", eventoController.inserir);
router.put("/evento/:id_evento", eventoController.alterar);
router.delete("/evento/:id_evento", eventoController.excluir);

const convidadoController = require("./controllers/convidadoController");
router.get("/convidados", convidadoController.buscarTodos);
router.get("/convidados/:id_convidado", convidadoController.buscarUm);
router.post("/convidados/", convidadoController.inserir);
router.put("/convidados/:id_convidado", convidadoController.alterar);
router.delete("/convidados/:id_convidado", convidadoController.excluir);

const evento_convidadosController = require("./controllers/evento_convidadosController");
router.get("/evento_convidados", evento_convidadosController.buscarTodos);
router.get(
  "/evento_convidados/:id_evento",
  evento_convidadosController.buscarUm
);
router.post("/evento_convidados/", evento_convidadosController.inserir);
router.put(
  "/evento_convidados/:id_evento",
  evento_convidadosController.alterar
);
router.delete(
  "/evento_convidados/:id_evento",
  evento_convidadosController.excluir
);

module.exports = router;
