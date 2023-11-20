import mongoose from "mongoose";
import { Enfermeiroschema } from "./Enfermeiros.js";


//configura um model

const pacientesSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId
    },
    nome: {
        type: String,
    },
    idade:{
        type: Number
    },
    enfermeiro_enfermeira_atendimento:{
        type: Enfermeiroschema
    },
    remedios:{
        type: Array
    }
    ,
    toma_soro:{
        type: Boolean
    }
}, {versionKey: false}
);

const pacientes = mongoose.model("Pacientes",pacientesSchema); // (colecão criada no mongoDb Atlas, modelo criado acima)

export default pacientes;