const mongoose = require("mongoose");
require("dotenv").config();

const API_URL = process.env.API_URL;
const db = mongoose.createConnection(API_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const messageSchema = require("../mongoose/schemas");
const Message = db.model("Message", messageSchema);

const queries = {
  addMessage: async (name, email, message) => {
    try {
      const item = new Message({ name, email, message });
      return await item.save();
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

exports.handler = async (event, context) => {
  if (event.httpMethod === "POST") {
    try {
      const { name, email, message } = JSON.parse(event.body);

      const result = await queries.addMessage(name, email, message);

      return {
        statusCode: 201,
        body: JSON.stringify({
          message: "Message sent successfully",
          result: result,
        }),
      };
    } catch (error) {
      console.log(error);
      return { statusCode: 500, body: JSON.stringify({ message: error }) };
    }
  } else if (event.httpMethod === "GET") {
    try {
      const messages = await queries.getMessages();

      return {
        statusCode: 200,
        body: JSON.stringify(messages),
      };
    } catch (error) {
      console.log(error);
      return { statusCode: 500, body: JSON.stringify({ message: error }) };
    }
  } else {
    return { statusCode: 405, body: "Method not allowed" };
  }
};
