const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const getAgendas = require("./utils/getAgendas");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world");
});

getAgendas();

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
