const express = require("express");
const router = express.Router();
const { queries } = require("../mongoose/connection");

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const result = await queries.addMessage(name, email, message);

    if (result.id) {
      res
        .status(201)
        .json({ message: "Message sent successfully", result: message });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const messages = await queries.getMessages();
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
