const getAgendasForToday = require("../database/db");

const testHandler = async (req, res) => {
  try {
    const todayAgendas = await getAgendasForToday();
    console.log("Agendas para el día actual:");
    console.log(todayAgendas);
    if (todayAgendas.length === 0) {
      console.log("No hay agendas para hoy.");
      return; // No hace nada si no hay agendas
    }

    todayAgendas.forEach((item) => {
      console.log(
        "-----------------------------------------------------------------------------------------------------"
      );
      console.log(
        `Fecha a enviar: ${item.Fechaini}, fecha fin: ${item.Fechafin} y celular: ${item.Celular}`
      );
      console.log(
        "-----------------------------------------------------------------------------------------------------"
      );
    });
    res.send("Probando a ver si trae las agendas");
  } catch (error) {
    console.error("Error al obtener las agendas para el día actual:", error);
  }
};

module.exports = testHandler;
