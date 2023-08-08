const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const getAgendas = require("./utils/getAgendas");
const sendMessages = require("./utils/sendMessage");

// Rutas
const index = require("./routes/index");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.use("/", index);

const { fechas, celulares } = getAgendas();

const mensaje = "le recuerda que su cita quedo programada para la fecha";

console.log(fechas);

sendMessages(fechas, celulares, mensaje);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
