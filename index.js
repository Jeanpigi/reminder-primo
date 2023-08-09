const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const getAgendas = require("./utils/getAgendas");

// Rutas
const index = require("./routes/index");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.use("/", index);

getAgendas();

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
