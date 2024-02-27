const getAgendasForToday = require("../database/db");

const agendasHandler = async (req, res) => {
  try {
    const todayAgendas = await getAgendasForToday();
    if (todayAgendas.length === 0) {
      // Si no hay agendas, envía un mensaje indicándolo
      res.send("No hay agendas para el día de hoy.");
    } else {
      // Si hay agendas, crea una representación en cadena de ellas
      let agendasString = todayAgendas
        .map(
          (item) =>
            ` Proveedor : ${item.Proveedor}, Fecha a enviar: ${item.Fechaini}, Celular: ${item.Celular}`
        )
        .join("\n");
      // Envía la cadena de agendas como respuesta
      res.send(`Agendas para hoy:[\n${agendasString}]`);
    }
  } catch (error) {
    // Si hay un error, envía un mensaje de error
    res
      .status(500)
      .send("Error al obtener las agendas para el día de hoy." + error);
  }
};

module.exports = agendasHandler;
