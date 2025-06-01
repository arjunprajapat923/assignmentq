const express = require('express');
const router = express.Router();
const adminController = require("../controller/adminController");

const  { verifyToken } = require("../middlewares/authMiddleware")

router.use(verifyToken(["admin"]));


//stats
router.get("/stats", adminController.getStats);


//reviews
router.get("/reviews", adminController.getAllReviews);
router.delete("/reviews/:id", adminController.deleteReview);

// 📚 Categories
router.post("/categories", adminController.createCategory);
router.get("/categories", adminController.getCategories);
router.put("/categories/:id", adminController.updateCategory);
router.delete("/categories/:id", adminController.deleteCategory);

//Locations
router.post("/locations", adminController.createLocation);
router.get("/locations", adminController.getLocations);
router.put("/locations/:id", adminController.updateLocation);
router.delete("/locations/:id", adminController.deleteLocation);



router.get("/verifications", verifyToken(["admin"]), adminController.getPendingPartners);
router.put("/verify/:id", verifyToken(["admin"]), adminController.verifyPartner);


module.exports = router;