

// Define the Review Schema (structure)
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    code: { type: String, required: true },
    aiFeedback: { type: String, required: true }
}, { timestamps: true });  // ✅ Adds `createdAt` and `updatedAt` automatically

module.exports = mongoose.model("Review", reviewSchema);
