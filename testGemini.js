const axios = require("axios");
require("dotenv").config(); // Loads .env variables

console.log("🚀 Script Started..."); // Added this line to confirm script execution

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error("❌ API Key is missing! Check your .env file.");
  process.exit(1);
}

const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`;

const askGemini = async (question) => {
  try {
    console.log("🔗 Sending request to Gemini...");
    const response = await axios.post(
      URL,
      { contents: [{ parts: [{ text: question }] }] },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log("🤖 Gemini's Response:", response.data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error("❌ Error:", error.response ? error.response.data : error.message);
  }
};

// Run test
askGemini("Hello, how are you?");
