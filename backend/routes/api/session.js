const express = require('express');
const router = express.Router();
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')
const { setTokenCookie, restoreUser } = require('../../utils/auth')
const { User } = require('../../db/models');

router.post('/', async (req, res, next) => {
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
        email: user.email,
        username: user.username
    }

    await setTokenCookie(res, safeUser);

    return res.json({user: safeUser})
})



module.exports = router;
