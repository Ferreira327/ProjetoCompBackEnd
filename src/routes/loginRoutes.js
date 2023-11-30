import express from "express";
import loginController from "../controllers/loginController.js";
import authmid from "../middlewares/Auth.js";

const routes = express.Router();

routes.post("/fazerLogin", loginController.fazerLogin); // Receber os dados do Front, da tela de Login
routes.get("/fazerLogin", loginController.formulario); // Página de Login do enfermeiro
routes.post("/register", loginController.registrar); // Registrar um enfermeiro
routes.post("/recuperarSenha", loginController.esqueceuSenha); // Pedir um token de recuperação de senha, via email
routes.post("/resetarSenha", loginController.resetarSenha); // Escolher nova senha

export default routes;
