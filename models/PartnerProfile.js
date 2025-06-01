const mongoose = require('mongoose');

const partnerProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  services: [String],
  documentId: String, // e.g., Aadhar number
  portfolioSamples: [String], // URLs will contains its images for any other info so  i am not adding extraa image field 
  status: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
  adminComment: { type: String },
}, { timestamps: true });


module.exports = mongoose.model("ParterProfile", partnerProfileSchema)