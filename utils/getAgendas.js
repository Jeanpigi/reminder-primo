const axios = require("axios");
const cron = require("node-cron");

const getAgendas = () => {
  const fechas = [];
  const celulares = [];
  const url = "https://agenda.supermercadoselprimo.com/api/allAgendas";

  const sendDateToday = async () => {
    const currentDate = new Date();
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
        console.log("Fechaini es del día de hoy o posterior:", item.Fechaini);
        fechas.push(item.Fechaini);
        celulares.push(item.Celular);
      }
    });
  };

  // Esto es para cada 3 minutos
  // cron.schedule("*/3 * * * *", sendDateToday);

  // este es para las 4 AM
  cron.schedule("0 4 * * *", sendDateToday);

  // Devuelve las fechas y los números de celular al final
  return { fechas, celulares };
};

module.exports = getAgendas;
