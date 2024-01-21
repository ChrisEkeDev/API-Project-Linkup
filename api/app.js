// Importing packages
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { handleSequelizeErrors, handleResourceNotFound, errorFormatter } = require('./errors');
const { environment } = require('./config');
const { csurfCookie } = require('./utils/csrf');
const isProduction = environment === 'production';
const routes = require('./routes')

// Initialize express application
const app = express();
const http = require('http').Server(app);

// Parsing & Logging Middleware
app.use(morgan('dev')) // Logs information about requests and responses
app.use(cookieParser()) // Parses cookies
app.use(express.json()) // Parses JSON bodies of requests
app.use(bodyParser.json())

// Security Middleware
if (isProduction) app.use(cors())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}))
app.use(csurfCookie)

// Connect app to routes
app.use(routes)

// Error Handling
app.use(handleResourceNotFound)
app.use(handleSequelizeErrors)
app.use(errorFormatter)

module.exports = { app, http };
