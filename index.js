const express = require("express");
const app = express();
const { db } = require("./mongoose/connection"); //import the connection
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/contact", require("./routes/contact"));

// set port
const PORT = process.env.PORT || 5000;

// log errors
db.on("error", console.error.bind(console, "connection error:"));

// start server once conncetion is open
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
});
