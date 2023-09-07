const cron = require("node-cron");
const sendMessage = require("./sendMessage");
const getAgendasForToday = require("../database/db"); // Importa la función como un módulo

require("dotenv").config();

const getAgendas = () => {
  const mensaje = "le recuerda que su cita quedo programada para la fecha";

  const sendDateToday = async () => {
    const currentDate = new Date();
    console.log("--------------------------------------");
    console.log(`Fecha actual: ${currentDate}`);

    try {
      // Utiliza la función getAgendasForToday para obtener las agendas para el día actual
      const todayAgendas = await getAgendasForToday();

      if (todayAgendas.length === 0) {
        console.log("No hay agendas para hoy.");
        return; // No hace nada si no hay agendas
      }

      todayAgendas.forEach((item) => {
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
      });
    } catch (error) {
      console.error(error);
    }
  };

  cron.schedule("0 4 * * *", sendDateToday);
};

module.exports = getAgendas;
