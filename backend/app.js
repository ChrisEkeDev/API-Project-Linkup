// Importing packages
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { ValidationError } = require('sequelize');

//Import Routes
const routes = require('./routes')

// Check the environment
const { environment } = require('./config');
const isProduction = environment === 'production';

// Initialize express application
const app = express();

// Parsing & Logging Middleware
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

// Connect app to routes
app.use(routes)

// Error handling middleware
// Resource Not Found Error Handler
app.use((_req, _res, next) => {
    const error = new Error('The requested resource couldn\'t be found.')
    error.title = "Resource Not Found";
    error.errors = { message: 'The request resource couldn\'t be found.' }
    error.status = 404;
    next(error)
})

// Sequelize Error Handler
app.use((err, _req, _res, next) => {
    if (err instanceof ValidationError) {
        let errors = {};
        for (let error of err.errors) {
            errors[error.path] = error.message;
        }
        err.title = 'Validation error';
        err.errors = errors
    }
    next(err)
})

// Error Formatter Error Handler
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    })
})

module.exports = app;
