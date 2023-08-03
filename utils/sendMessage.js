const axios = require("axios");
const schedule = require("node-schedule");

const sendMessage = (fechasArray, celular, mensaje) => {
  const url = "https://agenda.supermercadoselprimo.com/api/sendSMS";

  fechasArray.forEach((fechaStr) => {
    const fechaInicio = new Date(fechaStr);
    const twoMinutesBefore = new Date(fecha.getTime() - 2 * 60 * 1000);

    schedule.scheduleJob(twoMinutesBefore, () => {
      axios.post(url, fechaInicio, celular, mensaje);
    });
  });
};

module.exports = sendMessage;
