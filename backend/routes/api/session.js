const express = require('express');
const router = express.Router();
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');

// Validate the Login
const validateLogin = [
    check('email').exists({checkFalsy: true}).withMessage('Email is required'),
    check('password').exists({checkFalsy: true}).withMessage('Password is required.'),
    handleValidationErrors
]

// Restore session user
router.get('/', requireAuth, (req, res) => {
    const { user } = req;
    if (user) {
        const safeUser = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username
        }

        return res.status(200).json({user: safeUser})
    } else {
        return res.status(200).json({user: null})
    }
})



// Login
router.post('/', validateLogin, async (req, res, next) => {
    const { email, password } = req.body;

    const user = await User.unscoped().findOne({
        where: {
            email: email
        }
    });

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        return res.status(401).json({message: "Invalid credentials"})
    }

    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username
    }

    await setTokenCookie(res, safeUser);

    return res.status(200).json({user: safeUser})
})

// Logout
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({message: 'success'})
})




module.exports = router;
