const request = require("request");
require("dotenv").config();

const sendSMSHandler = async (req, res) => {
  try {
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
      .padStart(2, "0")}:${minutos
      .toString()
      .padStart(2, "0")} ${amOrPmInicio}`;

    const message = `${mensaje} ${day}/${month}/${year} a la hora: ${horaFormateada}`;

    const options = {
      method: "POST",
      url: "https://www.onurix.com/api/v1/send-sms",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      form: {
        key: process.env.MYKEY,
        client: process.env.MYCLIENT,
        phone: celular,
        sms: message,
        "country-code": "CO",
      },
    };

    request(options, function (error, body) {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json({ response: body });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = sendSMSHandler;
