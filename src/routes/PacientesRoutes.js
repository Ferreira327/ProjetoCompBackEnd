import express from "express";
import PacientesController from "../controllers/pacienteControler.js";
import authmd from "../middlewares/Auth.js";

const routes = express.Router();

routes.get("/pacientes", authmd, PacientesController.listarPacientes);
routes.get("/pacientes/:id", authmd, PacientesController.listarPacientesPorId);
routes.post("/pacientes", authmd, PacientesController.cadastrarPacientes);
routes.delete("/pacientes/:id", authmd, PacientesController.deletarPacientes);
routes.put("/pacientes/:id", authmd, PacientesController.atualizarPacientes);

export default routes;
