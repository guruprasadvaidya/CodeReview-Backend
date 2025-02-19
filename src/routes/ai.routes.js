const express = require('express');
const aiController = require("../controllers/ai.controller")
const router = express.Router();

router.post("/get-review", aiController.getReview);
router.get("/get-all-reviews" , aiController.getAllReviews );

module.exports = router;
