const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');

const validateSignUp = [
    check('firstName').exists({checkFalsy: true}).withMessage('First Name is required'),
    check('lastName').exists({checkFalsy: true}).withMessage('Last Name is required'),
    check('username').exists({checkFalsy: true}).isLength({min: 4}).withMessage('Username must be 4 characters or more'),
    check('username').not().isEmail().withMessage('Username cannot be an email'),
    check('email').exists({checkFalsy: true}).isEmail().withMessage('Invalid email'),
    check('password').exists({checkFalsy: true}).isLength({min: 6}).withMessage('Password must be 6 characters or more'),
    handleValidationErrors
]

// Signup
router.post('/', validateSignUp, async (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;

    const userExistsEmail = await User.findOne({
        where: {
            email: email
        }
    })

    const userExistsUsername = await User.findOne({
        where: {
            username: username
        }
    })

    if (userExistsEmail) {
        return res.status(500).json({
            message: "User already exists",
            errors: {
                email: "User with that email already exists"
            }
        })
    }

    if (userExistsUsername) {
        return res.status(500).json({
            message: "User already exists",
            errors: {
                username: "User with that username already exists"
            }
        })
    }

    let hashedPassword = bcrypt.hashSync(password, 13)

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
        username: user.username,
        profileImage: user.profileImage
    }

    await setTokenCookie(res, safeUser);

    return res.json({user: safeUser})
})

module.exports = router;
