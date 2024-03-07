const express = require("express");
const routers = require("./routes");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173","https://lexartfrontend.vercel.app"],
}));

app.use(express.json());
app.use(routers);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
