const express = require("express");
const { TokenExpiredError } = require("jsonwebtoken");
const router = express.Router();

router.get('/hello/world', (req, res) => {
    res.cookit('XSRF-TOKEN', req.csrfToken());
    res.send('Hello World')
})

module.exports = router;
