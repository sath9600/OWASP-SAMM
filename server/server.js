const express = require('express');
const app = express();
const db = require('./db/config');
//var db1=require('./db/config_vsamm');
const rtsIndex = require('./router/index.router');
const cors = require('cors');
const allscores = require('./router/allscores.router');
const report = require('./router/indexreport.router');
const usermanage = require('./router/usermanage.router');
const home = require('./router/home.router');
const vsamm = require('./router/vsamm.router');
const profile = require('./router/Profile');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Security middleware
app.use(helmet());

// Rate limiting to prevent brute force attacks
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { reason: 'Too many requests, please try again later.' }
});

// Apply rate limiting to API endpoints
app.use('/api', apiLimiter);

// Static files
app.use(express.static('public'));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

// CORS middleware
app.use(cors());

// Routes
app.use('/api', rtsIndex, allscores, report, usermanage, home, vsamm, profile);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
  console.log('RESTful API server started on port: ' + port);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  // Don't crash the server, just log the error
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  // Gracefully shutdown the server
  server.close(() => {
    process.exit(1);
  });
  
  // If server doesn't close in 1 second, force shutdown
  setTimeout(() => {
    process.exit(1);
  }, 1000);
});
