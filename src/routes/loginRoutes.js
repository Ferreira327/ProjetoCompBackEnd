import express from "express";
import loginController from "../controllers/loginController.js";

const routes = express.Router();

    routes.post("/fazerLogin",loginController.fazerLogin);
    routes.post("/register",loginController.registrar);
    routes.post("/recuperarSenha",loginController.esqueceuSenha);

export default routes;