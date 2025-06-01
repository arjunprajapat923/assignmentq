// models/Portfolio.js
const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  imageUrl: { type: String, required: true }, // mock/dummy URL
  description: { type: String },
  index: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("Portfolio", portfolioSchema);
