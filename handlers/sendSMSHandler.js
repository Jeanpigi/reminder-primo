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

const sendSMSHandler = async (req, res) => {
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
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        key: process.env.MYKEY,
        client: process.env.MYCLIENT,
        phone: celular,
        sms: message,
        "country-code": "CO",
      }),
    };

    const response = await fetch(
      "https://www.onurix.com/api/v1/send-sms",
      options
    );
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message);
    }

    res.status(200).json({ response: responseData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = sendSMSHandler;
