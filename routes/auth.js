/*
	Rutas de Usuarios / Auth
	host + /api/auth
*/
import {
  crearUsuario,
  loginUsuario,
  revalidarToken,
} from "../controllers/auth.js";

import { check } from "express-validator";

import { Router } from "express";
import { validarCampos } from "../middlewares/validarCampos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
const router = Router();

router.post(
  "/new",
  [
    //middlewares
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password debe de ser minimo de 6 caracteres",
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  crearUsuario,
);

router.post(
  "/",
  [
    //middlewares
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password debe de ser minimo de 6 caracteres",
    ).isLength({ min: 6 }),
    validarCampos,
  ],
  loginUsuario,
);

router.get("/renew", validarJWT, revalidarToken);

export default router;
