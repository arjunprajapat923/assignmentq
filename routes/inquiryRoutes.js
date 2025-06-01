const express = require("express");
const router = express.Router();
const inquiryController = require("../controller/inquiryContorller");
const  { verifyToken } = require("../middlewares/authMiddleware");


router.post("/", verifyToken(["client"]), inquiryController.createInquiry );
router.get("/partner/leads", verifyToken(["partner"]), inquiryController.getAssignedLeads);




module.exports = router;