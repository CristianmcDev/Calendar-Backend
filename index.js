import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import eventsRoutes from "./routes/events.js";
import { dbConnection } from "./database/config.js";

import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Crear el server
const app = express();

// BD
dbConnection();

// CORS
app.use(cors());

//Directorio público
app.use(express.static("public"));

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Lectura y parseo del body
app.use(express.json());

//Rutas
app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);
// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Server Up on port ${4000}`);
});
