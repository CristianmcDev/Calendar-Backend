import express from "express";
import "dotenv/config";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import eventsRoutes from "./routes/events.js";
import { dbConnection } from "./database/config.js";
import path from "path";
import { fileURLToPath } from "url";
// Crear el server
const app = express();

// Obtener la ruta absoluta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

// 3. El "catch-all": Añade esto al FINAL de todas tus rutas
app.get("/{*splat}", (req, res) => {
  // Usamos path.join para unir la ruta absoluta con tu carpeta public e index.html
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Server Up on port ${4000}`);
});
