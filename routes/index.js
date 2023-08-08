const express = require("express");
const router = express.Router();
const sendSMSHandler = require("../handlers/sendSMSHandler");
const sendWhatsAppHandler = require("../handlers/sendWhatsAppHandler");

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.get("/test", (req, res) => {
  res.send("Esta es una prueba");
});

router.post("/api/sendSMS", sendSMSHandler);
router.post("/api/sendWhatsApp", sendWhatsAppHandler);

module.exports = router;
