// Importa o mongoose
//const mongoose = require('mongoose');
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// String de conexão, em caso de erro com o .env e sua URI, adicione a URI diretamente (não recomendado para produção)
const uri = process.env.MONGODB_URI;

const databaseConection = async ()=>{
    if(!global.mongoose){
        //mongoose.set('strictQuery', false) // Desativa um aviso
        global.mongoose = await mongoose.connect(uri)
    }
}

// Função para testar a conexão ao banco de dados
async function connectToDatabase() {
  try {
    //await mongoose.connect(uri);
    databaseConection();
    console.log("Conexão bem-sucedida ao MongoDB Atlas!");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB Atlas:", error.message);
  }
}

// Chamando a função de conexão
connectToDatabase();

export default databaseConection