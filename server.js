require('dotenv').config(); // Load environment variables

const mongoose = require('mongoose');
const express = require('express');

const app = require('./src/app');

// ✅ Check if essential environment variables are set
if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing in .env file!");
  process.exit(1); // Exit the process if MongoDB URI is missing
}

if (!process.env.PORT) {
  console.warn("⚠️ PORT not specified! Using default: 10000");
}

const PORT = process.env.PORT || 10000;

// ✅ Connect to MongoDB FIRST
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("🎉 Connected to MongoDB");

    // ✅ Log all registered routes for debugging
    app._router.stack.forEach((middleware) => {
      if (middleware.route) { // Directly registered routes
        console.log(`🔗 ${middleware.route.stack[0].method.toUpperCase()} ${middleware.route.path}`);
      } else if (middleware.name === 'router') { // Routes via Router
        middleware.handle.stack.forEach((route) => {
          if (route.route) {
            console.log(`🔗 ${route.route.stack[0].method.toUpperCase()} ${route.route.path}`);
          }
        });
      }
    });

    console.log("✅ Google Gemini Key:", process.env.GEMINI_API_KEY ? "Key Found ✅" : "❌ MISSING!");

    // ✅ Start the server ONLY after MongoDB is connected
    app.listen(PORT, () => {
      console.log(`✅ Server is running at: http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Exit process on DB connection failure
  });

  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      console.log(`🔗 Registered Route: ${middleware.route.stack[0].method.toUpperCase()} ${middleware.route.path}`);
    }
  });
  
  module.exports = app;
  