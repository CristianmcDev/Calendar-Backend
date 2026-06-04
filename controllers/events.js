import { response } from "express";
import { Event } from "../models/Evento.js";

const getEventos = async (req, res = response) => {
  const eventos = await Event.find().populate("user", "name");

  res.json({
    ok: true,
    eventos,
  });
};

const crearEvento = async (req, res = response) => {
  const evento = new Event(req.body);

  try {
    evento.user = req.uid;
    const eventSaved = await evento.save();

    res.status(201).json({
      ok: true,
      evento: eventSaved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al crear evento, hable con el admin",
    });
  }
};

const actualizarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Event.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe con ese id",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de editar el evento",
      });
    }

    const nuevoEvento = { ...req.body, user: uid };

    const eventoActualizado = await Event.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true },
    );

    res.status(200).json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar evento, hable con el admin",
    });
  }
};

const eliminarEvento = async (req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Event.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe con ese id",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegio de editar el evento",
      });
    }

    await Event.findByIdAndDelete(eventoId);

    res.status(200).json({
      ok: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error al actualizar evento, hable con el admin",
    });
  }
};

export { getEventos, crearEvento, actualizarEvento, eliminarEvento };
