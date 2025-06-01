const express = require('express');
const router = express.Router();
const {submitPartnerProfile} = require("../controller/partnerController");
const {verifyToken } = require("../middlewares/authMiddleware");


router.post('/submit', verifyToken(['partner']), submitPartnerProfile);

module.exports = router;