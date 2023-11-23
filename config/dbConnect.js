import mongoose from "mongoose";

async function conectaNaDatabase() {
  mongoose.connect(process.env.DB_CONECTION_STRING); // Conectar ao Link dado no Mongo Atlas

  return mongoose.connection; // retorna a conexão para que possam ser feitas as mudanças
}

export default conectaNaDatabase;
