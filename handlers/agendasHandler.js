const getAgendasForToday = require("../database/db");

const agendasHandler = async (req, res) => {
  try {
    const todayAgendas = await getAgendasForToday();
    console.log("Agendas para el día actual:");
    console.log(todayAgendas);

    if (todayAgendas.length === 0) {
      // Si no hay agendas, envía un mensaje indicándolo
      console.log("No hay agendas para hoy.");
      res.send("No hay agendas para el día de hoy.");
    } else {
      // Si hay agendas, crea una representación en cadena de ellas
      let agendasString = todayAgendas
        .map(
          (item) =>
            `Fecha a enviar: ${item.Fechaini}, fecha fin: ${item.Fechafin}, celular: ${item.Celular}`
        )
        .join("\n");

      console.log(agendasString);
      // Envía la cadena de agendas como respuesta
      res.send(`Agendas para hoy:\n${agendasString}`);
    }
  } catch (error) {
    // Si hay un error, envía un mensaje de error
    console.error("Error al obtener las agendas para el día actual:", error);
    res.status(500).send("Error al obtener las agendas para el día de hoy.");
  }
};

module.exports = agendasHandler;
