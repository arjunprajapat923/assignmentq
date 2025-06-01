const mognoose = require("mongoose");
const express = require("express");
const Inquiry = require("../models/Inquiry");

const User = require("../models/user");
const PartnerProfile = require('../models/PartnerProfile');
const Review = require("../models/Review");
const Category = require("../models/Category");
const Location = require("../models/Location");


exports.getPendingPartners = async (req, res) => {
    try {
        const partners = await User.find({role: "partner", verificationStatus: "pemding"});
        res.status(200).json({
            message: "Pending partners fetched successfully",
            partners: partners.map(partner => ({
                id: partner._id,
                name: partner.name,
                email: partner.email,
                services: partner.services,
                documentId: partner.documentId,
                portfolio: partner.portfolio,
                verificationStatus: partner.verificationStatus,
                verificationComment: partner.verificationComment
            }))
        });
        
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
}

exports.verifyPartner = async (req, res) => {
  const { id } = req.params;
  const { status, comment } = req.body;

  if (!["verified", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const partner = await User.findByIdAndUpdate(
      id,
      { verificationStatus: status, verificationComment: comment },
      { new: true }
    );
    if (!partner) return res.status(404).json({ error: "Partner not found" });
    res.json({ message: `Partner ${status}`, partner });
  } catch (err) {
    res.status(500).json({ error: "Verification failed" });
  }
};

exports.getPendingVerifications = async (req, res) => {
  try {
    const pendingProfiles = await PartnerProfile.find({ status: 'pending' }).populate('userId', 'name email');
    res.status(200).json(pendingProfiles);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.verifyPartnerProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, adminComment } = req.body;
    if (!['verified', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const profile = await PartnerProfile.findByIdAndUpdate(
      id,
      { status, adminComment },
      { new: true }
    );
    if (!profile) return res.status(404).json({ message: 'Profile not found' });
    res.status(200).json({ message: `Partner profile ${status}`, profile });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



exports.getStats = async (req, res) => {
  try {
    const totalClients = await User.countDocuments({ role: "client" });
    const totalPartners = await User.countDocuments({ role: "partner" });
    const pendingVerifications = await User.countDocuments({ role: "partner", verificationStatus: "pending" });
    const totalInquiries = await Inquiry.countDocuments();

    res.json({ totalClients, totalPartners, pendingVerifications, totalInquiries });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};



exports.getAllReviews = async (req, res) => {
  const reviews = await Review.find().populate("reviewer partner", "name");
  res.json(reviews);
};



exports.deleteReview = async (req, res) => {
  await Review.findByIdAndDelete(req.params.id);
  res.json({ message: "Review deleted" });
};



exports.createCategory = async (req, res) => {
  const category = new Category({ name: req.body.name });
  await category.save();
  res.status(201).json(category);
};

exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};



exports.updateCategory = async (req, res) => {
  const updated = await Category.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
  res.json(updated);
};


exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.json({ message: "Category deleted" });
};



exports.createLocation = async (req, res) => {
  const location = new Location({ city: req.body.city });
  await location.save();
  res.status(201).json(location);
};


exports.getLocations = async (req, res) => {
  const locations = await Location.find();
  res.json(locations);
};


exports.updateLocation = async (req, res) => {
  const updated = await Location.findByIdAndUpdate(req.params.id, { city: req.body.city }, { new: true });
  res.json(updated);
};


exports.deleteLocation = async (req, res) => {
  await Location.findByIdAndDelete(req.params.id);
  res.json({ message: "Location deleted" });
};