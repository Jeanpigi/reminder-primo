const axios = require("axios");
const schedule = require("node-schedule");

const sendMessages = (fechasArray, celular, mensaje) => {
  const urlWhatsApp = "http://localhost:3001/api/sendWhatsApp";
  const urlSendSMS = "http://localhost:3001/api/sendSMS";

  fechasArray.forEach((fechaStr) => {
    const fechaInicio = new Date(fechaStr);
    // Calcular la fecha y hora dos minutos antes para pruebas
    // const twoMinutesBefore = new Date(fechaInicio.getTime() - 2 * 60 * 1000);
    // Calcular la fecha y hora dos horas antes
    const twoHoursBefore = new Date(fechaInicio.getTime() - 2 * 60 * 60 * 1000);

    schedule.scheduleJob(twoHoursBefore, () => {
      axios.post(urlWhatsApp, { fechaInicio, celular, mensaje });
      axios.post(urlSendSMS, { fechaInicio, celular, mensaje });
    });
  });
};

module.exports = sendMessages;
