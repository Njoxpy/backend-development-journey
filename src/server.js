const express = require("express");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 4000;

const connectDb = require("./config/DB");

app.get("/api/v1/", (req, res) => {
  res.send({ message: "backend development journ  ey" });
});

app.listen(PORT, () => {
  connectDb();
  console.log(`Listening at http://localhost:${PORT}`);
});
