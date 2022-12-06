require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const routes = require("./routes");

const server = express();
server.use(bodyParser.json());
server.use(cors());
server.use(bodyParser.urlencoded({ extended: false }));
server.use("/api", routes);
console.log(cors);

server.listen(process.env.PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${process.env.PORT}`);
});