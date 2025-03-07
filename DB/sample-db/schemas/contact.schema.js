const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema(
  {
    lastname: { type: String, required: true },
    firstname: { type: String, required: true },
    patronymic: { type: String },
    phone: { type: String, required: true },
    email: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", ContactSchema);
