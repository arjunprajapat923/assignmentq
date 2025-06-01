const mongoose = require("mongoose");
const express = require("express");
const Inquiry = require("../models/Inquiry");
const User = require("../models/user");


exports.createInquiry = async (req, res) => {
  const { category, date, budget, city, referenceImage } = req.body;
  const clientId = req.user.id;

  try {
    // Find matching partners
    const partners = await User.find({
      role: "partner",
      verificationStatus: "verified",
      services: category,
    });

    const partnerIds = partners
      .filter((p) => p.city === city) // Simple city match logic
      .map((p) => p._id);

    const inquiry = new Inquiry({
      clientId,
      category,
      date,
      budget,
      city,
      referenceImage,
      assignedPartners: partnerIds,
    });

    await inquiry.save();
    res.status(201).json({ message: "Inquiry submitted", inquiry });
  } catch (err) {
    res.status(500).json({ error: "Inquiry submission failed" });
  }
};

// Partner fetches assigned leads
exports.getAssignedLeads = async (req, res) => {
  const partnerId = req.user.id;

  try {
    const leads = await Inquiry.find({ assignedPartners: partnerId })
      .populate("clientId", "name email")
      .sort({ createdAt: -1 });

    res.json(leads);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leads" });
  }
};
