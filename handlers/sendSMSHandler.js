const request = require("request");

function sendSMSHandler(req, res) {
  const { fechaInicio, celular, mensaje } = req.body;
  console.log(fechaInicio, celular, mensaje);

  const dateObject = new Date(fechaInicio);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const horas = dateObject.getHours();
  const minutos = dateObject.getMinutes();
  const amOrPmInicio = horas >= 12 ? "PM" : "AM";
  const horaFormateada = `${(horas % 12 || 12)
    .toString()
    .padStart(2, "0")}:${minutos.toString().padStart(2, "0")} ${amOrPmInicio}`;

  const message = `le informa que su cita quedo ${mensaje} para: ${day}/${month}/${year} a la hora: ${horaFormateada} Celular: ${celular}`;

  const options = {
    method: "POST",
    url: "https://www.onurix.com/api/v1/send-sms",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    form: {
      key: process.env.MYKEY,
      client: process.env.MYCLIENT,
      phone: "573185274636",
      sms: message,
      "country-code": "CO",
    },
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.status(200).json({ response: body });
  });
}

module.exports = sendSMSHandler;
