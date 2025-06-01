const mongoose = require('mongoose');

const partnerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  services: [String],
  documentId: String, // e.g., Aadhar number
  portfolioSamples: [String], // URLs
  status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  adminComment: { type: String },
}, { timestamps: true });


module.exports = mongoose.model("ParterProfile", partnerProfileSchema)