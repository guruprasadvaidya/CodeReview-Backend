require("dotenv").config();
const mongoose = require("mongoose");

console.log("✅ MongoDB URI:", process.env.MONGODB_URI ? "Found ✅" : "❌ MISSING!");

async function testMongoDBConnection() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("🎉 MongoDB Connected Successfully!");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    } finally {
        mongoose.connection.close();
    }
}

testMongoDBConnection();
