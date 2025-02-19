const express = require('express');
const aiRoutes = require('./routes/ai.routes.js');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json()); // ✅ Fix: This ensures `req.body` is parsed

app.use('/ai', aiRoutes);

app.get('/', (req, res) => {
    res.send('hellow duniyaaa');
});

module.exports = app;
