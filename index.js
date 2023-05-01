require("dotenv").config();
const express = require("express");
const app = express();
const { db } = require("./mongoose/connection"); //import the connection
const cors = require("cors");

// const corsOptions = {
//   origin: process.env.APP_URL,
// };

// app.use(cors(corsOptions));

// middleware
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", `${process.env.APP_URL}`);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

// routes
app.use("/contact", require("./routes/contact"));

// set port
const PORT = process.env.PORT || 5000;

// log errors
db.on("error", console.error.bind(console, "connection error:"));

// start server once conncetion is open
db.once("open", () => {
  module.exports = app;
});
