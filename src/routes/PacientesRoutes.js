import express  from "express";
import PacientesController from "../controllers/pacienteControler.js";

const routes = express.Router();

routes.get("/pacientes",PacientesController.listarPacientes);
routes.get("/pacientes/:id",PacientesController.listarPacientesPorId);
routes.post("/pacientes",PacientesController.cadastrarPacientes);
routes.delete("/pacientes/:id",PacientesController.deletarPacientes);
routes.put("/pacientes/:id",PacientesController.atualizarPacientes);



export default routes;