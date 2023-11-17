import express from "express";
import enfermeiros from "./enfermeirosRoutes.js";
import pacientes from "./PacientesRoutes.js";
import login from "./loginRoutes.js";


//ponto de Entrada das Rotas


const routes  =  (app) =>{
    app.route("/").get((req,res) => {
        res.status(200).send("Bem-Vindo(a)!");
    })

    app.use(express.static('../../FrontEnd/index.html'));
    app.use(express.json(), enfermeiros);
    app.use(express.json(), pacientes);
    app.use(express.json(), login);

};


export default routes;