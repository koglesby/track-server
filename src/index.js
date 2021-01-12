require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri, {
  useUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb instance");
});

mongoose.connection.on("error", () => {
  console.error("error connecting to mongo");
});

app.get("/", (req, res) => {
  res.send("get request sent!");
});

app.listen(3000, () => {
  console.log("listening on 3000");
});
