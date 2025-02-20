const aiServices = require("../services/ai.service");
const Review = require("../models/Review");

module.exports.getReview = async (req, res) => {
    try {
        console.log("📩 Received request for getReview:", req.body); // ✅ Log incoming request

        const { code } = req.body;

        if (!code) {
            console.log("⚠️ Missing 'code' in request body.");
            return res.status(400).json({ error: "Code is required" });
        }

        // Get AI feedback using the service
        console.log("🤖 Sending code to AI service...");
        const aiFeedback = await aiServices(code);
        console.log("✅ AI Feedback received:", aiFeedback);

        // Save the review in MongoDB
        console.log("💾 Saving review in MongoDB...");
        const newReview = new Review({ code, aiFeedback });
        await newReview.save();
        console.log("✅ Review saved successfully!");

        // Send the AI review as response
        res.json({ review: aiFeedback });

    } catch (error) {
        console.error("❌ Error in getReview:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ NEW FUNCTION: Fetch All Stored Reviews

module.exports.getAllReviews = async (req, res) => {
    try {
        console.log("📩 Received request for getAllReviews");

        // Fetch all reviews from MongoDB (sorted by newest first)
        console.log("🔎 Fetching all reviews from MongoDB...");
        const reviews = await Review.find().sort({ createdAt: -1 });

        console.log(`✅ ${reviews.length} reviews found`);
        res.json({ reviews });

    } catch (error) {
        console.error("❌ Error in getAllReviews:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
