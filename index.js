const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
const userRoutes = require('./routes/user');
app.use('/api/users', userRoutes);
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello! This is from server...' })
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
