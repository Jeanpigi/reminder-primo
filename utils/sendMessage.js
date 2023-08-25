const axios = require("axios");
const schedule = require("node-schedule");

const sendMessage = (fecha, celular, mensaje) => {
  const urlWhatsApp =
    "http://localhost:41030/api/sendWhatsApp" ||
    "https://reminder-primo-b01b21f4b5c9.herokuapp.com/api/sendWhatsApp";
  const urlSendSMS =
    "http://localhost:41030/api/sendSMS" ||
    "https://reminder-primo-b01b21f4b5c9.herokuapp.com/api/sendSMS";

  const fechaInicio = new Date(fecha);
  const twoHoursBefore = new Date(fechaInicio.getTime() - 2 * 60 * 60 * 1000);

  schedule.scheduleJob(twoHoursBefore, () => {
    axios.post(urlWhatsApp, { fechaInicio, celular, mensaje });
    axios.post(urlSendSMS, { fechaInicio, celular, mensaje });
  });
};

module.exports = sendMessage;
