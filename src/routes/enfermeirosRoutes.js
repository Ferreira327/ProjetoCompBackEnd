import express from "express";
import EnfermeiroControler from "../controllers/enfermeiroControler.js";
import adminRoute from "../middlewares/Admin.js";
import authmd from "../middlewares/Auth.js";

const routes = express.Router();

routes.get("/enfermeiros", authmd, EnfermeiroControler.listarEnfermeiros);
routes.get(
  "/enfermeiros/:id",
  authmd,
  adminRoute,
  EnfermeiroControler.listarEnfermeirosPorId
);
routes.post(
  "/enfermeiros",
  authmd,
  adminRoute,
  EnfermeiroControler.cadastrarEnfermeiro
);
routes.delete(
  "/enfermeiros/:id",
  authmd,
  adminRoute,
  EnfermeiroControler.deletarEnfermeiro
);
routes.put(
  "/enfermeiros/:id",
  authmd,
  adminRoute,
  EnfermeiroControler.atualizarEnfermeiro
);

export default routes;
