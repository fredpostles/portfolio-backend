require("dotenv").config();
const express = require("express");
const app = express();
const { db } = require("./mongoose/connection"); //import the connection
const cors = require("cors");
const serverless = require("serverless-http");

// MIDDLEWARE
app.use(cors());
app.use((req, res, next) => {
  // uncomment below line when finished development
  // res.setHeader("Access-Control-Allow-Origin", `${process.env.APP_URL}`);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use(express.json());

// ROUTES
app.use("/contact", require("./routes/contact"));

// set port
const PORT = process.env.PORT || 5000;

// log errors
db.on("error", console.error.bind(console, "connection error:"));

// start server once conncetion is open
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

module.exports = app;

module.exports.handler = serverless(app);
