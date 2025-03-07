const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema(
  {
    contactId: { type: mongoose.Schema.Types.ObjectId, ref: "Contact", required: true },
    name: { type: String, required: true },
    shortName: { type: String },
    businessEntity: { type: String },
    contract: {
      no: { type: String },
      issue_date: { type: Date },
    },
    type: [{ type: String, enum: ["agent", "contractor"] }],
    status: { type: String, enum: ["active", "inactive"], default: "active" },
    photos: [
      {
        name: String,
        filepath: String,
        thumbpath: String,
      },
    ],
    address: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Company", CompanySchema);


