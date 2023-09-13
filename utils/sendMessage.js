const axios = require("axios");
const schedule = require("node-schedule");

const sendMessage = (fechaStart, fechaEnd, celular, mensaje) => {
  const urlWhatsApp = "http://localhost:3001/api/sendWhatsApp";
  const urlSendSMS = "http://localhost:3001/api/sendSMS";

  const fechaInicio = new Date(fechaStart);
  const fechaFin = new Date(fechaEnd);
  const twoHoursBefore = new Date(fechaInicio.getTime() - 2 * 60 * 60 * 1000);

  const sendMessages = async () => {
    await axios.post(urlWhatsApp, { fechaInicio, fechaFin, celular, mensaje });
    await axios.post(urlSendSMS, { fechaInicio, fechaFin, celular, mensaje });
  };

  schedule.scheduleJob(twoHoursBefore, sendMessages);
};

module.exports = sendMessage;
