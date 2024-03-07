const express = require("express");
const routers = require("./routes");
const cors = require("cors");
require('dotenv').config();


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(routers)

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
