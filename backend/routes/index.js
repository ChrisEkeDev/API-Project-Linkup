const express = require("express");
const { TokenExpiredError } = require("jsonwebtoken");
const router = express.Router();
const apiRouter = require('./api')

router.use('/api', apiRouter)

// Add a XSRF-Token cookie
router.get('/api/csrf/restore', (req, res) => {
    const csrfToken = req.csrfToken();
    res.cookie("XSRF-TOKEN", csrfToken);
    res.status(200).json({
        'XSRF-TOKEN': csrfToken
    })
})

module.exports = router;
