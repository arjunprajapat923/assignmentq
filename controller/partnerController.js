const express = require("express");
const mongoose = require("mongoose");
const PartnerProfile = require("../models/PartnerProfile");


exports.submitPartnerProfile = async (req, res) => {
    try {
        const { services, documentId, portfolioSamples } = req.body;

        const existingProfile = await PartnerProfile.findOne({ userId: req.user.id });
        if (existingProfile) {
            return res.status(400).json({ message: "Profile already submitted" });
        }

        const newProfile = new PartnerProfile({
            userId: req.user.id,
            services,
            documentId,
            portfolioSamples,
        });

        await newProfile.save();
        res.status(201).json({ message: "Profile submitted for verification" });

    } catch (error) {
        console.error("Error submitting partner profile:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
