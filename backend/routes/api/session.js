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
    check('credential').exists({checkFalsy: true}).notEmpty().withMessage('Please provide a valid email or username.'),
    check('password').exists({checkFalsy: true}).withMessage('Please provide a password.'),
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
    const { credential, password } = req.body;

    const user = await User.unscoped().findOne({
        where: {
            [Op.or]: {
                username: credential,
                email: credential
            }
        }
    });

    if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
        const error = new Error('Login Failed');
        error.status = 401;
        error.title = 'Login Failed';
        error.errors = { credential: 'The provided crednetials were invalid'};
        return next(error);
    }

    const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username
    }

    await setTokenCookie(res, safeUser);

    return res.json({user: safeUser})
})

// Logout
router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({message: 'success'})
})




module.exports = router;
