const aiServices = require("../services/ai.service");
const Review = require("../models/Review");

module.exports.getReview = async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ error: "Code is required" });
        }

        // Get AI feedback using the service
        const aiFeedback = await aiServices(code);

        // Save the review in MongoDB
        const newReview = new Review({ code, aiFeedback });
        await newReview.save();

        // Send the AI review as response
        res.json({ review: aiFeedback });

    } catch (error) {
        console.error("Error in getReview:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


// 1.Frontend sends a request with JavaScript code
//  2. Backend checks if code is provided. (If not, returns 400 error).
// 3.Sends code to AI API & gets feedback.
// 4.Sends code to AI API & gets feedback.
// 5. Sends the AI feedback back to the frontend.
// 6. Handles errors (if MongoDB or AI API fails)



// // ✅ NEW FUNCTION: Fetch All Stored Reviews (Add Below `getReview`)

module.exports.getAllReviews = async (req,res) => {
    try{
        // // Fetch all reviews from MongoDB (sorted by newest first)
        const reviews = await Review.find().sort({ createdAt: -1 });

        

res.json({reviews}); // send reviews to frontend
    } catch (error){
        console.error("error in getallReviews", error);
        res.status(500).json({error:"internal server error"});
    }
};