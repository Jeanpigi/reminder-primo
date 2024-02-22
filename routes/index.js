const express = require("express");
const router = express.Router();
// const sendSMSHandler = require("../handlers/sendSMSHandler");
const sendWhatsAppHandler = require("../handlers/sendWhatsAppHandler");
const agendasHandler = require("../handlers/agendasHandler");

// Rutas
router.get("/", (req, res) => {
  res.send("Reagendamiento el primo desde vercel!");
});
router.get("/agendas", agendasHandler);
// Rutas para enviar SMS y WhatsApp
// router.post("/api/sendSMS", sendSMSHandler);
router.post("/api/sendWhatsApp", sendWhatsAppHandler);
// Middleware para manejar rutas no encontradas (404)
router.use((req, res) => {
  res.status(404).send("La ruta solicitada no existe.");
});
// Middleware de manejo de errores
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error interno del servidor.");
});

module.exports = router;
