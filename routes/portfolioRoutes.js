const express = require("express");
const router = express.Router(); // ✅ use this only

const portfolioController = require("../controller/portfolioController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Define routes
router.post("/", verifyToken(["partner"]), portfolioController.addPortfolio);
router.get("/", verifyToken(["partner"]), portfolioController.getPortfolio);
router.put("/:id", verifyToken(["partner"]), portfolioController.updatePortfolio);
router.delete("/:id", verifyToken(["partner"]), portfolioController.deletePortfolio);

module.exports = router; // ✅ make sure to export the router
