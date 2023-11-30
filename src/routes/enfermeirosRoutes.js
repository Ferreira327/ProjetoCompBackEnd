import express from "express";
import EnfermeiroControler from "../controllers/enfermeiroControler.js";
import adminRoute from "../middlewares/Admin.js";
import authmd from "../middlewares/Auth.js";

const routes = express.Router();

routes.get("/enfermeiros", authmd, EnfermeiroControler.listarEnfermeiros); // Ver todos os enfermeiros
routes.get(
  "/enfermeiros/:id",
  authmd,
  adminRoute,
  EnfermeiroControler.listarEnfermeirosPorId
); // Ver um Enfermeiro específico
routes.post(
  "/enfermeiros",
  authmd,
  adminRoute,
  EnfermeiroControler.cadastrarEnfermeiro
); // Criar um enfermeiro
routes.delete(
  "/enfermeiros/:id",
  authmd,
  adminRoute,
  EnfermeiroControler.deletarEnfermeiro
); // deletar um enfermeiro
routes.put(
  "/enfermeiros/:id",
  authmd,
  adminRoute,
  EnfermeiroControler.atualizarEnfermeiro
); // editar um enfermeiro

export default routes;
