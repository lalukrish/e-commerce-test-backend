const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/res", (req, res, next) => {
  res.send("hi");
  console.log("hi");
});

app.listen(9000);
