const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");

app.use(cors());
app.use(express.json());

//mongodb
mongoose
  .connect(process.env.mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/user", userRouter);
app.use("/product", productRouter);

app.listen(9000);
