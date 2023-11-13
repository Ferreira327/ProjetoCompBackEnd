import express  from "express";
import EnfermeiroControler from "../controllers/enfermeiroControler.js";

const routes = express.Router();

routes.get("/enfermeiros",EnfermeiroControler.listarEnfermeiros);
routes.get("/enfermeiros/:id",EnfermeiroControler.listarEnfermeirosPorId);
routes.post("/enfermeiros",EnfermeiroControler.cadastrarEnfermeiro);
routes.delete("/enfermeiros/:id",EnfermeiroControler.deletarEnfermeiro);
routes.put("/enfermeiros/:id",EnfermeiroControler.atualizarEnfermeiro);



export default routes;