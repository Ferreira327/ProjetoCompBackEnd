import Pacientes from "../Models/Pacientes.js";
import {Enfermeiros} from "../Models/Enfermeiros.js";

class PacientesController{

    static async listarPacientes (req,res){
        try{
        const ListaE = await Pacientes.find({});
        res.status(200).json(ListaE);}
        catch(erro){
            res.status(500).json({message:`${erro.message} - Falha ao Mostrar Pacientes Disponiveis`});
        }}
   

    static async listarPacientesPorId (req,res){
        try{
        const id = req.params.id;
        const LivroE = await Pacientes.findById(id);
        res.status(200).json(LivroE);}
        catch(erro){
            res.status(500).json({message:`${erro.message} - Falha ao mostrar Paciente`});
        }
    }



    static async cadastrarPacientes (req,res){
        const novoPaciente = req.body
        try{
            const enfermeiraEncontrada = await Enfermeiros.findById(novoPaciente.enfermeiro_enfermeira_atendimento)
            const PacienteCompleto = {...novoPaciente,enfermeiro_enfermeira_atendimento:{...enfermeiraEncontrada._doc}}
            const PacienteCriado = await Pacientes.create(PacienteCompleto)
            res.status(201).json({message: "Criado com sucesso!", Paciente: PacienteCompleto})          // manejo de erros e sucessos
        }catch(erro){
            res.status(500).json({message:`${erro.message} - Falha ao cadastrar Paciente`});
            }
    }


    static async atualizarPacientes (req,res){
        try{
        const id = req.params.id;
        await Pacientes.findByIdAndUpdate(id, req.body);
        res.status(200).json({message: "Enfermeiro(a) atualizado!"});}
        catch(erro){
            res.status(500).json({message:`${erro.message} - Falha na atualização das informações do Paciente`});
        }
    }


    static async deletarPacientes (req,res){
        try{
        const id = req.params.id;
        await Pacientes.findByIdAndDelete(id);
        res.status(200).json({message: "Paciente Deletado!"});}
        catch(erro){
            res.status(500).json({message:`${erro.message} - Falha na remoção do Paciente`});
        }
    }
    
};

    export default PacientesController;