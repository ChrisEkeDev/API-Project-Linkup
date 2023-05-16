const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');

const validateSignUp = [
    check('firstName').exists({checkFalsy: true}).withMessage('Please provide a valid first name'),
    check('lastName').exists({checkFalsy: true}).withMessage('Please provide a valid last name'),
    check('username').exists({checkFalsy: true}).isLength({min: 4}).withMessage('Please provide an email with at least 4 characters'),
    check('username').not().isEmail().withMessage('Username cannot be an email.'),
    check('email').exists({checkFalsy: true}).isEmail().withMessage('Please provide a valid email.'),
    check('password').exists({checkFalsy: true}).isLength({min: 6}).withMessage('Password must be 6 chracters or more.'),
    handleValidationErrors
]

// Signup
router.post('/', validateSignUp, async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    let hashedPassword = bcrypt.hashSync(password)

    const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword
    })

    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username
    }

    let token = await setTokenCookie(res, safeUser);

    return res.json({user: {...safeUser, token}})
})

module.exports = router;
