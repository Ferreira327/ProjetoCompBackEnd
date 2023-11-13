import mongoose from "mongoose";
//import bcrypt, { hashSync } from "bcryptjs"
import crypto from 'crypto'

async function hashSenha(senha) {
    // Gera um salt aleatório
    //const salt = await crypto.randomBytes(16).toString('hex');
  
    // Cria um hash usando o algoritmo sha256 e o salt
    const hash = await crypto.createHash('sha256').update(senha).digest('hex');
  
    return hash;
  }

//configura um model

const Enfermeiroschema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId
    },
    usuario:{
        type: String
    },
    senha:{
        type: String
    },
    nome: {
        type: String,
        required: true
    },
    especialidade:{
        type: String
    },
    turno:{
        type: String
    },
    passwordResetToken:{
        type: String
    },
    passwordResetTokenExpiration:{
        type: String
    }
}, {versionKey: false}
);

Enfermeiroschema.pre('save', function(next){
    hashSenha(this.senha).then(hash => {
        this.senha = hash;
        next();
    }).catch(error => {console.error("Error hashing password", error)})
})

const Enfermeiros = mongoose.model("enfermeiros",Enfermeiroschema); // (colecão criada no mongoDb Atlas, modelo criado acima)

export {Enfermeiroschema, Enfermeiros};