#!/usr/bin/env node

// Import environemnt variables
require('dotenv').config();
const { port } = require('../config');
const app = require('../app');
const db = require('../db/models');

// Check the database connection before starting the app
db.sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection success! Sequelize is ready to use...');
        app.listen(port, () => console.log(`Listening on port ${port}...`)) // Listen for connections
    })
    .catch(error => {
        console.log('Database connection failure.');
        console.error(error)
    });
