const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

//mongodb
mongoose
  .connect(
    "mongodb+srv://lalkirshna00:lalkrishna00@cluster0.1m34c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/res", (req, res, next) => {
  res.send("hi");
  console.log("hi");
});

app.listen(9000);
