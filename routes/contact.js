const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

//import user schema
const contactSchema = require("../mongoose/schemas");

const Contact = mongoose.model("Contact", contactSchema);

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
