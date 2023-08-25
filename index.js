const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const port = process.env.PORT || 3001;

const getAgendas = require("./utils/getAgendas");

// Rutas
const index = require("./routes/index");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.use("/", index);

getAgendas();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
