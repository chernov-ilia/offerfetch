// Express application setup.
// Configures middleware, security headers, and routes.

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check (to be removed)
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

module.exports = app;