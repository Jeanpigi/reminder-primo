require("dotenv").config();

const formatTime = (fecha) => {
  const horas = fecha.getHours();
  const minutos = fecha.getMinutes();
  const amOrPmInicio = horas >= 12 ? "PM" : "AM";
  return `${(horas % 12 || 12).toString().padStart(2, "0")}:${minutos
    .toString()
    .padStart(2, "0")} ${amOrPmInicio}`;
};

const buildMessage = (fecha) => {
  const dateObject = new Date(fecha);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const horaFormateada = formatTime(dateObject);
  return `${day}/${month}/${year} a la hora: ${horaFormateada}`;
};

const sendWhatsAppHandler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { fechaInicio, fechaFin, celular, mensaje } = req.body;

      if (!fechaInicio || !fechaFin || !celular || !mensaje) {
        throw new Error("Los datos de entrada son inválidos.");
      }

      const fechaFormateada = buildMessage(fechaInicio);
      const dateObjectFin = new Date(fechaFin);
      const horaFormateadaFin = formatTime(dateObjectFin);

      // Crear el mensaje completo
      const message = `${mensaje} ${fechaFormateada} - ${horaFormateadaFin}`;

      const options = {
        method: "POST",
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

      const response = await fetch(process.env.APIWHATSAPP, options);
      const data = await response.json();
      res.status(200).json({ data });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Método no permitido" });
  }
};

module.exports = sendWhatsAppHandler;
