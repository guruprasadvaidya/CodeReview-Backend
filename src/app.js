const express = require('express');
const aiRoutes = require('./routes/ai.routes.js');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // ✅ Fix: This ensures `req.body` is parsed

app.use('/ai', aiRoutes);

console.log("✅ Available Routes:");
app._router.stack.forEach((middleware) => {
  if (middleware.route) {
    console.log(`🔗 ${middleware.route.stack[0].method.toUpperCase()} ${middleware.route.path}`);
  } else if (middleware.name === 'router') {
    middleware.handle.stack.forEach((route) => {
      if (route.route) {
        console.log(`🔗 ${route.route.stack[0].method.toUpperCase()} ${route.route.path}`);
      }
    });
  }
});


app.get('/', (req, res) => {
    res.send('hellow duniyaaa');
});

module.exports = app;
