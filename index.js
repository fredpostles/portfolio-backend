const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());

// connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: false,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

// routes
app.use("/contact", require("./routes/contact"));

// start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
