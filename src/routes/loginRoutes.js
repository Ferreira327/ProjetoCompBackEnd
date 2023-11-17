import express from "express";
import loginController from "../controllers/loginController.js";
import authmid from '../middlewares/Auth.js'

const routes = express.Router();

    routes.post("/fazerLogin",loginController.fazerLogin);
    routes.get("/fazerLogin",loginController.formulario);
    routes.post("/register",loginController.registrar);
    routes.post("/recuperarSenha",loginController.esqueceuSenha);
    routes.post("/resetarSenha",loginController.resetarSenha);
    
export default routes;