// import dotenv to access en variables
require("dotenv").config();

// import mongoose
const mongoose = require("mongoose");

// Connect to the MongoDB database using mongoose
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: false,
});

// get connection
const db = mongoose.connection;

// Check connection
db.on("error", (error) => {
  console.log("An error occured when connecting.", error);
});
db.once("open", () => {
  console.log("Connection working!");
});

// DB schema
const messageSchema = require("./schemas");

// create model
const Message = mongoose.model("Message", messageSchema);

// QUERIES
const queries = {
  addMessage: async (name, email, message) => {
    try {
      // add instance for each message
      const item = new Message({ name, email, message });
      return await item.save().catch((error) => {
        console.log("addMessage error in try block:", error);
      });
    } catch (error) {
      console.log(error);
      throw new Error("Error adding messages to the database");
    }
  },
  getMessages: async () => {
    try {
      const messages = await Message.find();
      return messages;
    } catch (error) {
      console.log(error);
      throw new Error("Error getting messages from the database");
    }
  },
};

module.exports = { db, queries };
