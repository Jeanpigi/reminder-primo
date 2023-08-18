const axios = require("axios");
const cron = require("node-cron");
const sendMessage = require("./sendMessage");
require("dotenv").config();

const getAgendas = () => {
  const url = process.env.URL;
  const mensaje = "le recuerda que su cita quedo programada para la fecha";

  const sendDateToday = async () => {
    const currentDate = new Date();
    console.log("--------------------------------------");
    console.log(`Fecha actual: ${currentDate}`);
    const data = await axios
      .get(url)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error(error);
      });

    data.forEach((item) => {
      const fechainiDate = new Date(item.Fechaini);

      if (
        fechainiDate.getDate() === currentDate.getDate() &&
        fechainiDate.getMonth() === currentDate.getMonth() &&
        fechainiDate.getFullYear() === currentDate.getFullYear()
      ) {
        console.log(
          "------------------------------------------------------------"
        );
        console.log(
          `Fecha a enviar: ${item.Fechaini} y celular: ${item.Celular}`
        );
        console.log(
          "-------------------------------------------------------------"
        );
        sendMessage(item.Fechaini, item.Celular, mensaje);
      }
    });
  };

  // este es para las 4 AM
  cron.schedule("0 4 * * *", sendDateToday);
};

module.exports = getAgendas;
