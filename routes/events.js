import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {
  getEventos,
  actualizarEvento,
  crearEvento,
  eliminarEvento,
} from "../controllers/events.js";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validarCampos.js";
import { isDate } from "../helpers/isDate.js";

/*
   Events Routes
   /api/events
 */

const router = Router();
// Todas validadas jwt
router.use(validarJWT);
// Obtener eventos
router.get("/", getEventos);

// Crear un nuevo evento
router.post(
  "/",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio obligatorio").custom(isDate),
    check("end", "Fecha de fin obligatorio").custom(isDate),
    ,
    validarCampos,
  ],
  crearEvento,
);

// Actualizar un evento
router.put(
  "/:id",
  [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio obligatorio").custom(isDate),
    check("end", "Fecha de fin obligatorio").custom(isDate),

    ,
    validarCampos,
  ],
  actualizarEvento,
);

// Borrar un evento
router.delete("/:id", eliminarEvento);

export default router;
