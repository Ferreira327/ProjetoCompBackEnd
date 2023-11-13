import {Enfermeiros} from "../Models/Enfermeiros.js";
//import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import Mailer from '../modules/Mailer.js'

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

  async function compararSenhas(senhaInserida, hashArmazenado) {
    // Calcula o hash da senha inserida
    const hashInserido = await hashSenha(senhaInserida);
  
    // Compara os hashes
    return hashInserido === hashArmazenado;
  }


const generateToken = params => {

    return jwt.sign(params,process.env.TK_CONECTION_LOGIN,{expiresIn: 86400})
    
}


class loginController{

    static  fazerLogin (req,res){
        const {usuario, senha} = req.body
        try{
         Enfermeiros.findOne({usuario}).select("+senha")
        .then(user=>{

            if(user){
                compararSenhas(senha,user.senha).then(result=>{
                    if(result){
                        const token = generateToken({uid:user.id});
                        return res.send({token : token, tokenExpiration: '1d'});
                    }
                    else{
                        return res.status(400).send("Senha Invalida")
                    }
                }).catch(error =>{
                    console.error("Erro ao verificar Senha", error)
                    return res.status(500).send({error:"internal server error"})
                })
            }
            else{
                return res.status(404).send({error:"User not found"})
            }
        });}
        catch(erro){
            res.status(500).json({message:`${erro.message} - Erro ao logar`});
        }}



        static registrar(req,res){
            const usuario = req.body.usuario
            const senha = req.body.senha

            Enfermeiros.findOne({usuario}).then(UserData => {
                if(UserData){
                    return res.status(400).send({error: 'Usuario já existe!'})
                }
                else{
                    Enfermeiros.create(req.body).then( user => {
                        return res.send({user});
                    }).catch(error => {
                        console.error("Erro ao salvar usuário", error);
                        return res.status(400).send({error: "Falha no Registro"})

                    })
                }
            
            }).catch(error => {
                console.error("Erro ao consultar login no banco de dados!",err)
                return res.status(500).send({error: 'Cadastro Falhou'})
        })
        }




        static esqueceuSenha(req,res){
            const usuario = req.body.usuario;
            const email = req.body.email;

            Enfermeiros.findOne({usuario}).then(user => {
                if(user){
                    const token = crypto.randomBytes(20).toString('hex');
                    const expiration = new Date();
                    expiration.setHours(new Date().getHours()+3);

                    Enfermeiros.findByIdAndUpdate(user.id,{
                        $set:{
                            passwordResetToken: token,
                            passwordResetTokenExpiration: expiration
                        }
                    }).then(() => {
                        Mailer.sendMail({
                            to: email,
                            from: 'webmaster@testeexpress.com',
                            template: 'auth/forgot_password',
                            context: {token}

                        }, error =>{
                            if(error){
                                console.error('Erro ao enviar email',error);
                                return res.status(400).send({error:'fail sending recover password mail'});
                            }
                            else{
                                return res.send();
                            }

                        })

                    }).catch(error => {
                        console.error('Erro ao salvar o token de recuperação de senha', error);
                        return res.status(500).send({error: 'Internal server error'});
                    })

                }
                else{
                    return res.status(404).send({error:"User not found"})
                }


            }).catch(error => {
                res.status(500).json({message:`${error.message} - Erro no forgotPassword`});
            })
        }


        

};

export default loginController;