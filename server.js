import express from "express"; // express
import "dotenv/config.js";
import conectaNaDatabase from "./config/dbConnect.js"; // conexão
import routes from "./src/routes/index.js";

// Conexão DataBase

const conexao = await conectaNaDatabase();

conexao.on("error", (erro) => {
  console.error("Erro de conexao!", erro);
});

conexao.once("open", () => {
  console.log("Conexão feita com sucesso!");
});

// Declarando Express
const app = express();
routes(app);

//Executar Servidor

app.listen(9350, () => {
  console.log("Servidor rodando");
});
