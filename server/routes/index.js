const express = require('express');
const router = express.Router();
const apiRoutes = require('./api');

// API routes
router.use('/api', apiRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Root endpoint
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Project-nvk API Server' });
});

module.exports = router;