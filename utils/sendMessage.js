const axios = require("axios");
const schedule = require("node-schedule");

const sendMessage = (fecha, celular, mensaje) => {
  const urlWhatsApp = "http://localhost:3001/api/sendWhatsApp";
  const urlSendSMS = "http://localhost:3001/api/sendSMS";

  const fechaInicio = new Date(fecha);
  const twoMinutesBefore = new Date(fechaInicio.getTime() - 2 * 60 * 1000);

  schedule.scheduleJob(twoMinutesBefore, () => {
    axios.post(urlWhatsApp, { fecha, celular, mensaje });
    axios.post(urlSendSMS, { fecha, celular, mensaje });
  });

  // fechasArray.forEach((fechaStr) => {
  //   const fechaInicio = new Date(fechaStr);
  //   // Calcular la fecha y hora dos minutos antes para pruebas
  //   const twoMinutesBefore = new Date(fechaInicio.getTime() - 2 * 60 * 1000);
  //   // Calcular la fecha y hora dos horas antes
  //   // const twoHoursBefore = new Date(fechaInicio.getTime() - 2 * 60 * 60 * 1000);

  //   schedule.scheduleJob(twoMinutesBefore, () => {
  //     axios.post(urlWhatsApp, { fechaInicio, celulares, mensaje });
  //     axios.post(urlSendSMS, { fechaInicio, celulares, mensaje });
  //   });
  // });
};

module.exports = sendMessage;
