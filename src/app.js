const express = require("express");
const db = require("./models/index.js");

const app = express();
const port = 3000;



app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
