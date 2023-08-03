const axios = require("axios");
const cron = require("node-cron");

// Esta funcion obtiene las fechas todos los días a las 6:00 AM
const getAgendas = () => {
  const fechas = [];
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
      }
    });
  };

  cron.schedule("0 6 * * *", sendDateToday);
};

module.exports = getAgendas;
