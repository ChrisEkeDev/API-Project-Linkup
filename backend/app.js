// Importing packages
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

// Check the environment
const { environment } = require('./config');
const isProduction = environment === 'production';

// Initialize express application
const app = express();

// Middleware
app.use(morgan('dev')) // Logs information about requests and responses
app.use(cookieParser()) // Parses cookies
app.use(express.json()) // Parses JSON bodies of requests

// Security Middleware
if (isProduction) app.use(cors()) // Enable cors for development
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"})) // Helmet helps set headers for better security
app.use(csurf({ // Set _csrf token and create req.csrfToken method
    cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
    }
}))
