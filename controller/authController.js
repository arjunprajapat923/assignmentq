const mongoose = require("mongoose");
const express = require("express");

const User = require("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        },
        "SecretKEYForINTERNSHIPASSIGNMENT", // Use a more secure key in production
        {
            expiresIn: "30d" // Token expiration time
        })
};



exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!['client', 'partner', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });
    const newUser = await User.create({ name, email, password, role });
    const token = generateToken(newUser);
    res.status(201).json({ token, user: { id: newUser._id, name, email, role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error aa rha h ', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = generateToken(user);
    res.status(200).json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
  } catch (err) {
    res.status(500).json({ message: 'Server error aa rha h ', error: err.message });
  }
};