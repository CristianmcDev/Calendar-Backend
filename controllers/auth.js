import { response } from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/User.js";
import { generarJWT } from "../helpers/jwt.js";

export const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;
  try {
    let usuario = await User.findOne({ email });

    if (usuario) {
      return res.status(400).json({
        ok: false,
        msg: "User exists whit this email",
      });
    }

    usuario = new User(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();

    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.status(201).json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al registrarse, hable con el admin",
    });
    console.log(error);
  }
};

export const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuario = await User.findOne({ email });

    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "User not exists whit this email",
      });
    }

    // Confirm passwords
    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Contraseña incorrecta",
      });
    }

    //Generar JWT
    const token = await generarJWT(usuario.id, usuario.name);

    res.json({
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al logearse, hable con el admin",
    });
    console.log(error);
  }
};

export const revalidarToken = async (req, res = response) => {
  const { uid, name } = req;

  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    token,
  });
};
