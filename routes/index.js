const express = require("express");
const router = express.Router();
const sendSMSHandler = require("../handlers/sendSMSHandler");
const sendWhatsAppHandler = require("../handlers/sendWhatsAppHandler");
const testHandler = require("../handlers/testHandler");

router.get("/", (req, res) => {
  res.send("Reagendamiento el primo desde vercel!");
});

router.get("/test", testHandler);

router.post("/api/sendSMS", sendSMSHandler);
router.post("/api/sendWhatsApp", sendWhatsAppHandler);

module.exports = router;
