const mongoose = require("mongoose");

// Connect to the MongoDB database
mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: false,
});

// get connection
const db = mongoose.connection;

// Check connection
db.on("error", () => {
  console.log("An error occured when connecting.", error);
});
db.once("open", () => {
  console.log("Connection working!");
});

// import schema
const contactSchema = require("./mongoose/schemas");

// Create a model for the 'contacts' collection
const Contact = mongoose.model("Contact", contactSchema);

const onDb = (err, item) => {
  console.log(error, item);
};

const queries = {
  contactSubmission: async (name, email, password) => {
    const item = new User({ name, email, password });
    return await item.save(onDb);
  },
};

module.exports = queries;
