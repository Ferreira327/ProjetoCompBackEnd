import mongoose from "mongoose";
//import bcrypt, { hashSync } from "bcryptjs"
import crypto from 'crypto'

async function hashSenha(senha) {
    // Converte a senha para ArrayBuffer
    const encoder = new TextEncoder();
    const senhaBuffer = encoder.encode(senha);
  
    // Calcula o hash usando o algoritmo SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', senhaBuffer);
  
    // Converte o ArrayBuffer para uma string hexadecimal
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  
    return hashHex;
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
    hashSenha(this.senha,10).then(hash => {
        this.senha = hash;
        next();
    }).catch(error => {console.error("Error hashing password", error)})
})

const Enfermeiros = mongoose.model("enfermeiros",Enfermeiroschema); // (colecão criada no mongoDb Atlas, modelo criado acima)

export {Enfermeiroschema, Enfermeiros};