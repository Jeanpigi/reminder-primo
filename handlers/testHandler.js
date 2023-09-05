const getAgendasForToday = require("../database/db");

const testHandler = async (req, res) => {
  try {
    const todayAgendas = await getAgendasForToday();
    console.log("Agendas para el día actual:");
    console.log(todayAgendas);
    res.send("Probando a ver si trae las agendas");
  } catch (error) {
    console.error("Error al obtener las agendas para el día actual:", error);
  }
};

module.exports = testHandler;
