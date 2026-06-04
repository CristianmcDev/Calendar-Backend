import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import eventsRoutes from "./routes/events.js";
import { dbConnection } from "./database/config.js";

// Crear el server
const app = express();

// BD
dbConnection();

// CORS
app.use(cors());

//Directorio público
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

//Rutas
app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);

//CRUD: Eventos

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Server Up on port ${4000}`);
});
