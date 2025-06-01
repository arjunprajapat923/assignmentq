const express = require("express");
const mognoose = require("mongoose");

const Portfolio = require("../models/Portfolio");

exports.addPortfolio = async (req, res) => {
    const {imageUrl, description, index} = req.body;
    const parttnerId = req.user.id;

    try {
        const entry = new Portfolio({partnerId, imageUrl, description, index})
        await entry.save();
        res.status(201).json({message: "Portfolio added successfully", portfolio: entry});
        
    } catch (error) {

        res.status(500).json({error: "failed to add portfolio"})
        
    }
}




exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find({ partnerId: req.user.id }).sort({ index: 1 });
    res.json(portfolio);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch portfolio" });
  }
};




exports.updatePortfolio = async (req, res) => {
  const { id } = req.params;
  const { imageUrl, description, index } = req.body;

  try {
    const entry = await Portfolio.findOneAndUpdate(
      { _id: id, partnerId: req.user.id },
      { imageUrl, description, index },
      { new: true }
    );
    if (!entry) return res.status(404).json({ error: "Entry not found or unauthorized" });

    res.json({ message: "Updated", entry });
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
};


exports.deletePortfolio = async (req, res) => {
  try {
    const entry = await Portfolio.findOneAndDelete({ _id: req.params.id, partnerId: req.user.id });
    if (!entry) return res.status(404).json({ error: "Entry not found or unauthorized" });

    res.json({ message: "Deleted", entry });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};