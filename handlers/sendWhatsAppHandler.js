const request = require("request");
require("dotenv").config();

const sendWhatsApphandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { fechaInicio, celular, mensaje } = req.body;

      const currentDay = new Date();

      console.log("------------------------------------------");
      console.log(`Mensaje enviado el dia: ${currentDay}`);
      console.log(
        `fecha y hora del mensaje ${fechaInicio}, celular a enviar ${celular} el mensaje ${mensaje}`
      );

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
        url: process.env.APIWHATSAPP,
        headers: {
          Authorization: process.env.TOKENWHATSAPP,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: { celular },
          type: "template",
          template: {
            name: "template1",
            language: {
              code: "es_mx",
            },
            components: [
              {
                type: "header",
                parameters: [
                  {
                    type: "text",
                    text: "Supermercados el Primo",
                  },
                ],
              },
              {
                type: "body",
                parameters: [
                  {
                    type: "text",
                    text: message,
                  },
                ],
              },
            ],
          },
        }),
      };

      request(options, function (error, response, body) {
        if (error) {
          throw new Error(`Existe un error: ${error}`);
        } else {
          res.status(200).json({ data: body });
        }
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
};

module.exports = sendWhatsApphandler;
