const axios = require("axios");
const schedule = require("node-schedule");

const sendMessage = (fecha, celular, mensaje) => {
  const urlWhatsApp = "http://localhost:3001/api/sendWhatsApp";
  const urlSendSMS = "http://localhost:3001/api/sendSMS";

  const fechaInicio = new Date(fecha);
  const twoHoursBefore = new Date(fechaInicio.getTime() - 2 * 60 * 60 * 1000);

  const sendMessages = async () => {
    await axios.post(urlWhatsApp, { fechaInicio, celular, mensaje });
    await axios.post(urlSendSMS, { fechaInicio, celular, mensaje });
  };

  schedule.scheduleJob(twoHoursBefore, sendMessages);
};

module.exports = sendMessage;
