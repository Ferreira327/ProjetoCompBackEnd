import {Enfermeiros} from "../Models/Enfermeiros.js";
import jwt from "jsonwebtoken";
import crypto from 'crypto';
import Mailer from '../modules/Mailer.js'
import authconfig from '../../config/auth.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

  

  async function compararSenhas(senhaInserida, hashArmazenado) {
    const hashInserido = await crypto.createHash('sha256').update(senhaInserida).digest('hex');

    return hashInserido === hashArmazenado;
  }
  

const generateToken = params => {

    return jwt.sign(params,authconfig.secret,{expiresIn: 86400})
    
}


class loginController{


    static formulario(req,res){
    const formularioPath = new URL('../../FrontEnd/index.html', import.meta.url).pathname;
    res.sendFile(formularioPath);
    }

    static  fazerLogin(req,res){
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
                    
                    
                    Enfermeiros.findByIdAndUpdate(user._id,{
                        $set:{
                            passwordResetToken: token,
                            passwordResetTokenExpiration: expiration}
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

        static resetarSenha(req,res){
            const {usuario, novaSenha, token} = req.body;

            Enfermeiros.findOne({usuario}).then(user =>{
                if(user){
                    if(token != user.passwordResetToken || Date.now() > user.passwordResetTokenExpiration){
                        return res.status(400).send("Error invalid Token")
                    }
                    else{
                        user.passwordResetToken = undefined;
                        user.passwordResetTokenExpiration = undefined;
                        user.senha = novaSenha;

                        user.save().then(() => {
                            res.send({message:"Senha trocada com sucesso!"})

                        }).catch(error=>{
                            console.error('Erro ao salvar senha do usuario', error);
                            
                        });
                    }
                }
                else{
                    return res.status(404).send({error:"User not found"})
                }
 
            }).catch(error =>{
                res.status(500).json({message:`${error.message} - Erro no Forgot Password`});
                return res.status(500).send({error: 'Internal server error'});

            })

        }


        

};

export default loginController;